import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Banking System" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function sendRegisterationEmail(userEmail, name) {
  const subject = "Welcome to Banking System";
  const text = `Hello ${name},\n\nThank you for register at Banking System.
  We are Exicted to have you on board!\n\n Best Regards,\nThe Backing System Team`;
  const html = `<p>Hello ${name}, </p><p>Thank you for registering at Banking System. 
  We're Exicted to have you on board!</p><p>Best regards, <br>The Banking System Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionSuccessEmail(userEmail, name, amount, toAccount) {
  const subject = "Transaction Successful.";
  const text = `hello ${name},\n\nYour Transaction of ${amount} to Account ${toAccount} was Successful.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>hello ${name},</p><p>Your Transaction of ${amount} to Account ${toAccount} was Successful.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailEmail(userEmail, name, amount, toAccount) {
  const subject = "Transaction Failed!";
  const text = `hello ${name},\n\nWe Regret to inform to that your Transaction of ${amount} to Account ${toAccount} was Failed.We were working on it for refund.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>hello ${name},</p><p>We Regret to inform to that your Transaction of ${amount} to Account ${toAccount} was Failed.We were working on it for refund</p><p>Best regards,<br>The Backend Ledger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}
export {
  sendRegisterationEmail,
  sendTransactionSuccessEmail,
  sendTransactionFailEmail,
};
