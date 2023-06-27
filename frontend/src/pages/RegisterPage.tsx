import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormContainer from "../components/FormContainer";
import { Label, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../api/customerApi";
import ErrorComponent from "../components/ErrorComponent";

export type CustomerType = {
  phone: string;
  fullName: string;
  email: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerType>();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutateAsync, error, isError, isLoading }: any = useMutation(
    createCustomer,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["booking"], { exact: true });
        await queryClient.invalidateQueries(["customer"], { exact: true });
        navigate("/");
      },
    }
  );

  const onSubmit: SubmitHandler<CustomerType> = async (data) => {
    await mutateAsync(data);
  };
  return (
    <FormContainer>
      {isError && <ErrorComponent errorMsg={error?.response?.data?.message} />}
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <div className=" block">
            <Label
              color={errors.fullName ? "failure" : "gray"}
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              value="Your Fullname"
            />
          </div>
          <TextInput
            color={errors.fullName ? "failure" : "gray"}
            type="text"
            id="fullName"
            placeholder="Jane Doe"
            {...register("fullName", {
              required: "Please enter your FullName.",
            })}
            helperText={errors?.fullName?.message}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
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
          <div className="relative z-0 w-full mb-6 group">
            <div className="mb-2 block">
              <Label
                color={errors.email ? "failure" : "gray"}
                htmlFor="yourEmail"
                value="Your Email"
              />
            </div>
            <TextInput
              color={errors.email ? "failure" : "gray"}
              id="yourEmail"
              placeholder="janedoe@gmail.com"
              type="email"
              {...register("email", { required: "Please enter your email." })}
              helperText={errors?.email?.message}
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-diamond-purple hover:bg-diamond-gold focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={isLoading}
        >
          {isLoading ? "Booking..." : "Book Now"}
        </button>
      </form>
    </FormContainer>
  );
}
