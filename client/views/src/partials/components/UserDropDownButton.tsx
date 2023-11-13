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
import { Link } from "react-router-dom";
import { auth } from "../../firebase config/config";
import useLogOutUser from "@/hooks/useLogout";

export function UserDropDownButton() {
  const User = auth.currentUser;
  const logOutUser = useLogOutUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex items-center justify-between w-max h-max gap-3 rounded-full bg-white border"
          variant="secondary"
        >
          <HamburgerMenuIcon width={16} height={16} />
          <img
            className="w-[32px] h-[32px] max-h-full max-w-full object-cover rounded-full"
            src={
              auth.currentUser?.photoURL ??
              "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
            }
            alt="user-avatar"
            loading="lazy"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 font-medium" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-2">Messages</DropdownMenuItem>
          <DropdownMenuItem className="p-2">
            <Link to={"/users/wishlists"} className="w-full" replace>
              Wishlists
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2">Bookings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#e1e0e0]" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-2">Manage bookings</DropdownMenuItem>
          <DropdownMenuItem className="p-2">
            <Link
              to={`/users/show/${User && User?.uid}`}
              className="w-full"
              replace
            >
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#e1e0e0]" />
        <DropdownMenuItem className="p-2">
          <span
            className="w-full cursor-pointer"
            onClick={async () => await logOutUser()}
          >
            Log out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropDownButton;
