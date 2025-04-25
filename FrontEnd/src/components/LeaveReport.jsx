import Table from './Table'
import React, { useMemo } from 'react';

const leaveData = Array.from({ length: 30 }, (_, i) => ({
  empId: `EMP${String(i + 1).padStart(3, "0")}`,
  name: i % 3 === 0 ? "John Deo" : i % 3 === 1 ? "Jane Smith" : "Aisha Khan",
  department: i % 3 === 0 ? "Testing" : i % 3 === 1 ? "Development" : "Marketing",
  leaveType: i % 4 === 0 ? "Medical Leave" : i % 4 === 1 ? "Casual Leave" : i % 4 === 2 ? "Annual Leave" : "Sick Leave",
  numberofdays: `${(i % 5) + 1}`,
  remainingleaves: `${10 + (i % 5)}`,
  totalleaves: `${18 + (i % 4) * 2}`,
  totaltaken: `${4 + (i % 6)}`,
  "Carry Over": `${(i % 6) + 1}`
}));


const leaveColumns=[
  { key: "empId", name: "Employee ID" },
  { key: "name", name: "Name" },
  { key: "department", name: "Department" },
  { key: "leaveType", name: "Leave Type" },
  { key: "numberofdays", name: "Number of days" },
  { key: "remainingleaves", name: "Remaining Leaves" },
  { key: "totalleaves", name: "Total Leaves" },
  { key: "totaltaken", name: "Total Taken" },
  { key: "Carry Over", name: "Carry Over" },
];


// Main Component
const LeaveReport = () => {
  const memoizedRows = useMemo(() => leaveData, [leaveData]);
  
  return (
    <div className="p-6">
      <Table rows={memoizedRows} columns={leaveColumns} title='Leave Report' DialogOpen={false}/>
    </div>
  );
};

export default LeaveReport;