import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar.tsx';
import Footer from './components/Footer';
const HomePage = React.lazy(() => import('./Pages/HomePage'));
const StarredPage = React.lazy(() => import('./Pages/StarredPage'));

const App: React.FC = () => {
  return (
    <section className="section main-container">
      <div className="container">
        <NavigationBar />
        <div className="columns">
          <div className="column is-full">
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<div>Loading Home Page...</div>}>
                    <HomePage />
                  </Suspense>
                }
              />
              <Route
                path="/starred"
                element={
                  <Suspense fallback={<div>Loading Starred Page...</div>}>
                    <StarredPage />
                  </Suspense>
                }
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default App;
