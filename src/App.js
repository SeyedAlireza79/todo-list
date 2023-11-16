import './App.css';
import Landing from './components/Landing';
import TaskContextProvider from './context/TaskContextProvider';

function App() {
	return (
		<div className="App">
			<TaskContextProvider>
				<Landing />
			</TaskContextProvider>
		</div>
	);
}

export default App;
