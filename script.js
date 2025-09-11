document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const mobileThemeToggleButton = document.getElementById('mobile-theme-toggle');
    const themeIcon = document.getElementById('theme-toggle-icon');
    const mobileThemeIcon = document.getElementById('mobile-theme-toggle-icon');
    const root = document.documentElement;

    function applyTheme(theme) {
        if (theme === 'light') {
            root.classList.add('light-mode');
            themeIcon.setAttribute('data-feather', 'moon');
            mobileThemeIcon.setAttribute('data-feather', 'moon');
        } else {
            root.classList.remove('light-mode');
            themeIcon.setAttribute('data-feather', 'sun');
            mobileThemeIcon.setAttribute('data-feather', 'sun');
        }
        feather.replace();
    }

    function toggleTheme() {
        const currentTheme = root.classList.contains('light-mode') ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    }
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    themeToggleButton.addEventListener('click', toggleTheme);
    mobileThemeToggleButton.addEventListener('click', toggleTheme);
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('glass-effect', window.scrollY > 50);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
    document.querySelectorAll('.stagger-children').forEach(container => {
        Array.from(container.children).forEach((child, index) => {
            child.style.setProperty('--stagger-index', index);
        });
    });
});
