import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label, TextInput } from "flowbite-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookingWithNumber } from "../api/bookingApi";
import ErrorComponent from "../components/ErrorComponent";
import { useEffect } from "react";

export type BookingType = {
  phone: string;
};

export default function BookingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingType>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync, error, isError, isLoading }: any = useMutation(
    createBookingWithNumber,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["booking"], { exact: true });
        navigate("/");
      },
    }
  );

  const onSubmit: SubmitHandler<BookingType> = async (data) => {
    await mutateAsync(data);
  };

  useEffect(() => {
    if (isError && error?.response?.data?.message === "Please Register First") {
      navigate("/register");
    }
  }, [error]);
  return (
    <FormContainer>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 max-w-md">
          {isError && (
            <ErrorComponent errorMsg={error?.response?.data?.message} />
          )}
          <div className="mb-2 block">
            <Label
              color={errors.phone ? "failure" : "gray"}
              htmlFor="Your Phone Number"
              value="Your Phone Number"
            />
          </div>
          <TextInput
            color={errors.phone ? "failure" : "gray"}
            id="Your Phone Number"
            placeholder="5551212"
            {...register("phone", {
              required: "Please enter your phone number.",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter a number",
              },
              maxLength: {
                value: 10,
                message: "Cannot be more than 10 characters",
              },
            })}
            helperText={errors?.phone?.message}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-diamond-purple hover:bg-diamond-gold focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-1"
          disabled={isLoading}
        >
          {isLoading ? "Booking..." : "Book Now"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="text-white bg-diamond-gold hover:bg-diamond-purple focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-1"
          disabled={isLoading}
        >
          Register Now
        </button>
      </form>
    </FormContainer>
  );
}
