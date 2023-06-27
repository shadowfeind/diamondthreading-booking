import { Button } from "flowbite-react";
import { AuthData } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type QueListProps = {
  customerName: string;
  customerId: string;
  authData: AuthData | null;
};

export default function QueList({
  customerName,
  customerId,
  authData,
}: QueListProps) {
  const navigate = useNavigate();
  return (
    <>
      <div className="px-6 flex justify-center  text-white py-4 text-xl bg-diamond-purple my-6 border-diamond-gold border-4 rounded-xl">
        <span className="mt-2">{customerName}</span>
        {authData && (
          <Button
            onClick={() => navigate(`/view/${customerId}/customers`)}
            color="purple"
            className="ml-4"
          >
            Start Process
          </Button>
        )}
      </div>
    </>
  );
}
