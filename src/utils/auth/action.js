'use server';

import { signIn } from '@/auth';
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function authenticate(prevState, formData) {
  try {
    await signIn("credentials", formData)
    return {"status": true, "code": "success", "msg": ""}
  } catch (error) {
    if (isRedirectError(error)) throw error

    let err = ""
    if (error instanceof Error) {
      const { type, cause } = error
      switch (type) {
        case "CredentialsSignin":
          err = {"status": false, "code": "invalid", "msg": "Invalid credentials"}
          break
        case "CallbackRouteError":
          err = {"status": false, "msg": cause?.err?.toString()}
          break
        default:
          err = {"status": false, "code": "error", "msg": "Something went wrong"}
          break
      }
    }

    return err
  }
}