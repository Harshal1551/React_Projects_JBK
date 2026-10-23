import { useSelector, useDispatch } from "react-redux";
import { changeUsername } from "./redux/userSlice";

function Home() {
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Home Component</h2>
      <p>Username: {username}</p>

      <button onClick={() => dispatch(changeUsername())}>
        Change Username
      </button>
    </div>
  );
}

export default Home;