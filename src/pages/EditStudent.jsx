import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { getStudentById, updateStudent } from "../services/studentService";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadStudent() {
      try {
        setIsLoading(true);
        setSubmitError("");
        const data = await getStudentById(id);

        if (isMounted) {
          setStudent(data);
        }
      } catch (error) {
        if (isMounted) {
          setSubmitError(error?.message || "Unable to load student details.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadStudent();

    return () => {
      isMounted = false;
    };
  }, [id]);

  async function handleUpdateStudent(studentData) {
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      await updateStudent(id, studentData);
      setSubmitSuccess("Student updated successfully.");
      navigate("/students", {
        state: { successMessage: "Student updated successfully." },
      });
    } catch (error) {
      setSubmitError(error?.message || "Unable to update student.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Student Management
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            Loading student...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Student Management
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Edit Student
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Update the selected student details below.
          </p>
        </div>

        {submitError ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </div>
        ) : null}

        {student ? (
          <StudentForm
            initialValues={student}
            onSubmit={handleUpdateStudent}
            isSubmitting={isSubmitting}
            submitError={submitError}
            submitSuccess={submitSuccess}
            onCancel={() => navigate("/students")}
            submitLabel="Update Student"
          />
        ) : null}
      </div>
    </div>
  );
}

export default EditStudent;
