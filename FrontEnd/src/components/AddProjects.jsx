import React, { useState } from "react";
//import './index.css'; // or './tailwind.css'

const AddProjects = () => {
    const [formData, setFormData] = useState({
        projectId: "",
        title: "",
        department: "",
        priority: "",
        client: "",
        price: "",
        startDate: "",
        endDate: "",
        team: "",
        status: "Running",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Project:", formData);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">Add Project</h2>
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Project ID */}
                    <div>
                        <input
                            type="text"
                            name="projectId"
                            placeholder="Project ID*"
                            value={formData.projectId}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                            required
                        />
                    </div>

                    {/* Project Title */}
                    <div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Project Title*"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                            required
                        />
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block font-medium mb-1">Department*</label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                            required
                        >
                            <option value="">Select</option>
                            <option value="Development">Development</option>
                            <option value="Marketing">Marketing</option>
                            <option value="HR">HR</option>
                        </select>
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="block font-medium mb-1">Project Priority*</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                            required
                        >
                            <option value="">Select</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    {/* Client */}
                    <div>
                        <input
                            type="text"
                            name="client"
                            placeholder="Client*"
                            value={formData.client}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price*"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                            required
                        />
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="block font-medium mb-1">Start Date*</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                            required
                        />
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block font-medium mb-1">End Date*</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                            required
                        />
                    </div>

                    {/* Team */}
                    <div className="md:col-span-2">
                        <label className="block font-medium mb-1">Team*</label>
                        <select
                            name="team"
                            value={formData.team}
                            onChange={handleChange}
                            className="w-full border p-2 rounded-md"
                            required
                        >
                            <option value="">Select Team</option>
                            <option value="Jens Brincker">Jens Brincker</option>
                            <option value="Jay Soni">Jay Soni</option>
                            <option value="Mark Hay">Mark Hay</option>
                            <option value="Airi Satou">Airi Satou</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div className="md:col-span-2">
                        <label className="block font-medium mb-2">Work Status:</label>
                        <div className="flex flex-wrap gap-4">
                            {["Active", "Completed", "Running", "Pending", "Not Started", "Canceled"].map((status) => (
                                <label key={status} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="radio"
                                        name="status"
                                        value={status}
                                        checked={formData.status === status}
                                        onChange={handleChange}
                                    />
                                    {status}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block font-medium mb-1 mt-4">Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Type here..."
                            className="w-full border p-3 rounded-md"
                        />
                    </div>

                    {/* Upload */}
                    <div className="md:col-span-2">
                        <label className="block font-semibold mb-1">Upload Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="w-full border border-dashed border-gray-400 p-3 rounded-md"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-6 justify-center sm:justify-start">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="w-full sm:w-auto px-6 py-3 rounded-full bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition"
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddProjects;