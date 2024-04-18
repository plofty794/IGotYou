import { axiosPrivateRoute } from "@/api/axiosRoute";
import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

function useGetPaymentTransactions(): UseInfiniteQueryResult<
  InfiniteData<AxiosResponse<TPaymentTransactions>, unknown>,
  Error
> {
  return useInfiniteQuery({
    queryKey: ["payment-transactions"],
    queryFn: async ({ pageParam = 1 }) => {
      return axiosPrivateRoute.get(
        `/api/reservations/reservation-payments-transactions/${pageParam}`,
      );
    },
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });
}

type TPaymentTransactions = {
  reservationPaymentsTransactionLog: [
    {
      fullPaymentVerificationStatus: string;
      partialPaymentVerificationStatus: string;
      partialPaymentAmount: number;
      fullPaymentAmount: number;
      fullPaymentDate: string;
      partialPaymentDate: string;
      status: string;
      partialPaymentProofPhoto: {
        public_id: string;
        secure_url: string;
        thumbnail_url: string;
        _id: string;
      };

      fullPaymentProofPhoto: {
        public_id: string;
        secure_url: string;
        thumbnail_url: string;
        _id: string;
      };

      guestID: {
        username: string;
        _id: string;
      };
      listingID: {
        serviceTitle: string;
      };
      paymentType: string;
      _id: string;
    },
  ];
};

export default useGetPaymentTransactions;
