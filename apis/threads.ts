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
  pageNumber = 1,
  pageSize = 20,
}: {
  id: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<ThreadsListResponse> => {
  if (!id) throw new Error("Thread ID is required");
  const response = await axiosClient.get(`/threads/${id}/byUser`, {
    params: { pageNumber, pageSize },
  });
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data as ThreadsListResponse;
};
export const createThread = async ({
  text,
  imgs,
}: {
  text: string;
  imgs?: File;
}): Promise<{ user: Thread }> => {
  const formData = new FormData();
  formData.append("text", text);
  if (imgs) formData.append("imgs", imgs);

  const response = await axiosClient.post(`/threads`, formData);
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data as { user: Thread };
};




export const likeOrUnlikeThread = async ({
  id,
}: { id: string }): Promise<{ message: string }> => {
  try {
    // Gửi yêu cầu API follow/unfollow thread
    const response = await axiosClient.post(`/threads/${id}/like`);

    // Kiểm tra xem API có trả lỗi hay không
    if (response.data.error) {
      throw new Error(response.data.error);
    }

    // Trả về dữ liệu thread
    return response.data as { message: string };
  } catch (error) {
    console.error("Error in followOrUnfollowThread:", error);
    throw error;
  }
};