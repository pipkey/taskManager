import {filterTypeForTodo, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: filterTypeForTodo
    id: string
}


export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


const initialState:Array<TodoListType> = [];

export const TodoListsReducer = (state = initialState , action: ActionType): Array<TodoListType>=> {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id);

        case "ADD-TODOLIST":
            return [...state, {id: action.todolistId, title: action.title,filter: "all"}];

        case "CHANGE-TODOLIST-TITLE":

            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
                return [...state];
            }
            return state;

        case "CHANGE-TODOLIST-FILTER":
            let todolist1 = state.find(tl => tl.id === action.id);
            if (todolist1) {
                todolist1.filter = action.filter;
                return [...state]
            }

            return state;

        default:
            return state
    }
};


export const RemoveTodolistAC = (todoListId: string): RemoveTodolistActionType => (
    {type: "REMOVE-TODOLIST", id: todoListId});
export const AddTodolistAC = (newtitle: string): AddTodolistActionType => (
    {type: "ADD-TODOLIST", title: newtitle, todolistId: v1()});
export const ChangeTitleTodolistAC = (newtitle: string, newId: string): ChangeTodolistTitleActionType => (
    {type: "CHANGE-TODOLIST-TITLE", title: newtitle, id: newId});
export const ChangeFilterlistAC = (id: string, filter: filterTypeForTodo): ChangeTodolistFilterActionType => (
    {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter});