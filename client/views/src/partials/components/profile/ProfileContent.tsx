import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  IdCardIcon,
} from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileButtonGroup from "./ProfileButtonGroup";
import { Skeleton } from "@/components/ui/skeleton";
import PersonalInfoSheet from "./PersonalInfoSheet";
import { Button } from "@/components/ui/button";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import { auth } from "@/firebase config/config";
import { lazy, Suspense, useEffect, useState } from "react";
import { MdCameraEnhance } from "react-icons/md";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "firebase/auth";
import { dotPulse } from "ldrs";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";

dotPulse.register();

const Listings = lazy(() => import("./Listings"));

type TProps = {
  profileData: {
    email: string;
    username: string;
    userStatus: string;
    address: string;
    funFact: string;
    school: string;
    work: string;
    emailVerified: boolean;
    mobileVerified: boolean;
    mobilePhone: string;
    photoUrl: string;
    listings: TListings[];
  };
};

type TListings = {
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
};

function ProfileContent({ profileData }: TProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useVerifyEmail();
  const updateUserProfile = useUpdateUserProfile();
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    setPhoto(profileData?.photoUrl);
    if (updateUserProfile.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    }
  }, [profileData?.photoUrl, queryClient, updateUserProfile.isSuccess]);

  const cloudinaryWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dop5kqpod",
      uploadPreset: "s6lymwwh",
      folder: "IGotYou-Avatars",
      resourceType: "image",
      cropping: true,
    },
    async (_, res) => {
      if (res.event === "success") {
        updateUserProfile.mutate({ photoUrl: res.info.secure_url });
        setPhoto(res.info.secure_url);
        updateProfile(auth.currentUser!, { photoURL: res.info.secure_url });
      }
      return;
    }
  );

  return (
    <>
      <section className="flex gap-16 px-24 mt-14 max-lg:flex-col max-w-7xl mx-auto">
        <div className="flex flex-col justify-between w-[340px] h-[650px] max-lg:w-full">
          <Card className="flex flex-col justify-center items-center w-[342px] max-lg:w-full px-22 py-5 shadow">
            <CardHeader className="p-4 relative">
              <Avatar className="w-[80px] h-[80px]">
                <AvatarImage
                  loading="lazy"
                  className="max-h-full max-w-full object-cover hover:scale-105 transition-all"
                  src={
                    photo ??
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                  }
                  alt={`${profileData?.username}'s avatar`}
                />
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
              <span className="text-2xl font-bold">
                {profileData?.username ?? (
                  <Skeleton className="h-4 w-[100px]" />
                )}
              </span>
              <span className="text-gray-600 text-sm font-bold">
                {profileData?.userStatus === "host" ? "Host" : "Guest"}
              </span>
            </CardFooter>
          </Card>
          <Card className="w-[342px] max-lg:w-full">
            <CardHeader>
              <span className="text-xl font-semibold">
                {profileData?.username ? (
                  profileData?.username + "'s confirmed information"
                ) : (
                  <Skeleton className="h-4 w-[250px] mx-auto" />
                )}
              </span>
            </CardHeader>
            <CardContent className="flex flex-col">
              {profileData?.emailVerified ? (
                <div className="my-1 font-medium">
                  <CheckCircledIcon
                    color="#FFF"
                    width={22}
                    height={22}
                    className="inline-block bg-[#39c152] rounded-full"
                  />{" "}
                  <span className="text-gray-600 ml-2 text-sm font-semibold">
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
                  <span className="text-gray-600 ml-2 text-sm font-semibold">
                    Email address (not verified)
                  </span>
                </div>
              )}
              {profileData?.mobileVerified ? (
                <div className="my-1 font-medium">
                  <CheckCircledIcon
                    color="#FFF"
                    width={22}
                    height={22}
                    className="inline-block bg-[#39c152] rounded-full"
                  />{" "}
                  <span className="text-gray-600 ml-2 text-sm font-semibold">
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
                  <span className="text-gray-600  ml-2 text-sm font-semibold">
                    Mobile phone (not verified)
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader className="text-gray-950 px-6 pt-6 pb-2">
              <span className="text-lg font-semibold">
                <IdCardIcon width={35} height={35} />
              </span>
              <p className="font-bold text-lg">
                {profileData?.emailVerified
                  ? "Personal info"
                  : "Verify your email to edit your personal info"}
              </p>
              <p className="text-sm font-semibold text-gray-600">
                Provide personal details and how we can reach you
              </p>
            </CardHeader>
            <CardContent>
              {profileData?.emailVerified ? (
                <PersonalInfoSheet />
              ) : (
                <Button
                  onClick={() =>
                    mutate({ emailVerified: auth.currentUser?.emailVerified })
                  }
                  className="mt-2 text-xs font-bold bg-gray-950 rounded-full"
                >
                  {isPending ? (
                    // Default values shown
                    <l-dot-pulse
                      size="30"
                      speed="1.3"
                      color="white"
                    ></l-dot-pulse>
                  ) : (
                    "Verify email"
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="w-full flex flex-col gap-4">
          <Card className="shadow-lg">
            <CardHeader className="p-6">
              <CardTitle className="text-gray-950 text-4xl font-semibold">
                Your profile
              </CardTitle>
            </CardHeader>
            <div className="px-6 py-2">
              <span className="text-gray-600 text-base font-semibold">
                The information you share will be used across IGotYou to help
                other guests and hosts get to know you.
              </span>
            </div>
            <CardFooter className="mt-2 text-[#3c3b3b]">
              <div className="w-full grid lg:grid-cols-2 md:grid-cols-1 gap-2 ">
                <ProfileButtonGroup />
              </div>
            </CardFooter>
          </Card>
          {profileData.listings?.length ? (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Listings
                username={profileData?.username}
                listings={profileData.listings}
              />
            </Suspense>
          ) : profileData.emailVerified ? (
            <>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-center font-semibold text-lg text-gray-600">
                    You have no listings to show
                  </CardTitle>
                </CardHeader>
                <CardContent className="mx-auto w-max">
                  <Button className="bg-gray-950 rounded-full">
                    <Link
                      to={`/become-a-host/${
                        auth.currentUser && auth.currentUser.uid
                      }`}
                    >
                      Create a listing
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-center font-semibold text-lg text-gray-600">
                    You have no listings to show
                  </CardTitle>
                </CardHeader>
                <CardContent className="mx-auto w-max">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="bg-gray-950 rounded-full">
                        Subscribe to create
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-bold">
                          You're email is not verified yet
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600 font-medium text-sm">
                          To create a listing, users are required to have a
                          verified email. Attempting this action without a
                          verified email is useless.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-full">
                          Close
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default ProfileContent;
