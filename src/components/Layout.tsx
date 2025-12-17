import { Menu, ShoppingCart, User, Music, GraduationCap, Store, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  navigateTo: (page: any, params?: any) => void;
  userRole: 'guest' | 'member' | 'instructor' | 'admin';
  setUserRole: (role: 'guest' | 'member' | 'instructor' | 'admin') => void;
  cartItemsCount: number;
}

export default function Layout({ 
  children, 
  currentPage, 
  navigateTo, 
  userRole, 
  setUserRole,
  cartItemsCount 
}: LayoutProps) {
  const isDashboard = currentPage.includes('dashboard');

  if (isDashboard) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 border-b border-indigo-800 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-lg">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="tracking-tight">Harmoni Music</div>
                <div className="text-xs text-amber-300">School & Store</div>
              </div>
            </button>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigateTo('home')}
                className={`text-sm transition-colors ${
                  currentPage === 'home' 
                    ? 'text-amber-400' 
                    : 'text-white hover:text-amber-300'
                }`}
              >
                Beranda
              </button>
              <button
                onClick={() => navigateTo('courses')}
                className={`flex items-center gap-1 text-sm transition-colors ${
                  currentPage.includes('course') 
                    ? 'text-amber-400' 
                    : 'text-white hover:text-amber-300'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Kursus
              </button>
              <button
                onClick={() => navigateTo('shop')}
                className={`flex items-center gap-1 text-sm transition-colors ${
                  currentPage.includes('shop') || currentPage.includes('product') 
                    ? 'text-amber-400' 
                    : 'text-white hover:text-amber-300'
                }`}
              >
                <Store className="w-4 h-4" />
                Toko
              </button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <button
                onClick={() => navigateTo('cart')}
                className="relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-orange-500 text-white border-0 w-5 h-5 flex items-center justify-center p-0">
                    {cartItemsCount}
                  </Badge>
                )}
              </button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:bg-white/10"
                    size="sm"
                  >
                    <User className="w-5 h-5 mr-2" />
                    {userRole === 'guest' ? 'Login' : userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {userRole === 'guest' ? (
                    <>
                      <DropdownMenuItem onClick={() => navigateTo('login')}>
                        Login / Register
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => {
                        if (userRole === 'member') navigateTo('member-dashboard');
                        if (userRole === 'instructor') navigateTo('instructor-dashboard');
                        if (userRole === 'admin') navigateTo('admin-dashboard');
                      }}>
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => {
                          setUserRole('guest');
                          localStorage.removeItem('token');
                          localStorage.removeItem('user');
                          navigateTo('home');
                      }}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu */}
              <button className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-lg">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div>Harmoni Music</div>
                  <div className="text-xs text-amber-300">School & Store</div>
                </div>
              </div>
              <p className="text-sm text-slate-400">
                Platform terpadu untuk pembelajaran musik dan belanja alat musik berkualitas.
              </p>
            </div>

            <div>
              <h3 className="mb-4">Navigasi</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><button onClick={() => navigateTo('home')} className="hover:text-amber-400 transition-colors">Beranda</button></li>
                <li><button onClick={() => navigateTo('courses')} className="hover:text-amber-400 transition-colors">Kursus</button></li>
                <li><button onClick={() => navigateTo('shop')} className="hover:text-amber-400 transition-colors">Toko</button></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4">Kontak</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Email: info@harmonimusic.com</li>
                <li>Telp: (021) 1234-5678</li>
                <li>Alamat: Jl. Musik Harmoni No. 123</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4">Media Sosial</h3>
              <div className="flex gap-3">
                <button className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </button>
                <button className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 Harmoni Music. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
