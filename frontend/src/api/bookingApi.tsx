import api from "../axios/api";
import { BookingType } from "../pages/BookingPage";

export const getAllBooking = async () => {
  const { data } = await api.get("queue");
  return data;
};

export const createBookingWithNumber = async (queue: BookingType) => {
  const { data } = await api.post("queue", queue);
  return data;
};

export const getSingleBooking = async ({ queryKey }: any) => {
  const [_key, { id }] = queryKey;
  const { data } = await api.get(`queue/${id}`);
  return data;
};

export const deleteBooking = async (id: string) => {
  const { data } = await api.delete(`queue/${id}`);
  return data;
};
