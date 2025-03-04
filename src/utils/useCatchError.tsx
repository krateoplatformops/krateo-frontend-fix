import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { App, Result } from "antd";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../features/auth/authSlice";
import { useCallback } from "react";

const useCatchError = () => {
  const { notification } = App.useApp();

  const catchError = useCallback((error?: SerializedError | FetchBaseQueryError | any, type: "result" | "notification" = "notification") => {
    let message: string = "Ops! Something didn't work";
    let description: string = "Unable to complete the operation, please try later";

    /*
    // Adjust to account for potentially nested error structure
    let actualErrorCode: number;
    let actualErrorMessage: string = "";

    if (error?.message && JSON.parse(error.message).data?.code) {
      // error from API with status 200
      actualErrorCode = JSON.parse(error.message).data.code;
      actualErrorMessage = JSON.parse(error.message).data.message;
      
      const clientErrorRegex = /^4\d{2}$/; // Regex for 4xx client errors
      if (clientErrorRegex.test(String(actualErrorCode))) {
        if (actualErrorCode === 401) {
          // not authorized
          dispatch(logout());
          message = "Your session has expired";
          description = "Sign in again"
        } else {
          message = actualErrorMessage;
          description = "There was an error processing your request. Please check your input or permissions.";
        }
      } else {
        switch (actualErrorCode) {
          // Handle other specific codes if necessary
          case 500:
            message = "Internal Server Error";
            description = "The server encountered an unexpected condition.";
            break;
          // Add more cases as needed
        }
      }
    
    } else if (error?.message) {
      // classic catch with error object
      message = actualErrorMessage; // override message only
    }
    */

    if (error?.status === 401) {
      // logout
      const dispatch = useAppDispatch();
      dispatch(logout());
      message = "Your session has expired";
      description = "Sign in again"

    } else if (error?.status === 500) {
      // critical error
      message = "Internal Server Error";
      description = error?.data?.message || "The server encountered an unexpected condition.";

    } else if ((/^4\d{2}$/).test(String(error?.status))) {
      if (error?.data?.message) {
        // override error message
        message = "There was an error processing your request"
      }
      description =  error?.data?.message || "Please check your input or permissions.";
    }

    switch (type) {
      case "result":
        return <Result status="error" title={message} subTitle={description} />;
      break;

      case "notification":
      default:
        notification.error({
          description: description,
          message: message,
          duration: 4,
        });
    }
  }, [])

  return { catchError }
}

export default useCatchError;
