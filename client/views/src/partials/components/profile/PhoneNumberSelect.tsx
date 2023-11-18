import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ErrorMessage from "../ErrorMessage";
import ParsePhoneNumber from "libphonenumber-js/mobile"; // isPossiblePhoneNumber, // isValidPhoneNumber,

import { useForm } from "react-hook-form";
import {
  MobilePhoneSchema,
  ZodMobilePhoneSchema,
} from "@/zod/mobilePhoneSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import { Link, useParams } from "react-router-dom";
import Flag from "react-svg-country-flags";
import { dotPulse } from "ldrs";

dotPulse.register();

type TMobilePhone = {
  mobilePhone?: string;
  mobileVerified?: boolean;
};

function PhoneNumberSelect({ mobilePhone, mobileVerified }: TMobilePhone) {
  const { id } = useParams();
  const { mutate, isPending } = useUpdateUserProfile();

  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm<MobilePhoneSchema>({
    defaultValues: {
      mobile_phone: mobilePhone ?? "",
    },
    resolver: zodResolver(ZodMobilePhoneSchema),
  });

  function mobilePhoneSubmit(data: MobilePhoneSchema) {
    const phoneNumber = ParsePhoneNumber(data.mobile_phone, "PH");
    if (!phoneNumber?.isValid()) {
      return setError("mobile_phone", { message: "Invalid mobile phone" });
    }
    mutate({ mobilePhone: phoneNumber.formatInternational() });
  }

  return (
    <div className="w-full flex flex-col gap-1">
      <form onSubmit={handleSubmit(mobilePhoneSubmit)}>
        <div className="flex items-center gap-2 mb-2">
          {<Flag country={"PH"} className="w-9 h-9" />}
          <Input autoFocus {...register("mobile_phone")} type="tel" />
        </div>
        {errors.mobile_phone && (
          <ErrorMessage message={errors.mobile_phone?.message} />
        )}
        <div className="mt-4 flex items-center gap-2">
          <Button className="w-max font-semibold bg-gray-950 rounded-full text-xs">
            {mobilePhone != null && !isPending && "Edit"}
            {isPending && (
              // Default values shown
              <l-dot-pulse size="43" speed="1.3" color="white"></l-dot-pulse>
            )}
            {!mobilePhone && "Add"}
          </Button>
          {!mobileVerified && mobilePhone ? (
            <Button className="bg-gray-950 rounded-full text-xs">
              <Link to={`/account/verify-phone/${id}`}>
                Verify mobile phone
              </Link>
            </Button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
}

export default PhoneNumberSelect;
