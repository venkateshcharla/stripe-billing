const stripe = require("stripe")("sk_test_49LzEhu5SVY6SyqTKkSq1opW");

exports.createProductHandler = async (event, context, callback) => {
  let event1 = JSON.parse(event.body);

  let res;

  try {
    for (let i = 0; i < event1.accountId.length; i++) {
      // create product
      const product = await stripe.products.create(
        {
          name: event1.productName,
          //   id:"",
          //   active:"true",
          //   description:"",
          //   images:[],
          //   livemode:'false'
        },
        { stripeAccount: event1.accountId[i] }
      );

      // Add prices to the product
      event1.prices.map(async (price) => {
        await stripe.prices.create(
          {
            unit_amount: price.unitAmount,
            currency: price.currency,
            recurring: { interval: price.billingCycle },
            product: product.id,
          },
          { stripeAccount: event1.accountId[i] }
        );
      });

      // Get prices list from the stripe

      // const prices = await stripe.prices.list(
      //   {
      //     limit: 3,
      //   },
      //   { stripeAccount: event1.accountId[i] }
      // );

      // Update the product with the default price parameter

      // res = await stripe.products.update(
      //   product.id,
      //   {
      //     default_price: prices.data[0].id,
      //   },
      //   { stripeAccount: event1.accountId[i] }
      // );
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Product created successfully",
        // events: res,
      }),
    };

    return response;
  } catch (e) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        message: "failed",
        obj: e,
      }),
    });
  }
};
