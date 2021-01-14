import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type  RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todoListId: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-STATUS"
    todoListId: string
    taskId: string
    isDone: boolean
}
export type ChangeTitleTaskActionType = {
    type: "CHANGE-TASK-TITLE"
    taskID: string,
    title: string,
    todoListId: string
}

export type ActionType = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTitleTaskActionType |
    RemoveTodolistActionType |
    AddTodolistActionType

const initialState:TaskStateType = {};

export const taskReducer = (state = initialState, action: ActionType) => {

    switch (action.type) {

        case "REMOVE-TASK": {
            let copyState = {...state};
            copyState[action.todoListId] = copyState[action.todoListId].filter(t => t.id !== action.taskId);
            return copyState;
        }
        case "ADD-TASK": {
            let task: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            };
            let copyState = {...state};
            copyState[action.todolistId] = [task, ...copyState[action.todolistId]];
            return copyState;
            //return {...state, [action.todolistId]: [task, ...state[action.todolistId]]}
        }
        case "CHANGE-STATUS": {
            return {
                ...state, [action.todoListId]: state[action.todoListId].map(t => {
                    if (t.id !== action.taskId) return t;
                    else return {...t, isDone: action.isDone}
                })
            };
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state, [action.todoListId]: state[action.todoListId].map(t => {
                    if (t.id !== action.taskID) return t;
                    else return {...t, title: action.title}
                })
            };
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state};
            delete copyState[action.id];
            return copyState
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []}
        }
        default:
           return state
    }
};

// Action Creaters
export const RemoveTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId: taskId, todoListId: todoListId}
};
export const AddTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
};
export const ChangeTaskStatusAC = (taskId: string, todoListId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: "CHANGE-STATUS", taskId, todoListId, isDone}
};
export const ChangeTitleTaskAC = (taskID: string, title: string, todoListId: string): ChangeTitleTaskActionType => {
    return {type: "CHANGE-TASK-TITLE", taskID, title, todoListId}
};
