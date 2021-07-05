import { useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Select from './components/input/Select/Select';
import Grid from './components/Grid/Grid';

import { DIFFICULTY } from './utility/grid/grid';
import Overlay from './components/Overlay/Overlay';

function App() {
  const [difficulty, setDifficulty] = useState(DIFFICULTY.EASY);
  const [resetToggle, setResetToggle] = useState(false);
  const [overlay, setOverlay] = useState({ active: false, render: null });

  const handleGameOver = useMemo(() => ((win) => {
    const overlayRender = (endCondition) => {
      return () => (
        <div>
          {`You ${endCondition}!`}
          <div style={{ cursor: "pointer" }} onClick={handleReset}>Reset</div>
        </div>
      );
    }

    if(win) {
      setOverlay({ active: true, render: overlayRender("WIN!")})
    } else {
      setOverlay({ active: true, render: overlayRender("Lose")})
    }
  }), []);

  const handleSelectDifficulty = (selection) => {
    setDifficulty(selection);
    setOverlay({ active: false, render: null });
  }

  const handleReset = () => {
    setResetToggle(prev => !prev);
    setOverlay({ active: false, render: null });
  }

  return (
    <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Minesweeper</p>
          <button className="reset-button" onClick={handleReset}>Reset</button>
          <Select className="difficulty-select" name="difficulty" label="Difficulty: " onSelect={handleSelectDifficulty}>
            <option key="easy" value={DIFFICULTY.EASY}>Easy</option>
            <option key="med" value={DIFFICULTY.MEDIUM}>Medium</option>
            <option key="hard" value={DIFFICULTY.HARD}>Hard</option>
          </Select>
        </header>
        <Overlay active={overlay.active} render={overlay.render}>
          <div className="App-content">
            <Grid gridDifficulty={difficulty} resetToggle={resetToggle} onGameOver={handleGameOver}/>
          </div>
        </Overlay>
    </div>
  );
}

export default App;
