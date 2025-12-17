import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartProps {
  cartItems: any[];
  setCartItems: (items: any[]) => void;
  navigateTo: (page: string, params?: any) => void;
}

export default function Cart({ cartItems, setCartItems, navigateTo }: CartProps) {
  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500000 ? 0 : 25000;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl mb-8">Keranjang Belanja</h1>

        {cartItems.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <ShoppingBag className="w-24 h-24 text-slate-300 mx-auto mb-4" />
              <h2 className="text-2xl mb-2">Keranjang Anda Kosong</h2>
              <p className="text-slate-600 mb-6">Belum ada produk di keranjang Anda</p>
              <Button
                onClick={() => navigateTo('shop')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0"
              >
                Belanja Sekarang
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="mb-1 line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-slate-600 mb-2">{item.category} - {item.brand}</p>
                        <div className="text-xl text-amber-600">{formatPrice(item.price)}</div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg sticky top-4">
                <CardContent className="p-6">
                  <h2 className="text-2xl mb-6">Ringkasan Pesanan</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-slate-700">
                      <span>Subtotal ({cartItems.length} item)</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Ongkos Kirim</span>
                      <span className={shipping === 0 ? 'text-green-600' : ''}>
                        {shipping === 0 ? 'GRATIS' : formatPrice(shipping)}
                      </span>
                    </div>
                    {shipping > 0 && subtotal < 500000 && (
                      <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                        Belanja {formatPrice(500000 - subtotal)} lagi untuk gratis ongkir!
                      </div>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-xl">
                        <span>Total</span>
                        <span className="text-amber-600">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigateTo('checkout')}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 mb-3"
                  >
                    Lanjut ke Pembayaran
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>

                  <Button
                    onClick={() => navigateTo('shop')}
                    variant="outline"
                    className="w-full border-amber-600 text-amber-600 hover:bg-amber-50"
                  >
                    Lanjut Belanja
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
