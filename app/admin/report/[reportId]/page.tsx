"use client";
import { getUserById } from "@/apis/user";
import { useQuery } from "react-query";

export default function ReportDetailsPage({ params }: Readonly<{params:  string }>) {
  const reportId = params.reportId; 

  const { data: report } = useQuery({
    queryKey: ["report", reportId],
    queryFn: () => getReportById({ id: reportId }),
    onError: (error) => {
      console.error("Error fetching  data:", error);
    },
    enabled: !!reportId,
  });

  const { data: postedByUser, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["user", report?.content?.postedBy], // Sử dụng ID người dùng từ report.content.postedBy
    queryFn: () => getUserById({id:report?.content?.postedBy}),
    enabled: !!report?.content?.postedBy, // Gọi API người dùng khi có thông tin postedBy
  });
  

  console.log(report, "hehe");
  console.log(postedByUser, "----------");


  if (!report) return <p>Loading report details...</p>;

  return (
    <section className="p-10">
      <h1 className="mb-4 text-xl font-bold">Report Details</h1>

      {/* Report general information */}
      <div className="mb-6">
        <p><strong>Report ID:</strong> {report?._id}</p>
        <p><strong>Reported By:</strong> {report.reportedBy?.username}</p>
        <p><strong>Reason:</strong> {report.reason}</p>
        <p><strong>Status:</strong> {report.status}</p>
        <p><strong>Created At:</strong> {new Date(report.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Content information */}
      <div className="border-t mt-4 pt-4">
        <h2 className="text-lg font-semibold">Content Details</h2>
        {report.contentType === "Thread" && report.content && (
          <div className="mt-4">
            <p><strong>Thread ID:</strong> {report.content._id}</p>
            
            {/* Displaying user information for the post */}
            {postedByUser ? (
              <div>
                <p><strong>Posted By:</strong> {postedByUser.username}</p>
                <img src={postedByUser.profilePic} alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
            ) : (
              <p>Loading user info...</p>
            )}
            
            <p><strong>Content:</strong> {report.content.text}</p>
            
            {/* Displaying images if available */}
            {report.content.imgs && report.content.imgs.length > 0 && (
              <div className="mt-2">
                <strong>Images:</strong>
                <div className="flex space-x-2 mt-2">
                  {report.content.imgs.map((imgUrl, index) => (
                    <img key={index} src={imgUrl} alt={`Image ${index}`} className="w-24 h-24 object-cover rounded" />
                  ))}
                </div>
              </div>
            )}

            {/* Displaying likes if available */}
            {report.content.likes && report.content.likes.length > 0 && (
              <div className="mt-2">
                <strong>Likes:</strong> {report.content.likes.length}
              </div>
            )}
          </div>
        )}

      {report.contentType === "User"  && (
                <div className="mt-4">
                  <p><strong>User ID:</strong> {report.content._id}</p>
                  <p><strong>Username:</strong> {report.content.username}</p>
                  <p><strong>Email:</strong> {report.content.email}</p>
                  {/* Hiển thị thêm thông tin người dùng nếu có */}
                </div>
              )}
              
            </div>
          </section>
        );
}
