const Payment = require('../models/Payment');
const stripe = require('stripe')(require('../config/db').stripeSecretKey);

const createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'usd',
        });
        res.json(paymentIntent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const handlePaymentWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
    }

    res.status(200).json({ received: true });
};

module.exports = { createPaymentIntent, handlePaymentWebhook };
