import type {TasksState} from '../App'
import {addTodolistType, DeleteTodolistActionType} from "./todolists-reducer";
import {v1} from "uuid";


const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
   switch (action.type) {
      case 'add_todolist': {
         return {...state, [action.payload.id]: []}
      }
      case "delete_todolist": {
         const newState = {...state}
         delete newState[action.payload.id]
         return newState
      }
      case "delete_task" : {
         return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
         }
      }
      case "add_task" : {
         return {
            ...state,
            [action.payload.todolistId]: [{
               id: v1(),
               title: action.payload.title,
               isDone: false
            }, ...state[action.payload.todolistId]]
         }
      }
      case "change_task_status" : {
         return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId]
               .map(task => task.id === action.payload.taskId ? {
                  ...task,
                  isDone: action.payload.isDone
               } : task)
         }
      }
      case "change_task_title" : {
         return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId]
               .map(task => task.id === action.payload.taskId ? {
                  ...task,
                  title: action.payload.title

               } : task)
         }
      }
      default:
         return state
   }
}
export type DeleteTaskType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (todolistId: string, taskId: string): DeleteTaskType => {
   return {type: "delete_task", payload: {todolistId, taskId}} as const

}
export type CreateTaskType = ReturnType<typeof createTaskAC>
export const createTaskAC = (todolistId: string, title: string): CreateTaskType => {
   return {type: "add_task", payload: {todolistId, title}} as const
}
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusType => {
   return {type: "change_task_status", payload: {todolistId, taskId, isDone}} as const
}
export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (payload:{todolistId: string, taskId: string, title: string}): ChangeTaskTitleType => {
   return {type: "change_task_title", payload} as const
}

type Actions =
   addTodolistType
   | DeleteTodolistActionType
   | DeleteTaskType
   | CreateTaskType
   | ChangeTaskStatusType
   | ChangeTaskTitleType

