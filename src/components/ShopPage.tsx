import { useState, useEffect } from 'react';
import { Search, Star, ShoppingCart, SlidersHorizontal, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
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

interface ShopPageProps {
  navigateTo: (page: string, params?: any) => void;
  addToCart: (product: any) => void;
  userRole: 'guest' | 'member' | 'instructor' | 'admin';
  products: any[];
  onAdd: (product: any) => void;
  onEdit: (product: any) => void;
  onDelete: (id: number) => void;
}

export default function ShopPage({ navigateTo, addToCart, userRole, products, onAdd, onEdit, onDelete }: ShopPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Form State
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

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
      return matchesSearch && matchesCategory && matchesBrand;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // popular (default order)
    });

  const handleAddClick = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Gitar',
      brand: 'Yamaha',
      price: '',
      stock: '10',
      description: '',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80',
      badge: 'none' // Default to 'none'
    });
    setIsDialogOpen(true);
  };

  const handleEditClick = (product: any) => {
    setEditingProduct(product);
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
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) {
        alert("Nama dan Harga harus diisi!");
        return;
    }

    const productData = {
        ...formData,
        price: parseInt(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        rating: editingProduct ? editingProduct.rating : 0,
        reviews: editingProduct ? editingProduct.reviews : 0,
        badge: formData.badge === 'none' ? '' : formData.badge // Store empty string if 'none' is selected
    };

    if (editingProduct) {
        onEdit({ ...editingProduct, ...productData });
    } else {
        onAdd(productData);
    }
    setIsDialogOpen(false);
  };

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-5xl">Toko Alat Musik</h1>
            {userRole === 'admin' && (
              <Button 
                onClick={handleAddClick}
                className="bg-white text-amber-600 hover:bg-amber-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Produk
              </Button>
            )}
          </div>
          <p className="text-xl text-amber-100 max-w-2xl">
            Temukan alat musik impian Anda dengan harga terbaik. 
            100% produk original dengan garansi resmi.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    placeholder="Cari produk..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="Gitar">Gitar</SelectItem>
                  <SelectItem value="Piano">Piano</SelectItem>
                  <SelectItem value="Drum">Drum</SelectItem>
                  <SelectItem value="Violin">Violin</SelectItem>
                  <SelectItem value="Saxophone">Saxophone</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Brand</SelectItem>
                  <SelectItem value="Yamaha">Yamaha</SelectItem>
                  <SelectItem value="Roland">Roland</SelectItem>
                  <SelectItem value="Fender">Fender</SelectItem>
                  <SelectItem value="Kawai">Kawai</SelectItem>
                  <SelectItem value="Stentor">Stentor</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Terpopuler</SelectItem>
                  <SelectItem value="price-low">Harga Terendah</SelectItem>
                  <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                  <SelectItem value="rating">Rating Tertinggi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-slate-600">
            Menampilkan <span>{filteredProducts.length}</span> produk
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id}
              className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all overflow-hidden"
            >
              <div 
                onClick={() => navigateTo('product-detail', { productId: product.id })}
                className="relative overflow-hidden"
              >
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Product Badge - Top Left */}
                <Badge className={`absolute top-3 left-3 border-0 shadow-sm z-10 ${
                  product.badge === 'Best Seller' ? 'bg-orange-500' :
                  product.badge === 'Premium' ? 'bg-purple-600' :
                  'bg-green-500'
                } text-white`}>
                  {product.badge || 'New'}
                </Badge>

                {/* Stock Badge - Bottom Left */}
                {product.stock <= 5 && (
                  <Badge className="absolute bottom-3 left-3 bg-red-500 text-white border-0 shadow-sm z-10">
                    Stok Terbatas
                  </Badge>
                )}

                {/* Admin Actions - Top Right */}
                {userRole === 'admin' && (
                  <div 
                    className="absolute top-3 right-3 flex gap-2 z-20" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="h-8 w-8 bg-white/90 hover:bg-white text-indigo-600 shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(product);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="destructive" 
                      className="h-8 w-8 shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(product.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div 
                  onClick={() => navigateTo('product-detail', { productId: product.id })}
                  className="cursor-pointer"
                >
                  <Badge variant="outline" className="mb-2 text-xs">{product.category}</Badge>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs">{product.rating}</span>
                    </div>
                    <span className="text-xs text-slate-500">({product.reviews})</span>
                  </div>

                  <h3 className="text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                  
                  <div className="mb-3">
                    {product.originalPrice && (
                      <div className="text-xs text-slate-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </div>
                    )}
                    <div className="text-lg text-amber-600">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                </div>

                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Tambah ke Keranjang
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <SlidersHorizontal className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl text-slate-400 mb-2">Tidak ada produk ditemukan</h3>
            <p className="text-slate-500">Coba ubah filter atau kata kunci pencarian Anda</p>
          </div>
        )}
      </div>

      {/* Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nama Produk</Label>
                    <Input 
                        id="name" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        placeholder="Nama Produk"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Select 
                        value={formData.brand} 
                        onValueChange={(val) => setFormData({...formData, brand: val})}
                    >
                        <SelectTrigger><SelectValue placeholder="Pilih Brand" /></SelectTrigger>
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
                        placeholder="0"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="stock">Stok</Label>
                    <Input 
                        id="stock" 
                        type="number"
                        value={formData.stock} 
                        onChange={(e) => setFormData({...formData, stock: e.target.value})} 
                        placeholder="0"
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
                        <SelectTrigger><SelectValue placeholder="Pilih Kategori" /></SelectTrigger>
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
                            <SelectItem value="none">Tidak Ada</SelectItem> {/* Changed to "none" */}
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
                    placeholder="https://..."
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea 
                    id="description" 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    placeholder="Deskripsi produk..."
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
