import { 
  Calendar, 
  Users, 
  Clock, 
  DollarSign,
  CheckCircle,
  Home,
  BookOpen,
  ClipboardList,
  Plus
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Checkbox } from './ui/checkbox';

interface InstructorDashboardProps {
  navigateTo: (page: string, params?: any) => void;
}

const todaySchedule = [
  { id: 1, course: "Piano untuk Pemula", time: "10:00 - 12:00", room: "Studio A", students: 8, attended: 0 },
  { id: 2, course: "Piano Intermediate", time: "14:00 - 16:00", room: "Studio A", students: 6, attended: 0 }
];

const myClasses = [
  { id: 1, course: "Piano untuk Pemula", level: "Pemula", students: 8, schedule: "Sen, Rab, Jum 10:00-12:00" },
  { id: 2, course: "Piano Intermediate", level: "Menengah", students: 6, schedule: "Sen, Rab 14:00-16:00" },
  { id: 3, course: "Piano Advanced", level: "Lanjutan", students: 4, schedule: "Sel, Kam 10:00-12:00" }
];

const studentList = [
  { id: 1, name: "John Doe", course: "Piano untuk Pemula", progress: 67, attendance: 85 },
  { id: 2, name: "Jane Smith", course: "Piano untuk Pemula", progress: 75, attendance: 90 },
  { id: 3, name: "Bob Wilson", course: "Piano Intermediate", progress: 60, attendance: 80 },
  { id: 4, name: "Alice Brown", course: "Piano Intermediate", progress: 70, attendance: 95 }
];

const salaryHistory = [
  { id: 1, month: "Oktober 2024", amount: 12000000, classes: 48, status: "Dibayar", date: "2024-11-05" },
  { id: 2, month: "September 2024", amount: 11500000, classes: 46, status: "Dibayar", date: "2024-10-05" }
];

export default function InstructorDashboard({ navigateTo }: InstructorDashboardProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-white text-xl">
                  SJ
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl">Dashboard Instruktur</h1>
                <p className="text-purple-200">Selamat datang, Sarah Johnson!</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajukan Jadwal
              </Button>
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
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Kelas Hari Ini</p>
                  <p className="text-3xl">2</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Siswa</p>
                  <p className="text-3xl">18</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Jam Mengajar/Bulan</p>
                  <p className="text-3xl">96</p>
                </div>
                <div className="bg-amber-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Gaji Bulan Ini</p>
                  <p className="text-2xl">Rp 12jt</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="schedule">Jadwal</TabsTrigger>
            <TabsTrigger value="classes">Kelas Saya</TabsTrigger>
            <TabsTrigger value="students">Siswa</TabsTrigger>
            <TabsTrigger value="attendance">Absensi</TabsTrigger>
            <TabsTrigger value="salary">Gaji</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Today's Schedule */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    Jadwal Hari Ini
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {todaySchedule.length > 0 ? (
                    <div className="space-y-3">
                      {todaySchedule.map((schedule) => (
                        <div key={schedule.id} className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="mb-1">{schedule.course}</h3>
                              <div className="flex items-center gap-4 text-sm text-slate-600">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {schedule.time}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {schedule.students} siswa
                                </div>
                              </div>
                            </div>
                            <Badge className="bg-purple-600 text-white border-0">
                              {schedule.room}
                            </Badge>
                          </div>
                          <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                            <ClipboardList className="w-4 h-4 mr-2" />
                            Isi Absensi
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      Tidak ada kelas hari ini
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* This Week Schedule */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    Jadwal Minggu Ini
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { day: "Senin", classes: 2 },
                      { day: "Selasa", classes: 1 },
                      { day: "Rabu", classes: 2 },
                      { day: "Kamis", classes: 1 },
                      { day: "Jumat", classes: 1 }
                    ].map((day, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <span>{day.day}</span>
                        <Badge variant="outline">{day.classes} kelas</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="classes">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Kelas yang Saya Ajar</CardTitle>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Materi Baru
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myClasses.map((cls) => (
                    <Card key={cls.id} className="border-2 border-slate-200 hover:border-purple-300 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="bg-purple-100 p-2 rounded-lg">
                            <BookOpen className="w-6 h-6 text-purple-600" />
                          </div>
                          <Badge className="bg-amber-500 text-white border-0">
                            {cls.level}
                          </Badge>
                        </div>
                        <h3 className="mb-2">{cls.course}</h3>
                        <div className="space-y-2 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {cls.students} siswa
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {cls.schedule}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Daftar Siswa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-3">Nama Siswa</th>
                        <th className="text-left p-3">Kursus</th>
                        <th className="text-left p-3">Progres</th>
                        <th className="text-left p-3">Kehadiran</th>
                        <th className="text-left p-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentList.map((student) => (
                        <tr key={student.id} className="border-b">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {student.name}
                            </div>
                          </td>
                          <td className="p-3">{student.course}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-purple-600"
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-slate-600">{student.progress}%</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge className={`border-0 ${
                              student.attendance >= 90 ? 'bg-green-100 text-green-600' :
                              student.attendance >= 75 ? 'bg-amber-100 text-amber-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              {student.attendance}%
                            </Badge>
                          </td>
                          <td className="p-3">
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
          </TabsContent>

          <TabsContent value="attendance">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Isi Absensi Kelas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-3xl">
                  <div className="mb-6">
                    <label className="text-sm mb-2 block">Pilih Kelas</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Piano untuk Pemula - 10:00-12:00 - Studio A</option>
                      <option>Piano Intermediate - 14:00-16:00 - Studio A</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-4">Daftar Hadir Siswa</h3>
                    <div className="space-y-3">
                      {[
                        "John Doe",
                        "Jane Smith",
                        "Bob Wilson",
                        "Alice Brown",
                        "Charlie Davis",
                        "Diana Evans",
                        "Frank Garcia",
                        "Grace Harris"
                      ].map((name, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-purple-100 text-purple-600">
                                {name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span>{name}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Checkbox id={`present-${idx}`} defaultChecked={idx < 6} />
                              <label htmlFor={`present-${idx}`} className="text-sm">Hadir</label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="text-sm mb-2 block">Catatan Kelas</label>
                    <textarea 
                      rows={4} 
                      placeholder="Tambahkan catatan tentang kelas hari ini..."
                      className="w-full p-3 border rounded-lg"
                    ></textarea>
                  </div>

                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Simpan Absensi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="salary">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Riwayat Gaji</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-3">Periode</th>
                        <th className="text-left p-3">Jumlah Kelas</th>
                        <th className="text-left p-3">Gaji</th>
                        <th className="text-left p-3">Tanggal Bayar</th>
                        <th className="text-left p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salaryHistory.map((salary) => (
                        <tr key={salary.id} className="border-b">
                          <td className="p-3">{salary.month}</td>
                          <td className="p-3">{salary.classes} kelas</td>
                          <td className="p-3">Rp {salary.amount.toLocaleString('id-ID')}</td>
                          <td className="p-3">{salary.date}</td>
                          <td className="p-3">
                            <Badge className="bg-green-100 text-green-600 border-0">
                              {salary.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Profil Instruktur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="w-20 h-20">
                      <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-500 text-white text-2xl">
                        SJ
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl mb-1">Sarah Johnson</h2>
                      <p className="text-slate-600">Piano Instructor</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-slate-600 mb-1 block">Bio</label>
                      <textarea 
                        rows={4} 
                        defaultValue="Pianis profesional dengan 15 tahun pengalaman mengajar. Lulusan dari Berklee College of Music."
                        className="w-full p-2 border rounded-lg"
                      ></textarea>
                    </div>
                    <div>
                      <label className="text-sm text-slate-600 mb-1 block">Spesialisasi</label>
                      <input 
                        type="text" 
                        defaultValue="Piano Klasik, Jazz, Pop" 
                        className="w-full p-2 border rounded-lg" 
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-slate-600 mb-1 block">Email</label>
                        <input type="email" defaultValue="sarah.johnson@harmonimusic.com" className="w-full p-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="text-sm text-slate-600 mb-1 block">Nomor Telepon</label>
                        <input type="tel" defaultValue="08123456789" className="w-full p-2 border rounded-lg" />
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0">
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
