// components/ContactUsSection.tsx
import React from 'react';

const ContactUsSection = () => {
  return (
    <section id="contact" className="container mx-auto py-16 px-6 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center md:text-left">Contact Us</h2>
      <div className="flex flex-col md:flex-row md:space-x-12 items-stretch">
        {/* Contact Form */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <form className="bg-white p-0 rounded-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input type="text" id="name" name="name" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Your Name" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input type="email" id="email" name="email" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Your Email" />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
              <input type="tel" id="phone" name="phone" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Your Phone Number" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
              <textarea id="message" name="message" rows={5} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Your Message"></textarea>
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 w-full rounded-lg focus:outline-none focus:shadow-outline h-10 md:h-12 flex items-center justify-center">
              Send Message
            </button>
          </form>
        </div>

        {/* Map */}
        <div className="md:w-1/2">
          <div id="map" className="w-full h-full bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2999999999996!2d144.9631!3d-37.8136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ4JzQ5LjAiUyAxNDRCsDU3JzQ3LjIiRQ!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
