import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

export default function AddExercise() {
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = useState("");
  const [date, setStartDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [users, setUsers] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username,
      description,
      duration,
      date,
    };

    axios
      .post(
        "https://powerful-island-63545.herokuapp.com/exercises/add",
        exercise
      )
      .then((res) => {
        console.log(res.data);
      });
    window.location = "/";
  };

  useEffect(() => {
    axios
      .get("https://powerful-island-63545.herokuapp.com/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const options = users.map((user) => ({
    value: user.username,
    label: user.username,
  }));
  return (
    <Container maxWidth="sm">
      <h3>Add New Exercise</h3>
      <form onSubmit={handleSubmit}>
        <Select
          options={options}
          defaultValue={options[0]}
          onChange={(value) => setUsername(value.value)}
        />
        <TextField
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          margin="dense"
          color="primary"
          fullWidth
        />
        <TextField
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
          label="Duration"
          margin="dense"
          color="primary"
          fullWidth
        />
        <label
          htmlFor=""
          style={{ width: "100%", display: "block", marginTop: "20" }}
        >
          Date
        </label>
        <DatePicker selected={date} onChange={(date) => setStartDate(date)} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ marginTop: 20 }}
        >
          Add
        </Button>
      </form>
    </Container>
  );
}
