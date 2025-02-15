import * as yup from 'yup'

export const initialValues = {
  email: '',
  password: '',
  repeatPassword: '',
}

export const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Repeat Password is required'),
})
