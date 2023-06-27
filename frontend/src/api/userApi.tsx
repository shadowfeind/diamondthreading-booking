import api from "../axios/api";

export type UserType = {
  name: string;
  userName: string;
  password?: string;
  role: string;
  _id?: string;
};

export const getAllUsers = async () => {
  const { data } = await api.get("users");
  return data;
};

export const createUser = async (user: UserType) => {
  const { data } = await api.post("users", user);
  return data;
};

export const updateUser = async (user: UserType) => {
  const { data } = await api.put(`users/${user._id}`, user);
  return data;
};
