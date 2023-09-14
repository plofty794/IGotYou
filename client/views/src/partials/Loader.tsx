import { Waveform } from "@uiball/loaders";

function Loader() {
  return (
    <div className="bg-hero-image bg-cover min-h-screen flex items-center justify-center">
      <Waveform size={65} color="white" />
    </div>
  );
}

export default Loader;
