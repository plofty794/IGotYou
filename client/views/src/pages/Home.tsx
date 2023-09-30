import UserDropDownButton from "@/partials/components/UserDropDownButton";
import { CrumpledPaperIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    document.title = "IGotYou";
  }, []);

  return (
    <main className="min-h-screen bg-[#F2F2F2]">
      <nav className="bg-white shadow py-5 px-20 flex justify-between items-center">
        <Link to={"/"}>
          <CrumpledPaperIcon width={25} height={25} />
        </Link>
        <ul className="text-sm font-medium flex justify-center items-center gap-5">
          <li>Become a Host</li>

          <UserDropDownButton />
        </ul>
      </nav>
      <section>
        <h1>HOME</h1>
      </section>
    </main>
  );
}

export default Home;
