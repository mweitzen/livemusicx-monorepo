import {
  Search,
  Music,
  Ticket,
  Share,
  CreditCard,
  Megaphone,
  Globe,
  Smartphone,
  Calendar,
  DollarSign,
  Camera,
  Video,
  Headphones,
  Radio,
  Pen,
  BarChart,
  ShoppingCart,
  TrendingUp,
  Mail,
  Phone,
  MessageSquare,
  Zap,
  Cloud,
  PieChart,
  Users,
  Lock,
} from "@repo/ui/icons";

export const socialIntegrations = [
  {
    name: "Facebook",
    description: "Share events and connect with fans",
    icon: <Share className='h-6 w-6' />,
    category: "Social",
    connected: true,
  },
  {
    name: "Instagram",
    description: "Post event photos and stories",
    icon: <Camera className='h-6 w-6' />,
    category: "Social",
  },
  {
    name: "Twitter",
    description: "Tweet about upcoming shows",
    icon: <Share className='h-6 w-6' />,
    category: "Social",
  },
  {
    name: "LinkedIn",
    description: "Network with industry professionals",
    icon: <Users className='h-6 w-6' />,
    category: "Social",
  },
  {
    name: "TikTok",
    description: "Create viral content for your events",
    icon: <Video className='h-6 w-6' />,
    category: "Social",
  },
  {
    name: "YouTube",
    description: "Share event videos and live streams",
    icon: <Video className='h-6 w-6' />,
    category: "Social",
  },
];

export const businessIntegrations = [
  {
    name: "QuickBooks",
    description: "Manage finances and invoicing",
    icon: <DollarSign className='h-6 w-6' />,
    category: "Business",
    connected: true,
  },
  {
    name: "Salesforce",
    description: "CRM for managing client relationships",
    icon: <Users className='h-6 w-6' />,
    category: "Business",
  },
  {
    name: "Slack",
    description: "Team communication and collaboration",
    icon: <MessageSquare className='h-6 w-6' />,
    category: "Business",
  },
  {
    name: "Zoom",
    description: "Video conferencing for virtual events",
    icon: <Video className='h-6 w-6' />,
    category: "Business",
  },
  {
    name: "Square",
    description: "Point of sale for merchandise",
    icon: <ShoppingCart className='h-6 w-6' />,
    category: "Business",
  },
  {
    name: "Shopify",
    description: "E-commerce platform for merchandise",
    icon: <ShoppingCart className='h-6 w-6' />,
    category: "Business",
  },
];

export const musicIntegrations = [
  {
    name: "Spotify",
    description: "Share playlists and artist profiles",
    icon: <Music className='h-6 w-6' />,
    category: "Music",
    connected: true,
  },
  {
    name: "Apple Music",
    description: "Promote your music on Apple platforms",
    icon: <Music className='h-6 w-6' />,
    category: "Music",
  },
  {
    name: "SoundCloud",
    description: "Upload and share your tracks",
    icon: <Headphones className='h-6 w-6' />,
    category: "Music",
  },
  {
    name: "Bandcamp",
    description: "Sell your music and merchandise",
    icon: <Music className='h-6 w-6' />,
    category: "Music",
  },
  {
    name: "YouTube Music",
    description: "Share your music videos",
    icon: <Music className='h-6 w-6' />,
    category: "Music",
  },
  {
    name: "Pandora",
    description: "Reach listeners through radio",
    icon: <Radio className='h-6 w-6' />,
    category: "Music",
  },
];

export const ticketingIntegrations = [
  {
    name: "Ticketmaster",
    description: "Sell tickets through Ticketmaster",
    icon: <Ticket className='h-6 w-6' />,
    category: "Ticketing",
    connected: true,
  },
  {
    name: "Eventbrite",
    description: "Create and manage events",
    icon: <Calendar className='h-6 w-6' />,
    category: "Ticketing",
  },
  {
    name: "StubHub",
    description: "Resale marketplace for tickets",
    icon: <Ticket className='h-6 w-6' />,
    category: "Ticketing",
  },
  {
    name: "SeatGeek",
    description: "Ticket search engine and marketplace",
    icon: <Ticket className='h-6 w-6' />,
    category: "Ticketing",
  },
  {
    name: "AXS",
    description: "Ticketing and event management",
    icon: <Ticket className='h-6 w-6' />,
    category: "Ticketing",
  },
  {
    name: "Dice",
    description: "Mobile-first ticketing platform",
    icon: <Smartphone className='h-6 w-6' />,
    category: "Ticketing",
  },
];

export const marketingIntegrations = [
  {
    name: "Mailchimp",
    description: "Email marketing campaigns",
    icon: <Mail className='h-6 w-6' />,
    category: "Marketing",
    connected: true,
  },
  {
    name: "Google Ads",
    description: "Online advertising platform",
    icon: <Megaphone className='h-6 w-6' />,
    category: "Marketing",
  },
  {
    name: "HubSpot",
    description: "Inbound marketing and sales",
    icon: <Megaphone className='h-6 w-6' />,
    category: "Marketing",
  },
  {
    name: "Hootsuite",
    description: "Social media management",
    icon: <Share className='h-6 w-6' />,
    category: "Marketing",
  },
  {
    name: "Canva",
    description: "Graphic design for promotions",
    icon: <Pen className='h-6 w-6' />,
    category: "Marketing",
  },
  {
    name: "Constant Contact",
    description: "Email and Social media marketing",
    icon: <Mail className='h-6 w-6' />,
    category: "Marketing",
  },
];

export const eventManagementIntegrations = [
  {
    name: "Cvent",
    description: "Event management and planning",
    icon: <Calendar className='h-6 w-6' />,
    category: "Event",
  },
  {
    name: "Bizzabo",
    description: "All-in-one event software",
    icon: <Calendar className='h-6 w-6' />,
    category: "Event",
  },
  {
    name: "Eventmobi",
    description: "Mobile event apps and management",
    icon: <Smartphone className='h-6 w-6' />,
    category: "Event",
  },
  {
    name: "Whova",
    description: "Virtual and hybrid event platform",
    icon: <Globe className='h-6 w-6' />,
    category: "Event",
  },
  {
    name: "Hopin",
    description: "Virtual and hybrid events platform",
    icon: <Video className='h-6 w-6' />,
    category: "Event",
  },
];

export const paymentIntegrations = [
  {
    name: "Stripe",
    description: "Online payment processing",
    icon: <CreditCard className='h-6 w-6' />,
    category: "Payment",
  },
  {
    name: "PayPal",
    description: "Digital payment platform",
    icon: <DollarSign className='h-6 w-6' />,
    category: "Payment",
  },
  {
    name: "Square",
    description: "Point of sale and payment processing",
    icon: <CreditCard className='h-6 w-6' />,
    category: "Payment",
  },
  {
    name: "Braintree",
    description: "Payment gateway for web and mobile",
    icon: <CreditCard className='h-6 w-6' />,
    category: "Payment",
  },
  {
    name: "Authorize.net",
    description: "Payment gateway solution",
    icon: <Lock className='h-6 w-6' />,
    category: "Payment",
  },
];

export const analyticsIntegrations = [
  {
    name: "Google Analytics",
    description: "Web analytics service",
    icon: <PieChart className='h-6 w-6' />,
    category: "Analytics",
  },
  {
    name: "Mixpanel",
    description: "Product analytics for user insights",
    icon: <BarChart className='h-6 w-6' />,
    category: "Analytics",
  },
  {
    name: "Amplitude",
    description: "Product analytics platform",
    icon: <TrendingUp className='h-6 w-6' />,
    category: "Analytics",
  },
  {
    name: "Tableau",
    description: "Data visualization and analytics",
    icon: <PieChart className='h-6 w-6' />,
    category: "Analytics",
  },
  {
    name: "Looker",
    description: "Business intelligence and analytics",
    icon: <Search className='h-6 w-6' />,
    category: "Analytics",
  },
];

export const communicationIntegrations = [
  {
    name: "Twilio",
    description: "SMS and voice communications",
    icon: <Phone className='h-6 w-6' />,
    category: "Communication",
  },
  {
    name: "Intercom",
    description: "Customer messaging platform",
    icon: <MessageSquare className='h-6 w-6' />,
    category: "Communication",
  },
  {
    name: "Zendesk",
    description: "Customer service and engagement",
    icon: <Headphones className='h-6 w-6' />,
    category: "Communication",
  },
  {
    name: "Mailgun",
    description: "Email API service",
    icon: <Mail className='h-6 w-6' />,
    category: "Communication",
  },
  {
    name: "SendGrid",
    description: "Email delivery service",
    icon: <Mail className='h-6 w-6' />,
    category: "Communication",
  },
];

export const otherIntegrations = [
  {
    name: "Google Calendar",
    description: "Sync events with your calendar",
    icon: <Calendar className='h-6 w-6' />,
    category: "Other",
    connected: true,
  },
  {
    name: "Zapier",
    description: "Automate workflows between apps",
    icon: <Zap className='h-6 w-6' />,
    category: "Other",
  },
  {
    name: "IFTTT",
    description: "Create conditional action chains",
    icon: <Zap className='h-6 w-6' />,
    category: "Other",
  },
  {
    name: "Dropbox",
    description: "Cloud storage and file sharing",
    icon: <Cloud className='h-6 w-6' />,
    category: "Other",
  },
  {
    name: "Google Drive",
    description: "Cloud storage and collaboration",
    icon: <Cloud className='h-6 w-6' />,
    category: "Other",
  },
];
