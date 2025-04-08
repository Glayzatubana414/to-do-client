import { useState } from "react";

export default function AddModal({ hide, addTask }) {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([""]); // Initialize with one empty task

  // Add a new task input field
  const addTasks = () => {
    setTasks((prevTasks) => [...prevTasks, ""]);
  };

  // Remove a task input field
  const removeTasks = (index) => {
    if (tasks.length > 1) {
      setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    const nonEmptyTasks = tasks.filter((task) => task.trim());
    if (nonEmptyTasks.length === 0) {
      alert("Please add at least one task.");
      return;
    }

    // Pass the title and tasks to the parent component
    addTask({ title, tasks: nonEmptyTasks });
    hide(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">ABOUT YOUR TOOL</h3>
          <button
            onClick={hide}
            id="closeModalButton"
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <svg
              className="h-4 w-4 inline-block ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Task title"
            />
          </div>

          {/* Tasks List */}
          <div>
            <label htmlFor="list" className="block text-sm font-medium text-gray-700">
              Task Lists
            </label>
            <div className="space-y-2">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={task}
                    onChange={(e) =>
                      setTasks((prevTasks) =>
                        prevTasks.map((t, i) => (i === index ? e.target.value : t))
                      )
                    }
                    placeholder={`Task ${index + 1}`}
                    className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label={`Task ${index + 1}`}
                  />
                  {tasks.length > 1 && (
                    <button
                      onClick={() => removeTasks(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                      aria-label={`Delete task ${index + 1}`}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add Task Button */}
          <button
            onClick={addTasks}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            aria-label="Add new task"
          >
            Add Task
          </button>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
              aria-label="Save task list"
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
