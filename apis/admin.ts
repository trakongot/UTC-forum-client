import axiosClient from "@/lib/userApi";
import { Report } from '@/types/reportType';
import { User } from "@/types/userType";

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const response = await axiosClient.get(`/admins/users`);
        
        // Check for any error in the response
        if (response.data.error) {
            throw new Error(response.data.error);
        }
        // Return the list of users
        return response.data.users as User[];
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};


export const getAllReports = async ({query} : { query: string}): Promise<Report[]> => {
    try {
        const response = await axiosClient.get(`/report/reports/`, {
            params: { query },
            });
            
        // Check for any error in the response
        if (response.data.error) {
            throw new Error(response.data.error);
        }
        // Return the list of users
        console.log(response.data.reports , "test")
        return response.data as Report[];
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};


export const getReportById = async ({id} :{id:string}): Promise<Report> => {
    try {
        const response = await axiosClient.get(`/report/reports/${id}`);
        // Chú ý không được dùng như này   bởi vì sẽ nhầm lẫn sang cái api trên và nó trả về all report
        // const response = await axiosClient.get(`/report/reports`, {
        //     params: { id },
        //     });
            
        // Check for any error in the response
        if (response.data.error) {
            throw new Error(response.data.error);
        }
        // Return the list of users
        return response.data.report     as Report;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};



export const updateReportStatus = async ({
    id,
  }: { id: string }): Promise<{ messesage: string }> => {
    try {
      const response = await axiosClient.post(`/report/status/${id}`);
  
      // Kiểm tra xem API có trả lỗi hay không
      if (response.data.error) {
        throw new Error(response.data.error);
      }
    
      // Trả về dữ liệu thread
      return response.data as { messesage: string };
    } catch (error) {
      console.error("Error in followOrUnfollowThread:", error);
      throw error;
    }
  };


