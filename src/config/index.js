import 'dotenv/config'

export const secret_key = process.env.JWT_SECRET_KEY
export const expiresIn = process.env.JWT_EXPIRES_IN