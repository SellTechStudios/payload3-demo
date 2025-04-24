import { z } from 'zod'

export const initialValues = {
  email: '',
  password: '',
}

export const schema = z.object({
  email: z.string().email('Invalid email').nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
})
