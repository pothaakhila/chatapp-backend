const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SG_KEY);

const sendSGMail = async ({
  to,
  sender,
  subject,
  html,
  attachments,
  text,
}) => {
  try {
    const from = "pothaakhila275@gmail.com"; // Ensure this email is verified with SendGrid

    const msg = {
      to: to, // Change to your recipient
      from: from, // Change to your verified sender
      subject: subject,
      html: html,
      text: text, // Uncomment if you want to include text content
      attachments: attachments, // Make sure attachments are correctly formatted
    };

    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.body : error.message);
    // Handle the error appropriately
  }
};

exports.sendEmail = async (args) => {
  if (process.env.NODE_ENV !== "development") {
    return Promise.resolve(); // Skip email sending if not in development
  } else {
    return sendSGMail(args);
  }
};
