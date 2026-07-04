import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function StudentTable({
  students = [],
  isLoading = false,
  onDelete,
  deleteLoadingId = null,
}) {
  const navigate = useNavigate();
  const headers = ["Name", "Email", "Age", "Course", "Actions"];

  if (isLoading) {
    return <Loader />;
  }

  if (!students.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          No students found
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          There are currently no students to display in this list.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {students.map((student) => (
              <tr key={student.id} className="transition hover:bg-slate-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                  {student.name || "N/A"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                  {student.email || "N/A"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                  {student.age ?? "N/A"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                  {student.course || "N/A"}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/students/edit/${student.id}`)}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-indigo-500 hover:text-indigo-600"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={deleteLoadingId === student.id}
                      onClick={() => onDelete(student)}
                      className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:border-red-400 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deleteLoadingId === student.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;
