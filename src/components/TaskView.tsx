import React from 'react';
import { Task } from './TaskEntry';

// Specify the type of the props object explicitly
type TaskViewProps = {
    task: Task;
};

const TaskView: React.FC<TaskViewProps> = ({ task }) => {
    const { entry, duration } = task;

    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-2">Task Details:</h2>
            <p><strong>Task Entry:</strong> {entry}</p>
            <p><strong>Duration:</strong> {duration} minutes</p>
        </div>
    );
};

export default TaskView;
