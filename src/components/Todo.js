import React, { useEffect, useRef, useState } from "react";

function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
        ref.current = value;
    })
    return ref.current;
}

function Todo(props) {
    const [isEditing, setEditing] = useState(false)
    const [newName, setNewName] = useState(props.name);

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    const wasEditing = usePrevious(isEditing)

    useEffect(()=>{
        // console.log("side effect");
        //点击编辑按钮后，这样自动让编辑输入框被focus，提高用户体验
        if(!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }
        //曾经编辑过，现在未编辑，才会focus当前
        if (wasEditing && !isEditing){
            editButtonRef.current.focus();
        }
    },[wasEditing,isEditing]);
    // console.log("main render");

    function handleChange(e) {
        setNewName(e.target.value);
    }

    // 点击编辑
    function handleEditing() {
        setEditing(true)
    }

    // 取消编辑
    function handleCancel() {
        setEditing(false)
        setNewName(props.name)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.editTask(props.id, newName);
        // setNewName("");
        setEditing(false);
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name is:
                </label>
                <input 
                    id={props.id} 
                    className="todo-text" 
                    type="text" 
                    value={newName}
                    onChange={handleChange}
                    ref={editFieldRef}
                    />
            </div>
            <div className="btn-group">
                <button 
                    type="button" 
                    className="btn todo-cancel"
                    onClick={handleCancel}
                    >
                    Cancel
                    <span className="visually-hidden">renaming {props.name}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Save
                    <span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className="btn-group">
                <button 
                    type="button" 
                    className="btn"
                    onClick={handleEditing}
                    ref={editButtonRef}
                    >
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => props.deleteTask(props.id)}>
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );


    return (
        <li className="todo">
            {isEditing ? editingTemplate : viewTemplate}    
        </li>
    );
}

export default Todo;