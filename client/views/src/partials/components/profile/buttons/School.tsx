import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil2Icon } from "@radix-ui/react-icons";

function School() {
  return (
    <Dialog>
      <DialogTrigger
        className="hover:bg-[#e9e9e9] w-full font-medium text-md shadow-md
            flex justify-start items-center pl-4 pr-6 py-8 rounded"
      >
        <span className="mr-2">
          <Pencil2Icon color="black" width={25} height={25} />
        </span>
        <p>Where I went to school</p>
      </DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">
            Where did you go to school?
          </DialogTitle>
          <DialogDescription>
            Whether it’s home school, high school, or trade school, name the
            school that made you who you are.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-4">
          <Label className="text-sm font-medium" htmlFor="school">
            Where I went to school
          </Label>
          <Input autoFocus id="school" name="school" />
          <Button
            className="bg-[#222222] text-white font-medium my-2"
            size={"lg"}
            variant={"secondary"}
          >
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default School;
