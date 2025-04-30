import React, { useState } from "react";
import {Trash2} from 'lucide-react';


const initialCourses = [
  {
    id: 1,
    title: "React JS Crash Course For Beginers",
    description:
      "Learn React basics including components, props, state, and hooks in this beginner friendly tutorial and it is helpful for everyone.",
    image: "https://img.youtube.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
  },
  {
    id: 2,
    title: "Tailwind CSS Full Course",
    description:
      "Master Tailwind CSS utility-first framework for fast and responsive web design with real-world examples.",
    image: "https://img.youtube.com/vi/dFgzHOX84xQ/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=dFgzHOX84xQ",
  },
  {
    id: 3,
    title: "JavaScript Tutorial for Beginners",
    description:
      "Understand the fundamentals of JavaScript: variables, functions, arrays, objects, and DOM manipulation.",
    image: "https://img.youtube.com/vi/hdI2bqOjy3c/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
  },
];

const AdminTraining = () => {
    const [isClosing, setIsClosing] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [courses, setCourses] = useState(initialCourses);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
        setModalOpen(false);
        setIsClosing(false);
        setNewCourse({ title: "", description: "", image: "", link: "" });
      }, 100);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addCourse = () => {
    if (!newCourse.title || !newCourse.description || !newCourse.image || !newCourse.link) {
      alert("Please fill all fields.");
      return;
    }
    setCourses((prev) => [...prev, { id: Date.now(), ...newCourse }]);
    closeModal();
  };

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#ecf0f4] p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Courses
        </h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={openModal}
        >
          Add Course
        </button>
      </div>

      {/* Search */}
      <div className="flex  mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div>
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex gap-2 ">
                   <a
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-sm shadow-md hover:opacity-90 transition"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <div className="flex flex-col items-start leading-tight">
                            <span>WATCH NOW</span>
                        </div>
                    </a>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                      onClick={() => deleteCourse(course.id)}>
                        <Trash2 size={13} className="text-gray-500" />
                        <span>Remove</span>
                    </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No courses found.</p>
        )}
      </div>

      {/* Modal */}
      {(modalOpen || isClosing) && (
         <div className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 
            transition-opacity duration-300 ${isClosing ? 'bg-opacity-0' : 'bg-black/20'}`}>
            <div className={`bg-white p-6 rounded-lg shadow-md w-96 transition-all duration-300 
              transform ${isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="border border-gray-300 p-2 mb-4 w-full"
              value={newCourse.title}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="border border-gray-300 p-2 mb-4 w-full"
              value={newCourse.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              className="border border-gray-300 p-2 mb-4 w-full"
              value={newCourse.image}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="link"
              placeholder="Video URL"
              className="border border-gray-300 p-2 mb-4 w-full"
              value={newCourse.link}
              onChange={handleInputChange}
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mr-2"
                onClick={addCourse}
              >
                Add
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTraining;