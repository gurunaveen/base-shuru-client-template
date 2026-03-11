import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <Link to="/page1">Go to Page 1</Link> | <Link to="/page2">Go to Page 2</Link>
      </nav>
    </div>
  );
}

export default Home;
