import React from 'react';
import styles from './manage-recipes.page.module.css';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import { MdOutlineFoodBank, MdAdd, MdEdit, MdFolder } from 'react-icons/md';

const ManageRecipesPage: React.FC = () => {
  return (
    <div className={styles.manageRecipesPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <MdOutlineFoodBank size={32} className={styles.titleIcon} />
            <h1 className={styles.title}>Manage Recipes</h1>
          </div>
          <p className={styles.subtitle}>Create and edit your favorite recipes</p>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" leftIcon={<MdAdd size={20} />}>
            Create Recipe
          </Button>
          <Button variant="secondary" leftIcon={<MdEdit size={20} />}>
            Edit Recipe
          </Button>
          <Button variant="secondary" leftIcon={<MdFolder size={20} />}>
            Organize Recipes
          </Button>
        </div>

        <div className={styles.content}>
          <Card variant="elevated" padding="large">
            <div className={styles.comingSoon}>
              <MdOutlineFoodBank size={64} className={styles.comingSoonIcon} />
              <h2>Recipe Management Coming Soon!</h2>
              <p>We're cooking up an amazing recipe management system for you.</p>
              <p>Features in development:</p>
              <ul>
                <li>Recipe creation and editing</li>
                <li>Photo upload for recipes</li>
                <li>Ingredient management</li>
                <li>Recipe categorization</li>
                <li>Nutritional information</li>
                <li>Recipe sharing</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageRecipesPage;