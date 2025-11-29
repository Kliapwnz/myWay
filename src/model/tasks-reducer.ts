import type {TasksState} from '../App'
import {addTodolistType, DeleteTodolistActionType} from "./todolists-reducer";

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
      default:
         return state
   }
}
export type deleteTaskType = ReturnType<typeof deleteTaskAC>
export const deleteTaskAC = (todolistId: string, taskId: string): deleteTaskType => {
   return {type: "delete_task", payload: {todolistId, taskId}} as const

}

type Actions = addTodolistType | DeleteTodolistActionType

