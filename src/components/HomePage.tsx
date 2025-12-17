import { useState } from 'react';
import { ArrowRight, Star, Users, Award, TrendingUp, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
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

interface HomePageProps {
  navigateTo: (page: string, params?: any) => void;
  userRole?: 'guest' | 'member' | 'instructor' | 'admin';
  featuredCourses: any[];
  featuredProducts: any[];
  onEditCourse: (course: any) => void;
  onDeleteCourse: (id: number) => void;
  onEditProduct: (product: any) => void;
  onDeleteProduct: (id: number) => void;
}

export default function HomePage({ 
  navigateTo, 
  userRole, 
  featuredCourses, 
  featuredProducts,
  onEditCourse,
  onDeleteCourse,
  onEditProduct,
  onDeleteProduct
}: HomePageProps) {

  // Dialog States
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [courseFormData, setCourseFormData] = useState({
    title: '', instructor: '', level: 'Pemula', instrument: 'Piano', price: '', duration: '', description: '', image: ''
  });

  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productFormData, setProductFormData] = useState({
    name: '', category: 'Gitar', brand: '', price: '', stock: '', description: '', image: '', badge: 'none'
  });

  // Course Handlers
  const handleEditCourseClick = (course: any) => {
    setEditingCourse(course);
    setCourseFormData({
      title: course.title,
      instructor: course.instructor,
      level: course.level,
      instrument: course.instrument,
      price: course.price.toString(),
      duration: course.duration,
      description: course.description,
      image: course.image
    });
    setIsCourseDialogOpen(true);
  };

  const handleSaveCourse = () => {
    onEditCourse({ ...editingCourse, ...courseFormData, price: parseInt(courseFormData.price) || 0 });
    setIsCourseDialogOpen(false);
  };

  // Product Handlers
  const handleEditProductClick = (product: any) => {
    setEditingProduct(product);
    setProductFormData({
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      image: product.image,
      badge: product.badge || 'none' // Default to 'none' if empty
    });
    setIsProductDialogOpen(true);
  };

  const handleSaveProduct = () => {
    onEditProduct({ 
        ...editingProduct, 
        ...productFormData, 
        price: parseInt(productFormData.price) || 0, 
        stock: parseInt(productFormData.stock) || 0,
        badge: productFormData.badge === 'none' ? '' : productFormData.badge // Store empty string if 'none' is selected
    });
    setIsProductDialogOpen(false);
  };

  const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-amber-500 text-white border-0 mb-4">
                Platform Terintegrasi #1 di Indonesia
              </Badge>
              <h1 className="text-5xl md:text-6xl mb-6">
                Wujudkan Passion Musikmu
              </h1>
              <p className="text-xl text-indigo-200 mb-8">
                Belajar musik dari instruktur profesional dan belanja alat musik berkualitas tinggi, semua dalam satu platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigateTo('courses')}
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0"
                >
                  Jelajahi Kursus
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  onClick={() => navigateTo('shop')}
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  Belanja Alat Musik
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-3xl text-amber-400 mb-1">500+</div>
                  <div className="text-sm text-indigo-300">Siswa Aktif</div>
                </div>
                <div>
                  <div className="text-3xl text-amber-400 mb-1">25+</div>
                  <div className="text-sm text-indigo-300">Instruktur Ahli</div>
                </div>
                <div>
                  <div className="text-3xl text-amber-400 mb-1">98%</div>
                  <div className="text-sm text-indigo-300">Kepuasan</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758612214848-04e700d192ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGxlYXJuaW5nJTIwc3R1ZGVudHxlbnwxfHx8fDE3NjI5MTY3MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Music Learning"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-lg">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-600">Instruktur</div>
                    <div className="text-xl">Bersertifikat</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-4xl mb-2">Kursus Unggulan</h2>
              <p className="text-slate-600">Pilihan kursus terpopuler dari kami</p>
            </div>
            <Button 
              onClick={() => navigateTo('courses')}
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              Lihat Semua
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <Card 
                key={course.id} 
                className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                onClick={() => navigateTo('course-detail', { courseId: course.id })}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-amber-500 text-white border-0 z-10 shadow-sm">
                    {course.level}
                  </Badge>
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
                          handleEditCourseClick(course);
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
                          onDeleteCourse(course.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm">{course.rating || 0}</span>
                    </div>
                    <span className="text-sm text-slate-500">• {course.students || 0} siswa</span>
                  </div>
                  <h3 className="mb-2">{course.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">Instruktur: {course.instructor}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-500">Durasi: {course.duration}</div>
                      <div className="text-xl text-indigo-600">{formatPrice(course.price)}</div>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0">
                      Daftar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-4xl mb-2">Produk Terbaru & Promo</h2>
              <p className="text-slate-600">Alat musik berkualitas dengan harga terbaik</p>
            </div>
            <Button 
              onClick={() => navigateTo('shop')}
              variant="outline"
              className="border-amber-600 text-amber-600 hover:bg-amber-50"
            >
              Lihat Semua
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card 
                key={product.id}
                className="group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                onClick={() => navigateTo('product-detail', { productId: product.id })}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-3 left-3 border-0 shadow-sm z-10 ${
                    product.badge === 'Best Seller' ? 'bg-orange-500' :
                    product.badge === 'Premium' ? 'bg-purple-600' :
                    'bg-green-500'
                  } text-white`}>
                    {product.badge || 'New'}
                  </Badge>
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
                          handleEditProductClick(product);
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
                          onDeleteProduct(product.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm">{product.rating || 0}</span>
                    </div>
                    <span className="text-sm text-slate-500">({product.reviews || 0} ulasan)</span>
                  </div>
                  <h3 className="mb-4 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      {product.originalPrice && (
                        <div className="text-sm text-slate-400 line-through">{formatPrice(product.originalPrice)}</div>
                      )}
                      <div className="text-xl text-amber-600">{formatPrice(product.price)}</div>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0">
                      Beli
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dialogs for Home Page (Duplicates of Courses/Shop dialogs for full functionality) */}
      <Dialog open={isCourseDialogOpen} onOpenChange={setIsCourseDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Edit Kursus (Featured)</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Judul Kursus</Label>
                    <Input value={courseFormData.title} onChange={(e) => setCourseFormData({...courseFormData, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <Label>Instruktur</Label>
                    <Input value={courseFormData.instructor} onChange={(e) => setCourseFormData({...courseFormData, instructor: e.target.value})} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Harga</Label>
                    <Input type="number" value={courseFormData.price} onChange={(e) => setCourseFormData({...courseFormData, price: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <Label>Durasi</Label>
                    <Input value={courseFormData.duration} onChange={(e) => setCourseFormData({...courseFormData, duration: e.target.value})} />
                </div>
            </div>
            <Button onClick={handleSaveCourse} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Simpan Perubahan</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Produk (Featured)</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Nama Produk</Label>
                    <Input value={productFormData.name} onChange={(e) => setProductFormData({...productFormData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <Label>Brand</Label>
                    <Select 
                        value={productFormData.brand} 
                        onValueChange={(val) => setProductFormData({...productFormData, brand: val})}
                    >
                        <SelectTrigger><SelectValue placeholder="Pilih Brand" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Yamaha">Yamaha</SelectItem>
                            <SelectItem value="Roland">Rolix</SelectItem>
                            <SelectItem value="Fender">Fender</SelectItem>
                            <SelectItem value="Kawai">Kawai</SelectItem>
                            <SelectItem value="Stentor">Stentor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Harga</Label>
                    <Input type="number" value={productFormData.price} onChange={(e) => setProductFormData({...productFormData, price: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <Label>Stok</Label>
                    <Input type="number" value={productFormData.stock} onChange={(e) => setProductFormData({...productFormData, stock: e.target.value})} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Kategori</Label>
                    <Select 
                        value={productFormData.category} 
                        onValueChange={(val) => setProductFormData({...productFormData, category: val})}
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
                    <Label>Badge</Label>
                    <Select 
                        value={productFormData.badge} 
                        onValueChange={(val) => setProductFormData({...productFormData, badge: val})}
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
                <Label>URL Gambar</Label>
                <Input value={productFormData.image} onChange={(e) => setProductFormData({...productFormData, image: e.target.value})} />
            </div>
            <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Textarea value={productFormData.description} onChange={(e) => setProductFormData({...productFormData, description: e.target.value})} />
            </div>
            <Button onClick={handleSaveProduct} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Simpan Perubahan</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}