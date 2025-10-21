import { useState } from 'react'
import './App.css'

// Імпорт компонентів з нової структури папок
import MikroTikGeneral from './components/MikroTikGeneral/MikroTikGeneral'
import BasicSettings from './components/BasicSettings/BasicSettings'
import AdditionalSettings1 from './components/AdditionalSettings1/AdditionalSettings1'
import Backup from './components/Backup/Backup'
import SecuritySettings from './components/SecuritySettings/SecuritySettings'

function App() {
  const [currentPage, setCurrentPage] = useState('general')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [globalModalImage, setGlobalModalImage] = useState(null)
  
  const handlePageChange = (page) => {
    setCurrentPage(page)
    setIsMobileMenuOpen(false) // Закриваємо мобільне меню при виборі сторінки
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Плавний скрол до верху сторінки
  }

  const openGlobalImageModal = (imageSrc, imageAlt) => {
    document.body.style.overflow = 'hidden'
    setGlobalModalImage({ src: imageSrc, alt: imageAlt })
  }

  const closeGlobalImageModal = () => {
    document.body.style.overflow = 'auto'
    setGlobalModalImage(null)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'general':
        return <MikroTikGeneral />
             case 'basic':
               return <BasicSettings onImageClick={openGlobalImageModal} />
      case 'additional1':
        return <AdditionalSettings1 />
      case 'backup':
        return <Backup onImageClick={openGlobalImageModal} />
      case 'security':
        return <SecuritySettings />
      default:
        return <MikroTikGeneral />
    }
  }

  return (
    <div className="app">
      <nav className="navigation">
        <div className="nav-brand">
          <h2>🖥️ MikroTik Довідник</h2>
        </div>
        
        {/* Бургер кнопка для мобільних пристроїв */}
        <button 
          className="burger-menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`burger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`burger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
          <span className={`burger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
        </button>
        
        <div className="nav-links">
          <button 
            className={`nav-link ${currentPage === 'general' ? 'active' : ''}`}
            onClick={() => handlePageChange('general')}
          >
            📋 Загальні положення
          </button>
          <button 
            className={`nav-link ${currentPage === 'basic' ? 'active' : ''}`}
            onClick={() => handlePageChange('basic')}
          >
            ⚙️ Базові налаштування
          </button>
          
          <button 
            className={`nav-link ${currentPage === 'backup' ? 'active' : ''}`}
            onClick={() => handlePageChange('backup')}
          >
            🔌 Резервне підключення
          </button>
          
          <button 
            className={`nav-link ${currentPage === 'security' ? 'active' : ''}`}
            onClick={() => handlePageChange('security')}
          >
            🔐 Налаштування захисту
          </button>
          
          
          <button 
            className={`nav-link ${currentPage === 'additional1' ? 'active' : ''}`}
            onClick={() => handlePageChange('additional1')}
          >
            🔒 Додаткові налаштування
          </button>
        </div>
      </nav>
      
      {/* Мобільне меню */}
      <div 
        className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className="mobile-menu-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className={`mobile-nav-link ${currentPage === 'general' ? 'active' : ''}`}
            onClick={() => handlePageChange('general')}
          >
            📋 Загальні положення
          </button>
          <button 
            className={`mobile-nav-link ${currentPage === 'basic' ? 'active' : ''}`}
            onClick={() => handlePageChange('basic')}
          >
            ⚙️ Базові налаштування
          </button>
          <button 
            className={`mobile-nav-link ${currentPage === 'backup' ? 'active' : ''}`}
            onClick={() => handlePageChange('backup')}
          >
            🔌 Резервне підключення
          </button>
          <button 
            className={`mobile-nav-link ${currentPage === 'security' ? 'active' : ''}`}
            onClick={() => handlePageChange('security')}
          >
            🔐 Налаштування захисту
          </button>
          <button 
            className={`mobile-nav-link ${currentPage === 'additional1' ? 'active' : ''}`}
            onClick={() => handlePageChange('additional1')}
          >
            🔒 Додаткові налаштування
          </button>
        </div>
      </div>
      
      <main className="main-content">
        {renderPage()}
      </main>

      {/* Глобальне модальне вікно для зображень */}
      {globalModalImage && (
        <div className="global-image-modal" onClick={closeGlobalImageModal}>
          <div 
            className="global-modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <button className="global-close-button" onClick={closeGlobalImageModal}>×</button>
            <img 
              src={globalModalImage.src} 
              alt={globalModalImage.alt} 
              className="global-modal-image" 
            />
            <p className="global-modal-caption">{globalModalImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
