// contexts/FollowContext.tsx
import React, { createContext, useContext, useState } from "react";
import { useMutation } from "react-query";
import { followOrUnfollowUser } from "@/apis/user";
import { User } from "@/types/userType";

// Định nghĩa kiểu của context
interface FollowContextProps {
  handleFollow: (id: string,isFollowed : boolean) => void; 
  followStatus : any;
  
}



// Tạo context
export const FollowContext = createContext<FollowContextProps | null>(null);

// Custom hook để sử dụng context,Đoạn này có thể không dùng , nó sẽ báo lỗi nếu như FollowProvider không bọc component
// Sẽ báo lỗi nếu dùng với lớp cháu ( gián tiếp)
export const useFollow = () => {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error("useFollow must be used within a FollowProvider");
  }
  return context;
};

// Tạo Provider
export const FollowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {


  const [followStatus, setFollowStatus] = useState( {}); // Lưu trạng thái của từng người đăng bài
 
  const { mutate: followingOrUnfollowingThread } = useMutation({
    mutationFn: followOrUnfollowUser,
    onSuccess: (data: { user: User }) => {
      console.log("Follow/Unfollow success:", data);
    },
    onError: (error: any) => {
      console.error("Error updating user:", error);
    },
  });
  

  // Hàm để follow hoặc unfollow
  const handleFollow = (id: string ,isFollowed:boolean) => {
    setFollowStatus((prev) => ({
      ...prev,
      [id]: isFollowed ? false : true,// Toggle trạng thái follow
    }));
    console.log(followStatus,"status");
    followingOrUnfollowingThread({ id });
  };
  return (
    <FollowContext.Provider value={{ handleFollow , followStatus  }}>
      {children}
    </FollowContext.Provider>
  );
};
