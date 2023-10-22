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
import { Link, useParams } from "react-router-dom";
import Flag from "react-svg-country-flags";

type TMobilePhone = {
  mobilePhone?: string;
  mobileVerified?: boolean;
};

function PhoneNumberSelect({ mobilePhone, mobileVerified }: TMobilePhone) {
  const { id } = useParams();
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
                <div className="flex gap-1">
                  <span>{country}</span>
                  <span>(+{getPhoneCode(country)})</span>
                </div>
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <form onSubmit={handleSubmit(mobilePhoneSubmit)}>
        <div className="flex items-center gap-2 mb-2">
          {<Flag country={countryCode} className="w-9 h-9" />}

          <Input autoFocus {...register("mobile_phone")} type="tel" />
        </div>
        {errors.mobile_phone && (
          <ErrorMessage message={errors.mobile_phone?.message} />
        )}
        <div className="flex gap-2">
          <Button size={"sm"} className="mt-3 w-max font-semibold bg-[#222222]">
            {mobilePhone && !isLoading && "Edit"}
            {isLoading && <DotPulse size={20} speed={1} color="#FFF" />}
            {!mobilePhone && "Add"}
          </Button>
          {!mobileVerified && mobilePhone ? (
            <Link
              to={`/account/verify-phone/${id}`}
              className={`mt-3 w-max font-semibold bg-[#222222] ${buttonVariants(
                { size: "sm" }
              )}`}
            >
              Verify mobile phone
            </Link>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
}

export default PhoneNumberSelect;
