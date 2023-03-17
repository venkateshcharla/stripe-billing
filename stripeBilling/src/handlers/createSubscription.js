const stripe = require("stripe")("sk_test_49LzEhu5SVY6SyqTKkSq1opW");

exports.createSubscriptionHandler = async (event, context, callback) => {
  let event1 = JSON.parse(event.body);

  try {
    // create subscription
    const subscription = await stripe.subscriptions.create(
      {
        customer: event1.customer,
        items: [
          {
            price: event1.price,

            quantity: 3,
          },
        ],
        collection_method: "charge_automatically",
        payment_behavior: "default_incomplete",

        expand: ["latest_invoice.payment_intent"],

        // trial_period_days: 15,
        // trial_settings: {
        //   end_behavior: {
        //     missing_payment_method: "cancel",
        //   },
        // },
      },
      { stripeAccount: event1.accountId }
    );

    const response = {
      body: JSON.stringify({
        message: "customer subscribed to a product in a partner account",
        subscription: subscription,
      }),
    };

    return response;
  } catch (e) {
    return {
      body: JSON.stringify({
        message: "failed",
        statusCode: e,
      }),
    };
  }
};
