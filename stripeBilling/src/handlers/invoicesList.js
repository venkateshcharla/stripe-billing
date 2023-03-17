const stripe = require("stripe")("sk_test_49LzEhu5SVY6SyqTKkSq1opW");

exports.invoicesListHandler = async (event, context, callback) => {
  let event1 = JSON.parse(event.body);

  try {
    // create invoices list
    const invoices = await stripe.invoices.list(
      {
        limit: 100,
      },

      { stripeAccount: event1.accountId }
    );

    const transformedInvoices = invoices.data.map((invoice) => ({
      invoiceId: invoice.id,
      email: invoice.customer_email,
      created: invoice.created,
      dueDate: invoice.due_date,
      amount: invoice.amount_due,
      invoiceNumber: invoice.number,
      status: invoice.status,
      invoicePdf: invoice.invoice_pdf,
    }));

    const response = {
      body: JSON.stringify({
        message: "invoices list",
        invoices: transformedInvoices,
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
