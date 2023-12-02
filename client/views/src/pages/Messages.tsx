import { Input } from "@/components/ui/input";
import { SocketContextProvider } from "@/context/SocketContext";
import useGetMessages from "@/hooks/useGetMessages";
import { useContext, useEffect, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNowStrict } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Messages() {
  const { data } = useGetMessages();
  const { socket } = useContext(SocketContextProvider);

  useEffect(() => {
    document.title = "Messages - IGotYou";
  }, []);

  useMemo(() => {
    socket?.on("receive-message", (data) => console.log(data.message));
  }, [socket]);

  return (
    <section className="w-full p-2">
      <h1 className="font-bold text-2xl">Messages</h1>
      {data?.pages.map((page) =>
        page.data.messages.map((v) => (
          <Tabs key={v._id} defaultValue="account" className="flex w-full ">
            <ScrollArea className="h-max w-1/4 h-">
              <TabsList className="w-full h-max flex-col gap-2">
                {page.data.currentUserID === v.senderID._id ? (
                  <TabsTrigger
                    className="w-full"
                    key={v._id}
                    value={v.senderID.username}
                  >
                    <div className="flex items-center gap-2 w-full h-max p-2">
                      <Avatar className=" h-12 w-12">
                        <AvatarImage
                          className="object-cover"
                          src={
                            v.receiverID.photoUrl ??
                            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                          }
                        />
                      </Avatar>
                      <div className="flex items-start flex-col">
                        <span className="font-bold text-sm">
                          {v.receiverID.username}
                        </span>
                        <div className="flex gap-1 items-center justify-center">
                          <span className="font-semibold text-xs text-gray-600">
                            {v.replies.length > 0
                              ? v.replies[0].content
                              : "You:" + v.content}
                          </span>
                          <span className="font-medium text-xs text-gray-600">
                            {formatDistanceToNowStrict(new Date(v.createdAt))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TabsTrigger>
                ) : (
                  <TabsTrigger
                    className="w-full"
                    key={v._id}
                    value={v.receiverID.username}
                  >
                    <div className="flex items-center gap-2 w-full h-max p-2">
                      <Avatar className=" h-12 w-12">
                        <AvatarImage
                          className="object-cover"
                          src={
                            v.senderID.photoUrl ??
                            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                          }
                        />
                      </Avatar>
                      <div className="flex items-start flex-col">
                        <span className="font-bold text-sm">
                          {v.senderID.username}
                        </span>
                        <div className="flex gap-1 items-center justify-center">
                          <span className="font-semibold text-xs text-gray-600">
                            {v.replies.length > 0
                              ? v.replies[0].content
                              : "You:" + v.content}
                          </span>
                          <span className="font-medium text-xs text-gray-600">
                            {v.replies.length > 0
                              ? formatDistanceToNowStrict(
                                  new Date(v.replies[0].createdAt)
                                )
                              : formatDistanceToNowStrict(
                                  new Date(v.createdAt)
                                )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TabsTrigger>
                )}
              </TabsList>
            </ScrollArea>
            <TabsContent
              className="px-8 w-full h-[60vh]"
              value={
                page.data.currentUserID === v.senderID._id
                  ? v.senderID.username
                  : v.receiverID.username
              }
            >
              <Card className="relative h-full">
                <CardContent></CardContent>
                <CardFooter className="gap-4 p-0 absolute bottom-0 w-full">
                  <Input className="rounded-full" />
                  <Button size={"lg"} className="bg-gray-950 rounded-full">
                    Send
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        ))
      )}
    </section>
  );
}

export default Messages;
