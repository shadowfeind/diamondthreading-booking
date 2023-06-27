import { SubmitHandler, useForm } from "react-hook-form";
import { UserType, createUser } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormContainer from "../../components/FormContainer";
import ErrorComponent from "../../components/ErrorComponent";
import { Label, Select, TextInput } from "flowbite-react";

export default function AddUserPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({
    defaultValues: {
      role: "user",
    },
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutateAsync, error, isError, isLoading }: any = useMutation(
    createUser,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["user"], { exact: true });

        navigate("/users");
      },
    }
  );

  const onSubmit: SubmitHandler<UserType> = async (data) => {
    await mutateAsync(data);
    // console.log(data);
  };

  const roles = [{ value: "user" }, { value: "admin" }];

  return (
    <FormContainer>
      {isError && <ErrorComponent errorMsg={error?.response?.data?.message} />}
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <div className=" block">
            <Label
              color={errors.name ? "failure" : "gray"}
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              value="Fullname"
            />
          </div>
          <TextInput
            color={errors.name ? "failure" : "gray"}
            type="text"
            id="name"
            placeholder="Jane Doe"
            {...register("name", {
              required: "Please enter your name.",
            })}
            helperText={errors?.name?.message}
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label
              color={errors.userName ? "failure" : "gray"}
              htmlFor="username"
              value="username"
            />
          </div>
          <TextInput
            color={errors.userName ? "failure" : "gray"}
            id="username"
            placeholder="username"
            {...register("userName", {
              required: "Please enter your userName.",
            })}
            helperText={errors?.userName?.message}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <div className="mb-2 block">
              <Label
                color={errors.password ? "failure" : "gray"}
                htmlFor="password"
                value="password"
              />
            </div>
            <TextInput
              type="password"
              color={errors.password ? "failure" : "gray"}
              id="password"
              placeholder="password"
              {...register("password", {
                required: "Please enter your password.",
              })}
              helperText={errors?.password?.message}
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <div className="mb-2 block">
              <Label htmlFor="role" value="Select your role" />
            </div>
            <Select id="role" {...register("role")}>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.value}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-diamond-purple hover:bg-diamond-gold focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={isLoading}
        >
          {isLoading ? "Creating User..." : "Create User"}
        </button>
      </form>
    </FormContainer>
  );
}
