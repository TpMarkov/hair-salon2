import jwt from 'jsonwebtoken'

const authAdminMiddleware = async (req, res, next) => {
  const jwtSecret = process.env.JWT_SECRET
  try {
    const { admintoken } = req.headers
    const adminToken = admintoken

    if (!adminToken) {
      return res.json({ success: false, message: 'No admin token' })
    }

    const token_decode = jwt.verify(adminToken, jwtSecret)

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: 'Admin token is incorrect' })
    }

    next()

  } catch (err) {
    console.log(err)
    res.json({ success: false, message: err.message })
  }
}

export default authAdminMiddleware