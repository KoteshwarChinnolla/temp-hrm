import React, { useState } from "react";

const AddProject = () => {
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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Add Projects</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Project ID */}
          <div>
            <label className="block font-medium mb-1" ></label>
            <input
              type="text"
              name="projectId"
              placeholder="project ID*"
              value={formData.projectId}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          {/* Project Title */}
          <div>
            <label className="block font-medium mb-1"></label>
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

          {/* Project Priority */}
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
            <label className="block font-medium mb-1"></label>
            <input
              type="text"
              name="client"
              placeholder="client*"
              value={formData.client}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium mb-1"></label>
            <input
              type="number"
              name="price"
              placeholder="price*"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          {/* Project Start Date */}
          <div>
            <label className="block font-medium mb-1">Project Start Date*</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          {/* Project End Date */}
          <div>
            <label className="block font-medium mb-1">Project End Date*</label>
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
              <option value="Team Alpha">Jens Brincker</option>
              <option value="Team Alpha">Jay soni</option>
              <option value="Team Beta">Mark Hay</option>
              <option value="Team Gamma">Airi Satou</option>
            </select>
          </div>

          {/* Work Status */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-2">Work Status:</label>
            <div className="flex flex-wrap gap-6">
              {["Active", "Completed", "Running", "Pending", "Not Started", "Canceled"].map(
                (status) => (
                  <label key={status} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={formData.status === status}
                      onChange={handleChange}
                    />
                    {status}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1 mt-4">Descriptions:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Type here..."
              className="w-full border p-3 rounded-md"
            />
          </div>

          {/* Submit */}
          <div>
          <label className="block font-semibold mb-1">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="block w-full border border-dashed border-gray-400 p-3 rounded-lg"
          />
        </div>

        <div className="flex gap-4 mt-4">
  <button
    type="submit"
    className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all"
  >
    Submit
  </button>
  <button
    type="button"
    className="px-6 py-3 rounded-full bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition-all"
  >
    Cancel
  </button>
</div>

        </form>
      </div>
    </div>
  );
};

export default AddProject;