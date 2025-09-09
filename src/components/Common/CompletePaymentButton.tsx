import React, { useState, useEffect } from 'react';
import { CreditCard, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { paymentsAPI, pricingAPI } from '@/services/api';
import toast from 'react-hot-toast';

interface CompletePaymentButtonProps {
  userId: string;
  registrationId: string;
  customUserId: string;
  isKumaraguru: boolean;
  onPaymentSuccess?: (paymentData: any) => void;
  onPaymentFailure?: (error: any) => void;
  className?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CompletePaymentButton: React.FC<CompletePaymentButtonProps> = ({
  userId,
  registrationId,
  customUserId,
  isKumaraguru,
  onPaymentSuccess,
  onPaymentFailure,
  className = ""
}) => {
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [pricing, setPricing] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

  useEffect(() => {
    // Load Razorpay script
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          setRazorpayLoaded(true);
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

  useEffect(() => {
    // Fetch pricing information
    const fetchPricing = async () => {
      try {
        const response = await pricingAPI.get();
        if (response.success) {
          setPricing(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch pricing:', error);
      }
    };

    fetchPricing();
  }, []);

  const getPaymentAmount = () => {
    if (!pricing) return 0;
    return isKumaraguru ? pricing.internalDelegate : pricing.externalDelegate;
  };

  const handlePayment = async () => {
    console.log('Payment button clicked');
    console.log('Payment data:', { 
      userId, 
      registrationId, 
      customUserId, 
      isKumaraguru, 
      amount: getPaymentAmount() 
    });
    
    if (!razorpayLoaded) {
      toast.error('Payment gateway is still loading. Please try again.');
      return;
    }

    if (!pricing) {
      toast.error('Pricing information not available. Please try again.');
      return;
    }

    setLoading(true);
    setPaymentStatus('processing');

    try {
      // Create payment order
      const orderResponse = await paymentsAPI.createOrder({
        userId,
        registrationId,
        amount: getPaymentAmount(),
        currency: 'INR'
      });

      if (!orderResponse.success) {
        throw new Error(orderResponse.message || 'Failed to create payment order');
      }

      const { payment, razorpayOrder, key } = orderResponse.data;
      console.log('Payment order created:', { payment, razorpayOrder });

      // Configure Razorpay options
      const options = {
        key: key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Kumaraguru MUN 2025',
        description: `Registration Payment - ${isKumaraguru ? 'Internal' : 'External'} Delegate`,
        order_id: razorpayOrder.id,
        prefill: {
          name: customUserId,
          email: '', // Will be filled from user data
          contact: '', // Will be filled from user data
        },
        notes: {
          userId: userId,
          registrationId: registrationId,
          customUserId: customUserId,
          delegateType: isKumaraguru ? 'Internal' : 'External'
        },
        theme: {
          color: '#172d9d'
        },
        handler: async function (response: any) {
          console.log('Payment response:', response);
          setPaymentStatus('processing');
          
          try {
            // Verify payment
            const verifyResponse = await paymentsAPI.verifyPayment({
              paymentId: payment.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            });

            console.log('Payment verification response:', verifyResponse);

            if (verifyResponse.success) {
              setPaymentStatus('success');
              toast.success('Payment successful! Your registration is now confirmed.');
              onPaymentSuccess?.(verifyResponse.data);
              
              // Refresh the page after 2 seconds to update the dashboard
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } else {
              setPaymentStatus('failed');
              toast.error('Payment verification failed. Please contact support.');
              onPaymentFailure?.(verifyResponse.message);
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            setPaymentStatus('failed');
            toast.error('Payment verification failed. Please contact support.');
            onPaymentFailure?.(error);
          }
        },
        modal: {
          ondismiss: function() {
            setPaymentStatus('idle');
            console.log('Payment modal dismissed');
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment creation error:', error);
      setPaymentStatus('failed');
      toast.error(error instanceof Error ? error.message : 'Payment failed. Please try again.');
      onPaymentFailure?.(error);
    } finally {
      setLoading(false);
    }
  };

  const getButtonContent = () => {
    switch (paymentStatus) {
      case 'processing':
        return (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing Payment...</span>
          </div>
        );
      case 'success':
        return (
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Payment Successful!</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center justify-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span>Payment Failed</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <span>Complete Payment - ₹{getPaymentAmount()}</span>
          </div>
        );
    }
  };

  const isDisabled = loading || !razorpayLoaded || !pricing || paymentStatus === 'processing' || paymentStatus === 'success';

  return (
    <div className={`space-y-3 ${className}`}>
      <button
        type="button"
        onClick={handlePayment}
        disabled={isDisabled}
        className={`
          w-full py-3 px-6 rounded-lg font-medium transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${paymentStatus === 'success' 
            ? 'bg-green-600 text-white focus:ring-green-500' 
            : paymentStatus === 'failed'
            ? 'bg-red-600 text-white focus:ring-red-500 hover:bg-red-700'
            : 'bg-[#172d9d] text-white hover:bg-[#1a2a8a] focus:ring-[#172d9d]'
          }
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {getButtonContent()}
      </button>

      {!razorpayLoaded && (
        <p className="text-xs text-gray-500 text-center">
          Loading payment gateway...
        </p>
      )}

      {pricing && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isKumaraguru ? 'Internal' : 'External'} Delegate Fee: ₹{getPaymentAmount()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Secure payment powered by Razorpay
          </p>
        </div>
      )}

      {paymentStatus === 'failed' && (
        <button
          type="button"
          onClick={() => setPaymentStatus('idle')}
          className="w-full text-sm text-gray-600 hover:text-gray-800 underline"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default CompletePaymentButton;
