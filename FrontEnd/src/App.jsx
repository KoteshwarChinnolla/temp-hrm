import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";
import EmployeeSidebar from "./components/EmployeeSideBar";
import AdminSidebar from "./components/AdminSidebar";// <- import AdminSidebar
import TopNavbar from "./components/TopNavbar";

// All your components (imports same as before)
import TodayAttendence from "./components/TodayAttendence";
import AttendanceSheet from "./Components/AttendenceSheet";
import AttendancePage from "./Components/AttendancePage";
import LeadersPage from "./components/LeadersPage";
import Projects from "./components/Projects";
import AddProjects from "./components/AddProjects";

import ProjectDetails from "./Components/ProjectDetails";
import EmployeeManagement from "./Components/EmployeeManagement";
import Edit from "./Components/Edit";
import Calendar from "./Components/Calender";
import Contacts from "./components/Contacts";
import Dashboard from "./components/Dashboard";
import Departments from "./components/Departments";
import HolidayDashboard from "./components/Holidays";
import LeaveReport from "./components/LeaveReport";
import LeaveRequests from "./components/LeaveRequests";
import Payroll from "./components/Payroll";
import Leaves from "./components/Leaves";
import Settings from "./components/Settings";
import Team from "./components/Team";
import Project from "./components/Project";
import Chats from "./components/Chats";
import Contact from "./components/Contact";
import Calender from "./components/Calendar";
import Tasks from "./components/Tasks";
import PayEmp from "./components/PayEmp";
import AdminTraining from "./components/AdminTraining";
import EmpTraining from "./components/Courses";
import Shifts from "./components/Shifts";
import Assigntask from "./components/Assigntask";
import TeamLeadLeaveReq from "./components/TeamLeadLeaveReq";
import Shiftplanning from "./components/Shiftplanning";

export default function App() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [role, setRole] = useState(null); // <- this tracks the login role

  const toggleFullscreen = () => {
    console.log("Fullscreen toggled");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setRole={setRole} />} />

        <Route
          path="*"
          element={
            <div className="flex flex-col h-screen overflow-hidden">
              <TopNavbar
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                toggleFullscreen={toggleFullscreen}
              />
              <div className="flex flex-1 overflow-hidden">
                {role === "Admin" ? (
                  <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                ) :  role === "Team Lead" ?(
                  <EmployeeSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} isTeamLead={true}/>
                ):(
                  <EmployeeSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} isTeamLead={false}/>
                )}
                <main className="flex-1 p-4 overflow-auto bg-[#ecf0f4]">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/Empattendance" element={<AttendancePage />} />
                    <Route path="/leaves" element={<Leaves />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/slips" element={<PayEmp />} />
                    <Route path="/project" element={<Project />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/chat" element={<Chats />} />
                    <Route path="/contacts" element={<Contacts/>} />
                    <Route path="/calendar" element={<Calender />} />
                    <Route path="/Adminattendance" element={<TodayAttendence />} />
                    <Route path="/attendance/sheet" element={<AttendanceSheet />} />
                    <Route path="/leaders" element={<LeadersPage />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/add" element={<AddProjects />} />
                    <Route path="/training" element={<AdminTraining />} />
                    <Route path="/trainings" element={<EmpTraining />} />
                    <Route path="/shifts" element={<Shifts />} />
                    <Route path="/shiftad" element={<Shiftplanning />} />
                    <Route path="/teamleadleavereq" element={<TeamLeadLeaveReq/>} />
                    
                  
                    <Route path="/project/details" element={<ProjectDetails />} />
                    <Route path="/employees/all" element={<EmployeeManagement />} />
                    <Route path="/calender" element={<Calendar />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/leavemanagement" element={<LeaveRequests />} />
                    <Route path="/holidays" element={<HolidayDashboard />} />
                    <Route path="/payroll" element={<Payroll />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/reports" element={<LeaveReport />} />
                    <Route path="/assign" element={<Assigntask />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
