import { Suspense, lazy, useEffect } from "react";
import useGetCurrentUserProfile from "@/hooks/useGetUserProfile";
import ProfileLoader from "@/partials/loaders/ProfileLoader";
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
    <>
      {status === "loading" ? (
        <div className="min-h-[80vh] flex items-center justify-center">
          <DotSpinner color="#222222" size={50} />
        </div>
      ) : status === "success" ? (
        <Suspense fallback={<ProfileLoader />}>
          {data?.data?.user.username ? (
            <ProfileContent profileData={data?.data.user} />
          ) : (
            <PromptUsername />
          )}
        </Suspense>
      ) : (
        <></>
      )}
    </>
  );
}

export default Profile;
