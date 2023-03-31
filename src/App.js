import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./LoginAndSignupComponents/Login";
import SingUp from "./LoginAndSignupComponents/signUp";
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from "./firebase";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [login,setLogin] = useState(true);
  const [username,setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image,setImage] = useState("");

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setTimeout(()=>{
        if(user){
          setUsername(user.displayName);
          setEmail(user.email);
          if(localStorage.key(user.email)){
            setImage(localStorage.getItem(user.email));
          }
          else{
            setImage("https://toppng.com/uploads/preview/vu-thi-ha-user-pro-icon-115534024853ae3gswzwd.png");
          }
        }
      },1000);
    });
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {login?<>
        <Routes>
        <Route path="/signup" element={<SingUp/>}/>
          <Route path="/" element={<Login login={login} setLogin={setLogin}/>}/>
        </Routes>
        </>:
        <div className="app">
        <Sidebar isSidebar={isSidebar} username={username} email={email} image={image} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} setLogin={setLogin} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contacts" element={<Contacts />} />
            {/* <Route path="/invoices" element={<Invoices />} /> */}
            <Route path="/form" element={<Form />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/geography" element={<Geography />} />
          </Routes>
        </main>
      </div>
        }
        
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
