
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { api } from "./apiServices";
import "./App.css";

const INITIAL_CONVERSATIONS = [
  {
    id: "community",
    name: "TKA Community",
    avatar: "T",
    color: "purple",
    preview: "Welcome to your social space!",
    messages: [],
  },
  {
    id: "support",
    name: "Support Team",
    avatar: "S",
    color: "blue",
    preview: "How can we help you?",
    messages: [],
  },
];

const formatTime = (date) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Message = () => {
  const isLoggedIn =
    localStorage.getItem("loginStatus") === "success";

  const currentUser = JSON.parse(
    localStorage.getItem("userdetail") || "null"
  );

  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [search, setSearch] = useState("");
  const [activeChat, setActiveChat] = useState("community");
  const [draft, setDraft] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [conversations, setConversations] = useState(
    INITIAL_CONVERSATIONS
  );

  useEffect(() => {
    if (!isLoggedIn || !currentUser?.username) {
      return;
    }

    let cancelled = false;

    const loadMessages = async () => {
      setLoadingMessages(true);
      setErrorMessage("");

      try {
        const { data } = await api.get("/messages", {
          params: {
            conversationId: activeChat,
          },
        });

        if (cancelled) return;

        const sortedMessages = [...data].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
        );

        const loadedMessages = sortedMessages.map((message) => ({
          id: message.id,
          text: message.text,
          sender:
            message.senderUsername === currentUser.username
              ? "me"
              : "other",
          time: formatTime(message.createdAt),
        }));

        setConversations((previous) =>
          previous.map((chat) =>
            chat.id === activeChat
              ? {
                  ...chat,
                  messages: loadedMessages,
                  preview: sortedMessages.length
                    ? sortedMessages[sortedMessages.length - 1].text
                    : chat.preview,
                }
              : chat
          )
        );
      } catch (error) {
        console.error("Unable to load messages:", error);

        if (!cancelled) {
          setErrorMessage(
            "Unable to load messages. Check that JSON Server is running and db.json contains a messages array."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingMessages(false);
        }
      }
    };

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, [activeChat, isLoggedIn, currentUser?.username]);

  if (!isLoggedIn || !currentUser) {
    return <Navigate to="/" replace />;
  }

  const filteredConversations = conversations.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedChat = conversations.find(
    (chat) => chat.id === activeChat
  );

  const handleSend = async (event) => {
    event.preventDefault();

    const text = draft.trim();

    if (!text || !selectedChat || sendingMessage) {
      return;
    }

    setSendingMessage(true);
    setErrorMessage("");

    const newMessage = {
      conversationId: activeChat,
      senderUsername: currentUser.username,
      text,
      createdAt: new Date().toISOString(),
    };

    try {
      const { data } = await api.post("/messages", newMessage);

      const savedMessage = {
        id: data.id,
        text: data.text,
        sender: "me",
        time: formatTime(data.createdAt),
      };

      setConversations((previous) =>
        previous.map((chat) =>
          chat.id === activeChat
            ? {
                ...chat,
                preview: data.text,
                messages: [...chat.messages, savedMessage],
              }
            : chat
        )
      );

      setDraft("");
    } catch (error) {
      console.error("Unable to send message:", error);

      setErrorMessage(
        "Message could not be saved. Please check your JSON Server connection."
      );
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <Link to="/dashboard" className="dashboard-brand">
          <span className="brand-mark dashboard-brand-mark">T</span>
          <span>
            TKA <strong>SOCIAL</strong>
          </span>
        </Link>

        <Link to="/dashboard" className="profile-action">
          ← Dashboard
        </Link>
      </header>

      <section className="messages-page">
        <div className="messages-heading">
          <div>
            <p className="eyebrow">STAY CONNECTED</p>
            <h1>Your Messages</h1>
            <p>Conversations in your social space.</p>
          </div>

          <span className="messages-count">
            {conversations.length} conversations
          </span>
        </div>

        <div className="messages-layout">
          <aside className="conversation-panel">
            <div className="conversation-panel-heading">
              <h2>Chats</h2>
            </div>

            <input
              className="conversation-search"
              type="search"
              placeholder="Search conversations..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search conversations"
            />

            <div className="conversation-list">
              {filteredConversations.map((chat) => (
                <button
                  key={chat.id}
                  type="button"
                  className={`conversation-item ${
                    activeChat === chat.id ? "selected" : ""
                  }`}
                  onClick={() => {
                    setActiveChat(chat.id);
                    setErrorMessage("");
                  }}
                >
                  <span
                    className={`conversation-avatar ${chat.color}`}
                  >
                    {chat.avatar}
                  </span>

                  <span className="conversation-info">
                    <strong>{chat.name}</strong>
                    <span>{chat.preview}</span>
                  </span>
                </button>
              ))}

              {filteredConversations.length === 0 && (
                <p className="empty-conversations">
                  No matching conversations.
                </p>
              )}
            </div>
          </aside>

          <section className="chat-panel">
            {selectedChat ? (
              <>
                <header className="chat-header">
                  <span
                    className={`conversation-avatar ${selectedChat.color}`}
                  >
                    {selectedChat.avatar}
                  </span>

                  <div>
                    <h2>{selectedChat.name}</h2>
                    <p>Conversation history</p>
                  </div>
                </header>

                <div className="chat-messages">
                  <div className="chat-date-label">
                    CONVERSATION
                  </div>

                  {loadingMessages && (
                    <p className="chat-status">
                      Loading messages...
                    </p>
                  )}

                  {!loadingMessages &&
                    !errorMessage &&
                    selectedChat.messages.length === 0 && (
                      <div className="chat-empty">
                        <span>✉</span>
                        <h2>No messages yet</h2>
                        <p>Send a message to start this conversation.</p>
                      </div>
                    )}

                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message-row ${
                        message.sender === "me" ? "mine" : ""
                      }`}
                    >
                      <div className="message-bubble">
                        <p>{message.text}</p>
                        <span>{message.time}</span>
                      </div>
                    </div>
                  ))}

                  {errorMessage && (
                    <p className="chat-error" role="alert">
                      {errorMessage}
                    </p>
                  )}
                </div>

                <form className="chat-compose" onSubmit={handleSend}>
                  <input
                    type="text"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Write a message..."
                    aria-label="Write a message"
                    maxLength={2000}
                    disabled={sendingMessage}
                  />

                  <button
                    type="submit"
                    className="send-message-button"
                    disabled={!draft.trim() || sendingMessage}
                  >
                    {sendingMessage ? "Sending..." : "Send →"}
                  </button>
                </form>
              </>
            ) : (
              <div className="chat-empty">
                <span>✉</span>
                <h2>Select a conversation</h2>
                <p>Choose a chat to see its messages.</p>
              </div>
            )}
          </section>
        </div>

        <p className="messages-demo-note">
          Messages are saved to JSON Server and can be loaded again after
          refreshing the page.
        </p>
      </section>
    </main>
  );
};

export default Message;
