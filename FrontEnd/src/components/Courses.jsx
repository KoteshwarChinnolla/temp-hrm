import React, { useState } from "react";
import { FaHome } from "react-icons/fa"; // Importing Home icon

const courses = [
  {
    id: 1,
    title: "React JS Crash Course",
    description:
      "Learn React basics including components, props, state, and hooks in this beginner friendly tutorial.",
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

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
     
      

      {/* Heading */}

      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4">
             <h1
               className="py-4 text-3xl md:text-4xl"
               style={{ fontFamily: "Times New Roman, serif" }}
             >
               Courses
             </h1>
             <div className="flex flex-wrap gap-2 items-center text-sm md:text-lg">
               <a href="/dashboard">
                 <FaHome className="text-base md:text-lg" />
               </a>
               <span>&gt;</span>
               <span>Home</span>
               <span>&gt;</span>
               <span>Courses</span>
             </div>
           </div>
     

      <div className="flex items-center justify-between mb-6">
      <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
    
      </div>

      {/* Courses grid */}
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
                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Watch Now
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;