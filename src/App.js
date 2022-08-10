import './App.css';
import './ConfugureAmplify'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Page/Home';
import CreateVlog from './Page/CreateVlog';
import Profile from './Page/Profile';
import MyVlogs from './Page/MyVlogs';
import Id from './Page/Id';
import EditVlog from './Page/EditVlog';
import Navbar from './Component/Navber'
function App() {
  return (
    <div className=" mx-24">
    <Navbar />
    <h3 className=' font-extralight text-5xl text-green-400'>hello world</h3>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/createBlog" element={<CreateVlog/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      <Route path="/blog" element={<MyVlogs/>}/>
      <Route path="/blog/:id" element={<Id/>}/>
      <Route path="/edit-post/:id" element={<EditVlog/>}/>
    </Routes>
  </div>
  );
}

export default App;
