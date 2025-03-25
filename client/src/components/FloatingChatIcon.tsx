const FloatingChatIcon = () => {
  return (
    <a 
      href="/chat" 
      target="_blank"
      rel="noopener noreferrer"
      className="floating-chat fixed bottom-6 right-6 w-14 h-14 bg-[#80ccff] hover:bg-[#5fb8f5] rounded-full flex items-center justify-center shadow-lg transition duration-300 z-50" 
      aria-label="Open chat"
    >
      <i className="fas fa-comment text-white text-xl"></i>
    </a>
  );
};

export default FloatingChatIcon;

