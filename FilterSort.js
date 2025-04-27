function FilterSort({ users, filterUser, setFilterUser, sortType, setSortType, sortOptions }) {
  return (
    <div className="filter-sort">
      <select value={filterUser} onChange={(e) => setFilterUser(e.target.value)}>
        <option value="">All Users</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        {sortOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

export default FilterSort;