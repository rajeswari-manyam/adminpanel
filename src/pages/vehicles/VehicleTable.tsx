import VehicleRow from "./VehicleRow";

interface Props {
  vehicles: any[];
}

const VehicleTable = ({ vehicles }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            {[
              "Vehicle",
              "Model",
              "Type",
              "Owner",
              "Contact",
              "Price/Day",
              "Location",
              "Status",
              "Actions",
            ].map((h) => (
              <th key={h} className="px-6 py-3 text-left text-xs font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {vehicles.map((v) => (
            <VehicleRow key={v.id} vehicle={v} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
