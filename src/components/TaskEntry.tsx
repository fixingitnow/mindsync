import React, { useEffect, useState } from 'react';
import TaskView from './TaskView';
import { v4 } from 'uuid';

export type Task = {
    entry: string;
    duration: string;
};

const getSessionID = () => {
    let currentID = localStorage.getItem('sessionID')
    let sessionID = currentID ? currentID : v4()
    localStorage.setItem('sessionID', sessionID)
    return sessionID
}

// const serverURL = 'http://localhost:8787'
const serverURL = "https://my-worker.pradeepsai-aseblr.workers.dev/"

const TaskEntry = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [entry, setEntry] = useState('');
    const [duration, setDuration] = useState('30');
    const [sessionID, setSessionID] = useState('');

    const handleEntryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEntry(e.target.value);
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDuration(e.target.value);
    };

    // Get request response from cloudflare worker
    // [{"taskname":"testTaskName6_subtask","taskdescription":"testTaskDescription3","taskduration":"30min"},{"taskname":"testTaskName6_subtask_2","taskdescription":"testTaskDescription3","taskduration":"30min"}]

    // Post request body while calling cloudflare
    // {"sessionid":"testSessionId6", "taskname":"testTaskName6","taskdescription":"testTaskDescription3","taskduration":"30min"}

    // Delete request body while calling cloudflare
    // { "sessionid": "testSessionId6", "taskname": "testTaskName6"}

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: Task = { entry, duration };
        // Make HTTP request to Cloudflare Worker to store the task in KV
        try {
            const response = await fetch(`${serverURL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionid: sessionID,
                    // modify this to be unique
                    taskname: newTask.entry,
                    taskdescription: newTask.entry,
                    taskduration: newTask.duration,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to add task');
            }
            // Update local state with the new task
            setTasks([newTask, ...tasks]); // Add new task to the beginning of the tasks array
            setEntry(''); // Clear input field after submission
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    useEffect(() => {
        setSessionID(getSessionID)
    }, [])

    useEffect(() => {
        // Fetch tasks associated with the session ID from Cloudflare KV
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${serverURL}/tasks/${sessionID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data = await response.json();
                if (data && data.length > 0) {
                    const mappedTasks = data.map((task: any) => ({
                        entry: task.taskdescription,
                        duration: task.taskduration,
                    }));
                    setTasks(mappedTasks);
                } else {
                    setTasks([]);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [sessionID]);

    // TODO: use supsense for fallback ui
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
