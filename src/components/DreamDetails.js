import { useState, useEffect } from "react";
import {
  useParams,
  Navigate,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import Button from "./Button";
import { projectFirestore } from "../firebase";
import { useAuth } from "./contexts/AuthContext";

function DreamDetails() {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});
  const [error, setError] = useState(null);
  const { currentUser, logout } = useAuth();

  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [state, setState] = useState({});

  // version 2
  useEffect(() => {
    const fetchTask = async () => {
      const res = await projectFirestore
        .collection("users")
        .doc(currentUser.uid)
        .onSnapshot((doc) => {
          if (!doc.exists) {
            console.log(currentUser.uid);
            console.log("No such document!");
            return;
          }
          const dreams = doc.data();
          const data = dreams.dreams;
          data.forEach((element) => {
            if (element.id === params.id) {
              setTask(element);
            }
          });
        });

      if (res.status === 404) {
        navigate("/");
      }

      setLoading(false);
    };

    fetchTask();
    myFunction();
    return () => {
      setState({}); // This worked for me
    };
  }, []);

  const myFunction = () => {
    setState({
      name: "Jhon",
      surname: "Doe",
    });
  };

  // end of ver 2

  if (error) {
    return <Navigate to="/" />;
  }

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
      {/* <p>{pathname}</p> */}
      <h3>{task.text}</h3>
      <p>{task.details}</p>
      <p>{task.day}</p>
      <Button
        onClick={() => {
          navigate("/");
        }}
        text="Go Back"
      />
    </div>
  );
}

export default DreamDetails;
