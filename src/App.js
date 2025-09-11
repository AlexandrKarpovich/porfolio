import './App.css';
import Portfolio from './components/Portfolio/Portfolio';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Мое Портфолио</h1>
        <p>Здесь собраны мои проэкты c github</p>
      </header>
      <Portfolio />
    </div>
  );
}

export default App;
