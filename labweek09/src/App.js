import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // Store the information shown on the page.
  const [info] = useState({
    heading: 'Welcome to Fullstack Development - I',
    lab: 'React JS Programming Week09 Lab exercise',
    studentId: '101581979',
    name: 'Disha Padsala',
    college: 'George Brown College, Toronto'
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="React logo" />

        {/* Display the information from state. */}
        <h1>{info.heading}</h1>
        <h2>{info.lab}</h2>
        <h3>{info.studentId}</h3>
        <h4>{info.name}</h4>
        <h5>{info.college}</h5>
      </header>
    </div>
  );
}

export default App;
