import React, {useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (taskTitle: string) => void
}

export function Todolist(props: PropsType) {

    let [taskTitle, setTaskTitle] = useState("");

    const addTaskHandler = () => {
        props.addTask(taskTitle);
        setTaskTitle("");
    }

    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value);
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={taskTitle}
                   onChange={(e) => {
                       setTaskTitle(e.currentTarget.value);
                   }}
                   onKeyPress={(e) => {
                       if (e.key === "Enter") {
                           addTaskHandler();
                       }
                   }}
            />
            <button onClick={() => {
                if (taskTitle.trim() !== "") {
                    addTaskHandler();
                }
            }}>+
            </button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                props.removeTask(t.id)
                            }}>x
                            </button>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <button onClick={() => {
                changeFilterHandler("all")
            }}>
                All
            </button>
            <button onClick={() => {
                changeFilterHandler("active")
            }}>
                Active
            </button>
            <button onClick={() => {
                changeFilterHandler("completed")
            }}>
                Completed
            </button>
        </div>
    </div>
}
