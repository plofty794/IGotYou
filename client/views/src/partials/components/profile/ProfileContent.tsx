import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CheckIcon } from "@radix-ui/react-icons";

import { AxiosResponse } from "axios";
import ProfileButtonGroup from "./ProfileButtonGroup";

type TProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: AxiosResponse<any, any> | undefined;
};

function ProfileContent({ data }: TProps) {
  return (
    <section className="flex gap-24 px-40 mt-14">
      <div className="flex flex-col gap-7 justify-between">
        <Card className="flex flex-col justify-center items-center gap-5 w-[342px] px-28 py-5 shadow-2xl">
          <CardHeader className="text-white rounded-full w-[100px] h-[100px] bg-[#222222]">
            <span className="text-center text-5xl font-semibold">
              {data?.data.username[0].toUpperCase()}
            </span>
          </CardHeader>
          <CardFooter className="p-0 flex flex-col">
            <span className="text-[#222222] text-2xl font-semibold">
              {data?.data.username}
            </span>
            <span className="text-[#222222] text-md font-medium">
              {data?.data.hostStatus ? "Host" : "Guest"}
            </span>
          </CardFooter>
        </Card>
        <Card className="w-[342px]">
          <CardHeader>
            <p className="text-[#222222] text-xl font-semibold">
              {data?.data.username + "'s"} confirmed information
            </p>
          </CardHeader>
          <CardContent>
            {data?.data.email && (
              <>
                <CheckIcon
                  color="#39c152"
                  width={22}
                  height={22}
                  className="inline-block"
                />{" "}
                <span className="text-[#222222] ml-2">Email address</span>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="w-[700px] shadow-lg">
          <CardHeader className="text-[#222222] text-4xl font-semibold">
            <h2>Your profile</h2>
          </CardHeader>
          <div className="text-[#222222] font-medium px-6 py-2">
            <h3>
              The information you share will be used across IGotYou to help
              other guests and hosts get to know you.
            </h3>
          </div>
          <CardFooter className="mt-2 text-[#3c3b3b]">
            <div className="w-full grid grid-cols-2 gap-2 ">
              <ProfileButtonGroup />
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

export default ProfileContent;
