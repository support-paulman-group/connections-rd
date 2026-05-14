import { ConnectionsAmenities } from "./ConnectionsAmenities";
import { ConnectionsCardBlock } from "./CardBlocks";
import { ConnectionsFloorPlans } from "./ConnectionsFloorPlans";
import { ConnectionsFooter } from "./ConnectionsFooter";
import { ConnectionsGallery, GenericGallery } from "./Galleries";
import { ConnectionsHero } from "./ConnectionsHero";
import { ConnectionsLeadForm } from "./ConnectionsLeadForm";
import { ConnectionsLifestyleAtlas } from "./ConnectionsLifestyleAtlas";
import { ConnectionsLocation } from "./ConnectionsLocation";
import { ConnectionsNavbar } from "./ConnectionsNavbar";
import { ConnectionsWeather } from "./ConnectionsWeather";
import type { HomeBlock } from "@herramientas/content/types";

type HomeBlockRendererProps = {
  blocks: HomeBlock[];
};

export function HomeBlockRenderer({ blocks }: HomeBlockRendererProps) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case "ConnectionsNavbarBlock":
            return <ConnectionsNavbar key={block.props.id} {...block.props} />;
          case "ConnectionsHeroBlock":
            return <ConnectionsHero key={block.props.id} {...block.props} />;
          case "ConnectionsValuePropsBlock":
            return <ConnectionsCardBlock key={block.props.id} {...block.props} variant="light" />;
          case "ConnectionsCommunityPerksBlock":
            return <ConnectionsCardBlock key={block.props.id} {...block.props} variant="soft" />;
          case "ConnectionsFloorPlansBlock":
            return <ConnectionsFloorPlans key={block.props.id} {...block.props} />;
          case "ConnectionsLifestyleAtlasBlock":
            return <ConnectionsLifestyleAtlas key={block.props.id} {...block.props} />;
          case "ConnectionsInvestmentBlock":
            return <ConnectionsCardBlock key={block.props.id} {...block.props} variant="dark" />;
          case "ConnectionsAmenitiesBlock":
            return <ConnectionsAmenities key={block.props.id} {...block.props} />;
          case "GalleryBlock":
            return <GenericGallery key={block.props.id} {...block.props} />;
          case "ConnectionsGalleryBlock":
            return <ConnectionsGallery key={block.props.id} {...block.props} />;
          case "ConnectionsLocationBlock":
            return <ConnectionsLocation key={block.props.id} {...block.props} />;
          case "ConnectionsLeadFormBlock":
            return <ConnectionsLeadForm key={block.props.id} {...block.props} />;
          case "ConnectionsWeatherBlock":
            return <ConnectionsWeather key={block.props.id} {...block.props} />;
          case "ConnectionsFooterBlock":
            return <ConnectionsFooter key={block.props.id} {...block.props} />;
          default:
            return null;
        }
      })}
    </>
  );
}
