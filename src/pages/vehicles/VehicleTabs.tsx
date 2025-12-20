// interface Props {
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
// }

// const tabs = [
//   { key: "all", label: "All Vehicles" },
//   { key: "pending", label: "Pending" },
//   { key: "verified", label: "Verified" },
//   { key: "cars", label: "Cars Only" },
//   { key: "bikes", label: "Bikes Only" },
// ];

// const VehicleTabs = ({ activeTab, setActiveTab }: Props) => {
//   return (
//     <div className="flex gap-2">
//       {tabs.map((tab) => (
//         <button
//           key={tab.key}
//           onClick={() => setActiveTab(tab.key)}
//           className={`px-4 py-2 rounded-md font-medium ${
//             activeTab === tab.key
//               ? "bg-blue-500 text-white"
//               : "bg-gray-100 hover:bg-gray-200"
//           }`}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default VehicleTabs;
interface VehicleTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const VehicleTabs = ({ activeTab, setActiveTab }: VehicleTabsProps) => {
  const tabs = [
    { id: "all", label: "All Vehicles" },
    { id: "pending", label: "Pending" },
    { id: "verified", label: "Verified" },
    { id: "cars", label: "Cars" },
    { id: "bikes", label: "Bikes" },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === tab.id
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default VehicleTabs;