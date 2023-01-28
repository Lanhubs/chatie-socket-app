import { FormControl, FormLabel, Input as InputField } from "@chakra-ui/react";
import React from "react";

const Input = ({ handleChange, type, name, placeholder, label  }) => {
  return (
    <FormControl>
      <FormLabel textTransform="capitalize">{label}</FormLabel>
      <InputField
        placeholder={placeholder}
        type={type}
        accept={type==="file"?"image/*": null}
        onChange={(e) => handleChange(type=== "file"?e.target.files[0]:e.target.value)}
        outlineColor={0}
        name={name}
        outlineOffset={0}
        border="1.5px solid rgba(0, 0, 255, 0.5)"
        p="10px"
      />
    </FormControl>
  );
};

export default Input;
