import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Music, ArrowRight, Loader2 } from 'lucide-react';
import { UserRole } from '@/types';

interface LoginPageProps {
    setUserRole: (role: UserRole) => void;
    setUser: (user: any) => void;
}

export default function LoginPage({ setUserRole, setUser }: LoginPageProps) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save token
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Update State
                setUser(data.user);
                setUserRole(data.user.role as UserRole);

                // Redirect based on role
                if (data.user.role === 'admin') navigate('/dashboard/admin');
                else if (data.user.role === 'instructor') navigate('/dashboard/instructor');
                else if (data.user.role === 'member') navigate('/dashboard/member');
                else navigate('/');
            } else {
                setError(data.error || 'Login gagal.');
            }
        } catch (err) {
            setError('Gagal menghubungkan ke server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-xl border-0">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-lg">
                            <Music className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Selamat Datang Kembali</CardTitle>
                    <CardDescription>Masukkan email dan password Anda untuk masuk</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="nama@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button 
                            type="submit" 
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Login
                        </Button>
                    </form>
                    
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-500">Atau masuk sebagai (Dummy)</span></div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm" onClick={() => { setUserRole('member'); navigate('/dashboard/member'); }}>Member</Button>
                        <Button variant="outline" size="sm" onClick={() => { setUserRole('instructor'); navigate('/dashboard/instructor'); }}>Instruktur</Button>
                        <Button variant="outline" size="sm" onClick={() => { setUserRole('admin'); navigate('/dashboard/admin'); }}>Admin</Button>
                    </div>
                </CardContent>
                <CardFooter className="justify-center border-t p-4">
                    <p className="text-sm text-slate-600">
                        Belum punya akun?{' '}
                        <button onClick={() => navigate('/register')} className="text-indigo-600 font-medium hover:underline">
                            Daftar Sekarang
                        </button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
