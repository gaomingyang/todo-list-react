import React,{ useState, useEffect } from "react";
import {nanoid} from "nanoid"
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function App(props) {
  // const [tasks,setTasks] = useState(props.tasks);
  const [tasks,setTasks] = useState([]);

  useEffect(()=>{
    //组件挂载时，从localStorage里面取数据
    const taskData = localStorage.getItem["todo_data"]
    if (taskData) {
      const parsedTasks = JSON.parse(taskData)
      setTasks(parsedTasks)
    }
  },[])

  //当task数据变化时，将数据异步写入到localStorage里面
  useEffect(()=>{
    localStorage.setItem('todo_data',JSON.stringify(tasks))
  },[tasks])

  const [filter, setFilter] = useState("All");
  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name == filter}
      setFilter={setFilter}
    />
  ));

  
  

  function addTask(name) {
    const newTask = {id:`todo-${nanoid()}`,name,completed:false};
    setTasks([...tasks,newTask])
  }

  function toggleTaskCompleted(id) {
    // console.log(id);
    const updatedTasks = tasks.map((task)=>{
      if (id === task.id) {
        //这部分需要研究一下
        return {...task,completed:!task.completed};
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    // console.log("delete task"+id);
    //filter这个的用法需要看一下
    const remainingTasks = tasks.filter((task)=> task.id != id);
    setTasks(remainingTasks);
  }

  function editTask(id,newName) {
    const editedTaskList = tasks.map((task)=>{
      if (task.id == id) {
        return {...task,name:newName};
      }
      return task;
    })
    setTasks(editedTaskList)
  }

 // You should always pass a unique key to anything you render with iteration. Nothing obvious will change in your browser, but if you do not use unique keys, React will log warnings to your console and your app may behave strangely!
  //这个问号需要弄明白
  // const taskList = props.tasks?.map((task) => (
  // const taskList = tasks?.map((task) => (
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>Todo List</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>

      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
