import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import PoliteChicky from "../../assets/Polite Chicky.json";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function IdentityVerificationPending({ username }: { username: string }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center max-md:px-4">
      <Card className="flex w-3/5 flex-col justify-center gap-2 border-none shadow-none max-md:w-full">
        <CardHeader className="mx-auto w-max p-0">
          <Lottie
            animationData={PoliteChicky}
            className="mx-auto h-[220px] w-full max-md:h-40"
          />
        </CardHeader>
        <CardDescription className="px-6 pb-4 text-2xl font-bold text-gray-950 max-md:p-2 max-md:text-xl">
          Hello {username}!
        </CardDescription>
        <CardContent className="flex flex-col gap-2 pb-4 text-base  font-semibold text-gray-600 max-md:p-2 max-md:text-xs">
          <span>
            We wanted to inform you that your identity verification status is{" "}
            <span className="font-bold text-amber-600">currently pending</span>.
            Our team is working diligently to process verification of your
            identity, and we appreciate your patience.
          </span>
          <span>
            We're here to help you with any concerns or inquiries you may have.
            We look forward to providing you with the best service once your
            subscription is fully processed.
          </span>
        </CardContent>
        <Button className="mb-2 ml-auto mr-4 w-max rounded-full bg-gray-950 p-6 text-base font-semibold text-white max-md:p-4">
          <Link to={"/"} replace>
            Go back
          </Link>
        </Button>
      </Card>
    </div>
  );
}

export default IdentityVerificationPending;
