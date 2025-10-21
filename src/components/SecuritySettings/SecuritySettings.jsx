import { useState, useRef, useEffect } from 'react'
import styles from './SecuritySettings.module.css'

// Імпорт зображень для налаштувань захисту (заглушки - потім замінити на реальні)
// import firewall1Img from '../../assets/Security/firewall1.jpg'
// import firewall2Img from '../../assets/Security/firewall2.jpg'
// import firewall3Img from '../../assets/Security/firewall3.jpg'
// import firewall4Img from '../../assets/Security/firewall4.jpg'
// import firewall5Img from '../../assets/Security/firewall5.jpg'
// import firewall6Img from '../../assets/Security/firewall6.jpg'
// import firewall7Img from '../../assets/Security/firewall7.jpg'
// import dnsImg from '../../assets/Security/dns.jpg'
import securityImg from '../../assets/Security/Security.jpg'

function SecuritySettings() {
  const [openAccordion, setOpenAccordion] = useState(null)
  const [isSticky, setIsSticky] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
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

  const openImageModal = (imageSrc, imageAlt, event) => {
    console.log('openImageModal called:', imageSrc, imageAlt)
    
    // Просто показуємо модальне вікно по центру екрану
    setSelectedImage({ 
      src: imageSrc, 
      alt: imageAlt
    })
  }

  const closeImageModal = () => {
    console.log('closeImageModal called')
    setSelectedImage(null)
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

  // Додаємо useEffect для відстеження змін selectedImage
  useEffect(() => {
    console.log('selectedImage changed:', selectedImage)
    if (selectedImage && selectedImage.position) {
      console.log('Modal position:', selectedImage.position)
    }
  }, [selectedImage])

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>🔐 Налаштування захисту MikroTik</h1>
      <p className={styles.description}>
        Базові правила захисту MikroTik (Firewall) для безпечної роботи роутера:
      </p>
      
      {/* Кнопка для прокрутки до гіду */}
      <div 
        ref={buttonRef}
        className={`${styles.scrollButtonContainer} ${isSticky ? styles.sticky : ''}`}
      >
        <button className={styles.scrollButton} onClick={scrollToGuide}>
          📌 Детальний гід по налаштуванню захисту
        </button>
      </div>
      
      <div className={styles.settingsGrid}>
        <div className={styles.settingsCategory}>
          <h3 className={styles.categoryTitle}>🛡️ Основні принципи захисту</h3>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🔒</span>
              <div className={styles.settingContent}>
                <strong>INPUT Chain</strong>
                <p>Керування доступом до самого роутера - найважливіша частина захисту</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🌐</span>
              <div className={styles.settingContent}>
                <strong>OUTPUT Chain</strong>
                <p>Дозволяє роутеру самому працювати з DNS та іншими службами</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🚫</span>
              <div className={styles.settingContent}>
                <strong>Принцип "за замовчуванням закрито"</strong>
                <p>Все що не дозволено явно - заборонено автоматично</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Новий розділ з детальним гідом */}
      <div className={styles.detailedGuide} ref={guideRef}>
        <h2 className={styles.guideTitle}>📌 Детальний гід по налаштуванню захисту</h2>
        
        <div className={styles.accordionContainer}>
          {/* INPUT Chain - Основні правила */}
          <div className={`${styles.accordionItem} ${openAccordion === 0 ? styles.active : ''}`}>
            <div className={styles.accordionHeader} onClick={() => toggleAccordion(0)}>
              <h3 className={styles.accordionTitle}>1. INPUT Chain - Керування доступом до роутера</h3>
              <span className={styles.accordionIcon}>▼</span>
            </div>
            <div className={styles.accordionContent}>
              <div className={styles.ruleSection}>
                <h4>1.1. Дозволити існуючі з'єднання</h4>
                <ul className={styles.ruleList}>
                  <li><strong>Chain:</strong> input</li>
                  <li><strong>Connection State:</strong> established, related</li>
                  <li><strong>Action:</strong> accept</li>
                </ul>
                                 <p className={styles.ruleDescription}>
                   👉 Цим правилом дозволяємо весь легальний трафік, який вже створений.
                 </p>
              </div>

              <div className={styles.ruleSection}>
                <h4>1.2. Заблокувати некоректні пакети</h4>
                <ul className={styles.ruleList}>
                  <li><strong>Chain:</strong> input</li>
                  <li><strong>Connection State:</strong> invalid</li>
                  <li><strong>Action:</strong> drop</li>
                </ul>
                                 <p className={styles.ruleDescription}>
                   👉 Відсікає «биті» або підозрілі пакети.
                 </p>
              </div>

              <div className={styles.ruleSection}>
                <h4>1.3. Доступ з локальної мережі (LAN)</h4>
                <ul className={styles.ruleList}>
                  <li><strong>Chain:</strong> input</li>
                  <li><strong>Src. Address:</strong> 192.168.88.0/24</li>
                  <li><strong>Action:</strong> accept</li>
                </ul>
                                 <p className={styles.ruleDescription}>
                   👉 Дозволяє всім пристроям з LAN підключатись до роутера (WinBox, SSH тощо).
                 </p>
              </div>

              <div className={styles.ruleSection}>
                <h4>1.4. Адмін доступ (тільки з LAN)</h4>
                <ul className={styles.ruleList}>
                  <li><strong>Chain:</strong> input</li>
                  <li><strong>Protocol:</strong> tcp</li>
                  <li><strong>Dst. Port:</strong> 8291 (WinBox) → accept</li>
                  <li><strong>Dst. Port:</strong> 22 (SSH) → accept</li>
                  <li><strong>Dst. Port:</strong> 443 (WebFig HTTPS) → accept</li>
                </ul>
                                 <p className={styles.ruleDescription}>
                   👉 Дозволяє доступ лише до керування, потрібні порти — решта закривається.
                 </p>
              </div>

              <div className={styles.ruleSection}>
                <h4>1.5. ICMP (Ping) - дозволити з LAN, заборонити з WAN</h4>
                <ul className={styles.ruleList}>
                  <li><strong>Дозволити з LAN:</strong></li>
                  <li>Chain: input, Protocol: icmp, Action: accept</li>
                  <li><strong>Заборонити з WAN:</strong></li>
                  <li>Chain: input, Protocol: icmp, In. Interface: ether1, ether2, Action: drop</li>
                </ul>
                                 <p className={styles.ruleDescription}>
                   👉 Дозволяє пінг для діагностики з LAN, забороняє пінг з інтернету (щоб «не світився»).
                 </p>
              </div>

              <div className={styles.ruleSection}>
                <h4>1.6. Заборонити весь інший трафік з WAN</h4>
                <ul className={styles.ruleList}>
                  <li><strong>Для ether1:</strong></li>
                  <li>Chain: input, In. Interface: ether1, Action: drop</li>
                  <li><strong>Для ether2:</strong></li>
                  <li>Chain: input, In. Interface: ether2, Action: drop</li>
                </ul>
                                 <p className={styles.ruleDescription}>
                   👉 Ріже все, що приходить з інтернету напряму до роутера.
                 </p>
              </div>

              <div className={styles.ruleSection}>
                <h4>1.7. Фінальний бар'єр</h4>
                <ul className={styles.ruleList}>
                  <li><strong>Chain:</strong> input</li>
                  <li><strong>Action:</strong> drop</li>
                </ul>
                                 <p className={styles.ruleDescription}>
                   👉 Якщо щось не підпало під правила вище — блокується.
                 </p>
              </div>
            </div>
          </div>

          {/* OUTPUT Chain */}
          <div className={`${styles.accordionItem} ${openAccordion === 1 ? styles.active : ''}`}>
            <div className={styles.accordionHeader} onClick={() => toggleAccordion(1)}>
              <h3 className={styles.accordionTitle}>2. OUTPUT Chain - DNS запити роутера</h3>
              <span className={styles.accordionIcon}>▼</span>
            </div>
            <div className={styles.accordionContent}>
              <div className={styles.ruleSection}>
                <h4>2.1. DNS-запити</h4>
                <ul className={styles.ruleList}>
                  <li><strong>UDP DNS:</strong></li>
                  <li>Chain: output, Protocol: udp, Dst. Port: 53 → accept</li>
                  <li><strong>TCP DNS:</strong></li>
                  <li>Chain: output, Protocol: tcp, Dst. Port: 53 → accept</li>
                </ul>
                                 <p className={styles.ruleDescription}>
                   👉 Дозволяє роутеру запитувати DNS-сервери (наприклад, Google 8.8.8.8).
                 </p>
              </div>
            </div>
          </div>

          {/* Результат */}
          <div className={`${styles.accordionItem} ${openAccordion === 2 ? styles.active : ''}`}>
            <div className={styles.accordionHeader} onClick={() => toggleAccordion(2)}>
              <h3 className={styles.accordionTitle}>✅ Результат налаштувань</h3>
              <span className={styles.accordionIcon}>▼</span>
            </div>
            <div className={styles.accordionContent}>
                             <div className={styles.resultSection}>
                 <h4>Що отримуємо після налаштування:</h4>
                 <ul className={styles.resultList}>
                   <li>✅ <strong>LAN-користувачі</strong> мають повний доступ до роутера</li>
                   <li>✅ <strong>Весь трафік з інтернету</strong> відсікається, крім дозволених служб</li>
                   <li>✅ <strong>Пінг із WAN</strong> блокується</li>
                   <li>✅ <strong>Роутер сам може</strong> ходити в інтернет (DNS, апдейти)</li>
                   <li>✅ <strong>Адмін доступ</strong> залишається тільки з локальної мережі</li>
                   <li>✅ <strong>Безпека</strong> забезпечується принципом "за замовчуванням закрито"</li>
                 </ul>
                 
                                   <div className={styles.screenshotNote}>
                    <img 
                      src={securityImg} 
                      alt="Результат налаштувань захисту" 
                      className={styles.screenshot} 
                      onClick={(e) => openImageModal(securityImg, "Результат налаштувань захисту", e)}
                    />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Новий блок - Актуальні правила */}
      <div className={styles.currentRules}>
        <h2 className={styles.rulesTitle}>📋 Актуальні правила</h2>
        <p className={styles.rulesDescription}>
          Поточні правила захисту, які рекомендуються для використання:
        </p>
        
        <div className={styles.rulesContainer}>
          {/* Правило 1 */}
          <div className={styles.ruleCard}>
            <div className={styles.ruleHeader}>
              <span className={styles.ruleIcon}>✅</span>
              <h3 className={styles.ruleCardTitle}>Accept established,related,untracked</h3>
            </div>
            <div className={styles.ruleContent}>
              <p><strong>Chain:</strong> input</p>
              <p><strong>Action:</strong> accept</p>
              <p><strong>Connection State:</strong> established,related,untracked</p>
              <p><strong>Comment:</strong> defconf: accept established,related,untracked</p>
            </div>
          </div>

          {/* Правило 2 */}
          <div className={styles.ruleCard}>
            <div className={styles.ruleHeader}>
              <span className={styles.ruleIcon}>🚫</span>
              <h3 className={styles.ruleCardTitle}>Drop invalid</h3>
            </div>
            <div className={styles.ruleContent}>
              <p><strong>Chain:</strong> input</p>
              <p><strong>Action:</strong> drop</p>
              <p><strong>Connection State:</strong> invalid</p>
              <p><strong>Comment:</strong> defconf: drop invalid</p>
            </div>
          </div>

          {/* Правило 3 */}
          <div className={styles.ruleCard}>
            <div className={styles.ruleHeader}>
              <span className={styles.ruleIcon}>📡</span>
              <h3 className={styles.ruleCardTitle}>Accept ICMP</h3>
            </div>
            <div className={styles.ruleContent}>
              <p><strong>Chain:</strong> input</p>
              <p><strong>Action:</strong> accept</p>
              <p><strong>Protocol:</strong> icmp</p>
              <p><strong>Comment:</strong> defconf: accept ICMP</p>
            </div>
          </div>

          {/* Правило 4 */}
          <div className={styles.ruleCard}>
            <div className={styles.ruleHeader}>
              <span className={styles.ruleIcon}>🛡️</span>
              <h3 className={styles.ruleCardTitle}>Drop all not coming from LAN</h3>
            </div>
            <div className={styles.ruleContent}>
              <p><strong>Chain:</strong> input</p>
              <p><strong>Action:</strong> drop</p>
              <p><strong>In Interface List:</strong> !LAN</p>
              <p><strong>Comment:</strong> defconf: drop all not coming from LAN</p>
            </div>
          </div>

          {/* Правило 5 */}
          <div className={styles.ruleCard}>
            <div className={styles.ruleHeader}>
              <span className={styles.ruleIcon}>🔐</span>
              <h3 className={styles.ruleCardTitle}>Accept in ipsec policy</h3>
            </div>
            <div className={styles.ruleContent}>
              <p><strong>Chain:</strong> forward</p>
              <p><strong>Action:</strong> accept</p>
              <p><strong>IPSec Policy:</strong> in,ipsec</p>
              <p><strong>Comment:</strong> defconf: accept in ipsec policy</p>
            </div>
          </div>

          {/* Правило 6 */}
          <div className={styles.ruleCard}>
            <div className={styles.ruleHeader}>
              <span className={styles.ruleIcon}>🔐</span>
              <h3 className={styles.ruleCardTitle}>Accept out ipsec policy</h3>
            </div>
            <div className={styles.ruleContent}>
              <p><strong>Chain:</strong> forward</p>
              <p><strong>Action:</strong> accept</p>
              <p><strong>IPSec Policy:</strong> out,ipsec</p>
              <p><strong>Comment:</strong> defconf: accept out ipsec policy</p>
            </div>
          </div>

          {/* Правило 7 */}
          <div className={styles.ruleCard}>
            <div className={styles.ruleHeader}>
              <span className={styles.ruleIcon}>⚡</span>
              <h3 className={styles.ruleCardTitle}>Fasttrack</h3>
            </div>
            <div className={styles.ruleContent}>
              <p><strong>Chain:</strong> forward</p>
              <p><strong>Action:</strong> fasttrack-connection</p>
              <p><strong>Connection State:</strong> established,related</p>
              <p><strong>Comment:</strong> defconf: fasttrack</p>
            </div>
          </div>

          {/* Правило 8 */}
          <div className={styles.ruleCard}>
            <div className={styles.ruleHeader}>
              <span className={styles.ruleIcon}>✅</span>
              <h3 className={styles.ruleCardTitle}>Accept established,related,untracked (forward)</h3>
            </div>
            <div className={styles.ruleContent}>
              <p><strong>Chain:</strong> forward</p>
              <p><strong>Action:</strong> accept</p>
              <p><strong>Connection State:</strong> established,related,untracked</p>
              <p><strong>Comment:</strong> defconf: accept established,related, untracked</p>
            </div>
          </div>

          {/* Правило 9 */}
          <div className={styles.ruleCard}>
            <div className={styles.ruleHeader}>
              <span className={styles.ruleIcon}>🚫</span>
              <h3 className={styles.ruleCardTitle}>Drop invalid (forward)</h3>
            </div>
            <div className={styles.ruleContent}>
              <p><strong>Chain:</strong> forward</p>
              <p><strong>Action:</strong> drop</p>
              <p><strong>Connection State:</strong> invalid</p>
              <p><strong>Comment:</strong> defconf: drop invalid</p>
            </div>
          </div>

          {/* Правило 10 */}
          <div className={styles.ruleCard}>
            <div className={styles.ruleHeader}>
              <span className={styles.ruleIcon}>🛡️</span>
              <h3 className={styles.ruleCardTitle}>Drop all from WAN not DSTNATed</h3>
            </div>
            <div className={styles.ruleContent}>
              <p><strong>Chain:</strong> forward</p>
              <p><strong>Action:</strong> drop</p>
              <p><strong>Connection NAT State:</strong> !dstnat</p>
              <p><strong>Connection State:</strong> new</p>
              <p><strong>In Interface List:</strong> WAN</p>
              <p><strong>Comment:</strong> defconf: drop all from WAN not DSTNATed</p>
            </div>
          </div>
        </div>

        {/* Блок з командами для копіювання */}
        <div className={styles.commandsSection}>
          <h3 className={styles.commandsTitle}>📋 Команди для копіювання</h3>
          <p className={styles.commandsDescription}>
            Скопіюйте ці команди та вставте їх в Terminal або WinBox:
          </p>
          
          <div className={styles.commandsList}>
            <div className={styles.commandBlock}>
              <h4 className={styles.commandBlockTitle}>Очистити поточні правила:</h4>
              <div className={styles.commandCode}>
                <code>/ip firewall filter remove [find]</code>
              </div>
            </div>

            <div className={styles.commandBlock}>
              <h4 className={styles.commandBlockTitle}>Додати нові правила:</h4>
              <div className={styles.commandCode}>
                <code>/ip firewall filter</code>
                <code>add action=accept chain=input comment="defconf: accept established,related,untracked" connection-state=established,related,untracked</code>
                <code>add action=drop chain=input comment="defconf: drop invalid" connection-state=invalid</code>
                <code>add action=accept chain=input comment="defconf: accept ICMP" protocol=icmp</code>
                <code>add action=drop chain=input comment="defconf: drop all not coming from LAN" in-interface-list=!LAN</code>
                <code>add action=accept chain=forward comment="defconf: accept in ipsec policy" ipsec-policy=in,ipsec</code>
                <code>add action=accept chain=forward comment="defconf: accept out ipsec policy" ipsec-policy=out,ipsec</code>
                <code>add action=fasttrack-connection chain=forward comment="defconf: fasttrack" connection-state=established,related</code>
                <code>add action=accept chain=forward comment="defconf: accept established,related, untracked" connection-state=established,related,untracked</code>
                <code>add action=drop chain=forward comment="defconf: drop invalid" connection-state=invalid</code>
                <code>add action=drop chain=forward comment="defconf: drop all from WAN not DSTNATed" connection-nat-state=!dstnat connection-state=new in-interface-list=WAN</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальне вікно для зображень */}
      {selectedImage && (
        <div className={styles.imageModal} onClick={closeImageModal}>
          <div 
            className={styles.modalContent} 
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeImageModal}>×</button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className={styles.modalImage} 
            />
            <p className={styles.modalCaption}>{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SecuritySettings
