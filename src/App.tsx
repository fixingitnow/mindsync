import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskEntry from './components/TaskEntry';

function App() {
  return (
    <div className="flex bg-blue-600">
      <TaskEntry text="Calling from App"></TaskEntry>
    </div>
  );
}

export default App;
