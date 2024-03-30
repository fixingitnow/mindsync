import React from 'react';
import { Task } from './TaskEntry';

// Specify the type of the props object explicitly
type TaskViewProps = {
    task: Task;
    onDelete: Function;
};


const TaskView: React.FC<TaskViewProps> = ({ task, onDelete }) => {
    const { entry, duration } = task;

    return (
        <div className="relative bg-gray-100 p-4 rounded-md shadow-md mb-4">
            <div className="flex justify-end">
                <button onClick={() => onDelete(task)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <p className="text-gray-800"><strong>Task Entry:</strong> {entry}</p>
            <p className="text-gray-800"><strong>Duration:</strong> {duration} minutes</p>
        </div>
    );
};

export default TaskView;
