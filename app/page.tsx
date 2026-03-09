import HeroScroll from "@/components/scrollytelling/HeroScroll";
import VillaTransition from "@/components/scrollytelling/VillaTransition";
import VillaGallery from "@/components/media/VillaGallery";
import DestinationGlobe from "@/components/media/DestinationGlobe";

export default function Home() {
  return (
    <>
      <div id="home">
        <HeroScroll />
      </div>
      <div id="villas">
        <VillaTransition />
        <VillaGallery />
      </div>
      <div id="destinations">
        <DestinationGlobe />
      </div>
    </>
  );
}
