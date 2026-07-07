import * as yup from "yup";

const forgotPasswordValidation = yup.object({

    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required")

});

export default forgotPasswordValidation;