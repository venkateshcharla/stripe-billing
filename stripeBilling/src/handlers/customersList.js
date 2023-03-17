const stripe = require("stripe")("sk_test_49LzEhu5SVY6SyqTKkSq1opW");

exports.customersListHandler = async (event, context, callback) => {
  let event1 = JSON.parse(event.body);

  try {
    // create subscription list
    const customers = await stripe.customers.list(
      {
        limit: 100,
        expand: ["data.invoice_settings.default_payment_method"],
      },

      { stripeAccount: event1.accountId }
    );

    const transformedCustomers = customers.data.map((customer) => ({
      customerId: customer.id,
      name: customer.name,
      email: customer.email,
      card: customer.invoice_settings.default_payment_method.card.brand,
      last4: customer.invoice_settings.default_payment_method.card.last4,
    }));

    const response = {
      body: JSON.stringify({
        message: "customers list",
        customers: transformedCustomers,
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
