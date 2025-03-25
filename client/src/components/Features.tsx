const Features = () => {
  return (
    <section className="py-16 bg-gray-100" id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#0a1f44] text-center mb-12">How Law Mate Helps You</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg">
            <div className="text-[#80ccff] text-4xl mb-4">
              <i className="fas fa-comments"></i>
            </div>
            <h3 className="text-xl font-bold text-[#0a1f44] mb-3">24/7 Legal Chat</h3>
            <p className="text-gray-600">
              Get instant answers to your legal questions anytime, anywhere with our AI-powered chat assistant.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg">
            <div className="text-[#80ccff] text-4xl mb-4">
              <i className="fas fa-file-contract"></i>
            </div>
            <h3 className="text-xl font-bold text-[#0a1f44] mb-3">Document Guidance</h3>
            <p className="text-gray-600">
              Get help understanding legal documents and forms with clear explanations and guidance.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg">
            <div className="text-[#80ccff] text-4xl mb-4">
              <i className="fas fa-user-shield"></i>
            </div>
            <h3 className="text-xl font-bold text-[#0a1f44] mb-3">Privacy Protected</h3>
            <p className="text-gray-600">
              Your information is secure and confidential with our encrypted chat platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
