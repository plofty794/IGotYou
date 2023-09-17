import { useUserStore } from "@/store/userStore";

function Profile() {
  const user = useUserStore((state) => state.user);
  return (
    <div>
      <h1>Hello {user?.email}</h1>
    </div>
  );
}

export default Profile;
