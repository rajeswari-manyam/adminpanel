// const VehicleStatusChart = ({ status }: { status: any }) => {


//     return (
//         <div className="bg-white rounded-xl p-6 shadow-lg">
//             <h2 className="text-xl font-bold mb-6">Vehicle Status</h2>
//             {/* SVG donut chart code unchanged */}
//         </div>
//     );
// };

// export default VehicleStatusChart;

import { VehicleStatusChartProps, DonutSegment } from "./types";

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const createArc = (
  center: number,
  startAngle: number,
  endAngle: number,
  outerRadius: number,
  innerRadius: number
): string => {
  const start = polarToCartesian(center, center, outerRadius, endAngle);
  const end = polarToCartesian(center, center, outerRadius, startAngle);
  const innerStart = polarToCartesian(center, center, innerRadius, endAngle);
  const innerEnd = polarToCartesian(center, center, innerRadius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${start.x} ${start.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
};

const VehicleStatusChart = ({ status }: VehicleStatusChartProps) => {
  const total =
    status.approved + status.pending  || 1; // prevent NaN

  const size = 280;
  const center = size / 2;
  const radius = 100;
  const innerRadius = 70;

  const approvedAngle = (status.approved / total) * 360;
  const pendingAngle = (status.pending / total) * 360;
  // const rejectedAngle = (status.rejected / total) * 360;

  let currentAngle = 0;

  const approvedPath = createArc(
    center,
    currentAngle,
    currentAngle + approvedAngle,
    radius,
    innerRadius
  );
  currentAngle += approvedAngle;

  const pendingPath = createArc(
    center,
    currentAngle,
    currentAngle + pendingAngle,
    radius,
    innerRadius
  );
  currentAngle += pendingAngle;

  // const rejectedPath = createArc(
  //   center,
  //   currentAngle,
  //   currentAngle + rejectedAngle,
  //   radius,
  //   innerRadius
  // );

  const segments: DonutSegment[] = [
    { name: "Approved", color: "#22C55E", path: approvedPath, value: status.approved },
    { name: "Pending", color: "#3B82F6", path: pendingPath, value: status.pending },
    // { name: "Rejected", color: "#EF4444", path: rejectedPath, value: status.rejected },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-6">Vehicle Status</h2>

      <div className="flex flex-col items-center">
        <svg width={size} height={size} className="mb-6">
          {segments.map((segment) => (
            <path
              key={segment.name}
              d={segment.path}
              fill={segment.color}
              className="transition-opacity hover:opacity-80 cursor-pointer"
            />
          ))}
        </svg>

        <div className="flex flex-wrap gap-4 justify-center">
          {segments.map((segment) => (
            <div key={segment.name} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-sm text-gray-600">{segment.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 w-full space-y-2">
          {segments.map((segment) => (
            <div key={segment.name} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm text-gray-600">{segment.name}</span>
              </div>
              <span className="text-sm font-semibold">{segment.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleStatusChart;