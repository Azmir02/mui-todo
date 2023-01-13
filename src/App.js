import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
function App() {
  const [info, setInfo] = useState({
    fullname: "",
    email: "",
    designation: "",
  });
  const [todo, setTodo] = useState([]);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [ids, setIds] = useState("");

  // this is for inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // data submission
  const db = getDatabase();
  const handleSubmit = () => {
    set(push(ref(db, "users")), {
      fullname: info.fullname,
      email: info.email,
      designation: info.designation,
    });
  };

  // get all data
  useEffect(() => {
    const starCountRef = ref(db, "users");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((x) => {
        arr.push({ ...x.val(), id: x.key });
      });
      setTodo(arr);
    });
  }, []);

  // Delete data from db and frontend both
  const handleDelete = (id) => {
    remove(ref(db, "users/" + id));
  };

  // Edit your data
  const handleEdit = (value) => {
    setInfo({
      fullname: value.fullname,
      email: value.email,
      designation: value.designation,
    });
    setShow(true);
    setIds(value.id);
  };

  // Update your data
  const handleUpdate = () => {
    update(ref(db, "users/" + ids), {
      fullname: info.fullname,
      email: info.email,
      designation: info.designation,
    }).then(() => {
      setInfo({
        fullname: "",
        email: "",
        designation: "",
      });
      setShow(false);
    });
  };

  return (
    <>
      <Container fixed>
        <Grid container spacing={2}>
          <Grid xs={8} className="forms">
            <TextField
              type="text"
              fullWidth
              id="standard-basic"
              label="Full Name"
              variant="standard"
              onChange={handleChange}
              name="fullname"
              value={info.fullname}
            />
            <TextField
              fullWidth
              id="standard-basic"
              label="Email"
              type="email"
              variant="standard"
              margin="normal"
              onChange={handleChange}
              name="email"
              value={info.email}
            />
            <TextField
              fullWidth
              type="text"
              id="standard-basic"
              label="Designation"
              variant="standard"
              margin="normal"
              onChange={handleChange}
              name="designation"
              value={info.designation}
            />
            {show ? (
              <Button
                onClick={handleUpdate}
                variant="contained"
                style={{ marginTop: "25px" }}
              >
                Update
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                variant="contained"
                style={{ marginTop: "25px" }}
              >
                Submit
              </Button>
            )}

            {error && (
              <p style={{ color: "#EE4B2B", fontSize: "25px" }}>{error}</p>
            )}
          </Grid>
        </Grid>
        <div className="flex">
          {todo.map((item, i) => (
            <Card key={i} className="width">
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  {item.fullname}
                </Typography>
                <Typography variant="h5" component="div"></Typography>
                <Typography variant="body2">
                  {item.designation}
                  <br />
                  {item.email}
                </Typography>
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="contained"
                  style={{ marginTop: "15px" }}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleEdit(item)}
                  variant="contained"
                  style={{ marginTop: "15px", marginLeft: "5px" }}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

export default App;
