import { useState, useRef, useEffect } from 'react'
import styles from './Backup.module.css'

// Імпорт зображень для резервного підключення
import dhcp1Img from '../../assets/Reserve_connect/dhcp1.jpg'
import dhcp2Img from '../../assets/Reserve_connect/dhcp2.jpg'
import dhcp3Img from '../../assets/Reserve_connect/dhcp3.jpg'
import addressImg from '../../assets/Reserve_connect/address.jpg'
import natImg from '../../assets/Reserve_connect/nat.jpg'
import route1Img from '../../assets/Reserve_connect/route1.jpg'
import route2Img from '../../assets/Reserve_connect/route2.jpg'
import route3Img from '../../assets/Reserve_connect/route3.jpg'

function Backup({ onImageClick }) {
  const [openAccordions, setOpenAccordions] = useState([])
  const [isSticky, setIsSticky] = useState(false)
  const guideRef = useRef(null)
  const buttonRef = useRef(null)

  const toggleAccordion = (index) => {
    // Якщо натиснули на вже відкритий - закриваємо
    // Якщо натиснули на закритий - відкриваємо (не закриваємо інші)
    setOpenAccordions(prev => {
      if (prev.includes(index)) {
        // Видаляємо з масиву (закриваємо)
        return prev.filter(item => item !== index)
      } else {
        // Додаємо до масиву (відкриваємо)
        return [...prev, index]
      }
    })
  }

  const scrollToGuide = () => {
    guideRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }


  useEffect(() => {
    const handleScroll = () => {
      if (guideRef.current && buttonRef.current) {
        const guideTop = guideRef.current.offsetTop
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const buttonBottom = buttonRef.current.offsetTop + buttonRef.current.offsetHeight
        
        // Якщо кнопка досягає початку гіду - приховуємо її
        if (buttonBottom >= guideTop) {
          setIsSticky(false)
          // Додаємо клас для приховування
          if (buttonRef.current) {
            buttonRef.current.style.opacity = '0'
            buttonRef.current.style.transform = 'translateY(-20px)'
            buttonRef.current.style.pointerEvents = 'none'
          }
        } else {
          setIsSticky(true)
          // Показуємо кнопку знову
          if (buttonRef.current) {
            buttonRef.current.style.opacity = '1'
            buttonRef.current.style.transform = 'translateY(0)'
            buttonRef.current.style.pointerEvents = 'auto'
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Викликаємо одразу для початкового стану

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <div className={styles.page}>
      <h1 className={styles.title}>🔌 Резервне підключення декількох провайдерів</h1>
      <p className={styles.description}>
        Налаштування резервного підключення до MikroTik з кількома провайдерами:
      </p>
      
      {/* Кнопка для прокрутки до гіду */}
      <div 
        ref={buttonRef}
        className={`${styles.scrollButtonContainer} ${isSticky ? styles.sticky : ''}`}
      >
        <button className={styles.scrollButton} onClick={scrollToGuide}>
          📌 Резервне налаштування для 2+ провайдерів
        </button>
      </div>
      
      <div className={styles.settingsGrid}>
        <div className={styles.settingsCategory}>
          <h3 className={styles.categoryTitle}>🔧 Початкові налаштування</h3>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🔐</span>
              <div className={styles.settingContent}>
                <strong>Базові налаштування</strong>
                <p>Необхідно підключити базові налаштування на 1 провайдера, потім підключити інші, резервні</p>
              </div>
            </div>
              <div className={styles.settingItem}>
               <span className={styles.settingIcon}>🌉</span>
               <div className={styles.settingContent}>
                 <strong>Bridge налаштування</strong>
                 <p>Бажано в Bridge не додавати ті порти що будуть використовуватись під провайдерів. Якщо вони вже є в Bridge - обов'язково видалити їх звідти!</p>
               </div>
             </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🌐</span>
              <div className={styles.settingContent}>
                <strong>DHCP Client</strong>
                <p>Додаємо ether2 та інші порти з провайдерами. Default Route Distance - виставляємо по пріоритету</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Новий розділ з детальним гідом */}
      <div className={styles.detailedGuide} ref={guideRef}>
        <h2 className={styles.guideTitle}>📌 Резервне налаштування для 2+ провайдерів</h2>
        
        <div className={styles.accordionContainer}>
          {/* Етап 1 */}
          <div className={`${styles.accordionItem} ${openAccordions.includes(0) ? styles.active : ''}`}>
            <div className={styles.accordionHeader} onClick={() => toggleAccordion(0)}>
              <h3 className={styles.accordionTitle}>Етап 1. DHCP Client для резервних провайдерів</h3>
              <span className={styles.accordionIcon}>▼</span>
            </div>
            <div className={styles.accordionContent}>
              <ol className={styles.stepList}>
                <li>У WinBox перейди в <strong>IP &rarr; DHCP Client</strong></li>
                <li>Натисни <strong>New</strong> для додавання нового провайдера</li>
                <li>У полі <strong>Interface</strong> вибери <strong>ether2</strong> (або інший порт для провайдера)</li>
                <li>Переконайся що <strong>Enabled</strong> відмічено</li>
                <li>Переконайся що <strong>Use Peer DNS</strong> відмічено</li>
                <li>Переконайся що <strong>Use Peer NTP</strong> відмічено</li>
                <li>У полі <strong>Add Default Route</strong> встанови <strong>yes</strong></li>
                <li>У полі <strong>Default Route Distance</strong> встанови <strong>2</strong> (для 2-го провайдера)</li>
                <li>У полі <strong>Check Gateway</strong> встанови <strong>ping</strong> (⚠️ <strong>Важливо:</strong> це потрібно для ВСІХ провайдерів - і для першого, і для резервних!)</li>
                <li>Натисни <strong>OK</strong></li>
                <li>Повтори для інших провайдерів з відповідними портами та distance</li>
               </ol>
                <div className={styles.screenshotNote}>
                  <img 
                    src={dhcp1Img} 
                    alt="DHCP Client налаштування 1" 
                    className={styles.screenshot} 
                    onClick={(e) => onImageClick(dhcp1Img, "DHCP Client налаштування 1")}
                  />
                  <img 
                    src={dhcp2Img} 
                    alt="DHCP Client налаштування 2" 
                    className={styles.screenshot} 
                    onClick={(e) => onImageClick(dhcp2Img, "DHCP Client налаштування 2")}
                  />
                  <img 
                    src={dhcp3Img} 
                    alt="DHCP Client налаштування 3" 
                    className={styles.screenshot} 
                    onClick={(e) => onImageClick(dhcp3Img, "DHCP Client налаштування 3")}
                  />
                </div>
            </div>
          </div>

          {/* Етап 2 */}
          <div className={`${styles.accordionItem} ${openAccordions.includes(1) ? styles.active : ''}`}>
            <div className={styles.accordionHeader} onClick={() => toggleAccordion(1)}>
              <h3 className={styles.accordionTitle}>Етап 2. Address List для резервних провайдерів</h3>
              <span className={styles.accordionIcon}>▼</span>
            </div>
            <div className={styles.accordionContent}>
              <ol className={styles.stepList}>
                <li>У WinBox перейди в <strong>IP &rarr; Addresses</strong></li>
                <li>Натисни <strong>New</strong> для додавання нової адреси</li>
                <li>У полі <strong>Address</strong> введи IP адресу для нового провайдера</li>
                <li>У полі <strong>Interface</strong> вибери відповідний порт (наприклад, <strong>ether2</strong>)</li>
                <li>Переконайся що <strong>Enabled</strong> відмічено</li>
                <li>Натисни <strong>OK</strong></li>
                <li>Повтори для всіх резервних провайдерів</li>
              </ol>
                <div className={styles.screenshotNote}>
                  <img 
                    src={addressImg} 
                    alt="Address List налаштування" 
                    className={styles.screenshot} 
                    onClick={(e) => onImageClick(addressImg, "Address List налаштування")}
                  />
               </div>
            </div>
          </div>

          {/* Етап 3 */}
          <div className={`${styles.accordionItem} ${openAccordions.includes(2) ? styles.active : ''}`}>
            <div className={styles.accordionHeader} onClick={() => toggleAccordion(2)}>
              <h3 className={styles.accordionTitle}>Етап 3. Firewall - NAT для резервних провайдерів</h3>
              <span className={styles.accordionIcon}>▼</span>
            </div>
            <div className={styles.accordionContent}>
              <ol className={styles.stepList}>
                <li>У WinBox перейди в <strong>IP &rarr; Firewall &rarr; NAT</strong></li>
                <li>Натисни <strong>New</strong> для додавання нового правила</li>
                <li>У полі <strong>Chain</strong> вибери <strong>srcnat</strong></li>
                <li>У полі <strong>Out Interface</strong> вибери порт нового провайдера (наприклад, <strong>ether2</strong>)</li>
                <li>У полі <strong>Action</strong> вибери <strong>masquerade</strong></li>
                <li>Переконайся що <strong>Enabled</strong> відмічено</li>
                <li>Натисни <strong>OK</strong></li>
                                 <li>Повтори для всіх резервних провайдерів</li>
               </ol>
                <div className={styles.screenshotNote}>
                  <img 
                     src={natImg} 
                     alt="Firewall NAT налаштування" 
                     className={styles.screenshot} 
                     onClick={(e) => onImageClick(natImg, "Firewall NAT налаштування")}
                   />
                </div>
            </div>
          </div>

          {/* Етап 4 */}
          <div className={`${styles.accordionItem} ${openAccordions.includes(3) ? styles.active : ''}`}>
            <div className={styles.accordionHeader} onClick={() => toggleAccordion(3)}>
              <h3 className={styles.accordionTitle}>Етап 4. Route List - перевірка та налаштування</h3>
              <span className={styles.accordionIcon}>▼</span>
            </div>
            <div className={styles.accordionContent}>
              <ol className={styles.stepList}>
                <li>У WinBox перейди в <strong>IP &rarr; Routes</strong></li>
                <li>Перевір порядок маршрутів за <strong>Distance</strong></li>
                <li>Основний провайдер повинен мати <strong>Distance = 1</strong></li>
                <li>Резервні провайдери повинні мати <strong>Distance = 2, 3, 4...</strong></li>
                <li>Якщо маршрут не зафіксований автоматично - додай новий</li>
                <li>У полі <strong>Dst Address</strong> введи <strong>0.0.0.0/0</strong></li>
                <li>У полі <strong>Gateway</strong> введи IP адресу шлюзу провайдера</li>
                <li>У полі <strong>Distance</strong> встанови відповідний пріоритет</li>
                <li>Переконайся що <strong>Enabled</strong> відмічено</li>
                <li>Натисни <strong>OK</strong></li>
              </ol>
              <div className={styles.screenshotNote}>
                <img 
                    src={route1Img} 
                    alt="Route List налаштування 1" 
                    className={styles.screenshot} 
                    onClick={(e) => onImageClick(route1Img, "Route List налаштування 1")}
                  />
                  <img 
                    src={route2Img} 
                    alt="Route List налаштування 2" 
                    className={styles.screenshot} 
                    onClick={(e) => onImageClick(route2Img, "Route List налаштування 2")}
                  />
                  <img 
                    src={route3Img} 
                    alt="Route List налаштування 3" 
                    className={styles.screenshot} 
                    onClick={(e) => onImageClick(route3Img, "Route List налаштування 3")}
                  />
              </div>
            </div>
          </div>
        </div>
       </div>
     </div>
   )
 }

export default Backup
