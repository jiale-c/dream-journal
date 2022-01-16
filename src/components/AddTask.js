import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase";
import { useAuth } from "./contexts/AuthContext";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [details, setDetails] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);
  const [id, setId] = useState("");
  const { currentUser, logout } = useAuth();

  const [state, setState] = useState({});

  useEffect(() => {
    myFunction();
    return () => {
      setState({}); // This worked for me
    };
  }, []);

  const myFunction = () => {
    setState({
      name: "JiaLe",
      surname: "Chee",
    });
  };

  projectFirestore
    .collection("users")
    .doc(currentUser.uid)
    .onSnapshot((doc) => {
      const dreams = doc.data();
      const data = dreams.dreams;
      if (data.length === 0) {
        setId("0");
      } else {
        const res = Number(data[0].id) + 1;
        setId(res.toString());
      }
    });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please add an entry");
      return;
    }

    onAdd({ text, details, day, reminder, id });

    setText("");
    setDetails("");
    setDay("");
    setReminder(false);
    setId("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control form-control-check">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Dream Title"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Details</label>
        <input
          type="details"
          placeholder="Start The Story"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day and Time</label>
        <input
          type="Date"
          placeholder="Add Day and Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Favourite it</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input
        type="submit"
        value="Save Dream"
        className="btn btn-block"
        style={{ color: "#BC011B" }}
      />
    </form>
  );
};

export default AddTask;
