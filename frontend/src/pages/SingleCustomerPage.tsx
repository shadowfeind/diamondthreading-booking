import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ListGroup } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleCustomer } from "../api/customerApi";
import ErrorComponent from "../components/ErrorComponent";
import DefaultModal from "../components/Modal";
import { useState } from "react";
import { getCommentByCustomer } from "../api/commentApi";
import CommentComponent from "../components/CommentComponent";
import { deleteBooking } from "../api/bookingApi";

export default function SingleCustomerPage() {
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isError }: any = useQuery({
    queryKey: ["customer", { id }],
    queryFn: getSingleCustomer,
  });

  const { data: commentList }: any = useQuery({
    queryKey: ["comment", { id }],
    queryFn: getCommentByCustomer,
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading }: any = useMutation(deleteBooking, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["booking"], {
        exact: true,
      });
      navigate("/");
    },
  });

  type CommentType = {
    _id: string;
    comment: string;
    customerId: string;
  };

  const handleFinish = async () => {
    await mutateAsync(id);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 ">
      {isError && <ErrorComponent errorMsg={error?.response?.data?.message} />}
      <h2 className="mb-4">Customer Details</h2>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="mb-6">
          <ListGroup>
            <ListGroup.Item>FullName: {data?.fullName}</ListGroup.Item>
            <ListGroup.Item>Phone Number: {data?.phone}</ListGroup.Item>
            <ListGroup.Item>Email: {data?.email}</ListGroup.Item>
          </ListGroup>
        </div>
        <div className="mb-6">
          <button
            onClick={() => setOpenModal(!openModal)}
            type="button"
            className="text-white bg-diamond-purple  focus:ring-4 focus:ring-diamond-gold font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600  focus:outline-none dark:focus:ring-blue-800"
          >
            Add a comment
          </button>
          <button
            onClick={handleFinish}
            type="button"
            className="text-white bg-diamond-gold  focus:ring-4 focus:ring-diamond-purple font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600  focus:outline-none dark:focus:ring-blue-800"
          >
            {isLoading ? "Finishing..." : "Finish"}
          </button>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="mb-4">Comments</h3>
        {commentList &&
          commentList?.map((c: CommentType) => (
            <CommentComponent key={c._id} comment={c.comment} />
          ))}
      </div>
      <DefaultModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        id={id || ""}
      />
    </div>
  );
}
