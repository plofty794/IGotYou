import { ScrollArea } from "@/components/ui/scroll-area";
import PhotoUploader from "@/pages/become a host/PhotoUploader";
import { useEffect, useState } from "react";

function Photos() {
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    document.title = "IGotYou - Make it Stand out";
    setTimeout(() => setIsFadingIn(false), 400);
  }, []);

  return (
    <>
      <ScrollArea
        className={`w-full h-[450px] rounded-md border transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-14 h-max flex flex-col items-center justify-center gap-8">
          <div className="text-center w-[1024px]">
            <h1 className="text-3xl font-semibold">
              Add some photos of your service
            </h1>
            <p>
              You'll need 5 photos to get started. You can add more or make
              changes later.
            </p>
          </div>
          <div className="w-[600px]">
            <PhotoUploader />
          </div>
        </section>
      </ScrollArea>
    </>
  );
}

export default Photos;

declare global {
  interface Window {
    cloudinary: undefined;
  }
}
