import { useState } from 'react';
import { Search, Filter, Star, Users, Clock, Edit, Trash2, Plus } from 'lucide-react';
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

interface CoursesPageProps {
  navigateTo: (page: string, params?: any) => void;
  userRole: 'guest' | 'member' | 'instructor' | 'admin';
  courses: any[];
  onAdd: (course: any) => void;
  onEdit: (course: any) => void;
  onDelete: (id: number) => void;
}

export default function CoursesPage({ navigateTo, userRole, courses, onAdd, onEdit, onDelete }: CoursesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    level: 'Pemula',
    instrument: 'Piano',
    price: '',
    duration: '',
    description: '',
    image: ''
  });

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInstrument = selectedInstrument === 'all' || course.instrument === selectedInstrument;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesInstrument && matchesLevel;
  });

  const handleAddClick = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      instructor: '',
      level: 'Pemula',
      instrument: 'Piano',
      price: '',
      duration: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80' // Default placeholder
    });
    setIsDialogOpen(true);
  };

  const handleEditClick = (course: any) => {
    setEditingCourse(course);
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
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const courseData = {
        ...formData,
        price: parseInt(formData.price) || 0,
        rating: editingCourse ? editingCourse.rating : 0, // Keep existing or 0
        students: editingCourse ? editingCourse.students : 0
    };

    if (editingCourse) {
        onEdit({ ...editingCourse, ...courseData });
    } else {
        onAdd(courseData);
    }
    setIsDialogOpen(false);
  };

  const formatPrice = (price: number) => {
      return `Rp ${price.toLocaleString('id-ID')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-5xl">Jelajahi Kursus Musik</h1>
            {userRole === 'admin' && (
              <Button 
                onClick={handleAddClick}
                className="bg-amber-500 hover:bg-amber-600 text-white border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Kursus
              </Button>
            )}
          </div>
          <p className="text-xl text-indigo-200 max-w-2xl">
            Temukan kursus musik yang sesuai dengan minat dan tingkat kemampuan Anda. 
            Dipandu oleh instruktur profesional dan bersertifikat.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    placeholder="Cari kursus atau instruktur..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedInstrument} onValueChange={setSelectedInstrument}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Instrumen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Instrumen</SelectItem>
                  <SelectItem value="Piano">Piano</SelectItem>
                  <SelectItem value="Gitar">Gitar</SelectItem>
                  <SelectItem value="Violin">Violin</SelectItem>
                  <SelectItem value="Drum">Drum</SelectItem>
                  <SelectItem value="Saxophone">Saxophone</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Level</SelectItem>
                  <SelectItem value="Pemula">Pemula</SelectItem>
                  <SelectItem value="Menengah">Menengah</SelectItem>
                  <SelectItem value="Lanjutan">Lanjutan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Menampilkan <span>{filteredCourses.length}</span> kursus
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
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
                <div className="absolute top-3 left-3 flex gap-2 z-10">
                  <Badge className="bg-indigo-600 text-white border-0 shadow-sm">
                    {course.instrument}
                  </Badge>
                  <Badge className="bg-amber-500 text-white border-0 shadow-sm">
                    {course.level}
                  </Badge>
                </div>
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
                        handleEditClick(course);
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
                        onDelete(course.id);
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
                  <span className="text-sm text-slate-500">•</span>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Users className="w-4 h-4" />
                    {course.students || 0}
                  </div>
                  <span className="text-sm text-slate-500">•</span>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                </div>

                <h3 className="mb-2 line-clamp-1">{course.title}</h3>
                <p className="text-sm text-slate-600 mb-1">Instruktur: {course.instructor}</p>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{course.description}</p>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-xl text-indigo-600">{formatPrice(course.price)}</div>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0"
                  >
                    {userRole === 'member' ? 'Daftar Sekarang' : 'Lihat Detail'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <Filter className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl text-slate-400 mb-2">Tidak ada kursus ditemukan</h3>
            <p className="text-slate-500">Coba ubah filter atau kata kunci pencarian Anda</p>
          </div>
        )}
      </div>

      {/* Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingCourse ? 'Edit Kursus' : 'Tambah Kursus Baru'}</DialogTitle>
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
                    <Label htmlFor="duration">Durasi (Contoh: 12 Minggu)</Label>
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