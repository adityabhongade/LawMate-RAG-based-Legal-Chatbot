const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#0a1f44] text-center mb-12">What Our Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="text-yellow-500">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              "Law Mate helped me understand my options when dealing with a difficult contract negotiation. The guidance was clear and saved me hours of research."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 mr-3">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <h4 className="font-bold text-[#0a1f44]">Sarah J.</h4>
                <p className="text-sm text-gray-500">Small Business Owner</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="text-yellow-500">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              "As someone who knows nothing about legal matters, Law Mate was incredibly helpful when I needed to understand my rights in a rental dispute. Very user-friendly!"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 mr-3">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <h4 className="font-bold text-[#0a1f44]">Michael T.</h4>
                <p className="text-sm text-gray-500">Student</p>
              </div>
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="text-yellow-500">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              "I needed quick information about starting an LLC and Law Mate provided exactly what I needed without the legal jargon. Highly recommend!"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 mr-3">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <h4 className="font-bold text-[#0a1f44]">Elena M.</h4>
                <p className="text-sm text-gray-500">Entrepreneur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
