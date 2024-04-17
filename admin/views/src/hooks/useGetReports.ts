import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";

function useGetReports() {
  return useQuery({
    queryKey: ["reports"],
    queryFn: async (): Promise<TReports> => {
      return axiosPrivateRoute.get("/api/admin/reports");
    },
  });
}

type TReports = {
  data: {
    reservationCompletionAndCancellation: [
      {
        completionConfirmationRate: number;
        cancellationRate: number;
      }
    ];
    reservationPaymentAndVerificationStatus: [
      {
        _id: string;
        count: number;
        partialPayments: number;
        fullPayments: number;
      }
    ];
    reservationPaymentRefund: [
      { _id: null; totalRefunds: number; count: number }
    ];
    reservationStatusOvertime: [
      {
        _id: number;
        scheduled: number;
        ongoing: number;
        completed: number;
        cancelled: number;
      }
    ];
    reservationsPerDay: [{ _id: string; count: number }];
    reservationsRevenue: [{ _id: string; totalRevenue: number }];
  };
};

export default useGetReports;
