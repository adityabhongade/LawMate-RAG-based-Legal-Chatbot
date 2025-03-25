import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";

interface Message {
  isBot: boolean;
  text: string;
}

const ChatDemo = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      isBot: true,
      text: "Hello! I'm Law Mate. How can I assist you today?",
    },
    {
      isBot: false,
      text: "What are my rights as a tenant if my landlord won't fix my heating?",
    },
    {
      isBot: true,
      text: `As a tenant, you generally have the right to a habitable living space, which includes functioning heating. In most jurisdictions, landlords are required to maintain essential services like heating.

Here are some steps you might consider:
1. Document the issue in writing
2. Send a formal request for repairs
3. Check local tenant rights organizations
4. Contact your local housing authority

Note: Laws vary by location. For specific advice, consult with a local attorney.`,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        isBot: false,
        text: inputValue,
      },
    ]);
    
    // Clear input
    setInputValue("");
    
    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          isBot: true,
          text: "Thank you for your question. This is a demo, so I'm showing a predefined response. On the real Law Mate, you would receive helpful legal information based on your specific question.",
        },
      ]);
    }, 1000);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#0a1f44] text-center mb-4">Experience Our Chat</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          See how Law Mate can help answer your legal questions with clear, concise information.
        </p>
        
        <div className="max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#0a1f44] p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <i className="fas fa-balance-scale mr-2"></i>
                <h3 className="font-bold">Law Mate Assistant</h3>
              </div>
              <button className="text-white focus:outline-none">
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          
          <div className="h-96 p-4 overflow-y-auto bg-gray-50" ref={chatMessagesRef}>
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`chat-message flex mb-4 ${!message.isBot ? "justify-end" : ""}`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-[#0a1f44] flex items-center justify-center text-white mr-2 flex-shrink-0">
                    <i className="fas fa-robot text-sm"></i>
                  </div>
                )}
                
                <div 
                  className={`chat-bubble ${
                    message.isBot 
                      ? "bg-blue-100 rounded-lg rounded-tl-none" 
                      : "bg-white rounded-lg shadow-sm rounded-tr-none"
                  } p-3 max-w-[80%] whitespace-pre-line`}
                >
                  <p>{message.text}</p>
                </div>
                
                {!message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white ml-2 flex-shrink-0">
                    <i className="fas fa-user text-sm"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-white border-t">
            <form onSubmit={handleSubmit} className="flex">
              <input 
                type="text" 
                placeholder="Type your legal question here..." 
                className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button 
                type="submit" 
                className="bg-[#4a90e2] hover:bg-[#5aa0f2] text-white p-2 rounded-r-lg transition duration-300"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href="/chat" 
            className="inline-block bg-[#0a1f44] hover:bg-[#1a2f54] text-white font-bold py-3 px-8 rounded-lg transition duration-300"
          >
            Start Your Own Chat
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
