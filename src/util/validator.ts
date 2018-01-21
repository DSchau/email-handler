import * as yup from 'yup';

export const validator = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  message: yup.string().required(),
  name: yup.string().required(),
  subject: yup.string(),
  missHoney: yup.string().max(0)
});
