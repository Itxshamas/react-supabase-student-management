import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import Students from "./pages/Students";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/students" replace />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/students/edit/:id" element={<EditStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
