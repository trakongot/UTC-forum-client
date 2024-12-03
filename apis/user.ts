import axiosClient from "@/lib/userApi";
import { User } from "@/types/userType";

export const updateUser = async (
  userId: string,
  name: string,
  username: string,
  bio: string,
  profilePic: string | null,
  imgs: File[] | null
): Promise<User> => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("username", username);
  formData.append("bio", bio);
  if (profilePic) formData.append("profilePic", profilePic);
  if (imgs) {
    imgs.forEach((img) => {
      formData.append("imgs", img);
    });
  }
  const response = await axiosClient.put(`/users/${userId}`, formData);

  if (response.data.error) {
    throw new Error(response.data.error);
  }

  return response.data as User;
};

export const updateUserOnboarded = async ({
  name,
  username,
  bio,
  img,
}): Promise<{ user: User }> => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("username", username);
  formData.append("bio", bio);
  formData.append("img", img);

  const response = await axiosClient.post(`/users/onboarded`, formData);
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data as { user: User };
};



export const followOrUnfollowUser = async ({
  id,
}: { id: string }): Promise<{ messesage: string }> => {
  try {
    // Gửi yêu cầu API follow/unfollow thread
    const response = await axiosClient.post(`/users/${id}/follow`);

    // Kiểm tra xem API có trả lỗi hay không
    if (response.data.error) {
      throw new Error(response.data.error);
    }

    console.log(response.data,"hahahahadata");

    // Trả về dữ liệu thread
    return response.data as { messesage: string };
  } catch (error) {
    console.error("Error in followOrUnfollowThread:", error);
    throw error;
  }
};

export const getUserById = async ({ id }: { id: string }): Promise<User> => {
  const response = await axiosClient.get(`/users/${id}`);
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data as User;
};
export const getUserByCookies = async (): Promise<User> => {
  const response = await axiosClient.get(`/users`);
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data as User;
};


export const top10FollowersUser = async (): Promise<User[]> => {
  const response = await axiosClient.get(`/users/suggested/top4FollowersUser`);
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data.users as User[];
};

export const usersIamFollowing = async (): Promise<User[]> => {
  const response = await axiosClient.get(`/users/suggested/usersIamFollow`);
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data.following as User[];
};
