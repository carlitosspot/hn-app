import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
const HomePage = React.lazy(() => import('./Pages/HomePage'));
const StarredPage = React.lazy(() => import('./Pages/StarredPage'));

const App: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <NavigationBar />
        <div className="columns">
          <div className="column is-full">
            <Routes>
              <Route path="/" element={
                <Suspense fallback={<div>Loading Home Page...</div>}>
                  <HomePage />
                </Suspense>
              }/>
              <Route path="/starred" element={
                <Suspense fallback={<div>Loading Starred Page...</div>}>
                  <StarredPage />
                </Suspense>
              }/>
            </Routes>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
