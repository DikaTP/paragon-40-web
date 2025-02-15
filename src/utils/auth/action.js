'use server';

import { signIn } from '@/auth';
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function authenticate(prevState, formData) {
  try {
		const success = await signIn("credentials", formData)
		console.log({ prevState, success })
		return undefined
	} catch (error) {
    if (isRedirectError(error)) throw error

    let errMsg = ""
		if (error instanceof Error) {
			const { type, cause } = error
			switch (type) {
				case "CredentialsSignin":
					errMsg = "Invalid credentials."
          break
				case "CallbackRouteError":
					errMsg = cause?.err?.toString()
          break
				default:
					errMsg = "Something went wrong."
          break
			}
		}

    return errMsg
	}
}