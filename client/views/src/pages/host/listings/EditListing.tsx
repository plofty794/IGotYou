import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useVisitListing from "@/hooks/useVisitListing";
import { TFileType, TListing } from "@/root layouts/BecomeAHostLayout";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import EditListingTitleCollapsible from "./collapsibles/EditListingTitleCollapsible";
import EditListingDescriptionCollapsible from "./collapsibles/EditListingDescriptionCollapsible";
import ListingAssets from "./ListingAssets";
import EditListingLocationCollapsible from "./collapsibles/EditListingLocationCollapsible";
import EditListingPriceCollapsible from "./collapsibles/EditListingPriceCollapsible";
import EditListingCancellationPolicy from "./collapsibles/EditListingCancellationPolicyCollapsible";
import EditListingAssetsDialog from "./EditListingAssetsDialog";
import EditListingDates from "./collapsibles/EditListingDates";

type Listing = {
  listing: TListing;
};

function EditListing() {
  const {
    data,
    isPending,
  }: UseQueryResult<AxiosResponse<Listing>, Error> = useVisitListing();

  return (
    <>
      {isPending ? (
        "Loading..."
      ) : (
        <div className="flex w-full flex-col gap-4">
          <div className="p-4 pt-6">
            <div className="mb-4 flex w-full items-center justify-between">
              <h2 className="text-xl font-semibold capitalize">
                {data?.data.listing.serviceTitle}'s Assets
              </h2>
              <EditListingAssetsDialog
                listingsAssets={data?.data.listing.listingAssets}
              />
            </div>
            <ListingAssets
              listingAssets={data?.data.listing.listingAssets as TFileType[]}
            />
          </div>
          <div className="p-4 max-md:p-0">
            <Card className="p-6 shadow-lg max-sm:p-4">
              <CardHeader className="p-0">
                <div className="w-full pb-4">
                  <h2 className="text-xl font-semibold max-sm:text-lg">
                    Listing details
                  </h2>
                </div>
              </CardHeader>
              <div className="flex w-full flex-col gap-4">
                <EditListingTitleCollapsible
                  serviceTitle={data?.data.listing.serviceTitle as string}
                />
                <Separator />
                <EditListingDescriptionCollapsible
                  serviceDescription={
                    data?.data.listing.serviceDescription as string
                  }
                />
                <Separator />
                <EditListingLocationCollapsible
                  serviceLocation={data?.data.listing.serviceLocation as string}
                />
                <Separator />
                <EditListingPriceCollapsible
                  price={data?.data.listing.price as number}
                />
                <Separator />
                <EditListingCancellationPolicy
                  cancellationPolicy={
                    data?.data.listing.cancellationPolicy as string
                  }
                />
                <Separator />
                <EditListingDates
                  subscriptionExpiresAt={
                    data?.data.listing.host?.subscriptionExpiresAt
                  }
                  availableAt={data?.data.listing.availableAt}
                  endsAt={data?.data.listing.endsAt}
                />
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

export default EditListing;
