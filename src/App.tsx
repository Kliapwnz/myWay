import './App.css'
import {TodolistItem} from "./TodolistItem";

export type Task = {
   id: number,
   title: string,
   isDone: boolean

}
export const App = () => {
   let tasks: Task[] = [
      {id: 1, title: 'HTML&CSS', isDone: true},
      {id: 2, title: 'JS', isDone: true},
      {id: 3, title: 'ReactJS', isDone: false},
   ]
   const deleteTask = (taskId: number) => {
      tasks = tasks.filter(task => {
         return task.id !== taskId
      })
      console.log(tasks)
   }

   return (
      <div className="app">
         <TodolistItem title="What to learn"
                       tasks={tasks}
                       deleteTask={deleteTask}
         />
      </div>
   )
}


