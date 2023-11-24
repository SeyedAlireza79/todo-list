import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContextProvider';

// Icon
import { RiDeleteBinLine } from "react-icons/ri";

// Styles
import styles from './Task.module.css';

const Task = ({ data }) => {
	const { year, month, day, hour, minute } = data.addDate;
	const { state, dispatch } = useContext(TaskContext);

	const checkDay = () => {
		const now = new Date().toDateString().split(' ');
		const nowMonth = now[1];
		const nowDay = now[2];
		if (nowMonth === month && nowDay === day) return 'today';
		if (nowMonth === month && nowDay - 1 === day) return 'yesterday';
		else {
			return `${day} ${month}`;
		}
	};

	return (
		<div className={styles.container}>
			<h3>{data.task}</h3>
			<div className={styles.rightSide}>
				<div className={styles.timeContainer}>
					<p>{`${checkDay()}, ${hour}:${minute}`}</p>
				</div>
				<button onClick={() => dispatch({ type: 'REMOVE_TASK', payload: data.task })}><RiDeleteBinLine /></button>
			</div>
		</div>
	);
};

export default Task;
