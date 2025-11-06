document.addEventListener('DOMContentLoaded', function() {
    // โค้ดส่วน Mobile Menu Toggle เดิม...
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('.nav');
    
    if (menuIcon && nav) {
        menuIcon.addEventListener('click', function() {
            nav.classList.toggle('open');
            document.body.classList.toggle('menu-active'); 
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    document.body.classList.remove('menu-active');
                }
            });
        });
    }

    // --- Smooth Scroll & Page Switcher for ALL internal links ---
    // UPDATED: อ้างอิงถึงส่วนรายการสถานที่ท่องเที่ยว ร้านอาหาร และติดต่อเรา
    const tourSection = document.getElementById('location-section-tour'); 
    const restaurantSection = document.getElementById('location-section-restaurant'); 
    const contactSection = document.getElementById('contact-section'); 
    
    // UPDATED: อ้างอิงถึงส่วนอื่น ๆ ที่ต้องการซ่อนเมื่อกด View
    const heroSection = document.querySelector('.hero');
    // UPDATED: อ้างอิงถึง Hero Image ของแต่ละส่วน
    const tourHero = document.getElementById('tour-hero');
    const restaurantHero = document.getElementById('restaurant-hero');
    const contactHero = document.getElementById('contact-hero'); // UPDATED: เพิ่ม contactHero
    const ctaSection = document.querySelector('.call-to-action-section');
    
    // NEW: กำหนด CSS Variable สำหรับ Parallax Background ของส่วนรายการและติดต่อ
    if (tourSection && tourSection.getAttribute('data-bg-image')) {
        tourSection.style.setProperty('--bg-url', `url(${tourSection.getAttribute('data-bg-image')})`);
    }
    if (restaurantSection && restaurantSection.getAttribute('data-bg-image')) {
        restaurantSection.style.setProperty('--bg-url', `url(${restaurantSection.getAttribute('data-bg-image')})`);
    }
    if (contactSection && contactSection.getAttribute('data-bg-image')) { 
        contactSection.style.setProperty('--bg-url', `url(${contactSection.getAttribute('data-bg-image')})`);
    }


    /**
     * @function showHomePage
     * @description แสดงส่วนหลัก (Hero, Hero Images, CTA) และซ่อนส่วนรายการสถานที่/ติดต่อ
     */
    function showHomePage() {
        // ซ่อนส่วนรายการก่อนที่จะแสดงส่วนหลัก
        if (tourSection) tourSection.style.display = 'none'; 
        if (restaurantSection) restaurantSection.style.display = 'none'; 
        if (contactSection) contactSection.style.display = 'none'; 
        
        // ให้เวลาเล็กน้อยเพื่อให้ Transition ของส่วนรายการทำงาน
        setTimeout(() => {
            if (heroSection) heroSection.style.display = 'flex'; 
            if (tourHero) tourHero.style.display = 'flex';       
            if (restaurantHero) restaurantHero.style.display = 'flex'; 
            if (contactHero) contactHero.style.display = 'flex'; // UPDATED: แสดง contactHero
            if (ctaSection) ctaSection.style.display = 'flex';   
        }, 100); // 100ms delay 
        
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }

    /**
     * @function showContentSection
     * @description ซ่อนส่วนหลักและแสดงส่วนรายการสถานที่/ติดต่อตามที่ระบุ
     * @param {HTMLElement} targetSection - ส่วนเนื้อหาที่ต้องการแสดง
     */
    function showContentSection(targetSection) { 
        if (targetSection) {
            // ซ่อนส่วนหลัก
            if (heroSection) heroSection.style.display = 'none';
            if (tourHero) tourHero.style.display = 'none';
            if (restaurantHero) restaurantHero.style.display = 'none';
            if (contactHero) contactHero.style.display = 'none'; // UPDATED: ซ่อน contactHero
            if (ctaSection) ctaSection.style.display = 'none'; 
            
            // ซ่อนส่วนรายการอื่น ๆ
            if (tourSection) tourSection.style.display = 'none'; 
            if (restaurantSection) restaurantSection.style.display = 'none';
            if (contactSection) contactSection.style.display = 'none'; 

            // แสดงส่วนที่ต้องการ (Opacity จะถูกจัดการโดย CSS Transition)
            targetSection.style.display = 'flex'; 
            
            // เลื่อนไปที่ส่วนนั้น
            window.scrollTo({
                top: targetSection.offsetTop - 80, 
                behavior: 'smooth' 
            });
        }
    }
    
    // UPDATED: ตัวจัดการ Back to Home
    document.querySelectorAll('.back-to-home-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showHomePage();
        });
    });


    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href'); 
            const targetSection = document.querySelector(targetId);

            // UPDATED: ตรวจสอบว่าลิงก์นี้เป็นปุ่ม 'View' หรือไม่ (เพิ่ม view-contact)
            if (this.classList.contains('view-tour') || this.classList.contains('view-restaurant') || this.classList.contains('view-contact')) {
                e.preventDefault(); 
                
                if (targetId === '#location-section-tour') {
                    showContentSection(tourSection);
                } else if (targetId === '#location-section-restaurant') {
                    showContentSection(restaurantSection);
                } else if (targetId === '#contact-section') { // UPDATED: จัดการการคลิกปุ่ม View ของ Contact
                    showContentSection(contactSection);
                }
                return; 
            }

            // ตรวจสอบว่าลิงก์นี้เป็นส่วนหนึ่งของรายการสถานที่/ร้านอาหารหรือไม่ 
            if (this.closest('#locationList') || this.closest('#restaurantList')) {
                return; 
            }
            
            // Smooth Scroll เดิม (สำหรับลิงก์ NAV ที่ไม่ใช่ View)
            e.preventDefault();
            
            if (targetSection) {
                // ถ้าเป็นลิงก์ใน Nav Bar (สถานที่ท่องเที่ยว, ร้านอาหารแนะนำ, หรือ ติดต่อเรา)
                if (targetId === '#location-section-tour') {
                    showContentSection(tourSection);
                } else if (targetId === '#location-section-restaurant') {
                    showContentSection(restaurantSection);
                } else if (targetId === '#contact-section') { 
                    showContentSection(contactSection);
                } else {
                    // Smooth Scroll ธรรมดาสำหรับส่วนอื่น ๆ
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, 
                        behavior: 'smooth' 
                    });
                }
            }
        });
    });


    // --- Modal Functionality (Login, Detail, Search) ---
    // ตัวแปร Modal
    const loginModal = document.getElementById('loginModal');
    const detailModal = document.getElementById('detailModal');
    const searchModal = document.getElementById('searchModal'); 

    // ตัวแปรปุ่มและฟอร์ม
    const loginForm = document.getElementById('loginForm');
    const searchForm = document.getElementById('searchForm');
    const contactForm = document.getElementById('contactForm'); 
    const accountToggle = document.getElementById('accountToggle'); 
    const searchToggle = document.getElementById('searchToggle');

    // ตัวแปรสำหรับ Detail Modal
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('modalDetails');
    const modalImage = document.getElementById('modalImage');

    // ตัวแปรปุ่มปิด (X)
    const loginCloseBtn = document.querySelector('#loginModal .close-btn');
    const detailCloseBtn = document.querySelector('#detailModal .close-btn');
    const searchCloseBtn = document.querySelector('#searchModal .close-btn');

    
    // ------------------------------------------------------------------
    // A. ฟังก์ชันเปิด Modal
    // ------------------------------------------------------------------

    // 1. เปิด Login Modal
    if (accountToggle && loginModal) {
        accountToggle.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex'; 
            document.body.style.overflow = 'hidden'; 
        });
    }
    
    // 2. เปิด Search Modal
    if (searchToggle && searchModal) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchModal.style.display = 'flex'; 
            document.body.style.overflow = 'hidden'; 
        });
    }

    // 3. เปิด Detail Modal (เมื่อคลิกรายการสถานที่/ร้านอาหาร)
    function openDetailModal(title, details) {
        modalTitle.textContent = title;
        modalDetails.textContent = details;
        modalImage.src = 'https://picsum.photos/450/300?random=' + Math.floor(Math.random() * 100); 
        
        detailModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    }

    // ตัวจัดการการคลิกสำหรับทุกรายการ (สถานที่ท่องเที่ยวและร้านอาหาร)
    const allLinks = document.querySelectorAll('#locationList a, #restaurantList a');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const title = this.getAttribute('data-title');
            const details = this.getAttribute('data-details');
            
            if (title && details) {
                openDetailModal(title, details);
            } else {
                console.error("Missing data-title or data-details on clicked link.");
            }
        });
    });

    // --- ADDED: Force Video Playback (If using video background) ---
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.play().catch(error => {
            console.error('Video playback failed (often due to browser autoplay policies):', error);
        });
    }

    // ------------------------------------------------------------------
    // UPDATED: เริ่มต้นแสดงหน้าหลักและซ่อนส่วนรายการสถานที่/ติดต่อ
    // ------------------------------------------------------------------
    showHomePage(); 


    // ------------------------------------------------------------------
    // B. ฟังก์ชันปิด Modal และ Submit Form
    // ------------------------------------------------------------------
    
    // ฟังก์ชันช่วยปิด Modal และคืนค่าการเลื่อน
    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'none';
        }
        document.body.style.overflow = 'auto';
    }

    // ปิดเมื่อคลิกปุ่ม 'X'
    if (loginCloseBtn) loginCloseBtn.addEventListener('click', () => closeModal(loginModal));
    if (detailCloseBtn) detailCloseBtn.addEventListener('click', () => closeModal(detailModal));
    if (searchCloseBtn) searchCloseBtn.addEventListener('click', () => closeModal(searchModal));


    // ปิดเมื่อคลิกนอก Modal
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            closeModal(loginModal);
        }
        if (event.target === detailModal) {
            closeModal(detailModal);
        }
        if (event.target === searchModal) { 
            closeModal(searchModal);
        }
    });

    // จำลองการ Login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login Attempted for: ' + document.getElementById('email').value + '.');
            closeModal(loginModal); 
            loginForm.reset(); 
        });
    }

    // จำลองการค้นหา
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = document.getElementById('searchQuery').value;
            
            if (searchTerm) {
                alert(`Searching BLOOM for: "${searchTerm}".`);
                closeModal(searchModal); 
                searchForm.reset();
            }
        });
    }

    // NEW: จำลองการส่งฟอร์มติดต่อ (Contact Form)
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            
            alert(`ข้อความจากคุณ ${name} ได้ถูกส่งแล้ว\nอีเมล: ${email}\nข้อความ: "${message.substring(0, 30)}..."\n\n(นี่คือการจำลองการส่งฟอร์ม)`);
            
            contactForm.reset();
        });
    }
});