import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function AddExercise() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
    };
    axios.post("https://powerful-island-63545.herokuapp.com/users/add", user);
    window.location = "/users";
  };

  return (
    <Container maxWidth="sm">
      <h3>Add New Exercise</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          label="Username"
          margin="dense"
          color="primary"
          fullWidth
        />
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
