import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './MatchingModal.module.css';


const leftFieldsData = [
    { id: 'left-1', name: 'نام' },
    { id: 'left-2', name: 'نام خانوادگی' },
    { id: 'left-3', name: 'شماره تماس' },
    { id: 'left-4', name: 'کد ملی' },
    { id: 'left-5', name: 'نام پدر' },
    { id: 'left-6', name: 'آدرس' },
    { id: 'left-7', name: 'کد پستی' },
    { id: 'left-8', name: 'پایه' },
    { id: 'left-9', name: 'رشته' },
    { id: 'left-10', name: 'تاریخ تولد' },
];

const rightFieldsData = [
    { id: 'right-1', name: 'نام' },
    { id: 'right-2', name: 'نام خانوادگی' },
    { id: 'right-3', name: 'شماره تماس' },
    { id: 'right-4', name: 'کد ملی' },
    { id: 'right-5', name: 'نام پدر' },
    { id: 'right-6', name: 'آدرس' },
    { id: 'right-7', name: 'کد پستی' },
    { id: 'right-8', name: 'پایه' },
    { id: 'right-9', name: 'رشته' },
    { id: 'right-10', name: 'تاریخ تولد' },
];

const MatchingModal = ({ isOpen, onClose, onSave }) => {
  
    const [leftFields, setLeftFields] = useState(leftFieldsData);
    const [rightFields, setRightFields] = useState(rightFieldsData);
    const [connections, setConnections] = useState([]);
    const [connectingField, setConnectingField] = useState(null);

    const svgRef = useRef(null);
    const containerRef = useRef(null);


    const removeConnection = (connectionId) => {
        setConnections(prevConnections => prevConnections.filter(conn => conn.id !== connectionId));
    };


    const drawLines = useCallback(() => {
        if (!svgRef.current || !containerRef.current) return;

        const svgElement = svgRef.current;
        const containerRect = containerRef.current.getBoundingClientRect();
        
        svgElement.innerHTML = '';

        connections.forEach(conn => {
            const leftElement = document.getElementById(`field-${conn.from.id}`);
            const rightElement = document.getElementById(`field-${conn.to.id}`);

            if (leftElement && rightElement) {
                const leftRect = leftElement.querySelector(`.${styles['connect-button']}`).getBoundingClientRect();
                const rightRect = rightElement.querySelector(`.${styles['connect-button']}`).getBoundingClientRect();

                const x1 = leftRect.right - containerRect.left;
                const y1 = leftRect.top + leftRect.height / 2 - containerRect.top;
                const x2 = rightRect.left - containerRect.left;
                const y2 = rightRect.top + rightRect.height / 2 - containerRect.top;

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', x1);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y2);
                line.setAttribute('stroke', '#69b0b2');
                line.setAttribute('stroke-width', '2');
                line.setAttribute('class', styles['connection-line']);
                
                const pathId = `${conn.from.id}-${conn.to.id}`;
                line.setAttribute('data-path-id', pathId);

                line.addEventListener('click', () => removeConnection(pathId));

                svgElement.appendChild(line);
            }
        });
    }, [connections, styles]); 


    useEffect(() => {
        if (isOpen) {
            drawLines();
            window.addEventListener('resize', drawLines);
        }
        
        return () => {
            window.removeEventListener('resize', drawLines);
        };
    }, [connections, drawLines, isOpen]); // isOpen is added to dependencies because it's checked inside the effect

   
    if (!isOpen) return null;


    const handleLeftFieldClick = (field) => {
        if (connections.some(conn => conn.from.id === field.id)) {
            return;
        }
        setConnectingField(field);
    };

    const handleRightFieldClick = (field) => {
        if (!connectingField || connections.some(conn => conn.to.id === field.id)) {
            return;
        }

        const newConnection = {
            id: `${connectingField.id}-${field.id}`,
            from: connectingField,
            to: field,
        };
        setConnections(prevConnections => [...prevConnections, newConnection]);
        setConnectingField(null);
    };

   
    return (
        <div className={styles['modal-overlay']} onClick={onClose}>
            <div className={styles['modal-container']} onClick={e => e.stopPropagation()}>
                <div className={styles['modal-header']}>
                    <div className={styles['modal-header-text']}>
                       <button className={styles['close-button']} onClick={onClose}>&times;</button>
                        <h2>سربرگ‌ها را به یکدیگر وصل کنید</h2>
                        <p>به دلیل اینکه اشتباهی در لیست‌ها و آمار به وجود نیاید، سربرگ‌های سبز رنگ را به هم نامشان وصل کنید.</p>
                    </div>
                    <button className={styles['info-button']}>راهنما</button>
                </div>

                <div className={styles['modal-body']} ref={containerRef}>

                    <div className={styles['field-list-right']}>
                        {rightFields.map(field => (
                            <div
                                key={field.id}
                                id={`field-${field.id}`}
                                className={`${styles['field-item']} ${connections.some(c => c.to.id === field.id) ? styles.connected : ''}`}
                                onClick={() => handleRightFieldClick(field)}
                            >
                                <span className={styles['field-name']}>{field.name}</span>
                                <div className={`${styles['connect-button']} ${styles.right}`}></div>
                            </div>
                        ))}
                    </div>
                    <div className={styles['field-list-left']}>
                        {leftFields.map(field => (
                            <div
                                key={field.id}
                                id={`field-${field.id}`}
                                className={`${styles['field-item']} ${connectingField?.id === field.id ? styles.connectingg : ''} ${connections.some(c => c.from.id === field.id) ? styles.connectedd : ''}`}
                                onClick={() => handleLeftFieldClick(field)}
                            >
                                <span className={styles['field-name']}>{field.name}</span>
                                <button className={`${styles['connect-button']} ${styles.left}`}>+</button>
                            </div>
                        ))}
                    </div>

                    <div className={styles['connection-area']}>
                        <svg className={styles['connection-svg']} ref={svgRef}></svg>
                    </div>

                    
                </div>
      
                    <button className={styles['save-button']} onClick={() => onSave(connections)}>ثبت</button>
           
            </div>
        </div>
    );
};

export default MatchingModal;