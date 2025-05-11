import Loader from '../Loader/Loader';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect, } from 'react';
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('../../pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('../../pages/ContactsPage/ContactsPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));
import Layout from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute';

function App() {
  const dispatch = useDispatch();
  useEffect(() => { 
    dispatch(refreshUser());
  }, [dispatch]);
  const isRefreshing = useSelector(selectIsRefreshing);
  return isRefreshing ? null : (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={ <Layout /> }>
            <Route index element={ <HomePage />} />
            <Route path='contacts' element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            } />
            <Route path='/register' element={
              <RestrictedRoute component={<RegistrationPage />} redirectTo='/contacts' />} />
            <Route path='/login' element={
             <RestrictedRoute component={ <LoginPage />} redirectTo='/contacts' />} />
          </Route>
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <Toaster position='top-right' toastOptions={{
            style: {
              background: 'orange',
              color: 'white',
            },
      }}/>
      </Suspense>
    </>
  )
}

export default App
