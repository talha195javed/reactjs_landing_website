import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@material-tailwind/react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { config } from '@/config';

const stripePromise = loadStripe(config.STRIPE_PUB_KEY);

const CheckoutForm = ({ plan, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Create PaymentIntent when component mounts
        const createPaymentIntent = async () => {
            try {
                const { data } = await axios.post(
                    `${config.API_URL}/create-payment-intent`,
                    {
                        amount: plan.price * 100,
                        plan: plan.title,
                        currency: 'usd'
                    }
                );
                setClientSecret(data.clientSecret);
            } catch (err) {
                setError(err.message);
            }
        };

        createPaymentIntent();
    }, [plan]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;
        setLoading(true);

        try {
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                }
            );

            if (stripeError) throw stripeError;
            if (paymentIntent.status === 'succeeded') {
                onSuccess();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border rounded-lg p-3">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>

            {error && (
                <div className="text-red-500 text-sm">{error}</div>
            )}

            <Button
                type="submit"
                disabled={!stripe || loading || !clientSecret}
                fullWidth
                className="mt-4"
            >
                {loading ? 'Processing...' : `Pay $${plan.price}`}
            </Button>
        </form>
    );
};

const PaymentSuccess = ({ plan, onClose }) => (
    <div className="text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <Typography variant="h3" className="text-2xl font-bold mb-2">
            Payment Successful!
        </Typography>
        <Typography className="text-gray-600 mb-6">
            Thank you for subscribing to {plan.title} plan.
        </Typography>
        <Button onClick={onClose} color="green">
            Continue to Dashboard
        </Button>
    </div>
);

export default function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Get plan from navigation state or redirect
    if (!location.state?.plan) {
        navigate('/pricing');
        return null;
    }

    const { plan } = location.state;

    return (
        <div className="container mx-auto px-4 py-12 max-w-md">
            <div className="bg-white rounded-xl shadow-lg p-8">
                {paymentSuccess ? (
                    <PaymentSuccess
                        plan={plan}
                        onClose={() => navigate('/dashboard')}
                    />
                ) : (
                    <>
                        <Typography variant="h3" className="text-2xl font-bold mb-2">
                            Complete Your {plan.title} Subscription
                        </Typography>
                        <Typography className="text-xl font-semibold mb-6">
                            ${plan.price} per {plan.period}
                        </Typography>

                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                plan={plan}
                                onSuccess={() => setPaymentSuccess(true)}
                            />
                        </Elements>
                    </>
                )}
            </div>
        </div>
    );
}
