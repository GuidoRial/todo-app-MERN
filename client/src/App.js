import "./App.css";
import SignUp from "./Components/Signup/SignUp";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Main from "./Components/Main/Main";
import { useState } from "react";

function App() {
    const [user, setUser] = useState(null);
    console.log(user);

    /* 
    If there is a user, show them the dashboard, else redirect him to login and only allow them to go to signup page
    User is stored in localStorage and each component will check on load if there's something in there.  
    */
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {!user && (
                        <>
                            <Route
                                path="/signup"
                                element={
                                    <SignUp user={user} setUser={setUser} />
                                }
                            />
                            <Route
                                path="/login"
                                element={
                                    <Login user={user} setUser={setUser} />
                                }
                            />
                        </>
                    )}
                    {user && (
                        <Route
                            path="/"
                            element={<Main user={user} setUser={setUser} />}
                        />
                    )}

                    <Route
                        path="*"
                        element={<Navigate to={user ? "/" : "/login"} />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
