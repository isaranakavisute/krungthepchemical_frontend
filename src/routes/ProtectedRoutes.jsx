// Import your components with absolute paths
import SalesMonitoring from '../dashboard/SalesMonitoring';
import People from '../dashboard/People';
import PopProductCtrl from '../dashboard/Popular-Product-ctrl';
import BestProductCtrl from '../dashboard/Best-sell-ctrl';
import SliderCtrl from '../dashboard/Carousel';
import NewProductCtrl from '../dashboard/New-product-ctrl';
import BlogCtrl from '../dashboard/Blog-ctrl';
import ProductList from '../dashboard/Product-list';
import AdminList from '../dashboard/AdminList';
import SellLog from '../dashboard/SellLog';
import OrderList from '../dashboard/order-list';
import TrackingUpdate from '../dashboard/tracking-list';
import Logo from '../dashboard/logo';
import ContactList from '../dashboard/contact-list';

const protectedRoutes = [
  { path: 'admin/dashboard/sales', element: <SalesMonitoring /> },
  { path: 'admin/dashboard/sales_log', element: <SellLog /> },
  { path: 'admin/dashboard/user', element: <People /> },
  { path: 'admin/dashboard/admin_list', element: <AdminList />},
  { path: 'admin/dashboard/prod_list', element: <ProductList /> },
  { path: 'admin/dashboard/order_list', element: <OrderList /> },
  { path: 'admin/dashboard/tracking', element: <TrackingUpdate /> },
  { path: 'admin/dashboard/pop_prod', element: <PopProductCtrl /> },
  { path: 'admin/dashboard/best_prod', element: <BestProductCtrl /> },
  { path: 'admin/dashboard/new_prod', element: <NewProductCtrl /> },
  { path: 'admin/dashboard/blog_ctrl', element: <BlogCtrl /> },
  { path: 'admin/dashboard/slider', element: <SliderCtrl /> },
  { path: 'admin/dashboard/logo', element: <Logo /> },
  { path: 'admin/dashboard/contact_list', element: <ContactList /> },

];

export default protectedRoutes;
