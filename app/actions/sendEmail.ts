
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'example@gmail.com', 
    pass: '123456', 
  },
});


async function sendEmail(to:string, subject:string, text:string, html:string) {
  try {
    const info = await transporter.sendMail({
      from: 'your-email@gmail.com', 
      to,
      subject,
      text,
      html,
    });

    console.log('Email sent:', info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Email not sent' };
  }
}

module.exports = sendEmail;
