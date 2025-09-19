
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAuthenticated, token } = useAuth();
  const { toast } = useToast();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Form state
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  // Get data from location state
  const selectedSeats = location.state?.selectedSeats || [];
  const gameData = location.state?.gameData || null;
  const totalPrice = location.state?.totalPrice || 0;
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to purchase tickets",
        variant: "destructive"
      });
      navigate('/login', { state: { from: location } });
    }
    
    // Redirect if no seats are selected
    if (!selectedSeats.length || !gameData) {
      navigate('/seat-selection');
    }
  }, [isAuthenticated, selectedSeats, gameData]);
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    setExpiryDate(value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !token) {
      toast({
        title: "Authentication required",
        description: "Please log in to purchase tickets",
        variant: "destructive"
      });
      return;
    }
    
    // Basic validation
    if (!cardholderName || cardNumber.length < 19 || expiryDate.length < 5 || cvv.length < 3) {
      toast({
        title: "Invalid payment details",
        description: "Please check your card information and try again",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Process payment through our API
      const response = await api.purchaseTickets(token, {
        gameId: gameData.id,
        selectedSeats: selectedSeats,
        totalPrice: totalPrice
      });
      
      // Show success state
      setPaymentSuccess(true);
      
      toast({
        title: "Payment successful!",
        description: `You've purchased ${selectedSeats.length} ticket(s) successfully.`,
      });
      
      // After 3 seconds, redirect to profile
      setTimeout(() => {
        navigate('/profile');
      }, 3000);
    } catch (error) {
      toast({
        title: "Payment failed",
        description: error instanceof Error ? error.message : "An error occurred during payment processing",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (paymentSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-32">
        <Card className="w-full max-w-md p-8 text-center">
          <CardHeader>
            <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>Your tickets have been confirmed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Thank you for your purchase. You will be redirected to your profile in a few seconds.
            </p>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <Button 
                onClick={() => navigate('/profile')}
                className="w-full"
              >
                View My Tickets
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-32 pb-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">{t('payment.title')}</h1>
        <p className="text-center mb-8 text-gray-600">{t('payment.description')}</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t('payment.orderSummary')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {gameData && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{gameData.title}</h3>
                    <p className="text-gray-600">{gameData.date}</p>
                    <p className="text-gray-600">{gameData.venue}</p>
                  </div>
                )}
                
                <div className="border-t border-b py-4 my-4">
                  <h4 className="font-medium mb-2">{t('payment.selectedSeats')}</h4>
                  <div className="space-y-2">
                    {selectedSeats.map((seat: any) => (
                      <div key={seat.id} className="flex justify-between">
                        <span>{t('seats.seat')} {seat.number} ({seat.category.toUpperCase()})</span>
                        <span className="font-medium">
                          ${seat.category === 'vip' ? 300 : 
                             seat.category === 'premium' ? 200 : 
                             seat.category === 'standard' ? 150 : 100}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center font-bold">
                  <span>{t('payment.total')}</span>
                  <span className="text-xl text-morocco-red">${totalPrice}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t('payment.paymentDetails')}</CardTitle>
                <CardDescription>{t('payment.securePayment')}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardholderName">{t('payment.cardholderName')}</Label>
                    <Input 
                      id="cardholderName" 
                      value={cardholderName}
                      onChange={(e) => setCardholderName(e.target.value)}
                      placeholder="John Doe" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">{t('payment.cardNumber')}</Label>
                    <div className="relative">
                      <Input 
                        id="cardNumber" 
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456" 
                        maxLength={19}
                        required 
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">{t('payment.expiryDate')}</Label>
                      <Input 
                        id="expiryDate" 
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        placeholder="MM/YY" 
                        maxLength={5}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cvv">{t('payment.cvv')}</Label>
                      <Input 
                        id="cvv" 
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="123" 
                        maxLength={4}
                        required 
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6 bg-morocco-red hover:bg-morocco-red/90"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2" />
                        {t('payment.processing')}
                      </>
                    ) : (
                      t('payment.payNow')
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
