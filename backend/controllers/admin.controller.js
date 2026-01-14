import jwt from 'jsonwebtoken';

// Update appointment status

// Cancel appointment

// Delete Appointment


// Admin Login
export const loginAdmin = async (req, res) => {
  const adminPassword = process.env.ADMIN_PASSWORD
  const adminEmail = process.env.ADMIN_EMAIL
  const jwtSecret = process.env.JWT_SECRET

  try {
    const { email, password } = req.body;

    if (email === adminEmail && password === adminPassword) {
      // payload as object, added expiration
      const token = jwt.sign({ email }, jwtSecret, { expiresIn: '7d' })
      res.json({ success: true, token });

    } else {
      res.json({ success: false, message: 'Email or password is incorrect' });
    }

  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
}
