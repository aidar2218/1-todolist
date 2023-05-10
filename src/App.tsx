import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

// CRUD
// Create
// Read (filter, search, sort, pagination)
// Update
// Delete


type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListID: string]: TaskType[]
}

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, setTodoLists] = useState <TodoListType[]>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS/ES6&TS", isDone: true},
            {id: v1(), title: "REACT/REDUX", isDone: true}
        ],
        [todoListID_2]: [
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "MEAT", isDone: true},
            {id: v1(), title: "BREAD", isDone: true}
        ],
    });



    const removeTask = (taskId: string, todoListID: string) => {
        const updatedTasks = tasks[todoListID].filter(t => t.id !== taskId);
        setTasks({...tasks, [todoListID]: updatedTasks});
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        const updatedTasks = [newTask, ...tasks[todoListID]];
        setTasks({...tasks, [todoListID]: updatedTasks});
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoListID: string) => {
        const updatedTasks = tasks[todoListID].map(t => t.id === taskId
            ? {...t, isDone: newIsDoneValue}
            : t);
        setTasks({...tasks, [todoListID]: updatedTasks});
    }
    const changeTodoListFilter = (nextFilter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID
            ? {...tl, filter: nextFilter}
            : tl
        ));
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        const copy = {...tasks}
        delete copy[todoListID];
        setTasks(copy);
    }

    const getTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasksList.filter(t => !t.isDone);
            case "completed":
                return tasksList.filter(t => t.isDone);
            default:
                return tasksList;
        }
    }

    const todoListsComponents: JSX.Element[] = todoLists.map(tl => {
        const tasksWhatIWantToSee = getTasksForRender(tasks[tl.id], tl.filter);
        return (
            <TodoList
                key={tl.id}
                todoListID={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={tasksWhatIWantToSee}

                addTask={addTask}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                changeTaskStatus={changeTaskStatus}
                changeTodoListFilter={changeTodoListFilter}
            />
        )
    })

    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
