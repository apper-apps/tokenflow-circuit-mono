import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactApexChart from "react-apexcharts";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TokenUsageChart = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = Array.from({ length: 30 }, (_, i) => ({
        x: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
        y: Math.floor(Math.random() * 10000) + 5000
      }));
      
      setChartData(mockData);
      setLoading(false);
    };

    fetchData();
  }, [timeRange]);

  const chartOptions = {
    chart: {
      type: "area",
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800
      }
    },
    theme: {
      mode: "dark"
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#2563EB"]
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        colorStops: [
          { offset: 0, color: "#2563EB", opacity: 0.8 },
          { offset: 100, color: "#7C3AED", opacity: 0.1 }
        ]
      }
    },
    grid: {
      borderColor: "#334155",
      strokeDashArray: 3
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#94A3B8"
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: "#94A3B8"
        },
        formatter: (val) => `${(val / 1000).toFixed(1)}K`
      }
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `${val.toLocaleString()} tokens`
      }
    },
    legend: {
      show: false
    }
  };

  const series = [
    {
      name: "Token Usage",
      data: chartData
    }
  ];

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-6 bg-slate-700 rounded w-32 mb-2 shimmer"></div>
            <div className="h-4 bg-slate-700 rounded w-48 shimmer"></div>
          </div>
          <div className="flex space-x-2">
            <div className="h-8 bg-slate-700 rounded w-16 shimmer"></div>
            <div className="h-8 bg-slate-700 rounded w-16 shimmer"></div>
            <div className="h-8 bg-slate-700 rounded w-16 shimmer"></div>
          </div>
        </div>
        <div className="h-80 bg-slate-700 rounded shimmer"></div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Token Usage Trend</h3>
            <p className="text-sm text-slate-400">Track your token consumption over time</p>
          </div>
          <div className="flex space-x-2">
            {["24h", "7d", "30d"].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "primary" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
        <div className="h-80">
          <ReactApexChart
            options={chartOptions}
            series={series}
            type="area"
            height="100%"
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default TokenUsageChart;