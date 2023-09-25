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
import { RocketIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";

function FunFact() {
  return (
    <Dialog>
      <DialogTrigger
        className="hover:bg-[#e9e9e9] w-full font-medium text-md shadow-md
            flex justify-start items-center pl-4 pr-6 py-8 rounded"
      >
        <span className="mr-2">
          <RocketIcon color="black" width={25} height={25} />
        </span>
        My fun fact
      </DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-4">
          <Label className="text-sm font-medium" htmlFor="school">
            Where I went to school:
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

export default FunFact;
