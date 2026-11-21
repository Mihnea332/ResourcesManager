import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import ResourcesManager from './ResourcesManager/ResourcesManager.js';
import './App.css';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <ResourcesManager />
      <Footer />
    </div>
  );
}

export default App;