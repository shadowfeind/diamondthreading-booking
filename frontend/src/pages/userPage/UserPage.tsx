import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "../../components/ErrorComponent";
import { UserType, getAllUsers } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const { data, error, isError }: any = useQuery({
    queryKey: ["user"],
    queryFn: getAllUsers,
  });

  const navigate = useNavigate();

  return (
    <div className="md:w-1/2 mx-auto">
      <button
        type="button"
        className="text-white bg-diamond-purple  focus:ring-4 focus:ring-diamond-gold font-medium rounded-lg text-sm px-5 py-2.5 mr-2 my-6 dark:bg-blue-600  focus:outline-none dark:focus:ring-blue-800"
        onClick={() => navigate("/addUser")}
      >
        Add User
      </button>

      {isError && <ErrorComponent errorMsg={error?.response?.data?.message} />}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-diamond-purple dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Fullname
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((customer: UserType) => (
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {customer.name}
                </th>
                <td className="px-6 py-4">{customer.userName}</td>
                <td className="px-6 py-4">{customer.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
