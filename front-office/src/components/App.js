
import '../assets/stylesheets/App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Default Page.</h1>
      <nav>
        <Link to="/commerce">E-Commerce Page</Link>
      </nav>
    </div>
  );
}

export default App;
