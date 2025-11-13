import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import HeatmapPage from './pages/HeatmapPage.jsx';
import WeatherPage from './pages/WeatherPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';
import AIPage from './pages/AIPage.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/heatmap" element={<HeatmapPage />} />
                <Route path="/weather" element={<WeatherPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />
                <Route path="/ai" element={<AIPage />} />
            </Routes>
        </Router>
    );
}

export default App;