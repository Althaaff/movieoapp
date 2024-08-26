// Home.jsx ;-
import BannerHome from '../components/BannerHome';
import { useSelector } from 'react-redux';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import useFetch from '../hooks/useFetch';

const Home = () => {
  const trendingData = useSelector((state) => state.moviosData.bannerData);
  const { data: nowPlayingData } = useFetch('movie/now_playing');
  const { data: topRatedData } = useFetch('movie/top_rated');
  const { data: popularTvShowData } = useFetch('tv/popular');   //on_the_air
  const { data: onTheAirShowData } = useFetch('tv/on_the_air');

  return (
    <div>
      <BannerHome />
      {/* trending horizontal scroll card : */}
       <HorizontalScrollCard data={trendingData} heading={'Trending'} trending={true} media_type={"movie"} />
       <HorizontalScrollCard data={nowPlayingData} heading={'Now Playing'} media_type={"movie"} />
       <HorizontalScrollCard data={topRatedData} heading={'Top Rated'} media_type={"movie"} />
       <HorizontalScrollCard data={popularTvShowData} heading={'Popular TV Show'} media_type={"tv"} />
       <HorizontalScrollCard data={onTheAirShowData} heading={'On The Air'} media_type={'tv'} />
    </div>
  );
};

export default Home;

