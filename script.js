document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // HOME PAGE LOGIC
    // ==========================================
    if (document.body.classList.contains('home-page')) {
        console.log("SMK Studio Portfolio Initialized.");
        // The marquee animation is handled entirely by CSS.
        // Add any future homepage-specific JavaScript here.
    }

    // ==========================================
    // ENQUIRE PAGE LOGIC
    // ==========================================
    const form = document.getElementById('enquireForm');

    if (form) {
        const textareas = document.querySelectorAll('textarea');

        // Auto-resize textarea based on user input
        textareas.forEach(textarea => {
            textarea.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
        });

        // Handle form submission via AJAX/Fetch
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent standard page reload

            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            const formData = new FormData(this);

            // Visual loading state
            submitBtn.textContent = '...';

            fetch('process_enquiry.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (response.ok) {
                        // Success visual feedback
                        submitBtn.textContent = 'SENT';
                        submitBtn.style.backgroundColor = '#120202';

                        // Reset form and button after 3 seconds
                        setTimeout(() => {
                            submitBtn.textContent = originalText;
                            submitBtn.style.backgroundColor = ''; // Clears inline style so CSS hover works again
                            form.reset();
                        }, 3000);
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .catch(error => {
                    // Error visual feedback
                    submitBtn.textContent = 'ERROR';
                    submitBtn.style.backgroundColor = 'red';

                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.backgroundColor = '';
                    }, 3000);
                });
        });
    }
});

// ==========================================
// WORK PAGE LOGIC (Multi-Speed Parallax)
// ==========================================
if (document.body.classList.contains('work-page')) {
    const columns = document.querySelectorAll('.parallax-col');
    let scrollY = window.scrollY;

    // Listen for scroll and update variable
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    // Animation loop for buttery smooth rendering
    function smoothScroll() {
        // Only apply parallax on desktop/tablet (disables on mobile for better UX)
        if (window.innerWidth > 768) {
            columns.forEach(col => {
                const speed = parseFloat(col.getAttribute('data-speed'));
                // Calculate offset: A positive speed moves it slower, negative moves it faster
                const yOffset = scrollY * speed;
                col.style.transform = `translate3d(0, ${yOffset}px, 0)`;
            });
        } else {
            // Reset transforms on mobile
            columns.forEach(col => {
                col.style.transform = `translate3d(0, 0, 0)`;
            });
        }

        requestAnimationFrame(smoothScroll);
    }

    smoothScroll();
}

// ==========================================
// LIGHTBOX LOGIC (For Case Studies)
// ==========================================
const lightbox = document.getElementById('lightboxModal');

if (lightbox) {
    const lightboxImg = document.getElementById('lightboxImage');
    const triggers = document.querySelectorAll('.lightbox-trigger');
    const closeBtn = document.querySelector('.lightbox-close');

    // Open Lightbox
    triggers.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = 'flex';
            lightbox.style.flexDirection = 'column';
            lightbox.style.justifyContent = 'center';
            lightboxImg.src = this.src;
            document.body.style.overflow = 'hidden'; // Lock background scroll
        });
    });

    // Close Lightbox Function
    const closeModal = () => {
        lightbox.style.display = 'none';
        lightboxImg.src = ''; // Clear image memory
        document.body.style.overflow = 'auto'; // Restore background scroll
    };

    // Close on 'X' click
    closeBtn.addEventListener('click', closeModal);

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target !== lightboxImg) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && lightbox.style.display === 'flex') {
            closeModal();
        }
    });
}