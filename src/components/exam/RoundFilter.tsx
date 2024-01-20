const RoundFilter: React.FC = () => {
  return (
    <div className="mt-2">
      <select
        id="subject"
        name="subject"
        className="w-[100%] mx-auto mt-1 text-h4 font-bold block p-3 bg-white rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-300 sm:text-sm">
        <option>1회</option>
      </select>
    </div>
  );
};

export default RoundFilter;
