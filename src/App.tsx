import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {
    const title = "What to learn";
    const title2 = "What to buy";
    const truck2 = 100500;
    const truck3 = true;


    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "ReactJS1234", isDone: false},
    ]
    const tasks2 = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false}
    ]

    return (
        <div className="App">
            <TodoList title={title} truck2={truck2} tasks={tasks1}/>
            <TodoList title={title2} truck3={truck3} tasks={tasks2}/>
        </div>
    );
}

export default App;
