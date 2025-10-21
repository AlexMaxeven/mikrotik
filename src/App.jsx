import { useState } from 'react'
import './App.css'

// Імпорт компонентів з нової структури папок
import MikroTikGeneral from './components/MikroTikGeneral/MikroTikGeneral'
import BasicSettings from './components/BasicSettings/BasicSettings'
import AdditionalSettings1 from './components/AdditionalSettings1/AdditionalSettings1'
import Backup from './components/Backup/Backup'
import SecuritySettings from './components/SecuritySettings/SecuritySettings'
import Scripts from './components/Scripts/Scripts'

// Імпорт нових компонентів
import Layout from './components/Layout/Layout'

function App() {
  const [currentPage, setCurrentPage] = useState('general')
  const [globalModalImage, setGlobalModalImage] = useState(null)
  
  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
      case 'scripts':
        return <Scripts />
      default:
        return <MikroTikGeneral />
    }
  }

  return (
    <div className="app">
      <Layout currentPage={currentPage} onPageChange={handlePageChange}>
        {renderPage()}
      </Layout>

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
