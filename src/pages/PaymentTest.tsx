import React, { useState } from 'react';
import CompletePaymentButton from '@/components/Common/CompletePaymentButton';
import { useAuth } from '@/context/AuthContext';

const PaymentTest: React.FC = () => {
  const { user } = useAuth();
  const [paymentResult, setPaymentResult] = useState<any>(null);

  const handlePaymentSuccess = (paymentData: any) => {
    console.log('Payment successful:', paymentData);
    setPaymentResult({ success: true, data: paymentData });
  };

  const handlePaymentFailure = (error: any) => {
    console.error('Payment failed:', error);
    setPaymentResult({ success: false, error });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to test payment</h1>
          <p className="text-gray-600">You need to be logged in to access the payment functionality.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Test Page</h1>
          <p className="text-gray-600">Test the complete payment functionality</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Button Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Complete Payment Button</h2>
            
            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">User Information</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>User ID:</strong> {user.id}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                </div>
              </div>
            </div>

            <CompletePaymentButton
              userId={user.id}
              registrationId={user.id} // Using user ID as registration ID for testing
              customUserId={user.userId || 'TEST001'}
              isKumaraguru={false} // Set to true for internal delegate testing
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentFailure={handlePaymentFailure}
            />
          </div>

          {/* Payment Result Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Results</h2>
            
            {paymentResult ? (
              <div className={`p-4 rounded-lg ${
                paymentResult.success 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <h3 className={`font-medium mb-2 ${
                  paymentResult.success ? 'text-green-900' : 'text-red-900'
                }`}>
                  {paymentResult.success ? 'Payment Successful!' : 'Payment Failed'}
                </h3>
                <pre className={`text-sm overflow-auto ${
                  paymentResult.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {JSON.stringify(paymentResult, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>No payment attempts yet.</p>
                <p className="text-sm mt-2">Click the payment button to test the functionality.</p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Testing Instructions</h2>
          <div className="prose text-gray-600">
            <ol className="list-decimal list-inside space-y-2">
              <li>Click the "Complete Payment" button above</li>
              <li>This will create a Razorpay order and open the payment modal</li>
              <li>Use Razorpay test credentials to complete the payment</li>
              <li>Check the payment results section for the outcome</li>
              <li>The payment will be verified and processed automatically</li>
            </ol>
            
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Test Payment Credentials</h4>
              <p className="text-sm text-yellow-800">
                Use any test card number (e.g., 4111 1111 1111 1111) with any future expiry date and any CVV.
                The payment will be processed in test mode.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTest;
