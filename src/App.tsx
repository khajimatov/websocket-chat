import { useEffect, useState } from 'react';
import './App.css';
import NewUserForm from './components/NewUserForm';
import MessagesSection from './components/MessagesSection';

function App() {
  const [statusClassName, setStatusClassName] = useState('my-status');
  const [myStatus, setMyStatus] = useState('Offline');
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    let socket = new WebSocket('ws://159.69.30.195:8001/chat');

    socket.onopen = function (e) {
      setMyStatus('Online');
      setStatusClassName('my-status-online');
    };

    socket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      switch (data.type) {
        case 'CONNECTED':
          setConnectedUsers(data.connectedUsers);
          break;
        case 'LOGGED_IN':
          console.log(data);
          break;
        
        default:
          break;
      }
    };
  }, []);

  return (
    <div className='wrapper'>
      <h1>WebSocket-Chat</h1>
      <h3>My status: <span className={statusClassName}>{myStatus}</span></h3>
      <section className='users-and-newusername'>
        <div className="connected-users">
          <p id="connected-users-title">Connected Users</p>
          <ol id="connected-users-list">
            {connectedUsers.length > 0 ? connectedUsers.map(user => `<li>${user}</li>`) : 'No connected users'}
          </ol>
        </div>
        <NewUserForm />
      </section>
      <MessagesSection />
    </div>
  );
}

export default App;