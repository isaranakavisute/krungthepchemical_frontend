
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';

const getPublicRoutes = [
    { path: 'pages/signin', element: <Signin /> },
    { path: 'pages/signup', element: <Signup /> },
  ];

export default getPublicRoutes;
