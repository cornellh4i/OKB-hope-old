
// const analytics = getAnalytics(app);
import NavBar from "./NavBar"
import ChatBox from "./Chatbox"
import Welcome from "./Welcome"
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./chatroom.css"
function Chatroom() {
  const [user] = useAuthState(auth);

  return (
    <div className="Chatroom">

      <NavBar />
      {!user ? (<p>PLEASE LOGIN ON THE RIGHT TO USE THE CHATROOM</p>) :
        (<>
          <ChatBox />
        </>)
      }
    </div>
  );
}
export default Chatroom;
