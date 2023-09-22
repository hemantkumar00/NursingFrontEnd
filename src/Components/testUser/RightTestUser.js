import React from "react";

const RightTestUser = ({
  test,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  selectedOptions,
}) => {
  const calculateAttemptedNotAttempted = () => {
    let attempted = 0;
    let notAttempted = 0;

    for (let i = 0; i < test.question.length; i++) {
      if (selectedOptions[i] !== undefined) {
        attempted++;
      } else {
        notAttempted++;
      }
    }

    return { attempted, notAttempted };
  };

  const { attempted, notAttempted } = calculateAttemptedNotAttempted();

  return (
    <div className="container">
      <div className="row">
        {/* First Section */}
        <div className="col-12">
          <div className="d-flex align-items-center">
            {/* User Logo */}
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px" }}
            >
              <span style={{ fontSize: "18px" }}>AB</span>
            </div>
            {/* User Name */}
            <p className="ml-2 mb-0">John Doe</p>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        {/* Second Section */}
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <div>
              <p className="mb-0">Attempted: {attempted}</p>
            </div>
            <div>
              <p className="mb-0">Not Attempted: {notAttempted}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        {/* Third Section with Overflow */}
        <div
          className="col-12"
          style={{ maxHeight: "60vh", overflowY: "auto" }}
        >
          <div className="d-flex flex-wrap">
            {test.question.map((question, index) => (
              <button
                key={index}
                className={`btn me-2 mb-2 ${
                  currentQuestionIndex === index ? "active" : ""
                } ${
                  selectedOptions[index] !== undefined
                    ? "btn-success"
                    : "btn-danger"
                }`}
                style={{ width: "50px", height: "40px" }}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightTestUser;
