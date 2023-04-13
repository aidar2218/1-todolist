import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeFilter: (nextFilter: FilterValuesType) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = (props: TodoListPropsType) => {
    // const taskTitleInput = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState<string>("")

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle("");
    }

    const tasksListItems: Array<JSX.Element> = props.tasks.map((t) => {
        return (
            <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>X</button>
            </li>
        )
    });

    const titleMaxLength = 25;
    const isTitleLengthTooLong: boolean = title.length > titleMaxLength;
    const isAddBtnDisabled: boolean = !title.length || title.length > titleMaxLength;
    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div style={{color: "red"}}>Title is too long</div>
        : null;
    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter);
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && addTaskHandler();

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input
                    // ref={taskTitleInput}
                    placeholder="Please, enter holder"
                    value={title}
                    onChange={setTitleHandler}
                    onKeyDown={addTaskOnKeyPressHandler}
                />
                <button disabled={isAddBtnDisabled}
                        onClick={addTaskHandler}
                >+
                </button>
                {titleMaxLengthWarning}
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button onClick={handlerCreator("all")}>All</button>
                <button onClick={handlerCreator("active")}>Active</button>
                <button onClick={handlerCreator("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;