import { useEffect, useState } from "react";

const initialValues = {
  name: "",
  email: "",
  age: "",
  course: "",
};

function StudentForm({
  initialValues: initialFormValues,
  onSubmit,
  isSubmitting = false,
  submitError = "",
  submitSuccess = "",
  onCancel,
  submitLabel = "Save Student",
}) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialFormValues) {
      setFormData({
        name: initialFormValues.name || "",
        email: initialFormValues.email || "",
        age: initialFormValues.age ?? "",
        course: initialFormValues.course || "",
      });
    }
  }, [initialFormValues]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function validateForm() {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.age) {
      nextErrors.age = "Age is required.";
    } else {
      const ageValue = Number(formData.age);

      if (!Number.isInteger(ageValue) || ageValue <= 0) {
        nextErrors.age = "Age must be a positive number.";
      }
    }

    if (!formData.course.trim()) {
      nextErrors.course = "Course is required.";
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const studentData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      age: Number(formData.age),
      course: formData.course.trim(),
    };

    await onSubmit(studentData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      {submitError ? (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      ) : null}

      {submitSuccess ? (
        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {submitSuccess}
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition ${
              errors.name
                ? "border-red-400"
                : "border-slate-300 focus:border-indigo-500"
            }`}
            placeholder="Enter student name"
          />
          {errors.name ? (
            <p className="mt-2 text-sm text-red-600">{errors.name}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition ${
              errors.email
                ? "border-red-400"
                : "border-slate-300 focus:border-indigo-500"
            }`}
            placeholder="Enter email address"
          />
          {errors.email ? (
            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="age"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            min="1"
            value={formData.age}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition ${
              errors.age
                ? "border-red-400"
                : "border-slate-300 focus:border-indigo-500"
            }`}
            placeholder="Enter age"
          />
          {errors.age ? (
            <p className="mt-2 text-sm text-red-600">{errors.age}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="course"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Course
          </label>
          <input
            id="course"
            name="course"
            type="text"
            value={formData.course}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition ${
              errors.course
                ? "border-red-400"
                : "border-slate-300 focus:border-indigo-500"
            }`}
            placeholder="Enter course name"
          />
          {errors.course ? (
            <p className="mt-2 text-sm text-red-600">{errors.course}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default StudentForm;
