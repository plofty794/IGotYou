import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { QueryState, useQueryClient } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import CollapsibleUsername from "./collapsibles/CollapsibleUsername";
import CollapsibleEmail from "./collapsibles/CollapsibleEmail";
import CollapsiblePhoneNumber from "./collapsibles/CollapsiblePhoneNumber";

type TData = {
  email: string;
  username: string;
  hostStatus: boolean;
  work?: string;
  address?: string;
  funFact?: string;
  school: string;
};

function PersonalInfoSheet() {
  const queryClient = useQueryClient();
  const ID = localStorage.getItem("ID");
  const data = queryClient.getQueryData<QueryState<TData>>([
    "profile",
    ID && ID,
  ]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="font-semibold" variant="outline">
          Edit info
        </Button>
      </SheetTrigger>
      <SheetContent className="profile-sheet overflow-auto" side={"left"}>
        <SheetHeader>
          <SheetTitle>Edit Personal info</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <CollapsibleUsername data={data} />
          <Separator />
          <CollapsibleEmail data={data} />
          <Separator />
          <CollapsiblePhoneNumber data={data} />
          <Separator />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              size={"lg"}
              className="bg-[#222222] font-semibold text-md"
              type="submit"
            >
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default PersonalInfoSheet;
