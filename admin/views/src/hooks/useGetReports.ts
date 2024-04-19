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
    avgRatings: [
      {
        avgGuestRating: number;
        avgHostRating: number;
        totalGuestRatings: number;
        totalHostRatings: number;
      }
    ];
    reservationCompletionAndCancellation: [
      {
        completionConfirmationRate: number;
        cancellationRate: number;
      }
    ];
    guestRatingDistribution: [
      {
        count: number;
        _id: number;
      }
    ];
    hostRatingDistribution: [
      {
        count: number;
        _id: number;
      }
    ];
    topRatedGuests: [
      {
        averageRating: number;
        guestID: {
          username: string;
          photoUrl: string;
          email: string;
          _id: string;
        };
      }
    ];
    topRatedHosts: [
      {
        averageRating: number;
        hostID: {
          username: string;
          photoUrl: string;
          email: string;
          _id: string;
        };
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
