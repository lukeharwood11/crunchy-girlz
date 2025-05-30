import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import Button from '../../components/button/Button';
import { Input, InputGroup } from '../../components/input';
import { ErrorMessage } from '../../components/error-message';
import styles from './signup.page.module.css';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) throw error;
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during sign up');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw error;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during Google sign up');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.signupBox}>
                <h1>Create Account</h1>
                <form onSubmit={handleSignUp} className={styles.form}>
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
                            placeholder="Create a password"
                            fullWidth
                        />
                    </InputGroup>

                    <InputGroup label="Confirm Password" htmlFor="confirmPassword" required>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirm your password"
                            fullWidth
                        />
                    </InputGroup>

                    <Button 
                        type="submit" 
                        variant="primary"
                        fullWidth
                        isLoading={loading}
                    >
                        Create Account
                    </Button>
                </form>

                <div className={styles.divider}>
                    <span>or</span>
                </div>

                <Button 
                    onClick={handleGoogleSignUp}
                    variant="secondary-subtle"
                    fullWidth
                    disabled={loading}
                    leftIcon={<img src="/google-icon.svg" alt="Google" className={styles.googleIcon} />}
                >
                    Sign up with Google
                </Button>

                <p className={styles.loginLink}>
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage; 