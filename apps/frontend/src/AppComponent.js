import React from "react";
import UserForm from "./UserForm";
import UsersList from "./UsersList";
import GreetingsList from "./GreetingsList";
import axios from "axios";

const USERS_SERVICE = "/api/users";
const GREETINGS_SERVICE = "/api/greetings";
class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  componentDidMount() {
    this.getUsers();
    this.getGreetings();
  }

  getUsers() {
    axios
      .get(USERS_SERVICE)
      .then((response) => this.setState({ users: response.data.users }))
      .catch((error) => {
        alert(error.message);
      });
  }
  getGreetings() {
    axios
      .get(GREETINGS_SERVICE)
      .then((response) => this.setState({ greetings: response.data.greetings }))
      .catch((error) => {
        this.setState({ greetings: [error.message] });
      });
  }
  createUser(newUser) {
    axios
      .post(USERS_SERVICE, newUser)
      .then((response) => {
        this.getUsers();
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  handleFormSubmit(form) {
    this.createUser(form);
  }
  render() {
    return (
      <div className="board">
        <UserForm onFormSubmit={this.handleFormSubmit} />
        <UsersList users={this.state.users} />
        <GreetingsList greetings={this.state.greetings} />
      </div>
    );
  }
}
export default AppComponent;
