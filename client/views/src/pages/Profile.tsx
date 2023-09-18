import { auth } from "@/firebase config/config";
import { useUserStore } from "@/store/userStore";
import { Link } from "react-router-dom";

function Profile() {
  const user = auth.currentUser;
  const logOut = useUserStore((state) => state.logOutUser);

  function handleSignOut() {
    logOut();
  }

  return (
    <div className="min-h-screen">
      <nav className="shadow py-5 px-20 flex justify-between items-center">
        <h1 className="font-bold text-2xl font-pacifico">IGotYou</h1>
        <ul className="text-sm font-medium flex justify-center items-center gap-5">
          <li>Become a Host</li>
          <li>Dropdown menu</li>
          <Link reloadDocument replace to={"/login"} onClick={handleSignOut}>
            Sign out
          </Link>
        </ul>
      </nav>
      <div className="px-40 mt-14">
        <h1>{user?.email}</h1>
      </div>
    </div>
  );
}

export default Profile;
