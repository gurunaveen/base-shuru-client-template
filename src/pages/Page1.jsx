import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { api } from '../services/api';

function Page1() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Example API call - uncomment and modify as needed
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const result = await api.get('/endpoint');
  //       setData(result);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <h1>Page 1</h1>
      <Link to="/">Back to Home</Link>
      {loading && <p>Loading...</p>}
      {/* Render your data here */}
    </div>
  );
}

export default Page1;
