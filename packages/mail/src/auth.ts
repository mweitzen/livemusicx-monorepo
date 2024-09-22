import { resend, domain } from ".";
// import { SendVerificationRequestParams } from "next-auth/providers";

const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "mail@auth-masterclass-tutorial.com",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "mail@auth-masterclass-tutorial.com",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "mail@auth-masterclass-tutorial.com",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

// const sendVerificationRequest = async (
//   params: SendVerificationRequestParams
// ) => {
//   try {
//     await resend.emails.send({
//       from: "YOUR EMAIL FROM (eg: team@resend.com)",
//       to: params.identifier,
//       subject: "YOUR EMAIL SUBJECT",
//       html: "YOUR EMAIL CONTENT",
//     });
//   } catch (error) {
//     console.log({ error });
//   }
// };

export {
  sendTwoFactorTokenEmail,
  sendPasswordResetEmail,
  sendVerificationEmail,
  // sendVerificationRequest,
};
