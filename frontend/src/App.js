import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ContactUs from './pages/ContactUs';
import HomePage from './pages/HomePage';
import Menu from './pages/Menu';
import SearchMenu from './pages/SearchMenu';
import ReserveTable from './pages/ReserveTable';
import TimeSlot from './pages/TimeSlot';
import PaymentForm from './pages/PaymentForm';
import OrderSummary from './pages/OrderSummary';
import Cart from './pages/Cart';
import StaffLogin from './pages/Staffside/StaffLogin';
import HistoryOrders from './pages/Staffside/HistoryOrders';
import OrdersPlaced from './pages/Staffside/OrdersPlaced';
import EmployeeProfile from './pages/Staffside/EmployeeProfile';
import EmployeeDashboard from './pages/Staffside/EmployeeDashboard';
import OwnerLogin from './pages/OwnerInterface/OwnerLogin';
import ItemCart from './pages/OwnerInterface/ItemCart';
import EmployeeList from './pages/OwnerInterface/EmployeeList';
import ProfileUpdate from './pages/OwnerInterface/ProfileUpdate';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reserveTable" element={<ReserveTable />} />
          <Route path="/searchMenu" element={<SearchMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderSummary" element={<OrderSummary />} />
          <Route path="/timeSlot" element={<TimeSlot />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/orders" element={<OrdersPlaced />} />
          <Route path="/profile" element={<EmployeeProfile />} />
          <Route path="/history" element={<HistoryOrders />} />
          <Route path="/dashboard" element={<EmployeeDashboard />} />
          <Route path="/stafflogin" element={<StaffLogin />} />
          <Route path="/ownerlogin" element={<OwnerLogin />} />
          <Route path="/items-list" element={<ItemCart />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/employee-profile" element={<ProfileUpdate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
