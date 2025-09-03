document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.buy-button');
    const backToTopButton = document.getElementById('back-to-top');
    const navButtons = document.querySelectorAll('.category-nav a');
    const stickyNav = document.querySelector('.category-nav');

    // Button "pressed" effect
    buyButtons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.classList.add('clicked');
        });
        button.addEventListener('mouseup', () => {
            button.classList.remove('clicked');
        });
        button.addEventListener('mouseleave', () => {
            button.classList.remove('clicked');
        });
    });

    // Back to Top button functionality
    function toggleBackToTopButton() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    }

    window.addEventListener('scroll', toggleBackToTopButton);
    window.addEventListener('load', toggleBackToTopButton);
    window.addEventListener('resize', toggleBackToTopButton);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scroll for category navigation
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = stickyNav.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
