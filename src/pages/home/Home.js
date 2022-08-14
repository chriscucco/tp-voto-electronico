import './Home.css';
import {  useEffect } from 'react';

function Home() {
  useEffect(() => {
    const init = async () => {
      const response = await fetch('/auth')
      if (response.status != 200) {
       window.location.href = '/login'
      }
    }
    init();
  }, []);
  return (
    <div className="Home">
      <header className="Home-header">
        <p>
          HOME
        </p>
      </header>
    </div>
  );
}

export default Home;
