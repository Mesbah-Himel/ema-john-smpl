import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Review from "./components/Review/Review";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Shipment from "./components/Shipment/Shipment";
import Login from "./components/Login/Login";
import { createContext } from "react";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Inventory from "./components/Inventory/Inventory";
import NotFound from "./components/NotFound/NotFound";

//const firebaseApp = firebase.initializeApp(firebaseConfig);

export const UserContext = createContext();

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>email :{loggedInUser.email}</h3>

      <Router>
      <Header></Header>
        <Routes>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/review" element={<Review />}></Route>
          {/* <Route exact path="/inventory" element={<Inventory />}></Route> */}
          <Route path="/invertory" element={<Inventory />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/shipment/*"
            element={
              <PrivateRoute>
                <Shipment />
              </PrivateRoute>
            }>
          </Route>
          <Route path="/" element={<Shop />}></Route>
          <Route
            path="/product/:productKey"
            element={<ProductDetail />}
          ></Route>
          <Route path="/login"></Route>
          <Route  path="/*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

// const firebaseAppAuth = firebaseApp.auth();

// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider(),
// };

// export default withFirebaseAuth({
//   providers,
//   firebaseAppAuth,
// })(App);

export default App;
