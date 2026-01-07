import { useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaHome,
  FaDownload,
  FaEnvelope,
  FaCreditCard,
  FaCalendar,
  FaHashtag,
  FaAward,
  FaStar,
  FaChevronRight,
} from 'react-icons/fa';

export default function SuccessPage() {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [transactionId] = useState(
    `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  );
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Simulate getting payment info from sessionStorage
    const info = sessionStorage.getItem('paymentInfo');
    if (info) {
      setPaymentInfo(JSON.parse(info));
    } else {
      // Mock data for demo
      const mockPaymentInfo = {
        plan: { name: 'Yearly', price: 199 },
        payment: { name: 'Credit Card', processingFee: 2.9 },
        total: '204.78',
      };
      setPaymentInfo(mockPaymentInfo);
    }

    // Hide confetti after animation
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const handleBackToHome = () => {
    sessionStorage.removeItem('selectedPlan');
    sessionStorage.removeItem('paymentInfo');
    window.location.href = '/';
  };

  const handleGoToDashboard = () => {
    sessionStorage.removeItem('selectedPlan');
    sessionStorage.removeItem('paymentInfo');
    window.location.href = '/dashboard';
  };

  const handlePrint = () => {
    window.print();
  };

  if (!paymentInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @media print {
     
          body * {
            visibility: hidden;
          }
          @page {
            margin: 0;
            size: A4 portrait;
          }
          #receipt,
          #receipt * {
            visibility: visible;
          }
          #receipt {
      position: absolute;
            left: 5%;
            top: 0;
            width: 100%;
            padding: 40px;
            background: white;
            box-shadow: none;
          }
          .no-print {
            display: none !important;
          }
     
          .print-header {
            display: flex !important;
            border-bottom: 3px solid #10b981;
            padding-bottom: 10px;
            margin-bottom: 10px;
          }
          .print-card {
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 10px;
            margin: 12px 0;
            page-break-inside: avoid;
          }
          .print-footer {
            display: block !important;
            border-top: 2px solid #e5e7eb;
            padding-top: 15px;
            margin-top: auto;
            text-align: center;
          }
          .print-spacing {
            margin: 8px 0;
          }
        }
        
        @keyframes confetti {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          background: #f0f;
          animation: confetti 3s ease-out forwards;
        }
        
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .bounce-animation {
          animation: bounce 1s ease-in-out infinite;
        }
      `}</style>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="no-print fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                background: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'][
                  Math.floor(Math.random() * 5)
                ],
              }}
            />
          ))}
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-12">
        <div
          id="receipt"
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
          {/* Print Header - Professional Company Header */}
          <div className="print-header hidden justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payment Receipt</h1>
              <p className="text-gray-600 mt-1">Official Transaction Document</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <FaCheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm text-gray-500">PAID</p>
            </div>
          </div>

          {/* Print Only - Customer Info */}
          <div className="print-only  hidden print-card">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Receipt Number:</p>
                <p className="font-mono font-bold">{transactionId}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Date Issued:</p>
                <p className="font-bold">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Success Header */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-center text-white no-print">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 bounce-animation">
              <FaCheckCircle className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-green-50 text-lg">Your transaction has been completed</p>
          </div>

          {/* Main Content */}
          <div className="p-8 md:p-10 space-y-8">
            {/* Thank You Message */}
            <div className="text-center slide-up">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <FaStar className="w-4 h-4" />
                Order Confirmed
              </div>
              <p className="text-gray-600 text-lg">
                Congratulations! You now have full access to the{' '}
                <span className="font-bold text-green-600">
                  {paymentInfo.plan.name} Plan
                </span>
              </p>
            </div>

            {/* Transaction Details Card */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 slide-up print-card print-spacing">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-300">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FaCreditCard className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Transaction Summary</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <FaAward className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 font-medium text-sm">
                      Plan Selected
                    </span>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">
                    {paymentInfo.plan.name} Plan
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <FaCreditCard className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 font-medium text-sm">
                      Payment Method
                    </span>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">
                    {paymentInfo.payment.name}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <FaHashtag className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 font-medium text-sm">
                      Transaction ID
                    </span>
                  </div>
                  <span className="font-mono font-bold text-gray-900 text-xs">
                    {transactionId}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <FaCalendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 font-medium text-sm">
                      Transaction Date
                    </span>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                {/* Price Breakdown */}
                <div className="pt-3 space-y-2">
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold">${paymentInfo.plan.price}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span>Processing Fee ({paymentInfo.payment.processingFee}%)</span>
                    <span className="font-semibold">
                      $
                      {(parseFloat(paymentInfo.total) - paymentInfo.plan.price).toFixed(
                        2
                      )}
                    </span>
                  </div>
                  <div className="border-t-2 border-gray-300 pt-2 mt-2">
                    <div className="flex items-center justify-between py-2 bg-green-50 rounded-xl px-4">
                      <span className="text-gray-700 font-bold text-base">
                        Total Amount Paid
                      </span>
                      <span className="font-bold text-green-600 text-xl">
                        ${paymentInfo.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Next Section */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-5 slide-up print-card print-spacing">
              <h3 className="text-base font-bold text-indigo-900 mb-3 flex items-center gap-2">
                <FaStar className="w-4 h-4" />
                What's Included
              </h3>
              <ul className="space-y-2">
                {[
                  'Access all premium courses immediately',
                  'Lifetime updates and new content',
                  'Certificate of completion',
                  'Priority customer support 24/7',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-indigo-800 text-sm">
                    <div className="w-5 h-5 bg-indigo-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheckCircle className="w-3 h-3 text-indigo-700" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Print Footer */}
            <div className="print-footer hidden">
              <div className="text-center space-y-1">
                <p className="text-gray-600 text-sm font-semibold">
                  Thank you for your business!
                </p>
                <p className="text-gray-500 text-xs">
                  This is a computer-generated receipt and does not require a signature.
                </p>
                <p className="text-gray-500 text-xs mt-3">
                  For support: support@company.com | Phone: +1 (555) 123-4567
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  © {new Date().getFullYear()} Your Company Name. All rights reserved.
                </p>
              </div>
            </div>

            {/* Email Notification */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 no-print">
              <FaEnvelope className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900">Receipt Sent!</p>
                <p className="text-sm text-blue-700">
                  A copy of this receipt has been sent to your email.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 no-print pt-4">
              <button
                onClick={handleGoToDashboard}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg group">
                <FaHome className="w-5 h-5" />
                Go to Dashboard
                <FaChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleBackToHome}
                  className="py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all">
                  Back to Home
                </button>

                <button
                  onClick={handlePrint}
                  className="py-3 bg-indigo-50 border-2 border-indigo-300 text-indigo-700 rounded-xl font-semibold hover:bg-indigo-100 transition-all flex items-center justify-center gap-2">
                  <FaDownload className="w-4 h-4" />
                  Print Receipt
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-6 border-t border-gray-200 no-print">
              <p className="text-sm text-gray-500">
                Need help?{' '}
                <a
                  href="/contact"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
