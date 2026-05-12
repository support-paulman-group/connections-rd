import { HomeBlockRenderer } from "./componentes/blocks/HomeBlockRenderer";
import { BackToHeroButton } from "./componentes/shared/BackToHeroButton";
import { homeBlocks } from "./herramientas/content/home-blocks";

export function App() {
  return (
    <>
      <HomeBlockRenderer blocks={homeBlocks} />
      <BackToHeroButton />
    </>
  );
}

export default App;
