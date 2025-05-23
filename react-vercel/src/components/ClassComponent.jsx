import { Component } from "react";

class ClassComponent extends Component {
  constructor(props) {
    console.log(props);
    super();
    this.state = {
      count1: 0,
      count2: 0,
      isFalse: true,
      name: "",
    };
  }

  render() {
    return (
      <>
        <h1>Hello World From Class</h1>;<h2>Name: {this.props.name}</h2>
        <h3>Count1: {this.state.count1}</h3>
        <h3>Count:2 {this.state.count2}</h3>
        <button
          onClick={() => this.setState({ count1: this.state.count1 + 1 })}
        >
          Increse1
        </button>
        <button
          onClick={() => this.setState({ count2: this.state.count2 + 1 })}
        >
          Increse2
        </button>
      </>
    );
  }
}

export default ClassComponent;

//const data = new ClassComponent("Ajeet Kumar jHa")
