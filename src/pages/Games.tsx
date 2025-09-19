import { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Users } from 'lucide-react';
import GameCard from '@/components/GameCard';

type GameCategory = 'all' | 'sports' | 'cultural' | 'entertainment';

type Game = {
  id: number;
  title: string;
  image: string;
  date: string;
  location: string;
  price: number;
  category: GameCategory;
  featured?: boolean;
  attendees?: number;
};

const games: Game[] = [
  {
    id: 1,
    title: "Morocco vs. Brazil Football Match",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "June 15, 2024",
    location: "Mohammed V Stadium, Casablanca",
    price: 500,
    category: "sports",
    featured: true,
    attendees: 15000
  },
  {
    id: 2,
    title: "Moroccan Cultural Festival",
    image: "https://images.unsplash.com/photo-1605902394095-851c5e211a36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "July 10, 2024",
    location: "Jamaa el-Fna Square, Marrakech",
    price: 150,
    category: "cultural",
    featured: true,
    attendees: 5000
  },
  {
    id: 3,
    title: "International Music Concert",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "August 5, 2024",
    location: "Agadir Festival Hall, Agadir",
    price: 350,
    category: "entertainment",
    featured: true,
    attendees: 8000
  },
  {
    id: 4,
    title: "Morocco Tennis Open",
    image: "https://images.unsplash.com/photo-1622279457486-53559fa4ef51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "September 12, 2024",
    location: "Royal Tennis Club, Rabat",
    price: 400,
    category: "sports",
    attendees: 2000
  },
  {
    id: 5,
    title: "Fantasia Traditional Show",
    image: "https://images.unsplash.com/photo-1616587894289-86480e533129?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "July 25, 2024",
    location: "El Jadida Exhibition Center",
    price: 200,
    category: "cultural",
    attendees: 3000
  },
  {
    id: 6,
    title: "Moroccan Film Festival",
    image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "October 5, 2024",
    location: "Cinema Renaissance, Tangier",
    price: 120,
    category: "entertainment",
    attendees: 1200
  },
  {
    id: 7,
    title: "Morocco Basketball Tournament",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "August 20, 2024",
    location: "Indoor Sports Hall, Casablanca",
    price: 250,
    category: "sports",
    attendees: 4500
  },
  {
    id: 8,
    title: "Traditional Craft Exhibition",
    image: "https://images.unsplash.com/photo-1508001300512-f550e293a807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "September 3, 2024",
    location: "Medina Crafts Center, Fez",
    price: 80,
    category: "cultural",
    attendees: 2500
  },
  {
    id: 9,
    title: "Moroccan Comedy Night",
    image: "https://images.unsplash.com/photo-1486556396467-d83d2b23514b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "July 18, 2024",
    location: "Theatre Mohammed V, Rabat",
    price: 180,
    category: "entertainment",
    attendees: 1800
  }
];

const FilterButton = ({ 
  type, 
  label, 
  activeFilter, 
  setActiveFilter 
}: { 
  type: GameCategory, 
  label: string, 
  activeFilter: GameCategory, 
  setActiveFilter: (type: GameCategory) => void 
}) => {
  return (
    <button
      onClick={() => setActiveFilter(type)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        activeFilter === type 
          ? 'bg-morocco-red text-white' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};

const Games = () => {
  const [activeFilter, setActiveFilter] = useState<GameCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredGames = games.filter((game) => {
    // Filter by category
    const categoryMatch = activeFilter === 'all' || game.category === activeFilter;
    
    // Filter by search query
    const searchMatch = 
      searchQuery === '' || 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  // Filter featured games
  const featuredGames = games.filter(game => game.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 px-4 md:px-8 bg-morocco-darkblue">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577210954042-89e999ea8dce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-slide-down">
            Exciting <span className="text-morocco-red">Games & Events</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 animate-slide-down">
            Secure your tickets for the most thrilling sporting events, cultural performances, and entertainment in Morocco.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative animate-slide-up">
            <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg">
              <div className="pl-4">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events, locations..."
                className="w-full py-4 px-3 text-gray-700 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-morocco-red text-white px-6 py-4 font-medium hover:bg-opacity-90 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Games */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured <span className="text-morocco-red">Events</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't miss out on these top events happening across Morocco.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGames.map((game) => (
              <div 
                key={game.id}
                className="animate-fade-in"
              >
                <GameCard 
                  id={game.id.toString()}
                  title={game.title}
                  image={game.image}
                  date={game.date}
                  venue={game.location}
                  team1={{
                    name: 'Team 1',
                    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/800px-Flag_of_Morocco.svg.png'
                  }}
                  team2={{
                    name: 'Team 2',
                    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/800px-Flag_of_Morocco.svg.png'
                  }}
                  ticketsAvailable={50}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* All Games */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All <span className="text-morocco-red">Events</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our complete collection of upcoming events and secure your tickets today.
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex gap-2 items-center">
              <Filter className="h-5 w-5 text-morocco-red mr-1" />
              <span className="text-gray-600 mr-4">Filter by:</span>
              <div className="flex gap-2 flex-wrap">
                <FilterButton type="all" label="All Events" activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                <FilterButton type="sports" label="Sports" activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                <FilterButton type="cultural" label="Cultural" activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                <FilterButton type="entertainment" label="Entertainment" activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
              </div>
            </div>
            
            <div className="text-gray-600">
              Showing {filteredGames.length} events
            </div>
          </div>
          
          {/* Games Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGames.map((game) => (
                <div 
                  key={game.id}
                  className="animate-fade-in"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
                    <div className="relative">
                      <img 
                        src={game.image} 
                        alt={game.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-morocco-red text-white text-sm font-semibold px-3 py-1 rounded-full">
                        ${game.price}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{game.title}</h3>
                      
                      <div className="flex items-center mb-2 text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{game.date}</span>
                      </div>
                      
                      <div className="flex items-center mb-2 text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{game.location}</span>
                      </div>
                      
                      {game.attendees && (
                        <div className="flex items-center mb-4 text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span className="text-sm">{game.attendees.toLocaleString()} attendees</span>
                        </div>
                      )}
                      
                      <button className="mt-auto w-full py-2 bg-morocco-red text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                        Buy Tickets
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Games;
