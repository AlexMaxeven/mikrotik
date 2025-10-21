import { useState, useEffect, useRef } from 'react'
import styles from './MikroTikGeneral.module.css'

function MikroTikGeneral() {
  const [openModal, setOpenModal] = useState(null)
  const [showCompanyInfo, setShowCompanyInfo] = useState(false)
  const modalRef = useRef(null)

  const openTermModal = (term) => {
    setOpenModal(term)
  }

  const closeModal = () => {
    setOpenModal(null)
  }

  const toggleCompanyInfo = () => {
    setShowCompanyInfo(!showCompanyInfo)
  }

  // Автоматичне прокручування до центру модального вікна при відкритті
  useEffect(() => {
    if (openModal && modalRef.current) {
      // Невелика затримка для забезпечення рендерингу модального вікна
      setTimeout(() => {
        modalRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        })
      }, 100)
    }
  }, [openModal])

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>🖥️ MikroTik - Загальні положення</h1>
      
      {/* Згорнута/розгорнута інформація про компанію */}
      <div className={styles.companyInfoSection}>
        <button 
          className={styles.toggleButton}
          onClick={toggleCompanyInfo}
        >
          {showCompanyInfo ? '📖 Згорнути інформацію' : '📖 Розгорнути інформацію про компанію'}
        </button>
        
        {showCompanyInfo && (
          <div className={styles.companyInfoContent}>
            <p className={styles.description}>
              MikroTik - це латвійська компанія, що виробляє мережеве обладнання та програмне забезпечення для маршрутизації та комутації.
            </p>
            <p className={styles.subtitle}>Основні продукти компанії включають:</p>
            <ul className={styles.productList}>
              <li>Маршрутизатори різних рівнів</li>
              <li>Комутатори та точки доступу</li>
              <li>Операційну систему RouterOS</li>
              <li>Програмне забезпечення для управління мережами</li>
            </ul>
            <p className={styles.description}>
              RouterOS - це основна операційна система, яка забезпечує повний набір функцій для створення та управління мережами будь-якого розміру.
            </p>
          </div>
        )}
      </div>

      {/* Основний розділ з термінологією - тепер більш помітний */}
      <div className={styles.terminologySection}>
        <h2 className={styles.terminologyTitle}>📚 Термінологія - що треба знати</h2>
        <p className={styles.terminologyDescription}>
          Основні терміни мережевої технології, які необхідно розуміти для роботи з MikroTik:
        </p>
        
        <div className={styles.terminologyGrid}>
          <div className={styles.terminologyCard}>
            <div className={styles.termHeader}>
              <span className={styles.termIcon}>🌐</span>
              <h3 className={styles.termName}>WAN (Wide Area Network)</h3>
            </div>
            <p className={styles.termDefinition}>
              Зовнішня мережа, зазвичай Інтернет.
            </p>
            <div className={styles.mikrotikNote}>
              <span className={styles.noteIcon}>👉</span>
              <span>У MikroTik це порт для отримання інету від провайдера (ether1).</span>
            </div>
            <button 
              className={styles.detailsButton}
              onClick={() => openTermModal('wan')}
            >
              📖 Детальніше
            </button>
          </div>

          <div className={styles.terminologyCard}>
            <div className={styles.termHeader}>
              <span className={styles.termIcon}>🏠</span>
              <h3 className={styles.termName}>LAN (Local Area Network)</h3>
            </div>
            <p className={styles.termDefinition}>
              Внутрішня локальна мережа (твої ПК, ноут, телефони).
            </p>
            <div className={styles.mikrotikNote}>
              <span className={styles.noteIcon}>👉</span>
              <span>У MikroTik це порти ether2–5, об'єднані в bridge1.</span>
            </div>
            <button 
              className={styles.detailsButton}
              onClick={() => openTermModal('lan')}
            >
              📖 Детальніше
            </button>
          </div>

          <div className={styles.terminologyCard}>
            <div className={styles.termHeader}>
              <span className={styles.termIcon}>🔄</span>
              <h3 className={styles.termName}>NAT (Network Address Translation)</h3>
            </div>
            <p className={styles.termDefinition}>
              Підміна локальних IP на один зовнішній.
            </p>
            <div className={styles.mikrotikNote}>
              <span className={styles.noteIcon}>👉</span>
              <span>Дозволяє багатьом пристроям у LAN виходити в Інтернет через один IP на WAN.</span>
            </div>
            <button 
              className={styles.detailsButton}
              onClick={() => openTermModal('nat')}
            >
              📖 Детальніше
            </button>
          </div>

          <div className={styles.terminologyCard}>
            <div className={styles.termHeader}>
              <span className={styles.termIcon}>📡</span>
              <h3 className={styles.termName}>DHCP (Dynamic Host Configuration Protocol)</h3>
            </div>
            <p className={styles.termDefinition}>
              Автоматична видача IP, шлюзу і DNS клієнтам.
            </p>
            <div className={styles.mikrotikNote}>
              <span className={styles.noteIcon}>👉</span>
              <span>Ноут/телефон підключився → одразу отримав адресу від MikroTik.</span>
            </div>
            <button 
              className={styles.detailsButton}
              onClick={() => openTermModal('dhcp')}
            >
              📖 Детальніше
            </button>
          </div>

          <div className={styles.terminologyCard}>
            <div className={styles.termHeader}>
              <span className={styles.termIcon}>📖</span>
              <h3 className={styles.termName}>DNS (Domain Name System)</h3>
            </div>
            <p className={styles.termDefinition}>
              "Телефонна книга Інтернету".
            </p>
            <div className={styles.mikrotikNote}>
              <span className={styles.noteIcon}>👉</span>
              <span>Перетворює ім'я сайту (google.com) на IP-адресу (142.250.186.206).</span>
            </div>
            <button 
              className={styles.detailsButton}
              onClick={() => openTermModal('dns')}
            >
              📖 Детальніше
            </button>
          </div>

          <div className={styles.terminologyCard}>
            <div className={styles.termHeader}>
              <span className={styles.termIcon}>🆔</span>
              <h3 className={styles.termName}>MAC Address</h3>
            </div>
            <p className={styles.termDefinition}>
              Унікальний "номер" кожної мережевої карти.
            </p>
            <div className={styles.mikrotikNote}>
              <span className={styles.noteIcon}>👉</span>
              <span>У MikroTik його видно в колонці Interfaces.</span>
            </div>
            <button 
              className={styles.detailsButton}
              onClick={() => openTermModal('mac')}
            >
              📖 Детальніше
            </button>
          </div>

          <div className={styles.terminologyCard}>
            <div className={styles.termHeader}>
              <span className={styles.termIcon}>🌉</span>
              <h3 className={styles.termName}>Bridge</h3>
            </div>
            <p className={styles.termDefinition}>
              Об'єднання кількох портів в одну мережу.
            </p>
            <div className={styles.mikrotikNote}>
              <span className={styles.noteIcon}>👉</span>
              <span>Без bridge кожен порт був би окремою мережею.</span>
            </div>
            <button 
              className={styles.detailsButton}
              onClick={() => openTermModal('bridge')}
            >
              📖 Детальніше
            </button>
          </div>

          <div className={styles.terminologyCard}>
            <div className={styles.termHeader}>
              <span className={styles.termIcon}>📦</span>
              <h3 className={styles.termName}>MTU</h3>
            </div>
            <p className={styles.termDefinition}>
              Максимальний розмір пакета даних через інтерфейс.
            </p>
            <div className={styles.mikrotikNote}>
              <span className={styles.noteIcon}>👉</span>
              <span>Стандартне значення: 1500 для Ethernet.</span>
            </div>
            <button 
              className={styles.detailsButton}
              onClick={() => openTermModal('mtu')}
            >
              📖 Детальніше
            </button>
          </div>

          <div className={styles.terminologyCard}>
            <div className={styles.termHeader}>
              <span className={styles.termIcon}>🏠</span>
              <h3 className={styles.termName}>IP Address</h3>
            </div>
            <p className={styles.termDefinition}>
              Логічна адреса пристрою в мережі.
            </p>
            <div className={styles.mikrotikNote}>
              <span className={styles.noteIcon}>👉</span>
              <span>Роутер зазвичай має дві: LAN (всередині) та WAN (зовнішня).</span>
            </div>
            <button 
              className={styles.detailsButton}
              onClick={() => openTermModal('ip')}
            >
              📖 Детальніше
            </button>
          </div>
        </div>
      </div>

      {/* Модальні вікна для кожного терміну */}
      {openModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} ref={modalRef}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {openModal === 'wan' && '🌐 WAN (Wide Area Network)'}
                {openModal === 'lan' && '🏠 LAN (Local Area Network)'}
                {openModal === 'nat' && '🔄 NAT (Network Address Translation)'}
                {openModal === 'dhcp' && '📡 DHCP (Dynamic Host Configuration Protocol)'}
                {openModal === 'dns' && '📖 DNS (Domain Name System)'}
                {openModal === 'mac' && '🆔 MAC Address'}
                {openModal === 'bridge' && '🌉 Bridge'}
                {openModal === 'mtu' && '📦 MTU'}
                {openModal === 'ip' && '🏠 IP Address'}
              </h3>
              <button className={styles.closeButton} onClick={closeModal}>
                ✕
              </button>
            </div>
            <div className={styles.modalContent}>
              {openModal === 'wan' && (
                <div className={styles.termDetails}>
                  <p className={styles.termMainDefinition}>
                    WAN (Wide Area Network) — це глобальна мережа, зазвичай Інтернет.
                  </p>
                  
                  <div className={styles.termBullets}>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>У побуті WAN = кабель від твого інтернет-провайдера.</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>У MikroTik за замовчуванням WAN порт = ether1.</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Через нього пристрій отримує IP-адресу від провайдера (динамічно або статично).</span>
                    </div>
                  </div>

                  <div className={styles.termSection}>
                    <h4 className={styles.termSectionTitle}>✨ Для чого потрібен WAN:</h4>
                    <ul className={styles.termSectionList}>
                      <li>Підключення до глобальної мережі (Інтернет).</li>
                      <li>Передача трафіку між твоєю локальною мережею (LAN) та світом.</li>
                      <li>Робота NAT — щоб усі твої пристрої (LAN) могли користуватись одним зовнішнім IP.</li>
                    </ul>
                  </div>

                  <div className={styles.termSection}>
                    <h4 className={styles.termSectionTitle}>🛠 Приклад у MikroTik:</h4>
                    <ul className={styles.termSectionList}>
                      <li>Втикаєш кабель провайдера у ether1 (WAN).</li>
                      <li>MikroTik піднімає DHCP Client на цьому порту.</li>
                      <li>Далі всі інші порти (ether2-5) роздають інтернет у LAN.</li>
                    </ul>
                  </div>

                  <div className={styles.termRemember}>
                    <h4 className={styles.termRememberTitle}>📌 Запам'ятай просто:</h4>
                    <p className={styles.termRememberText}>
                      <strong>WAN = отримую інтернет → LAN = роздаю інтернет</strong>
                    </p>
                  </div>
                </div>
              )}

              {openModal === 'lan' && (
                <div className={styles.termDetails}>
                  <p className={styles.termMainDefinition}>
                    LAN (Local Area Network) — локальна мережа твоїх пристроїв.
                  </p>
                  
                  <div className={styles.termBullets}>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>LAN — це зона, де твої пристрої «живуть» з локальними IP-адресами (192.168.88.x).</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>В LAN пристрої можуть бачити один одного і обмінюватися файлами.</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Через LAN роутер роздає інтернет усім підключеним пристроям.</span>
                    </div>
                  </div>

                  <div className={styles.termSection}>
                    <h4 className={styles.termSectionTitle}>👉 У MikroTik:</h4>
                    <p className={styles.termSectionText}>
                      Це зазвичай порти ether2–ether5 + Wi-Fi (входять у bridge1).
                    </p>
                  </div>

                  <div className={styles.termRemember}>
                    <h4 className={styles.termRememberTitle}>📌 Запам'ятай просто:</h4>
                    <p className={styles.termRememberText}>
                      <strong>LAN = внутрішня мережа для компів, телефонів, Wi-Fi.</strong>
                    </p>
                  </div>
                </div>
              )}

              {openModal === 'nat' && (
                <div className={styles.termDetails}>
                  <p className={styles.termMainDefinition}>
                    NAT (Network Address Translation) — технологія підміни адрес при виході в Інтернет.
                  </p>
                  
                  <div className={styles.termBullets}>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Всередині LAN у тебе приватні адреси (192.168.x.x).</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Провайдер бачить тільки 1 зовнішню адресу, видану на WAN.</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>NAT «маскує» внутрішні адреси → підміняє їх на адресу WAN.</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Завдяки цьому ти можеш підключити десятки пристроїв до інету через один кабель провайдера.</span>
                    </div>
                  </div>

                  <div className={styles.termSection}>
                    <h4 className={styles.termSectionTitle}>👉 У MikroTik:</h4>
                    <p className={styles.termSectionText}>
                      Найчастіше використовується Masquerade.
                    </p>
                  </div>

                  <div className={styles.termRemember}>
                    <h4 className={styles.termRememberTitle}>📌 Запам'ятай просто:</h4>
                    <p className={styles.termRememberText}>
                      <strong>NAT = дозволяє всім LAN-пристроям сидіти в інеті під однією IP-адресою.</strong>
                    </p>
                  </div>
                </div>
              )}

              {openModal === 'dhcp' && (
                <div className={styles.termDetails}>
                  <p className={styles.termMainDefinition}>
                    DHCP (Dynamic Host Configuration Protocol) — автоматична видача налаштувань мережі пристроям.
                  </p>
                  
                  <div className={styles.termBullets}>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Без DHCP довелося б вручну прописувати IP, маску, шлюз і DNS.</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>DHCP сам «роздає» ці дані кожному пристрою при підключенні:</span>
                    </div>
                  </div>

                  <div className={styles.termSection}>
                    <h4 className={styles.termSectionTitle}>🔄 DHCP роздає:</h4>
                    <ul className={styles.termSectionList}>
                      <li>IP-адресу (192.168.88.10)</li>
                      <li>Маску мережі (255.255.255.0)</li>
                      <li>Шлюз (192.168.88.1)</li>
                      <li>DNS-сервери (8.8.8.8)</li>
                    </ul>
                  </div>

                  <div className={styles.termSection}>
                    <h4 className={styles.termSectionTitle}>👉 У MikroTik:</h4>
                    <p className={styles.termSectionText}>
                      DHCP-сервер запускається на bridge1.
                    </p>
                  </div>

                  <div className={styles.termRemember}>
                    <h4 className={styles.termRememberTitle}>📌 Запам'ятай просто:</h4>
                    <p className={styles.termRememberText}>
                      <strong>DHCP = автоматичний розподіл адрес у локальній мережі.</strong>
                    </p>
                  </div>
                </div>
              )}

              {openModal === 'dns' && (
                <div className={styles.termDetails}>
                  <p className={styles.termMainDefinition}>
                    DNS (Domain Name System) — телефонна книга Інтернету.
                  </p>
                  
                  <div className={styles.termBullets}>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Коли ти вводиш google.com, DNS перетворює його на IP (142.250.186.206).</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Провайдер може давати свої DNS, але зазвичай ставлять публічні:</span>
                    </div>
                  </div>

                  <div className={styles.termSection}>
                    <h4 className={styles.termSectionTitle}>🌐 Популярні DNS-сервери:</h4>
                    <ul className={styles.termSectionList}>
                      <li>8.8.8.8 (Google)</li>
                      <li>1.1.1.1 (Cloudflare)</li>
                    </ul>
                  </div>

                  <div className={styles.termSection}>
                    <h4 className={styles.termSectionTitle}>👉 У MikroTik:</h4>
                    <p className={styles.termSectionText}>
                      Можна задати DNS-сервери в /ip dns.
                    </p>
                  </div>

                  <div className={styles.termSection}>
                    <h4 className={styles.termSectionTitle}>✨ Для чого потрібен DNS:</h4>
                    <p className={styles.termSectionText}>
                      DNS потрібен, щоб заходити на сайти за іменами, а не по IP.
                    </p>
                  </div>

                  <div className={styles.termRemember}>
                    <h4 className={styles.termRememberTitle}>📌 Запам'ятай просто:</h4>
                    <p className={styles.termRememberText}>
                      <strong>DNS = переводить імена сайтів у IP-адреси.</strong>
                    </p>
                  </div>
                </div>
              )}

              {openModal === 'mac' && (
                <div className={styles.termDetails}>
                  <p className={styles.termMainDefinition}>
                    MAC (Media Access Control) — це апаратна адреса, «паспорт» кожного мережевого інтерфейсу.
                  </p>
                  
                  <div className={styles.termBullets}>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Він записаний на заводі у чип карти й не повторюється (майже унікальний).</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Використовується для ідентифікації пристроїв у локальній мережі.</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>За MAC роутер може розрізняти, який пристрій підключений.</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>У MikroTik його видно в колонці Interfaces.</span>
                    </div>
                  </div>

                  <div className={styles.termRemember}>
                    <h4 className={styles.termRememberTitle}>📌 Запам'ятай просто:</h4>
                    <p className={styles.termRememberText}>
                      <strong>MAC = фізична адреса твого порту/пристрою в мережі.</strong>
                    </p>
                  </div>
                </div>
              )}

              {openModal === 'bridge' && (
                <div className={styles.termDetails}>
                  <p className={styles.termMainDefinition}>
                    Bridge — це «міст», який з'єднує кілька інтерфейсів так, щоб вони працювали, як одна мережа.
                  </p>
                  
                  <div className={styles.termBullets}>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Наприклад: ether2, ether3, ether4 → об'єднані у bridge1 → всі пристрої бачать один одного в LAN.</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Без bridge кожен порт був би окремою мережею.</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>У домашніх умовах bridge часто створюють для LAN-портів.</span>
                    </div>
                  </div>

                  <div className={styles.termRemember}>
                    <h4 className={styles.termRememberTitle}>📌 Запам'ятай просто:</h4>
                    <p className={styles.termRememberText}>
                      <strong>Bridge = всі порти в одному «відрі» → одна локальна мережа.</strong>
                    </p>
                  </div>
                </div>
              )}

              {openModal === 'mtu' && (
                <div className={styles.termDetails}>
                  <p className={styles.termMainDefinition}>
                    MTU (Maximum Transmission Unit) визначає, скільки байт може «проскочити» за один раз.
                  </p>
                  
                  <div className={styles.termBullets}>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Якщо пакет більший за MTU → він ріжеться на частини (фрагментація).</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Стандартне значення: 1500 для Ethernet.</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Іноді провайдери або VPN вимагають менше значення (наприклад 1480).</span>
                    </div>
                  </div>

                  <div className={styles.termRemember}>
                    <h4 className={styles.termRememberTitle}>📌 Запам'ятай просто:</h4>
                    <p className={styles.termRememberText}>
                      <strong>MTU = «розмір коробки», в яку пакуються дані при передачі.</strong>
                    </p>
                  </div>
                </div>
              )}

              {openModal === 'ip' && (
                <div className={styles.termDetails}>
                  <p className={styles.termMainDefinition}>
                    IP бувають приватні (LAN: 192.168.x.x, 10.x.x.x) і публічні (видимі в інтернеті).
                  </p>
                  
                  <div className={styles.termBullets}>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Кожен пристрій у мережі має унікальну IP-адресу.</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Роутер зазвичай має дві IP-адреси:</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span><strong>LAN (всередині)</strong> — для локальної мережі (наприклад, 192.168.88.1). Це адреса, через яку твої пристрої з'єднуються з роутером.</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span><strong>WAN (зовнішня)</strong> — яку дає провайдер (наприклад, 185.45.67.89). Це адреса, через яку роутер виходить в інтернет.</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>Кожен пристрій у LAN має свою унікальну IP-адресу в діапазоні роутера (192.168.88.2, 192.168.88.3, тощо).</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span>WAN IP може бути статичною (завжди однакова) або динамічною (змінюється при перезавантаженні).</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span><strong>Маска підмережі</strong> (наприклад, /24 або 255.255.255.0) визначає діапазон IP-адрес у мережі. /24 означає 254 доступних адреси (192.168.88.1 - 192.168.88.254).</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span><strong>Gateway (шлюз)</strong> — це IP роутера (192.168.88.1), через який всі пристрої в LAN виходять в інтернет. Це "двері" між локальною мережею та зовнішнім світом.</span>
                    </div>
                    <div className={styles.termBullet}>
                      <span className={styles.bulletIcon}>🔹</span>
                      <span><strong>DNS-сервери</strong> (наприклад, 8.8.8.8) — це "телефонна книга" для перетворення назв сайтів у IP-адреси.</span>
                    </div>
                  </div>

                  <div className={styles.termRemember}>
                    <h4 className={styles.termRememberTitle}>📌 Запам'ятай просто:</h4>
                    <p className={styles.termRememberText}>
                      <strong>IP = «адреса будинку» в мережі, без нього пристрій не знайдуть.</strong>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MikroTikGeneral
