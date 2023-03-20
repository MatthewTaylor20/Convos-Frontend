import { Content } from "./Content";
import "./style.scss";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Content />
      </BrowserRouter>
      {/* <Header /> */}

      {/* <Footer /> */}
    </div>
  );
}

export default App;
