import React, { useState } from 'react';
import { MousePointer2 } from 'lucide-react';
import styles from './MapInteractionOverlay.module.css';

const MapInteractionOverlay = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className={styles.overlayContainer}>
      <div className={styles.card}>
        <div className={styles.iconCircle}>
            <MousePointer2 size={24} />
        </div>
        <h3 className={styles.title}>Map Interaction Paused</h3>
        <p className={styles.description}>
            Use the sidebar to navigate different views or close it to resume exploring the map.
        </p>
        <button className={styles.dismissBtn} onClick={() => setVisible(false)}>
            Dismiss Menu
        </button>
      </div>
    </div>
  );
};

export default MapInteractionOverlay;
