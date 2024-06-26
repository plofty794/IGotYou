import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useEnableListing from "@/hooks/useEnableListing";

function EnableListing({ listingID }: { listingID: string }) {
  const { mutate } = useEnableListing();

  function enableListing(listingID: string) {
    mutate({
      listingID,
    });
  }

  return (
    <DropdownMenuItem className="p-0">
      <Button
        onClick={() => enableListing(listingID)}
        variant={"ghost"}
        className="w-full p-2 text-sm font-semibold text-green-600 hover:text-green-800"
      >
        Enable listing
      </Button>
    </DropdownMenuItem>
  );
}

export default EnableListing;
