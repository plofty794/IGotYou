import useMultistepForm from "@/hooks/useMultistepForm";
import { useEffect } from "react";
import { Link, Navigate, Outlet, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

function SubscriptionLayout() {
  const { id } = useParams();
  const { step } = useMultistepForm(["welcome"]);

  useEffect(() => {
    document.title = "IGotYou - Subscription";
  }, []);

  return (
    <>
      {<Navigate to={`/subscription/${id}/${step}`} replace />}
      <section className="relative min-h-screen flex flex-col items-center justify-center ">
        {<Outlet />}
        <div className="border-t-2 absolute bottom-0 flex justify-between gap-4 p-8 w-full">
          <Link to={"/"} replace>
            <Button className="rounded-full p-6 font-medium text-xl w-max bg-[#222222] text-white">
              Go back
            </Button>
          </Link>
          <Button className="rounded-full p-6 font-medium text-xl w-max bg-[#222222] text-white">
            Get started
          </Button>
        </div>
      </section>
    </>
  );
}

export default SubscriptionLayout;
