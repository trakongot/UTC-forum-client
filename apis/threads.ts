import axiosClient from "@/lib/userApi";
import { Thread } from "@/types/threadType";
type ThreadsListResponse = {
  success: boolean;
  threads: Thread[];
  isNext: boolean;
};
export const getThreads = async ({
  pageNumber = 1,
  pageSize = 20,
}): Promise<ThreadsListResponse> => {
  const response = await axiosClient.get("/threads/", {
    params: { pageNumber, pageSize },
  });
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data as ThreadsListResponse;
};
export const getRepliesThread = async ({
  id,
  pageNumber = 1,
  pageSize = 20,
}: {
  id: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<ThreadsListResponse> => {
  if (!id) throw new Error("Thread ID is required");
  const response = await axiosClient.get(`/threads/${id}/replies`, {
    params: { pageNumber, pageSize },
  });
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data as ThreadsListResponse;
};
export const getThreadById = async ({
  id,
}: {
  id: string;
}): Promise<Thread> => {
  if (!id) throw new Error("Thread ID is required");
  const response = await axiosClient.get(`/threads/${id}`);
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data as Thread;
};
export const getThreadsByUser = async ({
  id,
}: {
  id: string;
}): Promise<ThreadsListResponse> => {
  if (!id) throw new Error("Thread ID is required");
  const response = await axiosClient.get(`/threads/${id}`);
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data as ThreadsListResponse;
};