document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. كود تشغيل القائمة المنسدلة (Mobile Menu)
  // ==========================================
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("hidden");
    });

    // إغلاق المنيو تلقائياً عند الضغط على أي رابط بداخلها
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });

    // إغلاق المنيو إذا تم الضغط في أي مكان خارجها
    document.addEventListener("click", (e) => {
      if (
        !mobileMenu.classList.contains("hidden") &&
        !mobileMenu.contains(e.target) &&
        e.target !== menuBtn
      ) {
        mobileMenu.classList.add("hidden");
      }
    });
  }

  // ==========================================
  // 2. كود تشغيل سلايدر الآراء (Testimonials Slider)
  // ==========================================
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.getElementById("prev-slide-btn");
  const nextBtn = document.getElementById("next-slide-btn");
  const dots = document.querySelectorAll(".carousel-dot");

  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;

    function updateSlides(index) {
      slides.forEach((slide, i) => {
        if (i === index) {
          // إظهار الشريحة النشطة وإعادتها لمكانها الطبيعي
          slide.classList.remove(
            "opacity-0",
            "translate-x-full",
            "-translate-x-full",
          );
          slide.classList.add("opacity-100", "translate-x-0");
        } else if (i < index) {
          // الشريحة السابقة تخرج جهة اليمين أو اليسار حسب الرغبة (هنا تخرج لليمين)
          slide.classList.remove(
            "opacity-100",
            "translate-x-0",
            "translate-x-full",
          );
          slide.classList.add("opacity-0", "-translate-x-full");
        } else {
          // الشريحة القادمة تنتظر في اليمين
          slide.classList.remove(
            "opacity-100",
            "translate-x-0",
            "-translate-x-full",
          );
          slide.classList.add("opacity-0", "translate-x-full");
        }
      });

      // تحديث حالة النقاط السفلية (Dots)
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.remove("bg-pink-200");
          dot.classList.add("bg-brand-accent");
        } else {
          dot.classList.remove("bg-brand-accent");
          dot.classList.add("bg-pink-200");
        }
      });

      currentSlide = index;
    }

    // الانتقال للشريحة التالية
    function nextSlide() {
      let next = currentSlide + 1;
      if (next >= slides.length) next = 0;
      updateSlides(next);
    }

    // الانتقال للشريحة السابقة
    function prevSlide() {
      let prev = currentSlide - 1;
      if (prev < 0) prev = slides.length - 1;
      updateSlides(prev);
    }

    // ربط أزرار التنقل بالوظائف البرمجية
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoplay();
      });
    }

    // ربط النقاط (Dots) للتحكم المباشر عند الضغط عليها
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        updateSlides(index);
        resetAutoplay();
      });
    });

    // تشغيل ميزة التقليب التلقائي كل 5 ثوانٍ لراحة المريضات أثناء التصفح
    function startAutoplay() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
      clearInterval(slideInterval);
      startAutoplay();
    }

    // تهيئة السلايدر عند تحميل الصفحة لأول مرة
    updateSlides(0);
    startAutoplay();
  }
});
