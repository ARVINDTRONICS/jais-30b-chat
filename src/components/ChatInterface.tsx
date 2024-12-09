"use client";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
const ChatInterface = () => {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hello! How can I assist you today?" }]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessage = { role: "user", content: input };

    setMessages((prev) => [
      ...prev,
      newMessage,
      {
        role: "assistant",
        content: "...",
      },
    ]);

    setInput("");

    try {
      const response = await fetch("/api/askjais", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "system", content: "You are a helpful assistant" }, newMessage],
        }),
      });

      const data = await response.json();

      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = {
          role: "assistant",
          content: data.message,
        };
        return updatedMessages;
      });
    } catch (error) {
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = {
          role: "assistant",
          content: "An error occurred while processing your request. Please try again.",
        };
        return updatedMessages;
      });
    }
  };

  const handleClear = () => {
    setMessages([{ role: "assistant", content: "Hello! How can I assist you today?" }]);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 w-full ">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 p-3 rounded-lg w-3/4 mx-auto ${msg.role === "user" ? "bg-purple-400 text-white self-end" : "bg-gray-200 text-gray-800 self-start"}`}>
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-300  flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center w-full">
          <div className="w-5/6  ">
            <input
              type="text"
              className="flex-1 w-full px-4 py-2 border text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            ></input>
            
          </div>
          <div className="flex my-2 ">
              <button className="ml-2" onClick={handleSend}>
                <FiSend  color="#000000"/>
              </button>
              <button className="ml-2" onClick={handleClear}>
                <RiDeleteBin2Line color="#000000"/>
              </button>
            </div>
        </div>
        <div>
          <p className="text-gray-400 text-center my-2">Powered by G42 and MBZUAI</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
