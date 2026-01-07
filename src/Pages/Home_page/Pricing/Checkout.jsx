import React, { useState } from 'react';
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
export const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentPage, setCurrentPage] = useState('pricing');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    email: '',
    bkashNumber: '',
    nagadNumber: '',
  });
  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      setFormData(p => ({
        ...p,
        [name]: value
          .replace(/\s/g, '')
          .replace(/(\d{4})/g, '$1 ')
          .trim(),
      }));
      return;
    }
    if (name === 'expiryDate') {
      setFormData(p => ({
        ...p,
        [name]: value
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d)/, '$1/$2')
          .substring(0, 5),
      }));
      return;
    }
    setFormData(p => ({ ...p, [name]: value }));
  };

  const handlePayment = e => {
    e.preventDefault();
    setCurrentPage('processing');
    setTimeout(() => setCurrentPage('success'), 3000);
  };
  const calculateTotal = () => {
    if (!selectedPlan || !selectedPayment) return 0;
    const fee = (selectedPlan.price * selectedPayment.processingFee) / 100;
    return (selectedPlan.price + fee).toFixed(2);
  };
  const handlePaymentMethodSelect = method => setSelectedPayment(method);
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setCurrentPage('pricing')}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6">
          <FaArrowLeft className="w-5 h-5" />
          Back to Plans
        </button>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {paymentMethods.map(m => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => handlePaymentMethodSelect(m)}
                      className={`p-4 border-2 rounded-xl transition-all text-left ${
                        selectedPayment?.id === m.id
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                      <div className="flex items-start gap-3">
                        <Icon
                          className={`w-6 h-6 ${
                            selectedPayment?.id === m.id
                              ? 'text-indigo-600'
                              : 'text-gray-400'
                          }`}
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{m.name}</p>
                          <p className="text-sm text-gray-500">{m.description}</p>
                        </div>
                        {selectedPayment?.id === m.id && (
                          <FaCheck className="w-5 h-5 text-indigo-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedPayment && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <FaLock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900">
                        Secure Payment
                      </p>
                      <p className="text-xs text-blue-700">
                        Your payment information is encrypted and secure
                      </p>
                    </div>
                  </div>

                  {selectedPayment.id === 'card' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            maxLength="5"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {(selectedPayment.id === 'bkash' || selectedPayment.id === 'nagad') && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {selectedPayment.name} Number
                        </label>
                        <input
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <MdWarning className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <p className="text-sm text-yellow-800">
                            You will receive a payment request on your{' '}
                            {selectedPayment.name} app. Please approve it to complete the
                            payment.
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {(selectedPayment.id === 'paypal' ||
                    selectedPayment.id === 'stripe') && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
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
                    onClick={handlePayment}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all">
                    Pay ${calculateTotal()}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>{selectedPlan?.name} Plan</span>
                  <span className="font-semibold">${selectedPlan?.price}</span>
                </div>
                {selectedPayment && (
                  <div className="flex justify-between text-gray-600">
                    <span>Processing Fee ({selectedPayment?.processingFee}%)</span>
                    <span className="font-semibold">
                      $
                      {(
                        (selectedPlan?.price * selectedPayment?.processingFee) /
                        100
                      ).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <FaCheck className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <p className="font-semibold mb-1">What you'll get:</p>
                    <ul className="space-y-1">
                      {selectedPlan?.features.map((f, i) => (
                        <li key={i}>• {f}</li>
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
