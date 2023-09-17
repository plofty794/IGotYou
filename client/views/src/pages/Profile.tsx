import { Card, CardContent } from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";

function Profile() {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <div className="min-h-screen">
      <nav className="shadow py-5 px-20 flex justify-between items-center">
        <h1 className="font-bold text-2xl font-pacifico">IGotYou</h1>
        <ul className="text-sm font-medium flex justify-center items-center gap-5">
          <li>Become a Host</li>
          <li>Dropdown menu</li>
        </ul>
      </nav>
      <div className="px-40 mt-14">
        <h1>{user?.email}</h1>
      </div>
    </div>
  );
}

export default Profile;
