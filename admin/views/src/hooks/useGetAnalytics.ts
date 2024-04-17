import { axiosPrivateRoute } from "@/api/axiosRoute";
import { useQuery } from "@tanstack/react-query";

function useGetAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async (): Promise<TAnalytics> => {
      return axiosPrivateRoute.get("/api/admin/analytics");
    },
  });
}

export default useGetAnalytics;

type TAnalytics = {
  data: {
    bookingRequestsByServiceType: {
      count: number;
      name: string;
    };
    bookingRequestsPerDay: [count: number, _id: string];
    bookingRequestsPercentageStatus: [
      {
        count: number;
        percentage: number;
        status: string;
      }
    ];
    percentageOfVerifiedEmailsIdentityMobile: [
      {
        totalUsers: number;
        verifiedEmailPercentage: number;
        verifiedIdentityPercentage: number;
        verifiedMobilePercentage: number;
        disabledUsers: number;
      }
    ];
    userAddress: [
      {
        count: number;
        _id: {
          address: string;
        };
      }
    ];
    userEducationalAttainment: [
      {
        count: number;
        _id: {
          educationalAttainment: string;
        };
      }
    ];
    userWork: [
      {
        count: number;
        _id: {
          work: string;
        };
      }
    ];
    userRegistrationStats: [
      {
        count: number;
        _id: string;
      }
    ];
  };
};
