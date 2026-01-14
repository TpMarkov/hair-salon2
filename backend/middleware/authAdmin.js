import jwt from 'jsonwebtoken'

const authAdminMiddleware = async (req, res, next) => {
  const jwtSecret = process.env.JWT_SECRET
  try {
    const { admintoken } = req.headers
    const adminToken = admintoken

    if (!adminToken) {
      return res.status(401).json({ success: false, message: 'No admin token' })
    }

    const token_decode = jwt.verify(adminToken, jwtSecret)

    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ success: false, message: 'Admin token is incorrect' })
    }

    next()

  } catch (err) {
    console.log(err)
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired. Please login again.' })
    }
    res.status(401).json({ success: false, message: err.message })
  }
}

export default authAdminMiddleware