import React, {KeyboardEvent, ChangeEvent, useState} from "react";

type AddItemFormType ={
    addItem: (title:string)=> void
}

function AddItemForm(props: AddItemFormType) {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const onTitleHandChanger = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
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


    return(

        <div className="Main_Input">
            <input
                value={title}
                onChange={onTitleHandChanger}
                onKeyPress={onKeyPressAddItem}
                className={error ? "error" : ""}
            />

            <button onClick={addItem}>
                +
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>

    )
}


export default AddItemForm