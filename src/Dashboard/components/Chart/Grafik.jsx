import React from "react";

const Grafik = () => {
  const chartData = {
    year: "1945",
    title: "Siswa",
    items: [
      { label: "Hadir", value: 800, color: "#22c55e" }, // green-500
      { label: "Izin", value: 20, color: "#f59e0b" }, // amber-500
      { label: "Sakit", value: 1000, color: "#0ea5e9" }, // sky-500
      { label: "Alpha", value: 45, color: "#ef4444" }, // red-500
    ],
  };

  const total = chartData.items.reduce((sum, item) => sum + item.value, 0);
  const itemsWithPercentage = chartData.items.map((item) => ({
    ...item,
    percentage: (item.value / total) * 100,
  }));

  const gradientParts = [];
  let accumulatedPercentage = 0;

  itemsWithPercentage.forEach((item) => {
    gradientParts.push(
      `${item.color} ${accumulatedPercentage}% ${
        accumulatedPercentage + item.percentage
      }%`
    );
    accumulatedPercentage += item.percentage;
  });

  const conicGradient = `conic-gradient(${gradientParts.join(", ")})`;

  return (
    <div className="p-6 w-full mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Donut Chart on the Left */}
        <div className="relative w-64 h-64 lg:w-72 lg:h-72">
          <div
            className="w-full h-full rounded-full"
            style={{
              background: conicGradient,
              WebkitMask: "radial-gradient(transparent 55%, black 56%)",
              mask: "radial-gradient(transparent 55%, black 56%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-black">{total}</span>
          </div>
        </div>

        {/* Legend on the Right */}
        <div className="flex flex-col space-y-3">
          {itemsWithPercentage.map((item, index) => (
            <div key={index} className="flex items-center gap-x-2">
              <div className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span>{item.label}</span>
              </div>
              <div>
                <span className="font-bold">{item.value}</span>
                <span className="text-gray-500 ml-1">
                  ({item.percentage.toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grafik;
