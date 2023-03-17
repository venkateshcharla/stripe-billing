export const createProductHandler = async (event, context, callback) => {
  try {
    // console.log("x");
    // console.log(event.body);
    const response = {
      statusCode: 200,

      body: JSON.stringify({
        message: "success",
      }),
    };

    return response;
  } catch (e) {
    console.log(e);
  }
};
