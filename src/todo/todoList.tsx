import React, {useCallback} from "react";
import {filterTypeForTodo, TaskType} from "../App";
import AddItemForm from "../AddItemForm";
import EditableSpan from "../EditableSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


export type TodoPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (newFilter: filterTypeForTodo, todolistID: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: filterTypeForTodo
    removeTodoList: (todolistId: string) => void
    removeTask: (titleID: string, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeToDoTitle: (title: string, todolistID: string) => void
}


const Todo = React.memo((props: TodoPropsType) => {
    console.log("Todo clicked");
    let taskForTodo = props.tasks;

    if (props.filter === "active") {
        // taskForTodo = taskForTodo.filter(t => t.isDone === false)
        taskForTodo = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        // taskForTodo = taskForTodo.filter(t => t.isDone === true)
        taskForTodo = props.tasks.filter(t => t.isDone)
    }
    //Кнопки all | active | completed
    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props.changeFilter, props.id]);


    //Удаление тасок
    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)

    };
    //Добавление Тасок
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id]);
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeToDoTitle(title, props.id)
    }, [props.changeToDoTitle, props.id]);

    return (
        <div className="todo_main">
            <h2>
                <EditableSpan title={props.title} changeValue={changeTodoListTitle}/>

                <IconButton onClick={removeTodoListHandler}>
                    <Delete/>
                </IconButton>

            </h2>

            <AddItemForm addItem={addTask}/>

            <div>
                {
                    props.tasks.map(t =>
                        <Task
                        changeStatus = {props.changeStatus}
                        changeTaskTitle = {props.changeTaskTitle}
                        removeTask = {props.removeTask}
                        t = {t}
                        todolistId = {props.id}
                        key = {t.id}
                    />)

                }
            </div>


            <div>

                <ButtonGroup color="primary" aria-label="outlined secondary button group">
                    <Button onClick={onAllClickHandler}
                            variant={props.filter === "all" ? "contained" : "outlined"}
                    > All
                    </Button>

                    <Button onClick={onActiveClickHandler}
                            variant={props.filter === "active" ? "contained" : "outlined"}
                    > Active
                    </Button>

                    <Button onClick={onCompletedClickHandler}
                            variant={props.filter === "completed" ? "contained" : "outlined"}
                    > Complete
                    </Button>
                </ButtonGroup>

            </div>
        </div>
    )
});


export default Todo;