import { useState } from 'react';
import { 
  LayoutDashboard,
  Users, 
  GraduationCap, 
  Store, 
  Calendar,
  DollarSign,
  Music,
  Home as HomeIcon,
  Building,
  ShoppingBag,
  FileText,
  Settings,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AdminDashboardProps {
  navigateTo: (page: string, params?: any) => void;
}

// Mock Data
const revenueData = [
  { month: 'Jan', kursus: 45000000, toko: 32000000 },
  { month: 'Feb', kursus: 52000000, toko: 38000000 },
  { month: 'Mar', kursus: 48000000, toko: 42000000 },
  { month: 'Apr', kursus: 61000000, toko: 45000000 },
  { month: 'Mei', kursus: 55000000, toko: 48000000 },
  { month: 'Jun', kursus: 67000000, toko: 52000000 },
];

const courseEnrollmentData = [
  { name: 'Piano', value: 234 },
  { name: 'Gitar', value: 189 },
  { name: 'Violin', value: 156 },
  { name: 'Drum', value: 203 },
  { name: 'Saxophone', value: 127 },
];

const COLORS = ['#6366f1', '#f59e0b', '#8b5cf6', '#10b981', '#ec4899'];

const members = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "08123456789", joinDate: "2024-01-15", status: "Aktif" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "08234567890", joinDate: "2024-02-20", status: "Aktif" },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", phone: "08345678901", joinDate: "2024-03-10", status: "Nonaktif" },
];

const instructors = [
  { id: 1, name: "Sarah Johnson", instrument: "Piano", email: "sarah@harmonimusic.com", phone: "08111222333", students: 18, status: "Aktif" },
  { id: 2, name: "Michael Chen", instrument: "Gitar", email: "michael@harmonimusic.com", phone: "08222333444", students: 15, status: "Aktif" },
  { id: 3, name: "Elena Martinez", instrument: "Violin", email: "elena@harmonimusic.com", phone: "08333444555", students: 12, status: "Aktif" },
];

const courses = [
  { id: 1, name: "Piano untuk Pemula", instructor: "Sarah Johnson", level: "Pemula", price: 1500000, duration: "12 Minggu", students: 234, status: "Aktif" },
  { id: 2, name: "Gitar Akustik", instructor: "Michael Chen", level: "Menengah", price: 2000000, duration: "16 Minggu", students: 189, status: "Aktif" },
  { id: 3, name: "Violin Klasik", instructor: "Elena Martinez", level: "Lanjutan", price: 2500000, duration: "20 Minggu", students: 156, status: "Aktif" },
];

const products = [
  { id: 1, name: "Yamaha FG800", category: "Gitar", brand: "Yamaha", price: 3500000, stock: 15, sold: 42, status: "Tersedia" },
  { id: 2, name: "Roland TD-17KVX", category: "Drum", brand: "Roland", price: 18500000, stock: 5, sold: 18, status: "Tersedia" },
  { id: 3, name: "Yamaha YAS-280", category: "Saxophone", brand: "Yamaha", price: 12000000, stock: 8, sold: 25, status: "Tersedia" },
];

const schedules = [
  { id: 1, course: "Piano untuk Pemula", instructor: "Sarah Johnson", day: "Senin", time: "10:00 - 12:00", room: "Studio A", capacity: 10, enrolled: 8 },
  { id: 2, course: "Gitar Akustik", instructor: "Michael Chen", day: "Rabu", time: "14:00 - 16:00", room: "Studio B", capacity: 10, enrolled: 6 },
];

const payments = [
  { id: 1, type: "Kursus", student: "John Doe", item: "Piano untuk Pemula", amount: 1500000, date: "2024-11-01", status: "Lunas", method: "Transfer" },
  { id: 2, type: "Toko", customer: "Jane Smith", item: "Yamaha FG800", amount: 3500000, date: "2024-11-05", status: "Lunas", method: "E-Wallet" },
  { id: 3, type: "Kursus", student: "Bob Wilson", item: "Gitar Akustik", amount: 2000000, date: "2024-11-08", status: "Pending", method: "Transfer" },
];

export default function AdminDashboard({ navigateTo }: AdminDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white fixed top-0 left-0 h-full max-h-screen flex flex-col z-50 shadow-xl">
          <div className="p-6 border-b border-slate-700 flex-shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-lg">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <div>Harmoni Music</div>
                <div className="text-xs text-amber-300">Admin Panel</div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            <nav className="p-4 pb-20">
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedTab('dashboard')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </button>

                <div className="pt-4 pb-2 px-3 text-xs text-slate-500 uppercase">Setting Data</div>
                
                <button
                  onClick={() => setSelectedTab('members')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedTab === 'members' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>Member</span>
                </button>

                <button
                  onClick={() => setSelectedTab('instructors')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedTab === 'instructors' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Instruktur</span>
                </button>

                <button
                  onClick={() => setSelectedTab('courses')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedTab === 'courses' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Music className="w-5 h-5" />
                  <span>Kursus Musik</span>
                </button>

                <button
                  onClick={() => setSelectedTab('rooms')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedTab === 'rooms' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Building className="w-5 h-5" />
                  <span>Ruangan</span>
                </button>

                <button
                  onClick={() => setSelectedTab('products')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedTab === 'products' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Store className="w-5 h-5" />
                  <span>Produk Toko</span>
                </button>

                <div className="pt-4 pb-2 px-3 text-xs text-slate-500 uppercase">Transaksi</div>

                <button
                  onClick={() => setSelectedTab('schedules')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedTab === 'schedules' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Jadwal</span>
                </button>

                <button
                  onClick={() => setSelectedTab('payments')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedTab === 'payments' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <DollarSign className="w-5 h-5" />
                  <span>Pembayaran</span>
                </button>

                <button
                  onClick={() => setSelectedTab('orders')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedTab === 'orders' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Pesanan Toko</span>
                </button>

                <div className="pt-4 pb-2 px-3 text-xs text-slate-500 uppercase">Laporan</div>

                <button
                  onClick={() => setSelectedTab('reports')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedTab === 'reports' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Laporan</span>
                </button>
              </div>
            </nav>
          </div>

          <div className="p-4 border-t border-slate-700 bg-slate-900 flex-shrink-0 z-10">
            <Button
              onClick={() => navigateTo('home')}
              variant="outline"
              className="w-full bg-white/10 text-white border-white/30 hover:bg-white/20"
              size="sm"
            >
              <HomeIcon className="w-4 h-4 mr-2" />
              Ke Beranda
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64">
          {/* Header */}
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="px-8 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl">
                    {selectedTab === 'dashboard' && 'Dashboard Overview'}
                    {selectedTab === 'members' && 'Manajemen Member'}
                    {selectedTab === 'instructors' && 'Manajemen Instruktur'}
                    {selectedTab === 'courses' && 'Manajemen Kursus'}
                    {selectedTab === 'rooms' && 'Manajemen Ruangan'}
                    {selectedTab === 'products' && 'Manajemen Produk'}
                    {selectedTab === 'schedules' && 'Manajemen Jadwal'}
                    {selectedTab === 'payments' && 'Manajemen Pembayaran'}
                    {selectedTab === 'orders' && 'Manajemen Pesanan'}
                    {selectedTab === 'reports' && 'Laporan'}
                  </h1>
                  <p className="text-slate-600">
                    {selectedTab === 'dashboard' && 'Selamat datang di panel admin Harmoni Music'}
                    {selectedTab !== 'dashboard' && 'Kelola data dengan mudah dan efisien'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Pengaturan
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <div className="p-8">
            {/* Dashboard Tab */}
            {selectedTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex items-center gap-1 text-green-600 text-sm">
                          <TrendingUp className="w-4 h-4" />
                          12%
                        </div>
                      </div>
                      <div className="text-3xl mb-1">523</div>
                      <div className="text-sm text-slate-600">Total Siswa Aktif</div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <GraduationCap className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex items-center gap-1 text-green-600 text-sm">
                          <TrendingUp className="w-4 h-4" />
                          8%
                        </div>
                      </div>
                      <div className="text-3xl mb-1">25</div>
                      <div className="text-sm text-slate-600">Instruktur Aktif</div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex items-center gap-1 text-green-600 text-sm">
                          <TrendingUp className="w-4 h-4" />
                          22%
                        </div>
                      </div>
                      <div className="text-3xl mb-1">Rp 119jt</div>
                      <div className="text-sm text-slate-600">Pendapatan Bulan Ini</div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-orange-100 p-3 rounded-lg">
                          <ShoppingBag className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="flex items-center gap-1 text-red-600 text-sm">
                          <TrendingDown className="w-4 h-4" />
                          3%
                        </div>
                      </div>
                      <div className="text-3xl mb-1">142</div>
                      <div className="text-sm text-slate-600">Produk Terjual</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Pendapatan Bulanan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value: any) => `Rp ${(value / 1000000).toFixed(1)}jt`} />
                          <Legend />
                          <Line type="monotone" dataKey="kursus" stroke="#6366f1" name="Kursus" strokeWidth={2} />
                          <Line type="monotone" dataKey="toko" stroke="#f59e0b" name="Toko" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Distribusi Pendaftaran Kursus</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={courseEnrollmentData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {courseEnrollmentData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Pendaftaran Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { name: "John Doe", course: "Piano untuk Pemula", time: "2 jam lalu" },
                          { name: "Jane Smith", course: "Gitar Akustik", time: "4 jam lalu" },
                          { name: "Bob Wilson", course: "Violin Klasik", time: "1 hari lalu" }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div>
                              <div>{item.name}</div>
                              <div className="text-sm text-slate-600">{item.course}</div>
                            </div>
                            <div className="text-xs text-slate-500">{item.time}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Transaksi Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {payments.slice(0, 3).map((payment) => (
                          <div key={payment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div>
                              <div>{payment.student || payment.customer}</div>
                              <div className="text-sm text-slate-600">{payment.item}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm">Rp {(payment.amount / 1000000).toFixed(1)}jt</div>
                              <Badge className={`text-xs ${
                                payment.status === 'Lunas' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                              } border-0`}>
                                {payment.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Members Tab */}
            {selectedTab === 'members' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-3">
                    <div className="relative w-80">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input placeholder="Cari member..." className="pl-10" />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Tambah Member Baru</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="name">Nama Lengkap</Label>
                          <Input id="name" placeholder="Masukkan nama lengkap" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="email@example.com" />
                        </div>
                        <div>
                          <Label htmlFor="phone">Nomor Telepon</Label>
                          <Input id="phone" placeholder="08xxxxxxxxxx" />
                        </div>
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <Select defaultValue="aktif">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="aktif">Aktif</SelectItem>
                              <SelectItem value="nonaktif">Nonaktif</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">Simpan</Button>
                          <Button variant="outline" className="flex-1" onClick={() => setIsAddDialogOpen(false)}>Batal</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-50 border-b">
                          <tr>
                            <th className="text-left p-4">Nama</th>
                            <th className="text-left p-4">Email</th>
                            <th className="text-left p-4">Telepon</th>
                            <th className="text-left p-4">Tgl Bergabung</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.map((member) => (
                            <tr key={member.id} className="border-b hover:bg-slate-50">
                              <td className="p-4">{member.name}</td>
                              <td className="p-4">{member.email}</td>
                              <td className="p-4">{member.phone}</td>
                              <td className="p-4">{member.joinDate}</td>
                              <td className="p-4">
                                <Badge className={`${
                                  member.status === 'Aktif' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'
                                } border-0`}>
                                  {member.status}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Instructors Tab */}
            {selectedTab === 'instructors' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-3">
                    <div className="relative w-80">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input placeholder="Cari instruktur..." className="pl-10" />
                    </div>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Instruktur
                  </Button>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-50 border-b">
                          <tr>
                            <th className="text-left p-4">Nama</th>
                            <th className="text-left p-4">Instrumen</th>
                            <th className="text-left p-4">Email</th>
                            <th className="text-left p-4">Telepon</th>
                            <th className="text-left p-4">Siswa</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {instructors.map((instructor) => (
                            <tr key={instructor.id} className="border-b hover:bg-slate-50">
                              <td className="p-4">{instructor.name}</td>
                              <td className="p-4">
                                <Badge variant="outline">{instructor.instrument}</Badge>
                              </td>
                              <td className="p-4">{instructor.email}</td>
                              <td className="p-4">{instructor.phone}</td>
                              <td className="p-4">{instructor.students}</td>
                              <td className="p-4">
                                <Badge className="bg-green-100 text-green-600 border-0">
                                  {instructor.status}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Courses Tab */}
            {selectedTab === 'courses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-3">
                    <div className="relative w-80">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input placeholder="Cari kursus..." className="pl-10" />
                    </div>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Kursus
                  </Button>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-50 border-b">
                          <tr>
                            <th className="text-left p-4">Nama Kursus</th>
                            <th className="text-left p-4">Instruktur</th>
                            <th className="text-left p-4">Level</th>
                            <th className="text-left p-4">Harga</th>
                            <th className="text-left p-4">Durasi</th>
                            <th className="text-left p-4">Siswa</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.map((course) => (
                            <tr key={course.id} className="border-b hover:bg-slate-50">
                              <td className="p-4">{course.name}</td>
                              <td className="p-4">{course.instructor}</td>
                              <td className="p-4">
                                <Badge variant="outline">{course.level}</Badge>
                              </td>
                              <td className="p-4">Rp {course.price.toLocaleString('id-ID')}</td>
                              <td className="p-4">{course.duration}</td>
                              <td className="p-4">{course.students}</td>
                              <td className="p-4">
                                <Badge className="bg-green-100 text-green-600 border-0">
                                  {course.status}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Products Tab */}
            {selectedTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-3">
                    <div className="relative w-80">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input placeholder="Cari produk..." className="pl-10" />
                    </div>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Produk
                  </Button>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-50 border-b">
                          <tr>
                            <th className="text-left p-4">Nama Produk</th>
                            <th className="text-left p-4">Kategori</th>
                            <th className="text-left p-4">Brand</th>
                            <th className="text-left p-4">Harga</th>
                            <th className="text-left p-4">Stok</th>
                            <th className="text-left p-4">Terjual</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product.id} className="border-b hover:bg-slate-50">
                              <td className="p-4">{product.name}</td>
                              <td className="p-4">
                                <Badge variant="outline">{product.category}</Badge>
                              </td>
                              <td className="p-4">{product.brand}</td>
                              <td className="p-4">Rp {product.price.toLocaleString('id-ID')}</td>
                              <td className="p-4">
                                <Badge className={`${
                                  product.stock > 10 ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                                } border-0`}>
                                  {product.stock}
                                </Badge>
                              </td>
                              <td className="p-4">{product.sold}</td>
                              <td className="p-4">
                                <Badge className="bg-green-100 text-green-600 border-0">
                                  {product.status}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Schedules Tab */}
            {selectedTab === 'schedules' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl mb-1">Kelola Jadwal Kursus</h2>
                    <p className="text-slate-600">Atur jadwal kelas dan instruktur</p>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Buat Jadwal
                  </Button>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-50 border-b">
                          <tr>
                            <th className="text-left p-4">Kursus</th>
                            <th className="text-left p-4">Instruktur</th>
                            <th className="text-left p-4">Hari</th>
                            <th className="text-left p-4">Waktu</th>
                            <th className="text-left p-4">Ruangan</th>
                            <th className="text-left p-4">Kapasitas</th>
                            <th className="text-left p-4">Terisi</th>
                            <th className="text-left p-4">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schedules.map((schedule) => (
                            <tr key={schedule.id} className="border-b hover:bg-slate-50">
                              <td className="p-4">{schedule.course}</td>
                              <td className="p-4">{schedule.instructor}</td>
                              <td className="p-4">{schedule.day}</td>
                              <td className="p-4">{schedule.time}</td>
                              <td className="p-4">
                                <Badge className="bg-indigo-100 text-indigo-600 border-0">
                                  {schedule.room}
                                </Badge>
                              </td>
                              <td className="p-4">{schedule.capacity}</td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-indigo-600"
                                      style={{ width: `${(schedule.enrolled / schedule.capacity) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm">{schedule.enrolled}/{schedule.capacity}</span>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Payments Tab */}
            {selectedTab === 'payments' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-3">
                    <div className="relative w-80">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <Input placeholder="Cari transaksi..." className="pl-10" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        <SelectItem value="lunas">Lunas</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="batal">Dibatalkan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-50 border-b">
                          <tr>
                            <th className="text-left p-4">Tipe</th>
                            <th className="text-left p-4">Nama</th>
                            <th className="text-left p-4">Item</th>
                            <th className="text-left p-4">Tanggal</th>
                            <th className="text-left p-4">Jumlah</th>
                            <th className="text-left p-4">Metode</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-left p-4">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payments.map((payment) => (
                            <tr key={payment.id} className="border-b hover:bg-slate-50">
                              <td className="p-4">
                                <Badge variant="outline" className={
                                  payment.type === 'Kursus' ? 'border-indigo-300 text-indigo-600' : 'border-amber-300 text-amber-600'
                                }>
                                  {payment.type}
                                </Badge>
                              </td>
                              <td className="p-4">{payment.student || payment.customer}</td>
                              <td className="p-4">{payment.item}</td>
                              <td className="p-4">{payment.date}</td>
                              <td className="p-4">Rp {payment.amount.toLocaleString('id-ID')}</td>
                              <td className="p-4">{payment.method}</td>
                              <td className="p-4">
                                <Badge className={`border-0 ${
                                  payment.status === 'Lunas' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                                }`}>
                                  {payment.status}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <Button size="sm" variant="outline">
                                  Detail
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Reports Tab */}
            {selectedTab === 'reports' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Laporan Keuangan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-4">Download laporan keuangan bulanan atau tahunan</p>
                      <Select defaultValue="monthly">
                        <SelectTrigger className="mb-3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Bulanan</SelectItem>
                          <SelectItem value="quarterly">Kuartalan</SelectItem>
                          <SelectItem value="yearly">Tahunan</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="w-full" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Laporan Kehadiran</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-4">Download laporan kehadiran siswa per kursus</p>
                      <Select defaultValue="all">
                        <SelectTrigger className="mb-3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua Kursus</SelectItem>
                          <SelectItem value="piano">Piano</SelectItem>
                          <SelectItem value="guitar">Gitar</SelectItem>
                          <SelectItem value="violin">Violin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="w-full" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download Excel
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Laporan Penjualan Toko</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 mb-4">Download laporan penjualan produk toko</p>
                      <Select defaultValue="monthly">
                        <SelectTrigger className="mb-3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Bulanan</SelectItem>
                          <SelectItem value="yearly">Tahunan</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="w-full" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Ringkasan Statistik</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="mb-4">Top Performing Courses</h3>
                        <div className="space-y-3">
                          {[
                            { name: "Piano untuk Pemula", students: 234 },
                            { name: "Drum Basic", students: 203 },
                            { name: "Gitar Akustik", students: 189 }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                              <span>{item.name}</span>
                              <Badge className="bg-indigo-100 text-indigo-600 border-0">
                                {item.students} siswa
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-4">Top Selling Products</h3>
                        <div className="space-y-3">
                          {[
                            { name: "Yamaha FG800", sold: 42 },
                            { name: "Yamaha YAS-280", sold: 25 },
                            { name: "Roland TD-17KVX", sold: 18 }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                              <span>{item.name}</span>
                              <Badge className="bg-amber-100 text-amber-600 border-0">
                                {item.sold} terjual
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
