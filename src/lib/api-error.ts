// src/lib/api-error.ts

export class ApiError extends Error {
  statusCode: number
  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }
}

export function errorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.statusCode,
    })
  }

  console.error('Unexpected API error:', error)
  return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
    status: 500,
  })
}