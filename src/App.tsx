import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TestComp from "./pages/test";
import Sample from "./pages/Sample";
import { useEffect } from "react";
// import About from "./pages/About";
// import Work from "./pages/Work";
// import Shop from "./pages/Shop";
// import Contacts from "./pages/Contacts";

function App() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("User is back on the tab");
        // call your function here
      } else {
        console.log("User left the tab");
        // call another function here
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

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
