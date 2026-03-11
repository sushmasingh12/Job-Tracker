import jwt from "jsonwebtoken"

const generateToken = (res, userId, options ={}) => {
    try {
        const defaultOptions = {
            expiresIn: options.expiresIn || '7d',
            email: options.email || null
        }
        const payload = {
            userId,
            ...(defaultOptions.email && { email: defaultOptions.email })
        }

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: defaultOptions.expiresIn }
        )

        const cookies = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: options.path || '/',
            maxAge: options.maxAge || (7 * 24 * 60 * 60 * 1000) // 7 days in seconds
        }
        res.cookie('token', token, cookies)
        return token
    } catch (error) {
        console.error('JWT Token Generation Error:', error.message)
        throw new Error('Failed to generate authentication token')
    
    }

}

export default generateToken;