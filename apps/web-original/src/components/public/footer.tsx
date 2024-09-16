import Link from "next/link";
import Brand from "@/components/shared/brand";
import { slogan } from "@/lib/content/global";
import { SocialIcon } from "react-social-icons";
import { TypographyMuted } from "../shared/typography";

const sections = ["Explore", "Discover", "User Account", "Contact & Support"];
const navigation = [
  [
    { href: "/events", text: "Events" },
    { href: "/performers", text: "Performers" },
    { href: "/musicians", text: "Musicians" },
    { href: "/groups", text: "Groups" },
    { href: "/venues", text: "Venues" },
    { href: "/organizers", text: "Organizers" },
  ],
  [
    { href: "/about", text: "About Us" },
    { href: "#", text: "Documentation" },
    { href: "/features", text: "Account Features" },
    { href: "/help-out", text: "Help Us Out" },
    { href: "/privacy", text: "Privacy" },
    { href: "/terms", text: "Terms & Conditions" },
  ],
  [
    { href: "/signup", text: "Sign Up" },
    { href: "/login", text: "Log In" },
    { href: "/account", text: "Account" },
  ],
  [
    { href: "#", text: "Contact Us" },
    { href: "#", text: "Careers" },
    { href: "#", text: "Support" },
    { href: "#", text: "FAQ" },
  ],
];

const socialAccounts = [
  { href: "#", text: "Instagram" },
  { href: "#", text: "Facebook" },
  { href: "#", text: "Twitter" },
  { href: "#", text: "YouTube" },
];

function NavigationSection({
  title,
  links,
}: {
  title: string;
  links: { href: string; text: string }[];
}) {
  return (
    <section className="space-y-6">
      <p className="font-semibold">{title}</p>
      <ul className="text-copy-secondary space-y-4">
        {links.map((link, j) => (
          <li key={`x${j}`}>
            <Link href={link.href}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer w-full px-4 md:px-6 lg:px-8">
      <div className="py-16 md:py-24 lg:py-36">
        <div className="mb-12 space-y-2">
          <Brand displayText />
          <TypographyMuted>{slogan}</TypographyMuted>
        </div>
        <nav className="grid grid-cols-2 gap-x-2 gap-y-6 lg:grid-cols-4">
          {navigation.map((links, i) => (
            <NavigationSection key={`x${i}`} title={sections[i]} links={links} />
          ))}
        </nav>
      </div>
      <div className="flex w-full justify-center gap-2 pb-2 sm:justify-start">
        {[
          "https://www.facebook.com/mikey.weitzenhoffer",
          "https://www.instagram.com/mike.weitzenhoffer/",
        ].map((link) => (
          <SocialIcon
            key={link}
            url={link}
            bgColor="hsl(222.2 47.4% 11.2%)"
            style={{ height: 32, width: 32 }}
          />
        ))}
      </div>
      <TypographyMuted className="border-t py-8 text-center sm:text-left">
        © {currentYear} LiveMusicX.com <br className="sm:hidden" />
        All rights reserved.
      </TypographyMuted>
    </footer>
  );
}
