import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { API } from "../../../API";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../LoadingSpinner";
import SinglePayment from "./SinglePayment";

const PaymentMain = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [payment, setPayment] = useState();

  async function fetchAllPayment() {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/admin/get/payments`, {
        withCredentials: true,
      });
      console.log(response);
      const responseData = JSON.parse(response.request.response).payments;
      console.log(responseData);
      setPayment(responseData);
    } catch (e) {
      const error = JSON.parse(e.request.response).error;
      toast.error(`Msg: ${error}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchAllPayment();
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="col-lg-10 col-md-8 col-sm-12 px-5">
          {payment.map((data, index) => (
            <SinglePayment
              key={index}
              id={data.razorpay_order_id}
              paymentId={data.razorpay_payment_id}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default PaymentMain;
