import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import LandingPage from './pages/LandingPage.jsx';
import HomePage from './pages/HomePage.jsx';
import HeatmapPage from './pages/HeatmapPage.jsx';
import WeatherPage from './pages/WeatherPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';
import AIPage from './pages/AIPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<HomePage />} />
                    <Route path="/heatmap" element={<HeatmapPage />} />
                    <Route path="/weather" element={<WeatherPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:id" element={<BlogPostPage />} />
                    <Route path="/ai" element={<AIPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;