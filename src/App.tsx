import './App.css'
import {TodolistItem} from "./TodolistItem";
import {useReducer, useState} from "react";
import {v1} from 'uuid'
import {CreateItemForm} from "./CreateItemForm";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Container, Grid, Paper,} from "@mui/material";
import {containerSx} from "./TodolistItem.styles";
import {NavButton} from "./NavButton";
import {
   addTodolistAc,
   changeTodolistFilterAC,
   changeTodolistTitleAC,
   deleteTodolistAC,
   todolistsReducer
} from "./model/todolists-reducer";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, tasksReducer} from "./model/tasks-reducer";


export type Task = {
   id: string,
   title: string,
   isDone: boolean

}
export type Todolist = {
   id: string
   title: string
   filter: FilterValues
}
export type TasksState = {
   [key: string]: Task[]
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
   const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [])
   const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})
   const deleteTask = (todolistId: string, taskId: string) => {
      dispatchToTasks(deleteTaskAC(todolistId, taskId))
   }
   const changeFilter = (todolistId: string, filter: FilterValues) => {
      dispatchTodolists(changeTodolistFilterAC(todolistId, filter))
   }

   const createTask = (todolistId: string, title: string) => {
      dispatchToTasks(createTaskAC(todolistId, title))
   }
   const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
      dispatchToTasks(changeTaskStatusAC(todolistId, taskId, isDone))
   }
   const deleteTodolist = (todolistId: string) => {
      const action =deleteTodolistAC(todolistId)
      dispatchTodolists(action)
      delete tasks[todolistId]
   }
   const createTodolist = (title: string) => {
      const action = addTodolistAc(title)
      dispatchTodolists(action)
      dispatchToTasks(action)
   }
   const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
      dispatchToTasks(changeTaskTitleAC(todolistId, taskId, title))
   }
   const changeTodolistTitle = (todolistId: string, title: string) => {
      dispatchTodolists(changeTodolistTitleAC(todolistId, title))
   }


   return (

      <div className="app">
         <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar>
               <Container maxWidth={'lg'} sx={containerSx}>
                  <IconButton color="inherit">
                     <MenuIcon/>
                  </IconButton>
                  <div>
                     <NavButton>Sign in</NavButton>
                     <NavButton>Sign up</NavButton>
                     <NavButton background={'dodgerblue'}>KLIApwnz</NavButton>
                  </div>

               </Container>
            </Toolbar>
         </AppBar>
         <Container maxWidth={'lg'}>
            <Grid container sx={{mb: '30px'}}>
               <CreateItemForm onCreateItem={createTodolist}/>
            </Grid>
            <Grid container spacing={4}>
               {todolists.map(todolist => {
                  const todolistTasks = tasks[todolist.id]
                  let filteredTasks = todolistTasks
                  if (todolist.filter === 'active') {
                     filteredTasks = todolistTasks.filter(task => !task.isDone)
                  }
                  if (todolist.filter === 'completed') {
                     filteredTasks = todolistTasks.filter(task => task.isDone)
                  }
                  return (
                     <Grid key={todolist.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                           <TodolistItem key={todolist.id}
                                         title={todolist.title}
                                         tasks={filteredTasks}
                                         deleteTask={deleteTask}
                                         changeFilter={changeFilter}
                                         createTask={createTask}
                                         changeTaskStatus={changeTaskStatus}
                                         todolist={todolist}
                                         deleteTodolist={deleteTodolist}
                                         changeTaskTitle={changeTaskTitle}
                                         changeTodolistTitle={changeTodolistTitle}


                           />
                        </Paper>
                     </Grid>
                  )
               })}
            </Grid>
         </Container>
      </div>

   )
}


