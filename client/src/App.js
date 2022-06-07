import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from "./components/LandingPage/LandingPage.jsx";
// import Home from './components/Home/Home'
// import RecipesDetail from "./components/RecipesDetails/RecipesDetail";
// import Create from "./components/Create/Create";
// import NotFound from "./components/NotFound/NotFound";
import AboutMe from './components/AboutMe/AboutMe'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path ='/' component ={LandingPage}/>
          {/* <Route exact path ='/home' component ={Home}/>
          <Route exact path ="/recipe/:id" element={<RecipesDetail/>} />
          <Route exact path ="/create" element={<Create/>}/>
          <Route exact path ="*" element={<NotFound/>} /> */}
          <Route exact path ='/aboutme' component ={AboutMe}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
