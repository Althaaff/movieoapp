import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Explore from '../pages/ExplorePage';
import DetailPage from '../pages/DetailPage';
import SearchPage from '../pages/SearchPage';
import axios from 'axios';

// setup axios :

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path : ":explore",
        element : <Explore /> 
      },
      {
        path: ":explore/:id",
        element: <DetailPage />
      },
      {
        path: "search",
        element: <SearchPage />
      }
    ]
  }
])

export default router;
