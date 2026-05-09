document.addEventListener('DOMContentLoaded', () => {
    const island = document.getElementById('dynamic-island');
    
    if (!island) return;

    // Toggle expansion on click
    island.addEventListener('click', () => {
        island.classList.toggle('expanded');
    });

    // Function to show a "notification" in the island
    window.showIslandNotification = (title, subtitle, iconHtml) => {
        const center = island.querySelector('.island-center');
        const titleEl = island.querySelector('.island-title');
        const subtitleEl = island.querySelector('.island-subtitle');
        const leftIcon = island.querySelector('.island-left');

        titleEl.textContent = title;
        subtitleEl.textContent = subtitle;
        if (iconHtml) leftIcon.innerHTML = iconHtml;

        island.classList.add('expanded');
        island.classList.add('island-notification');

        // Auto collapse after 3 seconds
        setTimeout(() => {
            island.classList.remove('expanded');
            island.classList.remove('island-notification');
        }, 4000);
    };

    // Simulate a welcome notification after unlock
    document.addEventListener('unlock', () => {
        setTimeout(() => {
            window.showIslandNotification(
                'Welcome Back',
                'Your portfolio is ready.',
                `<svg class="island-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
            );
        }, 1000);
    });
});
