/* eslint-disable consistent-return */
/* eslint-disable lines-around-directive */
'use client';
/* eslint-disable spaced-comment */

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

//import { Button } from 'react-bootstrap';
//import { signOut } from '@/utils/auth'; // anything in the src dir, you can use the @ instead of relative paths
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';

function Home() {
  const [uselessFact, setUselessFact] = useState({});
  const { user } = useAuth();

  const fetchFact = async () => {
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
      const fact = await response.json();
      setUselessFact(fact);
    } catch (error) {
      console.error('Error fetching useless fact:', error);
    }
  };

  const selectResponse = (boolean) => {
    if (!user) {
      console.error('User is not authenticated');
      return;
    }

    const obj = {
      userId: user.uid,
      permalink: uselessFact.permalink,
      response: boolean,
    };
    fetchFact();
    return obj;
  };

  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <>
      <p>{uselessFact.text || 'Loading a useless fact...'}</p>

      <h1>Did you know this fact?</h1>
      <button className="btn btn-success" type="button" onClick={() => selectResponse(true)}>
        Yes
      </button>
      <button className="btn btn-danger" type="button" onClick={() => selectResponse(false)}>
        No
      </button>
    </>
  );
}

export default Home;
