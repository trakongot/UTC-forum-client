"use client";

import { useEffect, useState } from "react";
import { getAllReports } from "@/apis/admin"; // API lấy danh sách báo cáo
import { Report } from "@/types/reportType"; // Import kiểu dữ liệu Report
import { useRouter } from "next/navigation"; // Dùng để điều hướng nếu cần
import Link from "next/link";

export default function ReportPage() {
  const [reports, setReports] = useState<Report[]>([]); // State lưu trữ danh sách báo cáo
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi
  const router = useRouter();

  const fetchReports = async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllReports({ page }); // Gửi page làm tham số
      setReports(response.reports);
      setTotalPages(response.pagination.totalPages);
    } catch (err) {
      setError("Error fetching reports");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(currentPage); // Lấy dữ liệu báo cáo khi trang thay đổi
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const truncateText = (text: string, maxLength: number = 30) => {
    return text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  if (isLoading) return <p>Loading reports...</p>;
  if (error) return <p>{error}</p>;

  // Tạo danh sách các trang để hiển thị
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="container text-center p-10">
      <h1 className="text-xl font-bold">Reports List</h1>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2">Report ID</th>
              <th className="px-4 py-2">Reported By</th>
              <th className="px-4 py-2">Content</th>
              <th className="px-4 py-2">Content Type</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No reports found
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                  <tr  key={report._id} className="border-b">
                    <td className="px-4 py-2">{report._id}</td>
                    <td className="px-4 py-2">{report.reportedBy?.username}</td>
                    <td className="px-4 py-2">
                      {truncateText(
                        report.contentType === "Thread"
                          ? report.content?.text
                          : report.content?.username
                      )}
                    </td>
                    <td className="px-4 py-2">{report.contentType}</td>
                    <td className="px-4 py-2">{report.reason}</td>
                    <td className="px-4 py-2">{report.status}</td>
                    <td className="px-4 py-2">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                <Link className="border-b" href={`/admin/report/${report._id}`}>
                <button  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded mr-2"> View </button>
                </Link>
                    </td>
                  </tr>
                
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="mt-4 flex justify-center items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded mr-2"
        >
          Previous
        </button>

        {/* Hiển thị danh sách các trang */}
        <div className="flex space-x-2">
          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`  px-3 py-1 border rounded ${pageNum === currentPage ? 'bg-blue-500 text-blue' : 'bg-white'}`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded ml-2"
        >
          Next
        </button>
      </div>
    </section>
  );
}
