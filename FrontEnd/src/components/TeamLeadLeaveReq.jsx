import React, { useMemo } from 'react'
import Table from './Table'
const leaveData = Array.from({ length: 30 }, (_, i) => ({
    empId: `EMP${String(i + 1).padStart(3, "0")}`,
    name: i % 2 === 0 ? "Janeh" : "Mark",
    department: i % 2 === 0 ? "Finance" : "HR",
    leaveType: i % 3 === 0 ? "Medical Leave" : i % 3 === 1 ? "Casual Leave" : "Annual Leave",
    leaveFrom: "01/10/2018",
    leaveTo: "01/14/2018",
    numDays: i % 5 + 1,
    duration: i % 2 === 0 ? "Full-day" : "Half-day",
    status: i % 3 === 0 ? "Approved" : i % 3 === 1 ? "Pending" : "Rejected",
    reason: i % 2 === 0 ? "High" : "Personal",
    requestedOn: "01/05/2018",
    approvedBy: i % 3 === 0 ? "Tom Johnson" : "—",
    approvalDate: i % 3 === 0 ? "01/07/2018" : "—",
    leavesTaken: 10 + (i % 5), // example: 10–14
    leavesRemaining: 20 - (i % 5),
  }));
  const leaveColumns = [
    { key: "empId", name: "Employee ID" },
    { key: "name", name: "Name" },
    { key: "department", name: "Department" },
    { key: "leaveType", name: "Leave Type" },
    { key: "leaveFrom", name: "Leave From" },
    { key: "leaveTo", name: "Leave To" },
    { key: "numDays", name: "Number of Days" },
    { key: "duration", name: "Duration" },
    { key: "status", name: "Status" },
    { key: "reason", name: "Reason" },
    { key: "requestedOn", name: "Requested On" },
    { key: "approvedBy", name: "Approved By" },
    { key: "approvalDate", name: "Approval Date" },
    { key: "leavesTaken", name: "Leaves Taken" },
    { key: "leavesRemaining", name: "Leaves Remaining" },
  ];
const TeamLeadLeaveReq = () => {
    const memoizedRows = useMemo(() => leaveData, [leaveData]);
    return (
    <div>
      <Table title="Leave Request" rows={memoizedRows} columns={leaveColumns} DialogOpen={true} TeamLead={true}/>
    </div>
  )
}

export default TeamLeadLeaveReq