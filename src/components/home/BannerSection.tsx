const BannerSection = () => {
  return (
    <div>
      {/* Banner Section */}
      <div className="relative h-[400px] flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Stationery Co.</h1>
          <p className="text-xl mb-8">
            Discover premium stationery for your creative journey.
          </p>
          <div className="space-x-4">
            <a
              href="/all-products"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </a>
            <a
              href="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
