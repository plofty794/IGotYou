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
import { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";

const CollapsiblePhoneNumber = lazy(
  () => import("./collapsibles/CollapsiblePhoneNumber")
);

type TUserData = {
  user: {
    email?: string;
    username?: string;
    hostStatus?: boolean;
    work?: string;
    address?: string;
    funFact?: string;
    school?: string;
    emailVerified: boolean;
    mobilePhone: string;
    mobileVerified: boolean;
  };
};

function PersonalInfoSheet() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const data = queryClient.getQueryData<QueryState<TUserData>>(["profile", id]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="font-semibold" variant="outline">
          Edit info
        </Button>
      </SheetTrigger>
      <SheetContent
        className="profile-sheet overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-200"
        side={"left"}
      >
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
          <Suspense fallback={<h1>Loading...</h1>}>
            <CollapsiblePhoneNumber data={data} />
          </Suspense>
          <Separator />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              size={"lg"}
              className="bg-[#222222] font-semibold text-md mt-4"
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