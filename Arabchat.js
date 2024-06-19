import React from 'react';
import Navigation from './Navigationbar.js';
import './Chatbot.css';

class Chatbot extends React.Component {
  constructor(props) {
    super(props);
    this.messagesContainerRef = React.createRef();
    this.state = {
      messages: [],
      userInput: ''
    };
  }

  handleChange = (event) => {
    this.setState({ userInput: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { userInput, messages } = this.state;
    const trimmedInput = userInput.trim();
    // Check if the trimmed input is not empty
    if (trimmedInput === '') {
      return;
    }
    // Add the user's message to the chat interface immediately
    const updatedMessages = [{ sender: 'User', text: trimmedInput }, ...messages]; // Add new messages at the beginning
    this.setState({ messages: updatedMessages, userInput: '' }, this.scrollToBottom);
    // Call the method to handle the chatbot's response after a delay (simulating a response time)
    setTimeout(() => {
      this.handleBotResponse(trimmedInput);
    }, 500); // Adjust the delay time as needed
  };

  handleBotResponse = (userInput) => {
    // Placeholder for bot response (replace with your chatbot logic)
    const botResponse = "Hello. What can I do for you?";
    const { messages } = this.state;
    const updatedMessages = [{ sender: 'Bot', text: botResponse }, ...messages]; // Add new messages at the beginning
    this.setState({ messages: updatedMessages }, this.scrollToBottom);
  };

  scrollToBottom = () => {
    const container = this.messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  formatMessageText = (text) => {
    const maxLength = 50; // Maximum length for messages
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '\n' + text.slice(maxLength);
    }
    return text;
  };

  render() {
    const { messages, userInput } = this.state;
    return (
      <div className="App">
        <Navigation />
        <div className="chatbot-container">
          <div className="messages-container" ref={this.messagesContainerRef}>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender.toLowerCase()}`}>
                <div className="message-text">{this.formatMessageText(message.text)}</div>
              </div>
            ))}
          </div>
          <form onSubmit={this.handleSubmit} className="input-container">
            <input
              type="text"
              value={userInput}
              onChange={this.handleChange}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chatbot;
