import React, { useState, useEffect, useRef } from 'react';
import MessagesList from './messagesList';
//import axios from 'axios';

// on the client side we have User || On server side we have Ollama
function Message() {

    const [messageTyping, setMessageTyping] = useState("");
    const [messages, setMessages] = useState([]); // messages are stored in this array
    const messageEndRef = useRef(null);

    function handleMessageTyping(e) {
        setMessageTyping(e.target.value);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            setMessageTyping(messageTyping + "\n");
        } else if (e.key === 'Enter' && e.target.value.trim().length !== 0) {
            e.preventDefault();
            const newMessage = {
                clientSide: true,
                message: messageTyping
            }
            setMessages(prevMessages => [...prevMessages, newMessage]);
            // send this message to Ollama for processing -> this will trigger useEffect()
            // axios.post('http://localhost:8080/', {
            //     message: messageTyping
            // })

            setMessageTyping("");
        }
    }

    // trigger only when user enters message that will be processed in handleKeyDown()
    useEffect(() => {
        const fetchResponse = async () => {
            try {
                // const response = await axios.get('http://localhost:8080/users'); // Ollama comes here    
                const response = "testing Ollama response message"
                // This is where we update our JSON
                const newMessage = {
                    clientSide: false,
                    message: response
                }
                setMessages(prevMessages => [...prevMessages, newMessage]);

            } catch (error) {
                console.error("Error fetching response:", error);
            }
        };

        fetchResponse();
    }, []);

    // Scroll to the bottom when a new message is added
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])


    return (
        <>
            <div className="flex flex-col flex-grow self-start w-[40%] max-w-5xl bg-gray-400 border-r-8 shadow-xl overflow-hidden">
                <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                    <MessagesList messages={messages} />
                    <div ref={messageEndRef} />
                </div>

                <div className="bg-gray-300 p-4 font-bold outline-2">
                    <textarea className="flex items-center w-full rounded h-29 p-3 text-1xl mt-2 outline-2 resize-none"
                        placeholder="Message Agent"
                        value={messageTyping}
                        onChange={handleMessageTyping}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>

        </>
    );

}
export default Message;