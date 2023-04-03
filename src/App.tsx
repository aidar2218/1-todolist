import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todoListTitle: string = "What to learn";

    const [tasks, setTasks] = useState <Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS/ES6&TS", isDone: true},
        {id: 3, title: "REACT/REDUX", isDone: false}
    ]);

    const[filter, setFilter] = useState<FilterValuesType>("completed");

    const changeFilter = (nextFilter: FilterValuesType) => {
        setFilter(nextFilter);
    }

    const removeTask = (taskId: number) => {
        setTasks (tasks.filter (t => t.id !== taskId))
    }

    const getTasksForMe = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasks.filter(t => t.isDone === false);
            case "completed":
                return tasks.filter(t => t.isDone === true);
            default:
                return tasks;
        }
    }

    const tasksWhatIWantToSee = getTasksForMe(tasks, filter);

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksWhatIWantToSee}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
