import React, {useCallback} from "react";
import "./App.css";
import Todo from "./todo/todoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddTodolistAC, ChangeFilterlistAC, ChangeTitleTodolistAC, RemoveTodolistAC} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTitleTaskAC, RemoveTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TaskStateType, TodoListType} from "./App";
import {AppRootStateType} from "./state/store";

export type filterTypeForTodo = "all" | "active" | "completed"

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoList);
    const tasksObj = useSelector<AppRootStateType, TaskStateType>(state => state.task);
    const dispatch = useDispatch();

    // let todolistId1 = v1();
    // let todolistId2 = v1();
    // let todolistId3 = v1();

    // let [todoLists, dispatchTodoLists] = useReducer(TodoListsReducer, [
    //     {id: todolistId1, title: "what to eat", filter: "all"},
    //     {id: todolistId2, title: "what to read", filter: "all"},
    //     {id: todolistId3, title: "who are learn", filter: "all"}
    // ]);
    //
    // let [tasksObj, dispatchToTasks] = useReducer(taskReducer, {
    //     [todolistId1]: [
    //         {id: v1(), title: "milk", isDone: true},
    //         {id: v1(), title: "bread", isDone: false},
    //         {id: v1(), title: "fish", isDone: false},
    //         {id: v1(), title: "beer", isDone: true},
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "book", isDone: true},
    //         {id: v1(), title: "magazine", isDone: false},
    //     ],
    //     [todolistId3]: [
    //         {id: v1(), title: "React", isDone: false},
    //         {id: v1(), title: "Redux", isDone: true},
    //         {id: v1(), title: "JavaScript", isDone: true},
    //     ]
    // });

    //добавление тасок
    const addTask = useCallback((title: string, todolistId: string) => {
        const action = AddTaskAC(title, todolistId);
        dispatch(action);
    }, [])


    //Добавление ТуДуЛиста
    const addToDoList = useCallback((title: string) => {
        let action = AddTodolistAC(title);
        dispatch(action);
    }, [dispatch]);

    //Удаление тасок
    const removeTask = useCallback((titleID: string, todolistId: string) => {
        let action = RemoveTaskAC(titleID, todolistId);
        dispatch(action);
    }, [])

    //функция фильтра todolist
    const changeFilter = useCallback((newFilter: filterTypeForTodo, todolistID: string) => {
        const action = ChangeFilterlistAC(todolistID, newFilter);
        dispatch(action);
    }, [])

    const changeToDoTitle = useCallback((title: string, todolistID: string) => {
        const action = ChangeTitleTodolistAC(title, todolistID);
        dispatch(action);
    }, [])

    //Изменение статуса TRUE or FALSE
    const changeStatus = useCallback((taskID: string, isDone: boolean, todolistId: string) => {
        const action = ChangeTaskStatusAC(taskID, todolistId, isDone);
        dispatch(action);
    }, []);

    //Редактирование Названия Тасок
    const changeTaskTitle = useCallback((taskID: string, title: string, todolistId: string) => {
        const action = ChangeTitleTaskAC(taskID, title, todolistId);
        dispatch(action);
    }, []);

    //Удаление ТудуЛитсов
    const removeTodoList = useCallback((todolistId: string) => {
        const action = RemoveTodolistAC(todolistId);
        dispatch(action)
    }, []);

    return (
        <div className="App">

            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>

            </AppBar>

            <Container fixed>

                <Grid container style={{margin: "20px"}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>

                <Grid container spacing={5}>

                    {
                        todoLists.map((tl) => {
                            let taskForTodolist = tasksObj[tl.id];

                            // if (tl.filter === "active") {
                            //     // taskForTodo = taskForTodo.filter(t => t.isDone === false)
                            //     taskForTodo = taskForTodo.filter(t => !t.isDone)
                            // }
                            // if (tl.filter === "completed") {
                            //     // taskForTodo = taskForTodo.filter(t => t.isDone === true)
                            //     taskForTodo = taskForTodo.filter(t => t.isDone)
                            // }

                            return (
                                <Grid item>
                                    <Paper style={{padding: "20px"}}>
                                        <Todo
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={taskForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeToDoTitle={changeToDoTitle}
                                        />
                                    </Paper>
                                </Grid>)
                        })
                    }

                </Grid>

            </Container>
        </div>
    );
}

export default AppWithRedux;
