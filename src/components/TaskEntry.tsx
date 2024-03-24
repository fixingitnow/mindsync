import React, { useState } from 'react';

type PropsType = {
    text: string;
}

const TaskEntry = () => {
    const [duration, setDuration] = useState('30 min')

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-blue-300 p-4 rounded-md shadow-md">
                <label className="block mb-2">
                    <span className="text-lg font-semibold">Task Entry:</span>
                    <textarea className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" rows={4}></textarea>
                </label>
                <p className="text-sm text-gray-600 mt-2">Hint: Enter your task here and click "Add Task" to add it to the list.</p>
                <label className="block mb-2">
                    <span className="text-lg font-semibold">Select Time Duration:</span>
                    <select className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" value={duration} onChange={(e) => setDuration(e.target.value)}>
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
            </form>
        </div>
    );
}

export default TaskEntry;
