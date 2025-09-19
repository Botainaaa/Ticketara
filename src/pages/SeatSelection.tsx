import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { SeatCategory } from '@/types/seat';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

// Define seat categories and their prices
const SEAT_CATEGORIES = {
  vip: { name: 'VIP', color: 'bg-pink-500', price: 300 },
  premium: { name: 'PREMIUM', color: 'bg-cyan-400', price: 200 },
  standard: { name: 'STANDARD', color: 'bg-green-500', price: 150 },
  economy: { name: 'ECONOMY', color: 'bg-blue-500', price: 100 }
};

// Create section data with seat numbers and categories
const generateSection = (
  startNum: number, 
  count: number, 
  category: keyof typeof SEAT_CATEGORIES
) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${startNum + i}`,
    number: startNum + i,
    category: category as SeatCategory,
    selected: false
  }));
};

const StadiumSeatmap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  
  const gameData = location.state?.gameData || {
    id: "1",
    title: "Morocco vs. Brazil Football Match",
    date: "June 15, 2024 19:00:00",
    venue: "Mohammed V Stadium, Casablanca",
  };
  
  // Generate sections of seats with different categories
  const [sections, setSections] = useState({
    // North side (top)
    north: [...generateSection(301, 8, 'standard'), ...generateSection(341, 8, 'economy')],
    // East side (right)
    east: [...generateSection(201, 12, 'premium')],
    // South side (bottom)
    south: [...generateSection(101, 8, 'vip'), ...generateSection(121, 4, 'premium')],
    // West side (left)
    west: [...generateSection(401, 12, 'economy')],
  });
  
  const [selectedSeats, setSelectedSeats] = useState<{id: string, category: string, number: number}[]>([]);
  
  const handleSeatClick = (sectionKey: string, seatId: string) => {
    const updatedSections = {...sections};
    const sectionSeats = [...updatedSections[sectionKey as keyof typeof sections]];
    
    const seatIndex = sectionSeats.findIndex(seat => seat.id === seatId);
    if (seatIndex !== -1) {
      // Toggle selection
      const seat = {...sectionSeats[seatIndex]};
      seat.selected = !seat.selected;
      sectionSeats[seatIndex] = seat;
      
      updatedSections[sectionKey as keyof typeof sections] = sectionSeats;
      setSections(updatedSections);
      
      // Update selected seats list
      if (seat.selected) {
        setSelectedSeats([...selectedSeats, { 
          id: seat.id, 
          category: seat.category,
          number: seat.number
        }]);
        toast.success(`${t('seats.seat')} ${seat.number} ${t('seats.selected')}`);
      } else {
        setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
        toast.info(`${t('seats.seat')} ${seat.number} ${t('seats.deselected')}`);
      }
    }
  };
  
  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => {
      const category = seat.category as keyof typeof SEAT_CATEGORIES;
      return total + SEAT_CATEGORIES[category].price;
    }, 0);
  };
  
  const proceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      toast.error(t('seats.pleaseSelectAtLeastOne'));
      return;
    }
    
    if (!isAuthenticated) {
      toast.info(t('auth.loginRequired'));
      navigate('/login', { 
        state: { 
          from: location.pathname,
          selectedSeats,
          gameData,
          totalPrice: calculateTotal()
        } 
      });
      return;
    }
    
    navigate('/payment', { 
      state: { 
        selectedSeats,
        gameData,
        totalPrice: calculateTotal()
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">{gameData.title}</h1>
        <p className="text-center mb-2 text-gray-600">{gameData.date}</p>
        <p className="text-center mb-8 text-gray-600">{gameData.venue}</p>
        
        {/* Seating categories legend */}
        <div className="flex justify-center mb-6 gap-6 flex-wrap">
          {Object.entries(SEAT_CATEGORIES).map(([key, { name, color }]) => (
            <div key={key} className="flex items-center">
              <div className={`w-4 h-4 ${color} rounded-sm mr-2`}></div>
              <span className="text-sm font-medium">{name}</span>
            </div>
          ))}
          
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 rounded-sm mr-2"></div>
            <span className="text-sm font-medium">{t('seats.unavailable')}</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-4 h-4 bg-white border-2 border-morocco-red rounded-sm mr-2"></div>
            <span className="text-sm font-medium">{t('seats.selected')}</span>
          </div>
        </div>
        
        {/* Improved stadium layout with proper positioning of sections */}
        <div className="relative mx-auto bg-gray-100 rounded-full p-4 mb-12 max-w-2xl">
          {/* Field with markings */}
          <div className="relative mx-auto bg-green-600 rounded-[50%] aspect-[1.5/1] overflow-hidden">
            {/* Field markings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1/3 h-1/2 border-2 border-white rounded-full"></div>
            </div>
            <div className="absolute w-full h-full flex items-center justify-between px-8">
              <div className="w-12 h-28 border-2 border-white"></div>
              <div className="w-12 h-28 border-2 border-white"></div>
            </div>
            
            {/* Center line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          {/* North section (top) */}
          <div className="grid grid-cols-8 gap-1 absolute top-2 left-1/2 transform -translate-x-1/2 w-3/4">
            {sections.north.map(seat => (
              <button
                key={seat.id}
                onClick={() => handleSeatClick('north', seat.id)}
                className={`p-1 text-xs h-8 rounded flex items-center justify-center 
                  ${seat.selected 
                    ? 'bg-white border-2 border-morocco-red text-morocco-red font-bold' 
                    : SEAT_CATEGORIES[seat.category as keyof typeof SEAT_CATEGORIES].color + ' text-white'
                  } 
                  transition-colors`}
                title={`${t('seats.seat')} ${seat.number} - ${SEAT_CATEGORIES[seat.category as keyof typeof SEAT_CATEGORIES].name} - $${SEAT_CATEGORIES[seat.category as keyof typeof SEAT_CATEGORIES].price}`}
              >
                {seat.number}
              </button>
            ))}
          </div>
          
          {/* East section (right) */}
          <div className="grid grid-cols-2 gap-1 absolute right-4 top-1/2 transform -translate-y-1/2 w-16">
            {sections.east.slice(0, 12).map(seat => (
              <button
                key={seat.id}
                onClick={() => handleSeatClick('east', seat.id)}
                className={`p-1 text-xs h-7 rounded flex items-center justify-center 
                  ${seat.selected 
                    ? 'bg-white border-2 border-morocco-red text-morocco-red font-bold' 
                    : SEAT_CATEGORIES[seat.category as keyof typeof SEAT_CATEGORIES].color + ' text-white'
                  } 
                  transition-colors`}
                title={`${t('seats.seat')} ${seat.number} - ${SEAT_CATEGORIES[seat.category as keyof typeof SEAT_CATEGORIES].name} - $${SEAT_CATEGORIES[seat.category as keyof typeof SEAT_CATEGORIES].price}`}
              >
                {seat.number}
              </button>
            ))}
          </div>
          
          {/* South section (bottom) */}
          <div className="grid grid-cols-8 gap-1 absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3/4">
            {sections.south.map(seat => (
              <button
                key={seat.id}
                onClick={() => handleSeatClick('south', seat.id)}
                className={`p-1 text-xs h-8 rounded flex items-center justify-center 
                  ${seat.selected 
                    ? 'bg-white border-2 border-morocco-red text-morocco-red font-bold' 
                    : SEAT_CATEGORIES[seat.category as keyof typeof SEAT_CATEGORIES].color + ' text-white'
                  } 
                  transition-colors`}
                title={`${t('seats.seat')} ${seat.number} - ${SEAT_CATEGORIES[seat.category as keyof typeof SEAT_CATEGORIES].name} - $${SEAT_CATEGORIES[seat.category as keyof typeof SEAT_CATEGORIES].price}`}
              >
                {seat.number}
              </button>
            ))}
          </div>
          
          {/* West section (left) */}
          <div className="grid grid-cols-2 gap-1 absolute left-4 top-1/2 transform -translate-y-1/2 w-16">
            {sections.west.slice(0, 12).map(seat => (
              <button
                key={seat.id}
                onClick={() => handleSeatClick('west', seat.id)}
                className={`p-1 text-xs h-7 rounded flex items-center justify-center 
                  ${seat.selected 
                    ? 'bg-white border-2 border-morocco-red text-morocco-red font-bold' 
                    : SEAT_CATEGORIES[seat.category as keyof typeof SEAT_CATEGORIES].color + ' text-white'
                  } 
                  transition-colors`}
                title={`${t('seats.seat')} ${seat.number} - ${SEAT_CATEGORIES[seat.category as keyof typeof SEAT_CATEGORIES].name} - $${SEAT_CATEGORIES[seat.category as keyof typeof SEAT_CATEGORIES].price}`}
              >
                {seat.number}
              </button>
            ))}
          </div>
        </div>
        
        {/* Selected seats summary */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4">{t('seats.selectedSeats')}</h2>
          
          {selectedSeats.length > 0 ? (
            <div className="space-y-4">
              <div className="divide-y">
                {selectedSeats.map(seat => {
                  const category = seat.category as keyof typeof SEAT_CATEGORIES;
                  return (
                    <div key={seat.id} className="py-2 flex justify-between">
                      <div>
                        <span className="font-medium">{t('seats.seat')} {seat.number}</span> - {SEAT_CATEGORIES[category].name}
                      </div>
                      <div className="font-semibold">${SEAT_CATEGORIES[category].price}</div>
                    </div>
                  );
                })}
              </div>
              
              <div className="pt-4 border-t flex justify-between">
                <div className="font-bold">{t('seats.total')}</div>
                <div className="font-bold text-morocco-red text-xl">${calculateTotal()}</div>
              </div>
              
              <Button 
                onClick={proceedToCheckout}
                className="w-full bg-morocco-red hover:bg-morocco-red/90 text-white"
              >
                {t('seats.continueTo')}
              </Button>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">{t('seats.noSeatsSelected')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StadiumSeatmap;
