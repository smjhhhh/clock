import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

function UploadModal({ isOpen, onClose, onUploadSuccess }) {
    const { user } = useAuth();
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isPublic, setIsPublic] = useState(false); // 默认私密
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onDrop = (acceptedFiles) => {
        setSelectedFiles(prev => [...prev, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] },
        multiple: true
    });

    if (!isOpen) return null;

    const uploadPhoto = async (file) => {
        try {
            // 调试: 检查认证状态
            const { data: { session } } = await supabase.auth.getSession();
            console.log('Current session:', session);
            console.log('User from context:', user);
            console.log('Session user:', session?.user);

            if (!session) {
                throw new Error('未登录，请重新登录');
            }

            // 1. 压缩图片
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            });

            // 2. 生成唯一文件名
            const fileExt = file.name.split('.').pop();
            const fileName = `${session.user.id}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

            // 3. 上传到 Supabase Storage
            const { data: storageData, error: storageError } = await supabase
                .storage
                .from('photos')
                .upload(fileName, compressedFile);

            if (storageError) throw storageError;

            // 4. 获取公开URL
            const { data: { publicUrl } } = supabase
                .storage
                .from('photos')
                .getPublicUrl(fileName);

            // 5. 保存到数据库 - 使用 session.user.id 确保一致
            const { data, error } = await supabase
                .from('photos')
                .insert({
                    user_id: session.user.id,
                    image_url: publicUrl,
                    title: title || file.name,
                    description: description || '',
                    is_public: isPublic, // 关键：设置公开/私密
                    created_at: new Date().toISOString()
                })
                .select();

            if (error) {
                console.error('Database insert error:', error);
                throw error;
            }
            return data[0];
        } catch (error) {
            console.error('上传失败:', error);
            throw error;
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            alert('请先选择照片');
            return;
        }

        setUploading(true);
        try {
            for (let i = 0; i < selectedFiles.length; i++) {
                await uploadPhoto(selectedFiles[i]);
                setUploadProgress(((i + 1) / selectedFiles.length) * 100);
            }
            alert('上传成功！');
            onUploadSuccess();
            handleClose();
        } catch (error) {
            alert('上传失败: ' + error.message);
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const removeFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleClose = () => {
        setSelectedFiles([]);
        setTitle('');
        setDescription('');
        setIsPublic(false);
        setUploadProgress(0);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* 头部 */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        上传照片
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        disabled={uploading}
                    >
                        ✕
                    </button>
                </div>

                {/* 拖拽上传区域 */}
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                        isDragActive
                            ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                            : 'border-gray-300 dark:border-gray-600 hover:border-pink-400'
                    }`}
                >
                    <input {...getInputProps()} />
                    <div className="text-gray-600 dark:text-gray-400">
                        <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        {isDragActive ? (
                            <p className="text-lg font-medium">松开以上传照片</p>
                        ) : (
                            <>
                                <p className="text-lg font-medium mb-1">拖拽照片到此处，或点击选择</p>
                                <p className="text-sm">支持 PNG, JPG, GIF, WEBP 格式</p>
                            </>
                        )}
                    </div>
                </div>

                {/* 已选择的文件列表 */}
                {selectedFiles.length > 0 && (
                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                            已选择 {selectedFiles.length} 张照片
                        </h3>
                        <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-full h-24 object-cover rounded-lg"
                                    />
                                    <button
                                        onClick={() => removeFile(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 照片信息 */}
                <div className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            标题（可选）
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                            placeholder="为照片添加标题"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            描述（可选）
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                            placeholder="添加照片描述"
                        />
                    </div>

                    {/* 🔑 公开/私密切换 */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                {isPublic ? '🌍 公开照片' : '🔒 私密照片'}
                            </label>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                {isPublic ? '所有人都可以查看这张照片' : '只有你能看到这张照片'}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsPublic(!isPublic)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                isPublic ? 'bg-pink-500' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    isPublic ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>
                </div>

                {/* 上传进度 */}
                {uploading && (
                    <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-400">上传中...</span>
                            <span className="text-gray-600 dark:text-gray-400">{Math.round(uploadProgress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* 按钮 */}
                <div className="mt-6 flex gap-3">
                    <button
                        onClick={handleClose}
                        disabled={uploading}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                    >
                        取消
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={uploading || selectedFiles.length === 0}
                        className="flex-1 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? '上传中...' : `上传 ${selectedFiles.length} 张照片`}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UploadModal;
