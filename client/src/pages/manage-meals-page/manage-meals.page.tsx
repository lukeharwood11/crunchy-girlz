import React from 'react';
import styles from './manage-meals.page.module.css';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import { MdOutlineRestaurantMenu, MdAdd, MdCalendarToday } from 'react-icons/md';

const ManageMealsPage: React.FC = () => {
  return (
    <div className={styles.manageMealsPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <MdOutlineRestaurantMenu size={32} className={styles.titleIcon} />
            <h1 className={styles.title}>Manage Meals</h1>
          </div>
          <p className={styles.subtitle}>Plan and organize your daily meals</p>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" leftIcon={<MdAdd size={20} />}>
            Create Meal Plan
          </Button>
          <Button variant="secondary" leftIcon={<MdCalendarToday size={20} />}>
            View Calendar
          </Button>
        </div>

        <div className={styles.content}>
          <Card variant="elevated" padding="large">
            <div className={styles.comingSoon}>
              <MdOutlineRestaurantMenu size={64} className={styles.comingSoonIcon} />
              <h2>Meal Planning Coming Soon!</h2>
              <p>We're working hard to bring you an amazing meal planning experience.</p>
              <p>Features in development:</p>
              <ul>
                <li>Weekly meal planning</li>
                <li>Meal calendar view</li>
                <li>Recipe integration</li>
                <li>Nutritional tracking</li>
                <li>Shopping list generation</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageMealsPage;