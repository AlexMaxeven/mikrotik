import styles from './AdditionalSettings2.module.css'

function AdditionalSettings2() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>🚀 Додаткові налаштування - Частина 2</h1>
      <p className={styles.description}>
        Просунуті налаштування для оптимізації та розширених функцій MikroTik:
      </p>
      
      <div className={styles.settingsGrid}>
        <div className={styles.settingsCategory}>
          <h3 className={styles.categoryTitle}>⚡ Оптимізація та продуктивність</h3>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🚦</span>
              <div className={styles.settingContent}>
                <strong>QoS та Traffic Shaping</strong>
                <p>Управління пріоритетами трафіку та швидкістю</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>⚖️</span>
              <div className={styles.settingContent}>
                <strong>Load Balancing</strong>
                <p>Розподіл навантаження між кількома провайдерами</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🔄</span>
              <div className={styles.settingContent}>
                <strong>Failover налаштування</strong>
                <p>Автоматичне переключення на резервний канал</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>📶</span>
              <div className={styles.settingContent}>
                <strong>Wi-Fi оптимізація</strong>
                <p>Налаштування каналів та потужності сигналу</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>📊</span>
              <div className={styles.settingContent}>
                <strong>Bandwidth Control</strong>
                <p>Контроль пропускної здатності для користувачів</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.settingsCategory}>
          <h3 className={styles.categoryTitle}>🔧 Розширені функції</h3>
          <div className={styles.settingsList}>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>📡</span>
              <div className={styles.settingContent}>
                <strong>Multicast налаштування</strong>
                <p>Конфігурація групового трафіку для медіа</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>📝</span>
              <div className={styles.settingContent}>
                <strong>Custom Scripts</strong>
                <p>Створення власних скриптів для автоматизації</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>⏰</span>
              <div className={styles.settingContent}>
                <strong>Scheduler налаштування</strong>
                <p>Планування виконання завдань за розкладом</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>🔗</span>
              <div className={styles.settingContent}>
                <strong>Зовнішні системи</strong>
                <p>Інтеграція з системами моніторингу та управління</p>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingIcon}>💾</span>
              <div className={styles.settingContent}>
                <strong>Backup та Restore</strong>
                <p>Створення резервних копій та відновлення налаштувань</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdditionalSettings2
