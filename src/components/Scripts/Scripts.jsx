import { useState } from 'react'
import styles from './Scripts.module.css'

function Scripts() {
  const [expandedScripts, setExpandedScripts] = useState([])

  const toggleScript = (scriptId) => {
    setExpandedScripts(prev => {
      if (prev.includes(scriptId)) {
        return prev.filter(item => item !== scriptId)
      } else {
        return [...prev, scriptId]
      }
    })
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>📜 Скрипти для MikroTik</h1>
      
      <p className={styles.description}>
        Корисні скрипти для автоматизації налаштувань та управління роутером MikroTik.
      </p>

      <div className={styles.scriptsContainer}>
        {/* Скрипт для резервного копіювання */}
        <div className={styles.scriptCard}>
          <div className={styles.scriptHeader}>
            <span className={styles.scriptIcon}>💾</span>
            <h3 className={styles.scriptName}>Резервне копіювання</h3>
          </div>
          <p className={styles.scriptDescription}>
            Автоматичне створення backup файлу конфігурації роутера.
          </p>
          <div className={styles.scriptNote}>
            <span className={styles.noteIcon}>👉</span>
            <span>Виконується щодня о 02:00, зберігає файл на FTP сервер.</span>
          </div>
          <button 
            className={styles.detailsButton}
            onClick={() => toggleScript('backup')}
          >
            📖 {expandedScripts.includes('backup') ? 'Згорнути' : 'Детальніше'}
          </button>
          {expandedScripts.includes('backup') && (
            <div className={`${styles.scriptContent} ${styles.open}`}>
              <div className={styles.scriptDetails}>
                <h4 className={styles.scriptTitle}>Скрипт резервного копіювання:</h4>
                <div className={styles.codeBlock}>
                  <code>
{`# Скрипт для автоматичного backup
/system script add name="backup-script" source={
    /system backup save name=("backup-" . [/system clock get date])
    /tool fetch url="ftp://user:pass@server.com/backups/" upload=yes src-file=("backup-" . [/system clock get date] . ".backup")
}

# Додати в scheduler
/system scheduler add name="daily-backup" interval=1d on-event="backup-script" start-time=02:00:00`}
                  </code>
                </div>
                <div className={styles.scriptInfo}>
                  <h5>Як використовувати:</h5>
                  <ul>
                    <li>Замініть "user:pass@server.com" на свої дані FTP</li>
                    <li>Скрипт автоматично запускається щодня о 02:00</li>
                    <li>Backup файли зберігаються з датою в назві</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Скрипт для моніторингу інтернету */}
        <div className={styles.scriptCard}>
          <div className={styles.scriptHeader}>
            <span className={styles.scriptIcon}>🌐</span>
            <h3 className={styles.scriptName}>Моніторинг інтернету</h3>
          </div>
          <p className={styles.scriptDescription}>
            Перевірка доступності інтернету та автоматичний перезапуск інтерфейсу.
          </p>
          <div className={styles.scriptNote}>
            <span className={styles.noteIcon}>👉</span>
            <span>Перевіряє пінг до Google DNS кожні 5 хвилин.</span>
          </div>
          <button 
            className={styles.detailsButton}
            onClick={() => toggleScript('monitor')}
          >
            📖 {expandedScripts.includes('monitor') ? 'Згорнути' : 'Детальніше'}
          </button>
          {expandedScripts.includes('monitor') && (
            <div className={`${styles.scriptContent} ${styles.open}`}>
              <div className={styles.scriptDetails}>
                <h4 className={styles.scriptTitle}>Скрипт моніторингу:</h4>
                <div className={styles.codeBlock}>
                  <code>
{`# Скрипт моніторингу інтернету
/system script add name="internet-monitor" source={
    :local pingResult [/ping 8.8.8.8 count=3]
    :if ($pingResult = 0) do={
        :log warning "Internet connection lost, restarting interface"
        /interface disable ether1
        :delay 5s
        /interface enable ether1
    }
}

# Додати в scheduler
/system scheduler add name="internet-check" interval=5m on-event="internet-monitor"`}
                  </code>
                </div>
                <div className={styles.scriptInfo}>
                  <h5>Функції скрипту:</h5>
                  <ul>
                    <li>Пінг до Google DNS (8.8.8.8)</li>
                    <li>Автоматичний перезапуск інтерфейсу при втраті з'єднання</li>
                    <li>Логування подій в системний журнал</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Скрипт для очищення логів */}
        <div className={styles.scriptCard}>
          <div className={styles.scriptHeader}>
            <span className={styles.scriptIcon}>🧹</span>
            <h3 className={styles.scriptName}>Очищення логів</h3>
          </div>
          <p className={styles.scriptDescription}>
            Автоматичне очищення старих записів з системних логів.
          </p>
          <div className={styles.scriptNote}>
            <span className={styles.noteIcon}>👉</span>
            <span>Видаляє логи старші за 7 днів щотижня.</span>
          </div>
          <button 
            className={styles.detailsButton}
            onClick={() => toggleScript('cleanup')}
          >
            📖 {expandedScripts.includes('cleanup') ? 'Згорнути' : 'Детальніше'}
          </button>
          {expandedScripts.includes('cleanup') && (
            <div className={`${styles.scriptContent} ${styles.open}`}>
              <div className={styles.scriptDetails}>
                <h4 className={styles.scriptTitle}>Скрипт очищення:</h4>
                <div className={styles.codeBlock}>
                  <code>
{`# Скрипт очищення логів
/system script add name="log-cleanup" source={
    :local currentTime [/system clock get time]
    :local weekAgo ($currentTime - 7d)
    
    /log print info message="Starting log cleanup"
    /log remove [find time < $weekAgo]
    /log print info message="Log cleanup completed"
}

# Додати в scheduler
/system scheduler add name="weekly-cleanup" interval=7d on-event="log-cleanup" start-time=03:00:00`}
                  </code>
                </div>
                <div className={styles.scriptInfo}>
                  <h5>Що робить скрипт:</h5>
                  <ul>
                    <li>Видаляє логи старші за 7 днів</li>
                    <li>Запускається щотижня о 03:00</li>
                    <li>Логує процес очищення</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Скрипт для блокування підозрілих IP */}
        <div className={styles.scriptCard}>
          <div className={styles.scriptHeader}>
            <span className={styles.scriptIcon}>🛡️</span>
            <h3 className={styles.scriptName}>Блокування підозрілих IP</h3>
          </div>
          <p className={styles.scriptDescription}>
            Автоматичне блокування IP адрес, які роблять підозрілі запити.
          </p>
          <div className={styles.scriptNote}>
            <span className={styles.noteIcon}>👉</span>
            <span>Блокує IP після 10 невдалих спроб підключення за хвилину.</span>
          </div>
          <button 
            className={styles.detailsButton}
            onClick={() => toggleScript('block')}
          >
            📖 {expandedScripts.includes('block') ? 'Згорнути' : 'Детальніше'}
          </button>
          {expandedScripts.includes('block') && (
            <div className={`${styles.scriptContent} ${styles.open}`}>
              <div className={styles.scriptDetails}>
                <h4 className={styles.scriptTitle}>Скрипт блокування:</h4>
                <div className={styles.codeBlock}>
                  <code>
{`# Скрипт блокування підозрілих IP
/system script add name="block-suspicious" source={
    :local suspiciousIPs [/log find where message~"connection reset"]
    :foreach ip in=$suspiciousIPs do={
        :local count [/log find where message~$ip and time > ([/system clock get time] - 1m)]
        :if ($count > 10) do={
            /ip firewall address-list add address=$ip list="blocked" timeout=1h
            :log warning ("Blocked suspicious IP: " . $ip)
        }
    }
}

# Додати в scheduler
/system scheduler add name="security-check" interval=1m on-event="block-suspicious"`}
                  </code>
                </div>
                <div className={styles.scriptInfo}>
                  <h5>Логіка роботи:</h5>
                  <ul>
                    <li>Аналізує логи на предмет підозрілої активності</li>
                    <li>Блокує IP з більш ніж 10 невдалими спробами за хвилину</li>
                    <li>Блокування діє 1 годину</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Скрипт для оновлення gateway */}
        <div className={styles.scriptCard}>
          <div className={styles.scriptHeader}>
            <span className={styles.scriptIcon}>🔄</span>
            <h3 className={styles.scriptName}>Оновлення Gateway</h3>
          </div>
          <p className={styles.scriptDescription}>
            Автоматичне оновлення gateway в роут-листі відповідно до поточного DHCP gateway.
          </p>
          <div className={styles.scriptNote}>
            <span className={styles.noteIcon}>👉</span>
            <span>Оновлює gateway для роуту з коментарем "ISP1_dhcp_route" з поточного DHCP gateway.</span>
          </div>
          <button 
            className={styles.detailsButton}
            onClick={() => toggleScript('gateway')}
          >
            📖 {expandedScripts.includes('gateway') ? 'Згорнути' : 'Детальніше'}
          </button>
          {expandedScripts.includes('gateway') && (
            <div className={`${styles.scriptContent} ${styles.open}`}>
              <div className={styles.scriptDetails}>
                <h4 className={styles.scriptTitle}>Скрипт оновлення gateway:</h4>
                <div className={styles.codeBlock}>
                  <code>
{`# Оновлення gateway в роут-листі
/ip route set [find where comment="ISP1_dhcp_route"] gateway=[/ip dhcp-client get [find where interface="ether1"] gateway]

# Або як скрипт для автоматичного виконання
/system script add name="update-gateway" source={
    /ip route set [find where comment="ISP1_dhcp_route"] gateway=[/ip dhcp-client get [find where interface="ether1"] gateway]
    :log info "Gateway updated for ISP1_dhcp_route"
}

# Додати в scheduler для регулярного оновлення
/system scheduler add name="gateway-update" interval=10m on-event="update-gateway"`}
                  </code>
                </div>
                <div className={styles.scriptInfo}>
                  <h5>Як працює скрипт:</h5>
                  <ul>
                    <li>Знаходить роут з коментарем "ISP1_dhcp_route"</li>
                    <li>Отримує поточний gateway з DHCP клієнта на ether1</li>
                    <li>Оновлює gateway для знайденого роуту</li>
                    <li>Може запускатися автоматично кожні 10 хвилин</li>
                  </ul>
                </div>
                <div className={styles.scriptInfo}>
                  <h5>Коли використовувати:</h5>
                  <ul>
                    <li>При зміні провайдера або його налаштувань</li>
                    <li>Для автоматичного оновлення gateway при DHCP змінах</li>
                    <li>При налаштуванні резервного інтернету</li>
                    <li>Для синхронізації роутів з поточним DHCP</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Scripts