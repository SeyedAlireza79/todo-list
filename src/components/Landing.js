import React, { useContext, useState } from 'react';

// Context
import { TaskContext } from '../context/TaskContextProvider';

function Landing() {
	const [task, setTask] = useState([]);
	const { state, dispatch } = useContext(TaskContext);
	const [search, setSearch] = useState();

	const changeHandler = (e) => {
		setTask(() => e.target.value);
		// console.log(state);
	};

	const searchHandler = (e) => {
		setSearch(() => e.target.value);
	};

	return (
		<div>
			<div>
				<input type="text" value={task} onChange={changeHandler} />
				<button onClick={() => dispatch({ type: 'ADD_TASK', payload: task })}>Add</button>
				<button onClick={() => dispatch({ type: 'REMOVE_TASK', payload: task })}>Remove</button>
			</div>
			<div>
				<input type="text" placeholder="Search task..." value={search} onChange={searchHandler} />
			</div>
			<div>
                {state.tasks.map(task => <p>{task}</p>)}
            </div>
		</div>
	);
}

export default Landing;
