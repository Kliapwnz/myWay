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

}

export const TodolistItem = ({
                                todolist: {id, title, filter},
                                tasks,
                                deleteTask,
                                changeFilter,
                                createTask,
                                changeTaskStatus
                             }: Props) => {
   const [taskTitle, setTaskTitle] = useState("")
   const [error, setError] = useState<string | null>(null)

   const createTaskHandler = () => {
      const trimmedTitle = taskTitle.trim()
      if (trimmedTitle !== '') {
         createTask(id, trimmedTitle)
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
   const changeFilterHandler = (filter: FilterValues) => {
      changeFilter(id, filter)
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

