import styles from './home.page.module.css';
import NavBar from '../../components/nav-bar/NavBar';

const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <NavBar />
        </div>
    );
};

export default HomePage;