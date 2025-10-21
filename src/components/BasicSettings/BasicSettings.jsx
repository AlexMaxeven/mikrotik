import { useState, useRef, useEffect } from 'react'
import styles from './BasicSettings.module.css'

// Імпорт зображень
import step1Img from '../../assets/BasicSettingPicture/step1.jpg'
import bridge1Img from '../../assets/BasicSettingPicture/bridge1.jpg'
import bridgePortsImg from '../../assets/BasicSettingPicture/bridge_ports.jpg'
import dhcpClientsImg from '../../assets/BasicSettingPicture/dhcp_clients.jpg'
import adressListImg from '../../assets/BasicSettingPicture/adress_list.jpg'
import dhcpSetupImg from '../../assets/BasicSettingPicture/dhcp_setup.jpg'
import firewallNatImg from '../../assets/BasicSettingPicture/firewall_nat.jpg'
import firewallNat2Img from '../../assets/BasicSettingPicture/firewall_nat2.jpg'

function BasicSettings({ onImageClick }) {
  const [openAccordion, setOpenAccordion] = useState(null)
  const [isSticky, setIsSticky] = useState(false)
  const guideRef = useRef(null)
  const buttonRef = useRef(null)

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index)
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
      <h1 className={styles.title}>⚙️ Базові налаштування MikroTik</h1>
      <p className={styles.description}>
        Основні налаштування для початку роботи з MikroTik RouterOS:
      </p>
      
      {/* Кнопка для прокрутки до гіду */}
      <div 
        ref={buttonRef}
        className={`${styles.scrollButtonContainer} ${isSticky ? styles.sticky : ''}`}
      >
        <button className={styles.scrollButton} onClick={scrollToGuide}>
          📌 Покрокове підключення MikroTik з нуля
        </button>
      </div>
      
      <div className={styles.settingsGrid}>
        <div className={styles.settingsCategory}>
          <h3 className={styles.categoryTitle}>🔧 Початкові налаштування</h3>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🔐</span>
              <div className={styles.settingContent}>
                <strong>Зміна пароля адміністратора</strong>
                <p>Перший крок безпеки - зміна стандартного пароля</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🌐</span>
              <div className={styles.settingContent}>
                <strong>Налаштування IP адреси</strong>
                <p>Конфігурація статичної IP адреси для LAN</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>📡</span>
              <div className={styles.settingContent}>
                <strong>Включення DHCP сервера</strong>
                <p>Автоматичне призначення IP адрес клієнтам</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🔍</span>
              <div className={styles.settingContent}>
                <strong>Налаштування DNS</strong>
                <p>Конфігурація DNS серверів для мережі</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🛡️</span>
              <div className={styles.settingContent}>
                <strong>Базові правила Firewall</strong>
                <p>Створення основних правил безпеки</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.settingsCategory}>
          <h3 className={styles.categoryTitle}>🌐 Мережеві налаштування</h3>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>📡</span>
              <div className={styles.settingContent}>
                <strong>Налаштування WAN порту</strong>
                <p>Конфігурація зовнішнього інтерфейсу</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🏠</span>
              <div className={styles.settingContent}>
                <strong>Конфігурація LAN мережі</strong>
                <p>Налаштування внутрішньої мережі</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>📶</span>
              <div className={styles.settingContent}>
                <strong>Налаштування Wi-Fi (якщо є)</strong>
                <p>Конфігурація бездротової мережі</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🔗</span>
              <div className={styles.settingContent}>
                <strong>Створення VLAN</strong>
                <p>Сегментація мережі на логічні групи</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Новий розділ з детальним гідом */}
      <div className={styles.detailedGuide} ref={guideRef}>
        <h2 className={styles.guideTitle}>📌 Покрокове підключення MikroTik з нуля WinBox (RB750)</h2>
        
        <div className={styles.accordionContainer}>
          {/* Етап 1 */}
          <div className={`${styles.accordionItem} ${openAccordion === 0 ? styles.active : ''}`}>
            <div className={styles.accordionHeader} onClick={() => toggleAccordion(0)}>
              <h3 className={styles.accordionTitle}>Етап 1. Підключення до пристрою</h3>
              <span className={styles.accordionIcon}>▼</span>
            </div>
            <div className={styles.accordionContent}>
              <ol className={styles.stepList}>
                <li>Встав кабель від провайдера / головного роутера у <strong>ether1 (WAN)</strong>.</li>
                <li>Кабель від ноутбука підключи у будь-який із <strong>ether2–5 (LAN)</strong>.</li>
                <li>Запусти <strong>WinBox</strong> і підключись по MAC або IP <strong>(192.168.88.1)</strong>.</li>
                <li>Постав пароль на користувача <strong>admin</strong>.</li>
              </ol>
              <div className={styles.screenshotNote}>
                <img 
                  src={step1Img} 
                  alt="Підключення до пристрою" 
                  className={styles.screenshot} 
                  onClick={() => onImageClick(step1Img, "Підключення до пристрою")}
                />
              </div>
            </div>
          </div>

          {/* Етап 2 */}
          <div className={`${styles.accordionItem} ${openAccordion === 1 ? styles.active : ''}`}>
            <div className={styles.accordionHeader} onClick={() => toggleAccordion(1)}>
              <h3 className={styles.accordionTitle}>Етап 2. Створення bridge1</h3>
              <span className={styles.accordionIcon}>▼</span>
            </div>
            <div className={styles.accordionContent}>
              <ol className={styles.stepList}>
                <li>У WinBox перейди в <strong>Bridge &gt; New...</strong></li>
                <li>У полі <strong>Name</strong> введи <strong>bridge1</strong></li>
                <li>Переконайся що <strong>Enabled</strong> відмічено</li>
                <li>Натисни <strong>OK</strong> для створення</li>
              </ol>
              <div className={styles.screenshotNote}>
                <img 
                  src={bridge1Img} 
                  alt="Створення bridge1" 
                  className={styles.screenshot} 
                  onClick={() => onImageClick(bridge1Img, "Створення bridge1")}
                />
              </div>
            </div>
          </div>

          {/* Етап 3 */}
          <div className={`${styles.accordionItem} ${openAccordion === 2 ? styles.active : ''}`}>
            <div className={styles.accordionHeader} onClick={() => toggleAccordion(2)}>
              <h3 className={styles.accordionTitle}>Етап 3. Додавання портів у bridge для ether2 по ether5</h3>
              <span className={styles.accordionIcon}>▼</span>
            </div>
            <div className={styles.accordionContent}>
              <ol className={styles.stepList}>
                <li>У WinBox перейди в <strong>Bridge &gt; Ports</strong></li>
                <li>Натисни <strong>New</strong> для додавання порту</li>
                <li>У полі <strong>Interface</strong> вибери <strong>ether2</strong></li>
                <li>У полі <strong>Bridge</strong> вибери <strong>bridge1</strong></li>
                <li>Переконайся що <strong>Enabled</strong> відмічено</li>
                <li>Натисни <strong>OK</strong></li>
                <li>Повтори для <strong>ether3</strong>, <strong>ether4</strong>, <strong>ether5</strong></li>
              </ol>
              <div className={styles.screenshotNote}>
                 <img 
                   src={bridgePortsImg} 
                   alt="Додавання портів у bridge" 
                   className={styles.screenshot} 
                   onClick={() => onImageClick(bridgePortsImg, "Додавання портів у bridge")}
                 />
               </div>
            </div>
          </div>

          {/* Етап 4 */}
          <div className={`${styles.accordionItem} ${openAccordion === 3 ? styles.active : ''}`}>
            <div className={styles.accordionHeader} onClick={() => toggleAccordion(3)}>
              <h3 className={styles.accordionTitle}>Етап 4. Додавання DHCP Client</h3>
              <span className={styles.accordionIcon}>▼</span>
            </div>
            <div className={styles.accordionContent}>
              <ol className={styles.stepList}>
                <li>У WinBox перейди в <strong>IP &rarr; DHCP Client</strong></li>
                <li>Натисни <strong>New</strong></li>
                <li>У полі <strong>Interface</strong> вибери <strong>ether1</strong></li>
                <li>Переконайся що <strong>Enabled</strong> відмічено</li>
                <li>Переконайся що <strong>Use Peer DNS</strong> відмічено</li>
                <li>Переконайся що <strong>Use Peer NTP</strong> відмічено</li>
                <li>Переконайся що <strong>Add Default Route</strong> встановлено в <strong>yes</strong></li>
                <li>Натисни <strong>OK</strong></li>
              </ol>
              <div className={styles.screenshotNote}>
                 <img 
                   src={dhcpClientsImg} 
                   alt="Додавання DHCP Client" 
                   className={styles.screenshot} 
                   onClick={() => onImageClick(dhcpClientsImg, "Додавання DHCP Client")}
                 />
               </div>
            </div>
          </div>

          {/* Етап 5 */}
          <div className={`${styles.accordionItem} ${openAccordion === 4 ? styles.active : ''}`}>
            <div className={styles.accordionHeader} onClick={() => toggleAccordion(4)}>
              <h3 className={styles.accordionTitle}>Етап 5. Додати bridge1 в Addresses</h3>
              <span className={styles.accordionIcon}>▼</span>
            </div>
            <div className={styles.accordionContent}>
              <ol className={styles.stepList}>
                <li>У WinBox перейди в <strong>IP &rarr; Addresses</strong></li>
                <li>Натисни <strong>New</strong></li>
                <li>У полі <strong>Address</strong> введи <strong>192.168.88.1/24</strong></li>
                <li>У полі <strong>Interface</strong> вибери <strong>bridge1</strong></li>
                <li>Натисни <strong>OK</strong></li>
              </ol>
              <div className={styles.screenshotNote}>
                 <img 
                   src={adressListImg} 
                   alt="Додавання bridge1 в Addresses" 
                   className={styles.screenshot} 
                   onClick={() => onImageClick(adressListImg, "Додавання bridge1 в Addresses")}
                 />
               </div>
            </div>
          </div>

          {/* Етап 6 */}
          <div className={`${styles.accordionItem} ${openAccordion === 5 ? styles.active : ''}`}>
            <div className={styles.accordionHeader} onClick={() => toggleAccordion(5)}>
              <h3 className={styles.accordionTitle}>Етап 6. DHCP Server - Setup - bridge1</h3>
              <span className={styles.accordionIcon}>▼</span>
            </div>
            <div className={styles.accordionContent}>
              <ol className={styles.stepList}>
                <li>У WinBox перейди в <strong>IP &rarr; DHCP Server</strong></li>
                <li>У правій панелі натисни <strong>DHCP Setup</strong></li>
                <li>У полі <strong>DHCP Server Interface</strong> вибери <strong>bridge1</strong></li>
                <li>Натисни <strong>Next</strong></li>
                <li>У розділі <strong>Networks</strong> знайди поле <strong>DNS Servers</strong></li>
                <li>Додай <strong>8.8.8.8</strong> та <strong>1.1.1.1</strong></li>
                <li>Заверши налаштування та натисни <strong>OK</strong></li>
              </ol>
              <div className={styles.screenshotNote}>
                 <img 
                   src={dhcpSetupImg} 
                   alt="DHCP Server Setup для bridge1" 
                   className={styles.screenshot} 
                   onClick={() => onImageClick(dhcpSetupImg, "DHCP Server Setup для bridge1")}
                 />
               </div>
            </div>
          </div>

          {/* Етап 7 */}
          <div className={`${styles.accordionItem} ${openAccordion === 6 ? styles.active : ''}`}>
            <div className={styles.accordionHeader} onClick={() => toggleAccordion(6)}>
              <h3 className={styles.accordionTitle}>Етап 7. Firewall - NAT</h3>
              <span className={styles.accordionIcon}>▼</span>
            </div>
            <div className={styles.accordionContent}>
              <ol className={styles.stepList}>
                <li>У WinBox перейди в <strong>IP &rarr; Firewall &rarr; NAT</strong></li>
                <li>Натисни <strong>New</strong></li>
                <li>У полі <strong>Chain</strong> встанови <strong>srcnat</strong></li>
                <li>У полі <strong>Out. Interface</strong> вибери <strong>ether1</strong></li>
                <li>Перейди на вкладку <strong>Action</strong></li>
                <li>У полі <strong>Action</strong> вибери <strong>masquerade</strong></li>
                <li>Переконайся що <strong>Enabled</strong> відмічено</li>
                <li>Натисни <strong>OK</strong></li>
              </ol>
              <div className={styles.screenshotNote}>
                 <img 
                   src={firewallNatImg} 
                   alt="Firewall NAT - General налаштування" 
                   className={styles.screenshot} 
                   onClick={() => onImageClick(firewallNatImg, "Firewall NAT - General налаштування")}
                 />
                 <img 
                   src={firewallNat2Img} 
                   alt="Firewall NAT - Action налаштування" 
                   className={styles.screenshot} 
                   onClick={() => onImageClick(firewallNat2Img, "Firewall NAT - Action налаштування")}
                 />
               </div>
            </div>
          </div>

          {/* Результат */}
          <div className={`${styles.accordionItem} ${openAccordion === 7 ? styles.active : ''}`}>
            <div className={styles.accordionHeader} onClick={() => toggleAccordion(7)}>
              <h3 className={styles.accordionTitle}>✅ Результат</h3>
              <span className={styles.accordionIcon}>▼</span>
            </div>
            <div className={styles.accordionContent}>
              <ul className={styles.resultList}>
                <li>Інтернет із провайдера через ether1 заходить на MikroTik</li>
                <li>MikroTik робить NAT і роздає інтернет у LAN (ether2–5)</li>
                <li>DHCP автоматично видає IP, шлюз і DNS</li>
                <li>Клієнти отримують стабільний інтернет</li>
                <li>Bridge1 об'єднує всі LAN порти в одну мережу</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicSettings
