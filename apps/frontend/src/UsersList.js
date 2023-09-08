import React from "react";
class UsersList extends React.Component {
  render() {
    const users = this.props.users;
    return (
      <div className="container">
        <h3>Users</h3>
        <div className="line header">
          <span>Name</span>
          <span>Email</span>
        </div>
        {users &&
          users.map((user, index) => (
            <div className="line" key={index}>
              <span>
                {user.firstName} {user.lastName}
              </span>
              <span>{user.email}</span>
            </div>
          ))}
      </div>
    );
  }
}
export default UsersList;
