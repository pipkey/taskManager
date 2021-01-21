import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "../EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../App";

type TaskPropsType = {
    removeTask: (titleID: string, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    t: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const removeTaskHandler = () => props.removeTask(props.t.id, props.todolistId);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = e.currentTarget.checked;
        props.changeStatus(props.t.id, newValue, props.todolistId)
    };
    const changeTaskTitle = useCallback((newValue: string) => {
        props.changeTaskTitle(props.t.id, newValue, props.todolistId)
    }, [props.changeTaskTitle, props.todolistId, props.t.id]);


    return <div className={props.t.isDone ? "isDone" : ""} key={props.t.id}>
        <Checkbox onChange={onChangeHandler} checked={props.t.isDone}/>

        <EditableSpan title={props.t.title} changeValue={changeTaskTitle}/>
        <IconButton onClick={removeTaskHandler}>
            <Delete/>
        </IconButton>
    </div>
});