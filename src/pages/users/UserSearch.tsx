interface Props {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  resetPage: () => void;
}

const UserSearch = ({ searchQuery, setSearchQuery, resetPage }: Props) => (
  <div className="flex mb-4 gap-2">
    <input
      className="flex-1 p-3 border rounded-lg"
      placeholder="Search users..."
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        resetPage();
      }}
    />
    <button className="bg-gradient-to-r from-[#0B0E92] to-[#69A6F0] text-white px-6 py-3 rounded-lg">
      Search
    </button>
  </div>
);

export default UserSearch;
