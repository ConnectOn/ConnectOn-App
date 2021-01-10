import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import io from 'socket.io-client'
import axios from 'axios';
import {SERVER_URL} from '@env';

var socket = io(SERVER_URL);

const Chat = ({navigation}) =>  {
  const [messages, setMessages] = useState([]);
  const sender=navigation.getParam('sender',null);
  const receiver=navigation.getParam('receiver',null);
  useEffect(() => {
    const url=`${SERVER_URL}/chats/${sender.id}/${receiver.id}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setMessages(res.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
    socket.on("chat message", msg => {
      setMessages([...messages, msg]);
    });
  }, [])
 
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    socket.emit('newMessage', messages)
    axios
        .post(SERVER_URL + '/chats', {
                sender: sender.id,
                reciever: receiver.id,
                messages: messages
        })
        .catch(function(error) {
                console.log("Hell");
                console.log(error);
        });
    console.log(sender.id+" "+receiver.id)
  }, [])

  // const onSend = async (message = []) => { const newMessages = await GiftedChat.append(messages, message) 
  //   socket.on('send-chat-message', newMessages => { setMessages(newMessages) }); socket.emit('chat-message', newMessages); }
 
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: sender.id,
      }}
    />
  )
}
export default Chat;