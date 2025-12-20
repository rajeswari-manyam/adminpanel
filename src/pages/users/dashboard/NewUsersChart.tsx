const NewUsersChart = ({ data }: { data: any[] }) => {
  const max = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-6">New Users Analytics</h2>
      <div className="flex items-end justify-around h-48 gap-4">
        {data.map((d, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div className="w-full flex items-end h-40">
              <div
                className={`${d.color} w-full rounded-t-lg`}
                style={{ height: `${(d.value / max) * 100}%` }}
              />
            </div>
            <p className="text-xs mt-1">{d.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewUsersChart;
