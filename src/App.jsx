import { Content } from "./Content";
import "./style.scss";
import { BrowserRouter } from "react-router-dom";
import Pusher from "pusher-js";
import { PusherProvider } from "./PusherContext.jsx";

Pusher.logToConsole = true;

const pusher = new Pusher("43491bb7323d0c9bbcbf", {
  cluster: "us3",
});

function App() {
  return (
    <PusherProvider pusher={pusher}>
      <div>
        <BrowserRouter>
          <Content />
        </BrowserRouter>
        {/* <Header /> */}

        {/* <Footer /> */}
      </div>
    </PusherProvider>
  );
}

export default App;
