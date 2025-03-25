import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TestComp from "./pages/test";
import Sample from "./pages/Sample";
// import About from "./pages/About";
// import Work from "./pages/Work";
// import Shop from "./pages/Shop";
// import Contacts from "./pages/Contacts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestComp />} />
         <Route path="/sample" element={<Sample />} />
        {/* <Route path="/work" element={<Work />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contacts" element={<Contacts />} /> */}
      </Routes>
    </>
  );
}


export default App;
