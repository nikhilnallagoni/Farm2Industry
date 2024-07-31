import React from "react";

const validateNumber = (number) => {
  if (number.length === 0) return false;
  for (let i of number) {
    if (i < "0" || i > "9") return false;
  }
  return true;
};

const validateUser = (user) => {
  if (!user) return {};
  let errors = {};
  let errorFound = false;
  if (user.name.length === 0) {
    errors.name = "name is required";
    errorFound = true;
  }
  if (user.address.length === 0) {
    errors.address = "address is required";
    errorFound = true;
  }
  if (user.contact.length !== 10 || validateNumber(user.contact) === false) {
    errors.contact = "invalid contact number";
    errorFound = true;
  }
  if (errorFound) return errors;
  return null;
};

export default validateUser;
