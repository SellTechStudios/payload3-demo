export const extractErrorMessage = async (res: Response) => {
  try {
    const json = await res.json()
    if (json?.errors?.length) return json.errors[0].message
    if (json?.message) return json.message
  } catch {}
  return 'Something went wrong'
}
