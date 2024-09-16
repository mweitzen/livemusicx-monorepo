const iconClass = "mr-4 h-4 w-4";

import {
  HomeIcon,
  StarIcon,
  GlobeAltIcon,
  UserPlusIcon,
  UserGroupIcon,
  Cog8ToothIcon,
  UserCircleIcon,
  MusicalNoteIcon,
  CalendarDaysIcon,
  InformationCircleIcon,
  BuildingStorefrontIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/20/solid";

import { CalendarPlusIcon } from "lucide-react";

/*
 *
 *
 *
 * TYPES */
type RouteAccess = "public" | "protected" | "authorized";
type RouteSection = "general" | "auth" | "core" | "admin";

interface NavigationOptions {
  main: boolean;
  mobile: boolean;
  admin: boolean;
  footer: boolean;
}
interface RouteOptions {
  name: string;
  href: string;
  icon?: React.ReactNode;
  access: RouteAccess;
  section: RouteSection;
  navigation: NavigationOptions;
}

/*
 *
 *
 *
 * ROUTES */
const routes = [
  /*
   *
   *
   *
   * GENERAL ROUTES */
  {
    name: "Homepage",
    icon: <HomeIcon className={iconClass} />,
    href: "/",
    access: "public",
    section: "general",
    navigation: {
      main: false,
      mobile: false,
      admin: false,
      footer: false,
    },
  },
  {
    name: "About",
    icon: <InformationCircleIcon className={iconClass} />,
    href: "/about",
    access: "public",
    section: "general",
    navigation: {
      main: false,
      mobile: false,
      admin: false,
      footer: true,
    },
  },
  {
    name: "Documentation",
    href: "/docs",
    access: "public",
    section: "general",
    navigation: {
      main: false,
      mobile: false,
      admin: false,
      footer: true,
    },
  },
  {
    name: "Features",
    href: "/features",
    access: "public",
    section: "general",
    navigation: {
      main: false,
      mobile: false,
      admin: false,
      footer: true,
    },
  },
  {
    name: "Help Out",
    href: "/help-out",
    access: "public",
    section: "general",
    navigation: {
      main: false,
      mobile: false,
      admin: false,
      footer: true,
    },
  },
  {
    name: "Privacy Policy",
    href: "/privacy",
    access: "public",
    section: "general",
    navigation: {
      main: false,
      mobile: false,
      admin: false,
      footer: true,
    },
  },
  {
    name: "Terms and Conditions",
    href: "/terms",
    access: "public",
    section: "general",
    navigation: {
      main: false,
      mobile: false,
      admin: false,
      footer: true,
    },
  },

  /*
   *
   *
   *
   * USER AUTH ROUTES */
  {
    name: "Signup",
    href: "/signup",
    access: "public",
    section: "auth",
    navigation: {
      main: false,
      mobile: false,
      admin: false,
      footer: true,
    },
  },
  {
    name: "Login",
    href: "/login",
    access: "public",
    section: "auth",
    navigation: {
      main: false,
      mobile: false,
      admin: false,
      footer: true,
    },
  },
  {
    name: "Favorites",
    icon: <StarIcon className={iconClass} />,
    href: "/favorites",
    access: "protected",
    section: "auth",
    navigation: {
      main: false,
      mobile: true,
      admin: false,
      footer: false,
    },
  },
  {
    name: "User Account",
    icon: <UserCircleIcon className={iconClass} />,
    href: "/account",
    access: "protected",
    section: "auth",
    navigation: {
      main: false,
      mobile: false,
      admin: false,
      footer: true,
    },
  },

  /*
   *
   *
   *
   * CORE PUBLIC ROUTES */
  {
    name: "Events",
    icon: <CalendarDaysIcon className={iconClass} />,
    href: "/events",
    access: "public",
    section: "core",
    navigation: {
      main: true,
      mobile: true,
      admin: false,
      footer: true,
    },
  },
  {
    name: "Performers",
    href: "/performers",
    icon: <MusicalNoteIcon className={iconClass} />,
    access: "public",
    section: "core",
    navigation: {
      main: true,
      mobile: true,
      admin: false,
      footer: true,
    },
  },
  {
    name: "Musicians",
    href: "/musicians",
    access: "public",
    section: "core",
    navigation: {
      main: false,
      mobile: false,
      admin: false,
      footer: true,
    },
  },
  {
    name: "Groups",
    href: "/groups",
    access: "public",
    section: "core",
    navigation: {
      main: false,
      mobile: false,
      admin: false,
      footer: true,
    },
  },
  {
    name: "Venues",
    icon: <BuildingStorefrontIcon className={iconClass} />,
    href: "/venues",
    access: "public",
    section: "core",
    navigation: {
      main: true,
      mobile: true,
      admin: false,
      footer: true,
    },
  },
  {
    name: "Organizers",
    icon: <GlobeAltIcon className={iconClass} />,
    href: "/organizers",
    access: "public",
    section: "core",
    navigation: {
      main: true,
      mobile: true,
      admin: false,
      footer: true,
    },
  },

  /*
   *
   *
   *
   * ADMIN ROUTES */
  {
    name: "Dashboard",
    href: "/admin",
    access: "authorized",
    section: "admin",
    navigation: {
      main: false,
      mobile: false,
      admin: true,
      footer: false,
    },
  },
  {
    name: "Events",
    icon: <CalendarPlusIcon className={iconClass} />,
    href: "/admin/events",
    access: "authorized",
    section: "admin",
    navigation: {
      main: false,
      mobile: true,
      admin: true,
      footer: false,
    },
  },
  {
    name: "Accounts",
    icon: <UserPlusIcon className={iconClass} />,
    href: "/admin/accounts",
    access: "authorized",
    section: "admin",
    navigation: {
      main: false,
      mobile: true,
      admin: true,
      footer: false,
    },
  },
  {
    name: "Affiliates",
    icon: <UserGroupIcon className={iconClass} />,
    href: "/admin/affiliates",
    access: "authorized",
    section: "admin",
    navigation: {
      main: false,
      mobile: true,
      admin: true,
      footer: false,
    },
  },
  {
    name: "Bulletins",
    icon: <ClipboardDocumentListIcon className={iconClass} />,
    href: "/admin/bulletins",
    access: "authorized",
    section: "admin",
    navigation: {
      main: false,
      mobile: true,
      admin: true,
      footer: false,
    },
  },
  {
    name: "Messages",
    icon: <ChatBubbleLeftRightIcon className={iconClass} />,
    href: "/admin/messages",
    access: "authorized",
    section: "admin",
    navigation: {
      main: false,
      mobile: true,
      admin: true,
      footer: false,
    },
  },
  {
    name: "Settings",
    icon: <Cog8ToothIcon className={iconClass} />,
    href: "/admin/settings",
    access: "authorized",
    section: "admin",
    navigation: {
      main: false,
      mobile: true,
      admin: true,
      footer: false,
    },
  },
];

/*
 *
 *
 *
 * EXPORTS */
export { routes };
