import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <input
        type="text"
        placeholder="Enter Barcode Manually..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-white border-2 border-zinc-200 rounded-2xl px-5 py-4 pl-12 focus:border-indigo-500 focus:ring-0 outline-none transition-all font-medium text-zinc-800 shadow-sm"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
      <button 
        type="submit"
        disabled={isLoading}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all disabled:bg-zinc-300"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;


