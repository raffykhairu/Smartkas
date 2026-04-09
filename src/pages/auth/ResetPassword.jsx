import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authService from '../../services/authService';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Password tidak cocok');
            return;
        }

        if (password.length < 8) {
            setError('Password minimal 8 karakter');
            return;
        }

        setLoading(true);

        try {
            await authService.resetPassword(token, { password });

            setSuccess('Password berhasil direset');

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Gagal reset password'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
                    Reset Password
                </h2>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 text-green-500 p-3 rounded-xl mb-4">
                        {success}
                    </div>
                )}

                <form onSubmit={handleResetPassword} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Password baru"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-xl px-4 py-3"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Konfirmasi password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border rounded-xl px-4 py-3"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-orange-500 text-white rounded-xl"
                    >
                        {loading ? 'Memproses...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;