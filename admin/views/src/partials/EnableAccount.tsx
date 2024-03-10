import { Button } from "@/components/ui/button";
import useEnableAccount from "@/hooks/useEnableAccount";

function EnableAccount({ userID }: { userID: string }) {
  const { mutate } = useEnableAccount();

  return (
    <Button
      onClick={() => mutate(userID)}
      className="bg-green-500 hover:bg-green-600"
      size={"sm"}
    >
      Enable account
    </Button>
  );
}

export default EnableAccount;
