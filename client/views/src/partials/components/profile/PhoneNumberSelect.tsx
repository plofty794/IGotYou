import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import ErrorMessage from "../ErrorMessage";
import ParsePhoneNumber from "libphonenumber-js/mobile"; // isPossiblePhoneNumber, // isValidPhoneNumber,
import { CountryCode, getCountries, getPhoneCode } from "libphonenumber-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  MobilePhoneSchema,
  ZodMobilePhoneSchema,
} from "@/zod/mobilePhoneSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateUserProfile from "@/hooks/useUpdateUserProfile";
import { DotPulse } from "@uiball/loaders";
import { Link } from "react-router-dom";

type TMobilePhone = {
  mobilePhone?: string;
  mobileVerified?: boolean;
};

function PhoneNumberSelect({ mobilePhone }: TMobilePhone) {
  const [countryCode, setCountryCode] = useState<CountryCode>("PH");
  const { mutate, isLoading } = useUpdateUserProfile();
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
    // if (
    //   !isValidPhoneNumber(data.mobile_phone, countryCode) &&
    //   !isPossiblePhoneNumber(data.mobile_phone)
    // ) {
    //   return setError("mobile_phone", { message: "Invalid mobile phone" });
    // }
    const phoneNumber = ParsePhoneNumber(data.mobile_phone, countryCode);
    if (!phoneNumber?.isValid()) {
      return setError("mobile_phone", { message: "Invalid mobile phone" });
    }
    mutate({ mobilePhone: phoneNumber.formatInternational() });
  }

  return (
    <div className="w-full flex flex-col gap-1">
      <Select
        defaultValue={countryCode}
        onValueChange={(value: CountryCode) => setCountryCode(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            className="placeholder:text-xs"
            placeholder="Country/Region"
          />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-72 w-full">
            {getCountries().map((country) => (
              <SelectItem value={country} key={country}>
                {country} (+{getPhoneCode(country)})
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <form onSubmit={handleSubmit(mobilePhoneSubmit)}>
        {!mobilePhone && (
          <span className="absolute z-10 bottom-[248px] right-[302px]">
            {"+" + getPhoneCode(countryCode)}
          </span>
        )}

        <Input
          {...register("mobile_phone")}
          className={`mb-1 ${mobilePhone ? "p-3" : "pl-12"}`}
          type="tel"
        />
        {errors.mobile_phone && (
          <ErrorMessage message={errors.mobile_phone?.message} />
        )}
        <div className="flex gap-2">
          <Button size={"sm"} className="mt-3 w-max font-semibold bg-[#222222]">
            {mobilePhone ? (
              "Edit"
            ) : isLoading ? (
              <DotPulse size={15} speed={1} color="white" />
            ) : (
              "Add"
            )}
          </Button>
          {mobilePhone && (
            <Link
              to={"/account/verify-phone"}
              className={`mt-3 w-max font-semibold bg-[#222222] ${buttonVariants(
                { size: "sm" }
              )}`}
            >
              Verify mobile phone
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}

export default PhoneNumberSelect;
