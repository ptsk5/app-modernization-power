import React from "react";
class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
    };

    this.handleFistNameChange = this.handleFistNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFistNameChange(event) {
    this.setState({ firstName: event.target.value });
  }
  handleLastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handleSubmit(event) {
    // add fetch
    event.preventDefault();
    this.props.onFormSubmit(this.state);
    let initState = {
      firstName: "",
      lastName: "",
      email: "",
    };
    this.setState(initState);
  }

  render() {
    return (
      <div className="container">
        <h3>Add new user</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label className="inputField">
              First name:
              <input
                type="text"
                value={this.state.firstName}
                onChange={this.handleFistNameChange}
              />
            </label>
            <label className="inputField">
              Last name:
              <input
                type="text"
                value={this.state.lastName}
                onChange={this.handleLastNameChange}
              />
            </label>
            <label className="inputField">
              Email:
              <input
                type="text"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </label>
          </div>
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}
export default UserForm;
