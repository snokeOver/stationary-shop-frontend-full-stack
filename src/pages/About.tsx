const About = () => {
  return (
    <div className="min-h-screen ">
      <div className="bg-white text-gray-900">
        {/* Hero Section */}
        <div className="relative h-96 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl">
              Crafting the finest stationery for your creative journey.
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2010, Stationery Co. began as a small family-owned
                business with a passion for creativity and quality. Over the
                years, we've grown into a trusted name in the stationery
                industry, offering a wide range of products designed to inspire
                and empower.
              </p>
              <p className="text-gray-600">
                Our journey has been fueled by a commitment to sustainability,
                innovation, and customer satisfaction. Every product we create
                is a testament to our love for stationery and the joy it brings
                to people's lives.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
                alt="Our Story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Our mission is to provide high-quality, eco-friendly stationery
              products that inspire creativity and make everyday tasks more
              enjoyable. We believe in the power of thoughtful design and
              sustainable practices to create products that people love.
            </p>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Team Member 1"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">Jane Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Team Member 2"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">John Smith</h3>
              <p className="text-gray-600">Creative Director</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Team Member 3"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">Emily Johnson</h3>
              <p className="text-gray-600">Head of Operations</p>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Value 1 */}
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">Sustainability</h3>
                  <p className="text-gray-600">
                    We are committed to using eco-friendly materials and
                    sustainable practices in everything we do.
                  </p>
                </div>
              </div>

              {/* Value 2 */}
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">Creativity</h3>
                  <p className="text-gray-600">
                    We believe in the power of creativity to inspire and
                    transform everyday experiences.
                  </p>
                </div>
              </div>

              {/* Value 3 */}
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">Quality</h3>
                  <p className="text-gray-600">
                    Every product is crafted with care and precision to ensure
                    the highest standards of quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Join Our Creative Community
            </h2>
            <p className="text-xl mb-8">
              Explore our collection and find the perfect stationery for your
              needs.
            </p>
            <a
              href="/shop"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
