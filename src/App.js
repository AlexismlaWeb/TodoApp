import React, { useState, useEffect } from "react";
import "./App.css";
import icon_moon from "../src/images/icon-moon.svg";
import icon_cross from "../src/images/icon-cross.svg";
import icon_sun from "../src/images/icon-sun.svg";
import { useDarkMode } from "./DarkModeContext";

function App() {
  const { darkMode, toogleDarkMode } = useDarkMode();

  const [todoArray, setTodoArray] = useState([]);
  const [showChecked, setShowChecked] = useState("all");
  const [InputValue, setInputeValue] = useState("");

  useEffect(() => {
    console.log("TodoList", todoArray);
  });

  const displayItems = () => {
    let filteredItems = todoArray;
    if (showChecked === "completed") {
      filteredItems = todoArray.filter((item) => item.checked);
    } else if (showChecked === "active") {
      filteredItems = todoArray.filter((item) => !item.checked);
    }

    return filteredItems.map((element, index) => {
      return (
        <div
          className={`todo_item ${darkMode ? "border_dark" : "border_ligh"}`}
          key={index}
        >
          <div className="todo">
            <input
              type="checkbox"
              className={`checkbox_input_create main ${
                darkMode ? "checkbox_dark" : "checkbox_light"
              }`}
              checked={element.checked}
              onChange={() => handleCheckboxChange(index)}
              readOnly
            />
          </div>
          <div
            style={{
              width: "80%",
              height: "8vh",
              display: "flex",
              alignItems: "center",
            }}
          >
            <p
              className={`content_todo ${
                darkMode ? "color_dark" : "color_light"
              }`}
              style={
                element.checked === true && !darkMode
                  ? { textDecoration: "line-through", color: "lightgray" }
                  : element.checked && darkMode
                  ? {
                      textDecoration: "line-through",
                      color: "hsl(237, 14%, 26%)",
                    }
                  : null
              }
            >
              {element.content}
            </p>
          </div>
          <div className="icon_close">
            <img
              src={icon_cross}
              alt="icon_cross"
              onClick={() => {
                handleSupprimerObjet(index);
              }}
            />
          </div>
        </div>
      );
    });
  };

  const handleSupprimerObjet = (index) => {
    const newTodolist = todoArray.filter((element, id) => id !== index);
    console.log(index);
    console.log(newTodolist);
    setTodoArray(newTodolist);
  };

  const handleCheckboxChange = (index) => {
    console.log(index);
    const nouvelObjets = todoArray.map((objet, id) =>
      id === index ? { content: objet.content, checked: !objet.checked } : objet
    );
    setTodoArray(nouvelObjets);
  };

  const handleSupprimerCompleted = () => {
    const newArray = todoArray.filter((elm, index) => !elm.checked);
    setTodoArray(newArray);
  };

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <div className="todo_container">
        <div className="todo_header">
          <div className="title_todo">
            <h1>TODO</h1>
          </div>
          <div
            className="todo_icon_light"
            onClick={() => {
              toogleDarkMode();
              console.log(darkMode);
            }}
          >
            <img
              src={!darkMode ? icon_moon : icon_sun}
              alt="icon_moon"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="todo_create">
          <div className="todo_input_create">
            <input
              type="checkbox"
              className={`checkbox_input_create main ${
                darkMode ? "checkbox_dark" : "checkbox_light"
              }`}
            />
            <input
              type="text"
              name="newTodo"
              placeholder="Create a new todo..."
              className={`input_todo ${
                darkMode ? "input_dark" : "input_light"
              }`}
              onKeyDown={(event) => {
                if (event.key === "Enter" && event.target.value.length > 0) {
                  setTodoArray([
                    ...todoArray,
                    { content: event.target.value, checked: false },
                  ]);

                  setInputeValue("");
                }
              }}
              value={InputValue}
              onChange={(event) => setInputeValue(event.target.value)}
            />
          </div>
        </div>
        <div
          className={`${
            darkMode ? "todo_dark_container" : "todo_light_container"
          }`}
        >
          <div className="todo_list_group">{displayItems()}</div>
          <div className={`todo_option_items`}>
            <div className="items_left_container">
              <p>{displayItems().length} items left</p>
            </div>
            <div
              className={`sort_items ${
                darkMode ? "sort_items_dark" : "sort_items_ligth"
              }`}
            >
              <p
                className={showChecked === "all" ? "todo_active" : null}
                onClick={() => {
                  setShowChecked("all");
                }}
              >
                All
              </p>
              <p
                className={showChecked === "active" ? "todo_active" : null}
                onClick={() => {
                  setShowChecked("active");
                }}
              >
                Active
              </p>
              <p
                className={showChecked === "completed" ? "todo_active" : null}
                onClick={() => {
                  setShowChecked("completed");
                }}
              >
                Completed
              </p>
            </div>
            <div
              className={`clear_items_completed ${
                darkMode ? "items_completed_dark" : "items_completed_light"
              }`}
            >
              <p
                onClick={() => {
                  handleSupprimerCompleted();
                }}
              >
                Clear Completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
