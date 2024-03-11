import { Routes, Route, Link } from "react-router-dom";
import Users from "./user/Users";
import Task from "./task/Task";

const App = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white py-8 px-4" style={{ "width": "12%" }}>
        <h1 className="text-lg font-semibold mb-4">Todo App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/" className="block py-2 px-4 hover:bg-gray-700 rounded">Task</Link>
            </li>
            <li>
              <Link to="/users" className="block py-2 px-4 hover:bg-gray-700 rounded">Users</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Task />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
