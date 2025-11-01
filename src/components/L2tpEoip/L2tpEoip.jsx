import { useState } from 'react'
import styles from './L2tpEoip.module.css'

// Імпорт зображень для блоку 1
import l2tp0Img from '../../assets/L2TP_Picture/l2tp-0.jpg'
import l2tp01Img from '../../assets/L2TP_Picture/l2tp-01.jpg'
import l2tp1Img from '../../assets/L2TP_Picture/l2tp-1.jpg'

function L2tpEoip({ onImageClick }) {
  const [openBlocks, setOpenBlocks] = useState([])

  const toggleBlock = (index) => {
    setOpenBlocks(prev => {
      if (prev.includes(index)) {
        return prev.filter(item => item !== index)
      } else {
        return [...prev, index]
      }
    })
  }

  const blocks = [
    {
      id: 1,
      title: 'Налаштування головного мікротіка',
      subtitle: 'L2TP Server',
      icon: '🖥️',
      color: '#667eea',
      content: true // Показує, що для цього блоку є контент
    },
    {
      id: 2,
      title: 'Налаштування польових мікротіків',
      subtitle: 'L2TP Client (2 сірих мікротіка)',
      icon: '📡',
      color: '#764ba2'
    },
    {
      id: 3,
      title: 'Налаштування EOIP від польових до штабного',
      subtitle: 'Підключення польових мікротіків до штабного',
      icon: '🔗',
      color: '#f093fb'
    },
    {
      id: 4,
      title: 'Налаштування EOIP між польовими',
      subtitle: 'Зв\'язок між польовими мікротіками',
      icon: '🌐',
      color: '#4facfe'
    },
    {
      id: 5,
      title: 'Налаштування віддаленого доступу ROMON',
      subtitle: 'ROMON від штабного до польових',
      icon: '🔌',
      color: '#43e97b'
    }
  ]

  const renderBlockContent = (block, index) => {
    // Якщо це перший блок (L2TP Server) - показуємо контент
    if (block.id === 1 && block.content) {
      return (
        <div className={styles.blockRealContent}>
          <h3 className={styles.contentTitle}>🔧 Налаштування L2TP Server (MikroTik)</h3>
          
          <div className={styles.instructionSection}>
            <p className={styles.instructionText}>
              Відкрий <strong>PPP → L2TP Server → General</strong>
            </p>
            
            <p className={styles.instructionText}>
              Установи такі параметри:
            </p>

            <ul className={styles.paramsList}>
              <li><strong>Enabled:</strong> yes</li>
              <li><strong>Protocol:</strong> all</li>
              <li><strong>Max MTU / MRU:</strong> 1450</li>
              <li><strong>Keepalive Timeout:</strong> 30</li>
              <li><strong>Default Profile:</strong> default-encryption</li>
              <li><strong>Authentication:</strong> mschap2, mschap1, chap, pap</li>
              <li><strong>Use IPsec:</strong> yes</li>
              <li><strong>IPsec Secret:</strong> ********</li>
              <li><strong>Caller ID Type:</strong> ip address</li>
              <li><strong>One Session Per Host:</strong> off</li>
              <li><strong>Allow Fast Path:</strong> off</li>
            </ul>

            <p className={styles.instructionText}>
              Натисни <strong>Apply → OK</strong>
            </p>
          </div>

          <div className={styles.screenshotNote}>
            <div className={styles.firstImageWrapper}>
              <img 
                src={l2tp0Img} 
                alt="L2TP Server налаштування - крок 0" 
                className={styles.screenshot} 
                onClick={() => onImageClick && onImageClick(l2tp0Img, "L2TP Server налаштування - крок 0")}
              />
            </div>
            <img 
              src={l2tp01Img} 
              alt="L2TP Server налаштування - крок 01" 
              className={styles.screenshot} 
              onClick={() => onImageClick && onImageClick(l2tp01Img, "L2TP Server налаштування - крок 01")}
            />
            <img 
              src={l2tp1Img} 
              alt="L2TP Server налаштування - крок 1" 
              className={styles.screenshot} 
              onClick={() => onImageClick && onImageClick(l2tp1Img, "L2TP Server налаштування - крок 1")}
            />
          </div>
        </div>
      )
    }

    // Для інших блоків - placeholder
    return (
      <div className={styles.blockPlaceholder}>
        <p className={styles.placeholderText}>
          📝 Інформацію буде додано пізніше
        </p>
        <div className={styles.placeholderSections}>
          <div className={styles.placeholderSection}>
            <span className={styles.placeholderSectionIcon}>⚙️</span>
            <span>Покрокові інструкції</span>
          </div>
          <div className={styles.placeholderSection}>
            <span className={styles.placeholderSectionIcon}>📋</span>
            <span>Команди RouterOS</span>
          </div>
          <div className={styles.placeholderSection}>
            <span className={styles.placeholderSectionIcon}>🖼️</span>
            <span>Скріншоти та схеми</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>🌐 IP Site (L2TP + EOIP)</h1>
      <p className={styles.subtitle}>
        Повна інструкція з налаштування IP Site з використанням L2TP та EOIP тунелів
      </p>

      <div className={styles.blocksContainer}>
        {blocks.map((block, index) => (
          <div 
            key={block.id} 
            className={`${styles.block} ${openBlocks.includes(index) ? styles.blockOpen : ''}`}
            style={{ '--block-color': block.color }}
          >
            <div 
              className={styles.blockHeader}
              onClick={() => toggleBlock(index)}
            >
              <div className={styles.blockHeaderLeft}>
                <span className={styles.blockIcon}>{block.icon}</span>
                <div className={styles.blockTitleWrapper}>
                  <h2 className={styles.blockTitle}>{block.title}</h2>
                  <p className={styles.blockSubtitle}>{block.subtitle}</p>
                </div>
              </div>
              <div className={styles.blockToggle}>
                <span className={`${styles.toggleIcon} ${openBlocks.includes(index) ? styles.toggleIconOpen : ''}`}>
                  ▼
                </span>
              </div>
            </div>

            <div className={`${styles.blockContent} ${openBlocks.includes(index) ? styles.blockContentOpen : ''}`}>
              {renderBlockContent(block, index)}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.infoNote}>
        <p>💡 <strong>Примітка:</strong> Всі блоки готові до наповнення. Детальна інформація буде додана пізніше.</p>
      </div>
    </section>
  )
}

export default L2tpEoip
