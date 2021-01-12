import {taskReducer} from "./task-reducer";
import {AddTodolistAC, TodoListsReducer} from "./todolists-reducer";
import {TaskStateType, TodoListType} from "../App";


test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = AddTodolistAC("new todolist");

    const endTasksState = taskReducer(startTasksState, action);
    const endTodolistsState = TodoListsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});
