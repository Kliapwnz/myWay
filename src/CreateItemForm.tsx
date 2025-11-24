import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import Button from '@mui/material/Button'
import {TextField} from "@mui/material";

type Props = {
   onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}: Props) => {
   const [itemTitle, setItemTitle] = useState("")
   const [error, setError] = useState<string | null>(null)

   const createItemHandler = () => {
      const trimmedTitle = itemTitle.trim()
      if (trimmedTitle !== '') {
         onCreateItem(trimmedTitle)
         setItemTitle('')
      } else {
         setError("Title is required")
      }
   }
   const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setItemTitle(event.currentTarget.value)
      setError(null)
   }
   const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
         createItemHandler()
      }
   }
   return (
      <div>
         <TextField label={'Enter a title'}
                    variant={'outlined'}
                    className={error ? 'error' : ""}
                    value={itemTitle}
                    size={'small'}
                    onChange={changeItemTitleHandler}
                    onKeyDown={createItemOnEnterHandler}
         />

         <Button variant="contained" onClick={createItemHandler}>+</Button>
         {error && <div className={"error-message"}>{error}</div>}
      </div>
   );
};

