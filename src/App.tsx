import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValueType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Rest API", isDone: false },
        { id: 5, title: "GraphQL", isDone: false },
    ]);

    const removeTask = (id: number) => {
        tasks = tasks.filter(el => el.id !== id);
        setTasks(tasks);
    }

    // let [filter, setFilter] = useState<FilterValueType>("active");
    //
    // let tasksForTodoList = tasks;
    //
    // if (filter === "active") {
    //     tasksForTodoList = tasks.filter(el => !el.isDone)
    // }
    // if (filter === "completed") {
    //     tasksForTodoList = tasks.filter(el => el.isDone)
    // }
    //
    // const changeFilter = (value: FilterValueType) => {
    //     setFilter(value)
    // }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
