import { Button } from "@/components";
import { FC, useReducer, useState } from "react";

interface Report {
  id: number;
  title?: string;
  reason: string;
  description: string;
  policy: string;
  type: "post" | "user";
}

const dummyReports: Report[] = [
  {
    id: 1,
    title: "Offensive Content",
    reason: "Violates content policies",
    description: "This post contains inappropriate language.",
    policy: "Posts must adhere to community standards.",
    type: "post",
  },
  {
    id: 2,
    title: "Spam Post",
    reason: "Spam",
    description: "This post is irrelevant and spammy.",
    policy: "Avoid posting spam content.",
    type: "post",
  },
  {
    id: 3,
    reason: "Harassment",
    description: "This user has been sending inappropriate messages.",
    policy: "Users must maintain respectful communication.",
    type: "user",
  },
  {
    id: 4,
    reason: "Inappropriate Behavior",
    description: "This user has been violating community guidelines.",
    policy: "Users must follow community rules.",
    type: "user",
  },
];

type Action = { type: "REMOVE_REPORT"; id: number };

const reportsReducer = (state: Report[], action: Action): Report[] => {
  switch (action.type) {
    case "REMOVE_REPORT":
      return state.filter((report) => report.id !== action.id);
    default:
      return state;
  }
};

const AdminReports: FC = () => {
  const [reports, dispatch] = useReducer(reportsReducer, dummyReports);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 2;

  const handleRemove = (id: number) => {
    dispatch({ type: "REMOVE_REPORT", id });
  };

  const paginatedReports = reports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  const totalPages = Math.ceil(reports.length / reportsPerPage);

  return (
    <div className="p-5  max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold text-center">Reports</h1>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedReports.map((report) => (
          <div key={report.id} className="shadow bg-card rounded-lg p-6 border">
            <h2 className="text-xl font-semibold mb-4">
              {report.type === "post" ? "Reported Post" : "Reported User"}
            </h2>
            <div className="space-y-2">
              {report.title && (
                <div className="flex space-x-2">
                  <span className="font-medium">Post Title:</span>
                  <p className="text-muted">{report.title}</p>
                </div>
              )}
              <p>
                <span className="font-medium">Reason:</span> {report.reason}
              </p>
              <p>
                <span className="font-medium">Description:</span>{" "}
                {report.description}
              </p>
              <p>
                <span className="font-medium">Policy:</span> {report.policy}
              </p>
            </div>
            <div className="mt-6 flex justify-between">
              <Button
                onClick={() => handleRemove(report.id)}
                className="bg-destructive"
              >
                {report.type === "post" ? "Remove Post" : "Ban User"}
              </Button>
              <Button className="bg-secondary">Ignore Report</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center space-x-2">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-400 transition disabled:opacity-50"
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-400 transition disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AdminReports;
