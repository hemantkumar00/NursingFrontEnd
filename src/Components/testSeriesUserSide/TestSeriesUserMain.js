import React, { useEffect, useState } from "react";
import SingleTestSeriesUser from "./SingleTestSeriesUser";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../API";

const TestSeriesUserMain = () => {
  const [data, setData] = useState(null);

  async function fetchAllTestSeries() {
    try {
      const response = await axios.get(`${API}/all/testseries`);
      const responseData = JSON.parse(response.request.response).testSeries;
      setData(responseData);
      // console.log(response);
    } catch (e) {
      const error = JSON.parse(e.request.response).error;
      toast.error(`Msg: ${error}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
  useEffect(() => {
    fetchAllTestSeries();
  }, []);

  return (
    <div>
      {data &&
        data.map((data, index) => {
          return (
            data.activation && <SingleTestSeriesUser key={index} data={data} />
          );
        })}
    </div>
  );
};

export default TestSeriesUserMain;
