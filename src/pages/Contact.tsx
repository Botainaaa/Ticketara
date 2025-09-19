
import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin 
} from 'lucide-react';

const ContactInfo = ({ 
  icon: Icon, 
  title, 
  content 
}: { 
  icon: any; 
  title: string; 
  content: string | React.ReactNode;
}) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="p-3 bg-morocco-red/10 rounded-lg">
        <Icon className="h-6 w-6 text-morocco-red" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <div className="text-gray-600">{content}</div>
      </div>
    </div>
  );
};

const SocialButton = ({ 
  icon: Icon, 
  href 
}: { 
  icon: any; 
  href: string;
}) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-morocco-red hover:text-white transition-colors"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset submission message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 px-4 md:px-8 bg-morocco-darkblue">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-slide-down">
            Contact <span className="text-morocco-red">TICKETARA</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto animate-slide-down">
            Have questions or need assistance? We're here to help you with all your ticketing needs.
          </p>
        </div>
      </section>
      
      {/* Contact Info & Form */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="animate-slide-right">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Get in <span className="text-morocco-red">Touch</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Our team is ready to answer your questions and help you plan your perfect Moroccan experience. Don't hesitate to reach out to us!
              </p>
              
              <div className="space-y-6 mb-8">
                <ContactInfo 
                  icon={Mail} 
                  title="Email Us" 
                  content={<a href="mailto:info@ticketara.com" className="hover:text-morocco-red">info@ticketara.com</a>} 
                />
                <ContactInfo 
                  icon={Phone} 
                  title="Call Us" 
                  content={<a href="tel:+212522123456" className="hover:text-morocco-red">+212 522 123 456</a>} 
                />
                <ContactInfo 
                  icon={MapPin} 
                  title="Visit Us" 
                  content="123 Mohammed V Boulevard, Casablanca, Morocco" 
                />
                <ContactInfo 
                  icon={Clock} 
                  title="Business Hours" 
                  content="Monday - Friday: 9:00 AM - 6:00 PM" 
                />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <SocialButton icon={Facebook} href="https://facebook.com" />
                  <SocialButton icon={Instagram} href="https://instagram.com" />
                  <SocialButton icon={Twitter} href="https://twitter.com" />
                  <SocialButton icon={Linkedin} href="https://linkedin.com" />
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8 animate-slide-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a <span className="text-morocco-red">Message</span>
              </h2>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-6">
                  Thank you for your message! We'll get back to you as soon as possible.
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-morocco-red/50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-morocco-red/50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-morocco-red/50"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-morocco-red/50"
                    placeholder="Tell us what you need assistance with..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center ${
                    isSubmitting 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-morocco-red text-white hover:bg-opacity-90 transition-colors'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Find Us <span className="text-morocco-red">Here</span>
            </h2>
          </div>
          
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26830.557429825257!2d-7.624753400453736!3d33.574411899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d282e9c60669%3A0xe95d3721bf67342b!2sMohammed%20V%20Boulevard%2C%20Casablanca%2C%20Morocco!5e0!3m2!1sen!2sus!4v1654321098765!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="TICKETARA Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
