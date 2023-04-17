import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeFilter: (nextFilter: FilterValuesType) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = (props: TodoListPropsType) => {
    // const taskTitleInput = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTitle(e.currentTarget.value);
    }


    const addTaskHandler = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addTask(trimmedTitle);
        } else {
            setError(true);
        }
        setTitle("");
    }

    const tasksListItems: Array<JSX.Element> = props.tasks.map((t) => {
        const removeTask = () => props.removeTask(t.id);
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked);
        const taskClasses = t.isDone ? "task-isDone" : "task";
        return (
            <li>
                <div>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={changeTaskStatus}
                    />
                    <span className={taskClasses}>{t.title}</span>
                </div>
                <button onClick={removeTask}>X</button>
            </li>
        )
    });

    const titleMaxLength = 25;
    const isTitleLengthTooLong: boolean = title.length > titleMaxLength;
    const isAddBtnDisabled: boolean = !title.length || title.length > titleMaxLength;
    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div style={{color: "red"}}>Title is too long</div>
        : null;
    const userMessage = error
        ? <div style={{color: "red"}}>Title is required</div>
        : null;
    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter);
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && addTaskHandler();
    const inputClasses = error || isTitleLengthTooLong ? "input-error" : undefined;
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
                    className={inputClasses}

                />
                <button disabled={isAddBtnDisabled}
                        onClick={addTaskHandler}
                >+
                </button>
                {titleMaxLengthWarning || userMessage}
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div className={"filter-btn-wrapper"}>
                <button
                    onClick={handlerCreator("all")}
                    className={props.filter === "all" ? "filter-btn filter-btn-active" : "filter-btn"}

                >All
                </button>
                <button
                    className={props.filter === "active" ? "filter-btn filter-btn-active" : "filter-btn"}
                    onClick={handlerCreator("active")}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "filter-btn filter-btn-active" : "filter-btn"}
                    onClick={handlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;