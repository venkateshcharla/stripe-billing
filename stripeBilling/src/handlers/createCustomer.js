const stripe = require("stripe")("sk_test_49LzEhu5SVY6SyqTKkSq1opW");

exports.createCustomerHandler = async (event, context, callback) => {
  let event1 = JSON.parse(event.body);
  let response;

  try {
    // check if customer exists
    const customers = await stripe.customers.list(
      {
        email: event1.email,
      },
      { stripeAccount: event1.accountId }
    );

    if (!customers) {
      // create customer
      await stripe.customers.create(
        {
          name: event1.name,
          email: event1.email,
        },
        { stripeAccount: event1.accountId }
      );
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "customer added to partner account",
        }),
      };
    }

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "customer already exists in partner account",
      }),
    };

    return response;
  } catch (e) {
    console.log(e);
  }
};
