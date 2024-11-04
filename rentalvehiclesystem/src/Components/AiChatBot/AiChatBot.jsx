import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Card, Input, Button, Typography, Space } from "antd";
import ChatHistory from "./ChatHistory";
import Loading from "./Loading";

const { TextArea } = Input;
const { Title } = Typography;

const AiChatBot = () => {
    const apiKey = import.meta.env.VITE_GOOGLE_AI_API;
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    // Initialize your Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Function to handle user input
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    // Function to send user message to Gemini
    const sendMessage = async () => {
        if (userInput.trim() === "") return;

        setIsLoading(true);
        try {
            // Call Gemini API to get a response
            const result = await model.generateContent(userInput);
            const response = await result.response;

            // Add Gemini's response to the chat history
            setChatHistory([
                ...chatHistory,
                { type: "user", message: userInput },
                { type: "bot", message: response.text() },
            ]);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setUserInput("");
            setIsLoading(false);
        }
    };

    // Function to clear the chat history
    const clearChat = () => {
        setChatHistory([]);
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
                IsakayAI
            </Title>

            <Card
                className="chat-container"
                style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    padding: "16px",
                    marginBottom: "20px",
                }}
            >
                <ChatHistory chatHistory={chatHistory} />
                <Loading isLoading={isLoading} />
            </Card>

            <Space direction="vertical" style={{ width: "100%" }}>
                <TextArea
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={handleUserInput}
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    disabled={isLoading}
                    style={{ borderRadius: "8px" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={sendMessage}
                        loading={isLoading}
                        style={{ borderRadius: "8px", width: "100px" }}
                    >
                        Send
                    </Button>
                    <Button
                        type="default"
                        danger
                        onClick={clearChat}
                        style={{ borderRadius: "8px", width: "100px" }}
                    >
                        Clear Chat
                    </Button>
                </Space>
            </Space>
        </div>
    );
};

export default AiChatBot;
