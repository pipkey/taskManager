import React, {useReducer} from "react";
import "./App.css";
import {v1} from "uuid";
import Todo from "./todo/todoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeFilterlistAC,
    ChangeTitleTodolistAC,
    RemoveTodolistAC,
    TodoListsReducer
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTitleTaskAC, RemoveTaskAC, taskReducer} from "./state/task-reducer";

export type filterTypeForTodo = "all" | "active" | "completed"

function AppWithRedux() {

    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1();

    let [todoLists, dispatchTodoLists] = useReducer(TodoListsReducer, [
        {id: todolistId1, title: "what to eat", filter: "all"},
        {id: todolistId2, title: "what to read", filter: "all"},
        {id: todolistId3, title: "who are learn", filter: "all"}
    ]);

    let [tasksObj, dispatchToTasks] = useReducer(taskReducer, {
        [todolistId1]: [
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "bread", isDone: false},
            {id: v1(), title: "fish", isDone: false},
            {id: v1(), title: "beer", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "book", isDone: true},
            {id: v1(), title: "magazine", isDone: false},
        ],
        [todolistId3]: [
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: true},
            {id: v1(), title: "JavaScript", isDone: true},
        ]
    });

    //добавление тасок
    function addTask(title: string, todolistId: string) {
        const action = AddTaskAC(title, todolistId);
        dispatchToTasks(action);
    }

    //Добавление ТуДуЛиста
    function addToDoList(title: string) {
        let action = AddTodolistAC(title);
        dispatchTodoLists(action);
        dispatchToTasks(action);
    }

    //Удаление тасок
    function removeTask(titleID: string, todolistId: string) {
        let action = RemoveTaskAC(titleID, todolistId);
        dispatchToTasks(action);
    }

    //функция фильтра todolist
    function changeFilter(newFilter: filterTypeForTodo, todolistID: string) {
        const action = ChangeFilterlistAC(todolistID, newFilter);
        dispatchTodoLists(action);
    }

    function changeToDoTitle(title: string, todolistID: string) {
        const action = ChangeTitleTodolistAC(title, todolistID);
        dispatchTodoLists(action);
    }

    //Изменение статуса TRUE or FALSE
    function changeStatus(taskID: string, isDone: boolean, todolistId: string) {
        const action = ChangeTaskStatusAC(taskID, todolistId, isDone);
        dispatchToTasks(action);
    }

    //Редактирование Названия Тасок
    function changeTaskTitle(taskID: string, title: string, todolistId: string) {
        const action = ChangeTitleTaskAC(taskID, title, todolistId);
        dispatchToTasks(action);
    }

    //Удаление ТудуЛитсов
    let removeTodoList = (todolistId: string) => {
        const action = RemoveTodolistAC(todolistId);
        dispatchTodoLists(action);
        dispatchToTasks(action)
    };

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

                            //Фильтрация тасок
                            let taskForTodo = tasksObj[tl.id];

                            if (tl.filter === "active") {
                                taskForTodo = taskForTodo.filter(t => t.isDone === false)
                            }
                            if (tl.filter === "completed") {
                                taskForTodo = taskForTodo.filter(t => t.isDone === true)
                            }

                            return (<Grid item>
                                <Paper style={{padding: "20px"}}>
                                    <Todo
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={taskForTodo}
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
