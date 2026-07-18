import styles from './feed.module.css';

export const FeedPage = (): React.JSX.Element => {
  return (
    <main className={styles.page}>
      <p className={`${styles.stub} text text_type_main-medium`}>
        Страница ленты заказов находится в разработке
      </p>
    </main>
  );
};
