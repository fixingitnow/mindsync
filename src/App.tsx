import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskEntry from './components/TaskEntry';

function App() {
  return (
    <div className="App">
      <section className="App-header">
        <TaskEntry text="Calling from App"></TaskEntry>
      </section>
    </div>
  );
}

export default App;
