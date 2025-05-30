import { useNavigate } from 'react-router-dom';
import styles from './home.page.module.css';
import Card from '../../components/card/Card';
import { routes } from '../../App';
import { MdOutlineFoodBank, MdOutlineRestaurantMenu, MdOutlineSearch, MdOutlineShoppingCart } from 'react-icons/md';

const HomePage = () => {
    const navigate = useNavigate();
    
    const menuOptions = [
        {
            title: 'Manage Meals',
            description: 'Plan and organize your daily meals',
            icon: <MdOutlineRestaurantMenu size={48} />,
            color: 'green',
            onClick: () => navigate(routes.manageMeals)
        },
        {
            title: 'Manage Recipes',
            description: 'Create and edit your favorite recipes',
            icon: <MdOutlineFoodBank size={48} />,
            color: 'pink',
            onClick: () => navigate(routes.manageRecipes)
        },
        {
            title: 'Search for Recipes',
            description: 'Discover new recipes and cooking ideas',
            icon: <MdOutlineSearch size={48} />,
            color: 'green',
            onClick: () => navigate(routes.searchRecipes)
        },
        {
            title: 'Shopping List',
            description: 'Manage your grocery shopping list',
            icon: <MdOutlineShoppingCart size={48} />,
            color: 'pink',
            onClick: () => navigate(routes.shoppingList)
        }
    ];

    return (
        <div className={styles.homePage}>
            <div className={styles.container}>
                <h1 className={styles.title}>Welcome to Crunchy Girlz</h1>
                <p className={styles.subtitle}>Your ultimate meal planning and recipe companion</p>
                
                <div className={styles.menuGrid}>
                    {menuOptions.map((option, index) => (
                        <Card
                            key={index}
                            variant="elevated"
                            padding="large"
                            onClick={option.onClick}
                            hoverable
                            className={`${styles.menuCard} ${styles[option.color]}`}
                        >
                            <div className={styles.cardContent}>
                                <div className={styles.iconContainer}>
                                    {option.icon}
                                </div>
                                <h3 className={styles.cardTitle}>{option.title}</h3>
                                <p className={styles.cardDescription}>{option.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;