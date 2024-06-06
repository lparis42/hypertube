import React, { useEffect, useState, useCallback } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import io from 'socket.io-client';

const authentification_token = localStorage.getItem('authentification_token');
const socket = io({
  autoConnect: false,
  auth: {
    token: authentification_token,
  }
})

function App() {
  const [count, setCount] = useState(0)
  const [socketConnected, setSocketConnected] = useState(false);

  const eventReconnectAttempt = useCallback((attemptNumber) => {
    console.log('Reconnect attempt:', attemptNumber);
    socket.auth.token = localStorage.getItem("authentification_token");
  }, [socket]);

  const eventSocketDisconnect = useCallback(() => {
    console.log('Socket disconnected');
    setSocketConnected(false);
  }, []);

  const eventSocketError = useCallback((error) => {
    console.error('Connection failed:', error);
  }, [socket]);

  const eventSession = useCallback((data) => {
    console.log('Received new session:', data);
    localStorage.setItem("authentification_token", data);
  }, [socket]);

  const eventSocketConnect = useCallback(() => {
    console.log('Socket connected');

    socket.on('reconnect_attempt', eventReconnectAttempt);
    socket.on('disconnect', eventSocketDisconnect);
    socket.on('connect_error', eventSocketError);

    socket.on('server:session', eventSession);

    setSocketConnected(true);

    return () => {
      socket.off('reconnect_attempt', eventReconnectAttempt);
      socket.off('disconnect', eventSocketDisconnect);
      socket.off('connect_error', eventSocketError);

      socket.off('server:session', eventSession);
    };
  }, [socket, eventReconnectAttempt, eventSocketDisconnect, eventSocketError, eventSession]);

  useEffect(() => {
    socket.connect();
    socket.on('connect', eventSocketConnect);
    return () => {
      socket.off('connect', eventSocketConnect);
    };
  }, [socket, eventSocketConnect]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p>{socketConnected ? 'Socket is connected' : 'Socket is disconnected'}</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
