import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import { Suspense, lazy } from "react";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import ProfileLoader from "@/partials/loaders/ProfileLoader";

const ProfileContent = lazy(
  () => import("@/partials/components/profile/ProfileContent")
);

function Profile() {
  const { data } = useGetUserProfile();

  const logOut = useUserStore((state) => state.logOutUser);

  function handleSignOut() {
    logOut();
  }

  return (
    <div className="min-h-screen">
      <nav className="shadow py-5 px-20 flex justify-between items-center">
        <span className="font-bold text-xl text-[#222222]">IGotYou</span>
        <ul className="text-sm font-medium flex justify-center items-center gap-5">
          <li>Become a Host</li>
          <li>Dropdown menu</li>
          <Button
            className="bg-[#5551FF] hover:bg-[#4947e4] text-white"
            variant={"secondary"}
            size={"sm"}
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </ul>
      </nav>
      <Suspense fallback={<ProfileLoader />}>
        <ProfileContent data={data} />
      </Suspense>
    </div>
  );
}

export default Profile;
