import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageSelector from "./components/ImageSelector";

function App() {

  return (
    <div className="container-fluid p-4">
     <ImageSelector/>
    </div>
  );
}

export default App;
