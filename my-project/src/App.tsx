import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import InputField from "./components/InputField";
import DataTable from "./components/DataTable";

export default function App() {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");

  const sampleData = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 28 },
  ];

  const sampleColumns = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "age", title: "Age", dataIndex: "age", sortable: true },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
        {/* Navigation */}
        <nav className="flex gap-4 mb-6">
          <Link to="/input" className="text-blue-500 hover:underline">
            Input Field
          </Link>
          <Link to="/table" className="text-blue-500 hover:underline">
            Data Table
          </Link>
        </nav>

        {/* Routes */}
        <Routes>
          {/* InputField demo route */}
          <Route
            path="/input"
            element={
              <div className="flex flex-col gap-8 items-center justify-center">
                <h1 className="text-2xl font-bold">🎯 InputField Component Demo</h1>

                {/* Basic Outlined Input */}
                <InputField
                  label="Name"
                  placeholder="Enter your name"
                  helperText="This is a helper text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />

                {/* Variants */}
                <div className="grid gap-4 w-full max-w-md">
                  <InputField
                    label="Outlined"
                    placeholder="Outlined variant"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    variant="outlined"
                  />
                  <InputField
                    label="Filled"
                    placeholder="Filled variant"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    variant="filled"
                  />
                  <InputField
                    label="Ghost"
                    placeholder="Ghost variant"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    variant="ghost"
                  />
                </div>

                {/* Sizes */}
                <div className="grid gap-4 w-full max-w-md">
                  <InputField
                    label="Small"
                    placeholder="Small input"
                    size="sm"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <InputField
                    label="Medium"
                    placeholder="Medium input"
                    size="md"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <InputField
                    label="Large"
                    placeholder="Large input"
                    size="lg"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>

                {/* Password with toggle */}
                <InputField
                  label="Password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  passwordToggle
                />

                {/* Clearable input */}
                <InputField
                  label="Search"
                  placeholder="Type something..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  clearable
                />

                {/* Invalid state */}
                <InputField
                  label="Email"
                  placeholder="Invalid email example"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  invalid
                  errorMessage="Invalid email format"
                />

                {/* Disabled */}
                <InputField
                  label="Disabled"
                  placeholder="This is disabled"
                  disabled
                />

                {/* Loading state */}
                <InputField
                  label="Loading"
                  placeholder="Loading input..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  loading
                />
              </div>
            }
          />

          {/* DataTable demo route */}
          <Route
            path="/table"
            element={
              <DataTable
                data={sampleData}
                columns={sampleColumns}
                selectable
                onRowSelect={(rows) => console.log("Selected rows:", rows)}
              />
            }
          />

          {/* Default route */}
          <Route path="*" element={<p>Select a component from above ⬆️</p>} />
        </Routes>
      </div>
    </Router>
  );
}
