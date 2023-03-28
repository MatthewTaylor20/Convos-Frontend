export function Search(props) {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="find a group" onChange={(e) => props.onSearch(e.target.value)} />
      </div>
    </div>
  );
}
