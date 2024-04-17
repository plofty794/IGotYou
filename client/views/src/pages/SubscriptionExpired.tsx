import Lottie from "lottie-react";
import timesUp from "../assets/times-up.json";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";

function SubscriptionExpired() {
  const { id } = useParams();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Lottie animationData={timesUp} className="h-1/5 w-1/5" />
      <div className="flex w-max flex-col">
        <p className="text-2xl font-bold">
          Your IGotYou Hosting subscription has expired!
        </p>
        <p className="text-base font-semibold text-gray-600">
          To continue using IGotYou Hosting, click{" "}
          <Button className="p-0 text-blue-600" variant={"link"}>
            <Link to={`/subscription/${id}`}>here</Link>
          </Button>{" "}
          to subscribe again.
        </p>
      </div>
      <Button variant={"link"}>
        <Link to={"/"} reloadDocument>
          Go to homepage
        </Link>
      </Button>
    </main>
  );
}

export default SubscriptionExpired;
