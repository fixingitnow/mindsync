import React, { useState } from 'react';
import TaskView from './TaskView';

export type Task = {
    entry: string;
    duration: string;
};

const TaskEntry = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [entry, setEntry] = useState('');
    const [duration, setDuration] = useState('30');

    const handleEntryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEntry(e.target.value);
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDuration(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: Task = { entry, duration };
        setTasks([newTask, ...tasks]); // Add new task to the beginning of the tasks array
        setEntry(''); // Clear input field after submission
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-blue-300 p-4 rounded-md shadow-md mr-4" onSubmit={handleSubmit}>
                <label className="block mb-2">
                    <span className="text-lg font-semibold">Task Entry:</span>
                    <textarea className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" rows={4} value={entry} onChange={handleEntryChange}></textarea>
                </label>
                <label className="block mb-2">
                    <span className="text-lg font-semibold">Select Time Duration:</span>
                    <select className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" value={duration} onChange={handleDurationChange}>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="180">3 hours</option>
                        <option value="240">4 hours</option>
                    </select>
                </label>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                    Add Task
                </button>
                <p className="text-sm text-gray-600 mt-2">Hint: Enter your task here, select the duration, and click "Add Task" to add it to the list.</p>
            </form>
            <div className="flex flex-col">
                {tasks.map((task, index) => (
                    <TaskView key={index} task={task} />
                ))}
            </div>
        </div>
    );
};

export default TaskEntry;
