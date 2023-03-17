const stripe = require("stripe")("sk_test_49LzEhu5SVY6SyqTKkSq1opW");

exports.subscriptionsListHandler = async (event, context, callback) => {
  let event1 = JSON.parse(event.body);

  try {
    // create subscription list
    const subscriptions = await stripe.subscriptions.list(
      {
        status: "all",
        limit: 100,
        expand: ["data.customer", "data.plan.product"],
      },

      { stripeAccount: event1.accountId }
    );

    const transformedSubscriptions = subscriptions.data.map((subscription) => ({
      subscriptionId: subscription.id,
      status: subscription.status,
      email: subscription.customer.email,
      productName: subscription.plan.product.name,
      created: subscription.created,
      billing: subscription.billing,
    }));

    const response = {
      body: JSON.stringify({
        message: "subscriptions list",
        subscriptions: transformedSubscriptions,
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
