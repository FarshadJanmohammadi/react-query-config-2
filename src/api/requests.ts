import { api } from "./axios";

export const getPosts = async (): Promise<IPost[]> => {
  const response = await api("/posts");
  console.log(response, "response");
  return response.data;
};

export const getTodos = async (): Promise<ITodo[]> => {
  const response = await api.get("/todos");
  return response.data;
};

export const createPost = async (
  newPost: Omit<IPost, "id">,
): Promise<IPost> => {
  const response = await api.post("/posts", {
    ...newPost,
  });

  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await api.delete(`/postsdfd/${id}`);

  return response.data;
};
