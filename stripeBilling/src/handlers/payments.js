const stripe = require("stripe")("sk_test_49LzEhu5SVY6SyqTKkSq1opW");

exports.paymentsListHandler = async (event, context, callback) => {
  let event1 = JSON.parse(event.body);

  try {
    // create payments list
    const paymentIntents = await stripe.paymentIntents.list(
      {
        limit: 100,
        expand: ["data.customer"],
      },

      { stripeAccount: event1.accountId }
    );

    const transformedPayments = paymentIntents.data.map((payment) => ({
      paymentId: payment.id,
      description: payment.description,
      amount: payment.amount,
      email: payment.customer.email,
      status: payment.status,
      created: payment.created,
      customerId: payment.customer.id,
    }));

    const response = {
      body: JSON.stringify({
        message: "payments list",
        payments: transformedPayments,
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
