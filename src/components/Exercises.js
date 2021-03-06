/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import Select from "react-select";
import axios from "axios";

export default function MaterialTableDemo() {
  const [state, setState] = useState({ data: [] });
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .get("https://powerful-island-63545.herokuapp.com/exercises")
      .then((response) => {
        setState({
          data: response.data,
        });
      })
      .catch((err) => console.log(err));
    axios
      .get("https://powerful-island-63545.herokuapp.com/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = [
    {
      title: "User Name",
      field: "username",
    },
    {
      title: "Description",
      field: "description",
    },
    {
      title: "Duration",
      field: "duration",
      type: "numeric",
    },
    {
      title: "Date",
      field: "date",
      type: "date",
    },
  ];

  return (
    <Container maxWidth="lg">
      <MaterialTable
        title="Exercises Table"
        columns={columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                axios.post(
                  "https://powerful-island-63545.herokuapp.com/exercises/add",
                  newData
                );
                return {
                  ...prevState,
                  data,
                };
              });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  axios.post(
                    "https://powerful-island-63545.herokuapp.com/exercises/update/" +
                      oldData._id,
                    newData
                  );
                  return {
                    ...prevState,
                    data,
                  };
                });
              }
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                axios.delete(
                  "https://powerful-island-63545.herokuapp.com/exercises/" +
                    oldData._id
                );
                return {
                  ...prevState,
                  data,
                };
              });
            }),
        }}
      />
    </Container>
  );
}
