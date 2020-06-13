import React, { Component } from "react";
import "./App.css";

class RewardsToCategorize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          id: "1",
          taskName: "R1",
          type: ["rewards"],
        },
        {
          id: "2",
          taskName: "R2",
          type: ["rewards"],
        },
        {
          id: "3",
          taskName: "R3",
          type: ["rewards"],
        },
        {
          id: "4",
          taskName: "R4",
          type: ["rewards"],
        },
        {
          id: "5",
          taskName: "R5",
          type: ["rewards"],
        },
      ],
    };
  }

  onDragStart = (event, taskName) => {
    console.log("dragstart on div: ", taskName);
    event.dataTransfer.setData("taskName", taskName);
  };
  onDragOver = (event) => {
    event.preventDefault();
  };

  onRemove = (taskId, type) => {
    let { tasks } = this.state;
    let task = tasks.filter((task) => task.id === taskId)[0];
    console.log(task);
    task.type.splice(task.type.indexOf(type), 1);

    this.setState({
      ...this.state,
      tasks,
    });
  };

  onDrop = (event, categories) => {
    let taskName = event.dataTransfer.getData("taskName");
    let tasks = this.state.tasks.map((task) => {
      if (task.taskName === taskName && !task.type.includes(categories)) {
        task.type.push(categories);
      }
      return task;
    });

    this.setState({
      ...this.state,
      tasks,
    });
  };

  render() {
    var tasks = {
      rewards: [],
      category: [],
      category2: [],
      category3: [],
      category4: [],
      category5: [],
    };

    this.state.tasks.forEach((task) => {
      task.type.forEach((type) => {
        if (type === "rewards") {
          tasks[type].push(
            <div
              key={task.id}
              placeholder={task.taskName}
              onDragStart={(event) => this.onDragStart(event, task.taskName)}
              draggable
              className="draggable"
            >
              {task.taskName}
            </div>
          );
        } else {
          tasks[type].push(
            <div
              key={task.id}
              placeholder={task.taskName}
              className="draggable"
            >
              {task.taskName}
              <br />
              <button onClick={() => this.onRemove(task.id, type)}>X</button>
            </div>
          );
        }
      });
    });

    return (
      <div className="drag-container">
        <h2 className="head"> Miles Front End Challenge</h2>

        <div
          className="Rewards"
          placeholder={tasks.taskName}
          onDragOver={(event) => this.onDragOver(event)}
        >
          <span className="group-header">Rewards</span>
          {tasks.rewards}
        </div>
        <div className="drop-container">
          <div
            className="droppable"
            onDragOver={(event) => this.onDragOver(event)}
            onDrop={(event) => this.onDrop(event, "category")}
          >
            <span className="group-header">Category</span>
            {tasks.category}
          </div>
          <div
            className="droppable"
            onDragOver={(event) => this.onDragOver(event)}
            onDrop={(event) => this.onDrop(event, "category2")}
          >
            <span className="group-header">Category2</span>
            {tasks.category2}
          </div>
          <div
            className="droppable"
            onDragOver={(event) => this.onDragOver(event)}
            onDrop={(event) => this.onDrop(event, "category3")}
          >
            <span className="group-header">Category3</span>
            {tasks.category3}
          </div>
          <div
            className="droppable"
            onDragOver={(event) => this.onDragOver(event)}
            onDrop={(event) => this.onDrop(event, "category4")}
          >
            <span className="group-header">Category4</span>
            {tasks.category4}
          </div>
          <div
            className="droppable"
            onDragOver={(event) => this.onDragOver(event)}
            onDrop={(event) => this.onDrop(event, "category5")}
          >
            <span className="group-header">Category5</span>
            {tasks.category5}
          </div>
        </div>
      </div>
    );
  }
}

export default RewardsToCategorize;
