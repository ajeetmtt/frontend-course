import { Component } from "react";

class SetInterval extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
    console.log("child counstruct");
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState((prev) => ({
        count: prev.count + 1,
      }));
    }, 1000);
    console.log("child componentDidMount");
  }

  componentDidUpdate() {
    // console.log(this.state.count);
  }
  componentWillUnmount() {
    console.log("child componentWillUnmount is called");
    clearInterval(this.timer);
  }
  render() {
    //  console.log("child render");
    return <h1>Timer: {this.state.count}</h1>;
  }
}

export default SetInterval;
