import { Content } from "./Content";
import "./style.scss";
import { BrowserRouter } from "react-router-dom";
import Pusher from "pusher-js";
import { PusherProvider } from "./PusherContext.jsx";

Pusher.logToConsole = true;

function App() {
  return (
    <PusherProvider pusher={pusher}>
      <div>
        <BrowserRouter>
          <Content />
        </BrowserRouter>
      </div>
    </PusherProvider>
  );
}

export default App;
