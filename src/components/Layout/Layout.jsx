import Header from '../Navigation/Header'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import styles from './Layout.module.css'

const Layout = ({ children, currentPage, onPageChange }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.contentContainer}>
        <Header currentPage={currentPage} onPageChange={onPageChange} />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
      <ScrollToTop />
    </div>
  )
}

export default Layout
