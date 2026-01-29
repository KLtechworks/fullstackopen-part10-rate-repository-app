// // Exercise 10.1-10.10
// import { useState, useEffect } from 'react';

// const useRepositories = () => {
//   const [repositories, setRepositories] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchRepositories = async () => {
//     setLoading(true);  

//     try {
//       const response = await fetch('http://192.168.1.58:5001/api/repositories');
//       const json = await response.json();
//       setRepositories(json);
//     } catch (error) {
//       console.error('error', error);
//     } finally {
//       setLoading(false);  
//     }
//   };

//   useEffect(() => {
//     fetchRepositories();
//   }, []);

//   return {
//     repositories,     
//     loading,          
//     refetch: fetchRepositories  
//   };
// };

// export default useRepositories;

// Exercise 10.11: fetching repositories with Apollo Client
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',   
  });

  const repositories = data
    ? data.repositories.edges.map(edge => edge.node)
    : null;

  return {
    repositories,
    loading,
    error,
    refetch,   
  };
};

export default useRepositories;