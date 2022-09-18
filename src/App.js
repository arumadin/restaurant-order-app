import './App.css';
import { Store } from './Components/Store'

function App() {
  return (
    <div className="App">
      <div className='tickerMessage'>
        <p>This page is currently optimized for desktop browser only 👩🏻‍💻🌻</p>
      </div>
      <Store />
    </div>
  );
}

export default App;
