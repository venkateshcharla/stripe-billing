const stripe = require("stripe")("sk_test_49LzEhu5SVY6SyqTKkSq1opW");

exports.updateSubscriptionHandler = async (event, context, callback) => {
  let event1 = JSON.parse(event.body);

  try {
    // update subscription
    const subscription = await stripe.subscriptions.update(
      event1.subscriptionId,
      {
        items: [
          {
            id: event1.subscriptionItemId,
            quantity: event1.quantity,
          },
        ],
        proration_behavior: "always_invoice",
        billing_cycle_anchor: "now",
        payment_behavior: "default_incomplete",

        expand: ["latest_invoice.payment_intent"],
        trial_end: "now",
      },
      { stripeAccount: event1.accountId }
    );

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "customer updated a product in a partner account",
        subscription: subscription,
      }),
    };

    return response;
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "failed",
        error: e,
      }),
    };
  }
};
