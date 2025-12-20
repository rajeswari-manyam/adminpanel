export const getStatusColor = (status: string): string => {
  const colors = {
    Upcoming: 'bg-blue-100 text-blue-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Confirmed: 'bg-green-100 text-green-800',
    Completed: 'bg-gray-100 text-gray-800',
  };
  return colors[status as keyof typeof colors];
};
