import React, { useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import anasolLogo from "../assets/Anasol_logo11.png"; // Replace with your actual logo path

const PayslipView = () => {
  const payslipRef = useRef();

  const item = {
    employee: "John Doe",
    empid: "1001",
    designation: "Software Engineer",
    department: "Technology Services",
    phoneNo: "9876543200",
    bankAccountName: "John Doe",
    bankAccountNo: "12345678900",
    gender: "Male",
    panNo: "ABCDE1000F",
    pfNo: "PF2000",
    ifscCode: "ANSL000100",
    email: "john.doe@anasol.com",
    month: "March 2025",
    status: "Paid",
    salary: "₹80,000",
  };

  const basic = parseFloat(item.salary.replace(/[^0-9.-]+/g, ""));
  const hra = Math.round(basic * 0.4);
  const personal = Math.round(basic * 0.2);
  const remote = 3000;
  const books = 3000;
  const professional = 15000;
  const conveyance = 2734;
  const pf = 4161;
  const tax = 200;
  const gross = basic + hra + personal + remote + books + professional + conveyance;
  const deductions = pf + tax;
  const net = gross - deductions;

  // Start download
  const handleDownload = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(16);
    doc.text("ANASOL CONSULTANCY SERVICES PVT LTD", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text("Salary Slip - " + item.month, 105, 25, { align: "center" });
    
    // Employee Info
    doc.setFontSize(10);
    doc.text("Employee Information", 14, 35);
    autoTable(doc, {
      startY: 38,
      margin: { left: 14 },
      head: [["Field", "Value"]],
      body: [
        ["Employee Name", item.employee],
        ["Employee ID", item.empid],
        ["Designation", item.designation],
        ["Department", item.department],
        ["Phone No", item.phoneNo],
        ["Email", item.email],
        ["Bank A/C Name", item.bankAccountName],
        ["Bank A/C No", item.bankAccountNo],
        ["Gender", item.gender],
        ["PAN No", item.panNo],
        ["PF No", item.pfNo],
        ["IFSC Code", item.ifscCode],
        ["Month", item.month],
        ["Status", item.status],
      ],
    });
    
    // Salary Details
    doc.text("Salary Details", 14, doc.lastAutoTable.finalY + 10);
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 13,
      margin: { left: 14 },
      head: [["Earnings", "Amount", "Deductions", "Amount"]],
      body: [
        ["Basic", basic, "P.F.", pf],
        ["HRA", hra, "Profession Tax", tax],
        ["Personal Allowance", personal, "", ""],
        ["Remote Working", remote, "", ""],
        ["Books & Journals", books, "", ""],
        ["Professional Pursuit", professional, "", ""],
        ["Conveyance", conveyance, "", ""],
        ["Gross Earnings", gross, "Total Deductions", pf + tax],
      ],
    });
    
    // Net Pay
    doc.setFontSize(12);
    doc.setTextColor(0, 102, 204);
    doc.text(`Net Pay: ₹ ${net.toLocaleString()}/-`, 14, doc.lastAutoTable.finalY + 15);
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(
      "#1016, 11th Floor, DSL Abacus IT Park, Uppal Hyderabad-500039 | Ph: 9032091726",
      14,
      290
    );
    
    // Save PDF
    doc.save(`${item.employee}_Salary_Slip.pdf`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      {/* Payslip Display */}
      <div
        ref={payslipRef}
        className="bg-[#fcfcfc] p-8 max-w-[1050px] mx-auto border border-gray-300 shadow-md text-[13px] text-gray-900 font-sans"
      >
        {/* Header */}
        <div className="bg-[#002060] text-white p-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold">ANASOL CONSULTANCY SERVICES PVT LTD</h1>
            <h2 className="text-sm font-medium mt-1">SALARY SLIP</h2>
          </div>
          <div className="bg-white rounded-full p-1">
            <img
              src={anasolLogo}
              alt="logo"
              className="w-14 h-14 object-contain"
              crossOrigin="anonymous"
            />
          </div>
        </div>

        {/* Employee Info */}
        <div className="mt-6">
          <h3 className="text-[#002060] font-bold mb-2">Employee Information</h3>
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 bg-[#f8f9fa] p-4 rounded-md border">
            {[ 
              ["Employee Name", item.employee], 
              ["Employee ID", item.empid], 
              ["Designation", item.designation], 
              ["Department", item.department], 
              ["Phone No", item.phoneNo], 
              ["Email", item.email], 
              ["Bank A/C Name", item.bankAccountName], 
              ["Bank A/C No", item.bankAccountNo], 
              ["Gender", item.gender], 
              ["PAN No", item.panNo], 
              ["PF No", item.pfNo], 
              ["IFSC Code", item.ifscCode], 
              ["Month", item.month], 
              ["Status", item.status], 
            ].map(([label, value]) => (
              <div key={label}>
                <strong>{label}:</strong> {value}
              </div>
            ))}
          </div>
        </div>

        {/* Salary Details */}
        <div className="mt-6">
          <h3 className="text-[#002060] font-bold mb-2">Salary Details</h3>
          <div className="grid grid-cols-4 text-xs bg-[#f0f2f5] font-semibold px-3 py-2 border-t border-b">
            <div className="col-span-2">EARNINGS</div>
            <div className="col-span-2">DEDUCTIONS</div>
          </div>
          <div className="grid grid-cols-4 divide-x border-b text-sm">
            <div className="col-span-2 p-4">
              {[ 
                ["BASIC", basic], 
                ["HOUSE RENT ALLOWANCE", hra], 
                ["PERSONAL ALLOWANCE", personal], 
                ["REMOTE WORKING ALLOWANCE", remote], 
                ["BOOKS AND JOURNALS", books], 
                ["PROFESSIONAL PURSUIT", professional], 
                ["CONVEYANCE ALLOWANCE", conveyance] 
              ].map(([label, value]) => (
                <div className="flex justify-between mb-1" key={label}>
                  <span>{label}</span>
                  <span>₹ {value.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold mt-2 border-t pt-2">
                <span>GROSS EARNINGS</span>
                <span>₹ {gross.toLocaleString()}</span>
              </div>
            </div>
            <div className="col-span-2 p-4 bg-gray-50">
              <div className="flex justify-between mb-1">
                <span>P.F.</span>
                <span>₹ {pf.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>PROFESSION TAX</span>
                <span>₹ {tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold mt-2 border-t pt-2">
                <span>TOTAL DEDUCTIONS</span>
                <span>₹ {deductions.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Net Pay */}
        <div className="mt-6 bg-[#002060] text-white px-6 py-4 rounded-md">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>NET PAY</span>
            <span>₹ {net.toLocaleString()}/-</span>
          </div>
          <div className="mt-1 text-xs italic">
            (RUPEES EIGHTY EIGHT THOUSAND EIGHT HUNDRED SEVENTY SIX ONLY)
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-gray-600 border-t mt-6 pt-4">
          #1016, 11th Floor, DSL Abacus IT Park, Uppal Hyderabad-500039 | Ph: 9032091726
        </div>
      </div>
    </div>
  );
};

export default PayslipView;
