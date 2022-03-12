import './App.css';
import HelloWorld from './components/HelloWorld';
import List from './components/List';
import { grpc } from "@improbable-eng/grpc-web";
import { GreeterClientImpl, GrpcWebImpl } from "./components/gen/helloworld/helloworld";
import { useState, useEffect } from 'react';
// require('dotenv').config();

/* const avengers = [
  'Captain America',
  'Iron Man',
  'Black Widow',
  'Thor',
  'Hawkeye',
] */

const avengers = [
  { name: 'Captain America' },
  { name: 'Iron Man' },
  { name: 'Black Widow' },
  { name: 'Thor' },
  { name: 'Hawkeye' },
  { name: 'Vision' },
  { name: 'Hulk' },
]

function App() {

  let transport = grpc.CrossBrowserHttpTransport({});
  let api_server_port = process.env.REACT_APP_API_SERVER_PORT || 8090;
  let api_server_host = process.env.REACT_APP_API_SERVER_HOST || "127.0.0.1";
  let api_server_url = "http://"+api_server_host+":"+api_server_port
  console.log("API server is", api_server_url)
  let grp_client = new GrpcWebImpl(api_server_url, {
       transport })

  let greeterClient = new GreeterClientImpl(grp_client);

  const [message, setMessage] = useState('');

  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!message) {
        getMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const getMessage = async () => {
    let response = await greeterClient.SayHello({name : "Satya8090"});
    setMessage(response.message);
  };

  const [message2, setMessage2] = useState('');

  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!message2) {
        getMessage2();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const getMessage2 = async () => {
    let response = await greeterClient.SayHelloAgain({name : "Hulk"});
    setMessage2(response.message);
  };


  return (
    <div className="App">
      <HelloWorld />
      <List data={avengers} />
      <h1>Response is {message}</h1>
      <h1>Response is {message2}</h1>
    </div>
  );
}

export default App;
