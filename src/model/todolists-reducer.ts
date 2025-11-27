import type {Todolist} from '../App'

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
   switch (action.type) {
      case "delete_todolist" : {
         return state.filter(todolist => todolist.id !== action.payload.id)
      }
      case "add_todolist" : {
         return state
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
export const addTodolistAc=(title:string): addTodolistType=> {
   return {type:"add_todolist", payload:{title}} as const

}


type Actions = DeleteTodolistActionType | addTodolistType