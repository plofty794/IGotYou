import { useIntersection } from "@mantine/hooks";
import { Card, CardContent } from "@/components/ui/card";

type ProfileCardProps = {
  name: string;
  photoUrl: string;
};

function ProfileCard({ name, photoUrl }: ProfileCardProps) {
  const { entry, ref } = useIntersection({
    threshold: 0.5,
  });

  return (
    <>
      <div
        ref={ref}
        className={`card-container blur opacity-0 transition duration-200 text-slate-200 ${
          entry?.isIntersecting
            ? entry?.target.classList.add("show")
            : entry?.target.classList.remove("show")
        }`}
      >
        <Card className="cursor-pointer flex flex-col justify-between bg-slate-800 border-none ">
          <CardContent className="p-0">
            <img
              className="object-cover w-[300px] h-[300px] hover:scale-105 transition rounded-2xl"
              loading="lazy"
              src={photoUrl}
            />
          </CardContent>
        </Card>
        <div className="mt-3">
          <p className="text-md">{name}</p>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
