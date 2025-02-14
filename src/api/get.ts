const endpoints = {};

interface GetDataProps {
  endpoint: string,
}

const getData = async ({
  endpoint,
}: GetDataProps) => {
  const url = endpoints[endpoint];

  if (url) {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errData = await res.json();
        console.error("Error - Failed Get Request");

        return {
          error: errData,
          status: res.status
        };
      }

      const resData = await res.json();
      return {
        status: 200,
        data: resData,
      };
    } catch (err) {
      console.error("Error - Failed Get Request: ", err,message);
      return {
        error: err.message,
      };
    }
  }
}

export default getData;
