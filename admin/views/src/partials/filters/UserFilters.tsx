import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQueryClient } from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TData = any;

function UserFilters({ table }: { table: Table<TData> }) {
  const queryClient = useQueryClient();
  const [identityVerifiedFilter, setIdentityVerifiedFilter] = useState("");
  const [emailVerifiedFilter, setEmailVerifiedFilter] = useState("");
  const [userStatusFilter, setUserStatusFilter] = useState("");

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 w-4/5">
          <Input
            value={
              (table.getColumn("username")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) =>
              table.getColumn("username")?.setFilterValue(e.target.value)
            }
            placeholder="Search by username..."
            className="w-1/3"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Identity verified <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={identityVerifiedFilter === "true"}
                onClick={() => {
                  setIdentityVerifiedFilter("true");
                  table.getColumn("identityVerified")?.setFilterValue(true);
                }}
                className="capitalize"
              >
                True
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={identityVerifiedFilter === "false"}
                onClick={() => {
                  setIdentityVerifiedFilter("false");
                  table.getColumn("identityVerified")?.setFilterValue(false);
                }}
                className="capitalize"
              >
                False
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Email verified <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={emailVerifiedFilter === "true"}
                onClick={() => {
                  setEmailVerifiedFilter("true");
                  table.getColumn("emailVerified")?.setFilterValue(true);
                }}
                className="capitalize"
              >
                True
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={emailVerifiedFilter === "false"}
                onClick={() => {
                  setEmailVerifiedFilter("false");
                  table.getColumn("emailVerified")?.setFilterValue(false);
                }}
                className="capitalize"
              >
                False
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                User status <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={userStatusFilter === "guest"}
                onClick={() => {
                  setUserStatusFilter("guest");
                  table.getColumn("userStatus")?.setFilterValue("guest");
                }}
                className="capitalize"
              >
                guest
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={userStatusFilter === "host"}
                onClick={() => {
                  setUserStatusFilter("host");
                  table.getColumn("userStatus")?.setFilterValue("host");
                }}
                className="capitalize"
              >
                host
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant={"outline"}
            className="flex items-center gap-2"
            onClick={() => {
              setIdentityVerifiedFilter("");
              setEmailVerifiedFilter("");
              setUserStatusFilter("");
              table.reset();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            <span className="font-medium">Reset</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() =>
                    queryClient.invalidateQueries({ queryKey: ["users"] })
                  }
                  variant={"outline"}
                >
                  <ReloadIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reload</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
}

export default UserFilters;
