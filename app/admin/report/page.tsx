"use client";

import { useEffect, useState } from "react";
import { getAllReports } from "@/apis/admin";  // API lấy danh sách báo cáo
import { Report } from "@/types/reportType";  // Import kiểu dữ liệu Report
import { useQuery } from "react-query";  // React Query hook
import { useRouter } from "next/navigation";  // Dùng để điều hướng nếu cần

export default function ReportPage() {
  const [reports, setReports] = useState<Report[]>([]);  // State lưu trữ danh sách báo cáo
  const { data, error, isLoading } = useQuery("reports", getAllReports, {  // Sử dụng useQuery để gọi API
    onSuccess: (data) => {
      setReports(data);  // Lưu dữ liệu vào state
    },
    onError: (error) => {
      console.error("Error fetching reports:", error);
    },
  });
  console.log(data, "==========");  // Xem dữ liệu nhận được

  const router = useRouter();

  // Redirect hoặc xử lý logic khác nếu cần           
  useEffect(() => {
    if (!data?.length) {
      // Nếu không có báo cáo nào, có thể điều hướng hoặc thông báo gì đó
      // router.push("/no-reports");
    }
  }, [data, router]);

  // Trạng thái loading hoặc lỗi
  if (isLoading) return <p>Loading reports...</p>;
  if (error) return <p>Error fetching reports</p>;

  return (
    <section>
      <h1 className="text-xl font-bold">Reports List</h1>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2">Report ID</th>
              <th className="px-4 py-2">Reported By</th>
              <th className="px-4 py-2">Content ID</th>
              <th className="px-4 py-2">Content Type</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {reports?.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">No reports found</td>
              </tr>
            ) : (
              reports?.map((report) => (
                <tr key={report._id} className="border-b">
                  <td className="px-4 py-2">{report._id}</td>
                  <td className="px-4 py-2">{report.reportedBy}</td>
                  <td className="px-4 py-2">{report.content}</td>
                  <td className="px-4 py-2">{report.contentType}</td>
                  <td className="px-4 py-2">{report.reason}</td>
                  <td className="px-4 py-2">{report.status}</td>
                  <td className="px-4 py-2">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
