import axios from "axios";
import { useEffect, useState } from "react"

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(endpoint);
      setLoading(false);
      setData(response.data.results);
     //  console.log(' reponses:' ,response.data.results);
    } catch(err) {
     console.log('error: ' ,err)
    }
 } 

 useEffect(() => {
    fetchData()
 }, [endpoint])

  return { data, loading }
}

export default useFetch;

// 'movie/now_playing'