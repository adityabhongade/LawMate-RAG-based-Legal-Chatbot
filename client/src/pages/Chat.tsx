import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiRequest } from "@/lib/queryClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Message } from "@shared/schema";

interface ChatFormData {
  message: string;
}

const Chat = () => {
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ChatFormData>({
    defaultValues: {
      message: '',
    }
  });

  // Function to clear chat history
  const clearChatHistory = async () => {
    try {
      await fetch('/api/messages', {
        method: 'DELETE',
      });
      console.log('Chat history cleared');
    } catch (error) {
      console.error('Failed to clear chat history:', error);
    }
  };

  // Clear chat history when page loads and unloads
  useEffect(() => {
    // Clear on initial page load
    const initializeChat = async () => {
      await clearChatHistory();
      
      // Add initial welcome message only if no messages exist
      try {
        const messagesResponse = await fetch('/api/messages');
        const existingMessages = await messagesResponse.json();
        
        if (existingMessages.length === 0) {
          console.log("Adding welcome message");
          const welcomeResponse = await fetch('/api/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: "Hello! I'm Law Mate. How can I assist you with your legal questions today?",
              isBot: true
            }),
          });
          
          if (!welcomeResponse.ok) {
            console.error('Failed to add welcome message');
          }
          // Force refresh messages
          queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };
    
    initializeChat();
    
    // Add event listeners for page unload
    window.addEventListener('beforeunload', clearChatHistory);

    // Clean up on component unmount
    return () => {
      window.removeEventListener('beforeunload', clearChatHistory);
      clearChatHistory();
    };
  }, [queryClient]);
  
  // Fetch chat messages
  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ['/api/messages'],
    refetchInterval: false,
  });
  
  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await apiRequest('POST', '/api/messages', { text });
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch messages
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
      reset();
    },
  });
  
  const onSubmit = (data: ChatFormData) => {
    if (!data.message.trim()) return;
    sendMessageMutation.mutate(data.message);
  };
  
  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-[#1a365d] mb-8 text-center">Chat with Law Mate</h1>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
              <div className="bg-[#80ccff] p-4 text-white">
                <div className="flex items-center">
                  <i className="fas fa-balance-scale mr-2"></i>
                  <h3 className="font-bold">Law Mate Assistant</h3>
                </div>
              </div>
              
              <div className="h-[60vh] p-4 overflow-y-auto bg-gray-50" ref={chatMessagesRef}>
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#80ccff]"></div>
                  </div>
                ) : (messages as Message[]).length === 0 ? (
                  <div className="flex justify-center items-center h-full text-gray-500">
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  (messages as Message[]).map((message: Message, index: number) => (
                    <div 
                      key={message.id} 
                      className={`chat-message flex mb-4 ${!message.isBot ? "justify-end" : ""}`}
                    >
                      {message.isBot && (
                        <div className="w-8 h-8 rounded-full bg-[#80ccff] flex items-center justify-center text-white mr-2 flex-shrink-0">
                          <i className="fas fa-robot text-sm"></i>
                        </div>
                      )}
                      
                      <div 
                        className={`chat-bubble ${
                          message.isBot 
                            ? "bg-[#e6f5ff] rounded-lg rounded-tl-none" 
                            : "bg-white border rounded-lg shadow-sm rounded-tr-none"
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
                  ))
                )}
              </div>
              
              <div className="p-4 bg-white border-t">
                <form onSubmit={handleSubmit(onSubmit)} className="flex">
                  <input 
                    type="text" 
                    placeholder="Type your legal question here..." 
                    className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#80ccff]"
                    {...register("message", { required: true })}
                    disabled={sendMessageMutation.isPending}
                  />
                  <button 
                    type="submit" 
                    className="bg-[#80ccff] hover:bg-[#5fb8f5] text-white p-3 rounded-r-lg transition duration-300 disabled:opacity-70"
                    disabled={sendMessageMutation.isPending}
                  >
                    {sendMessageMutation.isPending ? (
                      <span className="inline-block animate-spin h-4 w-4 border-t-2 border-white rounded-full"></span>
                    ) : (
                      <i className="fas fa-paper-plane"></i>
                    )}
                  </button>
                </form>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">Please enter a message</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
