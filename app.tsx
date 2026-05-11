import { HomeBlockRenderer } from "./componentes/blocks/HomeBlockRenderer";
import { homeBlocks } from "./herramientas/content/home-blocks";

export function App() {
  return <HomeBlockRenderer blocks={homeBlocks} />;
}

export default App;
