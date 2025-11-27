import type {Todolist} from '../App'
import {FilterValues} from "../App";

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
   switch (action.type) {
      case "delete_todolist" : {
         return state.filter(todolist => todolist.id !== action.payload.id)
      }
      case "add_todolist" : {
         const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: "all"}
         return [...state, newTodolist]
      }
      case "change_todolist_title" : {
         return state.map(todolist => todolist.id === action.payload.todolistId ? {
            ...todolist,
            title: action.payload.title
         } : todolist)
      }
      case "change_todolist_filter" : {
         return state.map(todolist => todolist.id === action.payload.todolistId ? {
            ...todolist,
            filter: action.payload.filter
         } : todolist)
      }
      default:
         return state
   }
}


export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (id: string): DeleteTodolistActionType => {
   return {type: 'delete_todolist', payload: {id}} as const
}
export type addTodolistType = ReturnType<typeof addTodolistAc>
export const addTodolistAc = (title: string): addTodolistType => {
   return {type: "add_todolist", payload: {title}} as const

}
export type changeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string): changeTodolistTitleType => {
   return {
      type: "change_todolist_title", payload: {
         todolistId, title
      }
   } as const

}
export type changeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValues): changeTodolistFilterType => {
   return {
      type: "change_todolist_filter",
      payload: {
         todolistId, filter
      }
   } as const
}


type Actions = DeleteTodolistActionType | addTodolistType | changeTodolistTitleType | changeTodolistFilterType