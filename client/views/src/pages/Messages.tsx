// /* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from "react-router-dom";

// import { SocketContextProvider } from "@/context/SocketContext";
// import useGetMessages from "@/hooks/useGetMessages";
// import { useContext, useEffect, useMemo, useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { auth } from "@/firebase config/config";
// import { Textarea } from "@/components/ui/textarea";
// import { useQueryClient } from "@tanstack/react-query";
// import { formatDistanceToNow } from "date-fns";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useForm } from "react-hook-form";
// import {
//   ComposeMessageSchema,
//   ZodComposeMessageSchema,
// } from "@/zod/composeMessageSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { axiosPrivateRoute } from "@/api/axiosRoute";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
// } from "@/components/ui/select";
// import ErrorMessage from "@/partials/components/ErrorMessage";

function Messages() {
  const { id } = useParams();

  return (
    <div className="px-8 py-4">
      <div className="w-full flex justify-between items-center">
        <span>Name</span>
        <span>Delete</span>
      </div>
      <div>Hello {id}</div>
    </div>
  );
}

export default Messages;
