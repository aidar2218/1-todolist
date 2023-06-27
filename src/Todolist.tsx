import React, {useState} from 'react';
import {FilterValueType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
}

export function Todolist(props: PropsType) {

    let [valueFilter, setValueFilter] = useState<FilterValueType>('all');

    const taskFilter = (value: FilterValueType) => {
        setValueFilter(value);
    }

    const durshlagFunc = () => {
        let durshlag = props.tasks;

        switch (valueFilter) {
            case "active":
                return durshlag = props.tasks.filter(el => !el.isDone);
            case "completed":
                return durshlag = props.tasks.filter(el => el.isDone);
            default: return durshlag
        }
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {durshlagFunc().map((task, index) => {
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => props.removeTask(task.id)}>X</button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={() => {
                taskFilter("all")
            }}>All</button>
            <button onClick={() => {
                taskFilter("active")
            }}>Active</button>
            <button onClick={() => {
                taskFilter("completed")
            }}>Completed</button>
        </div>
    </div>
}
