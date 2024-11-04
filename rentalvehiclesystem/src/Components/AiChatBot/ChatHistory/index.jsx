import React from "react";
import ReactMarkdown from "react-markdown";
import { Card, Typography } from "antd";

const { Text } = Typography;

const ChatHistory = ({ chatHistory }) => {
  return (
    <div style={{ maxHeight: "400px", overflowY: "auto", padding: "10px" }}>
      {chatHistory.map((message, index) => (
        <Card
          key={index}
          style={{
            marginBottom: "10px",
            borderRadius: "8px",
            backgroundColor: message.type === "user" ? "#f0f0f0" : "#e6f7ff",
            border: message.type === "user" ? "1px solid #d9d9d9" : "1px solid #91d5ff",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            {message.type === "user" && (
              <Text strong style={{ marginRight: "8px", color: "#595959" }}>
                You:
              </Text>
            )}
            {message.type === "bot" && (
              <Text strong style={{ marginRight: "8px", color: "#1890ff" }}>
                Bot:
              </Text>
            )}
            <Text>
              <ReactMarkdown>{message.message}</ReactMarkdown>
            </Text>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ChatHistory;
