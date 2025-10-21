import Header from '../Navigation/Header'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import styles from './Layout.module.css'

const Layout = ({ children, currentPage, onPageChange }) => {
  return (
    <div className={styles.layout}>
      <Header currentPage={currentPage} onPageChange={onPageChange} />
      <main className={styles.mainContent}>
        {children}
      </main>
      <ScrollToTop />
    </div>
  )
}

export default Layout
