
 
 


import { useNavigate } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: number | string;

  icon: React.ElementType;
  color: string;
  lightColor: string;
  path?: string; // ✅ optional navigation path
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  lightColor,
  path,
}: StatCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => path && navigate(path)} // ✅ navigate on click
    className={`cursor-pointer ${color} rounded-xl shadow-md p-6 
  hover:shadow-lg transition duration-200`}

    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-2xl font-bold mt-1">{value}</h2>
        </div>

        <div className={`${lightColor} p-4 rounded-lg`}>
          <Icon className="text-white w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
