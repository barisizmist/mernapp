import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    paddingLeft: 75,
  },
});

export default function Exercises() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("https://powerful-island-63545.herokuapp.com/users")
      .then((response) => {
        setRows(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell align="right">User Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell component="th" scope="row">
                  {idx + 1}
                </TableCell>
                <TableCell align="right">{row.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
