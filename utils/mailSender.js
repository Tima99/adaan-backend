import nodemailer from "nodemailer";

const sendMail = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const token = body;

    let info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: `${email}`,
      subject: `${title}`,
      html: ` 
      <div style="background-color: #f2f2f2; padding: 20px;">
      
            <p style="color: #666;">Please verify your email address by clicking the link below:</p>
            <a href= ${process.env.URL}/auth/verify/${token} style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
        
            </div>
      `,
    });
    return info;
  } catch (err) {
    console.log(err.message);
  }
};

export default sendMail;
