import { Suspense, lazy, useEffect } from "react";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import ProfileLoader from "@/partials/loaders/ProfileLoader";
import { Link } from "react-router-dom";
import UserDropDownButton from "@/partials/components/UserDropDownButton";
import { CrumpledPaperIcon } from "@radix-ui/react-icons";

const ProfileContent = lazy(
  () => import("@/partials/components/profile/ProfileContent")
);

function Profile() {
  const { data } = useGetUserProfile();

  useEffect(() => {
    document.title = "IGotYou - Profile";
  }, []);

  return (
    <main className="min-h-full bg-[#F2F2F2] pb-10">
      <nav className="bg-white shadow py-5 px-20 flex justify-between items-center">
        <Link to={"/"}>
          <CrumpledPaperIcon width={25} height={25} />
        </Link>
        <ul className="text-sm font-medium flex justify-center items-center gap-5">
          <li>Become a Host</li>
          <UserDropDownButton />
        </ul>
      </nav>
      <Suspense fallback={<ProfileLoader />}>
        <ProfileContent data={data} />
      </Suspense>
    </main>
  );
}

export default Profile;
