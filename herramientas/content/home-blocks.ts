import { cmsAssetSourceMap } from "./cms-source-map";
import { siteContact, siteSocialLinks } from "./site-contact";
import type { HomeBlock, SiteMeta } from "./types";

export const siteMeta: SiteMeta = {
  title: "Connections RD | Condos Steps from Playa Encuentro, Cabarete",
  description:
    "Luxury condos in Cabarete, Dominican Republic. Own near Playa Encuentro with refined coastal living, Airbnb-friendly ownership, and smart investment potential.",
  keywords:
    "Connections RD, Cabarete condos, Playa Encuentro real estate, Dominican Republic investment property, Airbnb friendly condos",
  ogImage: cmsAssetSourceMap.galleryDsc2665.local,
};

export const homeBlocks: HomeBlock[] = [
  {
    type: "ConnectionsNavbarBlock",
    props: {
      id: "home-ConnectionsNavbarBlock-0",
      links: [
        { href: "#lifestyle", label: "Lifestyle" },
        { href: "#units", label: "Floor Plans" },
        { href: "#amenities", label: "Amenities" },
        { href: "#location", label: "Location" },
        {
          href: "#",
          label: "Resources",
          children: [
            { href: "#investment", label: "Investment" },
            { href: "#community", label: "Community" },
            { href: "#lead-form", label: "Info Packet" },
            { href: "#", label: "Virtual Tour" },
          ],
        },
        { href: "#lead-form", label: "Contact", children: [] },
      ],
      logoDarkUrl: cmsAssetSourceMap.logoPrimary.local,
      logoDesktopWidth: 170,
      logoLightUrl: cmsAssetSourceMap.logoWhite.local,
      logoMobileWidth: 140,
      ownerAccessHref: "#lead-form",
      ownerAccessLabel: "Owners Access",
    },
  },
  {
    type: "ConnectionsHeroBlock",
    props: {
      id: "home-ConnectionsHeroBlock-1",
      badge: "PRIME CABARETE LOCATION",
      fallbackImageUrl: "",
      logoUrl: "",
      pricePrefix: "Condos from",
      priceValue: "$264,399",
      primaryHref: "#lead-form",
      primaryLabel: "Get Free Info Packet",
      secondaryHref: "#units",
      secondaryLabel: "View Floor Plans",
      showScrollIndicator: true,
      subtitle: "Wake up to surf, sunshine, and the freedom of a life \nwithout winter.",
      title: "𝐄𝐧𝐝𝐥𝐞𝐬𝐬 𝐒𝐮𝐦𝐦𝐞𝐫 𝐋𝐢𝐯𝐢𝐧𝐠",
      videoUrl: cmsAssetSourceMap.heroVideo.local,
    },
  },
  {
    type: "ConnectionsValuePropsBlock",
    props: {
      id: "home-ConnectionsValuePropsBlock-3",
      sectionLabel: "Lifestyle",
      title: "Refined Coastal Living in Cabarete",
      subtitle:
        "Own near Playa Encuentro in one of Cabarete’s most sought-after locations where international energy, everyday ease, and long-term value come together.",
      cards: [
        {
          icon: "Waves",
          title: "Surf & Wellness",
          description:
            "Live moments from one of the Caribbean’s most renowned surf destinations, with wellness, movement, and the natural rhythm of coastal life built into every day.",
        },
        {
          icon: "Users",
          title: "Community & Culture",
          description:
            "Experience an international community defined by creativity, connection, and a sophisticated yet relaxed way of living.",
        },
        {
          icon: "DollarSign",
          title: "Investment & Benefits",
          description:
            "With Airbnb-friendly ownership, attractive tax advantages, and strong market appeal, Connections offers a rare blend of lifestyle and investment potential.",
        },
      ],
    },
  },
  {
    type: "ConnectionsCommunityPerksBlock",
    props: {
      id: "home-ConnectionsCommunityPerksBlock-8",
      sectionLabel: "Community",
      title: "Exclusive Community Perks",
      subtitle: "Being part of Connections RD means enjoying exclusive benefits and discounts.",
      cards: [
        {
          icon: "Bus",
          title: "Free Shuttle Bus",
          description: "Complimentary transportation to key destinations around Cabarete and Sosua.",
        },
        {
          icon: "Dumbbell",
          title: "Private Gym",
          description: "Work out at your own pace in our premium, private facilities.",
        },
        {
          icon: "Anchor",
          title: "Beach Club Access",
          description: "Priority access to Front Loop beach club facilities.",
        },
      ],
    },
  },
  {
    type: "ConnectionsFloorPlansBlock",
    props: {
      id: "home-ConnectionsFloorPlansBlock-5",
      sectionLabel: "Floor Plans",
      title: "Find Your Perfect Unit",
      subtitle:
        "Luxury 2 & 3-bedroom condos with rooftop penthouses available. Each unit designed for comfort, style, and optimal ocean views.",
      ctaLabel: "Schedule a Tour",
      ctaHref: "#lead-form",
      tabs: [
        {
          label: "2 Bedroom",
          sqft: "1,200 sq ft",
          price: "From $264,399",
          features: [{ value: "2 Bathrooms" }, { value: "4-5 Balconies" }, { value: "Ocean View" }, { value: "Airbnb Friendly" }],
          slides: [
            {
              imageAlt: "Imagen 1",
              imageCaption: "",
              imageUrl: cmsAssetSourceMap.floorPlanDsc2550.local,
            },
            {
              imageAlt: "Imagen 2",
              imageCaption: "",
              imageUrl: cmsAssetSourceMap.floorPlanDsc2545.local,
            },
          ],
        },
        {
          label: "3 Bedroom",
          sqft: "1,800 sq ft",
          price: "From $389,999",
          features: [{ value: "3 Bathrooms" }, { value: "5+ Balconies" }, { value: "Panoramic Views" }, { value: "Airbnb Friendly" }],
        },
        {
          label: "Rooftop",
          sqft: "2,500+ sq ft",
          price: "From $549,999",
          features: [{ value: "Private Rooftop" }, { value: "360° Views" }, { value: "Premium Finishes" }, { value: "Jacuzzi" }],
        },
      ],
    },
  },
  {
    type: "ConnectionsInvestmentBlock",
    props: {
      id: "home-ConnectionsInvestmentBlock-7",
      sectionLabel: "Investment",
      title: "Extraordinary Lifestyle, Smart Investment",
      subtitle: "Beyond the beach lifestyle, Connections RD offers compelling financial benefits.",
      cards: [
        {
          icon: "DollarSign",
          title: "Passive Income Potential",
          description:
            "Airbnb-friendly units let you generate rental income when you're not enjoying your paradise home. Strong tourism demand in Cabarete ensures excellent occupancy rates.",
        },
        {
          icon: "FileText",
          title: "Tax Benefits",
          description:
            "Benefit from significant tax exemptions for retirees under Dominican Law 171-07. Transfer taxes are reduced, and retirement income may be tax-exempt.",
        },
        {
          icon: "Globe",
          title: "Residency Benefits",
          description:
            "All units are eligible for Dominican residency through purchase. Open a local bank account, access healthcare, and establish your permanent home in paradise.",
        },
      ],
    },
  },
  {
    type: "ConnectionsAmenitiesBlock",
    props: {
      id: "home-ConnectionsAmenitiesBlock-6",
      sectionLabel: "Amenities",
      title: "World-Class Amenities",
      subtitle: "Thoughtfully designed for comfort, luxury, and seamless living.",
      items: [
        { icon: "Waves", label: "Minutes away from the Beach" },
        { icon: "Droplets", label: "Swimming Pool & Jacuzzi" },
        { icon: "Dumbbell", label: "Fully Equipped Gym" },
        { icon: "Shield", label: "24/7 Gated Security" },
        { icon: "Bus", label: "Free Shuttle Bus" },
        { icon: "Car", label: "Covered Parking" },
        { icon: "Coffee", label: "Restaurant Discounts" },
        { icon: "Heart", label: "Pet Friendly" },
        { icon: "Home", label: "Airbnb Friendly" },
        { icon: "Zap", label: "24/7 Backup Generator" },
        { icon: "Building", label: "Elevator Access" },
        { icon: "Activity", label: "Water Cistern System" },
      ],
    },
  },
  {
    type: "GalleryBlock",
    props: {
      id: "GalleryBlock-38dddb63-ead5-4588-bf22-4a8e3208e658",
      titulo: "",
      columnas: 3,
      items: [{ alt: "Media 2", caption: "", imageUrl: "", type: "image", videoUrl: "" }],
    },
  },
  {
    type: "ConnectionsGalleryBlock",
    props: {
      id: "home-ConnectionsGalleryBlock-4",
      sectionLabel: "Gallery",
      title: "Life at Connections RD",
      items: [
        {
          alt: "Aerial view of Connections RD property",
          caption: "Modern Beachfront Living",
          imageUrl: cmsAssetSourceMap.galleryDsc2665.local,
        },
        {
          alt: "Luxury condo interior with ocean view",
          caption: "Stunning Pool",
          imageUrl: cmsAssetSourceMap.floorPlanDsc2545.local,
        },
        {
          alt: "Community sunset gathering",
          caption: "Sunset Gatherings",
          imageUrl: cmsAssetSourceMap.floorPlanDsc2550.local,
        },
      ],
    },
  },
  {
    type: "ConnectionsLocationBlock",
    props: {
      id: "home-ConnectionsLocationBlock-9",
      sectionLabel: "Location",
      title: "Prime Cabarete Location",
      subtitle:
        "Connections RD is perfectly positioned just steps from the world-famous Playa Encuentro - the Caribbean's premier kitesurfing and surfing destination. Cabarete's vibrant downtown, with its restaurants, bars, and shops, is just minutes away.",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.6613078679087!2d-70.4163853850941!3d19.7468479868356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1cf6d6d1e0f5%3A0x4b0a7d97c3a8ef3c!2sPlaya%20Encuentro%2C%20Cabarete%2C%20Dominican%20Republic!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus",
      highlights: [
        { icon: "MapPin", label: "Playa Encuentro", distance: "5 minutes away from the Beach" },
        { icon: "Clock", label: "Cabarete Downtown", distance: "15 min" },
        { icon: "Waves", label: "Sosua Beach", distance: "15 min" },
        { icon: "Plane", label: "Puerto Plata Airport", distance: "20 min" },
      ],
    },
  },
  {
    type: "ConnectionsWeatherBlock",
    props: {
      id: "home-ConnectionsWeatherBlock-2",
      conditionHumid: "Humid",
      conditionLabel: "Condition",
      conditionMostlySunny: "Sunny",
      conditionPartlyCloudy: "Partly Cloudy",
      conditionRainy: "Rainy",
      conditionUnknown: "No Data",
      conditionWindy: "Windy",
      humidityLabel: "Humidity",
      narrative: "Track live conditions at the project - surf, sun, and sea breeze all year long.",
      sectionLabel: "Live Weather",
      temperatureLabel: "Temperature",
      title: "Real-time Weather at Cabarete",
      toggleLabelC: "°C",
      toggleLabelF: "°F",
      uvLabel: "UV Index",
      windLabel: "Wind",
    },
  },
  {
    type: "ConnectionsLeadFormBlock",
    props: {
      id: "home-ConnectionsLeadFormBlock-10",
      sectionLabel: "Contact",
      title: "Get Your Free Info Packet",
      subtitle: "Receive detailed pricing, floor plans, and everything you need to know about living at Connections RD.",
      firstNameLabel: "First Name",
      lastNameLabel: "Last Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone (with country code)",
      unitLabel: "Interested In",
      unitOptions: [{ value: "2 Bedroom Condo" }, { value: "3 Bedroom Condo" }, { value: "Rooftop Penthouse" }, { value: "Not sure yet" }],
      messageLabel: "Questions or Comments",
      submitLabel: "Send Me the Info Packet",
      secondaryCTALabel: "Schedule a Call",
      secondaryCTAHref: siteContact.phoneHref,
      successTitle: "Thank You!",
      successMessage:
        "Your info packet is on its way. Check your email within the next few minutes. We can't wait to welcome you to the Connections RD family!",
      privacyNote: "Your information is secure and will never be shared. We respect your privacy.",
    },
  },
  {
    type: "ConnectionsFooterBlock",
    props: {
      id: "home-ConnectionsFooterBlock-11",
      logoUrl: cmsAssetSourceMap.logoWhite.local,
      tagline: "Connections RD",
      description: "Your gateway to Caribbean paradise. Luxury condos steps from world-class surf at Playa Encuentro, Cabarete.",
      phone: siteContact.phone,
      email: siteContact.email,
      quickLinksTitle: "Quick Links",
      resourcesTitle: "Resources",
      legal: "All rights reserved.",
      links: [
        { href: "#lifestyle", label: "Lifestyle" },
        { href: "#units", label: "Floor Plans" },
        { href: "#amenities", label: "Amenities" },
        { href: "#location", label: "Location" },
      ],
      resourcesLinks: [
        { href: "#investment", label: "Investment" },
        { href: "#community", label: "Community" },
        { href: "#lead-form", label: "Info Packet" },
        { href: "#", label: "Virtual Tour" },
      ],
      instagramHref: siteSocialLinks.instagramHref,
      facebookHref: siteSocialLinks.facebookHref,
      youtubeHref: siteSocialLinks.youtubeHref,
      whatsappHref: siteSocialLinks.whatsappHref,
    },
  },
];
