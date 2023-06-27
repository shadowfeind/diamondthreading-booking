import api from "../axios/api";
import { CustomerType } from "../pages/RegisterPage";

export const getAllCustomers = async () => {
  const { data } = await api.get("customers");
  return data;
};

export const createCustomer = async (customer: CustomerType) => {
  const { data } = await api.post("customers", customer);
  return data;
};

export const getSingleCustomer = async ({ queryKey }: any) => {
  const [_key, { id }] = queryKey;
  const { data } = await api.get(`customers/${id}`);
  return data;
};
