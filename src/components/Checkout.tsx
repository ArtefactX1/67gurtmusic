import { ArrowLeft, CreditCard, Wallet, Building2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface CheckoutProps {
  cartItems: any[];
  navigateTo: (page: string, params?: any) => void;
}

export default function Checkout({ cartItems, navigateTo }: CheckoutProps) {
  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500000 ? 0 : 25000;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigateTo('cart')}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Keranjang
        </button>

        <h1 className="text-4xl mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl mb-6">Informasi Pengiriman</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nama Depan</Label>
                    <Input id="firstName" placeholder="Masukkan nama depan" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nama Belakang</Label>
                    <Input id="lastName" placeholder="Masukkan nama belakang" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input id="phone" placeholder="08xxxxxxxxxx" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Alamat Lengkap</Label>
                    <Textarea id="address" placeholder="Jalan, nomor rumah, RT/RW" rows={3} />
                  </div>
                  <div>
                    <Label htmlFor="city">Kota</Label>
                    <Input id="city" placeholder="Masukkan kota" />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Kode Pos</Label>
                    <Input id="postalCode" placeholder="12345" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl mb-6">Metode Pembayaran</h2>
                <RadioGroup defaultValue="transfer">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:border-amber-400 transition-colors cursor-pointer">
                      <RadioGroupItem value="transfer" id="transfer" />
                      <Label htmlFor="transfer" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Building2 className="w-5 h-5 text-slate-600" />
                        <div>
                          <div>Transfer Bank</div>
                          <div className="text-xs text-slate-500">BCA, Mandiri, BNI, BRI</div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:border-amber-400 transition-colors cursor-pointer">
                      <RadioGroupItem value="ewallet" id="ewallet" />
                      <Label htmlFor="ewallet" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Wallet className="w-5 h-5 text-slate-600" />
                        <div>
                          <div>E-Wallet</div>
                          <div className="text-xs text-slate-500">GoPay, OVO, Dana, ShopeePay</div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:border-amber-400 transition-colors cursor-pointer">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard className="w-5 h-5 text-slate-600" />
                        <div>
                          <div>Kartu Kredit/Debit</div>
                          <div className="text-xs text-slate-500">Visa, Mastercard, JCB</div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-2xl mb-6">Ringkasan Pesanan</h2>
                
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-3 border-b">
                      <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm line-clamp-2">{item.name}</div>
                        <div className="text-xs text-slate-500">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-sm">{formatPrice(item.price * item.quantity)}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-slate-700">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Ongkos Kirim</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>
                      {shipping === 0 ? 'GRATIS' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl">
                      <span>Total</span>
                      <span className="text-amber-600">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 mb-3"
                >
                  <CheckCircle className="mr-2 w-4 h-4" />
                  Bayar Sekarang
                </Button>

                <div className="text-xs text-slate-500 text-center">
                  Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
