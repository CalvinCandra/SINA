const Grafik = ({ title = "Rekap", data = {} }) => {
  const chartData = {
    title,
    items: [
      { label: "Hadir", value: Number(data.hadir || 0), color: "#22c55e" },
      { label: "Izin", value: Number(data.izin || 0), color: "#f59e0b" },
      { label: "Sakit", value: Number(data.sakit || 0), color: "#0ea5e9" },
      { label: "Alpa", value: Number(data.alpa || 0), color: "#ef4444" },
    ],
  };

  const total = chartData.items.reduce((sum, item) => sum + item.value, 0);

  const itemsWithPercentage = chartData.items.map((item) => ({
    ...item,
    percentage: total > 0 ? (item.value / total) * 100 : 0,
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
