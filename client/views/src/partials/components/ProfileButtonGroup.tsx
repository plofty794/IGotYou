import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useGetCurrentLocation } from "@/hooks/useGetCurrentLocation";
import { useState } from "react";
import useGeoding from "@/hooks/useGeoding";

function ProfileButtonGroup() {
  const [results, setResults] = useState([]);
  const geoCode = useGeoding();
  const [address, setAddress] = useState("");
  const { data } = useGetCurrentLocation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<LocationSchema>({
    defaultValues: {
      address: "",
    },
    resolver: zodResolver(ZodLocationSchema),
  });

  function handleGetCurrentLoc() {
    console.log(data?.data);
    const suburb =
      data?.data.features[0].properties?.suburb ||
      data?.data.features[0].properties?.road;
    data?.data &&
      setAddress(
        suburb +
          " " +
          data?.data.features[0].properties.address_line1 +
          " " +
          data?.data.features[0].properties.address_line2
      );
    address && setValue("address", address);
  }

  async function handleLocationSubmit(data: LocationSchema) {
    const res = await geoCode(data.address);
    setResults((prev) => [...prev, ...res?.results]);
    console.log(results);
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
            <DialogTitle className="text-3xl">Where do you live?</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleLocationSubmit)} className="mt-4">
            <Label className="text-sm font-medium" htmlFor="address">
              Your Address
            </Label>
            <Input
              {...register("address")}
              placeholder="Full Address w/ Zip code"
              autoFocus
              id="address"
            />
            {errors.address && (
              <ErrorMessage message={errors.address?.message} />
            )}
            <ul>
              {results.map((result) => (
                <li>{result.plus_code_short}</li>
              ))}
            </ul>
            <div className="flex gap-2 items-center pt-6">
              <Button
                className="bg-[#222222] text-white font-medium"
                size={"lg"}
                variant={"secondary"}
              >
                Save
              </Button>
              <Button
                type="button"
                className="bg-[#222222] text-white font-medium text-xs"
                size={"lg"}
                variant={"secondary"}
                onClick={() => handleGetCurrentLoc()}
              >
                <FontAwesomeIcon className="mr-2" icon={faLocationDot} />
                Get your current location
              </Button>
            </div>
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
