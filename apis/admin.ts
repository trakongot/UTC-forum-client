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
        return response.data.users as User[];
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};


export const getAllReports = async (): Promise<Report[]> => {
    try {
        const response = await axiosClient.get(`/report/reports`);
        
        // Check for any error in the response
        if (response.data.error) {
            throw new Error(response.data.error);
        }
        // Return the list of users
        return response.data.reports as Report[];
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};
