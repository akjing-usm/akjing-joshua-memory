/*
==================================================
Project : 《拾光》 V6.5 Cinematic Polish (Ultimate)
==================================================
*/

if (history.scrollRestoration) { history.scrollRestoration = 'manual'; }
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 🔒 专属密码锁逻辑
    // ==========================================
    const gate = document.getElementById('password-gate');
    if (gate) {
        const gateBtn = document.getElementById('gate-btn');
        const gatePwd = document.getElementById('gate-pwd');
        
        const unlockAction = () => {
            const pwd = gatePwd.value;
            if (pwd === "0710") { 
                gate.style.opacity = '0';
                setTimeout(() => { gate.style.display = 'none'; }, 500); 
            } else {
                document.getElementById('gate-error').style.opacity = '1'; 
            }
        };

        gateBtn.addEventListener('click', unlockAction);
        gatePwd.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') unlockAction();
        });
    }

    const devMode = false; 

    // ==========================================
    // 🚀 终极性能优化：图片与视频防卡顿管家
    // ==========================================
    document.querySelectorAll('img:not(.slide)').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    const lazyVideoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(() => {});
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.1 }); 

    document.querySelectorAll('.photo-placeholder video').forEach(video => {
        lazyVideoObserver.observe(video);
    });

    if (devMode) {
        document.getElementById('envelope-screen').style.display = 'none';
        document.getElementById('hero').style.display = 'none';
        document.body.classList.remove('scroll-locked');
        document.getElementById('scrapbook').classList.add('show');
    }

    const envScreen = document.getElementById('envelope-screen');
    const envBtn = document.getElementById('open-envelope-btn');
    const heroSection = document.getElementById('hero');
    const openBookBtn = document.getElementById('openBookBtn');
    const items = document.querySelectorAll('.scrapbook-item');
    const scrapbook = document.getElementById('scrapbook');
    
    // --- Audio Engine ---
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    function toggleMusic() {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.textContent = '🎵';
            musicBtn.classList.remove('playing');
        } else {
            bgMusic.play().catch(e => console.warn("Audio waiting"));
            musicBtn.textContent = '⏸️';
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    }
    musicBtn.addEventListener('click', toggleMusic);

    if (!devMode) {
        envBtn.addEventListener('click', () => {
            envScreen.classList.add('opened');
            if (!isPlaying) toggleMusic();
            setTimeout(() => { heroSection.classList.add('start-story'); }, 1200);
        });

        openBookBtn.addEventListener('click', () => {
            heroSection.classList.add('fade-out');
            setTimeout(() => {
                heroSection.style.display = 'none'; 
                document.body.classList.remove('scroll-locked');
                window.scrollTo(0, 0); 
                setTimeout(() => { scrapbook.classList.add('show'); }, 100);
            }, 2500); 
        });
    }

    // --- Color Flow Observer ---
    const themeSections = document.querySelectorAll('[data-theme]');
    const themeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.body.className = `theme-${entry.target.getAttribute('data-theme')}`;
            }
        });
    }, { threshold: 0.3 }); 
    themeSections.forEach(sec => themeObserver.observe(sec));

    // --- THE DECORATOR ENGINE ---
    const decorStyles = [
        '<div class="decor tape tape-top-center"></div>',
        '<div class="decor tape tape-top-left"></div>',
        '<div class="decor tape tape-top-right"></div>',
        '<div class="decor paper-clip">📎</div>',
        '<div class="decor push-pin">📌</div>',
        '<div class="decor tape tape-corner-tl"></div><div class="decor tape tape-corner-br"></div>',
        '<div class="decor pressed-flower">🌼</div>',
        '<div class="decor ticket">🎫</div>',
        '<div class="decor leaf">🍂</div>',
        '<div class="decor small-note">✉️</div>',
        '' 
    ];

    const paperColors = ['#FFFDF7', '#FDFBF7', '#FFFBF0', '#F9F6F0'];
    const shadowStyles = [
        '2px 5px 15px rgba(0,0,0,0.08)',
        '3px 6px 12px rgba(0,0,0,0.1)',
        '1px 4px 20px rgba(0,0,0,0.06)'
    ];

    items.forEach(item => {
        const tilt = (Math.random() * 8 - 4).toFixed(2);
        item.style.setProperty('--rot', `${tilt}deg`);
        item.style.backgroundColor = paperColors[Math.floor(Math.random() * paperColors.length)];
        item.style.boxShadow = shadowStyles[Math.floor(Math.random() * shadowStyles.length)];
        const hasManualDecor = item.querySelector('.tape') || item.querySelector('.paper-clip') || item.querySelector('.push-pin');
        if (!hasManualDecor) {
            const randomDecor = decorStyles[Math.floor(Math.random() * decorStyles.length)];
            item.insertAdjacentHTML('afterbegin', randomDecor);
        }
    });

    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                itemObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    items.forEach(item => itemObserver.observe(item));

    // --- CINEMATIC MEMORY VIEWER ---
    const viewer = document.getElementById('memory-viewer');
    const closeViewerBtn = document.getElementById('close-viewer');
    const viewerMedia = document.getElementById('viewer-media');
    const viewerDate = document.getElementById('viewer-date');
    const viewerCaption = document.getElementById('viewer-caption');
    const viewerMemory = document.getElementById('viewer-memory');
    
    let wasMusicPlaying = false; 
    let clearViewerTimeout; 

    items.forEach(item => {
        item.addEventListener('click', () => {
            clearTimeout(clearViewerTimeout); 

            const dateStr = item.getAttribute('data-date');
            const type = item.getAttribute('data-type') || 'image';
            const longMemoryStr = item.getAttribute('data-memory'); 
            const caption = item.querySelector('.caption').innerHTML;
            let mediaSource = item.querySelector('.photo-placeholder').innerHTML;

            viewerDate.textContent = dateStr;
            viewerCaption.innerHTML = caption;
            
            if (longMemoryStr) {
                viewerMemory.innerHTML = longMemoryStr;
                viewerMemory.style.display = 'block';
            } else {
                viewerMemory.style.display = 'none';
            }
            
            if(type === 'video') {
                if (isPlaying) {
                    bgMusic.pause();
                    wasMusicPlaying = true; 
                    musicBtn.textContent = '🎵'; 
                    musicBtn.classList.remove('playing');
                }
                const sourceTag = item.querySelector('source');
                const videoUrl = sourceTag ? sourceTag.getAttribute('src') : '';
                viewerMedia.innerHTML = `
                    <video controls autoplay loop playsinline style="max-width: 100%; max-height: 65vh; border-radius: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                        <source src="${videoUrl}" type="video/mp4">
                    </video>
                `;
            } else {
                viewerMedia.innerHTML = mediaSource;
            }

            if (item.classList.contains('portrait-film')) {
                viewerMedia.classList.add('portrait-film-viewer');
            } else {
                viewerMedia.classList.remove('portrait-film-viewer');
            }

            document.getElementById('timeline-nav').style.display = 'none';
            if(document.getElementById('timeline-toggle')) document.getElementById('timeline-toggle').style.display = 'none';

            viewer.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    });

    function closeViewer() {
        viewer.classList.remove('active');
        document.body.style.overflow = ''; 
        document.body.style.overflowX = ''; 
        
        document.getElementById('timeline-nav').style.display = 'flex';
        if(document.getElementById('timeline-toggle')) document.getElementById('timeline-toggle').style.display = 'block';

        const vid = viewerMedia.querySelector('video');
        if (vid) vid.pause(); 

        if (wasMusicPlaying) {
            bgMusic.play().catch(e => console.warn("Audio waiting"));
            isPlaying = true;
            musicBtn.textContent = '⏸️'; 
            musicBtn.classList.add('playing');
            wasMusicPlaying = false; 
        }

        clearViewerTimeout = setTimeout(() => { viewerMedia.innerHTML = ''; }, 500); 
    }
    
    closeViewerBtn.addEventListener('click', closeViewer);
    viewer.querySelector('.viewer-overlay').addEventListener('click', closeViewer);

    // ==========================================
    // 🔒 霸道防破坏锁
    // ==========================================
    function preventScroll(e) { e.preventDefault(); }
    function preventKeyScroll(e) { 
        if ([32, 37, 38, 39, 40].includes(e.keyCode)) { e.preventDefault(); return false; } 
    }
    function lockManualScroll() {
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
        window.addEventListener('keydown', preventKeyScroll, { passive: false });
    }

    // ==========================================
    // 🎥 终极电影级运镜系统
    // ==========================================
    let currentScrollAnimation = null; 
    
    function cinematicScrollTo(element, duration, offset = 0) {
        if (currentScrollAnimation) cancelAnimationFrame(currentScrollAnimation);
        document.documentElement.style.scrollBehavior = 'auto';
        
        const start = window.scrollY || window.pageYOffset;
        const target = element.getBoundingClientRect().top + start + offset;
        const distance = target - start;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = -(Math.cos(Math.PI * progress) - 1) / 2;
            
            window.scrollTo(0, start + distance * ease);
            
            if (timeElapsed < duration) {
                currentScrollAnimation = requestAnimationFrame(animation);
            } else {
                currentScrollAnimation = null;
                document.documentElement.style.scrollBehavior = 'smooth';
            }
        }
        currentScrollAnimation = requestAnimationFrame(animation);
    }

    // --- 4-PHASE CINEMATIC ENDING ENGINE ---
    const endingPhases = document.querySelectorAll('.ending-phase');
    
    const phaseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 🌟 Phase 1
                if(entry.target.id === 'phase-1' && !entry.target.classList.contains('played')) {
                    entry.target.classList.add('played');
                    lockManualScroll();
                    const slideshow = entry.target.querySelector('#ending-slideshow');
                    
                    const isMobile = window.innerWidth <= 768;
                    const topOffset = isMobile ? -(window.innerHeight * 0.25) : -(window.innerHeight * 0.125);
                    cinematicScrollTo(slideshow, 1000, topOffset);
                    
                    const slides = slideshow.querySelectorAll('.slide');
                    let current = 0;
                    const flashSpeed = 500;
                    
                    setTimeout(() => {
                        const slideInterval = setInterval(() => {
                            slides.forEach(s => s.classList.remove('active'));
                            if (current < slides.length) {
                                slides[current].classList.add('active');
                                current++;
                            } else {
                                clearInterval(slideInterval);
                                slides[slides.length - 1].classList.add('active'); 
                                
                                setTimeout(() => {
                                    slideshow.classList.add('fade-out');
                                    setTimeout(() => {
                                        cinematicScrollTo(document.getElementById('phase-2'), 2500, 0);
                                    }, 1000); 
                                }, 1500); 
                            }
                        }, flashSpeed); 
                    }, 3300); 
                }
                
                // 🌟 Phase 2
                if(entry.target.id === 'phase-2' && !entry.target.classList.contains('played')) {
                    entry.target.classList.add('played');
                    setTimeout(() => {
                        const letterBox = document.querySelector('.phase-3-letter');
                        cinematicScrollTo(letterBox, 3000, -(window.innerHeight * 0.15));
                    }, 4500);
                }
                
                // 🌟 Phase 3 & 4
                if(entry.target.id === 'phase-3' && !entry.target.classList.contains('typed')) {
                    entry.target.classList.add('typed');
                    const lines = entry.target.querySelectorAll('.typing-line');
                    const typeSpeed = 4100; 
                    
                    setTimeout(() => {
                        lines.forEach((line, index) => {
                            setTimeout(() => {
                                line.classList.add('type-active');
                                if (line.textContent.trim() === '......') {
                                    cinematicScrollTo(line, 2500, -150);
                                }
                            }, index * typeSpeed); 
                        });
                        
                        const totalTime = lines.length * typeSpeed;
                        
                        setTimeout(() => {
                            document.getElementById('phase-4').style.marginTop = '30vh';
                            cinematicScrollTo(document.getElementById('phase-4'), 4000, 0);
                            
                            setTimeout(() => {
                                const blackout = document.getElementById('blackout-screen');
                                blackout.classList.add('active');
                                
                                setTimeout(() => {
                                    let vol = bgMusic.volume;
                                    const fadeAudio = setInterval(() => {
                                        if (vol > 0.02) { 
                                            vol -= 0.02; bgMusic.volume = vol; 
                                        } else { 
                                            clearInterval(fadeAudio); bgMusic.pause(); 
                                        }
                                    }, 200); 
                                }, 1000); 
                                
                            }, 4000 + 2500); 

                        }, totalTime + 2000); 

                    }, 2800); 
                }
            }
        });
    }, { threshold: 0.3 }); 

    endingPhases.forEach(phase => phaseObserver.observe(phase));

    // --- TIMELINE NAVIGATION ENGINE ---
    const timelineNav = document.getElementById('timeline-nav');
    const timelineToggle = document.getElementById('timeline-toggle');
    const timelineDots = document.querySelectorAll('.timeline-dot');
    const timelineSections = [
        document.getElementById('chapter-1'),
        document.getElementById('chapter-2'),
        document.getElementById('chapter-3'),
        document.getElementById('chapter-4'),
        document.getElementById('ending')
    ];

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!timelineNav.classList.contains('show')) {
                    timelineNav.classList.add('show');
                    if (window.innerWidth <= 768) timelineToggle.classList.add('show-btn');
                }

                const id = entry.target.id;
                timelineDots.forEach(dot => {
                    if (dot.getAttribute('data-target') === id) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        });
    }, { threshold: 0.15 }); 

    timelineSections.forEach(sec => {
        if(sec) timelineObserver.observe(sec);
    });

    timelineDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            if (window.innerWidth <= 768) {
                timelineNav.classList.remove('mobile-open');
            }
        });
    });

    if (timelineToggle) {
        timelineToggle.addEventListener('click', () => {
            timelineNav.classList.toggle('mobile-open');
        });
    }
});