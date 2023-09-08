import React from "react";
class GreetingsList extends React.Component {
  render() {
    const greetings = this.props.greetings;
    return (
      <div className="container">
        <h3>Greetings</h3>

        {greetings &&
          greetings.map((greeting, index) => (
            <div className="greeting" key={index}>
              {greeting}
            </div>
          ))}
      </div>
    );
  }
}
export default GreetingsList;
