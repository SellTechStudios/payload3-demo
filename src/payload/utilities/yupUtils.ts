/* eslint-disable @typescript-eslint/no-explicit-any */

import * as Yup from 'yup'

export const getRequiredFields = <T extends Yup.AnyObjectSchema>(
  schema: T,
): Array<keyof Yup.InferType<T>> => {
  const description = schema.describe()
  const requiredFields: Array<keyof Yup.InferType<T>> = []

  for (const field in description.fields) {
    const fieldDesc = description.fields[field] as any // Type assertion to any
    if (fieldDesc.tests && fieldDesc.tests.some((test: any) => test.name === 'required')) {
      requiredFields.push(field as keyof Yup.InferType<T>)
    }
  }

  return requiredFields
}
