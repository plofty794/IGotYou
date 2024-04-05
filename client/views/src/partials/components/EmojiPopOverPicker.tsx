import EmojiPicker from "emoji-picker-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import insertTextAtCursor from "insert-text-at-cursor";
import { Button } from "@/components/ui/button";

function EmojiPopOverPicker({
  inputRef,
}: {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}) {
  return (
    <Popover>
      <PopoverTrigger className="max-md:hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                className="rounded-full bg-white p-2"
                variant={"outline"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                  />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Choose an emoji</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <EmojiPicker
          width={"10cm"}
          height={400}
          lazyLoadEmojis
          skinTonesDisabled
          onEmojiClick={(e) => {
            if (inputRef.current) {
              insertTextAtCursor(inputRef.current, e.emoji);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default EmojiPopOverPicker;
