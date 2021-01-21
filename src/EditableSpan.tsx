import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";


type EditableSpanType = {
    title: string
    changeValue: (newValue: string) => void
}

const EditableSpan = React.memo((props: EditableSpanType) => {
    console.log("editable clicked");
    const [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>(props.title);

    const activatedEditMode = () => {
        setEditMode(true)
    };
    const deActivatedEditMode = () => {
        setEditMode(false);
        props.changeValue(title)
    };

    const ChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    };
    return (

        editMode
            ?
            <TextField
                value={title}
                onBlur={deActivatedEditMode}
                autoFocus={true}
                onChange={ChangeTitle}
            />

            :

            < span onClick={activatedEditMode}>
                    {props.title}</span>


    )
});


export default EditableSpan;