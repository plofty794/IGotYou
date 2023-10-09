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

type TProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: AxiosResponse<any, any> | undefined;
};

function ProfileContent({ data }: TProps) {
  const { mutate } = useVerifyEmail();

  return (
    <section className="flex gap-24 px-40 mt-14">
      <div className="flex flex-col gap-7 justify-between">
        <Card className="flex flex-col justify-center items-center w-[342px] px-22 py-5 shadow">
          <CardHeader className="p-4">
            <Avatar className="w-[80px] h-[80px]">
              <AvatarImage
                loading="lazy"
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardFooter className="p-0 flex flex-col">
            <span className="text-[#222222] text-2xl font-semibold">
              {data?.data.username ?? <Skeleton className="h-4 w-[100px]" />}
            </span>
            <span className="text-zinc-500 text-sm font-medium">
              {data?.data.hostStatus ? "Host" : "Guest"}
            </span>
          </CardFooter>
        </Card>
        <Card className="w-[342px]">
          <CardHeader>
            <span className="text-[#222222] text-xl font-semibold">
              {data?.data.username ? (
                data?.data.username + "'s confirmed information"
              ) : (
                <Skeleton className="h-4 w-[250px] mx-auto" />
              )}
            </span>
          </CardHeader>
          <CardContent className="flex flex-col">
            {data?.data.emailVerified ? (
              <div className="my-1">
                <CheckCircledIcon
                  color="#FFF"
                  width={22}
                  height={22}
                  className="inline-block bg-[#39c152] rounded-full"
                />{" "}
                <span className="text-[#222222] ml-2 text-sm">
                  Email address (verified)
                </span>
              </div>
            ) : (
              <div className="my-1">
                <CrossCircledIcon
                  color="#FFF"
                  width={22}
                  height={22}
                  className="inline-block bg-[#e94242] rounded-full"
                />{" "}
                <span className="text-[#222222] ml-2 text-sm">
                  Email address (not verified)
                </span>
              </div>
            )}
            {data?.data.mobileVerified ? (
              <div className="my-1">
                <CheckCircledIcon
                  color="#FFF"
                  width={22}
                  height={22}
                  className="inline-block bg-[#39c152] rounded-full"
                />{" "}
                <span className="text-[#222222] ml-2 text-sm">
                  Mobile phone (verified)
                </span>
              </div>
            ) : (
              <div className="my-1">
                <CrossCircledIcon
                  color="#FFF"
                  width={22}
                  height={22}
                  className="inline-block bg-[#e94242] rounded-full"
                />{" "}
                <span className="text-[#222222] ml-2 text-sm">
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
              {data?.data?.emailVerified
                ? "Personal info"
                : "Verify your email to edit your Personal info"}
            </p>
            <p className="text-xs font-medium">
              Provide personal details and how we can reach you
            </p>
          </CardHeader>
          <CardContent>
            {data?.data?.emailVerified ? (
              <PersonalInfoSheet />
            ) : (
              <Button
                onClick={() =>
                  mutate({ emailVerified: auth.currentUser?.emailVerified })
                }
                size={"sm"}
                className="font-semibold bg-[#222222]"
              >
                Verify email
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="w-[700px] shadow-lg">
          <CardHeader className="text-[#222222] text-4xl font-semibold">
            <h2>Your profile</h2>
          </CardHeader>
          <div className="text-[#222222] text-sm font-medium px-6 py-2">
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
      </div>
    </section>
  );
}

export default ProfileContent;
