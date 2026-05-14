import { siteAssets } from "./assets";
import { siteContact, siteSocialLinks } from "./site-contact";
import type { HomeBlock, SiteMeta } from "./types";

export const siteMeta: SiteMeta = {
  title: "Connections RD | Condos Steps from Playa Encuentro, Cabarete",
  description:
    "Luxury condos in Cabarete, Dominican Republic. Own near Playa Encuentro with refined coastal living, Airbnb-friendly ownership, and smart investment potential.",
  keywords:
    "Connections RD, Cabarete condos, Playa Encuentro real estate, Dominican Republic investment property, Airbnb friendly condos",
  ogImage: siteAssets.galleryDsc2665,
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
            { href: "#lead-form", label: "Info Packet" },
            { href: "#", label: "Virtual Tour" },
          ],
        },
        { href: "#lead-form", label: "Contact", children: [] },
      ],
      logoDarkUrl: siteAssets.logoPrimary,
      logoDesktopWidth: 170,
      logoLightUrl: siteAssets.logoWhite,
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
      videoUrl: siteAssets.heroVideo,
    },
  },
  {
    type: "ConnectionsLifestyleAtlasBlock",
    props: {
      id: "home-ConnectionsLifestyleAtlasBlock-1",
      sectionLabel: "Lifestyle",
      title: "Refined Coastal Living in Cabarete",
      subtitle:
        "Own near Playa Encuentro in one of Cabarete's most sought-after locations where international energy, everyday ease, and long-term value come together.",
      primaryCtaHref: "#lead-form",
      primaryCtaLabel: "Get Free Info Packet",
      secondaryCtaHref: "#units",
      secondaryCtaLabel: "View Floor Plans",
      chapters: [
        {
          id: "beach-surf",
          icon: "Waves",
          label: "Beach & Surf",
          eyebrow: "Playa Encuentro rhythm",
          title: "Start the day where Cabarete comes alive.",
          description:
            "Connections RD is built around the feeling people come to the north coast for: ocean air, movement, sunshine, and easy access to one of the Caribbean's most recognizable surf communities.",
          metric: { label: "Beach proximity", value: "5 min to the beach" },
          media: [
            {
              alt: "Morning surf lifestyle near Playa Encuentro",
              caption: "Morning surf rhythm near Playa Encuentro",
              imageUrl: siteAssets.lifestyleAtlasBeachMorning,
            },
            {
              alt: "Connections RD outdoor coastal community space",
              caption: "Outdoor living shaped by Cabarete weather",
              imageUrl: siteAssets.floorPlanDsc2550,
            },
          ],
          highlights: [
            {
              icon: "Waves",
              title: "Surf culture",
              description: "Live near Playa Encuentro's surf and wellness energy.",
            },
            {
              icon: "Sun",
              title: "No winter mindset",
              description: "A daily environment built around light, movement, and outdoor living.",
            },
            {
              icon: "MapPin",
              title: "Cabarete access",
              description: "Close to beach days, restaurants, shops, and social life.",
            },
          ],
        },
        {
          id: "residences",
          icon: "Home",
          label: "Residences",
          eyebrow: "Lock-and-leave ownership",
          title: "Residences that work as a home base and a getaway.",
          description:
            "The unit mix is designed for comfort, views, and flexible ownership, with floor plans that support both personal use and rental appeal.",
          metric: { label: "Starting price", value: "From $264,399" },
          media: [
            {
              alt: "Modern tropical residence balcony with coastal view",
              caption: "Private balcony living with coastal ease",
              imageUrl: siteAssets.lifestyleAtlasResidenceBalcony,
            },
            {
              alt: "Connections RD residence floor plan preview",
              caption: "Residences with generous outdoor living",
              imageUrl: siteAssets.floorPlanDsc2550,
            },
          ],
          highlights: [
            {
              icon: "Building",
              title: "2 and 3 bedroom options",
              description: "Choose from practical layouts, larger residences, and rooftop living.",
            },
            {
              icon: "Camera",
              title: "Balconies and views",
              description: "Outdoor space is part of the ownership experience.",
            },
            {
              icon: "Key",
              title: "Easy ownership",
              description: "Designed for people who want a polished Caribbean base without daily friction.",
            },
          ],
        },
        {
          id: "amenities",
          icon: "Sparkles",
          label: "Amenities",
          eyebrow: "Resort comfort",
          title: "The comforts buyers expect are built into the day.",
          description:
            "The project combines the essentials that make coastal ownership feel smooth: pool, jacuzzi, private gym, security, covered parking, backup systems, and elevator access.",
          metric: { label: "Everyday support", value: "24/7 comfort" },
          media: [
            {
              alt: "Connections RD pool and residence detail",
              caption: "Pool, jacuzzi, and relaxed residence life",
              imageUrl: siteAssets.floorPlanDsc2545,
            },
            {
              alt: "Connections RD community outdoor area",
              caption: "A visual preview of the amenity lifestyle",
              imageUrl: siteAssets.galleryDsc2665,
            },
          ],
          highlights: [
            {
              icon: "Droplets",
              title: "Pool and jacuzzi",
              description: "A resort-style center for slow afternoons and easy resets.",
            },
            {
              icon: "Dumbbell",
              title: "Private gym",
              description: "Wellness stays close instead of becoming a commute.",
            },
            {
              icon: "Shield",
              title: "Security and backup",
              description: "Gated security, generator, cistern, and practical infrastructure.",
            },
          ],
        },
        {
          id: "community-perks",
          icon: "Users",
          label: "Community Perks",
          eyebrow: "Local advantages",
          title: "Ownership extends beyond the walls of the unit.",
          description:
            "Connections RD adds value through practical community benefits: beach club access, restaurant discounts, shuttle service, and a social coastal setting.",
          metric: { label: "Owner value", value: "Included perks" },
          media: [
            {
              alt: "Coastal community beach club and restaurant lifestyle",
              caption: "A social base for coastal living",
              imageUrl: siteAssets.lifestyleAtlasCommunityPerks,
            },
            {
              alt: "Connections RD coastal project view",
              caption: "A community connected to Cabarete life",
              imageUrl: siteAssets.galleryDsc2665,
            },
          ],
          highlights: [
            {
              icon: "Bus",
              title: "Free shuttle",
              description: "Transportation support around Cabarete and Sosua.",
            },
            {
              icon: "Anchor",
              title: "Beach club access",
              description: "Priority access to Front Loop beach club facilities.",
            },
            {
              icon: "Coffee",
              title: "Restaurant discounts",
              description: "Local perks that make the lifestyle feel connected.",
            },
          ],
        },
        {
          id: "investment",
          icon: "DollarSign",
          label: "Investment",
          eyebrow: "Lifestyle with upside",
          title: "A coastal lifestyle that can also work financially.",
          description:
            "The value proposition is not only emotional. Airbnb-friendly ownership, market demand, residency potential, and tax advantages help make the purchase practical.",
          metric: { label: "Rental model", value: "Airbnb-friendly" },
          media: [
            {
              alt: "Connections RD residence and pool setting",
              caption: "A lifestyle product with rental appeal",
              imageUrl: siteAssets.floorPlanDsc2545,
            },
            {
              alt: "Connections RD aerial property view",
              caption: "Cabarete market visibility and location value",
              imageUrl: siteAssets.galleryDsc2665,
            },
          ],
          highlights: [
            {
              icon: "DollarSign",
              title: "Income potential",
              description: "Airbnb-friendly units support rental income when you are away.",
            },
            {
              icon: "FileText",
              title: "Tax advantages",
              description: "Dominican incentives may improve the long-term ownership picture.",
            },
            {
              icon: "Globe",
              title: "Residency path",
              description: "Units are positioned for buyers considering a deeper Dominican base.",
            },
          ],
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
          areaSqFt: 1200,
          price: "From $264,399",
          features: [{ value: "2 Bathrooms" }, { value: "4-5 Balconies" }, { value: "Ocean View" }, { value: "Airbnb Friendly" }],
          slides: [
            {
              imageAlt: "Imagen 1",
              imageCaption: "",
              imageUrl: siteAssets.floorPlanDsc2550,
            },
            {
              imageAlt: "Imagen 2",
              imageCaption: "",
              imageUrl: siteAssets.floorPlanDsc2545,
            },
          ],
        },
        {
          label: "3 Bedroom",
          sqft: "1,800 sq ft",
          areaSqFt: 1800,
          price: "From $389,999",
          features: [{ value: "3 Bathrooms" }, { value: "5+ Balconies" }, { value: "Panoramic Views" }, { value: "Airbnb Friendly" }],
        },
        {
          label: "Rooftop",
          sqft: "2,500+ sq ft",
          areaSqFt: 2500,
          areaIsApproximate: true,
          price: "From $549,999",
          features: [{ value: "Private Rooftop" }, { value: "360° Views" }, { value: "Premium Finishes" }, { value: "Jacuzzi" }],
        },
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
      anchorId: "amenities",
      id: "home-ConnectionsGalleryBlock-4",
      sectionLabel: "Amenities",
      title: "World-Class Amenities",
      items: [
        {
          alt: "Connections RD pool and jacuzzi amenity setting",
          caption: "Pool & Jacuzzi",
          featured: true,
          imageUrl: siteAssets.floorPlanDsc2545,
          media: [
            {
              alt: "Connections RD pool and jacuzzi amenity setting",
              caption: "Pool & Jacuzzi",
              imageUrl: siteAssets.floorPlanDsc2545,
            },
            {
              alt: "Connections RD outdoor community view near the pool",
              caption: "Resort-Style Outdoor Living",
              imageUrl: siteAssets.galleryDsc2665,
            },
          ],
          openMode: "private",
        },
        {
          alt: "Morning surf lifestyle near Playa Encuentro",
          caption: "Beach Proximity",
          featured: true,
          imageUrl: siteAssets.lifestyleAtlasBeachMorning,
          media: [
            {
              alt: "Morning surf lifestyle near Playa Encuentro",
              caption: "Minutes from Playa Encuentro",
              imageUrl: siteAssets.lifestyleAtlasBeachMorning,
            },
            {
              alt: "Aerial view of Connections RD near Cabarete coastal life",
              caption: "Cabarete Coastal Access",
              imageUrl: siteAssets.galleryDsc2665,
            },
          ],
          openMode: "private",
        },
        {
          alt: "Connections RD wellness and private gym lifestyle",
          caption: "Private Gym & Wellness",
          imageUrl: siteAssets.floorPlanDsc2550,
          media: [
            {
              alt: "Connections RD wellness and private gym lifestyle",
              caption: "Private Gym & Wellness",
              imageUrl: siteAssets.floorPlanDsc2550,
            },
            {
              alt: "Modern tropical residence balcony with coastal breeze",
              caption: "Wellness-Oriented Coastal Living",
              imageUrl: siteAssets.lifestyleAtlasResidenceBalcony,
            },
          ],
          openMode: "private",
        },
        {
          alt: "Connections RD gated ownership and backup comfort",
          caption: "Security & Backup",
          imageUrl: siteAssets.floorPlanDsc2550,
          media: [
            {
              alt: "Connections RD gated ownership and backup comfort",
              caption: "24/7 Gated Security",
              imageUrl: siteAssets.floorPlanDsc2550,
            },
            {
              alt: "Connections RD residence infrastructure and comfort",
              caption: "Backup Generator & Water Cistern",
              imageUrl: siteAssets.floorPlanDsc2545,
            },
          ],
          openMode: "private",
        },
        {
          alt: "Coastal community perks and beach club lifestyle",
          caption: "Shuttle & Owner Perks",
          imageUrl: siteAssets.lifestyleAtlasCommunityPerks,
          media: [
            {
              alt: "Coastal community perks and beach club lifestyle",
              caption: "Beach Club & Restaurant Perks",
              imageUrl: siteAssets.lifestyleAtlasCommunityPerks,
            },
            {
              alt: "Connections RD coastal community access",
              caption: "Free Shuttle Convenience",
              imageUrl: siteAssets.galleryDsc2665,
            },
          ],
          openMode: "private",
        },
        {
          alt: "Connections RD easy ownership and covered parking amenity",
          caption: "Parking & Easy Ownership",
          imageUrl: siteAssets.lifestyleAtlasResidenceBalcony,
          media: [
            {
              alt: "Connections RD easy ownership and covered parking amenity",
              caption: "Covered Parking",
              imageUrl: siteAssets.lifestyleAtlasResidenceBalcony,
            },
            {
              alt: "Connections RD lock-and-leave residence lifestyle",
              caption: "Lock-and-Leave Comfort",
              imageUrl: siteAssets.floorPlanDsc2550,
            },
          ],
          openMode: "private",
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
    type: "ConnectionsFooterBlock",
    props: {
      id: "home-ConnectionsFooterBlock-11",
      logoUrl: siteAssets.logoWhite,
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
