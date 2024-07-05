import { ChangeEvent, MouseEvent } from 'react'

export interface IBoardWriteProps {
    isEdit : boolean
    data? : any
}

export  interface IMyvariables {
    number: number
    writer?: string
    title?: string
    contents?: string
}

export interface IBoardWriteUIProps {
    onClickUpdate: (event: MouseEvent<HTMLButtonElement>) => void
    onClickSubmit: (event: MouseEvent<HTMLButtonElement>) => void
    onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void
    onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void
    onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void
    onChangeContents: (event: ChangeEvent<HTMLInputElement>) => void
    isEdit: boolean
    data?: any 
}
