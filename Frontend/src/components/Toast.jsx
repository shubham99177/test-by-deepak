import React, {
  useState,
  useEffect,
} from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import toast, { Toaster } from "https://cdn.skypack.dev/react-hot-toast@2.2.0";
import axios from "https://cdn.skypack.dev/axios@0.26.1";
import "../StyleSheets/Toast.css";

const App = () => {
  return (
    <React.Fragment>
      <div className="row m-0 justify-content-center">
        <div className="col-md-10 mt-5 mb-5">
          <div className="form-area">
            <div className="form-inner">
              <h4 className="form-heading mb-4 text-primary text-center">
                React Hot Toast
              </h4>
              <div className="d-flex pt-5 align-items-center justify-content-between">
                <button
                  onClick={SuccessNotify}
                  className="btn btn-sm btn-success"
                >
                  Success
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
