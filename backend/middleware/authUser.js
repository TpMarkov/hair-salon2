import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: 'Not authorized Login Again' })
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = token_decode.id
        next()

    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export default authUser
