import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LocationSchema, ZodLocationSchema } from "@/zod/locationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BackpackIcon,
  Pencil2Icon,
  HomeIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

function ProfileButtonGroup() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LocationSchema>({
    defaultValues: {
      address: "",
      city: "",
      state: "",
      postal_code: "",
    },
    resolver: zodResolver(ZodLocationSchema),
  });

  function handleLocationSubmit(data: LocationSchema) {
    console.log(data);
  }

  return (
    <>
      <Dialog>
        <DialogTrigger
          className="hover:bg-[#e9e9e9] w-full font-medium text-md shadow-md
            flex justify-start items-center pl-4 pr-6 py-8 rounded"
        >
          <span className="mr-2">
            <Pencil2Icon color="black" width={25} height={25} />
          </span>
          <p>Where I went to school</p>
        </DialogTrigger>
        <DialogContent className="p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl mb-4">
              Where did you go to school?
            </DialogTitle>
            <DialogDescription>
              Whether it’s home school, high school, or trade school, name the
              school that made you who you are.
            </DialogDescription>
          </DialogHeader>
          <form className="mt-4">
            <Label className="text-sm font-medium" htmlFor="school">
              Where I went to school:
            </Label>
            <Input autoFocus id="school" name="school" />
            <Button
              className="bg-[#222222] text-white font-medium my-2"
              size={"lg"}
              variant={"secondary"}
            >
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger
          className="hover:bg-[#e9e9e9] w-full font-medium text-md shadow-md
            flex justify-start items-center pl-4 pr-6 py-8 rounded"
        >
          <span className="mr-2">
            <BackpackIcon color="black" width={25} height={25} />
          </span>
          My work
        </DialogTrigger>
        <DialogContent className="p-8">
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <form className="mt-4">
            <Label className="text-sm font-medium" htmlFor="school">
              Where I went to school:
            </Label>
            <Input autoFocus id="school" name="school" />
            <Button
              className="bg-[#222222] text-white font-medium my-2"
              size={"lg"}
              variant={"secondary"}
            >
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger
          className="hover:bg-[#e9e9e9] w-full font-medium text-md shadow-md
            flex justify-start items-center pl-4 pr-6 py-8 rounded"
        >
          <span className="mr-2">
            <HomeIcon color="black" width={25} height={25} />
          </span>
          Where I live
        </DialogTrigger>
        <DialogContent className="p-8">
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleLocationSubmit)} className="mt-4">
            <Label className="text-sm font-medium" htmlFor="address">
              Address
            </Label>
            <Input {...register("address")} autoFocus id="address" />
            {errors.address && (
              <ErrorMessage message={errors.address?.message} />
            )}
            <Label className="text-sm font-medium" htmlFor="city">
              City
            </Label>
            <Input {...register("city")} autoFocus id="city" />
            {errors.city && <ErrorMessage message={errors.city?.message} />}
            <Label className="text-sm font-medium" htmlFor="state">
              State
            </Label>
            <Input {...register("state")} autoFocus id="state" />
            {errors.state && <ErrorMessage message={errors.state?.message} />}
            <Label className="text-sm font-medium" htmlFor="postal-code">
              Postal code
            </Label>
            <Input {...register("postal_code")} autoFocus type="number" />
            {errors.postal_code && (
              <ErrorMessage message={errors.postal_code?.message} />
            )}

            <Button
              className="bg-[#222222] text-white font-medium mt-7"
              size={"lg"}
              variant={"secondary"}
            >
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger
          className="hover:bg-[#e9e9e9] w-full font-medium text-md shadow-md
            flex justify-start items-center pl-4 pr-6 py-8 rounded"
        >
          <span className="mr-2">
            <RocketIcon color="black" width={25} height={25} />
          </span>
          My fun fact
        </DialogTrigger>
        <DialogContent className="p-8">
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <form className="mt-4">
            <Label className="text-sm font-medium" htmlFor="school">
              Where I went to school:
            </Label>
            <Input autoFocus id="school" name="school" />
            <Button
              className="bg-[#222222] text-white font-medium my-2"
              size={"lg"}
              variant={"secondary"}
            >
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProfileButtonGroup;
