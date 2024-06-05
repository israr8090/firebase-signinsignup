import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import SignIn from "./components/SignIn"
import Deshbord from "./components/Deshbord"
import { useEffect, useState } from "react"
import { auth } from "./components/firebase";


function App() {

  const [user,setUser] = useState();

  //--this is for checking is user logged in or not--
  const userIs = async () => {
     auth.onAuthStateChanged(user);
    setUser(user)
    console.log(user)
  }

  useEffect(() => {
    userIs();
  },[])
  
  return (
    <>
      <div className="h-screen w-full bg-slate-600 flex items-center justify-center">
        
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element= {<SignIn/>} /> */}
            <Route path="/" element={user ? <Navigate to="/profile"/> : <SignIn/>} />
            <Route path="/profile" element={<Deshbord/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
