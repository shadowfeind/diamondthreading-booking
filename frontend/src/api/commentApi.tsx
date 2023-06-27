import api from "../axios/api";

type CommentType = {
  comment: string;
  customerId: string;
};

export const getAllComment = async () => {
  const { data } = await api.get("comment");
  return data;
};

export const getCommentByCustomer = async ({ queryKey }: any) => {
  const [_key, { id }] = queryKey;
  const { data } = await api.get(`comment/${id}`);
  return data;
};

export const createComment = async (comment: CommentType) => {
  const { data } = await api.post("comment", comment);
  return data;
};
