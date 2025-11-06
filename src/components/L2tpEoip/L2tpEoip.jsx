import { useState } from 'react'
import styles from './L2tpEoip.module.css'

// Імпорт зображень для блоку 1
import l2tp0Img from '../../assets/L2TP_Picture/l2tp-0.jpg'
import l2tp01Img from '../../assets/L2TP_Picture/l2tp-01.jpg'
import l2tp1Img from '../../assets/L2TP_Picture/l2tp-1.jpg'
import l2tp11Img from '../../assets/L2TP_Picture/l2tp-1.1.jpg'
import l2tp12Img from '../../assets/L2TP_Picture/l2tp-1.2.jpg'
import l2tp13Img from '../../assets/L2TP_Picture/l2tp-1.3.jpg'

// Імпорт зображень для блоку 2
import l2tp2Img from '../../assets/L2TP_Picture/l2tp-2.jpg'
import l2tp3Img from '../../assets/L2TP_Picture/l2tp-3.jpg'

// Імпорт зображень для блоку 3
import l2tp4Img from '../../assets/L2TP_Picture/l2tp-4.jpg'
import l2tp5Img from '../../assets/L2TP_Picture/l2tp5.jpg'
import l2tp6Img from '../../assets/L2TP_Picture/l2tp-6.jpg'

// Імпорт зображень для блоку 4
import l2tp9Img from '../../assets/L2TP_Picture/l2tp-9.jpg'
import l2tp10Img from '../../assets/L2TP_Picture/l2tp-10.jpg'

// Імпорт зображень для блоку 5
import l2tp7Img from '../../assets/L2TP_Picture/l2tp-7.jpg'
import l2tp8Img from '../../assets/L2TP_Picture/l2tp-8.jpg'

// Імпорт зображень для додаткового блоку
import l2tpDop1Img from '../../assets/L2TP_Picture/l2tp-dop1.jpg'
import l2tpDop2Img from '../../assets/L2TP_Picture/l2tp-dop2.jpg'
import l2tpDop3Img from '../../assets/L2TP_Picture/l2tp-dop3.jpg'
import l2tpDop4Img from '../../assets/L2TP_Picture/l2tp-dop4.jpg'
import l2tpDop5Img from '../../assets/L2TP_Picture/l2tp-dop5.jpg'

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
      color: '#764ba2',
      content: true // Показує, що для цього блоку є контент
    },
    {
      id: 3,
      title: 'Налаштування EOIP від польових до штабного',
      subtitle: 'Підключення польових мікротіків до штабного',
      icon: '🔗',
      color: '#f093fb',
      content: true // Показує, що для цього блоку є контент
    },
    {
      id: 4,
      title: 'Налаштування EOIP між польовими',
      subtitle: 'Зв\'язок між польовими мікротіками',
      icon: '🌐',
      color: '#4facfe',
      content: true // Показує, що для цього блоку є контент
    },
    {
      id: 5,
      title: 'Налаштування віддаленого доступу ROMON',
      subtitle: 'ROMON від штабного до польових',
      icon: '🔌',
      color: '#43e97b',
      content: true // Показує, що для цього блоку є контент
    },
    {
      id: 6,
      title: 'Додаткова інформація',
      subtitle: 'Корисні матеріали та додаткові налаштування',
      icon: '📚',
      color: '#fa709a',
      content: true // Показує, що для цього блоку є контент
    }
  ]

  const renderBlockContent = (block, index) => {
    // Якщо це перший блок (L2TP Server) - показуємо контент
    if (block.id === 1 && block.content) {
      return (
        <div className={styles.blockRealContent}>
          <h3 className={styles.contentTitle}>🔧 Налаштування L2TP Server (MikroTik)</h3>
          
          <div className={styles.instructionSection}>
            <h4 className={styles.etapTitle}>Етап 1: Налаштування L2TP Server</h4>
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

          <div className={styles.instructionSection}>
            <h4 className={styles.etapTitle}>Етап 2: Додати IP Pools</h4>
            <p className={styles.instructionText}>
              Створи IP Pool для розподілу адрес клієнтам L2TP
            </p>
          </div>

          <div className={styles.instructionSection}>
            <h4 className={styles.etapTitle}>Етап 3: Створення профіля L2TP</h4>
            <p className={styles.instructionText}>
              Створи профіль для L2TP клієнтів з необхідними налаштуваннями
            </p>
          </div>

          <div className={styles.instructionSection}>
            <h4 className={styles.etapTitle}>Етап 4: Створення Secrets</h4>
            <p className={styles.instructionText}>
              Створи Secrets для автентифікації L2TP клієнтів
            </p>
          </div>

          <div className={styles.screenshotGallery}>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tp0Img, "L2TP Server налаштування - крок 0")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tp0Img} 
                  alt="L2TP Server налаштування - крок 0" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tp01Img, "L2TP Server налаштування - крок 01")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tp01Img} 
                  alt="L2TP Server налаштування - крок 01" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tp1Img, "L2TP Server налаштування - крок 1")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tp1Img} 
                  alt="L2TP Server налаштування - крок 1" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tp11Img, "L2TP Server - IP Pools (крок 1.1)")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tp11Img} 
                  alt="L2TP Server - IP Pools (крок 1.1)" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tp12Img, "L2TP Server - Створення профіля (крок 1.2)")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tp12Img} 
                  alt="L2TP Server - Створення профіля (крок 1.2)" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tp13Img, "L2TP Server - Створення Secrets (крок 1.3)")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tp13Img} 
                  alt="L2TP Server - Створення Secrets (крок 1.3)" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Якщо це другий блок (L2TP Client) - показуємо контент
    if (block.id === 2 && block.content) {
      return (
        <div className={styles.blockRealContent}>
          <h3 className={styles.contentTitle}>📡 Налаштування L2TP Client (Польові мікротіки)</h3>
          
          <div className={styles.instructionSection}>
            <ol className={styles.stepList}>
              <li>Заходимо в <strong>PPP</strong></li>
              <li>Вибираємо створити новий <strong>L2TP Client</strong></li>
              <li>В поле <strong>Connect to</strong> вносимо адрес (IP) нашого головного мікротіку, до якого буде маршрутизуватися з'єднання</li>
              <li>Вносимо дані взяті з <strong>Secret</strong> на основному мікротіку (що має статичну IP)</li>
            </ol>
          </div>

          <div className={styles.screenshotGallery}>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tp2Img, "L2TP Client налаштування - крок 2")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tp2Img} 
                  alt="L2TP Client налаштування - крок 2" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tp3Img, "L2TP Client налаштування - крок 3")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tp3Img} 
                  alt="L2TP Client налаштування - крок 3" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Якщо це третій блок (EOIP від польових до штабного) - показуємо контент
    if (block.id === 3 && block.content) {
      return (
        <div className={styles.blockRealContent}>
          <h3 className={styles.contentTitle}>🔗 Налаштування EOIP від польових до штабного</h3>
          
          <div className={styles.instructionSection}>
            <h4 className={styles.etapTitle}>Налаштування на польовому мікротіку</h4>
            <ol className={styles.stepList}>
              <li>Створення EOIP - на <strong>Interface</strong> вибираємо <strong>New</strong> та вибираємо <strong>EOIP</strong></li>
            </ol>
          </div>

          <div className={styles.instructionSection}>
            <h4 className={styles.etapTitle}>Налаштування на головному (штабному) мікротіку</h4>
            <ol className={styles.stepList}>
              <li>Така ж процедура на головному (штабному) - лише місцями міняємо <strong>Local</strong> та <strong>Remote address</strong></li>
            </ol>
          </div>

          <div className={styles.screenshotGallery}>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tp4Img, "EOIP налаштування - крок 4")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tp4Img} 
                  alt="EOIP налаштування - крок 4" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tp5Img, "EOIP налаштування - крок 5")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tp5Img} 
                  alt="EOIP налаштування - крок 5" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tp6Img, "EOIP налаштування - крок 6")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tp6Img} 
                  alt="EOIP налаштування - крок 6" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Якщо це четвертий блок (EOIP між польовими) - показуємо контент
    if (block.id === 4 && block.content) {
      return (
        <div className={styles.blockRealContent}>
          <h3 className={styles.contentTitle}>🌐 Налаштування EOIP між польовими</h3>
          
          <div className={styles.instructionSection}>
            <h4 className={styles.etapTitle}>Налаштування EOIP між польовими мікротіками</h4>
            <ol className={styles.stepList}>
              <li>Аналогічно як і з головним, що в попередньому блоці, але вказуємо IP польових</li>
            </ol>
          </div>

          <div className={styles.screenshotGallery}>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tp9Img, "EOIP між польовими - крок 9")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tp9Img} 
                  alt="EOIP між польовими - крок 9" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tp10Img, "EOIP між польовими - крок 10")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tp10Img} 
                  alt="EOIP між польовими - крок 10" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Якщо це п'ятий блок (ROMON) - показуємо контент
    if (block.id === 5 && block.content) {
      return (
        <div className={styles.blockRealContent}>
          <h3 className={styles.contentTitle}>🔌 Налаштування віддаленого доступу ROMON</h3>
          
          <div className={styles.instructionSection}>
            <h4 className={styles.etapTitle}>Налаштування на штабному мікротіку</h4>
            <ol className={styles.stepList}>
              <li>Заходимо в <strong>Tools</strong>, далі в <strong>ROMON</strong></li>
              <li>Там вказуємо свій <strong>Secret</strong> ключ</li>
              <li>Він має бути однаковим на всіх пристроях, що з'єднані між собою</li>
            </ol>
          </div>

          <div className={styles.instructionSection}>
            <h4 className={styles.etapTitle}>Налаштування на польовому мікротіку</h4>
            <ol className={styles.stepList}>
              <li>Далі робимо теж саме, але вже на польовому мікротіку</li>
              <li>Головне, щоб той же <strong>Secret</strong> був</li>
            </ol>
          </div>

          <div className={styles.instructionSection}>
            <h4 className={styles.etapTitle}>Підключення до ROMON</h4>
            <ol className={styles.stepList}>
              <li>Заходимо на штабний мікротік - вводимо статичний IP головного, натискаємо на <strong>Connect to ROMON</strong></li>
              <li>Далі з'являться всі мікротіки, які підключені до головного</li>
            </ol>
          </div>

          <div className={styles.screenshotGallery}>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tp7Img, "ROMON налаштування - крок 7")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tp7Img} 
                  alt="ROMON налаштування - крок 7" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tp8Img, "ROMON підключення - крок 8")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tp8Img} 
                  alt="ROMON підключення - крок 8" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Якщо це шостий блок (Додаткова інформація) - показуємо контент
    if (block.id === 6 && block.content) {
      return (
        <div className={styles.blockRealContent}>
          <h3 className={styles.contentTitle}>📚 Додаткова інформація</h3>
          
          <div className={styles.instructionSection}>
            <p className={styles.instructionText}>
              Корисні матеріали та додаткові налаштування для роботи з L2TP та EOIP
            </p>
          </div>

          <div className={styles.screenshotGallery}>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tpDop1Img, "Додаткова інформація - зображення 1")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tpDop1Img} 
                  alt="Додаткова інформація - зображення 1" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tpDop2Img, "Додаткова інформація - зображення 2")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tpDop2Img} 
                  alt="Додаткова інформація - зображення 2" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tpDop3Img, "Додаткова інформація - зображення 3")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tpDop3Img} 
                  alt="Додаткова інформація - зображення 3" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tpDop4Img, "Додаткова інформація - зображення 4")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tpDop4Img} 
                  alt="Додаткова інформація - зображення 4" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
            <div 
              className={styles.galleryItem}
              onClick={() => onImageClick && onImageClick(l2tpDop5Img, "Додаткова інформація - зображення 5")}
            >
              <div className={styles.galleryThumbnail}>
                <img 
                  src={l2tpDop5Img} 
                  alt="Додаткова інформація - зображення 5" 
                  className={styles.galleryImage}
                />
                <div className={styles.galleryOverlay}>
                  <span className={styles.galleryIcon}>🔍</span>
                  <span className={styles.galleryText}>Натисніть для перегляду</span>
                </div>
              </div>
            </div>
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

      
    </section>
  )
}

export default L2tpEoip
