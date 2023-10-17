import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { AxiosResponse } from "axios";

type TListingProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listingsData: AxiosResponse<TListingData, any> | undefined;
  username: string;
};

function Listings({ listingsData, username }: TListingProps) {
  return (
    <section className="w-full rounded-xl bg-white shadow-2xl p-6">
      <h2 className="mb-5 font-semibold text-xl text-[#222222]">
        {username}'s services
      </h2>
      <div className="grid items-center justify-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2 ">
        {listingsData?.data.listings?.map((listing, idx) => (
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
            <div className="text-sm w-[200px]">
              <p className="font-semibold">{listing.serviceType}</p>
              <p className="font-medium text-zinc-500">
                {listing.serviceDescription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

type TListingData = {
  listings?: [
    {
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
    }
  ];
};

export default Listings;
