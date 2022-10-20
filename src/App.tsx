import { useEffect, useState, useRef, MutableRefObject } from 'react';
import './App.css';
import NewUserForm from './components/NewUserForm';
import MessagesSection from './components/MessagesSection';


interface Message {
  username: string,
  text: string
}

function App() {

  const [statusClassName, setStatusClassName] = useState('my-status');
  const [myStatus, setMyStatus] = useState('Offline');
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  let users = useRef(connectedUsers);

  const mySocket = useRef() as MutableRefObject<WebSocket>;

  useEffect(() => {
    let socket: WebSocket = new WebSocket('ws://159.69.30.195:8001/chat');

    mySocket.current = socket;

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
          let receivedMessages: Message[] = JSON.parse(data.messages);
          setMessages(receivedMessages);
          break;
        case 'NEW_USER':
          setConnectedUsers((currentUsers) => [...currentUsers, data.username]);
          break;
        case 'NEW_MESSAGE':
          let newMessage: Message = data.message;
          setMessages((currentMessages) => [...currentMessages, newMessage]);
          break;
        case 'USER_LOGGED_OUT':
          loggedOut(data.username);
          break;

        default:
          break;
      }
    };
  }, []);

  users.current = connectedUsers;

  function loggedOut(username: string) {
    let newUsers = users.current.filter(user => user !== username);
    setConnectedUsers(newUsers);
  };

  return (
    <div className='wrapper'>
      <h1>WebSocket-Chat</h1>
      <h3>My status: <span className={statusClassName}>{myStatus}</span></h3>
      <section className='users-and-newusername'>
        <div className="connected-users">
          <p id="connected-users-title">Connected Users</p>
          <ol id="connected-users-list">
            {connectedUsers.length > 0 ? connectedUsers.map(user => <li>{user}</li>) : 'No connected users'}
          </ol>
        </div>
        <NewUserForm socket={mySocket.current} />
      </section>
      <MessagesSection socket={mySocket.current} messages={messages} />
    </div>
  );
}

export default App;