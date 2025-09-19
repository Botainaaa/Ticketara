
import { useState } from 'react';
import { Building, MapPin, Ticket, Search, Filter } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { destinations, DestinationType } from '@/services/destinationService';

const DestinationCard = ({ destination }: { destination: any }) => {
  const { t } = useLanguage();
  const { id, title, image, category, location, description, icon: Icon } = destination;
  
  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg h-full flex flex-col">
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="p-2 bg-morocco-red/10 rounded-lg w-fit mb-3">
          <Icon className="h-5 w-5 text-morocco-red" />
        </div>
        <span className="text-morocco-red text-sm mb-2">{category}</span>
        <h3 className="text-gray-900 text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <MapPin size={14} className="mr-1" />
          <span>{location}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
        <Link 
          to={`/destinations/${id}`}
          className="mt-auto px-5 py-2.5 bg-morocco-red text-white rounded-full font-medium transition-all hover:bg-opacity-90 flex items-center justify-center"
        >
          {t('destinations.viewDetails')}
        </Link>
      </div>
    </div>
  );
};

const FilterButton = ({ 
  type, 
  label, 
  activeFilter, 
  setActiveFilter 
}: { 
  type: DestinationType, 
  label: string, 
  activeFilter: DestinationType, 
  setActiveFilter: (type: DestinationType) => void 
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

const Destinations = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type') as DestinationType | null;
  
  const [activeFilter, setActiveFilter] = useState<DestinationType>(typeParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Update URL when filter changes
  const handleFilterChange = (type: DestinationType) => {
    setActiveFilter(type);
    if (type === 'all') {
      searchParams.delete('type');
    } else {
      searchParams.set('type', type);
    }
    setSearchParams(searchParams);
  };
  
  const filteredDestinations = destinations.filter((destination) => {
    // Filter by type
    const typeMatch = activeFilter === 'all' || destination.type === activeFilter;
    
    // Filter by search query
    const searchMatch = 
      searchQuery === '' || 
      destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return typeMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 px-4 md:px-8 bg-morocco-darkblue">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539020140153-e479b8c64e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-slide-down">
            {t('destinations.title').split(' ').map((word, index) => 
              index === 1 ? <span key={index} className="text-morocco-red">{word} </span> : word + ' '
            )}
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 animate-slide-down">
            {t('destinations.subtitle')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative animate-slide-up">
            <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg">
              <div className="pl-4">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={t('destinations.search')}
                className="w-full py-4 px-3 text-gray-700 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-morocco-red text-white px-6 py-4 font-medium hover:bg-opacity-90 transition-colors">
                {t('destinations.searchBtn')}
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex gap-2 items-center">
              <Filter className="h-5 w-5 text-morocco-red mr-1" />
              <span className="text-gray-600 mr-4">{t('destinations.filterBy')}</span>
              <div className="flex gap-2 flex-wrap">
                <FilterButton 
                  type="all" 
                  label={t('destinations.all')} 
                  activeFilter={activeFilter} 
                  setActiveFilter={handleFilterChange} 
                />
                <FilterButton 
                  type="attraction" 
                  label={t('destinations.attractions')} 
                  activeFilter={activeFilter} 
                  setActiveFilter={handleFilterChange} 
                />
                <FilterButton 
                  type="accommodation" 
                  label={t('destinations.accommodations')} 
                  activeFilter={activeFilter} 
                  setActiveFilter={handleFilterChange} 
                />
                <FilterButton 
                  type="venue" 
                  label={t('destinations.venues')} 
                  activeFilter={activeFilter} 
                  setActiveFilter={handleFilterChange} 
                />
              </div>
            </div>
            
            <div className="text-gray-600">
              {t('destinations.showing')} {filteredDestinations.length} {t('destinations.destinationsCount')}
            </div>
          </div>
          
          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <div 
                  key={destination.id}
                  className="animate-fade-in"
                >
                  <DestinationCard destination={destination} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl text-gray-600 mb-2">{t('destinations.noResults')}</h3>
              <p className="text-gray-500">{t('destinations.tryAdjusting')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Destinations;
