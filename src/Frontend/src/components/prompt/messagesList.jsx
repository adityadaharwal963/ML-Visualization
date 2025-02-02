import React from 'react';


// 
const MessagesList = ({ messages }) => {

    // console.log('created at: ', messages);
    // console.log('messages sender name: ', messages[0]?.senderUsername, " | current name: ", currentUsername);

    return (
        <>
            <div>
                {messages.map((message, index) => (
                    message.clientSide ?
                        (
                            <div key={index} >
                                <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                                    <div>
                                        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                            <p>
                                                {message.message && message.message.split("\n").map((line, idx) => (
                                                    <React.Fragment key={idx}>
                                                        {line}
                                                        <br />
                                                    </React.Fragment>
                                                ))}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div key={index} className="flex w-full mt-2 space-x-3 max-w-xs">
                                <div>
                                    <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                        <p>
                                            {message.message && message.message.split("\n").map((line, idx) => (
                                                <React.Fragment key={idx}>
                                                    {line}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                ))
                }
            </div>
        </>
    )
}

export default MessagesList;   