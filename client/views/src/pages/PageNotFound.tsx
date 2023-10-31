import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="flex flex-col items-center justify-center gap-7">
        <div className="w-[370px] flex flex-col gap-2">
          <h1 className="text-5xl font-bold text-[#F24E1E]">Oops!</h1>
          <h2 className="font-semibold text-sm">
            {" "}
            We can't seem to find the page you're looking for.
          </h2>
          <h3 className="text-sm font-semibold">Error code: 404</h3>
        </div>
        <Button className="text-sm font-medium bg-[#222222] text-white rounded-full px-6 py-5">
          <Link to={"/"} replace>
            Go back
          </Link>
        </Button>
      </section>
    </main>
  );
}

export default PageNotFound;
