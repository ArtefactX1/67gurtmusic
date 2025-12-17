import { useState, useEffect } from 'react';
import { ArrowLeft, Star, ShoppingCart, Truck, ShieldCheck, RefreshCw, Heart, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailProps {
  product: any;
  navigateTo: (page: string, params?: any) => void;
  addToCart: (product: any) => void;
  userRole?: 'guest' | 'member' | 'instructor' | 'admin';
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
}

export default function ProductDetail({ product, navigateTo, addToCart, userRole, onEdit, onDelete }: ProductDetailProps) {
  if (!product) {
      return <div className="p-8 text-center">Produk tidak ditemukan.</div>;
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    stock: '',
    description: '',
    image: '',
    badge: ''
  });

  useEffect(() => {
    if (product) {
        setFormData({
            name: product.name,
            category: product.category,
            brand: product.brand,
            price: product.price.toString(),
            stock: product.stock.toString(),
            description: product.description,
            image: product.image,
            badge: product.badge || 'none' // Default to 'none' if empty
        });
    }
  }, [product]);

  const handleSave = () => {
    const updatedProduct = {
        ...product,
        ...formData,
        price: parseInt(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        badge: formData.badge === 'none' ? '' : formData.badge // Store empty string if 'none' is selected
    };
    onEdit(updatedProduct);
    setIsDialogOpen(false);
  };

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigateTo('shop')}
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Toko
          </button>
          {userRole === 'admin' && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-amber-600 border-amber-200 hover:bg-amber-50"
                onClick={() => setIsDialogOpen(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Produk
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => onDelete(product.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Hapus Produk
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div>
            <Card className="border-0 shadow-lg overflow-hidden mb-4">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </Card>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border-2 border-amber-200 cursor-pointer hover:border-amber-400 transition-colors overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    className="w-full h-20 object-cover"
                  />
                </Card>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex gap-2 mb-3">
              <Badge className={`border-0 ${
                product.badge === 'Best Seller' ? 'bg-orange-500' :
                product.badge === 'Premium' ? 'bg-purple-600' :
                'bg-green-500'
              } text-white`}>
                {product.badge || 'New'}
              </Badge>
              {discount > 0 && (
                <Badge className="bg-red-500 text-white border-0">
                  Hemat {discount}%
                </Badge>
              )}
            </div>

            <h1 className="text-4xl mb-2">{product.name}</h1>
            <div className="text-sm text-slate-600 mb-4">
              Brand: <span className="text-amber-600">{product.brand}</span> | 
              Kategori: <span className="text-amber-600">{product.category}</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg">{product.rating}</span>
              </div>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600">{product.reviews} Ulasan</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600">{product.stock} Stok Tersedia</span>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl mb-6">
              {product.originalPrice && (
                <div className="text-lg text-slate-500 line-through mb-1">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
              <div className="text-4xl text-amber-600 mb-2">
                {formatPrice(product.price)}
              </div>
              {discount > 0 && (
                <div className="text-sm text-green-600">
                  Anda hemat {formatPrice(product.originalPrice - product.price)}!
                </div>
              )}
            </div>

            <div className="flex gap-3 mb-6">
              <Button 
                size="lg"
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Tambah ke Keranjang
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-amber-600 text-amber-600 hover:bg-amber-50"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Produk</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nama Produk</Label>
                    <Input 
                        id="name" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Select 
                        value={formData.brand} 
                        onValueChange={(val) => setFormData({...formData, brand: val})}
                    >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Yamaha">Yamaha</SelectItem>
                            <SelectItem value="Roland">Roland</SelectItem>
                            <SelectItem value="Fender">Fender</SelectItem>
                            <SelectItem value="Kawai">Kawai</SelectItem>
                            <SelectItem value="Stentor">Stentor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="price">Harga</Label>
                    <Input 
                        id="price" 
                        type="number"
                        value={formData.price} 
                        onChange={(e) => setFormData({...formData, price: e.target.value})} 
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="stock">Stok</Label>
                    <Input 
                        id="stock" 
                        type="number"
                        value={formData.stock} 
                        onChange={(e) => setFormData({...formData, stock: e.target.value})} 
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select 
                        value={formData.category} 
                        onValueChange={(val) => setFormData({...formData, category: val})}
                    >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Gitar">Gitar</SelectItem>
                            <SelectItem value="Piano">Piano</SelectItem>
                            <SelectItem value="Drum">Drum</SelectItem>
                            <SelectItem value="Violin">Violin</SelectItem>
                            <SelectItem value="Saxophone">Saxophone</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="badge">Badge</Label>
                    <Select 
                        value={formData.badge} 
                        onValueChange={(val) => setFormData({...formData, badge: val})}
                    >
                        <SelectTrigger><SelectValue placeholder="Pilih Badge" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">Tidak Ada</SelectItem>
                            <SelectItem value="Best Seller">Best Seller</SelectItem>
                            <SelectItem value="Premium">Premium</SelectItem>
                            <SelectItem value="Promo">Promo</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">URL Gambar</Label>
                <Input 
                    id="image" 
                    value={formData.image} 
                    onChange={(e) => setFormData({...formData, image: e.target.value})} 
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea 
                    id="description" 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                />
            </div>
            <Button onClick={handleSave} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}