document.addEventListener('DOMContentLoaded', () => {
    const island = document.getElementById('dynamic-island');
    
    if (!island) return;

    // Toggle expansion on click
    island.addEventListener('click', () => {
        island.classList.toggle('expanded');
    });

    // Function to show a "notification" in the island
    window.showIslandNotification = (title, subtitle, iconHtml, autoCollapse = true) => {
        const titleEl = island.querySelector('.island-title');
        const subtitleEl = island.querySelector('.island-subtitle');
        const leftIcon = island.querySelector('.island-left');

        titleEl.textContent = title;
        subtitleEl.textContent = subtitle;
        if (iconHtml) leftIcon.innerHTML = iconHtml;

        island.classList.add('expanded');
        island.classList.add('island-notification');

        if (autoCollapse) {
            // Auto collapse after 4 seconds
            setTimeout(() => {
                if (!island.classList.contains('manual-expand')) {
                    island.classList.remove('expanded');
                    island.classList.remove('island-notification');
                }
            }, 4000);
        }
    };

    // Hover Interaction
    island.addEventListener('mouseenter', () => {
        island.classList.add('manual-expand');
        window.showIslandNotification(
            'Hire Me',
            'Open for collaboration',
            `<svg class="island-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>`,
            false
        );
    });

    // Notifications after unlock
    document.addEventListener('unlock', () => {
        setTimeout(() => {
            window.showIslandNotification(
                'Hire Me',
                'Open for collaboration',
                `<svg class="island-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>`,
                false // Stay expanded
            );
        }, 1200);
    });
});
