import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage';
import CourseDetail from './components/CourseDetail';
import ShopPage from './components/ShopPage';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import MemberDashboard from './components/MemberDashboard';
import InstructorDashboard from './components/InstructorDashboard';
import AdminDashboard from './components/AdminDashboard';
import Layout from './components/Layout';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import { initialCourses, initialProducts } from './data/initialData';
import { Course, Product, CartItem, UserRole } from './types';

// Wrapper components to handle params
const CourseDetailWrapper = ({ 
  courses, 
  navigateTo, 
  userRole, 
  onEdit, 
  onDelete 
}: { 
  courses: Course[], 
  navigateTo: (page: string, params?: any) => void,
  userRole: UserRole,
  onEdit: (course: Course) => void,
  onDelete: (id: number) => void
}) => {
  const { id } = useParams();
  const course = courses.find(c => c.id === Number(id));
  return <CourseDetail course={course} navigateTo={navigateTo} userRole={userRole} onEdit={onEdit} onDelete={onDelete} />;
};

const ProductDetailWrapper = ({ 
  products, 
  navigateTo, 
  addToCart, 
  userRole, 
  onEdit, 
  onDelete 
}: { 
  products: Product[], 
  navigateTo: (page: string, params?: any) => void,
  addToCart: (product: Product) => void,
  userRole: UserRole,
  onEdit: (product: Product) => void,
  onDelete: (id: number) => void
}) => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  return <ProductDetail product={product} navigateTo={navigateTo} addToCart={addToCart} userRole={userRole} onEdit={onEdit} onDelete={onDelete} />;
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Auth State
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser).role : 'guest';
  });

  const [user, setUser] = useState<any>(() => {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Data State with LocalStorage Persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Effects to save data whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Backward compatibility wrapper for old navigation style
  const navigateTo = (page: string, params?: any) => {
    switch (page) {
      case 'home': navigate('/'); break;
      case 'login': navigate('/login'); break;
      case 'register': navigate('/register'); break;
      case 'courses': navigate('/courses'); break;
      case 'course-detail': navigate(`/courses/${params?.courseId}`); break;
      case 'shop': navigate('/shop'); break;
      case 'product-detail': navigate(`/shop/${params?.productId}`); break;
      case 'cart': navigate('/cart'); break;
      case 'checkout': navigate('/checkout'); break;
      case 'member-dashboard': navigate('/dashboard/member'); break;
      case 'instructor-dashboard': navigate('/dashboard/instructor'); break;
      case 'admin-dashboard': navigate('/dashboard/admin'); break;
      default: navigate('/');
    }
    window.scrollTo(0, 0);
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Course CRUD Handlers
  const handleAddCourse = (newCourse: Omit<Course, 'id'>) => {
    const id = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    const courseWithId = { ...newCourse, id } as Course;
    setCourses([...courses, courseWithId]);
    alert('Kursus berhasil ditambahkan!');
  };

  const handleEditCourse = (updatedCourse: Course) => {
    setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    alert('Kursus berhasil diperbarui!');
  };

  const handleDeleteCourse = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus kursus ini?')) {
        setCourses(prev => prev.filter(c => c.id !== id));
        navigate('/courses');
        alert('Kursus berhasil dihapus.');
    }
  };

  // Product CRUD Handlers
  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const productWithId = { ...newProduct, id } as Product;
    setProducts([...products, productWithId]);
    alert('Produk berhasil ditambahkan!');
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    alert('Produk berhasil diperbarui!');
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        setProducts(prev => prev.filter(p => p.id !== id));
        navigate('/shop');
        alert('Produk berhasil dihapus.');
    }
  };

  // Determine currentPage string for Layout
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/login') return 'login';
    if (path === '/register') return 'register';
    if (path.startsWith('/courses')) return path === '/courses' ? 'courses' : 'course-detail';
    if (path.startsWith('/shop')) return path === '/shop' ? 'shop' : 'product-detail';
    if (path === '/cart') return 'cart';
    if (path === '/checkout') return 'checkout';
    if (path.includes('dashboard')) return 'dashboard'; // Layout checks .includes('dashboard')
    return 'home';
  };

  return (
    <Layout 
      currentPage={getCurrentPage()} 
      navigateTo={navigateTo} 
      userRole={userRole}
      setUserRole={setUserRole}
      cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
    >
      <Routes>
        <Route path="/" element={
          <HomePage 
            navigateTo={navigateTo} 
            userRole={userRole} 
            featuredCourses={courses.slice(0, 3)} 
            featuredProducts={products.slice(0, 3)} 
            onEditCourse={handleEditCourse}
            onDeleteCourse={handleDeleteCourse}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        } />
        <Route path="/login" element={
            <LoginPage setUserRole={setUserRole} setUser={setUser} />
        } />
        <Route path="/register" element={
            <RegisterPage setUserRole={setUserRole} setUser={setUser} />
        } />
        <Route path="/courses" element={
          <CoursesPage 
            navigateTo={navigateTo} 
            userRole={userRole} 
            courses={courses}
            onAdd={handleAddCourse}
            onEdit={handleEditCourse}
            onDelete={handleDeleteCourse}
          />
        } />
        <Route path="/courses/:id" element={
          <CourseDetailWrapper 
            courses={courses}
            navigateTo={navigateTo}
            userRole={userRole}
            onEdit={handleEditCourse}
            onDelete={handleDeleteCourse}
          />
        } />
        <Route path="/shop" element={
          <ShopPage 
            navigateTo={navigateTo} 
            addToCart={addToCart} 
            userRole={userRole} 
            products={products}
            onAdd={handleAddProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        } />
        <Route path="/shop/:id" element={
          <ProductDetailWrapper 
            products={products}
            navigateTo={navigateTo}
            addToCart={addToCart}
            userRole={userRole}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        } />
        <Route path="/cart" element={
          <Cart cartItems={cartItems} setCartItems={setCartItems} navigateTo={navigateTo} />
        } />
        <Route path="/checkout" element={
          <Checkout cartItems={cartItems} navigateTo={navigateTo} />
        } />
        <Route path="/dashboard/member" element={
          <MemberDashboard navigateTo={navigateTo} />
        } />
        <Route path="/dashboard/instructor" element={
          <InstructorDashboard navigateTo={navigateTo} />
        } />
        <Route path="/dashboard/admin" element={
          <AdminDashboard navigateTo={navigateTo} />
        } />
      </Routes>
    </Layout>
  );
}