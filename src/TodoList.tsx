import React from "react";

type TodoListPropsType = {
    title: string
    truck2?: number
    truck3?: boolean
    tasks: TaskType[]
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <h3>{props.truck2}</h3>
            <h3>{props.truck3}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((el, index) => {
                    return (
                        <li key={index}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}