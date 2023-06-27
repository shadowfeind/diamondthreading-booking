import { useQuery } from "@tanstack/react-query";
import MainContainer from "../components/MainContainer";
import QueList from "../components/QueList";
import { getAllBooking } from "../api/bookingApi";
import ErrorComponent from "../components/ErrorComponent";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

type QueCustomer = {
  customerId: string;
  fullName: string;
};

export default function QueuePage() {
  const { authData }: any = useContext(AuthContext);

  const { error, isError, data }: any = useQuery({
    queryKey: ["booking"],
    queryFn: async () => getAllBooking(),
    // refetchInterval: 10000,
  });
  return (
    <MainContainer>
      <div className="text-center md:w-1/2 mx-auto">
        {isError && (
          <ErrorComponent errorMsg={error?.response?.data?.message} />
        )}
        {data?.map((customer: QueCustomer) => (
          <QueList
            customerName={customer.fullName}
            customerId={customer.customerId}
            key={customer.customerId}
            authData={authData}
          />
        ))}
      </div>
    </MainContainer>
  );
}
