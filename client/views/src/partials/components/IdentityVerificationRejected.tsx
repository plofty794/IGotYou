import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Lottie from "lottie-react";
import Sad from "../../assets/sad.json";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useRetryIdentityVerification from "@/hooks/useRetryIdentityVerification";

function IdentityVerificationRejected({
  username,
  _id,
}: {
  username: string;
  _id: string;
}) {
  const { mutate, isPending } = useRetryIdentityVerification();

  return (
    <div className="flex min-h-[70vh] items-center justify-center max-md:px-4">
      <Card className="flex w-3/5 flex-col justify-center gap-2 border-none shadow-none max-md:w-full">
        <CardHeader className="mx-auto w-max p-0">
          <Lottie
            animationData={Sad}
            className="mx-auto h-[220px] w-full max-md:h-40"
          />
        </CardHeader>
        <CardDescription className="px-6 pb-4 text-2xl font-bold text-gray-950 max-md:p-2 max-md:text-xl">
          Hello {username}!
        </CardDescription>
        <CardContent className="flex flex-col gap-2 pb-4 text-base font-semibold text-gray-600 max-md:p-2 max-md:text-xs">
          <span>
            We regret to inform you that your identity verification request has
            been <span className="font-bold text-red-600">rejected</span>. Our
            team has reviewed your submission and unfortunately, it does not
            meet our verification criteria.
          </span>
          <span>
            If you believe this decision is incorrect or if you have any further
            questions, please don't hesitate to contact our support team. We're
            here to assist you and address any concerns you may have.
          </span>
        </CardContent>
        <div className="flex w-full items-center justify-end gap-2">
          <Button
            variant={"outline"}
            className="w-max rounded-full p-6 text-base font-semibold max-md:p-4"
          >
            <Link to={"/"} replace>
              Go back
            </Link>
          </Button>
          <Button
            disabled={isPending}
            onClick={() => mutate(_id)}
            className="w-max rounded-full bg-gray-950 p-6 text-base font-semibold text-white max-md:p-4"
          >
            Retry
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default IdentityVerificationRejected;
