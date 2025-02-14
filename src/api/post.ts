const endpoints = {};

const postData = async <T, R>(
  data: T,
  endpoint: string,
): Promise<R | {error: string}> => {
  if (!endpoint || !data) {
    console.error("Endpoint or data undefined in postData()");
    return null;
  }
  const url = endpoints[endpoint];

  if (url && data) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }); 
      if (!res.ok) {
        console.error("HTTP error occurred while making Post request: ", res.status);
      }
      const message = await response.json();
      
      return {
        status: res.status,
        message,
      };

    } catch (err) {
      console.error("Error while making Post request: \n", err.message)
      return {
        error: err.message
      };
    }
  }
}

export default postData;
