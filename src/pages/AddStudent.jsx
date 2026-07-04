import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { addStudent } from "../services/studentService";

function AddStudent() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  async function handleAddStudent(studentData) {
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      await addStudent(studentData);
      setSubmitSuccess("Student added successfully.");
      navigate("/students", {
        state: { successMessage: "Student added successfully." },
      });
    } catch (error) {
      setSubmitError(
        error?.message || "Unable to add student. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Student Management
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Add Student
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Fill in the student details below to save a new record to Supabase.
          </p>
        </div>

        <StudentForm
          onSubmit={handleAddStudent}
          isSubmitting={isSubmitting}
          submitError={submitError}
          submitSuccess={submitSuccess}
          onCancel={() => navigate("/students")}
        />
      </div>
    </div>
  );
}

export default AddStudent;
