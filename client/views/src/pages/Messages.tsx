import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useGetConversation from "@/hooks/useGetConversation";
import ListingsLoader from "@/partials/loaders/ListingsLoader";
import { useMemo, useState } from "react";

function Messages() {
  const { data, isPending } = useGetConversation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [participant, setParticipant] = useState<any[]>([]);

  useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.data.conversation.map((v: { participants: any[] }) =>
      setParticipant(
        v.participants.filter(
          (u: { _id: string }) => u._id !== data.data.currentUserID
        )
      )
    );
  }, [data?.data.conversation, data?.data.currentUserID]);

  console.log(participant);

  return (
    <div className="px-8 py-6">
      {isPending ? (
        <ListingsLoader />
      ) : (
        <>
          <div className="w-full flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  className="object-cover"
                  src={participant[0]?.photoUrl}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-lg">
                {participant[0]?.username}
              </span>
            </div>
            <Button className="p-2" variant={"destructive"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </Button>
          </div>
          <Separator />
          <ScrollArea className="relative mt-2 h-[65vh] bg-[#F5F5F5] rounded-md border p-6">
            <div className="flex flex-col items-center justify-center gap-2 w-max mx-auto">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  className="object-cover"
                  src={participant[0]?.photoUrl}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-xl">
                {participant[0]?.username}
              </span>
              <Button className="bg-gray-950 rounded-full text-xs">
                View profile
              </Button>
            </div>
            <div className="bg-red-500 my-4 h-max">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni id
              quasi distinctio deleniti quia? Dolorem veritatis voluptas eos
              quis corporis ut. Assumenda voluptatibus minima tempora architecto
              possimus exercitationem, eligendi sint error doloribus earum nemo
              labore totam numquam reprehenderit. Et cupiditate expedita unde
              adipisci sint debitis in perferendis quidem tenetur necessitatibus
              alias quod iure tempora repellendus quisquam pariatur, delectus
              iste ea accusamus voluptatem laboriosam exercitationem dolores?
              Eum deserunt ducimus soluta sint vitae animi, inventore non
              recusandae. Beatae ad eum hic aspernatur, dolores fugiat sed nam
              consectetur, dolorem porro minima necessitatibus, sapiente
              architecto provident facilis sequi facere. Similique sequi debitis
              error, quisquam et, provident obcaecati consectetur necessitatibus
              incidunt earum illo? Architecto, dolor. Numquam repellat dolores
              tenetur facilis! Repudiandae ea eaque incidunt numquam! Et nisi
              repellat, eveniet aperiam voluptatum ab quae ex officia sed fuga
              suscipit vero, id nemo saepe sit amet voluptas animi molestias
              minus repellendus. Labore error adipisci fuga. Itaque ratione
              illum similique quod quo, velit minima praesentium veniam
              distinctio quidem rem ea earum at consequatur. Labore laborum quod
              delectus, optio facilis perferendis animi praesentium, illum fuga
              voluptate temporibus amet beatae, cumque alias. Perferendis saepe,
              eos earum quis quidem veniam incidunt, distinctio quas obcaecati
              enim quos maiores doloremque sunt voluptatem commodi?
            </div>
            <div className="flex justify-between items-center gap-2 p-2 absolute left-0 bottom-0 w-full">
              <Input
                placeholder="Message..."
                autoFocus
                className="font-medium rounded-full w-full"
              />
              <Button className="text-lg p-6 bg-gray-950 rounded-full">
                Send
              </Button>
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
}

export default Messages;
