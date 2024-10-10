const express = require('express');
const { createPaymentIntent, handlePaymentWebhook } = require('../controllers/paymentController');

const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);
router.post('/webhook', handlePaymentWebhook);

module.exports = router;
