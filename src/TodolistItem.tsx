import {FilterValues, Task, Todolist} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";


type Props = {
   todolist: Todolist
   tasks: Task[]
   deleteTask: (todolistId: string, taskId: string) => void
   changeFilter: (todolistId: string, filter: FilterValues) => void
   createTask: (todolistId: string, title: string) => void
   changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
   deleteTodolist: (todolistId: string) => void

}

export const TodolistItem = ({
                                todolist: {id, title, filter},
                                tasks,
                                deleteTask,
                                changeFilter,
                                createTask,
                                changeTaskStatus,
                                deleteTodolist
                             }: Props) => {

   const changeFilterHandler = (filter: FilterValues) => {
      changeFilter(id, filter)
   }
   const deleteTodolistHandler = () => {
      deleteTodolist(id)
   }

   return (
      <div>
         <div className={"container"}>
            <h3>{title}</h3>
            <Button title={"x"} onClick={deleteTodolistHandler}/>
         </div>

         {tasks.length === 0 ? (<p>Тасок нет</p>) : (
            <ul>
               {tasks.map(task => {
                  const deleteTaskHandler = () => {
                     deleteTask(id, task.id)
                  }
                  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                     const newStatusValue = e.currentTarget.checked
                     changeTaskStatus(id, task.id, newStatusValue)
                  }
                  return (
                     <li key={task.id}>
                        <input type="checkbox"
                               checked={task.isDone}
                               onChange={changeTaskStatusHandler}
                        />
                        <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                        <Button title={"X"} onClick={deleteTaskHandler}/>
                     </li>
                  )
               })}
            </ul>
         )}
         <div>
            <Button className={filter === "all" ? "btn-active" : ""}
                    title={"All"}
                    onClick={() => changeFilterHandler('all')}
            />
            <Button className={filter === "active" ? "btn-active" : ""}
                    title={"Active"}
                    onClick={() => changeFilterHandler('active')}/>
            <Button className={filter === "completed" ? "btn-active" : ""}
                    title={"Completed"}
                    onClick={() => changeFilterHandler('completed')}/>

         </div>

      </div>
   );
};

