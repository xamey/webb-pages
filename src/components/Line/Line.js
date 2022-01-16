import React from "react";
import "./Line.css";

export default class Line extends React.Component {
  sentence = "";

  async type(text) {
    await this.pause(1);
    let queue = text.split("");

    while (queue.length) {
      let char = queue.shift();
      this.sentence += char;
      this.forceUpdate();
      await this.pause(0.1);
    }

    await this.pause(0.5);
    return;
  }

  pause(s = 1) {
    return new Promise((resolve) => setTimeout(resolve, 1000 * Number(s)));
  }

  componentDidMount() {
    this.type("find land owners on the worldwide webb metaverse.");
  }

  render() {
    return <span className="headline">{this.sentence}</span>;
  }
}
