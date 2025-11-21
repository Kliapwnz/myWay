import './App.css'
import {TodolistItem} from "./TodolistItem";
import {useState} from "react";
import {v1} from 'uuid'


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
export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
   const todolistId1 = v1()
   const todolistId2 = v1()
   const [todolists, setTodolists] = useState<Todolist[]>([
      {id: todolistId1, title: 'What to learn', filter: 'all'},
      {id: todolistId2, title: 'What to buy', filter: 'all'},
   ])
   const [tasks, setTasks] = useState({
         [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
         ],
         [todolistId2]: [
            {id: v1(), title: 'Man city', isDone: true},
            {id: v1(), title: 'Inter', isDone: false},
         ],
      }
   )
   const deleteTask = (todolistId: string, taskId: string) => {
      const todolistTasks = tasks[todolistId]
      const newTodolistTasks = todolistTasks.filter(task => task.id !== taskId)
      tasks[todolistId] = newTodolistTasks
      setTasks({...tasks})
   }
   const changeFilter = (todolistId: string, filter: FilterValues) => {
      setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
   }

   const createTask = (title: string) => {
      const newTask = {id: v1(), title, isDone: false}
      const newTasks = [newTask, ...tasks]
      setTasks(newTasks)
   }
   const changeTaskStatus = (taskId: string, isDone: boolean) => {
      const newState = tasks.map(task => task.id == taskId ? {...task, isDone} : task)
      setTasks(newState)
   }


   return (
      <div className="app">
         {todolists.map(todolist => {
            let filteredTasks = tasks
            if (todolist.filter === 'active') {
               filteredTasks = tasks.filter(task => !task.isDone)
            }
            if (todolist.filter === 'completed') {
               filteredTasks = tasks.filter(task => task.isDone)
            }
            return (
               <TodolistItem key={todolist.id}
                             title={todolist.title}
                             tasks={filteredTasks}
                             deleteTask={deleteTask}
                             changeFilter={changeFilter}
                             createTask={createTask}
                             changeTaskStatus={changeTaskStatus}
                             todolist={todolist}

               />
            )
         })}

      </div>
   )
}


