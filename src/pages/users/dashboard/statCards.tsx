// import { CardStat } from "./types";

// const StatCards = ({ cards }: { cards: CardStat[] }) => (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//     {cards.map((card, i) => (
//       <div key={i} className={`${card.color} rounded-xl p-6 text-white shadow-lg`}>
//         <div className="flex justify-between items-center">
//           <div>
//             <p className="text-sm opacity-90">{card.title}</p>
//             <p className="text-4xl font-bold">{card.value}</p>
//           </div>
//           <div className={`${card.lightColor} p-4 rounded-lg`}>
//             <card.icon size={32} />
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// );

// export default StatCards;
// import { CardStat } from "./types";
 
// const StatCards = ({ cards }: { cards: CardStat[] }) => (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//     {cards.map((card, i) => (
//       <div key={i} className={`${card.color} rounded-xl p-6 text-white shadow-lg`}>
//         <div className="flex justify-between items-center">
//           <div>
//             <p className="text-sm opacity-90">{card.title}</p>
//             <p className="text-4xl font-bold">{card.value}</p>
//           </div>
//           <div className={`${card.lightColor} p-4 rounded-lg`}>
//             <card.icon size={32} />
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// );
 
// export default StatCards;
 
 


import { useNavigate } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: string;
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
      className={`cursor-pointer bg-white rounded-xl shadow-md p-6 
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
