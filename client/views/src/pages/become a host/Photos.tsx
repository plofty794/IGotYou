/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UploadIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

function Photos() {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    document.title = "IGotYou - Make it Stand out";
    cloudinaryRef.current = window.cloudinary;
    // @ts-ignore
    widgetRef.current = cloudinaryRef.current?.createUploadWidget(
      {
        cloudName: "dop5kqpod",
        uploadPreset: "s6lymwwh",
      },
      (err, result) => console.log(result)
    );
    setTimeout(() => setIsFadingIn(false), 400);
  }, []);

  return (
    <>
      <ScrollArea
        className={`w-full h-[450px] rounded-md border transition-opacity ${
          isFadingIn ? "opacity-0" : "opacity-100"
        }`}
      >
        <section className="my-8 h-[400px] flex flex-col items-center justify-center gap-8">
          <div className="text-center w-[1024px]">
            <h1 className="text-3xl font-semibold">
              Add some photos of your service
            </h1>
            <p>
              You'll need 5 photos to get started. You can add more or make
              changes later.
            </p>
          </div>
          <Button
            className="font-medium"
            variant={"link"}
            onClick={() => widgetRef.current?.open()}
          >
            Upload your images here{" "}
            <UploadIcon className="ml-2" height={20} width={20} />
          </Button>
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
