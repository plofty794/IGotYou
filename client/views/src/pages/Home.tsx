import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useGetListings from "@/hooks/useGetListings";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const { data, status } = useGetListings();
  const [hosts, setHosts] = useState<THosts[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "IGotYou";
    if (status === "success") {
      const hosts = data.pages.flatMap((page) => page.data.hosts);
      setHosts(hosts);
    }
  }, [data?.pages, status]);

  return (
    <section className="px-8">
      <div className="container grid grid-cols-4 gap-4">
        {hosts.length ? (
          hosts.map((host) => (
            <Card className="shadow-md border" key={host._id}>
              <CardHeader className="flex flex-col gap-1">
                <Avatar className="mx-auto w-28 h-28">
                  <AvatarImage
                    loading="lazy"
                    className="max-h-full max-w-full object-cover"
                    src={
                      host.photoUrl ??
                      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.slotcharter.net%2Fwp-content%2Fuploads%2F2020%2F02%2Fno-avatar.png&f=1&nofb=1&ipt=9e90fdb80f5dc7485d14a9754e5441d7fbcadb4db1a76173bf266e3acd9b3369&ipo=images"
                    }
                    alt="no avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-sm flex flex-col items-center gap-1">
                  <span className="uppercase font-semibold">
                    {host.username}
                  </span>
                  <span className="flex items-center justify-center text-xs font-medium text-[#222222]">
                    @{host.email.email}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-zinc-800 text-xs">
                  <ul className="text-zinc-500 font-medium list-disc px-4">
                    {host.listings &&
                      host.listings.map((listing) => (
                        <>
                          <li key={listing._id}>{listing.serviceType}</li>
                        </>
                      ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => navigate(`/users/visit/show/${host.uid}`)}
                  className="w-max mx-auto text-sm font-medium text-white bg-[#2b2b2b] hover:bg-[#222222]"
                >
                  View profile
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <h1>No listings</h1>
        )}
      </div>
    </section>
  );
}

type THosts = {
  _id: string;
  username: string;
  email: {
    email: string;
    isVerified: boolean;
  };
  isHost: boolean;
  mobilePhone: {
    isVerified: boolean;
  };
  photoUrl?: string;
  listings: TListing[];
  uid: string;
};

type TListing = {
  _id: string;
  host: {
    _id: string;
    createdAt: string;
    email: string;
    emailVerified: true;
    hostStatus: boolean;
    mobilePhone: string;
    mobileVerified: false;
    photoUrl: string;
    providerId: string;
    updatedAt: string;
    username: string;
  };
  listingPhotos: TListingPhotos[];
  serviceDescription: string;
  serviceType: string[];
};

type TListingPhotos = {
  original_filename: string;
  public_id: string;
  secure_url: string;
  _id: string;
};

export default Home;
