import React from 'react';
import styles from './search-recipes.page.module.css';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { MdOutlineSearch, MdFilterList, MdTrendingUp } from 'react-icons/md';

const SearchRecipesPage: React.FC = () => {
  return (
    <div className={styles.searchRecipesPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <MdOutlineSearch size={32} className={styles.titleIcon} />
            <h1 className={styles.title}>Search for Recipes</h1>
          </div>
          <p className={styles.subtitle}>Discover new recipes and cooking ideas</p>
        </div>

        <div className={styles.searchSection}>
          <div className={styles.searchBar}>
            <Input
              type="text"
              placeholder="Search for recipes, ingredients, or cuisines..."
              leftIcon={<MdOutlineSearch size={20} />}
              size="large"
              fullWidth
            />
            <Button variant="primary" leftIcon={<MdFilterList size={20} />}>
              Filters
            </Button>
          </div>
        </div>

        <div className={styles.content}>
          <Card variant="elevated" padding="large">
            <div className={styles.comingSoon}>
              <MdOutlineSearch size={64} className={styles.comingSoonIcon} />
              <h2>Recipe Search Coming Soon!</h2>
              <p>We're building a powerful search engine to help you find the perfect recipes.</p>
              <p>Features in development:</p>
              <ul>
                <li>Advanced recipe search</li>
                <li>Filter by ingredients</li>
                <li>Dietary restriction filters</li>
                <li>Cuisine type browsing</li>
                <li>Popular and trending recipes</li>
                <li>AI-powered recommendations</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SearchRecipesPage;