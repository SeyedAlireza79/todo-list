import React, { useContext, useEffect, useState } from 'react';

// Styles
import styles from './Landing.module.css';

// Icon
import { SlNote } from 'react-icons/sl';

// Context
import { TaskContext } from '../context/TaskContextProvider';
import Task from './Task';

function Landing() {
	const [task, setTask] = useState('');
	const [search, setSearch] = useState('');
	const [savedTasks, setSavedTasks] = useState([]);

	const { state, dispatch } = useContext(TaskContext);

	useEffect(() => {
		const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
		setSavedTasks(tasksFromLocalStorage);
	}, []);

	const changeHandler = (e) => {
		setTask(() => e.target.value);
	};

	const searchHandler = (e) => {
		setSearch(() => e.target.value);
	};

	// const searchedTask = state.tasks.filter((item) => item.task.toLowerCase().includes(search.toLowerCase()));
	const searchedTask = state.tasks
		.concat(savedTasks)
		.filter((item) => item.task.toLowerCase().includes(search.toLowerCase()));

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(state.tasks));
		setTask('');
	}, [state]);

	const keyDownHandler = (e) => {
		if (e.key === 'Enter') dispatch({ type: 'ADD_TASK', payload: task.trim() });
	};

	return (
		<div className={styles.container}>
			<h1>Todo list</h1>
			<div className={styles.searchBox}>
				<input type="text" placeholder="Search todos..." value={search} onChange={searchHandler} />
			</div>
			<div className={styles.addTaskContainer}>
				<input onKeyDown={keyDownHandler} placeholder="What Todo?" type="text" value={task} onChange={changeHandler} />
				<button onClick={() => dispatch({ type: 'ADD_TASK', payload: task.trim() })}>
					<SlNote className={styles.addTaskIcon} />
				</button>
			</div>
			<div className={styles.taskContainer}>
				{searchedTask
					.slice()
					.reverse()
					.map((object, index) => (
						<Task key={index} data={object} taskState={task} />
					))}
			</div>
		</div>
	);
}

export default Landing;
