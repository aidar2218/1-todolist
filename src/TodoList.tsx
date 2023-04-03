import React from "react";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string,
    tasks: TaskType[],
    removeTask: (taskId: number) => void,
    changeFilter: (nextFilter: FilterValuesType) => void
}

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = (props: TodoListPropsType) => {
    const tasksListItems: Array<JSX.Element> = props.tasks.map((t) => {
        return (
            <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{ t.title }</span>
                <button onClick={ () => props.removeTask(t.id) }>X</button>
            </li>
        )
    })

    console.log(props);
    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                { tasksListItems }
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;