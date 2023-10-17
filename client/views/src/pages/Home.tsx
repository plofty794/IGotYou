import useGetListings from "@/hooks/useGetListings";
import { useEffect, useState } from "react";

function Home() {
  const { data, status } = useGetListings();
  const [listings, setListings] = useState<unknown[]>([]);

  useEffect(() => {
    document.title = "IGotYou";
    if (status === "success") {
      const _listings = data.pages.flatMap((page) => page.data.listings);
      setListings(_listings);
    }
  }, [data?.pages, status]);

  return (
    <section className="px-8">
      {listings.map((listing, id) => (
        <div key={id}>
          <h1>{listing.serviceType}</h1>
        </div>
      ))}
    </section>
  );
}

export default Home;
