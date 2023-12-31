import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth } from "@/firebase config/config";
import useCreateConversation from "@/hooks/useCreateConversation";
import useGetConversations from "@/hooks/useGetConversations";
import UserDropDownButton from "@/partials/components/UserDropDownButton";
import { CheckIcon, CircleIcon } from "@radix-ui/react-icons";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { ping } from "ldrs";
import Loader from "@/partials/loaders/Loader";
import useSearchUser from "@/hooks/useSearchUser";
import { useQueryClient } from "@tanstack/react-query";
import MessageDialogFilter from "@/partials/components/messages/MessageDialogFilter";

ping.register();

function MessagesLayout() {
  const { mutate, isPending } = useCreateConversation();
  const conversations = useGetConversations();
  const { conversationID } = useParams();
  const [receiverName, setReceiverName] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const { data } = useSearchUser(receiverName);
  const queryClient = useQueryClient();

  useMemo(() => {
    setTimeout(async () => {
      if (receiverName) {
        setUserDetails(
          data?.data.userDetails.filter(
            (v: { username: string }) =>
              auth.currentUser?.displayName != v.username
          )
        );
      } else {
        setUserDetails([]);
      }
    }, 500);
  }, [receiverName, data?.data.userDetails]);

  useEffect(() => {
    document.title = "Messages - IGotYou";
  }, []);

  return (
    <>
      {conversations.isPending ? (
        <Loader />
      ) : (
        <>
          <main className="min-h-screen ">
            <nav className="shadow py-5 px-28 flex justify-between items-center w-full max-w-screen-2xl mx-auto 2xl:rounded-b-lg">
              <Link to={"/"}>
                <span>
                  <img
                    className="object-cover w-[30px] max-h-full max-w-full"
                    loading="lazy"
                    src="https://uploads.turbologo.com/uploads/icon/preview_image/2880304/draw_svg20200612-15006-1ioouzj.svg.png"
                    alt="logo"
                  />
                </span>
              </Link>
              <div className="flex items-center justify-center gap-4">
                <UserDropDownButton />
              </div>
            </nav>
            <section className="flex w-full">
              <div className=" w-1/4 p-8">
                <div className="w-full flex items-center justify-between">
                  <span className="block font-bold text-2xl">Messages</span>
                  <MessageDialogFilter
                    queryClient={queryClient}
                    receiverName={receiverName}
                    setReceiverName={setReceiverName}
                    mutate={mutate}
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                  />
                </div>
                {conversations.isPending ? (
                  <div className="w-max mx-auto p-10">
                    <l-ping size="40" speed="2" color="black"></l-ping>
                  </div>
                ) : (
                  <div className="w-full flex flex-col gap-3 py-6">
                    {conversations.data?.data.userConversations.length > 0 ? (
                      conversations.data?.data.userConversations.map(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (v: {
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          lastMessage: any;
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          participants: any[];
                          _id: string;
                        }) => (
                          <div className="p-2 bg-[#F5F5F5] rounded-md">
                            <NavLink
                              to={`/messages/conversation/${v._id}`}
                              key={v._id}
                              className="flex flex-col gap-2 "
                            >
                              {v.lastMessage != null ? (
                                <span className="font-semibold w-max mx-auto text-xs">
                                  {conversations.data.data.currentUserID ===
                                  v.lastMessage.senderID._id ? (
                                    <span className="flex items-center gap-1">
                                      <span className="max-w-max w-32 whitespace-nowrap overflow-hidden text-ellipsis">
                                        You: {v.lastMessage.content}{" "}
                                      </span>
                                      <CircleIcon className="w-1 h-1 bg-gray-400 rounded-full" />
                                      {formatDistanceToNow(
                                        new Date(v.lastMessage.createdAt),
                                        { addSuffix: true }
                                      )}
                                    </span>
                                  ) : (
                                    <div
                                      className={`flex items-center gap-1 ${
                                        v.lastMessage.read
                                          ? ""
                                          : "font-extrabold"
                                      }`}
                                    >
                                      <span className="max-w-max w-32 whitespace-nowrap overflow-hidden text-ellipsis">
                                        {v.lastMessage.senderID.username}:{" "}
                                        {v.lastMessage.content}{" "}
                                      </span>
                                      <CircleIcon className="w-1 h-1 bg-gray-400 rounded-full" />
                                      {formatDistanceToNow(
                                        new Date(v.lastMessage.createdAt),
                                        { addSuffix: true }
                                      )}
                                    </div>
                                  )}
                                </span>
                              ) : (
                                <span className="font-semibold w-max mx-auto text-xs">
                                  You are connected with{" "}
                                </span>
                              )}
                              <span className="font-bold text-sm text-center w-full">
                                {
                                  v.participants.find(
                                    (u) =>
                                      u.username !==
                                      auth.currentUser?.displayName
                                  ).username
                                }
                              </span>
                            </NavLink>
                          </div>
                        )
                      )
                    ) : (
                      <span className="mt-8 w-max mx-auto font-medium text-gray-600">
                        No messages found.
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="w-3/4">
                {!conversationID && (
                  <div className="h-[70vh] flex flex-col gap-4 items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      className="w-16 h-16"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    <div className="flex flex-col items-center gap-2 justify-center">
                      <span className="text-2xl font-semibold">
                        Your messages
                      </span>
                      <span className="text-gray-600 font-medium">
                        Send private messages to a user
                      </span>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gray-950 rounded-full">
                          Send message
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="gap-4">
                        <DialogHeader className="items-center">
                          <DialogTitle className="p-2 text-lg font-bold">
                            New message
                          </DialogTitle>
                          <div className="flex w-full items-center justify-center gap-2">
                            <Label
                              htmlFor="username"
                              className="font-semibold text-sm"
                            >
                              To:
                            </Label>
                            <Input
                              value={receiverName}
                              onChange={(e) => setReceiverName(e.target.value)}
                              autoComplete="off"
                              placeholder="Search username"
                              className="text-sm font-medium p-2"
                              id="username"
                            />
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    disabled={!receiverName}
                                    onClick={() => setReceiverName("")}
                                    variant={"outline"}
                                    className="p-3"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                                      />
                                    </svg>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Clear search</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </DialogHeader>
                        <ScrollArea className="w-full h-60 p-4">
                          {!userDetails?.length ? (
                            <div className="w-max">
                              <span className="text-sm font-semibold text-gray-600">
                                No users found.
                              </span>
                            </div>
                          ) : (
                            userDetails.map((v) => (
                              <>
                                <Card
                                  onClick={() => setReceiverName(v.username)}
                                  className={`hover:cursor-pointer hover:bg-[#F5F5F5] shadow-none border-none ${
                                    receiverName === v.username
                                      ? "bg-[#F5F5F5]"
                                      : ""
                                  }`}
                                  key={v._id}
                                >
                                  <CardHeader className="flex-row items-center justify-between gap-2 p-4">
                                    <div className="flex items-center gap-2">
                                      <Avatar>
                                        <AvatarImage
                                          className="object-cover"
                                          src={` ${
                                            v.photoUrl ??
                                            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                                          } `}
                                        />
                                      </Avatar>
                                      <div className="flex flex-col">
                                        <span className="text-xs font-semibold">
                                          {v.username}
                                        </span>
                                        <div className="flex items-center justify-start">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                                            />
                                          </svg>

                                          <span className="text-xs font-medium ">
                                            {v.email}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    {receiverName === v.username && (
                                      <CheckIcon className="w-5 h-5" />
                                    )}
                                  </CardHeader>
                                </Card>
                              </>
                            ))
                          )}
                        </ScrollArea>
                        <DialogFooter className="w-full">
                          <Button
                            onClick={() => mutate(receiverName)}
                            disabled={
                              !userDetails?.find(
                                (v) =>
                                  v.username.toLowerCase() ===
                                  receiverName.toLowerCase()
                              ) || isPending
                            }
                            className="w-full bg-gray-950 rounded-full p-5"
                          >
                            Chat
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
                {<Outlet />}
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default MessagesLayout;
