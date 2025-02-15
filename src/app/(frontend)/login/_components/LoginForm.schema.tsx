import * as yup from 'yup'

export const initialValues = {
  email: '',
  password: '',
}

export const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
})
