import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetVerifiedPayments from "@/hooks/useGetVerifiedPayments";
import AdminDropdownMenu from "@/partials/AdminDropdownMenu";
import { ring } from "ldrs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
ring.register();

function VerifiedPayments() {
  const { data, isPending, isSuccess } = useGetVerifiedPayments();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<any[] | null>(null);

  useEffect(() => {
    if (isSuccess) {
      const _data = data.pages.flatMap((v) => v.data.verifiedPayments);
      setContent(_data);
    }
  }, [data?.pages, isSuccess]);

  return (
    <main className="min-h-screen">
      <nav className="py-4 px-8 flex justify-between items-center border-b">
        <Link to={"/payments"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="gray"
            className="w-5 h-5 hover:stroke-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </Link>
        <AdminDropdownMenu />
      </nav>
      <>
        {isPending ? (
          <l-ring
            size="40"
            stroke="5"
            bg-opacity="0"
            speed="2"
            color="black"
          ></l-ring>
        ) : data?.pages[0].data.verifiedPayments ? (
          <section className="px-8 py-4">
            <h1 className="font-bold text-2xl">Verified payments</h1>
            <div className="grid grid-cols-3 gap-2">
              <Card className="mt-2">
                <CardHeader className="flex-row items-center justify-between w-full">
                  <CardTitle>Total Verified Payments</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                    />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{content?.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            <div>
              <table>t</table>
            </div>
          </section>
        ) : (
          <section className="flex">!has verified payment</section>
        )}
      </>
    </main>
  );
}

export default VerifiedPayments;
