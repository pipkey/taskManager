import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormType) {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const onTitleHandChanger = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value)
    };

    const onKeyPressAddItem = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === "Enter") {
            addItem()
        }
    };

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("")
        } else {
            setError("НАПИШИ НОРМАЛЬНО!!!");
        }
    };


    return (

        <div className="Main_Input">
            <TextField
                variant={"outlined"}
                label={"Set Value"}
                value={title}
                onChange={onTitleHandChanger}
                onKeyPress={onKeyPressAddItem}
                error={!!error}
                helperText={error}
            />

            <IconButton onClick={addItem} color={"primary"}>
                <AddCircle/>
            </IconButton>

        </div>

    )
}


export default AddItemForm