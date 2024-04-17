import DatePicker from "@/partials/dashboard/DatePicker";
import Overview from "@/partials/dashboard/Overview";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Analytics from "@/partials/dashboard/Analytics";
import Reports from "@/partials/dashboard/Reports";

function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard - Admin IGotYou";
  }, []);

  return (
    <>
      <section className="py-4 px-8 w-full">
        <div className="w-full flex items-center justify-between">
          <h1 className="font-bold text-4xl">Dashboard</h1>
          <DatePicker />
        </div>
        <Tabs className="mt-4" defaultValue="overview">
          <TabsList className="border">
            <TabsTrigger className="font-semibold" value="overview">
              Overview
            </TabsTrigger>
            <TabsTrigger className="font-semibold" value="analytics">
              Analytics
            </TabsTrigger>
            <TabsTrigger className="font-semibold" value="reports">
              Reports
            </TabsTrigger>
          </TabsList>
          <TabsContent className="w-full" value="overview">
            <Overview />
          </TabsContent>
          <TabsContent className="w-full" value="analytics">
            <Analytics />
          </TabsContent>
          <TabsContent className="w-full" value="reports">
            <Reports />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}

export default Dashboard;
