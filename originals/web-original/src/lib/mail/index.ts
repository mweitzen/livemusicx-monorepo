// TODO: add to monorepo

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_SITE_URL;

export { resend, domain };
