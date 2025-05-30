import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import Button from '../../components/button/Button';
import { Input, InputGroup } from '../../components/input';
import { ErrorMessage } from '../../components/error-message';
import { GoogleIcon, Icon, Logo } from '../../components/icons';
import styles from './login.page.module.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw error;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during Google login');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <div className={styles.header}>
                    <Icon size={40} />
                    <h1>Welcome Back!</h1>
                </div>
                <form onSubmit={handleLogin} className={styles.form}>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    
                    <InputGroup label="Email" htmlFor="email" required>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            fullWidth
                        />
                    </InputGroup>

                    <InputGroup label="Password" htmlFor="password" required>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            fullWidth
                        />
                    </InputGroup>

                    <Button 
                        type="submit" 
                        variant="primary"
                        fullWidth
                        isLoading={loading}
                    >
                        Login
                    </Button>
                </form>

                <div className={styles.divider}>
                    <span>or</span>
                </div>

                <Button 
                    onClick={handleGoogleLogin}
                    variant="secondary-subtle"
                    fullWidth
                    disabled={loading}
                    leftIcon={<GoogleIcon size={18} />}
                >
                    Sign in with Google
                </Button>

                <p className={styles.signupLink}>
                    Don't have an account? <Link to="/signup">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;