import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import HeatmapPage from './pages/HeatmapPage.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/heatmap" element={<HeatmapPage />} />
            </Routes>
        </Router>
    );
}

export default App;