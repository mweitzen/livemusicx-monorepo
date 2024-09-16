import { Resend } from "resend";

const resend = new Resend("re_a7GBUzMB_FpEyHN8mGgSyWPULncKqBKee");

resend.emails.send({
  from: "onboarding@resend.dev",
  to: "mweitzenhoffer@gmail.com",
  subject: "Hello World",
  html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
});
