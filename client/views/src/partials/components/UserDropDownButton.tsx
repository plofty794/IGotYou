import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useUserStore } from "@/store/userStore";
import { Link } from "react-router-dom";
import { auth } from "../../firebase config/config";

export function UserDropDownButton() {
  const logOut = useUserStore((state) => state.logOutUser);
  const User = auth.currentUser;

  function handleSignOut() {
    logOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-2xl bg-[#F2F2F2] border border-neutral-300"
          variant="secondary"
        >
          <HamburgerMenuIcon width={15} height={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 absolute left-[-200px] font-medium">
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-3">Messages</DropdownMenuItem>
          <DropdownMenuItem className="p-3">Wishlists</DropdownMenuItem>
          <DropdownMenuItem className="p-3">Bookings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#e1e0e0]" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-3">Manage bookings</DropdownMenuItem>
          <DropdownMenuItem className="p-3">
            <Link to={`/users/show/${User && User?.uid}`} className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#e1e0e0]" />
        <DropdownMenuItem className="p-3">
          <span className="w-full cursor-pointer" onClick={handleSignOut}>
            Sign out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropDownButton;
