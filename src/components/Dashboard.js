import { Card, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import About from "./About";
import DreamDetails from "./DreamDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { projectFirestore } from "../firebase";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
    };

    getTasks();
  }, []);

  // Fetch Dream
  const fetchTasks = async () => {
    const res = await projectFirestore
      .collection("users")
      .doc(currentUser.uid)
      .onSnapshot((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
          return;
        }
        const dreams = doc.data();
        const data = dreams.dreams;
        setTasks(data);
      });
  };

  // Fetch individual Dream
  const fetchTask = async (idNum) => {
    const res = await projectFirestore
      .collection("users")
      .doc(currentUser.uid)
      .onSnapshot((doc) => {
        const dreams = doc.data();
        const data = dreams.dreams;
        data.forEach((element) => {
          if (element.id === idNum) {
            setData(element);
          }
        });
      });
    return data;
  };

  // Add Dream
  const addTask = async (task) => {
    await projectFirestore
      .collection("users")
      .doc(currentUser.uid)
      .update({ dreams: [task, ...tasks] });
    setTasks([task, ...tasks]);
  };

  // Delete Dream
  const deleteTask = async (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    await projectFirestore
      .collection("users")
      .doc(currentUser.uid)
      .update({ dreams: tasks.filter((task) => task.id !== id) });
  };

  // Toggle Favourite
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    await projectFirestore
      .collection("users")
      .doc(currentUser.uid)
      .update({
        dreams: tasks.map((task) =>
          task.id === id ? { ...task, reminder: updTask.reminder } : task
        ),
      });
  };

  return (
    <>
      <Card style={headingStyle}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: "gold" }}>
            HOME
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong> {currentUser.email}
          <Link
            to="/update-profile"
            className="btn btn-primary w-100 mt-3"
            style={{ background: "DarkGoldenRod", border: "1.2px solid black" }}
          >
            Update Profile
          </Link>
          <Header
            onAdd={() => setShowAddTask(!showAddTask)}
            showAdd={showAddTask}
          />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {showAddTask && <AddTask onAdd={addTask} />}
                  {tasks.length > 0 ? (
                    <Tasks
                      tasks={tasks}
                      onDelete={deleteTask}
                      onToggle={toggleReminder}
                    />
                  ) : (
                    "No dreams yet"
                  )}
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/task/:id" element={<DreamDetails />} />
          </Routes>
          <Footer />
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button style={linkStyle} variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}

//CSS styling
const headingStyle = {
  color: "black",
  borderWidth: "3px",
  borderColor: "black",
  borderRadius: "15px",
  backgroundColor: "#98B9CD",
};

const linkStyle = {
  color: "white",
};
