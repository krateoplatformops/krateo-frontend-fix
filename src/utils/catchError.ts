const catchError = (code?: string): string => {
  let message: string;
  switch (code) {
    case "username_o_password_errati":
      message = 'Utilizza delle credenziali corrette';
      break;
  
    default: // errore generico non gestito (es. status 500)
    message = 'Impossibile procedere con l\'operazione';
      break;
  }

  return message;
}

export default catchError;