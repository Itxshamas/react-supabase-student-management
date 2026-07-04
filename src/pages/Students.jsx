import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import StudentTable from "../components/StudentTable";
import {
  deleteStudent,
  filterStudents,
  getStudents,
} from "../services/studentService";

function Students() {
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
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
          setFilteredStudents(data);
        }
      } catch (err) {
        if (isMounted) {
          setStudents([]);
          setFilteredStudents([]);
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
    if (isLoading) {
      return;
    }

    setIsSearching(true);

    const timeoutId = window.setTimeout(() => {
      setFilteredStudents(filterStudents(students, searchTerm));
      setIsSearching(false);
    }, 180);

    return () => window.clearTimeout(timeoutId);
  }, [isLoading, searchTerm, students]);

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

      const updatedStudents = students.filter(
        (student) => student.id !== deleteTarget.id,
      );

      setStudents(updatedStudents);
      setFilteredStudents(filterStudents(updatedStudents, searchTerm));
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
              Search, review, and manage students from a polished list view.
            </p>
          </div>

          <Link
            to="/students/add"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Add Student
          </Link>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Student directory
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Filter the list by student name or email in real time.
              </p>
            </div>

            <SearchBar
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name or email"
            />
          </div>
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
              This action removes the student record from Supabase.
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
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <StudentTable
          students={filteredStudents}
          isLoading={isLoading || isSearching}
          onDelete={handleDelete}
          deleteLoadingId={isDeleting ? deleteTarget?.id : null}
          emptyTitle={
            searchTerm ? "No matching students found." : "No students found."
          }
          emptyDescription={
            searchTerm
              ? "Try a different name or email search term."
              : "Add your first student to start building the list."
          }
        />
      </div>
    </div>
  );
}

export default Students;
