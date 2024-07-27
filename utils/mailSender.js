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

    let info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: `${email}`,
      subject: `${title}`,
      html: ` 
      <div style="background-color: #f2f2f2; padding: 20px;">
        ${body}
      </div>
      `,
    });
    return info;
  } catch (err) {
    console.log(err.message);
  }
};

export default sendMail;
