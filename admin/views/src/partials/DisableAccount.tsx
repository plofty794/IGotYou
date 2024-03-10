import { Button } from "@/components/ui/button";
import useDisableAccount from "@/hooks/useDisableAccount";

function DisableAccount({ userID }: { userID: string }) {
  const { mutate } = useDisableAccount();

  return (
    <Button onClick={() => mutate(userID)} variant={"destructive"} size={"sm"}>
      Disable account
    </Button>
  );
}

export default DisableAccount;
