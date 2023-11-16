import React, { createContext, useReducer } from 'react';

const initialState = {
	tasks: [],
};

export const TaskContext = createContext();

const generateId = (num) => {
	return (Math.random() * num * 5).toFixed(5);
};

const taskReducer = (state, action) => {
	console.log(state, action);
	switch (action.type) {
		case 'ADD_TASK':
			if (action.payload && !state.tasks.includes(action.payload)) {
				// state.tasks.push({ task: action.payload, id: generateId(action.payload.length) });
				state.tasks.push( action.payload );
			}
            return {
                ...state
            }
		case 'REMOVE_TASK':
            const newTasks = state.tasks.filter(task => task !== action.payload)
            return {
                ...state,
                tasks: [...newTasks]
            }

		default:
			return state;
	}
};

function TaskContextProvider({ children }) {
	const [state, dispatch] = useReducer(taskReducer, initialState);
	return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;

}

export default TaskContextProvider;
