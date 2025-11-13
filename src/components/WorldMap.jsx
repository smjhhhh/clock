import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 修复 Leaflet 默认图标问题
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function WorldMap() {
    // 上海和阿灵顿的坐标
    const locations = [
        {
            name: '上海',
            emoji: '🇨🇳',
            coords: [31.2304, 121.4737],
            info: 'Shanghai, China'
        },
        {
            name: '阿灵顿',
            emoji: '🇺🇸',
            coords: [38.8816, -77.0910],
            info: 'Arlington, VA, USA'
        }
    ];

    // 地图中心点（两个位置的中间）
    const center = [35, 20];

    return (
        <div className="bg-black/80 backdrop-blur-lg rounded-lg p-3 shadow-2xl border-2 border-blue-700/50">
            <h3 className="text-blue-400 font-bold text-xs mb-2 font-mono">🗺️ 世界地图</h3>

            <div className="rounded overflow-hidden border border-blue-700/30">
                <MapContainer
                    center={center}
                    zoom={2}
                    style={{ height: '400px', width: '350px' }}
                    scrollWheelZoom={true}
                    zoomControl={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {locations.map((loc, idx) => (
                        <Marker key={idx} position={loc.coords}>
                            <Popup>
                                <div className="font-mono text-xs">
                                    <div className="font-bold">{loc.emoji} {loc.name}</div>
                                    <div className="text-gray-600">{loc.info}</div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <div className="mt-2 flex gap-3 text-[10px] text-gray-400 font-mono justify-center">
                <span>🇨🇳 上海</span>
                <span>•</span>
                <span>🇺🇸 阿灵顿</span>
            </div>
        </div>
    );
}

export default WorldMap;
