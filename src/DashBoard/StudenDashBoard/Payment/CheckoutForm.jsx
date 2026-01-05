import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdCheckCircle, MdError, MdLock, MdSync } from 'react-icons/md';

const CheckoutForm = ({ price, selectCourse }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // State management
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Create payment intent
  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post('/payments/create-intent', { price })
        .then(res => {
          if (res.data.clientSecret) {
            setClientSecret(res.data.clientSecret);
          }
        })
        .catch(error => {
          console.error('Error creating payment intent:', error);
          toast.error('Failed to initialize payment. Please try again.', {
            position: 'top-right',
          });
        });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async event => {
    event.preventDefault();
    setCardError('');
    setSuccessMessage('');

    // Validation
    if (!stripe || !elements) {
      toast.error('Payment system not initialized', { position: 'top-right' });
      return;
    }

    if (!user?.email) {
      toast.error('User information not found', { position: 'top-right' });
      return;
    }

    if (!selectCourse?._id) {
      toast.error('Course information not found', { position: 'top-right' });
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error('Card element not found', { position: 'top-right' });
      return;
    }

    if (!clientSecret) {
      toast.error('Payment initialization failed. Please refresh and try again.', {
        position: 'top-right',
      });
      return;
    }

    setProcessing(true);

    try {
      // Create payment method
      const { error: paymentMethodError } = await stripe.createPaymentMethod({
        type: 'card',
        card,
        billing_details: {
          name: user?.displayName || 'Anonymous',
          email: user?.email,
        },
      });

      if (paymentMethodError) {
        setCardError(paymentMethodError.message);
        toast.error(paymentMethodError.message, { position: 'top-right' });
        setProcessing(false);
        return;
      }

      // Confirm payment
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || 'Anonymous',
              email: user?.email,
            },
          },
        }
      );

      if (confirmError) {
        setCardError(confirmError.message);
        toast.error(confirmError.message, { position: 'top-right' });
        setProcessing(false);
        return;
      }

      // Handle successful payment
      if (paymentIntent?.status === 'succeeded') {
        setTransactionId(paymentIntent.id);

        const paymentData = {
          email: user?.email,
          studentEmail: user?.email,
          studentName: user?.displayName || 'Anonymous',
          price,
          amount: price,
          transactionId: paymentIntent.id,
          date: new Date(),
          status: 'completed',
          classId: selectCourse?._id,
          className: selectCourse?.class_name,
          classImage: selectCourse?.class_imgUrl,
          instructorName: selectCourse?.instructor_name,
          instructorEmail: selectCourse?.instructor_email,
          token: {
            card: {
              id: paymentIntent.id,
            },
          },
        };

        try {
          console.log('1️⃣ Saving payment data...', paymentData);

          // Step 1: Save payment record
          const paymentRes = await axiosSecure.post('/payments', paymentData);
          console.log('✅ Payment saved:', paymentRes.data);

          if (!paymentRes.data.insertedId) {
            throw new Error('Failed to save payment record');
          }

          // Step 2: Enroll student in course
          const enrollmentData = {
            studentEmail: user?.email,
            studentName: user?.displayName || 'Anonymous',
            className: selectCourse?.class_name,
            classImage: selectCourse?.class_imgUrl,
            instructorName: selectCourse?.instructor_name,
            instructorEmail: selectCourse?.instructor_email,
            courseId: selectCourse?._id,
            amount: price,
            transactionId: paymentIntent.id,
            date: new Date(),
          };

          console.log('2️⃣ Enrolling student...', enrollmentData);

          const enrollRes = await axiosSecure.post('/enrollments', enrollmentData);
          console.log('✅ Student enrolled:', enrollRes.data);

          if (!enrollRes.data.insertedId) {
            throw new Error('Failed to enroll student');
          }

          // Step 3: Reduce available seats
          console.log('3️⃣ Reducing seats...');

          const seatsRes = await axiosSecure.patch(
            `/classes/reduce-seats/${selectCourse._id}`,
            {}
          );
          console.log('✅ Seats reduced:', seatsRes.data);

          if (!seatsRes.data.modifiedCount) {
            console.warn('⚠️ Seat reduction returned 0 modified documents');
          }

          setSuccessMessage(`Payment successful! Transaction ID: ${paymentIntent.id}`);

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Payment Successful! 🎉',
            text: `You have been successfully enrolled in ${selectCourse?.class_name}`,
            confirmButtonColor: '#22c55e',
            confirmButtonText: 'Go to My Classes',
          }).then(result => {
            if (result.isConfirmed) {
              navigate('/dashboard/myEnroll');
            }
          });
        } catch (dbError) {
          console.error('❌ Database/Enrollment error:', dbError);

          // Payment succeeded but enrollment failed
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Payment Received ✅',
            text: "Your payment was successful! We're processing your enrollment. You should see the course in your dashboard shortly.",
            confirmButtonColor: '#f59e0b',
            confirmButtonText: 'Go to Dashboard',
          }).then(result => {
            if (result.isConfirmed) {
              navigate('/dashboard');
            }
          });
        }
      } else {
        toast.error('Payment was not completed. Please try again.', {
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error('❌ Payment error:', error);
      toast.error(
        error.response?.data?.message ||
          'An unexpected error occurred. Please try again.',
        { position: 'top-right' }
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Element */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Information
        </label>
        <div className="p-4 border-2 border-gray-300 rounded-lg bg-white hover:border-blue-500 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  fontFamily: 'Segoe UI, sans-serif',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#ef4444',
                  iconColor: '#ef4444',
                },
              },
            }}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          <MdLock size={14} className="inline mr-1" />
          Your card information is secure and encrypted
        </p>
      </div>

      {/* Error Message */}
      {cardError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
          <MdError size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">Payment Error</p>
            <p className="text-sm text-red-700">{cardError}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
          <MdCheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-900">Payment Successful</p>
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || !elements || processing || !clientSecret}
        className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 flex items-center justify-center gap-2 ${
          processing || !stripe || !elements || !clientSecret
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 active:scale-95'
        }`}>
        {processing ? (
          <>
            <MdSync size={20} className="animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <MdCheckCircle size={20} />
            Pay ${price.toFixed(2)}
          </>
        )}
      </button>

      {/* Additional Info */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>ℹ️ Note:</strong> You can use the test card number{' '}
          <code className="bg-blue-100 px-2 py-1 rounded">4242 4242 4242 4242</code> with
          any future date and any 3-digit CVC for testing purposes.
        </p>
      </div>
    </form>
  );
};

export default CheckoutForm;
