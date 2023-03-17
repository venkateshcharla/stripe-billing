import Stripe from "stripe";
// const stripe = new Stripe("sk_test_49LzEhu5SVY6SyqTKkSq1opW");

export const stripeConnectAccountHandler = async (event, context, callback) => {
  const stripe = new Stripe("sk_test_49LzEhu5SVY6SyqTKkSq1opW");
  try {
    console.log("x");
    const account = await stripe.accounts.create({
      type: "standard",
      email: "jenny.rosen@example.com",
    });

    // console.log(account);
    console.log("after acount");

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: "https://example.com/reauth",
      return_url: "https://example.com/return",
      type: "account_onboarding",
    });

    const response = {
      statusCode: 200,

      body: JSON.stringify({
        accountUrl: accountLink.url,
        message: "success1",
      }),
    };

    return response;
  } catch (e) {
    console.log(e);
  }
};
