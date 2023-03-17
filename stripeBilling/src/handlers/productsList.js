const stripe = require("stripe")("sk_test_49LzEhu5SVY6SyqTKkSq1opW");

exports.productsListHandler = async (event, context, callback) => {
  let event1 = JSON.parse(event.body);

  try {
    // create products list
    const products = await stripe.products.list(
      {
        limit: 100,
      },

      { stripeAccount: event1.accountId }
    );

    const transformedProducts = products.data.map((product) => ({
      productId: product.id,

      productName: product.name,
      created: product.created,
      updated: product.updated,
    }));

    const response = {
      body: JSON.stringify({
        message: "products list",
        products: products,
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
