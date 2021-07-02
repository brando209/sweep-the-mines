import { useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Select from './components/input/Select/Select';
import Grid from './components/Grid/Grid';

import { DIFFICULTY } from './utility/grid/grid';

function App() {
  const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY);

  useMemo(() => {
    console.log("Difficulty set to:", difficulty);
  }, [difficulty]);

  const handleSelectDifficulty = (selection) => {
    setDifficulty(selection);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Minesweeper</p>
        <Select name="difficulty" label="Difficulty: " onSelect={handleSelectDifficulty}>
          <option key="easy" value={DIFFICULTY.EASY}>Easy</option>
          <option key="med" value={DIFFICULTY.MEDIUM}>Medium</option>
          <option key="hard" value={DIFFICULTY.HARD}>Hard</option>
        </Select>
      </header>
      <div className="App-content">
        <Grid gridDifficulty={difficulty} />
      </div>
    </div>
  );
}

export default App;
