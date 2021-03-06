import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>
        <button type="button" className="btn btn-outline-warning">
          Edit
        </button>
      </Link>

      <button
        type="button"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
        className="btn btn-outline-danger"
      >
        Delete
      </button>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.state = { exercises: [] };

    this.deleteExercise = this.deleteExercise.bind(this);
  }
  componentDidMount() {
    axios
      .get("https://nameless-chamber-63878.herokuapp.com/exercises/")
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      .catch((error) => console.log(error.message));
  }
  deleteExercise(id) {
    axios
      .delete("https://nameless-chamber-63878.herokuapp.com/exercises/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }
  exerciseList() {
    return this.state.exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
