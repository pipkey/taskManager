import React, {ChangeEvent} from "react";
import {filterTypeForTodo, TaskType} from "../App";
import AddItemForm from "../AddItemForm";
import EditableSpan from "../EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeToDoTitle: (title: string, todolistID: string) => void
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

                <IconButton onClick={removeTodoListHandler}>
                    <Delete/>
                </IconButton>

            </h2>

            <AddItemForm addItem={addTask}/>

            <div>
                {
                    props.tasks.map(t => {
                        const removeTaskHandler = () => props.removeTask(t.id, props.id);

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newValue = e.currentTarget.checked;
                            props.changeStatus(t.id, newValue, props.id)
                        };
                        const changeTaskTitle = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        };


                        return <div className={t.isDone ? "isDone" : ""} key={t.id}>
                            <Checkbox onChange={onChangeHandler} checked={t.isDone}/>

                            <EditableSpan title={t.title} changeValue={changeTaskTitle}/>
                            <IconButton onClick={removeTaskHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    })
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
};

export default Todo;