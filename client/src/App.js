import { Routes,  Route,} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from './components/Home/Home'
import RecipesDetail from "./components/RecipeDetails/RecipesDetail";
import Create from "./components/Create/Create";
import NotFound from "./components/NotFound/NotFound";
import AboutMe from './components/AboutMe/AboutMe.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/recipe/:id" element={<RecipesDetail/>} />
      <Route path= "/create" element={<Create/>}/>
      <Route path="*" element={<NotFound/>} />
      <Route path="/ramirotaramasco" element={<AboutMe/>}/>


  </Routes>
  );
}

export default App;
