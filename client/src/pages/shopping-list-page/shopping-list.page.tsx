import React from 'react';
import styles from './shopping-list.page.module.css';
import Card from '../../components/card/Card';
import Button from '../../components/button/Button';
import { MdOutlineShoppingCart, MdAdd, MdCheck, MdList } from 'react-icons/md';

const ShoppingListPage: React.FC = () => {
  return (
    <div className={styles.shoppingListPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <MdOutlineShoppingCart size={32} className={styles.titleIcon} />
            <h1 className={styles.title}>Shopping List</h1>
          </div>
          <p className={styles.subtitle}>Manage your grocery shopping list</p>
        </div>

        <div className={styles.actions}>
          <Button variant="primary" leftIcon={<MdAdd size={20} />}>
            Add Item
          </Button>
          <Button variant="secondary" leftIcon={<MdCheck size={20} />}>
            Mark All Complete
          </Button>
          <Button variant="secondary" leftIcon={<MdList size={20} />}>
            Generate from Meals
          </Button>
        </div>

        <div className={styles.content}>
          <Card variant="elevated" padding="large">
            <div className={styles.comingSoon}>
              <MdOutlineShoppingCart size={64} className={styles.comingSoonIcon} />
              <h2>Shopping List Coming Soon!</h2>
              <p>We're working on an intelligent shopping list system to make grocery shopping easier.</p>
              <p>Features in development:</p>
              <ul>
                <li>Smart shopping lists</li>
                <li>Auto-generate from meal plans</li>
                <li>Ingredient categorization</li>
                <li>Store layout optimization</li>
                <li>Price tracking</li>
                <li>Sharing with family members</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListPage;