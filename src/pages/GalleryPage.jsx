import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from '../components/auth/LoginModal';
import UploadModal from '../components/gallery/UploadModal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

function GalleryPage() {
    const { user, isAuthenticated, signOut } = useAuth();
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLogin, setShowLogin] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        fetchPhotos();
    }, [isAuthenticated]);

    const fetchPhotos = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('photos')
                .select('*')
                .order('created_at', { ascending: false });

            // 如果未登录，只显示公开照片
            if (!isAuthenticated) {
                query = query.eq('is_public', true);
            }

            const { data, error } = await query;

            if (error) throw error;
            setPhotos(data || []);
        } catch (error) {
            console.error('获取照片失败:', error);
        } finally {
            setLoading(false);
        }
    };

    const togglePhotoPrivacy = async (photo) => {
        try {
            const { error } = await supabase
                .from('photos')
                .update({ is_public: !photo.is_public })
                .eq('id', photo.id);

            if (error) throw error;

            // 更新本地状态
            setPhotos(prevPhotos =>
                prevPhotos.map(p =>
                    p.id === photo.id ? { ...p, is_public: !p.is_public } : p
                )
            );
        } catch (error) {
            alert('更新失败: ' + error.message);
        }
    };

    const deletePhoto = async (photo) => {
        if (!confirm('确定要删除这张照片吗？')) return;

        try {
            // 1. 从存储中删除文件
            const fileName = photo.image_url.split('/').pop();
            const filePath = `${user.id}/${fileName}`;

            await supabase.storage
                .from('photos')
                .remove([filePath]);

            // 2. 从数据库删除记录
            const { error } = await supabase
                .from('photos')
                .delete()
                .eq('id', photo.id);

            if (error) throw error;

            // 3. 更新本地状态
            setPhotos(prevPhotos => prevPhotos.filter(p => p.id !== photo.id));
            alert('删除成功！');
        } catch (error) {
            alert('删除失败: ' + error.message);
        }
    };

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const lightboxSlides = photos.map(photo => ({
        src: photo.image_url,
        alt: photo.title,
        description: photo.description
    }));

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* 顶部导航栏 */}
            <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                                Yoru
                            </Link>
                            <span className="text-gray-400">/</span>
                            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                                📸 相册
                            </h1>
                        </div>

                        <div className="flex items-center gap-3">
                            {isAuthenticated ? (
                                <>
                                    <button
                                        onClick={() => setShowUpload(true)}
                                        className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold transition-colors"
                                    >
                                        + 上传照片
                                    </button>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <span>{user.email}</span>
                                        <button
                                            onClick={signOut}
                                            className="text-pink-500 hover:text-pink-600"
                                        >
                                            退出
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <button
                                    onClick={() => setShowLogin(true)}
                                    className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold transition-colors"
                                >
                                    登录以上传
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* 主内容区 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 照片统计 */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="text-gray-600 dark:text-gray-400">
                        {isAuthenticated ? (
                            <>
                                共 {photos.length} 张照片
                                <span className="mx-2">·</span>
                                <span className="text-green-600">🌍 {photos.filter(p => p.is_public).length} 张公开</span>
                                <span className="mx-2">·</span>
                                <span className="text-gray-500">🔒 {photos.filter(p => !p.is_public).length} 张私密</span>
                            </>
                        ) : (
                            `${photos.length} 张公开照片`
                        )}
                    </div>
                </div>

                {/* 加载状态 */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">加载中...</p>
                    </div>
                ) : photos.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl mb-4">📷</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {isAuthenticated ? '还没有照片，点击上传第一张吧！' : '暂无公开照片'}
                        </p>
                        {isAuthenticated && (
                            <button
                                onClick={() => setShowUpload(true)}
                                className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold transition-colors"
                            >
                                + 上传照片
                            </button>
                        )}
                    </div>
                ) : (
                    /* 照片网格 */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {photos.map((photo, index) => (
                            <div
                                key={photo.id}
                                className="group relative bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                            >
                                {/* 照片 */}
                                <div
                                    onClick={() => openLightbox(index)}
                                    className="cursor-pointer aspect-square overflow-hidden"
                                >
                                    <LazyLoadImage
                                        src={photo.image_url}
                                        alt={photo.title}
                                        effect="blur"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>

                                {/* 公开/私密标识 */}
                                <div className="absolute top-2 right-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        photo.is_public
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-900 text-white'
                                    }`}>
                                        {photo.is_public ? '🌍 公开' : '🔒 私密'}
                                    </span>
                                </div>

                                {/* 管理按钮（仅登录用户） */}
                                {isAuthenticated && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => togglePhotoPrivacy(photo)}
                                                className="flex-1 px-3 py-1 bg-white/90 hover:bg-white text-gray-900 rounded text-sm font-semibold transition-colors"
                                                title={photo.is_public ? '设为私密' : '设为公开'}
                                            >
                                                {photo.is_public ? '🔒 私密' : '🌍 公开'}
                                            </button>
                                            <button
                                                onClick={() => deletePhoto(photo)}
                                                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-semibold transition-colors"
                                            >
                                                删除
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* 照片信息 */}
                                {photo.title && (
                                    <div className="p-3">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                            {photo.title}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 弹窗 */}
            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
            <UploadModal
                isOpen={showUpload}
                onClose={() => setShowUpload(false)}
                onUploadSuccess={fetchPhotos}
            />

            {/* 灯箱 */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={lightboxIndex}
                slides={lightboxSlides}
            />
        </div>
    );
}

export default GalleryPage;
