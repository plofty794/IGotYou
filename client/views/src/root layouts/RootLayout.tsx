import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import UserDropDownButton from "../partials/components/UserDropDownButton";
import { LiaVideoSolid } from "react-icons/lia";
import { MdAudiotrack, MdOutlineEventSeat } from "react-icons/md";
import { RiFilePaperLine } from "react-icons/ri";
import { ExclamationTriangleIcon, HomeIcon } from "@radix-ui/react-icons";
import { Button } from "../components/ui/button";
import { auth } from "@/firebase config/config";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function RootLayout() {
  const User = auth.currentUser;
  const navigate = useNavigate();

  return (
    <>
      <main className="min-h-screen">
        <nav className="bg-white shadow py-5 px-20 flex justify-between items-center">
          <Link to={"/"}>
            <span>
              <img
                className="w-[30px] h-[30px]"
                loading="lazy"
                src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
                alt="logo"
              />
            </span>
          </Link>
          <span className="border rounded-lg w-[400px] border-zinc-500 text-center">
            Search Navigation
          </span>
          <span className="text-sm font-medium flex justify-center items-center gap-5">
            {User && User?.emailVerified ? (
              <Button
                className="font-medium text-xs"
                variant={"ghost"}
                onClick={() =>
                  navigate(`/become-a-host/${User && User.uid}/overview`)
                }
              >
                Switch to hosting
              </Button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger className="text-xs font-medium hover:bg-zinc-100 p-2 rounded">
                  Want to host?
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      Verify your email first{" "}
                      <ExclamationTriangleIcon
                        color="orange"
                        width={25}
                        height={25}
                      />
                    </AlertDialogTitle>
                    <div className="text-zinc-950 font-medium">
                      <span className="text-xs">
                        Verifying your email is a crucial step for several
                        reasons:
                      </span>
                      <span className="text-xs text-zinc-700">
                        <ul className="pt-2 px-6 list-disc">
                          <li>
                            Security: Verifying your email helps us ensure that
                            you are the rightful owner of the account. It adds
                            an extra layer of security, making it harder for
                            unauthorized users to gain access.
                          </li>
                          <li>
                            Communication: We may need to contact you regarding
                            your account, updates, or important information. A
                            verified email ensures we can reach you reliably.
                          </li>
                          <li>
                            Account Recovery: In case you ever forget your
                            password or get locked out of your account, a
                            verified email is the primary means for account
                            recovery, helping you regain access.
                          </li>
                          <li>
                            Account Integrity: It helps maintain the integrity
                            of our community by ensuring that users are genuine
                            and not creating multiple accounts for misuse.
                          </li>
                          <li>
                            Personalization: Verified email allows us to
                            personalize your experience and tailor our services
                            to your preferences and needs.
                          </li>
                        </ul>
                      </span>
                    </div>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      onClick={() =>
                        navigate(`/users/show/${User && User.uid}`)
                      }
                      className="font-medium text-sm bg-[#222222] text-white "
                    >
                      Go to your profile
                    </AlertDialogAction>
                    <AlertDialogCancel className="font-medium text-sm bg-red-500 hover:bg-red-600 hover:text-white text-white ">
                      Close
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <UserDropDownButton />
          </span>
        </nav>
        <div className="font-semibold px-12 py-8 text-xs flex items-center justify-evenly gap-10">
          <NavLink
            to={"/"}
            className="flex flex-col items-center gap-1 text-[#434242] hover:text-[#a259ff]"
          >
            <span>
              <HomeIcon width={18} height={18} />
            </span>
            <h3>Home</h3>
          </NavLink>
          <NavLink
            to={"/category/photography&videography"}
            className="flex flex-col items-center gap-1 text-[#434242] hover:text-[#a259ff]"
          >
            <span className="text-xl">
              <LiaVideoSolid />
            </span>
            <h3>Photography & Videography</h3>
          </NavLink>
          <NavLink
            to={"/category/audio&sound_services"}
            className="flex flex-col items-center gap-1 text-[#434242] hover:text-[#a259ff]"
          >
            <span className="text-xl">
              <MdAudiotrack />
            </span>
            <h3>Audio & Sound Services</h3>
          </NavLink>
          <NavLink
            to={"/category/events&entertainment"}
            className="flex flex-col items-center gap-1 text-[#434242] hover:text-[#a259ff]"
          >
            <span className="text-xl">
              <MdOutlineEventSeat />
            </span>
            <h3>Events & Entertainment</h3>
          </NavLink>
          <NavLink
            to={"/category/events&entertainment"}
            className="flex flex-col items-center gap-1 text-[#434242] hover:text-[#a259ff]"
          >
            <span className="text-xl">
              <RiFilePaperLine />
            </span>
            <h3>Content and Marketing</h3>
          </NavLink>
        </div>
        {<Outlet />}
      </main>
    </>
  );
}

export default RootLayout;
