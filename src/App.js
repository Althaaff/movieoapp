import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageUrl } from './store/movieoSlice';

function App() {

  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get('/trending/all/week');

      dispatch(setBannerData(response.data.results));

      // console.log('response :', response.data.results);
    } catch (err) {
      console.log("error :", err)
    }
  }

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get('/configuration');

     dispatch(setImageUrl(response.data.images.secure_base_url + 'original'))


      // console.log('configuration data :', response.data.images.secure_base_url + 'original');
    } 
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, [])

  return (
    <main className='pb-14 lg:pb-0'>
     <Header />
      <div className='min-h-[93vh]'>
       <Outlet />
      </div>
     <Footer />
     <MobileNavigation />
    </main>
  );
}

export default App;
