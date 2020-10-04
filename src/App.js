import React, { Component } from "react";
import menu from "./img/open-menu.svg";
import noItem from "./img/365cons-108.svg";
import "./App.css";
import "./CSS/TodoItem.css";
import TodoItem from "./components/TodoItem";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoItems: [
        { title: "Study English", isComplete: true },
        { title: "Football", isComplete: true },
        { title: "Cook dinner", isComplete: false },
        { title: "Go to market", isComplete: false },
        { title: "Watching Tv", isComplete: false },
        { title: "Watching Tv test", isComplete: false },/...
      ],
      newItem: "",
      addItem: false,
    };

    this.addItem = this.addItem.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onItemClicked(item) {
    return (event) => {
      const isComplete = item.isComplete;
      const todoItems = this.state.todoItems;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete,
          },
          ...todoItems.slice(index + 1),
        ],
      });
    };
  }

  addItem() {
    this.setState({
      addItem: true,
    });
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      // Enter key
      let text = event.target.value;
      if (!text || text === "") {
        return;
      }

      text = text.trim();

      if (!text) {
        return;
      }

      this.setState({
        newItem: "",
        todoItems: [
          ...this.state.todoItems,
          { title: text, isComplete: false },
        ],
        addItem: false
      });
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value
    })
  }

  render() {
    const { todoItems, addItem, newItem } = this.state;
    return (
      <div className="Container">
        <div className="App">
          <div className="Header">
            <img src={menu} alt="menu"></img>
            <h1>DAILIST</h1>
          </div>
          <div className="Todo">
            {todoItems.length <= 0 && (
              <div>
                <p className="p1">Seems like</p>
                <p className="p2">You have no list</p>
                <img src={noItem} alt="no-item"></img>
              </div>
            )}
            {todoItems.length > 0 && (
              <div className="TodoContainer">
                <div className="TodoItem">
                  <h4>Upcoming</h4>
                  {todoItems.map((item, index) => {
                    if (!item.isComplete) {
                      return (
                        <TodoItem
                          item={item}
                          index={index}
                          onClick={this.onItemClicked(item)}
                        />
                      );
                    }
                  })}
                </div>
                <div className="CompleteItem">
                  <h4>Finished</h4>
                  {todoItems.map((item, index) => {
                    if (item.isComplete) {
                      return (
                        <TodoItem
                          item={item}
                          index={index}
                          onClick={this.onItemClicked(item)}
                        />
                      );
                    }
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="AddButtonContainer">
            {!addItem && (
              <button onClick={this.addItem}>
                <p>+</p>
              </button>
            )}
            {addItem && (
              <input
                type="text"
                placeholder="Add new item"
                onKeyUp={this.onKeyUp}
                value={newItem}
                onChange={this.onChange}
              ></input>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
