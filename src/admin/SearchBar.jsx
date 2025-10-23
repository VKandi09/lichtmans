const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border px-4 py-2 w-1/2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus-within:border-transparent"
      />
    </div>
  );
};

export default SearchBar;
