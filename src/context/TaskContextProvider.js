import React, { createContext, useReducer } from 'react';

const initialState = {
	tasks: [],
};

export const TaskContext = createContext();

const taskReducer = (state, action) => {
	const getTimeDate = (date) => {
		const timeInMilisec = date.getTime();
		const dayMonthYear = date.toDateString().split(' ');
		const hour = date.getHours().toString().padStart(2, 0);
		const minute = date.getMinutes().toString().padStart(2, 0);
		const showDate = { day: dayMonthYear[2], month: dayMonthYear[1], year: dayMonthYear[3], hour, minute, timeInMilisec };
		return showDate;
	};
	console.log(state, action);
	switch (action.type) {
		case 'ADD_TASK':
			const date = new Date();
			if (action.payload && state.tasks.every((task) => task.task !== action.payload)) {
				state.tasks.push({ task: action.payload.charAt(0).toUpperCase() + action.payload.slice(1), isDone: false, addDate: getTimeDate(date) });
			}
			return {
				...state,
			};

		case 'REMOVE_TASK':
			const newTasks = state.tasks.filter((task) => task.task.trim() !== action.payload);
			return {
				...state,
				tasks: [...newTasks],
			};
			

		default:
			return state;
	}
};

function TaskContextProvider({ children }) {
	const [state, dispatch] = useReducer(taskReducer, initialState);
	return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
}

export default TaskContextProvider;
