import { useState, useEffect } from 'react'
import styles from './Header.module.css'

const Header = ({ currentPage, onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [rotatingText, setRotatingText] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isFadingIn, setIsFadingIn] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const rotatingWords = ['RouterOS', 'L2TP', 'EOIP', 'IPsec', 'Firewall', 'NAT']
  
  const pageNames = {
    'general': 'Загальні положення',
    'basic': 'Базові налаштування',
    'backup': 'Резервне підключення',
    'security': 'Налаштування захисту',
    'scripts': 'Скрипти',
    'l2tp_eoip': 'L2TP + EOIP'
  }
  
  // Визначаємо мобільну версію
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Ротація тексту тільки на десктопі
  useEffect(() => {
    if (isMobile) return
    
    const interval = setInterval(() => {
      setIsFadingOut(true)
      setIsFadingIn(false)
      setTimeout(() => {
        setRotatingText((prev) => (prev + 1) % rotatingWords.length)
        setIsFadingOut(false)
        setIsFadingIn(true)
        setTimeout(() => {
          setIsFadingIn(false)
        }, 1000)
      }, 800)
    }, 10000)
    
    return () => clearInterval(interval)
  }, [rotatingWords.length, isMobile])

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
          <h2
            className={styles.brandTitle}
            onClick={() => handlePageChange('general')}
          >
            <div className={styles.brandTitleContainer}>
              <span className={styles.brandTitleWrapper}>
                🖥️ MikroTik
              </span>
              {isMobile ? (
                <span className={styles.currentPageText}>
                  {pageNames[currentPage] || 'Загальні положення'}
                </span>
              ) : (
                <span 
                  className={`${styles.rotatingText} ${isFadingOut ? styles.fadeOut : ''} ${isFadingIn ? styles.fadeIn : ''}`}
                  key={rotatingText}
                >
                  {rotatingWords[rotatingText]}
                </span>
              )}
            </div>
          </h2>
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
          <button
            className={`${styles.navLink} ${currentPage === 'l2tp_eoip' ? styles.active : ''}`}
            onClick={() => handlePageChange('l2tp_eoip')}
          >
            🔗 L2TP + EOIP
          </button>
        </div>
        
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
      </nav>

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
              <button
                className={`${styles.mobileNavLink} ${currentPage === 'l2tp_eoip' ? styles.active : ''}`}
                onClick={() => handlePageChange('l2tp_eoip')}
              >
                🔗 L2TP + EOIP
              </button>
            </div>
          </div>
        </div>
    </>
  )
}

export default Header
