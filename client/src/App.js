import "./App.css";
import SignUp from "./Components/Signup/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Main from "./Components/Main/Main";
import { useState } from "react";

function App() {
    const [user, setUser] = useState({});
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/login"
                        element={<Login user={user} setUser={setUser} />}
                    />
                    <Route
                        path="/"
                        element={<Main user={user} setUser={setUser} />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
