import { ToastContainer } from "react-toastify";
import NavBar from "./componets/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./componets/Home";
import AddContact from "./componets/AddContact";
import EditContact from "./componets/EditContact";
const App = () => {
  return (   
      <>
      <ToastContainer/>
      <NavBar/>
         <Routes>
           <Route path='/' element={<Home />} exact />
           <Route path='/add' element={<AddContact/>} exact />
           <Route path='/edit/:id' element={<EditContact/>} exact />
        </Routes>  
      </>    
  );
}

export default App;
