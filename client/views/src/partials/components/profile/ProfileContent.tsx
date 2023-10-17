import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  IdCardIcon,
} from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AxiosResponse } from "axios";
import ProfileButtonGroup from "./ProfileButtonGroup";
import { Skeleton } from "@/components/ui/skeleton";
import PersonalInfoSheet from "./PersonalInfoSheet";
import { Button } from "@/components/ui/button";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import { auth } from "@/firebase config/config";
import { lazy, Suspense, useEffect, useState } from "react";
import { MdCameraEnhance } from "react-icons/md";
import { DotPulse } from "@uiball/loaders";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";

const Listings = lazy(() => import("./Listings"));

type TProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileData: AxiosResponse<any, any> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listingsData: AxiosResponse<TListing, any> | undefined;
};

function ProfileContent({ profileData, listingsData }: TProps) {
  const { mutate, isLoading } = useVerifyEmail();
  const updateUserProfile = useUpdateUserProfile();
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    setPhoto(profileData?.data.photoUrl);
  }, [profileData?.data.photoUrl]);

  const cloudinaryWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dop5kqpod",
      uploadPreset: "s6lymwwh",
      folder: "IGotYou-Avatars",
      resourceType: "image",
      cropping: true,
    },
    (_, res) => {
      if (res.event === "success") {
        updateUserProfile.mutate({ photoUrl: res.info.secure_url });
        setPhoto(res.info.secure_url);
      }
      return;
    }
  );

  return (
    <>
      <section className="flex gap-16 px-32 mt-14">
        <div className="flex flex-col justify-between h-[650px]">
          <Card className="flex flex-col justify-center items-center w-[342px] px-22 py-5 shadow">
            <CardHeader className="p-4 relative">
              <Avatar className="w-[80px] h-[80px]">
                {photo && profileData?.data ? (
                  <AvatarImage
                    loading="lazy"
                    className="max-h-full max-w-full object-cover"
                    src={photo}
                    alt={`${profileData.data.username}'s avatar`}
                  />
                ) : (
                  <AvatarImage
                    loading="lazy"
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                    alt="no avatar"
                  />
                )}

                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button
                onClick={() => cloudinaryWidget.open()}
                type="button"
                className="px-[0.70rem] py-2 rounded-full border absolute z-10 mx-auto bottom-2 right-2 text-center bg-zinc-600 text-zinc-200"
              >
                <MdCameraEnhance />
              </Button>
            </CardHeader>
            <CardFooter className="p-0 flex flex-col">
              <span className="text-[#222222] text-2xl font-semibold">
                {profileData?.data.username ?? (
                  <Skeleton className="h-4 w-[100px]" />
                )}
              </span>
              <span className="text-zinc-500 text-sm font-semibold">
                {profileData?.data.hostStatus ? "Host" : "Guest"}
              </span>
            </CardFooter>
          </Card>
          <Card className="w-[342px]">
            <CardHeader>
              <span className="text-[#222222] text-xl font-semibold">
                {profileData?.data.username ? (
                  profileData?.data.username + "'s confirmed information"
                ) : (
                  <Skeleton className="h-4 w-[250px] mx-auto" />
                )}
              </span>
            </CardHeader>
            <CardContent className="flex flex-col">
              {profileData?.data.emailVerified ? (
                <div className="my-1 font-medium">
                  <CheckCircledIcon
                    color="#FFF"
                    width={22}
                    height={22}
                    className="inline-block bg-[#39c152] rounded-full"
                  />{" "}
                  <span className="text-zinc-500 ml-2 text-xs">
                    Email address (verified)
                  </span>
                </div>
              ) : (
                <div className="my-1 font-medium">
                  <CrossCircledIcon
                    color="#FFF"
                    width={22}
                    height={22}
                    className="inline-block bg-[#e94242] rounded-full"
                  />{" "}
                  <span className="text-zinc-500 ml-2 text-xs">
                    Email address (not verified)
                  </span>
                </div>
              )}
              {profileData?.data.mobileVerified ? (
                <div className="my-1 font-medium">
                  <CheckCircledIcon
                    color="#FFF"
                    width={22}
                    height={22}
                    className="inline-block bg-[#39c152] rounded-full"
                  />{" "}
                  <span className="text-zinc-500 ml-2 text-xs">
                    Mobile phone (verified)
                  </span>
                </div>
              ) : (
                <div className="my-1 font-medium">
                  <CrossCircledIcon
                    color="#FFF"
                    width={22}
                    height={22}
                    className="inline-block bg-[#e94242] rounded-full"
                  />{" "}
                  <span className="text-zinc-500 ml-2 text-xs">
                    Mobile phone (not verified)
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="w-[342px]">
            <CardHeader className="text-[#222222] px-6 pt-6 pb-2">
              <span className="text-lg font-semibold">
                <IdCardIcon width={35} height={35} />
              </span>
              <p className="font-semibold text-md">
                {profileData?.data?.emailVerified
                  ? "Personal info"
                  : "Verify your email to edit your personal info"}
              </p>
              <p className="text-xs font-medium text-zinc-500">
                Provide personal details and how we can reach you
              </p>
            </CardHeader>
            <CardContent>
              {profileData?.data?.emailVerified ? (
                <PersonalInfoSheet />
              ) : (
                <Button
                  onClick={() =>
                    mutate({ emailVerified: auth.currentUser?.emailVerified })
                  }
                  size={"sm"}
                  className="font-semibold bg-[#222222]"
                >
                  {isLoading ? (
                    <DotPulse size={20} color="#FFF" />
                  ) : (
                    "Verify email"
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <Card className="w-[700px] shadow-lg">
            <CardHeader className="text-[#222222] text-4xl font-semibold">
              <h2>Your profile</h2>
            </CardHeader>
            <div className="text-zinc-500 text-sm font-medium px-6 py-2">
              <h3>
                The information you share will be used across IGotYou to help
                other guests and hosts get to know you.
              </h3>
            </div>
            <CardFooter className="mt-2 text-[#3c3b3b]">
              <div className="w-full grid lg:grid-cols-2 md:grid-cols-1 gap-2 ">
                <ProfileButtonGroup />
              </div>
            </CardFooter>
          </Card>
          {listingsData?.data.listings?.length ? (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Listings
                username={profileData?.data.username}
                listingsData={listingsData}
              />
            </Suspense>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
}

type TListing = {
  listings?: [
    {
      _id: string;
      serviceType: string[];
      serviceDescription: string;
      listingPhotos: [
        {
          public_id: string;
          secure_url: string;
          original_filename: string;
          _id: string;
        }
      ];
    }
  ];
};

export default ProfileContent;
