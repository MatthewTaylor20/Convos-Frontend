import axios from "axios";
import { useNavigate } from "react-router-dom";

export function RightClickMenu({ x, y, showMenu, group, onDeleteGroup }) {
  const navigate = useNavigate();

  const style = () => {
    return {
      top: y,
      left: x,
      display: showMenu ? "flex" : "none",
    };
  };
  const handleDelete = () => {
    console.log(`delete ${group}`);
    axios
      .delete(`http://localhost:3000/groups/${group.id}.json`)
      .then((response) => {
        console.log(response.data);
        onDeleteGroup(group);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  };
  return (
    <div className="right-click-menu" style={style()}>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
