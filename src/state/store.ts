import {taskReducer} from "./task-reducer";
import {combineReducers, createStore} from "redux";
import {TodoListsReducer} from "./todolists-reducer";


export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    task: taskReducer,
    todoList: TodoListsReducer
});

export const store = createStore(rootReducer);

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;