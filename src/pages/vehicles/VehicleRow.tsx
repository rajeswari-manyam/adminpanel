interface Props {
  vehicle: any;
}

const VehicleRow = ({ vehicle }: Props) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-2xl">
          {vehicle.icon}
        </div>
      </td>
      <td className="px-6 py-4 font-medium">{vehicle.model}</td>
      <td className="px-6 py-4">{vehicle.type}</td>
      <td className="px-6 py-4">{vehicle.owner}</td>
      <td className="px-6 py-4">{vehicle.contact}</td>
      <td className="px-6 py-4 font-medium">{vehicle.price}</td>
      <td className="px-6 py-4">{vehicle.location}</td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            vehicle.status === "Verified"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {vehicle.status}
        </span>
      </td>
      <td className="px-6 py-4">
        {vehicle.status === "Verified" ? (
          <div className="flex gap-2">
            <button className="btn-blue">View</button>
            <button className="btn-purple">Edit</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button className="btn-green">Approve</button>
            <button className="btn-red">Reject</button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default VehicleRow;
