import React from "react";
import { Box, Typography } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveChoropleth } from "@nivo/geo";
// Replace * with actual imports or setup in index.js
import {
  FaTicketAlt,
  FaCheckCircle,
  FaBriefcase,
  FaUmbrellaBeach,
} from "react-icons/fa";

const DashboardCard = ({ title, count, icon, description, bgColor }) => (
  <Box
    className={`flex items-center justify-between p-5 rounded-xl text-white shadow-md ${bgColor}`}
  >
    <Box>
      <Typography fontWeight="bold">{title}</Typography>
      <Typography variant="h4">{count}</Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
    <Box fontSize="2rem">{icon}</Box>
  </Box>
);

const Dashboard = () => {
  const mockBarData = [
    { country: "USA", burger: 100, fries: 80 },
    { country: "UK", burger: 70, fries: 60 },
  ];

  const mockLineData = [
    {
      id: "sales",
      data: [
        { x: "Jan", y: 100 },
        { x: "Feb", y: 120 },
        { x: "Mar", y: 80 },
      ],
    },
  ];

  const mockPieData = [
    { id: "chrome", label: "Chrome", value: 60 },
    { id: "firefox", label: "Firefox", value: 25 },
    { id: "safari", label: "Safari", value: 15 },
  ];

  const mockGeoData = [
    { id: "USA", value: 1000000 },
    { id: "IND", value: 800000 },
  ];

  const geoFeatures = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        id: "USA",
        properties: { name: "United States" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-101.0, 40.0],
              [-100.0, 40.0],
              [-100.0, 41.0],
              [-101.0, 41.0],
              [-101.0, 40.0],
            ],
          ],
        },
      },
      {
        type: "Feature",
        id: "IND",
        properties: { name: "India" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [77.0, 20.0],
              [78.0, 20.0],
              [78.0, 21.0],
              [77.0, 21.0],
              [77.0, 20.0],
            ],
          ],
        },
      },
    ],
  };

  return (
    <Box className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <Typography
        variant="h2"
        mb={2}
        style={{ fontFamily: "Times New Roman, serif" }}
      >
        Dashboard
      </Typography>

      {/* Top Summary Cards */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <DashboardCard
          title="New Tickets"
          count="23"
          icon={<FaTicketAlt />}
          description="18% Higher Than Last Month"
          bgColor="bg-violet-500"
        />
        <DashboardCard
          title="Ticket Resolved"
          count="20"
          icon={<FaCheckCircle />}
          description="21% Higher Than Last Month"
          bgColor="bg-green-500"
        />
        <DashboardCard
          title="Project Assigned"
          count="13"
          icon={<FaBriefcase />}
          description="37% Higher Than Last Month"
          bgColor="bg-orange-500"
        />
        <DashboardCard
          title="Available Leaves"
          count="34"
          icon={<FaUmbrellaBeach />}
          description="10% Higher Than Last Month"
          bgColor="bg-blue-500"
        />
      </Box>

      {/* Nivo Charts */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={4} mt={4}>
        <Box
          gridColumn="span 6"
          height="300px"
          bgcolor="white"
          p={2}
          borderRadius={2}
        >
          <ResponsiveBar
            data={mockBarData}
            keys={["burger", "fries"]}
            indexBy="country"
            margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
            padding={0.3}
            colors={{ scheme: "nivo" }}
          />
        </Box>

        <Box
          gridColumn="span 6"
          height="300px"
          bgcolor="white"
          p={2}
          borderRadius={2}
        >
          <ResponsiveLine
            data={mockLineData}
            margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
            xScale={{ type: "point" }}
            yScale={{ type: "linear", min: 0, max: "auto", stacked: true }}
            colors={{ scheme: "nivo" }}
          />
        </Box>

        <Box
          gridColumn="span 4"
          height="300px"
          bgcolor="white"
          p={2}
          borderRadius={2}
        >
          <ResponsivePie
            data={mockPieData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            innerRadius={0.5}
            padAngle={0.7}
            colors={{ scheme: "nivo" }}
          />
        </Box>

        <Box
          gridColumn="span 8"
          height="300px"
          bgcolor="white"
          p={2}
          borderRadius={2}
        >
          <ResponsiveChoropleth
            data={mockGeoData}
            features={geoFeatures.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            domain={[0, 1000000]}
            unknownColor="#444"
            label="properties.name"
            projectionScale={120}
            projectionTranslation={[0.5, 0.5]}
            borderWidth={0.5}
            borderColor="#fff"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;