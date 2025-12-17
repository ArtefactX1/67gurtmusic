import { 
  Calendar, 
  BookOpen, 
  CreditCard, 
  Award, 
  User, 
  TrendingUp,
  Clock,
  CheckCircle,
  Download,
  Package,
  Home
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';

interface MemberDashboardProps {
  navigateTo: (page: string, params?: any) => void;
}

const upcomingClasses = [
  { id: 1, course: "Piano untuk Pemula", instructor: "Sarah Johnson", date: "2024-11-15", time: "10:00 - 12:00", room: "Studio A" },
  { id: 2, course: "Piano untuk Pemula", instructor: "Sarah Johnson", date: "2024-11-18", time: "10:00 - 12:00", room: "Studio A" },
  { id: 3, course: "Piano untuk Pemula", instructor: "Sarah Johnson", date: "2024-11-20", time: "10:00 - 12:00", room: "Studio A" }
];

const paymentHistory = [
  { id: 1, course: "Piano untuk Pemula", amount: 1500000, date: "2024-10-01", status: "Lunas", invoice: "INV-001" },
  { id: 2, course: "Gitar Akustik", amount: 2000000, date: "2024-09-15", status: "Lunas", invoice: "INV-002" }
];

const purchaseHistory = [
  { id: 1, product: "Yamaha FG800 Guitar", amount: 3500000, date: "2024-10-15", status: "Dikirim", tracking: "JNE1234567" },
  { id: 2, product: "Stentor Violin", amount: 3200000, date: "2024-09-20", status: "Selesai", tracking: "JNE7654321" }
];

const certificates = [
  { id: 1, course: "Gitar Akustik Basic", completedDate: "2024-09-30", instructor: "Michael Chen" }
];

export default function MemberDashboard({ navigateTo }: MemberDashboardProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-white text-xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl">Dashboard Member</h1>
                <p className="text-indigo-200">Selamat datang kembali, John Doe!</p>
              </div>
            </div>
            <Button
              onClick={() => navigateTo('home')}
              variant="outline"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <Home className="w-4 h-4 mr-2" />
              Ke Beranda
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Kursus Aktif</p>
                  <p className="text-3xl">2</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Kelas Mendatang</p>
                  <p className="text-3xl">3</p>
                </div>
                <div className="bg-amber-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Progres Rata-rata</p>
                  <p className="text-3xl">65%</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Sertifikat</p>
                  <p className="text-3xl">1</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Jadwal Kelas</TabsTrigger>
            <TabsTrigger value="progress">Progres</TabsTrigger>
            <TabsTrigger value="payment">Pembayaran</TabsTrigger>
            <TabsTrigger value="orders">Pesanan Toko</TabsTrigger>
            <TabsTrigger value="certificates">Sertifikat</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Upcoming Classes */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    Kelas Mendatang
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingClasses.slice(0, 3).map((cls) => (
                      <div key={cls.id} className="p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div>{cls.course}</div>
                            <div className="text-sm text-slate-600">Instruktur: {cls.instructor}</div>
                          </div>
                          <Badge className="bg-indigo-100 text-indigo-600 border-0">
                            {cls.room}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {cls.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {cls.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Progress */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Progres Pembelajaran
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Piano untuk Pemula</span>
                        <span className="text-sm text-slate-600">8/12 Week</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Gitar Akustik Intermediate</span>
                        <span className="text-sm text-slate-600">10/16 Week</span>
                      </div>
                      <Progress value={63} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Payments */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber-600" />
                    Pembayaran Terakhir
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentHistory.slice(0, 2).map((payment) => (
                      <div key={payment.id} className="flex justify-between items-start p-3 bg-slate-50 rounded-lg">
                        <div>
                          <div>{payment.course}</div>
                          <div className="text-sm text-slate-600">{payment.date}</div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-600 border-0 mb-1">
                            {payment.status}
                          </Badge>
                          <div className="text-sm">Rp {payment.amount.toLocaleString('id-ID')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-orange-600" />
                    Pesanan Terakhir
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {purchaseHistory.slice(0, 2).map((order) => (
                      <div key={order.id} className="flex justify-between items-start p-3 bg-slate-50 rounded-lg">
                        <div>
                          <div>{order.product}</div>
                          <div className="text-sm text-slate-600">{order.date}</div>
                        </div>
                        <div className="text-right">
                          <Badge className={`border-0 mb-1 ${
                            order.status === 'Selesai' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {order.status}
                          </Badge>
                          <div className="text-sm">Rp {order.amount.toLocaleString('id-ID')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Jadwal Kelas Saya</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingClasses.map((cls) => (
                    <div key={cls.id} className="p-4 border rounded-lg hover:border-indigo-300 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg mb-1">{cls.course}</h3>
                          <p className="text-slate-600">Instruktur: {cls.instructor}</p>
                        </div>
                        <Badge className="bg-indigo-600 text-white border-0">
                          {cls.room}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {cls.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {cls.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Progres Belajar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { course: "Piano untuk Pemula", weeks: 8, total: 12, attendance: 16, totalClasses: 24 },
                    { course: "Gitar Akustik Intermediate", weeks: 10, total: 16, attendance: 20, totalClasses: 32 }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <h3 className="text-lg mb-4">{item.course}</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progres Materi</span>
                            <span className="text-slate-600">{item.weeks}/{item.total} Week</span>
                          </div>
                          <Progress value={(item.weeks / item.total) * 100} className="h-2 mb-4" />
                          
                          <div className="flex justify-between text-sm mb-2">
                            <span>Kehadiran</span>
                            <span className="text-slate-600">{item.attendance}/{item.totalClasses} Kelas</span>
                          </div>
                          <Progress value={(item.attendance / item.totalClasses) * 100} className="h-2" />
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <div className="text-2xl text-indigo-600">{Math.round((item.weeks / item.total) * 100)}%</div>
                              <div className="text-xs text-slate-600">Progres</div>
                            </div>
                            <div>
                              <div className="text-2xl text-green-600">{Math.round((item.attendance / item.totalClasses) * 100)}%</div>
                              <div className="text-xs text-slate-600">Kehadiran</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Riwayat Pembayaran Kursus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-3">Invoice</th>
                        <th className="text-left p-3">Kursus</th>
                        <th className="text-left p-3">Tanggal</th>
                        <th className="text-left p-3">Jumlah</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentHistory.map((payment) => (
                        <tr key={payment.id} className="border-b">
                          <td className="p-3">{payment.invoice}</td>
                          <td className="p-3">{payment.course}</td>
                          <td className="p-3">{payment.date}</td>
                          <td className="p-3">Rp {payment.amount.toLocaleString('id-ID')}</td>
                          <td className="p-3">
                            <Badge className="bg-green-100 text-green-600 border-0">
                              {payment.status}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Riwayat Pembelian Produk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-3">Produk</th>
                        <th className="text-left p-3">Tanggal</th>
                        <th className="text-left p-3">Jumlah</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Tracking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchaseHistory.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="p-3">{order.product}</td>
                          <td className="p-3">{order.date}</td>
                          <td className="p-3">Rp {order.amount.toLocaleString('id-ID')}</td>
                          <td className="p-3">
                            <Badge className={`border-0 ${
                              order.status === 'Selesai' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm text-slate-600">{order.tracking}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Sertifikat Saya</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {certificates.map((cert) => (
                    <Card key={cert.id} className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-amber-500 p-3 rounded-lg">
                            <Award className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg mb-2">{cert.course}</h3>
                            <p className="text-sm text-slate-600 mb-1">Instruktur: {cert.instructor}</p>
                            <p className="text-sm text-slate-600 mb-4">Selesai: {cert.completedDate}</p>
                            <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0">
                              <Download className="w-4 h-4 mr-2" />
                              Download Sertifikat
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Pengaturan Profil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="w-20 h-20">
                      <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-white text-2xl">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Ganti Foto</Button>
                  </div>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-slate-600 mb-1 block">Nama Depan</label>
                        <input type="text" defaultValue="John" className="w-full p-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="text-sm text-slate-600 mb-1 block">Nama Belakang</label>
                        <input type="text" defaultValue="Doe" className="w-full p-2 border rounded-lg" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-slate-600 mb-1 block">Email</label>
                      <input type="email" defaultValue="john.doe@example.com" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="text-sm text-slate-600 mb-1 block">Nomor Telepon</label>
                      <input type="tel" defaultValue="08123456789" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="text-sm text-slate-600 mb-1 block">Alamat</label>
                      <textarea rows={3} defaultValue="Jl. Musik Harmoni No. 123, Jakarta" className="w-full p-2 border rounded-lg"></textarea>
                    </div>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0">
                      Simpan Perubahan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
