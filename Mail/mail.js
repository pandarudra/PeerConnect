import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

const OAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export const sendMail = async (to, uname) => {
  const accessToken = await OAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
  const mailOptions = {
    from: `"PeerConnect" <${process.env.GMAIL}>`,
    to: to,
    subject: `Welcome to PeerConnect!`,
    text: `Hello ${uname},
  
  Welcome to PeerConnect! We're thrilled to have you join our community. At PeerConnect, we strive to create a platform where you can connect, collaborate, and grow with like-minded individuals.
  
  Here are a few things you can do to get started:
  - Explore our community forums and join discussions on topics that interest you.
  - Connect with peers and expand your professional network.
  - Access a wealth of resources and tools to help you achieve your goals.
  
  If you have any questions or need assistance, feel free to reach out to our support team at any time.
  
  We're excited to see what you'll achieve with PeerConnect!
  
  Best regards,
  The PeerConnect Team
  `,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
