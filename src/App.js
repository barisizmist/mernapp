import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Exercises from "./components/Exercises";
import AddExercise from "./components/AddExercise";
// import EditExercise from "./component/EditExercise";
import AddUser from "./components/AddUser";
import Users from "./components/Users";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route path="/" exact component={Exercises} />
        {/* <Route path="/edit/:id" component={} /> */}
        <Route path="/add" component={AddExercise} />
        <Route path="/add-user" component={AddUser} />
        <Route path="/users" component={Users} />
      </Router>
    </div>
  );
}

export default App;
