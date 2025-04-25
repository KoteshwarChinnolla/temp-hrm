import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
    FaSearch,
    FaEnvelope,
} from "react-icons/fa";
import anasolLogo from "../assets/logo.png";
import { IoFilterOutline, IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit, FiDownload  } from "react-icons/fi";
const initialPayrollData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    employee: [
        "John Doe", "Priya Mehta", "Ankit Sharma", "Ravi Kumar", "Neha Reddy",
        "Simran Kapoor", "Rahul Singh", "Divya Jain", "Karan Patel", "Sneha Desai",
        "Arjun Nair", "Meera Iyer", "Vikram Rao", "Tanya Bose", "Deepak Verma",
        "Roshni Shah", "Amit Tiwari", "Zoya Khan", "Farhan Sheikh", "Pooja Joshi"
    ][i],
    empid: `100${i + 1}`,
    month: "March 2025",
    salary: [
        "₹80,000", "₹92,000", "₹75,000", "₹68,000", "₹85,000",
        "₹90,000", "₹78,000", "₹70,000", "₹82,000", "₹95,000",
        "₹76,000", "₹88,000", "₹73,000", "₹80,000", "₹84,000",
        "₹90,000", "₹86,000", "₹79,000", "₹74,000", "₹91,000"
    ][i],
    bonus: [
        "₹2,000", "₹3,000", "₹2,500", "₹1,800", "₹2,700",
        "₹3,200", "₹2,400", "₹2,000", "₹2,600", "₹3,500",
        "₹2,300", "₹3,000", "₹2,200", "₹2,400", "₹2,800",
        "₹3,100", "₹2,900", "₹2,500", "₹2,100", "₹3,200"
    ][i],
    deductions: [
        "₹5,000", "₹6,000", "₹4,500", "₹3,800", "₹5,200",
        "₹5,500", "₹4,900", "₹4,000", "₹5,100", "₹6,500",
        "₹4,700", "₹5,800", "₹4,400", "₹5,000", "₹5,300",
        "₹5,700", "₹5,400", "₹4,800", "₹4,300", "₹6,000"
    ][i],
    department: [
        "Technology Services", "Finance", "Technology Services", "Operations", "Human Resources",
        "Technology Services", "Marketing", "Technology Services", "Finance", "Technology Services",
        "Marketing", "Operations", "Human Resources", "Finance", "Technology Services",
        "Marketing", "Technology Services", "Operations", "Finance", "Technology Services"
    ][i],
    designation: [
        "Software Engineer", "Accountant", "Developer", "Operations Executive", "HR Manager",
        "Senior Developer", "Marketing Analyst", "UI Designer", "Financial Analyst", "Tech Lead",
        "Content Strategist", "Ops Manager", "HR Executive", "Finance Manager", "Backend Developer",
        "SEO Specialist", "Frontend Engineer", "Logistics Coordinator", "Auditor", "QA Engineer"
    ][i],
    gender: ["Male", "Female", "Male", "Male", "Female", "Female", "Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female", "Male", "Female"][i],
    email: [
        "john.doe", "priya.mehta", "ankit.sharma", "ravi.kumar", "neha.reddy",
        "simran.kapoor", "rahul.singh", "divya.jain", "karan.patel", "sneha.desai",
        "arjun.nair", "meera.iyer", "vikram.rao", "tanya.bose", "deepak.verma",
        "roshni.shah", "amit.tiwari", "zoya.khan", "farhan.sheikh", "pooja.joshi"
    ][i] + "@anasol.com",
    status: ["Paid", "Pending", "Paid", "Pending", "Paid", "Paid", "Pending", "Paid", "Pending", "Paid", "Paid", "Pending", "Paid", "Pending", "Paid", "Pending", "Paid", "Paid", "Pending", "Paid"][i],
    paymentDate: [
        "05-Apr-2025", "-", "04-Apr-2025", "-", "05-Apr-2025",
        "06-Apr-2025", "-", "03-Apr-2025", "-", "04-Apr-2025",
        "05-Apr-2025", "-", "06-Apr-2025", "-", "03-Apr-2025",
        "-", "05-Apr-2025", "04-Apr-2025", "-", "06-Apr-2025"
    ][i],
    panNo: `ABCDE${1000 + i}F`,
    pfNo: `PF${2000 + i}`,
    bankAccountNo: `1234567890${i}`,
    bankAccountName: [
        "John Doe", "Priya Mehta", "Ankit Sharma", "Ravi Kumar", "Neha Reddy",
        "Simran Kapoor", "Rahul Singh", "Divya Jain", "Karan Patel", "Sneha Desai",
        "Arjun Nair", "Meera Iyer", "Vikram Rao", "Tanya Bose", "Deepak Verma",
        "Roshni Shah", "Amit Tiwari", "Zoya Khan", "Farhan Sheikh", "Pooja Joshi"
    ][i],
    ifscCode: `ANSL000${100 + i}`,
    phoneNo: `98765432${String(i).padStart(2, '0')}`
}));
const Payroll = () => {
    const [payrollData, setPayrollData] = useState(initialPayrollData);
    const [searchTerm, setSearchTerm] = useState("");
    const [editModal, setEditModal] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showColumnDropdown, setShowColumnDropdown] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        employee: true,
        empid: true,
        email: true,
        department: true,
        month: true,
        salary: true,
        bonus: true,
        deductions: true,
        status: true,
        paymentDate: true,
        actions: true,
    });
    const [addModal, setAddModal] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        employee: "",
        empid: "",
        email: "",
        department: "",
        month: "March 2025",
        salary: "",
        bonus: "",
        deductions: "",
        status: "Pending",
        paymentDate: "-",
    });
    const perPage = 10;

    const columns = [
        { key: "employee", label: "Employee Name" },
        { key: "empid", label: "Employee ID" },
        { key: "email", label: "Email" },
        { key: "department", label: "Department" },
        { key: "month", label: "Month" },
        { key: "salary", label: "Salary" },
        { key: "bonus", label: "Bonus" },
        { key: "deductions", label: "Deductions" },
        { key: "status", label: "Status" },
        { key: "paymentDate", label: "Payment Date" },
        { key: "actions", label: "Actions" },
    ];

    const filteredData = payrollData.filter((item) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            item.employee.toLowerCase().includes(searchLower) ||
            item.empid.toLowerCase().includes(searchLower) ||
            item.department.toLowerCase().includes(searchLower) ||
            item.status.toLowerCase().includes(searchLower)
        );
    });

    const totalPages = Math.ceil(filteredData.length / perPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );
    const totalPaid = filteredData.filter((p) => p.status === "Paid").length;
    const totalPending = filteredData.filter(
        (p) => p.status === "Pending"
    ).length;

    const handleColumnToggle = (columnKey) =>
        setVisibleColumns((prev) => ({ ...prev, [columnKey]: !prev[columnKey] }));
    const handleAddEmployee = () => {
        const newId = Math.max(...payrollData.map((item) => item.id)) + 1;
        setPayrollData((prev) => [...prev, { ...newEmployee, id: newId }]);
        setAddModal(false);
        setNewEmployee({
            employee: "",
            empid: "",
            email: "",
            department: "",
            month: "March 2025",
            salary: "",
            bonus: "",
            deductions: "",
            status: "Pending",
            paymentDate: "-",
        });
    };

    const handleDownloadCSV = () => {
        const headers = columns
            .filter((col) => visibleColumns[col.key] && col.key !== "actions")
            .map((col) => col.label);
    
        const csvContent = [
            headers.join(","), // First row with headers
            ...payrollData.map((item) =>
                columns
                    .filter((col) => visibleColumns[col.key] && col.key !== "actions")
                    .map((col) => {
                        const cell = item[col.key] ?? "";
                        return `"${String(cell).replace(/"/g, '""')}"`; // handle commas & quotes
                    })
                    .join(",")
            ),
        ].join("\n");
    
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "payroll_data.csv";
        link.click();
    };
    
    const handlePayslipDownload = (item) => {
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

    const handleEdit = (item) => {
        setEditForm(item);
        setEditModal(item.id);
    };
    const handleSave = () => {
        setPayrollData((prev) =>
            prev.map((p) => (p.id === editForm.id ? editForm : p))
        );
        setEditModal(null);
    };
    const handleDelete = (item) => setConfirmDelete(item);
    const confirmDeleteEmployee = () => {
        setPayrollData((prev) => prev.filter((p) => p.id !== confirmDelete.id));
        setConfirmDelete(null);
    };
    const cancelDelete = () => setConfirmDelete(null);

    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Payroll Dashboard
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow text-center">
                    <h2 className="text-sm text-black">Total Employees</h2>
                    <p className="text-xl font-bold">{filteredData.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                    <h2 className="text-sm text-black">Paid</h2>
                    <p className="text-xl font-bold text-black">{totalPaid}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                    <h2 className="text-sm text-black">Pending</h2>
                    <p className="text-xl font-bold text-black">{totalPending}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                    <h2 className="text-sm text-black">Current Month</h2>
                    <p className="text-xl font-bold text-black">March 2025</p>
                </div>
            </div>

            <div className="bg-white border shadow rounded-lg p-4 mb-6 mx-4">
                <div className="flex items-center justify-between mb-4">
                    {/* <h4>Payroll</h4> */}
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-3 w-full md:w-80">
                        <div className="flex items-center">
                            <FaSearch className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Search employee..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="outline-none w-full bg-transparent"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <button
                                onClick={() => setShowColumnDropdown(!showColumnDropdown)}
                                className="p-2 text-black hover:text-gray-300 hover:bg-black rounded-full transition-colors"
                                title="Column Settings"
                            >
                                <IoFilterOutline  className="text-xl" />
                            </button>
                            {showColumnDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                    <div className="py-1 max-h-60 overflow-y-auto">
                                        {columns.map((column) => (
                                            <label
                                                key={column.key}
                                                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={visibleColumns[column.key]}
                                                    onChange={() => handleColumnToggle(column.key)}
                                                    className="mr-2"
                                                />
                                                {column.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => setAddModal(true)}
                            className="p-2 text-green- hover:text-green-800 hover:bg-green-50 rounded-full transition-colors"
                            title="Add Employee"
                        >
                            <IoAddCircleOutline className="text-xl" />
                        </button>
                        <button
                            onClick={handleDownloadCSV}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                            title="Download CSV"
                        >
                            <MdOutlineFileDownload className="text-xl" />
                        </button>
                    </div>
                </div>

                <div className="overflow-auto max-h-[450px]">
                    <table className="w-full table-auto bg-white">
                        <thead className="bg-indigo-100 sticky top-0">
                            <tr>
                                {columns.map(
                                    (column) =>
                                        visibleColumns[column.key] && (
                                            <th key={column.key} className="p-4 text-left">
                                                {column.label}
                                            </th>
                                        )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item) => (
                                <tr key={item.id} className="border-t">
                                    {columns.map(
                                        (column) =>
                                            visibleColumns[column.key] && (
                                                <td key={column.key} className="p-4">
                                                    {column.key === "email" ? (
                                                        <div className="flex items-center gap-2">
                                                            <FaEnvelope className="text-gray-500" />
                                                            <span>{item[column.key]}</span>
                                                        </div>
                                                    ) : column.key === "actions" ? (
                                                        <div className="flex gap-3">
                                                            <button
                                                                className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full transition-colors"
                                                                onClick={() => handlePayslipDownload(item)}
                                                                title="Download Payslip"
                                                            >
                                                                <FiDownload className="text-xl" />
                                                            </button>
                                                            <button
                                                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                                                                onClick={() => handleEdit(item)}
                                                                title="Edit"
                                                            >
                                                                <FiEdit className="text-xl"/>
                                                            </button>
                                                            <button
                                                                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                                                                onClick={() => handleDelete(item)}
                                                                title="Delete"
                                                            >
                                                                <FaRegTrashAlt className="text-xl" />
                                                            </button>
                                                        </div>
                                                    ) : column.key === "status" ? (
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-sm font-semibold ${item.status === "Paid"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-yellow-100 text-yellow-700"
                                                                }`}
                                                        >
                                                            {item[column.key]}
                                                        </span>
                                                    ) : (
                                                        item[column.key]
                                                    )}
                                                </td>
                                            )
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {addModal && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
                        <div className="space-y-3">
                            {[
                                "employee",
                                "empid",
                                "email",
                                "department",
                                "salary",
                                "bonus",
                                "deductions",
                            ].map((field) => (
                                <input
                                    key={field}
                                    type={field === "email" ? "email" : "text"}
                                    placeholder={
                                        field.charAt(0).toUpperCase() +
                                        field.slice(1).replace(/([A-Z])/g, " $1")
                                    }
                                    value={newEmployee[field]}
                                    onChange={(e) =>
                                        setNewEmployee({ ...newEmployee, [field]: e.target.value })
                                    }
                                    className="w-full border p-2 rounded"
                                />
                            ))}
                            <select
                                value={newEmployee.status}
                                onChange={(e) =>
                                    setNewEmployee({ ...newEmployee, status: e.target.value })
                                }
                                className="w-full border p-2 rounded"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={handleAddEmployee}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Add
                            </button>
                            <button
                                onClick={() => setAddModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editModal && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Edit Payroll</h2>
                        <input
                            type="text"
                            value={editForm.employee}
                            onChange={(e) =>
                                setEditForm({ ...editForm, employee: e.target.value })
                            }
                            className="w-full border p-2 rounded mb-3"
                            placeholder="Employee"
                        />
                        <input
                            type="text"
                            value={editForm.empId}
                            onChange={(e) =>
                                setEditForm({ ...editForm, empid: e.target.value })
                            }
                            className="w-full border p-2 rounded mb-3"
                            placeholder="Employee ID"
                        />
                        <input
                            type="text"
                            value={editForm.email}
                            onChange={(e) =>
                                setEditForm({ ...editForm, email: e.target.value })
                            }
                            className="w-full border p-2 rounded mb-3"
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            value={editForm.department}
                            onChange={(e) =>
                                setEditForm({ ...editForm, department: e.target.value })
                            }
                            className="w-full border p-2 rounded mb-3"
                            placeholder="Department"
                        />
                        <input
                            type="text"
                            value={editForm.month}
                            onChange={(e) =>
                                setEditForm({ ...editForm, month: e.target.value })
                            }
                            className="w-full border p-2 rounded mb-3"
                            placeholder="Month"
                        />
                        <input
                            type="text"
                            value={editForm.bonus}
                            onChange={(e) =>
                                setEditForm({ ...editForm, bonus: e.target.value })
                            }
                            className="w-full border p-2 rounded mb-3"
                            placeholder="Bonus"
                        />
                        <input
                            type="text"
                            value={editForm.deductions}
                            onChange={(e) =>
                                setEditForm({ ...editForm, deductions: e.target.value })
                            }
                            className="w-full border p-2 rounded mb-3"
                            placeholder="Deductions"
                        />
                        <input
                            type="text"
                            value={editForm.salary}
                            onChange={(e) =>
                                setEditForm({ ...editForm, salary: e.target.value })
                            }
                            className="w-full border p-2 rounded mb-3"
                            placeholder="Salary"
                        />
                        <select
                            value={editForm.status}
                            onChange={(e) =>
                                setEditForm({ ...editForm, status: e.target.value })
                            }
                            className="w-full border p-2 rounded mb-3"
                        >
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                        </select>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditModal(null)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {confirmDelete && (
                <div className="fixed inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
                        <h2 className="text-lg font-semibold mb-4">
                            Delete {confirmDelete.employee}?
                        </h2>
                        <p className="mb-6">
                            Are you sure you want to remove this payroll record?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={confirmDeleteEmployee}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
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

export default Payroll;