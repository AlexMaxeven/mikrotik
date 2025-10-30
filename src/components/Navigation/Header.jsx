import { useState } from 'react'
import styles from './Header.module.css'

const Header = ({ currentPage, onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handlePageChange = (page) => {
    onPageChange(page)
    setIsMobileMenuOpen(false)
    document.body.style.overflow = 'auto'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen
    setIsMobileMenuOpen(newState)
    
    // Блокуємо скрол сторінки коли меню відкрите
    if (newState) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  const closeMobileMenu = (e) => {
    if (e.target === e.currentTarget) {
      setIsMobileMenuOpen(false)
      document.body.style.overflow = 'auto'
    }
  }

  return (
    <>
      {/* Десктопна навігація */}
      <nav className={styles.navigation}>
        <div className={styles.navBrand}>
          <h2>🖥️ MikroTik Довідник</h2>
        </div>
        <div className={styles.navLinks}>
          <button
            className={`${styles.navLink} ${currentPage === 'general' ? styles.active : ''}`}
            onClick={() => handlePageChange('general')}
          >
            📋 Загальні положення
          </button>
          <button
            className={`${styles.navLink} ${currentPage === 'basic' ? styles.active : ''}`}
            onClick={() => handlePageChange('basic')}
          >
            ⚙️ Базові налаштування
          </button>
          <button
            className={`${styles.navLink} ${currentPage === 'additional1' ? styles.active : ''}`}
            onClick={() => handlePageChange('additional1')}
          >
            🔧 Додаткові налаштування
          </button>
          <button
            className={`${styles.navLink} ${currentPage === 'backup' ? styles.active : ''}`}
            onClick={() => handlePageChange('backup')}
          >
            🔄 Резервне підключення
          </button>
          <button
            className={`${styles.navLink} ${currentPage === 'security' ? styles.active : ''}`}
            onClick={() => handlePageChange('security')}
          >
            🛡️ Налаштування захисту
          </button>
          <button
            className={`${styles.navLink} ${currentPage === 'scripts' ? styles.active : ''}`}
            onClick={() => handlePageChange('scripts')}
          >
            📜 Скрипти
          </button>
        </div>
      </nav>

      {/* Бургер меню */}
      <button
        className={styles.burgerMenu}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <div className={`${styles.burgerLine} ${isMobileMenuOpen ? styles.open : ''}`}></div>
        <div className={`${styles.burgerLine} ${isMobileMenuOpen ? styles.open : ''}`}></div>
        <div className={`${styles.burgerLine} ${isMobileMenuOpen ? styles.open : ''}`}></div>
      </button>

      {/* Мобільне меню */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.open : ''}`} onClick={closeMobileMenu}>
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuContent}>
              <button
                className={`${styles.mobileNavLink} ${currentPage === 'general' ? styles.active : ''}`}
                onClick={() => handlePageChange('general')}
              >
                📋 Загальні положення
              </button>
              <button
                className={`${styles.mobileNavLink} ${currentPage === 'basic' ? styles.active : ''}`}
                onClick={() => handlePageChange('basic')}
              >
                ⚙️ Базові налаштування
              </button>
              <button
                className={`${styles.mobileNavLink} ${currentPage === 'additional1' ? styles.active : ''}`}
                onClick={() => handlePageChange('additional1')}
              >
                🔧 Додаткові налаштування
              </button>
              <button
                className={`${styles.mobileNavLink} ${currentPage === 'backup' ? styles.active : ''}`}
                onClick={() => handlePageChange('backup')}
              >
                🔄 Резервне підключення
              </button>
              <button
                className={`${styles.mobileNavLink} ${currentPage === 'security' ? styles.active : ''}`}
                onClick={() => handlePageChange('security')}
              >
                🛡️ Налаштування захисту
              </button>
              <button
                className={`${styles.mobileNavLink} ${currentPage === 'scripts' ? styles.active : ''}`}
                onClick={() => handlePageChange('scripts')}
              >
                📜 Скрипти
              </button>
            </div>
          </div>
        </div>
    </>
  )
}

export default Header
