import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import '../assets/Chat.css';
import db from '../firebase.js';
import { useStateValue } from '../StateProvider.js';
import firebase from 'firebase';

function Chat() {
    const [input, setInput] = useState('');
    const [roomName, setRoomName] = useState('');
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [{ user }, ] = useStateValue();

    useEffect(() => {
        if(roomId) {
          db.collection('rooms')
            .doc(roomId)
            .onSnapshot(
                snapshot => setRoomName(snapshot.data().name)
            )
          db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(
                snapshot => setMessages(snapshot.docs.map(doc => doc.data()))
            )
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>>", input);
        
        db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                    Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]
                            ?.timestamp
                            ?.toDate()
                        ).toUTCString()}
                    </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(mes => (
                    <div className={`chat__message ${mes.name === user.displayName ? 'chat__receiver' : ''}`}>
                        <span className="chat__name">{mes.name}</span>
                        <span className="chat__content">{mes.message}</span>
                        <span className="chat__timestamp">
                            {new Date(mes.timestamp?.toDate()).toUTCString()}
                        </span>
                    </div>
                ))}
                
                
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input 
                        value={input} 
                        onChange={e => setInput(e.target.value)} 
                        type="textarea" 
                        placeholder="Type a message"
                    />
                    <button type="submit" onClick={sendMessage}>Send</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat
