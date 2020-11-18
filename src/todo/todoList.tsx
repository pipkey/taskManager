import React, {ChangeEvent} from "react";
import {filterTypeForTodo, TaskType} from "../App";
import AddItemForm from "../AddItemForm";
import EditableSpan from "../EditableSpan";


export type TodoPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (titleID: string, todolistId: string) => void
    changeFilter: (newFilter: filterTypeForTodo, todolistID: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: filterTypeForTodo
    removeTodoList: (todolistId: string) => void
    changeTaskTitle:(id: string, title: string, todolistId: string) => void
    changeToDoTitle: (title:string, todolistID: string)=>void
}


const Todo = (props: TodoPropsType) => {

    //Кнопки all | active | completed
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    };
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    };
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    };
    //Удаление тасок
    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)

    };
    //Добавление Тасок
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    };
    const changeTodoListTitle = (title: string) => {
        props.changeToDoTitle(title, props.id)
    };

    return (
        <div className="todo_main">
            <h2>
                <EditableSpan title={props.title} changeValue={changeTodoListTitle}/>
                <button onClick={removeTodoListHandler}> - </button>
            </h2>

                <AddItemForm addItem={addTask}/>

            <ul>
                {
                    props.tasks.map(t => {
                        const removeTaskHandler = () => props.removeTask(t.id, props.id);

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newValue = e.currentTarget.checked;
                            props.changeStatus(t.id, newValue, props.id)
                        };
                        const changeTaskTitle = (newValue: string)=>{
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }


                        return <li className={t.isDone ? "isDone" : ""} key={t.id}>
                            <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>

                            <EditableSpan title={t.title} changeValue={changeTaskTitle}/>

                            <button onClick={removeTaskHandler}> x
                            </button>
                        </li>
                    })
                }
            </ul>


            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}> all
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}> active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}> complete
                </button>
            </div>
        </div>
    )
};

export default Todo;