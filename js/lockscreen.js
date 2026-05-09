document.addEventListener('DOMContentLoaded', () => {
    const lockScreen = document.getElementById('lock-screen');
    const lockTime = document.getElementById('lock-time');
    const lockDate = document.getElementById('lock-date');
    const unlockHint = document.getElementById('unlock-hint');

    // Update time and date
    const updateLockClock = () => {
        const now = new Date();
        
        // Time
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        hours = hours % 12 || 12;
        lockTime.textContent = `${hours}:${minutes}`;

        // Date
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        lockDate.textContent = now.toLocaleDateString(undefined, options);
    };

    updateLockClock();
    setInterval(updateLockClock, 1000);

    // Unlock function
    const unlock = () => {
        lockScreen.classList.add('unlocked');
        
        // Enable scrolling on body
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 800);
        
        if (window.navigator.vibrate) {
            window.navigator.vibrate(10);
        }
        
        document.dispatchEvent(new CustomEvent('unlock'));
    };

    // Lock function (exposed globally)
    window.lockDevice = () => {
        lockScreen.classList.remove('unlocked');
        document.body.style.overflow = 'hidden';
        
        if (window.navigator.vibrate) {
            window.navigator.vibrate([10, 30, 10]);
        }
        
        document.dispatchEvent(new CustomEvent('lock'));
    };

    // Unlock on click/tap
    unlockHint.addEventListener('click', unlock);

    // Unlock on swipe up (basic implementation)
    let touchStartY = 0;
    lockScreen.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    lockScreen.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        if (touchStartY - touchEndY > 100) { // Swipe up distance
            unlock();
        }
    }, { passive: true });

    // Optional: Allow spacebar or enter to unlock
    window.addEventListener('keydown', (e) => {
        if (!lockScreen.classList.contains('unlocked')) {
            if (e.key === ' ' || e.key === 'Enter') {
                unlock();
            }
        }
    });

    // Disable scrolling while locked
    document.body.style.overflow = 'hidden';
});
