import { Component } from "react";
import SetInterval from "./SetInterval";
export class GithuHubProfile extends Component {
  constructor() {
    super();

    this.state = {
      userData: null,
      showTimer: false,
    };

    console.log("constructor is called");
  }
  async componentDidMount() {
    const res = await fetch("https://api.github.com/users/ajeetjha123");
    const data = await res.json();
    this.setState({ userData: data });
    console.log("componentDidMount is called");
  }
  componentWillUnmount() {
    console.log("componentWillUnmount is called");
  }
  toggleTimer = () => {
    this.setState((prev) => ({
      showTimer: !prev.showTimer,
    }));
  };

  render() {
    console.log("render is called");
    if (!this.state.userData) return <h1>Loading...</h1>;
    const { name, avatar_url, blog } = this.state.userData;
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            border: "1px solid #000",
            width: "300px",
            margin: "10px",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <img style={{ width: "150px" }} src={avatar_url} alt="" />
          <h3>Name: {name}</h3>
          <h3>blog: {blog}</h3>
          <button onClick={this.toggleTimer}>
            {this.state.showTimer ? "Show Time" : "Hide TIme"}
          </button>
        </div>
        {this.state.showTimer && <SetInterval />}
      </div>
    );
  }
}
