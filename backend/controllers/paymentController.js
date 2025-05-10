const stripe = require('../utils/stripe');


exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body; 

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      payment_method_types: ['card'],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).json({ message: 'Payment error', error: err.message });
  }
};
