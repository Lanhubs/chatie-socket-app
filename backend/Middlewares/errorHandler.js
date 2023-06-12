exports.handleErrorMsg = (errors) => {
    
    for (const [path, error] of Object.entries(errors)) {
      if (error.code === "validationError" && error.path && error.message) {
        const cusErrorMsg = error.message.split(" ").join("");
        errors[path].message = cusErrorMsg;
      }
    }
    return errors;
  };
  