import { supabase } from "../lib/supabase";

export async function getStudents() {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getStudentById(studentId) {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", studentId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function addStudent(studentData) {
  const { data, error } = await supabase
    .from("students")
    .insert([studentData])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateStudent(studentId, studentData) {
  const { data, error } = await supabase
    .from("students")
    .update(studentData)
    .eq("id", studentId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteStudent(studentId) {
  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", studentId);

  if (error) {
    throw error;
  }
}
