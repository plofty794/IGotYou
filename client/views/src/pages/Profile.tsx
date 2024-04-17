import { Suspense, lazy, useEffect } from "react";
import useGetCurrentUserProfile from "@/hooks/useGetUserProfile";
import ProfileLoader from "@/partials/loaders/ProfileLoader";
import PromptUsername from "@/partials/components/PromptUsername";
import { lineSpinner } from "ldrs";
lineSpinner.register();

const ProfileContent = lazy(
  () => import("@/partials/components/profile/ProfileContent"),
);

function Profile() {
  const { data, status } = useGetCurrentUserProfile();

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5030/api/events");

    if (typeof EventSource != "undefined") {
      console.log("connected!");
    } else {
      console.log("connection not established.");
    }

    eventSource.onmessage = (event) => {
      if (event.data) {
        window.location.href = `/subscription/${data?.data.user._id}/expired`;
      }
    };
  }, [data?.data.user._id]);

  useEffect(() => {
    document.title = "Your Profile - IGotYou";
  }, []);

  return (
    <>
      {status === "pending" ? (
        <div className="flex min-h-[80vh] items-center justify-center">
          <l-line-spinner
            size="55"
            stroke="3"
            speed="1"
            color="black"
          ></l-line-spinner>
        </div>
      ) : status === "success" ? (
        <Suspense fallback={<ProfileLoader />}>
          {data?.data?.user.username ? (
            <ProfileContent
              profileData={data?.data.user}
              recentListings={data.data.recentListings}
            />
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
