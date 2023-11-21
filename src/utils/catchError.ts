const catchError = (code?: string): string => {
  let message: string;
  switch (code) {
    case "username_o_password_errati":
      message = 'Wrong credentials';
      break;

    case "application_data_missing":
      message = "Unable to receive application data";
      break;
  
    default: // errore generico non gestito (es. status 500)
    message = "Ops! Something didn't work";
      break;
  }

  return message;
}

export default catchError;