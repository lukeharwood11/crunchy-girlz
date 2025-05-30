import { useAuth } from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { useEffect, useState } from 'react';
import styles from './profile.page.module.css';
import Image from '../../components/image';
import Card from '../../components/card';
import Skeleton, { SkeletonText } from '../../components/skeleton';

const ProfilePage = () => {
    const { 
        user, 
        loading,
    } = useAuth();

    useEffect(() => {
        console.log(user);
    }, [user]);

    if (loading) {
        return (
            <div className={styles.container}>
                <Card variant='elevated'>
                    <div className={styles.profileHeader}>
                        <div className={styles.avatarSection}>
                            <Skeleton variant="circle" size="large" />
                        </div>
                        <div className={styles.profileInfo}>
                            <SkeletonText lines={1} size="large" width="200px" />
                            <SkeletonText lines={1} size="medium" width="250px" />
                            <SkeletonText lines={1} size="small" width="180px" />
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    if (!user) {
        return <div className={styles.error}>User not found</div>;
    }

    return (
        <div className={styles.container}>
            <Card variant='outlined'>
                <div className={styles.profileHeader}>
                    <div className={styles.avatarSection}>
                        <Image src={user?.user_metadata.avatar_url} alt="Profile" />
                    </div>
                    <div className={styles.profileInfo}>
                        <h1 className={styles.name}>{user?.user_metadata.full_name || 'Anonymous User'}</h1>
                        <p className={styles.email}>{user?.email}</p>
                        <p className={styles.memberSince}>
                            Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProfilePage;