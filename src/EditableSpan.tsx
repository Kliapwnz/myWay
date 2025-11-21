import React, {ChangeEvent, useState} from 'react';

type Props = {
   value: string
}

export const EditableSpan = ({value}: Props) => {
   const [title, setTitle] = useState(value)
   const [isEditMode, setIsEditMode] = useState(false)

   const turnOnEditMode = () => {
      setIsEditMode(true)
   }
   const turnOffEditMode = () => {
      setIsEditMode(false)
   }
   const ChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.currentTarget.value)
   }
   return (
      <>
         {isEditMode ? (
            <input value={title} onChange={ChangeTitle} onBlur={turnOffEditMode} autoFocus/>
         ) : (
            <span onDoubleClick={turnOnEditMode}>{value}</span>
         )}
      </>
   );
};

