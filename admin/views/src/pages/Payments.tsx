import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetPayments from "@/hooks/useGetPayments";

function Payments() {
  const { data, isPending } = useGetPayments();

  console.log(data?.pages);

  return (
    <section className="py-4 px-8">
      <div className="w-full flex flex-col gap-4 overflow-clip">
        <h1 className="font-bold text-3xl">Payments</h1>
        <div className="grid grid-cols-4 gap-2">
          {isPending
            ? "Loading..."
            : data?.pages.flatMap((page) =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                page.data.paymentProofs.map((v: any) => (
                  <Card key={v._id}>
                    <CardHeader>
                      <img
                        className="max-h-full max-w-full block object-cover rounded-md "
                        src={v.paymentProofPhoto}
                        alt=""
                        loading="lazy"
                      />
                      <CardTitle className="text-xs font-bold text-gray-600">
                        Proof of payment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 font-medium text-sm">
                        Username: {v.user.username}
                      </CardDescription>
                      <CardDescription className="text-gray-600 font-medium text-sm">
                        Sent at: {new Date(v.createdAt).toLocaleString()}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button className="bg-red-600">Reject</Button>
                      <Button>Verify</Button>
                    </CardFooter>
                  </Card>
                ))
              )}
        </div>
      </div>
    </section>
  );
}

export default Payments;
