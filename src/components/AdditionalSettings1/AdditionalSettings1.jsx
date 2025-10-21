import styles from './AdditionalSettings1.module.css'

function AdditionalSettings1() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>🔒 Додаткові налаштування</h1>
      <p className={styles.description}>
        Розширені налаштування VPN та мережевих з'єднань MikroTik:
      </p>
      
      <div className={styles.settingsGrid}>
        <div className={styles.settingsCategory}>
          <h3 className={styles.categoryTitle}>🔐 L2TP + IPSec</h3>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🛡️</span>
              <div className={styles.settingContent}>
                <strong>IPSec налаштування</strong>
                <p>Конфігурація шифрування для безпечного з'єднання</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🔑</span>
              <div className={styles.settingContent}>
                <strong>Pre-shared Key</strong>
                <p>Встановлення секретного ключа для автентифікації</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🌐</span>
              <div className={styles.settingContent}>
                <strong>L2TP Server</strong>
                <p>Налаштування сервера для віртуальних приватних мереж</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>👥</span>
              <div className={styles.settingContent}>
                <strong>User Management</strong>
                <p>Створення користувачів для VPN доступу</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.settingsCategory}>
          <h3 className={styles.categoryTitle}>🔒 SSTP з'єднання</h3>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>📜</span>
              <div className={styles.settingContent}>
                <strong>SSL Certificate</strong>
                <p>Налаштування SSL сертифікатів для SSTP</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🔐</span>
              <div className={styles.settingContent}>
                <strong>SSTP Server</strong>
                <p>Конфігурація SSTP сервера з SSL шифруванням</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🌍</span>
              <div className={styles.settingContent}>
                <strong>Port Configuration</strong>
                <p>Налаштування портів для SSTP з'єднань</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>⚡</span>
              <div className={styles.settingContent}>
                <strong>Performance Tuning</strong>
                <p>Оптимізація продуктивності SSTP з'єднань</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.settingsCategory}>
          <h3 className={styles.categoryTitle}>📡 ROMON</h3>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🔍</span>
              <div className={styles.settingContent}>
                <strong>Remote Monitoring</strong>
                <p>Віддалений моніторинг та управління пристроями</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>📊</span>
              <div className={styles.settingContent}>
                <strong>System Information</strong>
                <p>Отримання інформації про стан системи</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>⚙️</span>
              <div className={styles.settingContent}>
                <strong>Configuration Backup</strong>
                <p>Автоматичне створення резервних копій</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🔄</span>
              <div className={styles.settingContent}>
                <strong>Auto Recovery</strong>
                <p>Автоматичне відновлення після збоїв</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.settingsCategory}>
          <h3 className={styles.categoryTitle}>🔗 EOIP</h3>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🌐</span>
              <div className={styles.settingContent}>
                <strong>Ethernet over IP</strong>
                <p>Створення віртуальних Ethernet з'єднань через IP</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🔧</span>
              <div className={styles.settingContent}>
                <strong>Tunnel Configuration</strong>
                <p>Налаштування тунелів між віддаленими мережами</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>📡</span>
              <div className={styles.settingContent}>
                <strong>Bridge Integration</strong>
                <p>Інтеграція EOIP з bridge інтерфейсами</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🛡️</span>
              <div className={styles.settingContent}>
                <strong>Security Settings</strong>
                <p>Налаштування безпеки для EOIP з'єднань</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdditionalSettings1
