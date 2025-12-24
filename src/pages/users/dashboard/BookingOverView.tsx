
import { BookingsOverviewProps, LineChartData } from "./types";

const BookingsOverview = ({
  data,
  activeTab,
  setActiveTab,
}: BookingsOverviewProps) => {
  const width = 500;
  const height = 300;
  const padding = { top: 20, right: 30, bottom: 50, left: 50 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const safeData = data.length > 0 ? data : [];

  const maxValue =
    safeData.length > 0
      ? Math.max(
        ...safeData.map((d) =>
          Math.max(d.total, d.actual, d.pending)
        )
      )
      : 0;

  const yMax = Math.max(50, Math.ceil(maxValue / 50) * 50);

  const scaleX = (index: number): number => {
    if (safeData.length <= 1) {
      return padding.left;
    }
    return (
      padding.left + (index / (safeData.length - 1)) * chartWidth
    );
  };

  const scaleY = (value: number): number => {
    return (
      padding.top +
      chartHeight -
      (value / yMax) * chartHeight
    );
  };

  const generatePath = (values: number[]): string => {
    return values
      .map((value, index) => {
        const x = scaleX(index);
        const y = scaleY(value);
        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
      })
      .join(" ");
  };

  const lines: LineChartData[] = [
    {
      name: "Total",
      color: "#3B82F6",
      values: safeData.map((d) => d.total),
    },
    {
      name: "Actual",
      color: "#F97316",
      values: safeData.map((d) => d.actual),
    },
    {
      name: "Pending ",
      color: "#22C55E",
      values: safeData.map((d) => d.pending),
    },
  ];

  const yTicks: number[] = Array.from(
    { length: 5 },
    (_, i) => (yMax / 4) * i
  );

  return (
    <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">Bookings Overview</h2>

        <div className="flex gap-2">
          {(["7days", "30days"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {tab === "7days" ? "7 Days" : "30 Days"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <svg width={width} height={height}>
          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={padding.left}
                y1={scaleY(tick)}
                x2={width - padding.right}
                y2={scaleY(tick)}
                stroke="#E5E7EB"
              />
              <text
                x={padding.left - 10}
                y={scaleY(tick)}
                textAnchor="end"
                alignmentBaseline="middle"
                fontSize="12"
                fill="#6B7280"
              >
                {tick}
              </text>
            </g>
          ))}

          {safeData.map((d, i) => (
            <text
              key={i}
              x={scaleX(i)}
              y={height - padding.bottom + 25}
              textAnchor="middle"
              fontSize="12"
              fill="#6B7280"
            >
              {d.date}
            </text>
          ))}

          {lines.map((line) => (
            <g key={line.name}>
              <path
                d={generatePath(line.values)}
                fill="none"
                stroke={line.color}
                strokeWidth="3"
              />

              {line.values.map((value, index) => (
                <circle
                  key={index}
                  cx={scaleX(index)}
                  cy={scaleY(value)}
                  r="5"
                  fill={line.color}
                  stroke="white"
                  strokeWidth="2"
                />
              ))}
            </g>
          ))}
        </svg>

        <div className="flex gap-6 mt-4">
          {lines.map((line) => (
            <div key={line.name} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: line.color }}
              />
              <span className="text-sm text-gray-600">{line.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingsOverview;
