import Lottie from "lottie-react";
import pending from "../../assets/pending.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type TUser = {
  user: {
    _id: string;
    username: string;
    email: string;
    emailVerified: boolean;
    hostStatus: boolean;
    photoUrl: string | null;
    mobileVerified: boolean;
    listings: [] | null;
    uid: string;
    reviews: [] | null;
    work: string;
    subscriptionStatus: string;
  };
};

function Pending({ user }: TUser) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5]">
      <Card className="flex w-2/4 flex-col justify-center border p-0 shadow-lg max-lg:w-[90%]">
        <CardHeader className="mx-auto w-max p-0">
          <Lottie
            animationData={pending}
            className="mx-auto h-[220px] w-full max-md:h-36"
          />
        </CardHeader>
        <CardDescription className="px-6 pb-4 text-2xl font-bold text-black max-sm:px-4 max-sm:text-lg">
          Hello {user.username}!
        </CardDescription>
        <CardContent className="flex flex-col gap-2 pb-4 text-base font-semibold text-gray-600 max-sm:px-4">
          <p className="max-sm:text-xs">
            We wanted to inform you that your subscription status is{" "}
            <span className="font-bold text-amber-600">currently pending</span>.
            Our team is working diligently to process your subscription, and we
            appreciate your patience.
          </p>
          <p className="max-sm:text-xs">
            We're here to help you with any concerns or inquiries you may have.
            Thank you for choosing IGotYou as your subscription provider. We
            look forward to providing you with the best service once your
            subscription is fully processed.
          </p>
        </CardContent>

        <Button className="mb-2 ml-auto mr-4 w-max rounded-full bg-gray-950 p-6 text-base font-semibold text-white max-md:text-xs max-sm:p-4">
          <Link to={"/"} replace>
            {" "}
            Go back
          </Link>
        </Button>
      </Card>
    </div>
  );
}

export default Pending;
