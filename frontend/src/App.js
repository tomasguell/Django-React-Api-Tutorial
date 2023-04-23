import {
  BrowserRouter as Router,
  Routes,
   Route
}from "react-router-dom";

import NotePage from "./pages/NotePage";




import Header from './components/Header';
import NotesListPage from './pages/NotesListPage'

import './App.css';

function App() {
  return (
    <Router>
      


    <div className="container">
      <div className="app">
        <Header/>
        <Routes>
        <Route path="/" element= {<NotesListPage/>}/>
        <Route path="/note/:id" element={<NotePage />} />

        </Routes>
      </div>
    </div>
    
    </Router>
  );
}

export default App;
