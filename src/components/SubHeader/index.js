import styles from './index.less';

export default function SubHeader(props) {
  return (
    <div className={`${props.className} ${styles.subHeaderWrap}`}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.rightContent}>{props.children}</div>
    </div>
  );
}
