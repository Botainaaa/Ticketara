
import { 
  Users, 
  Shield, 
  Heart, 
  Map, 
  Award, 
  Ticket, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const AboutValue = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: any; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg">
      <div className="p-3 bg-morocco-red/10 rounded-lg mb-4">
        <Icon className="h-8 w-8 text-morocco-red" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const TeamMember = ({ 
  name, 
  role, 
  image 
}: { 
  name: string; 
  role: string; 
  image: string;
}) => {
  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden rounded-xl aspect-square mb-4">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
      <p className="text-morocco-red">{role}</p>
    </div>
  );
};

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Customer-Centric",
      description: "We put our customers at the heart of everything we do, ensuring the best experiences."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We prioritize secure transactions and protecting your personal information."
    },
    {
      icon: Heart,
      title: "Passion for Morocco",
      description: "We are passionate about showcasing the best of Morocco to our customers."
    },
    {
      icon: Map,
      title: "Local Expertise",
      description: "Our deep knowledge of Morocco helps us curate the best events and destinations."
    }
  ];
  
  const teamMembers = [
    {
      name: "Sophia Riad",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2688&q=80"
    },
    {
      name: "Omar Khalil",
      role: "Chief Operations Officer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80"
    },
    {
      name: "Amina Laroussi",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      name: "Karim Benjelloun",
      role: "Technical Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 px-4 md:px-8 bg-morocco-darkblue">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539634409018-6c2c148401f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-slide-down">
            About <span className="text-morocco-red">TICKETARA</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto animate-slide-down">
            We're dedicated to providing the best ticketing experience for visitors to Morocco.
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-slide-right">
              <div className="inline-block mb-4">
                <span className="bg-morocco-red/10 text-morocco-red px-4 py-2 rounded-full text-sm font-semibold">Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The Journey of <span className="text-morocco-red">TICKETARA</span>
              </h2>
              <p className="text-gray-600 mb-4">
                TICKETARA was born out of a passion for showcasing the best of Morocco to visitors from around the world. We recognized the need for a reliable and user-friendly platform that would make it easy for tourists to discover and attend the most exciting events across the country.
              </p>
              <p className="text-gray-600 mb-6">
                Founded in 2023, our team of Moroccan tourism experts and tech enthusiasts came together to create a seamless ticketing experience that celebrates the rich cultural heritage, sporting traditions, and entertainment scene of Morocco.
              </p>
              <div className="space-y-3 mb-6">
                {['User-friendly platform', 'Authentic Moroccan experiences', 'Secure transactions', 'Local expertise'].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-morocco-red mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-600">
                Today, TICKETARA stands as the premier destination for tourists looking to enhance their Moroccan adventure with unforgettable events and experiences.
              </p>
            </div>
            <div className="order-1 lg:order-2 animate-slide-left">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1517874031650-ccdd1809a740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="TICKETARA Story"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-xl max-w-xs">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="h-5 w-5 text-morocco-red" />
                    <span className="text-sm font-semibold text-gray-900">Recognized Excellence</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Named "Best Tourism Tech Startup" by Morocco Tourism Awards in 2023.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-morocco-red/10 text-morocco-red px-4 py-2 rounded-full text-sm font-semibold">Our Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Principles That <span className="text-morocco-red">Guide Us</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At TICKETARA, our values define who we are and how we serve our customers every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AboutValue {...value} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-morocco-red/10 text-morocco-red px-4 py-2 rounded-full text-sm font-semibold">Our Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet the <span className="text-morocco-red">People</span> Behind TICKETARA
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our diverse team brings together expertise in Moroccan tourism, event management, and technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TeamMember {...member} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-morocco-darkblue relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535912859136-c2e6a16d1738?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="mb-8">
            <Ticket className="h-16 w-16 text-morocco-red mx-auto" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience the Best of Morocco?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of travelers who have discovered amazing events and destinations through TICKETARA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/games" 
              className="bg-morocco-red hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center"
            >
              <span>Browse Events</span>
              <ArrowRight size={18} className="ml-2" />
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-morocco-red px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center"
            >
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
