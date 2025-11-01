import { useState } from 'react'
import styles from './L2tpEoip.module.css'

function L2tpEoip() {
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
      color: '#667eea'
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
