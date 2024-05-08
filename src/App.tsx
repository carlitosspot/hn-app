import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar.tsx';
import Footer from './components/Footer';
import HomePage from './Pages/HomePage';
import StarredPage from './Pages/StarredPage';
import DetailPage from './Pages/DetailPage.tsx';

const App: React.FC = () => {
  return (
    <section className="section main-container">
      <div className="container">
        <NavigationBar />
        <div className="columns">
          <div className="column is-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/starred" element={<StarredPage />} />
              <Route path="/details/:id" element={<DetailPage />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default App;
