# Admin Credentials Instructions

This guide explains how to update the administrator login credentials for the salon admin panel.

## Location of Credentials

The admin credentials are stored as environment variables in the backend directory.

**File Path:** `backend/.env`

## Variables to Update

Locate the following lines in your `.env` file:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
```

### Steps to Change:

1.  **Open the `.env` file** located in the `backend` folder.
2.  **Modify the `ADMIN_EMAIL`** to your desired login email.
3.  **Modify the `ADMIN_PASSWORD`** to your new secure password.
4.  **Save the file.**
5.  **Restart the backend server** for the changes to take effect.

> [!IMPORTANT]
> Make sure your `JWT_SECRET` is also set to a long, random string to ensure the security of your login tokens.

## Security Notes

- Never commit your `.env` file to version control (it should be ignored by `.gitignore`).
- Use a strong, unique password that isn't used for any other service.
- If you change these credentials, any existing logged-in sessions will be invalidated when their tokens expire (now set to 7 days).
