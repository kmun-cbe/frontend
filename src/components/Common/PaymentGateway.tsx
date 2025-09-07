import React, { useState, useEffect } from 'react';
import { paymentsAPI } from '@/services/api';
import toast from 'react-hot-toast';

interface PaymentGatewayProps {
  userId: string;
  registrationId?: string;
  customUserId?: string;
  amount: number;
  currency?: string;
  onSuccess?: (paymentData: any) => void;
  onFailure?: (error: any) => void;
  onClose?: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  userId,
  registrationId,
  customUserId,
  amount,
  currency = 'INR',
  onSuccess,
  onFailure,
  onClose
}) => {
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          console.error('Failed to load Razorpay script');
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    console.log('Payment button clicked');
    console.log('Razorpay loaded:', razorpayLoaded);
    console.log('Payment data:', { userId, registrationId, amount, currency });
    
    if (!razorpayLoaded) {
      toast.error('Payment gateway is still loading. Please try again.');
      return;
    }

    setLoading(true);

    try {
      // Create payment order
      const orderResponse = await paymentsAPI.createOrder({
        userId,
        registrationId,
        amount,
        currency
      });

      if (!orderResponse.success) {
        throw new Error(orderResponse.message || 'Failed to create payment order');
      }

      const { payment, razorpayOrder, key } = orderResponse.data;

      // Configure Razorpay options
      const options = {
        key: key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Kumaraguru MUN 2025',
        description: 'Registration Payment',
        order_id: razorpayOrder.id,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await paymentsAPI.verifyPayment({
              paymentId: payment.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            });

            if (verifyResponse.success) {
              toast.success('Payment successful!');
              onSuccess?.(verifyResponse.data);
            } else {
              toast.error('Payment verification failed');
              onFailure?.(verifyResponse.message);
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed');
            onFailure?.(error);
          }
        },
        prefill: {
          name: 'User Name', // You can get this from user context
          email: 'user@example.com', // You can get this from user context
          contact: '9999999999' // You can get this from user context
        },
        notes: {
          registrationId: registrationId || '',
          userId: userId,
          customUserId: customUserId || ''
        },
        theme: {
          color: '#172d9d'
        },
        modal: {
          ondismiss: function() {
            onClose?.();
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error('Failed to initiate payment');
      onFailure?.(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Gateway</h3>
        <p className="text-gray-600">Complete your registration payment</p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-700">Amount</span>
          <span className="font-semibold text-gray-900">₹{amount}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-700">Currency</span>
          <span className="font-semibold text-gray-900">{currency}</span>
        </div>

        {customUserId && (
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">User ID</span>
            <span className="font-semibold text-gray-900">{customUserId}</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={handlePayment}
          disabled={loading || !razorpayLoaded}
          className="w-full bg-[#172d9d] text-white py-3 px-4 rounded-lg hover:bg-[#1a2a8a] focus:outline-none focus:ring-2 focus:ring-[#172d9d] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Processing...</span>
            </div>
          ) : (
            'Pay Now'
          )}
        </button>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Powered by Razorpay • Secure Payment Gateway
        </p>
      </div>
    </div>
  );
};

export default PaymentGateway;
