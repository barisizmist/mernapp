import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import Container from "@material-ui/core/Container";
import axios from "axios";

export default function MaterialTableDemo() {
  const columns = [
    { title: "User Name", field: "username" },
    { title: "Description", field: "description" },
    { title: "Duration", field: "duration", type: "numeric" },
    { title: "Date", field: "date", type: "date" },
  ];
  const [state, setState] = useState({ data: [] });

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises")
      .then((response) => {
        setState({ data: response.data });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container maxWidth="lg">
      <MaterialTable
        title="Editable Example"
        columns={columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  axios
                    .post("http://localhost:5000/exercises/add", newData)
                    .then((res) => console.log(res.data));
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    axios
                      .post(
                        "http://localhost:5000/exercises/update/" + oldData._id,
                        newData
                      )
                      .then((res) => console.log(res.data));
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  axios.delete(
                    "http://localhost:5000/exercises/" + oldData._id
                  );
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
    </Container>
  );
}
