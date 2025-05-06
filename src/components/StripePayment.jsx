import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Button, Typography } from '@material-tailwind/react';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ amount, planName, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;
        setLoading(true);

        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/create-payment-intent`,
                {
                    amount: amount * 100, // Convert to fils (100 fils = 1 AED)
                    currency: 'aed',
                    plan: planName
                }
            );

            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: 'Customer Name' // You can get this from a form
                        }
                    },
                }
            );

            if (stripeError) throw stripeError;
            if (paymentIntent.status === 'succeeded') {
                onSuccess(paymentIntent);
            }
        } catch (err) {
            setError(err.message || 'Payment failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <Typography variant="h5" className="font-bold">
                Pay AED {amount} for {planName}
            </Typography>

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
                <Typography color="red" className="text-sm">
                    {error}
                </Typography>
            )}

            <Button
                type="submit"
                onClick={handleSubmit}
                disabled={!stripe || loading}
                fullWidth
                className="mt-4"
            >
                {loading ? 'Processing...' : `Pay AED ${amount}`}
            </Button>
        </div>
    );
};

export const StripePayment = ({ amount, planName, onSuccess }) => (
    <Elements stripe={stripePromise}>
        <CheckoutForm
            amount={amount}
            planName={planName}
            onSuccess={onSuccess}
        />
    </Elements>
);
