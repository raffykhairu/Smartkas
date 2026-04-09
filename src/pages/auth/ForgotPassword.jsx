import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import authService from '../../services/authService';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            await authService.forgotPassword({ email });
            setMessage('Link reset password berhasil dikirim ke email Anda.');
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Gagal mengirim link reset password.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-scale-in">
                <div className="bg-white rounded-2xl shadow-xl px-8 py-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                            <Mail size={24} className="text-orange-500" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-orange-500 text-center mb-2">
                        Lupa Password
                    </h2>

                    <p className="text-sm text-slate-500 text-center mb-6">
                        Masukkan email Anda untuk menerima link reset password
                    </p>

                    {message && (
                        <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-xl mb-4">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleForgotPassword} className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-slate-700 mb-2 block">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Masukkan email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-sm font-bold"
                        >
                            {loading ? 'Mengirim...' : 'Kirim Link Reset'}
                        </button>
                    </form>

                    <p className="text-sm text-center text-slate-500 mt-6">
                        <Link
                            to="/login"
                            className="text-orange-500 font-semibold"
                        >
                            Kembali ke Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;