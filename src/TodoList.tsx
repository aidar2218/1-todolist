import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType

    removeTask: (taskId: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListID: string) => void

    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (nextFilter: FilterValuesType, todoListID: string) => void
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
            props.addTask(trimmedTitle, props.todoListID);
        } else {
            setError(true);
        }
        setTitle("");
    }
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListID);
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !isAddBtnDisabled && addTaskHandler();
    const removeTodoListHandler = () => props.removeTodoList(props.todoListID)

    const tasksListItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTask = () => props.removeTask(task.id, props.todoListID);
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID);
        const taskClasses = task.isDone ? "task-isDone" : "task";
        return (
            <li key={task.id}>
                <div>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={changeTaskStatus}
                    />
                    <span className={taskClasses}>{task.title}</span>
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
    const inputClasses = error || isTitleLengthTooLong ? "input-error" : undefined;
    return (
        <div className="todolist">
            <header className="todolist-header">
                <h2>{props.title}</h2>
                <button onClick={removeTodoListHandler}>x</button>
            </header>

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