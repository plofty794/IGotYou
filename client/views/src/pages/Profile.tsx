import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { auth } from "@/firebase config/config";
import { useUserStore } from "@/store/userStore";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

function Profile() {
  useEffect(() => {
    document.title = "IGotYou - User Profile";
  }, []);

  const user = auth.currentUser;
  const logOut = useUserStore((state) => state.logOutUser);

  function handleSignOut() {
    logOut();
  }

  return (
    <div className="min-h-screen">
      <nav className="shadow py-5 px-20 flex justify-between items-center">
        <span className="font-bold text-xl text-[#FF385C]">IGotYou</span>
        <ul className="text-sm font-medium flex justify-center items-center gap-5">
          <li>Become a Host</li>
          <li>Dropdown menu</li>
          <Button
            className="bg-[#FF385C] hover:bg-[#E8204E] text-white"
            variant={"secondary"}
            size={"sm"}
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </ul>
      </nav>
      <div className="flex gap-52 px-40 mt-14">
        <div className="flex flex-col gap-7 justify-between">
          <Card className="flex flex-col justify-center items-center gap-5 w-[342px] px-28 py-5 shadow-2xl">
            <CardHeader className="text-white rounded-full w-[100px] h-[100px] bg-[#222222]">
              <span className="text-center text-5xl font-semibold">J</span>
            </CardHeader>
            <CardFooter className="p-0 flex flex-col">
              <span className="text-[#222222] text-2xl font-semibold">
                Jake
              </span>
              <span className="text-[#222222] text-md font-medium">Guest</span>
            </CardFooter>
          </Card>
          <Card className="w-[342px]">
            <CardHeader className="text-[#222222] text-xl font-semibold">
              Jake's confirmed information
            </CardHeader>
            <CardContent>
              {user?.email && (
                <>
                  <CheckIcon className="inline-block font-bold" />{" "}
                  <span className="text-[#222222] ml-2">Email address</span>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="w-[342px] shadow-lg">
            <CardHeader className="text-[#222222] text-xl font-semibold">
              It's time to create your profile
            </CardHeader>
            <CardDescription className="text-[#222222] font-medium px-6 py-4">
              Your IGotYou profile is an important part of every reservation.
              Create yours to help other Hosts and guests get to know you.
            </CardDescription>
            <CardFooter className="mt-2">
              <Button
                className="bg-[#FF385C] hover:bg-[#E8204E] text-white"
                variant={"secondary"}
                size={"lg"}
              >
                Create profile
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
