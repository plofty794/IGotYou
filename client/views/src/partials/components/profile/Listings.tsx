import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

type TListingProps = {
  listings: TListings[];
  username: string;
};

type TListings = {
  _id: string;
  serviceType: string[];
  serviceDescription: string;
  listingPhotos: [
    {
      public_id: string;
      secure_url: string;
      original_filename: string;
      _id: string;
    }
  ];
};

function Listings({ listings, username }: TListingProps) {
  return (
    <section className="w-full rounded-xl bg-white shadow-xl p-6">
      <h2 className="mb-5 font-semibold text-xl text-[#222222]">
        {username}'s services
      </h2>
      <div className="grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 ">
        {listings?.map((listing, idx) => (
          <div
            key={idx + idx}
            className="flex justify-center items-center flex-col gap-2"
          >
            <Swiper
              key={idx}
              cssMode={true}
              navigation={true}
              pagination={true}
              mousewheel={true}
              keyboard={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            >
              {listing.listingPhotos.map((photo) => (
                <SwiperSlide key={photo.public_id}>
                  <img
                    key={photo._id}
                    loading="lazy"
                    className="rounded-lg max-h-full max-w-full w-full h-[250px] object-cover"
                    src={photo.secure_url}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="text-sm w-full h-full">
              <p className="font-semibold">{listing.serviceType}</p>
              <p className="font-medium text-gray-600">
                {listing.serviceDescription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Listings;
