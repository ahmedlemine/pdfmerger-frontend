import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <ToastContainer />
      <Footer />
    </>
  );
};
export default MainLayout;