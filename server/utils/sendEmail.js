const transporter = require("../config/mailConfig");

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"InvoiceFlow" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
