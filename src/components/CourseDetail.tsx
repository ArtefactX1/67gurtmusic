import { useState, useEffect } from 'react';
import { ArrowLeft, Star, Users, Clock, Calendar, Award, CheckCircle, PlayCircle, Edit, Trash2 } from 'lucide-react';
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

interface CourseDetailProps {
  course: any;
  navigateTo: (page: string, params?: any) => void;
  userRole?: 'guest' | 'member' | 'instructor' | 'admin';
  onEdit: (course: any) => void;
  onDelete: (id: number) => void;
}

export default function CourseDetail({ course, navigateTo, userRole, onEdit, onDelete }: CourseDetailProps) {
  // If course is null (deleted or not found), show not found or redirect
  if (!course) {
      return <div className="p-8 text-center">Kursus tidak ditemukan.</div>;
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    level: '',
    instrument: '',
    price: '',
    duration: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (course) {
        setFormData({
            title: course.title,
            instructor: course.instructor,
            level: course.level,
            instrument: course.instrument,
            price: course.price.toString(),
            duration: course.duration,
            description: course.description,
            image: course.image
        });
    }
  }, [course]);

  const handleSave = () => {
    const updatedCourse = {
        ...course,
        ...formData,
        price: parseInt(formData.price) || 0
    };
    onEdit(updatedCourse);
    setIsDialogOpen(false);
  };

  const formatPrice = (price: number) => {
      return `Rp ${price.toLocaleString('id-ID')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigateTo('courses')}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar Kursus
          </button>
          {userRole === 'admin' && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                onClick={() => setIsDialogOpen(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Kursus
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => onDelete(course.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Hapus Kursus
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex gap-2 mb-4">
                <Badge className="bg-indigo-600 border-0">{course.instrument}</Badge>
                <Badge className="bg-amber-500 border-0">{course.level}</Badge>
              </div>
              <h1 className="text-5xl mb-4">{course.title}</h1>
              <p className="text-xl text-indigo-200 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="text-xl">{course.rating || 4.9}</span>
                  <span className="text-indigo-300">({course.totalReviews || 0} ulasan)</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-300">
                  <Users className="w-5 h-5" />
                  <span>{course.students || 0} siswa</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-300">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                    {course.instructor ? course.instructor.split(' ').map((n: string) => n[0]).join('') : 'I'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm text-indigo-300">Instruktur</div>
                  <div className="text-lg">{course.instructor}</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="border-0 shadow-2xl overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-64 object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group">
                    <div className="bg-white rounded-full p-4 group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-8 h-8 text-indigo-600" />
                    </div>
                  </button>
                </div>
                <CardContent className="p-6">
                  <div className="text-3xl text-indigo-600 mb-4">{formatPrice(course.price)}</div>
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 mb-3">
                    Daftar Kursus Sekarang
                  </Button>
                  <p className="text-sm text-slate-500 text-center">30-hari garansi uang kembali</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

        {/* Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Kursus</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Judul Kursus</Label>
                    <Input 
                        id="title" 
                        value={formData.title} 
                        onChange={(e) => setFormData({...formData, title: e.target.value})} 
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="instructor">Instruktur</Label>
                    <Input 
                        id="instructor" 
                        value={formData.instructor} 
                        onChange={(e) => setFormData({...formData, instructor: e.target.value})} 
                    />
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
                    <Label htmlFor="duration">Durasi</Label>
                    <Input 
                        id="duration" 
                        value={formData.duration} 
                        onChange={(e) => setFormData({...formData, duration: e.target.value})} 
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Select 
                        value={formData.level} 
                        onValueChange={(val) => setFormData({...formData, level: val})}
                    >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Pemula">Pemula</SelectItem>
                            <SelectItem value="Menengah">Menengah</SelectItem>
                            <SelectItem value="Lanjutan">Lanjutan</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="instrument">Instrumen</Label>
                    <Select 
                        value={formData.instrument} 
                        onValueChange={(val) => setFormData({...formData, instrument: val})}
                    >
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Piano">Piano</SelectItem>
                            <SelectItem value="Gitar">Gitar</SelectItem>
                            <SelectItem value="Violin">Violin</SelectItem>
                            <SelectItem value="Drum">Drum</SelectItem>
                            <SelectItem value="Saxophone">Saxophone</SelectItem>
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