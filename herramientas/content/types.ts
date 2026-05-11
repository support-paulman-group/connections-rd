export type NavLink = {
  href: string;
  label: string;
  children?: NavLink[];
};

export type IconCard = {
  icon: string;
  title: string;
  description: string;
};

export type GalleryItem = {
  imageUrl?: string;
  videoUrl?: string;
  alt: string;
  caption: string;
  type?: "image" | "video";
};

export type FloorPlanSlide = {
  imageUrl: string;
  imageAlt?: string;
  imageCaption?: string;
};

export type FloorPlan = {
  label: string;
  sqft: string;
  price: string;
  features: Array<string | { value: string }>;
  slides?: FloorPlanSlide[];
};

export type AmenityItem = {
  icon: string;
  label: string;
};

export type LocationHighlight = {
  icon: string;
  label: string;
  distance: string;
};

export type ConnectionsNavbarBlock = {
  type: "ConnectionsNavbarBlock";
  props: {
    id: string;
    links: NavLink[];
    logoDarkUrl: string;
    logoDesktopWidth: number;
    logoLightUrl: string;
    logoMobileWidth: number;
    ownerAccessHref: string;
    ownerAccessLabel: string;
  };
};

export type ConnectionsHeroBlock = {
  type: "ConnectionsHeroBlock";
  props: {
    id: string;
    badge: string;
    fallbackImageUrl: string;
    logoUrl: string;
    pricePrefix: string;
    priceValue: string;
    primaryHref: string;
    primaryLabel: string;
    secondaryHref: string;
    secondaryLabel: string;
    showScrollIndicator: boolean;
    subtitle: string;
    title: string;
    videoUrl: string;
  };
};

export type CardBlock =
  | {
      type: "ConnectionsValuePropsBlock" | "ConnectionsInvestmentBlock" | "ConnectionsCommunityPerksBlock";
      props: {
        id: string;
        cards: IconCard[];
        sectionLabel: string;
        subtitle: string;
        title: string;
      };
    };

export type ConnectionsFloorPlansBlock = {
  type: "ConnectionsFloorPlansBlock";
  props: {
    id: string;
    ctaHref: string;
    ctaLabel: string;
    sectionLabel: string;
    subtitle: string;
    tabs: FloorPlan[];
    title: string;
  };
};

export type ConnectionsAmenitiesBlock = {
  type: "ConnectionsAmenitiesBlock";
  props: {
    id: string;
    items: AmenityItem[];
    sectionLabel: string;
    subtitle: string;
    title: string;
  };
};

export type GenericGalleryBlock = {
  type: "GalleryBlock";
  props: {
    id: string;
    columnas: number;
    items: GalleryItem[];
    titulo: string;
  };
};

export type ConnectionsGalleryBlock = {
  type: "ConnectionsGalleryBlock";
  props: {
    id: string;
    items: GalleryItem[];
    sectionLabel: string;
    title: string;
  };
};

export type ConnectionsLocationBlock = {
  type: "ConnectionsLocationBlock";
  props: {
    id: string;
    highlights: LocationHighlight[];
    mapEmbedUrl: string;
    sectionLabel: string;
    subtitle: string;
    title: string;
  };
};

export type ConnectionsWeatherBlock = {
  type: "ConnectionsWeatherBlock";
  props: {
    id: string;
    conditionHumid: string;
    conditionLabel: string;
    conditionMostlySunny: string;
    conditionPartlyCloudy: string;
    conditionRainy: string;
    conditionUnknown: string;
    conditionWindy: string;
    humidityLabel: string;
    narrative: string;
    sectionLabel: string;
    temperatureLabel: string;
    title: string;
    toggleLabelC: string;
    toggleLabelF: string;
    uvLabel: string;
    windLabel: string;
  };
};

export type ConnectionsLeadFormBlock = {
  type: "ConnectionsLeadFormBlock";
  props: {
    id: string;
    emailLabel: string;
    firstNameLabel: string;
    lastNameLabel: string;
    messageLabel: string;
    phoneLabel: string;
    privacyNote: string;
    secondaryCTAHref: string;
    secondaryCTALabel: string;
    sectionLabel: string;
    submitLabel: string;
    subtitle: string;
    successMessage: string;
    successTitle: string;
    title: string;
    unitLabel: string;
    unitOptions: Array<string | { value: string }>;
  };
};

export type ConnectionsFooterBlock = {
  type: "ConnectionsFooterBlock";
  props: {
    id: string;
    description: string;
    email: string;
    facebookHref: string;
    instagramHref: string;
    legal: string;
    links: NavLink[];
    logoUrl: string;
    phone: string;
    quickLinksTitle: string;
    resourcesLinks: NavLink[];
    resourcesTitle: string;
    tagline: string;
    whatsappHref: string;
    youtubeHref: string;
  };
};

export type HomeBlock =
  | ConnectionsNavbarBlock
  | ConnectionsHeroBlock
  | CardBlock
  | ConnectionsFloorPlansBlock
  | ConnectionsAmenitiesBlock
  | GenericGalleryBlock
  | ConnectionsGalleryBlock
  | ConnectionsLocationBlock
  | ConnectionsWeatherBlock
  | ConnectionsLeadFormBlock
  | ConnectionsFooterBlock;

export type SiteMeta = {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
};
