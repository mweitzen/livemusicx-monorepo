import { resend } from ".";

const testEmail = async () => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "mweitzenhoffer@gmail.com",
    subject: "Hello World",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });
};

export { testEmail };
