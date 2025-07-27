// src/lib/handle-api.ts

import { errorResponse } from './api-error'

export function handleApiRoute(fn: () => Promise<Response>) {
  return async () => {
    try {
      return await fn()
    } catch (error) {
      return errorResponse(error)
    }
  }
}