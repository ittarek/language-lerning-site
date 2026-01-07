import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaCreditCard,
  FaBuilding,
  FaMobileAlt,
  FaGlobe,
  FaArrowLeft,
  FaCheck,
  FaLock,
} from 'react-icons/fa';
import { MdWarning } from 'react-icons/md';

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: FaCreditCard,
    description: 'Visa, Mastercard, Amex',
    processingFee: 2.9,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: FaGlobe,
    description: 'Fast & Secure',
    processingFee: 3.5,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    icon: FaBuilding,
    description: 'International payments',
    processingFee: 2.9,
  },
  {
    id: 'bkash',
    name: 'bKash',
    icon: FaMobileAlt,
    description: 'Bangladesh mobile payment',
    processingFee: 1.5,
  },
  {
    id: 'nagad',
    name: 'Nagad',
    icon: FaMobileAlt,
    description: 'Bangladesh mobile payment',
    processingFee: 1.5,
  },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    email: '',
    bkashNumber: '',
    nagadNumber: '',
  });

  useEffect(() => {
    const planData = sessionStorage.getItem('selectedPlan');
    if (planData) {
      setSelectedPlan(JSON.parse(planData));
    }
    // যদি plan না থাকে তাহলে নিচে error UI দেখাবে
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      // শুধু ডিজিট রাখা, ৪ ডিজিট পর পর স্পেস
      const digits = value.replace(/\D/g, '').slice(0, 16);
      const formatted = digits.match(/.{1,4}/g)?.join(' ') || '';
      setFormData(p => ({ ...p, [name]: formatted }));
      return;
    }

    if (name === 'expiryDate') {
      const digits = value.replace(/\D/g, '').slice(0, 4);
      let formatted = digits;
      if (digits.length >= 2) {
        formatted = digits.slice(0, 2) + '/' + digits.slice(2);
      }
      setFormData(p => ({ ...p, [name]: formatted.slice(0, 5) }));
      return;
    }

    if (name === 'cvv') {
      const digits = value.replace(/\D/g, '').slice(0, 4);
      setFormData(p => ({ ...p, [name]: digits }));
      return;
    }

    setFormData(p => ({ ...p, [name]: value }));
  };

  const calculateTotal = () => {
    if (!selectedPlan || !selectedPayment) return null;
    const fee = (selectedPlan.price * selectedPayment.processingFee) / 100;
    return (selectedPlan.price + fee).toFixed(2);
  };

  const handlePayment = e => {
    e.preventDefault();
    const total = calculateTotal();
    sessionStorage.setItem(
      'paymentInfo',
      JSON.stringify({
        plan: selectedPlan,
        payment: selectedPayment,
        total,
      })
    );
    navigate('/processing');
  };

  // যদি কোনো প্ল্যান সিলেক্ট না করা থাকে
  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-10 max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Plan Selected</h2>
          <p className="text-gray-600 mb-8">
            Please choose a plan first to proceed with payment.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
            Back to Pricing
          </button>
        </div>
      </div>
    );
  }

  const totalAmount = calculateTotal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8 font-semibold transition">
          <FaArrowLeft className="w-5 h-5" />
          Back to Plans
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Select Payment Method
              </h2>

              {/* Payment Methods Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {paymentMethods.map(method => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPayment(method)}
                      className={`p-5 border-2 rounded-xl transition-all text-left flex items-start gap-4 ${
                        selectedPayment?.id === method.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      aria-pressed={selectedPayment?.id === method.id}>
                      <Icon
                        className={`w-7 h-7 flex-shrink-0 ${
                          selectedPayment?.id === method.id
                            ? 'text-indigo-600'
                            : 'text-gray-400'
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{method.name}</p>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                      {selectedPayment?.id === method.id && (
                        <FaCheck className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Conditional Payment Form */}
              {selectedPayment && (
                <form onSubmit={handlePayment} className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <FaLock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900">
                        Secure Payment
                      </p>
                      <p className="text-xs text-blue-700">
                        Your payment information is encrypted and secure.
                      </p>
                    </div>
                  </div>

                  {/* Credit/Debit Card Fields */}
                  {selectedPayment.id === 'card' && (
                    <>
                      <div>
                        <label
                          htmlFor="cardNumber"
                          className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          id="cardNumber"
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="cardName"
                          className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          id="cardName"
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="expiryDate"
                            className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            id="expiryDate"
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            maxLength="5"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="cvv"
                            className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            id="cvv"
                            type="password"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength="4"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* bKash / Nagad */}
                  {(selectedPayment.id === 'bkash' || selectedPayment.id === 'nagad') && (
                    <>
                      <div>
                        <label
                          htmlFor={selectedPayment.id + 'Number'}
                          className="block text-sm font-medium text-gray-700 mb-2">
                          {selectedPayment.name} Number
                        </label>
                        <input
                          id={selectedPayment.id + 'Number'}
                          type="tel"
                          name={
                            selectedPayment.id === 'bkash' ? 'bkashNumber' : 'nagadNumber'
                          }
                          value={
                            formData[
                              selectedPayment.id === 'bkash'
                                ? 'bkashNumber'
                                : 'nagadNumber'
                            ]
                          }
                          onChange={handleInputChange}
                          placeholder="01XXXXXXXXX"
                          maxLength="11"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <MdWarning className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-yellow-800">
                            You will receive a payment request on your{' '}
                            {selectedPayment.name} app. Please approve it to complete the
                            payment.
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* PayPal / Stripe */}
                  {(selectedPayment.id === 'paypal' ||
                    selectedPayment.id === 'stripe') && (
                    <>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                          You will be redirected to {selectedPayment.name} to complete
                          your payment securely.
                        </p>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    disabled={!totalAmount}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    <FaLock className="w-5 h-5" />
                    Pay ${totalAmount || '0.00'}
                  </button>
                </form>
              )}

              {!selectedPayment && (
                <div className="text-center py-8 text-gray-500">
                  Please select a payment method to continue.
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>{selectedPlan.name} Plan</span>
                  <span className="font-semibold">${selectedPlan.price.toFixed(2)}</span>
                </div>

                {selectedPayment && (
                  <div className="flex justify-between text-gray-600">
                    <span>Processing Fee ({selectedPayment.processingFee}%)</span>
                    <span className="font-semibold">
                      $
                      {(
                        (selectedPlan.price * selectedPayment.processingFee) /
                        100
                      ).toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{totalAmount ? `$${totalAmount}` : '—'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <FaCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-green-800">
                    <p className="font-semibold mb-2">What you'll get:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      {selectedPlan.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
