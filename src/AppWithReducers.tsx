import React, {useState} from "react";
import "./App.css";
import {v1} from "uuid";
import Todo from "./todo/todoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type TodoListType = {
    id: string
    title: string
    filter: filterTypeForTodo
}


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type filterTypeForTodo = "all" | "active" | "completed"

function AppWithReducers() {


    //добавление тасок
    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;

        setTasks({...tasksObj})

    }

    //Добавление ТуДуЛиста
    function addToDoList(title: string) {
        const newToDoID = v1();
        const newTodoList: TodoListType = {
            id: newToDoID,
            title: title,
            filter: "all"
        };
        setTodoLists([...todoLists, newTodoList]);
        setTasks({...tasksObj, [newToDoID]: []})
    }

    //Удаление тасок
    function removeTask(titleID: string, todolistId: string) {
        let task = tasksObj[todolistId];
        let filtredTask = task.filter(t => t.id !== titleID);
        tasksObj[todolistId] = filtredTask;
        setTasks({...tasksObj})
    }
    //функция фильтра тасок

    function changeFilter(newFilter: filterTypeForTodo, todolistID: string) {

        let todolist = todoLists.find(tl => tl.id === todolistID);
        if (todolist) {
            todolist.filter = newFilter
        }
        setTodoLists([...todoLists])
    }

    function changeToDoTitle(title: string, todolistID: string) {

        let todolist = todoLists.find(tl => tl.id === todolistID);
        if (todolist) {
            todolist.title = title
        }
        setTodoLists([...todoLists])
    }

    //Изменение статуса TRUE or FALSE
    function changeStatus(taskID: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskID);

        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }

    //Редактирование Названия Тасок
    function changeTaskTitle(taskID: string, title: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskID);

        if (task) {
            task.title = title;
            setTasks({...tasksObj})
        }
    }


    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1();


    //Массив тудулистов
    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: "what to eat", filter: "all"},
        {id: todolistId2, title: "what to read", filter: "all"},
        {id: todolistId3, title: "who are learn", filter: "all"}
    ]);

    //Удаление ТудуЛитсов
    let removeTodoList = (todolistId: string) => {
        let filterdTodolists = todoLists.filter(tl => tl.id !== todolistId);
        setTodoLists(filterdTodolists);


        delete tasksObj[todolistId];
        setTasks({...tasksObj})
    };

    let [tasksObj, setTasks] = useState<TaskStateType>({
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

export default AppWithReducers;
