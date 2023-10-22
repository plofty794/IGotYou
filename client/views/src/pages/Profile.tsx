import { Suspense, lazy, useEffect } from "react";
import useGetCurrentUserProfile from "@/hooks/useGetUserProfile";
import ProfileLoader from "@/partials/loaders/ProfileLoader";
import { Link } from "react-router-dom";
import UserDropDownButton from "@/partials/components/UserDropDownButton";
import PromptUsername from "@/partials/components/PromptUsername";
import { DotSpinner } from "@uiball/loaders";

const ProfileContent = lazy(
  () => import("@/partials/components/profile/ProfileContent")
);

function Profile() {
  const { data, status } = useGetCurrentUserProfile();

  useEffect(() => {
    document.title = "IGotYou - Profile";
  }, []);

  return (
    <main className="min-h-screen bg-[#F2F2F2] pb-10">
      <nav className="bg-white shadow py-5 px-20 flex justify-between items-center">
        <Link to={"/"}>
          <span>
            <img
              className="w-[30px] h-[30px]"
              loading="lazy"
              src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
              alt="logo"
            />
          </span>
        </Link>
        <ul className="text-sm font-medium flex justify-center items-center gap-5">
          <UserDropDownButton />
        </ul>
      </nav>

      {status === "loading" ? (
        <div className="min-h-[80vh] flex items-center justify-center">
          <DotSpinner color="#222222" size={50} />
        </div>
      ) : status === "success" ? (
        <Suspense fallback={<ProfileLoader />}>
          {data.data?.user.username ? (
            <ProfileContent profileData={data?.data.user} />
          ) : (
            <PromptUsername />
          )}
        </Suspense>
      ) : (
        <></>
      )}
    </main>
  );
}

export default Profile;
