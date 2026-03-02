import { useState } from "react"
import '../Todo.css'
export default function Todo() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [index, setIndex] = useState();

    function InputChange(e) {
        setNewTask(e.target.value);
        console.log(e.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }
    function UpdTask() {
        const updatedTasks = [...tasks]
        updatedTasks[index] = newTask
        setTasks(updatedTasks)
        setNewTask("")
        setIndex(undefined)

    }
    function editTask(index) {
        const updatedTasks = [...tasks]
        const value = updatedTasks[index]
        console.log(value)
        setNewTask(value)
        setIndex(index)
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks)
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks)
        }

    }
    return (
        <>
            <div className="To-Do">
                <h1>To-Do-List</h1>
                <input type="text"
                    placeholder="Enter A Task..."
                    value={newTask}
                    onChange={InputChange}
                />
                {
                    index !== undefined ?
                        (<button className="addBtn" onClick={UpdTask}>UPDATE</button>) :
                        (<button className="addBtn" onClick={addTask}>ADD</button>)
                }
            </div>
            <div className="List">
                <ul>{
                    tasks.map((task, index) =>
                        <li key={index}>
                            <span className="text">{task}</span>
                            <button
                                className="changeBtn"
                                onClick={() => editTask(index)}>
                                Edit
                            </button>
                            <button
                                className="changeBtn"
                                onClick={() => deleteTask(index)}>
                                Delete
                            </button>
                            <button
                                className="moveBtn"
                                onClick={() => moveTaskUp(index)}>
                                ⬆
                            </button>
                            <button
                                className="moveBtn"
                                onClick={() => moveTaskDown(index)}>
                                ⬇
                            </button>
                        </li>
                    )}</ul>
            </div>
        </>
    )
}
