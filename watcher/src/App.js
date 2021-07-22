import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const socket = new WebSocket("ws://localhost:8080/chat/watcher")
socket.onopen = () => {
  console.log('connected')
}

function App() {

  const [msg, setMsg] = useState(null)

  socket.onmessage = e => setMsg(e.data)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>{msg}</code>
        </p>
      </header>
    </div>
  );
}

export default App;
