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
	const [search, setSearch] = useState();

	const { state, dispatch } = useContext(TaskContext);

	const changeHandler = (e) => {
		setTask(() => e.target.value);
	};

	const searchHandler = (e) => {
		setSearch(() => e.target.value);
	};

	useEffect(() => {
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
					<SlNote />
				</button>
			</div>
			<div className={styles.taskContainer}>
				{state.tasks
					.slice()
					.reverse()
					.map((object) => (
						<Task key={state.tasks.indexOf(object)} data={object} taskState={task} />
					))}
			</div>
		</div>
	);
}

export default Landing;
