import { useEffect, useState } from "react";
import axios from "axios";
import AddModal from "../components/AddModal";

function Todo() {
  const [titles, setTitles] = useState([]); // Titles fetched from API
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [tasks, setTasks] = useState({
    ongoing: [],
    done: [],
  });

  // Fetch titles from API
  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await axios.get(`${process.env.ENDPOINT_URL}/get-titles`);
        setTitles(response.data.titles);
        // Optionally initialize ongoing tasks with fetched titles
        setTasks((prev) => ({ ...prev, ongoing: response.data.titles }));
      } catch (error) {
        console.error("Error fetching titles:", error);
      }
    };
    fetchTitles();
  }, []);

  // Function to add a new task
  const addTask = (newTask, category = "ongoing") => {
    setTasks((prev) => ({
      ...prev,
      [category]: [...prev[category], newTask],
    }));
  };

  // Function to move a task between categories (e.g., ongoing -> done)
  const moveTask = (task, fromCategory, toCategory) => {
    setTasks((prev) => {
      const updatedFrom = prev[fromCategory].filter((t) => t !== task);
      const updatedTo = [...prev[toCategory], task];
      return {
        ...prev,
        [fromCategory]: updatedFrom,
        [toCategory]: updatedTo,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    const newTask = e.target.task.value; // Get the new task from the input field
    if (newTask.trim()) {
      addTask(newTask); // Add the new task to the ongoing category
      e.target.reset(); // Reset the form input field after submission
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-pink-900 via-pink-800  flex justify-center items-center">
      <div className="w-[650px] h-[600px] bg-gray-700 rounded-lg shadow-lg p-8 flex flex-col justify-between">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8">
          TO-DO LIST
        </h2>
        <div className="grid grid-cols-2 gap-8">
          {/* Loop through the categories: ongoing and done */}
          {Object.keys(tasks).map((category) => (
            <div
              key={category}
              className="bg-gray-800 p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-white mb-4 text-center">
                {category.toUpperCase()}
              </h3>
              <ul className="space-y-3">
                {/* Display tasks for this category */}
                {tasks[category].map((task, index) => (
                  <li
                    key={index}
                    className="p-3 bg-gray-700 text-center rounded-md cursor-pointer text-white hover:bg-pink-500 transition duration-300"
                    onClick={() =>
                      category === "ongoing" &&
                      moveTask(task, "ongoing", "done")
                    }
                  >
                    {task}
                  </li>
                ))}
              </ul>
              {/* Add Task Button inside the Ongoing category */}
              {category === "ongoing" && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-pink-400 text-white py-2 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300"
                  >
                    Add Task
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Modal Component - toggled based on showModal state */}
        {showModal && (
          <AddModal
            hide={() => setShowModal(false)}
            addTask={(newTask) => {
              addTask(newTask);
              setShowModal(false);
            }}
          />
        )}
        {/* Task form for adding new task directly */}
        <form onSubmit={handleSubmit} className="mt-6 flex justify-between">
          <input
            type="text"
            name="task"
            placeholder="Enter new task"
            className="w-[80%] p-4 border-2 border-pink-700 rounded-md bg-pink-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="w-[18%] bg-pink-500 text-white p-4 rounded-md ml-2 hover:bg-pink-600 transition duration-200"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Todo;

