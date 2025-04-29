import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { jsPDF } from "jspdf";

const PayEmp = () => {
  const [employee, setEmployee] = useState({
    id: 1,
    employee: "John Doe",
    empid: "EMP001",
    email: "john.doe@example.com",
    department: "Technology",
    basicSalary: 50000,
    housingAllowance: 10000,
    transportAllowance: 3000,
    bonus: 5000,
    deductions: 2000,
    month: "March",
    year: "2025",
    status: "Paid",
  });

  const [selectedMonth, setSelectedMonth] = useState(employee.month);
  const [selectedYear, setSelectedYear] = useState(employee.year);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i); // Last 10 years

  // Calculate total pay
  const totalPay =
    parseFloat(employee.basicSalary) +
    parseFloat(employee.housingAllowance) +
    parseFloat(employee.transportAllowance) +
    parseFloat(employee.bonus) -
    parseFloat(employee.deductions);

  const handleDownloadPayslipPDF = (item) => {
   
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
        });

        const img = new Image();
        img.src = anasolLogo;

        img.onload = function () {
            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;
            const leftMargin = 10;
            const rightMargin = 10;
            const tableWidth = pageWidth - (leftMargin + rightMargin);

            // Add a subtle background color to the entire page
            doc.setFillColor(252, 252, 252);
            doc.rect(0, 0, pageWidth, pageHeight, "F");

            // Header section with gradient-like effect
            doc.setFillColor(0, 32, 96); // Dark blue
            doc.rect(0, 0, pageWidth, 30, "F");
            doc.setFillColor(0, 45, 120); // Slightly lighter blue
            doc.rect(0, 28, pageWidth, 2, "F");

            // Company Logo - White background for logo
            doc.setFillColor(255, 255, 255);
            doc.circle(leftMargin + 10, 15, 10, "F");
            doc.addImage(img, "PNG", leftMargin, 5, 20, 20);

            // Company Name and Title
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.setFont("helvetica", "bold");
            doc.text("ANASOL CONSULTANCY SERVICES PVT LTD", pageWidth / 2, 15, {
                align: "center",
            });
            doc.setFontSize(12);
            doc.text("SALARY SLIP", pageWidth / 2, 23, { align: "center" });

            // Reset text color
            doc.setTextColor(0, 0, 0);

            // Employee Details Section with modern styling
            const startY = 40;
            doc.setFontSize(8);
            doc.setFont("helvetica", "normal");

            // Define column positions
            const leftCol = leftMargin;
            const midCol = pageWidth / 2;
            const labelWidth = 45;
            const valueWidth = pageWidth / 2 - labelWidth - 15;

            // Section Title
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 32, 96);
            doc.text("Employee Information", leftMargin, startY - 5);

            // Draw boxes with modern styling
            doc.setDrawColor(220, 220, 220);
            doc.setFillColor(248, 249, 250);
            doc.roundedRect(leftCol, startY - 3, pageWidth / 2 - 15, 48, 2, 2, "F");
            doc.roundedRect(
                midCol - 5,
                startY - 3,
                pageWidth / 2 - 15,
                48,
                2,
                2,
                "F"
            );

            // Reset text color
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(8);

            // Employee details with improved styling
            const leftDetails = [
                { label: "Employee Name", value: item.employee },
                { label: "Employee ID", value: item.empid },
                { label: "Designation", value: item.designation },
                { label: "Department", value: item.department },
                { label: "Phone No", value: item.phoneNo },
                { label: "Bank A/C Name", value: item.bankAccountName },
                { label: "Bank A/C No", value: item.bankAccountNo },
            ];

            const rightDetails = [
                { label: "Gender", value: item.gender },
                { label: "PAN No", value: item.panNo },
                { label: "PF No", value: item.pfNo },
                { label: "IFSC Code", value: item.ifscCode },
                { label: "Email", value: item.email },
                { label: "Month", value: item.month },
                { label: "Status", value: item.status },
            ];

            let currentY = startY;
            const lineHeight = 7;

            // Draw details with improved styling
            const drawDetails = (details, startX) => {
                details.forEach((detail) => {
                    doc.setFont("helvetica", "bold");
                    doc.setTextColor(80, 80, 80);
                    doc.text(detail.label + ":", startX + 2, currentY);
                    doc.setFont("helvetica", "normal");
                    doc.setTextColor(0, 0, 0);
                    const splitValue = doc.splitTextToSize(detail.value, valueWidth);
                    doc.text(splitValue, startX + labelWidth, currentY);
                    currentY += lineHeight;
                });
                currentY = startY; // Reset for next column
            };

            drawDetails(leftDetails, leftCol);
            drawDetails(rightDetails, midCol);

            // Days Information Section
            currentY = startY + 55;

            // Section Title
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 32, 96);
            doc.text("Attendance Information", leftMargin, currentY - 5);

            const daysInfo = [
                { label: "Standard Days", value: "31" },
                { label: "Payable Days", value: "31.00" },
                { label: "Loss of Pay Days", value: "0.00" },
                { label: "LOP Reversal Days", value: "0.00" },
                { label: "Arrear Days", value: "0.00" },
            ];

            // Create modern days information table
            const daysCellWidth = tableWidth / daysInfo.length;
            daysInfo.forEach((info, index) => {
                const x = leftMargin + daysCellWidth * index;
                doc.roundedRect(x, currentY, daysCellWidth - 1, 12, 1, 1);
                doc.setFont("helvetica", "bold");
                doc.setTextColor(80, 80, 80);
                doc.text(info.label, x + 2, currentY + 7);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(0, 0, 0);
                doc.text(info.value, x + daysCellWidth - 3, currentY + 7, {
                    align: "right",
                });
            });

            // Earnings and Deductions Table
            currentY += 25;

            // Section Title
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 32, 96);
            doc.text("Salary Details", leftMargin, currentY - 5);

            // Adjust the width ratio for earnings and deductions
            const earningsWidth = tableWidth * 0.75;
            const deductionsWidth = tableWidth * 0.25;

            // Headers with modern styling
            doc.setFillColor(0, 32, 96);
            doc.roundedRect(leftMargin, currentY, earningsWidth, 10, 1, 1, "F");
            doc.roundedRect(
                leftMargin + earningsWidth,
                currentY,
                deductionsWidth,
                10,
                1,
                1,
                "F"
            );

            doc.setTextColor(255, 255, 255);
            doc.text("EARNINGS", leftMargin + 3, currentY + 6);
            doc.text("DEDUCTIONS", leftMargin + earningsWidth + 3, currentY + 6);

            // Subheaders
            currentY += 10;
            const descriptionWidth = earningsWidth * 0.25;
            const rateWidth = (earningsWidth - descriptionWidth) / 4;

            // Draw subheaders with modern styling
            doc.setFillColor(240, 242, 245);
            doc.roundedRect(leftMargin, currentY, descriptionWidth, 10, 1, 1);

            const rateHeaders = [
                "MONTHLY RATE",
                "CURRENT MONTH",
                "ARREAR (+/-)",
                "TOTAL",
            ];
            rateHeaders.forEach((header, index) => {
                const x = leftMargin + descriptionWidth + rateWidth * index;
                doc.roundedRect(x, currentY, rateWidth - 1, 10, 1, 1);
                doc.setTextColor(80, 80, 80);
                doc.text(header, x + 3, currentY + 6);
            });

            doc.roundedRect(
                leftMargin + earningsWidth,
                currentY,
                deductionsWidth,
                10,
                1,
                1
            );
            doc.text("AMOUNT", pageWidth - rightMargin - 3, currentY + 6, {
                align: "right",
            });

            // Data rows with modern styling
            currentY += 10;
            const rowHeight = 7;

            // Calculate earnings based on salary
            const basicSalary = parseFloat(item.salary.replace(/[^0-9.-]+/g, ""));
            const hra = Math.round(basicSalary * 0.4);
            const personalAllowance = Math.round(basicSalary * 0.2);
            const remoteAllowance = 3000;
            const booksAllowance = 3000;
            const professionalAllowance = 15000;
            const conveyanceAllowance = 2734;

            const earnings = [
                {
                    desc: "BASIC",
                    rate: basicSalary.toLocaleString("en-IN"),
                    current: basicSalary.toLocaleString("en-IN"),
                    arrear: "0",
                    total: basicSalary.toLocaleString("en-IN"),
                },
                {
                    desc: "HOUSE RENT ALLOWANCE",
                    rate: hra.toLocaleString("en-IN"),
                    current: hra.toLocaleString("en-IN"),
                    arrear: "0",
                    total: hra.toLocaleString("en-IN"),
                },
                {
                    desc: "PERSONAL ALLOWANCE",
                    rate: personalAllowance.toLocaleString("en-IN"),
                    current: personalAllowance.toLocaleString("en-IN"),
                    arrear: "0",
                    total: personalAllowance.toLocaleString("en-IN"),
                },
                {
                    desc: "REMOTE WORKING ALLOWANCE",
                    rate: remoteAllowance.toLocaleString("en-IN"),
                    current: remoteAllowance.toLocaleString("en-IN"),
                    arrear: "0",
                    total: remoteAllowance.toLocaleString("en-IN"),
                },
                {
                    desc: "BOOKS AND JOURNALS",
                    rate: booksAllowance.toLocaleString("en-IN"),
                    current: booksAllowance.toLocaleString("en-IN"),
                    arrear: "0",
                    total: booksAllowance.toLocaleString("en-IN"),
                },
                {
                    desc: "PROFESSIONAL PURSUIT",
                    rate: professionalAllowance.toLocaleString("en-IN"),
                    current: professionalAllowance.toLocaleString("en-IN"),
                    arrear: "0",
                    total: professionalAllowance.toLocaleString("en-IN"),
                },
                {
                    desc: "CONVEYANCE ALLOWANCE",
                    rate: conveyanceAllowance.toLocaleString("en-IN"),
                    current: conveyanceAllowance.toLocaleString("en-IN"),
                    arrear: "0",
                    total: conveyanceAllowance.toLocaleString("en-IN"),
                },
            ];

            const deductions = [
                { desc: "P.F.", amount: "4,161" },
                { desc: "PROFESSION TAX", amount: "200" },
            ];

            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0);
            earnings.forEach((row, index) => {
                const y = currentY + rowHeight * index;

                // Alternating row background
                if (index % 2 === 0) {
                    doc.setFillColor(252, 252, 252);
                    doc.rect(leftMargin, y, earningsWidth, rowHeight, "F");
                    if (index < deductions.length) {
                        doc.rect(
                            leftMargin + earningsWidth,
                            y,
                            deductionsWidth,
                            rowHeight,
                            "F"
                        );
                    }
                }

                // Draw data
                doc.text(row.desc, leftMargin + 3, y + 5);
                const rateX = leftMargin + descriptionWidth;
                doc.text(row.rate, rateX + rateWidth - 3, y + 5, { align: "right" });
                doc.text(row.current, rateX + rateWidth * 2 - 3, y + 5, {
                    align: "right",
                });
                doc.text(row.arrear, rateX + rateWidth * 3 - 3, y + 5, {
                    align: "right",
                });
                doc.text(row.total, rateX + rateWidth * 4 - 3, y + 5, {
                    align: "right",
                });

                if (index < deductions.length) {
                    doc.text(
                        deductions[index].desc,
                        leftMargin + earningsWidth + 5,
                        y + 5
                    );
                    doc.text(
                        deductions[index].amount,
                        pageWidth - rightMargin - 3,
                        y + 5,
                        { align: "right" }
                    );
                }
            });

            // Totals row with modern styling
            currentY += rowHeight * earnings.length;
            doc.setFillColor(0, 32, 96);
            doc.roundedRect(leftMargin, currentY, tableWidth, 8, 1, 1, "F");

            doc.setFont("helvetica", "bold");
            doc.setTextColor(255, 255, 255);
            doc.text("GROSS EARNINGS", leftMargin + 3, currentY + 5);
            const rateX = leftMargin + descriptionWidth;
            doc.text("93,237", rateX + rateWidth * 2 - 3, currentY + 5, {
                align: "right",
            });
            doc.text("0", rateX + rateWidth * 3 - 3, currentY + 5, {
                align: "right",
            });
            doc.text("93,237", rateX + rateWidth * 4 - 3, currentY + 5, {
                align: "right",
            });
            doc.text(
                "TOTAL DEDUCTIONS",
                leftMargin + earningsWidth + 5,
                currentY + 5
            );
            doc.text("4,361", pageWidth - rightMargin - 3, currentY + 5, {
                align: "right",
            });

            // Net Pay Section with modern styling
            currentY += 12;
            doc.setFillColor(0, 32, 96);
            doc.roundedRect(leftMargin, currentY, tableWidth, 18, 2, 2, "F");
            doc.setFontSize(11);
            doc.text("NET PAY", leftMargin + 3, currentY + 7);
            doc.text("₹ 88,876/-", leftMargin + tableWidth - 3, currentY + 7, {
                align: "right",
            });
            doc.setFontSize(8);
            doc.text(
                "(RUPEES EIGHTY EIGHT THOUSAND EIGHT HUNDRED SEVENTY SIX ONLY)",
                leftMargin + 3,
                currentY + 14
            );

            // Footer with modern styling
            doc.setDrawColor(220, 220, 220);
            doc.setFillColor(248, 249, 250);
            doc.roundedRect(0, pageHeight - 15, pageWidth, 15, 0, 0, "F");
            doc.setFontSize(7);
            doc.setTextColor(80, 80, 80);
            const address =
                "#1016, 11th Floor, DSL Abacus IT Park, Uppal Hyderabad-500039 | Ph: 9032091726";
            doc.text(address, pageWidth / 2, pageHeight - 7, { align: "center" });

            doc.save(`${ item.employee }_Salary_Slip.pdf`);
        };
    };


  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Employee Payslip</h1>
          
        
        </div>

        {/* Select Month and Year */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Month</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
          >
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Display Detailed Salary Breakdown */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Employee Information</h2>
            <p><strong>Name:</strong> {employee.employee}</p>
            <p><strong>Employee ID:</strong> {employee.empid}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Month:</strong> {selectedMonth} {selectedYear}</p>
            <p><strong>Status:</strong> {employee.status}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Salary Breakdown</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Basic Salary:</strong></div>
              <div>₹{employee.basicSalary}</div>
              <div><strong>Housing Allowance:</strong></div>
              <div>₹{employee.housingAllowance}</div>
              <div><strong>Transport Allowance:</strong></div>
              <div>₹{employee.transportAllowance}</div>
              <div><strong>Bonus:</strong></div>
              <div>₹{employee.bonus}</div>
              <div><strong>Deductions:</strong></div>
              <div>₹{employee.deductions}</div>
              <div><strong>Net Pay (After Deductions):</strong></div>
              <div>₹{totalPay}</div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleDownloadPayslipPDF}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Download Payslip
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayEmp;
