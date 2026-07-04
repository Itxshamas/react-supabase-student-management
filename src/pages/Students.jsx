import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import StudentTable from "../components/StudentTable";
import { deleteStudent, getStudents } from "../services/studentService";

function Students() {
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    location.state?.successMessage || "",
  );
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadStudents() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getStudents();

        if (isMounted) {
          setStudents(data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Unable to load students right now.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadStudents();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setSuccessMessage(location.state?.successMessage || "");
  }, [location.state]);

  async function handleDelete(student) {
    setDeleteTarget(student);
  }

  async function confirmDelete() {
    if (!deleteTarget) {
      return;
    }

    try {
      setIsDeleting(true);
      setError("");
      await deleteStudent(deleteTarget.id);
      setStudents((currentStudents) =>
        currentStudents.filter((student) => student.id !== deleteTarget.id),
      );
      setSuccessMessage(`Deleted ${deleteTarget.name}.`);
    } catch (err) {
      setError(err?.message || "Unable to delete student.");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  }

  function cancelDelete() {
    setDeleteTarget(null);
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Student Management
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Students
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              View the students currently stored in Supabase.
            </p>
          </div>

          <Link
            to="/students/add"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Add Student
          </Link>
        </div>

        {successMessage ? (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </div>
        ) : null}

        {deleteTarget ? (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Delete student?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to delete this student?
            </p>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={cancelDelete}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <StudentTable
          students={students}
          isLoading={isLoading}
          onDelete={handleDelete}
          deleteLoadingId={isDeleting ? deleteTarget?.id : null}
        />
      </div>
    </div>
  );
}

export default Students;
