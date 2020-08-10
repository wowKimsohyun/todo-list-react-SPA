import React, { Component } from "react";
import "../CSS/TodoItem.css";

class TodoItem extends Component {
  render() {
    const { item, index, onClick } = this.props;
    let className = "";
    if (item.isComplete) {
      className += "Complete";
    } else {
      className += "Content";
    }

    return (
      <div className={className} onClick={onClick}>
        {index+1}. {item.title}
      </div>
    );
  }
}

export default TodoItem;
