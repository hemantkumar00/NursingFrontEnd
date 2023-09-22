import React, { useEffect } from "react";
import { useParams } from "react-router";
import { API } from "../../API";

const PaymentFail = () => {
  const { testSeriesId } = useParams();
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      // Replace '/target-route' with the route you want to redirect to
      window.location.href = `/testseries/single/${testSeriesId}`;
    }, 3000); // 3 seconds in milliseconds

    // Clear the timeout if the component unmounts (optional)
    return () => clearTimeout(redirectTimer);
  }, []);
  return (
    <>
      <div className="loading-spinner-container">
        <h1 className="text-danger">Payment Fail!</h1>
        <div className="loading-spinner"></div>
        <span>Redirecting...</span>
      </div>
    </>
  );
};

export default PaymentFail;
