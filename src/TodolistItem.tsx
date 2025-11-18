import {FilterValues, Task} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";


type Props = {
   title: string
   tasks: Task[]
   filter: FilterValues
   deleteTask: (taskId: string) => void
   changeFilter: (filter: FilterValues) => void
   createTask: (title: string) => void
   changeTaskStatus: (taskId: string, isDone: boolean) => void

}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask, changeTaskStatus, filter}: Props) => {
   const [taskTitle, setTaskTitle] = useState("")
   const [error, setError] = useState<string | null>(null)

   const createTaskHandler = () => {
      const trimmedTitle = taskTitle.trim()
      if (trimmedTitle !== '') {
         createTask(trimmedTitle)
         setTaskTitle('')
      } else {
         setError("Title is required")
      }
   }
   const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setTaskTitle(event.currentTarget.value)
      setError(null)
   }
   const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
         createTaskHandler()
      }
   }

   return (
      <div>
         <h3>{title}</h3>
         <div>
            <input value={taskTitle}
                   onChange={changeTaskTitleHandler}
                   onKeyDown={createTaskOnEnterHandler}
            />
            <Button title="+"
                    onClick={createTaskHandler}
            />
            {error && <div className={"error-message"}>{error}</div>}
         </div>
         {tasks.length === 0 ? (<p>Тасок нет</p>) : (
            <ul>
               {tasks.map(task => {
                  const deleteTaskHandler = () => {
                     deleteTask(task.id)
                  }
                  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                     const newStatusValue = e.currentTarget.checked
                     changeTaskStatus(task.id, newStatusValue)
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
                    onClick={() => changeFilter('all')}
            />
            <Button className={filter === "active" ? "btn-active" : ""}
                    title={"Active"}
                    onClick={() => changeFilter('active')}/>
            <Button className={filter === "completed" ? "btn-active" : ""}
                    title={"Completed"}
                    onClick={() => changeFilter('completed')}/>

         </div>

      </div>
   );
};

