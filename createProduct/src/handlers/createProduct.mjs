import Stripe from "stripe";

export const createProductHandler = async (event, context, callback) => {
  const stripe = new Stripe("sk_test_49LzEhu5SVY6SyqTKkSq1opW");

  let event1 = JSON.parse(event.body);

  try {
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
      { stripeAccount: event1.accountId }
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
        { stripeAccount: event1.accountId }
      );
    });

    // Get prices list from the stripe
    const prices = await stripe.prices.list(
      {
        limit: 3,
      },
      { stripeAccount: event1.accountId }
    );

    // Update the product with the default price parameter
    await stripe.products.update(
      product.id,
      {
        default_price: prices.data[0].id,
      },
      { stripeAccount: event1.accountId }
    );

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Product created successfully",
      }),
    };

    return response;
  } catch (e) {
    console.log(e);
  }
};
