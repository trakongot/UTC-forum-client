import { Thread } from './../types/threadType';
import axiosClient from "@/lib/userApi";
import { User } from "@/types/userType";
import { Report } from "@/types/reportType";

// Assuming 'User' is an interface or type that represents a single user
export const getAllUsers = async (): Promise<User[]> => {
    try {
        const response = await axiosClient.get(`/admins/users`);
        
        // Check for any error in the response
        if (response.data.error) {
            throw new Error(response.data.error);
        }
        // Return the list of users
        console.log(response,"===hahahaa");
        return response.data.users as User[];
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};


export const getAllReports = async ({page}): Promise<Report[]> => {
    try {
        const response = await axiosClient.get(`/report/reports/`, {
            params: { page },
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
    currentStatus ,  newStatus, reportId , data
  }: { currentStatus:string ,newStatus: string , reportId:string ,data:object }): Promise<{ messesage: string }> => {
    try {
        
      const response = await axiosClient.put(`/report/report/status/`, {currentStatus,  newStatus ,reportId ,data } );
  
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




  export const getReportsBySearch = async ({page,searchText}): Promise<Report[]> => {
    try {
        const response = await axiosClient.get(`/report/search/`, {
            params: { page ,searchText },
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