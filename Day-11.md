### Day 11 - Building a Complete Backend

- Code for access and refresh token with
crypto module
- How to generate email templates
- How to send emails in nodejs

### Vid 128. Code for access and refresh token with crypto module
ACCESS_TOKEN_SECRET
ACCESS_TOKEN_EXPIRY

REFRESH_TOKEN_SECRET
REFRESH_TOKEN_EXPIRY

```js
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
  );
};

userSchema.methods.generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex")

    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex")

    const tokenExpiry = Date.now() + (20*60*1000) //20 mins
    return {unHashedToken, hashedToken, tokenExpiry}
};
```

- crypto module from nodejs 
- 



### Vid 129. How to generate email templates

- register a user 
- take some data > validate the user  > check in DB if user exists > saved the new user > user verfication > email 
- mailgen library 
- utils > mail.js 

```js
import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagelink.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed siliently. Make sure that you have provided your MAILTRAP credentials in the .env file",
    );
    console.error("Error: ", error);
  }
};

const emailVerificationMailgenContent = (username, verficationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! we'are excited to have you on board.",
      action: {
        instructions:
          "To verify your email please click on the following button",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verficationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of your account",
      action: {
        instructions:
          "To reset your password click on the following button or link",
        button: {
          color: "#22BC66",
          text: "Reset password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};

```

- 
### Vid 130. How to send emails in nodejs

- send the email 
- prepare the content 
- send an email 
- development email and production email 
- AWS SES and Brevo 
- test mail platform - mailtrap     

```env
MAILTRAP_SMTP_HOST=
MAILTRAP_SMTP_PORT=
MAILTRAP_SMTP_USER=
MAILTRAP_SMTP_PASS=
```

The most common way to send emails in Node.js is by using **Nodemailer**, a popular and beginner-friendly library.

Below is a simple, safe setup.

---

## 1️⃣ Install Nodemailer

In your project folder, run:

```bash
npm install nodemailer
```

---

## 2️⃣ Basic Example (SMTP)

```js
const nodemailer = require("nodemailer");

async function sendEmail() {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password-or-app-password",
    },
  });

  // Email options
  const mailOptions = {
    from: "your-email@gmail.com",
    to: "receiver@example.com",
    subject: "Hello from Node.js",
    text: "This email was sent using Node.js!",
    // html: "<h1>Hello!</h1><p>This is HTML email</p>",
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.messageId);
}

sendEmail().catch(console.error);
```

---

## 3️⃣ Important Notes

* **Do not hard-code passwords** in real projects
  Use environment variables instead:

  ```js
  process.env.EMAIL_USER
  process.env.EMAIL_PASS
  ```
* If using **Gmail**, you usually need an **App Password**, not your normal password.
* For production apps, consider services like:

  * SendGrid
  * Mailgun
  * Amazon SES

---

## 4️⃣ Using Environment Variables (Recommended)

```bash
# .env file
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

```js
require("dotenv").config();

auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
}
```

---

## 5️⃣ When to Use Email APIs Instead of SMTP

Use an email API if you need:

* High volume emails
* Better deliverability
* Templates & analytics

---

If you want, I can also show:

* 📧 Sending emails from a **contact form**
* 🔐 Using **Gmail App Passwords**
* 🌐 Sending emails in **Express.js**
* 🎨 Email templates (HTML)


