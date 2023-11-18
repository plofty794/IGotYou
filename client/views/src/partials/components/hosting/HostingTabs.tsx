import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function HostingTabs() {
  return (
    <Tabs defaultValue="account" className="mt-6 full">
      <TabsList className="justify-between bg-white w-1/3">
        <TabsTrigger
          className="rounded-full px-4 py-2 border font-semibold"
          value="account"
        >
          Currently hosting
        </TabsTrigger>
        <TabsTrigger
          className="rounded-full px-4 py-2 border font-semibold"
          value="password"
        >
          Password
        </TabsTrigger>
        <TabsTrigger
          className="rounded-full px-4 py-2 border font-semibold"
          value="upcoming"
        >
          Upcoming
        </TabsTrigger>
      </TabsList>
      <TabsContent className="mt-6 p-4 rounded-md bg-[#F7F7F7]" value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent
        className="mt-6 p-4 rounded-md bg-[#F7F7F7]"
        value="password"
      >
        Change your password here.
      </TabsContent>
      <TabsContent
        className="mt-6 p-4 rounded-md bg-[#F7F7F7]"
        value="upcoming"
      >
        Upcoming.
      </TabsContent>
    </Tabs>
  );
}

export default HostingTabs;
