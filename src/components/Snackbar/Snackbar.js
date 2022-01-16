import React, { PureComponent } from "react";
import Styles from "./Snackbar.module.css";

export class Snackbar extends PureComponent {
  render() {
    const { isActive, message } = this.props;
    return (
      <div
        className={
          isActive
            ? [Styles.snackbar, Styles.fadeIn].join(" ")
            : [Styles.snackbar, Styles.fadeOut].join(" ")
        }
      >
        {message}
      </div>
    );
  }
}
