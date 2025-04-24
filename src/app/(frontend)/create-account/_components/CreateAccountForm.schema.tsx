import { z, ZodType } from 'zod'

export const initialValues = {
  email: '',
  password: '',
  repeatPassword: '',
}

interface FormData {
  email: string
  password: string
  repeatPassword: string
}

export const schema: ZodType<FormData> = z
  .object({
    email: z.string().email('Invalid email').nonempty('Email is required'),
    password: z.string().nonempty('Password is required'),
    repeatPassword: z.string().nonempty('Repeat Password is required'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords must match',
  })
