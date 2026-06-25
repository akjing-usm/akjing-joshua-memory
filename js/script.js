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
        document.getElementById('gate-btn').addEventListener('click', () => {
            const pwd = document.getElementById('gate-pwd').value;
            if (pwd === "0618") { // <--- 在这里把 0618 改成你想要的密码
                gate.style.opacity = '0';
                setTimeout(() => { gate.style.display = 'none'; }, 500); // 密码正确，门淡出消失
            } else {
                document.getElementById('gate-error').style.opacity = '1'; // 密码错误，显示提示
            }
        });
    }

    const devMode = false; // 上线前改成 false 才能看到信封开场！

    // ==========================================
    // 🚀 终极性能优化：智能视频/性能管家
    // ==========================================
    const lazyVideoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 滑入屏幕，开始播放
                entry.target.play().catch(() => {});
            } else {
                // ⚠️ 滑出屏幕，立刻暂停！释放手机 CPU 性能！
                entry.target.pause();
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('video').forEach(video => {
        lazyVideoObserver.observe(video);
    });

    // ==========================================
    // 🚀 终极性能优化引擎 (防卡顿)
    // ==========================================
    
    // 1. 图片智能懒加载（滑动到附近才加载图片，极大降低初始卡顿）
    document.querySelectorAll('img:not(.slide)').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    // 2. 视频性能释放（只播放当前屏幕内的视频，滑走立刻暂停！）
    const lazyVideoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 视频进入屏幕，开始播放
                entry.target.play().catch(() => {});
            } else {
                // 视频离开屏幕，立刻暂停，释放 CPU 性能
                entry.target.pause();
            }
        });
    }, { threshold: 0.1 }); // 露出10%就开始触发

    document.querySelectorAll('.photo-placeholder video').forEach(video => {
        video.removeAttribute('autoplay'); // 剥夺原本的无脑自动播放
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

    // 🌟 音乐按钮旋转特效 (CSS中设置为15秒缓慢旋转)
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
        '' // Nothing
    ];

    const paperColors = ['#FFFDF7', '#FDFBF7', '#FFFBF0', '#F9F6F0'];
    const shadowStyles = [
        '2px 5px 15px rgba(0,0,0,0.08)',
        '3px 6px 12px rgba(0,0,0,0.1)',
        '1px 4px 20px rgba(0,0,0,0.06)'
    ];

    items.forEach(item => {
        // 随机倾斜角度
        const tilt = (Math.random() * 8 - 4).toFixed(2);
        item.style.setProperty('--rot', `${tilt}deg`);

        // 随机相纸底色和阴影
        item.style.backgroundColor = paperColors[Math.floor(Math.random() * paperColors.length)];
        item.style.boxShadow = shadowStyles[Math.floor(Math.random() * shadowStyles.length)];

        // 随机小贴纸
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

    items.forEach(item => {
        item.addEventListener('click', () => {
            const dateStr = item.getAttribute('data-date');
            const type = item.getAttribute('data-type') || 'image';
            const longMemoryStr = item.getAttribute('data-memory'); 
            const caption = item.querySelector('.caption').innerHTML;
            let mediaSource = item.querySelector('.photo-placeholder').innerHTML;

            viewerDate.textContent = dateStr;
            viewerCaption.innerHTML = caption;
            
            // 写入长记忆文字
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

            // 🌟 如果是竖屏胶卷，给放大框加上专属 class
            if (item.classList.contains('portrait-film')) {
                viewerMedia.classList.add('portrait-film-viewer');
            } else {
                viewerMedia.classList.remove('portrait-film-viewer');
            }

            viewer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeViewer() {
        viewer.classList.remove('active');
        document.body.style.overflow = 'auto'; 
        document.body.style.overflowX = 'hidden'; 
        
        const vid = viewerMedia.querySelector('video');
        if (vid) vid.pause(); 

        // 恢复音乐并恢复旋转特效
        if (wasMusicPlaying) {
            bgMusic.play().catch(e => console.warn("Audio waiting"));
            isPlaying = true;
            musicBtn.textContent = '⏸️'; 
            musicBtn.classList.add('playing');
            wasMusicPlaying = false; 
        }

        setTimeout(() => { viewerMedia.innerHTML = ''; }, 500); 
    }
    
    closeViewerBtn.addEventListener('click', closeViewer);
    viewer.querySelector('.viewer-overlay').addEventListener('click', closeViewer);

    // ==========================================
    // 🔒 霸道防破坏锁：结局运镜时禁止一切手动滑动
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
    // 🎥 终极电影级运镜系统 (完美解决与CSS的拉扯冲突)
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

    // --- 4-PHASE CINEMATIC ENDING ENGINE (微操定制版) ---
    const endingPhases = document.querySelectorAll('.ending-phase');
    
    const phaseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 🌟 Phase 1: 蒙太奇快速闪回
                if(entry.target.id === 'phase-1' && !entry.target.classList.contains('played')) {
                    entry.target.classList.add('played');
                    
                    // 🚨 触发结局特效时，直接锁死用户的鼠标滚轮和手指滑动
                    lockManualScroll();
                    
                    const slideshow = entry.target.querySelector('#ending-slideshow');
                    
                    // 🎥 镜头魔法 0：【绝对居中吸附】
                    // 精准计算偏移量：-(屏幕高度一半) + (相框高度一半)
                    // 这能确保无论在什么尺寸的屏幕上，相框的中心点永远死死钉在屏幕正中心！
                    const centerOffset = -(window.innerHeight / 2) + (slideshow.offsetHeight / 2);
                    cinematicScrollTo(slideshow, 1000, centerOffset);
                    
                    const slides = slideshow.querySelectorAll('.slide');
                    let current = 0;
                    
                    // ⏳ 镜头魔法：Hold 住第一张合照 3.5 秒
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
                        }, 300); 
                    }, 3500); 
                }
                
                // 🌟 Phase 2: 短句过渡
                if(entry.target.id === 'phase-2' && !entry.target.classList.contains('played')) {
                    entry.target.classList.add('played');
                    
                    setTimeout(() => {
                        const letterBox = document.querySelector('.phase-3-letter');
                        // 进入信封拉长到 3 秒，让开场更具电影叙事感，绝对平滑
                        cinematicScrollTo(letterBox, 3000, -40);
                    }, 4500);
                }
                
                // 🌟 Phase 3: 自动打字信件
                if(entry.target.id === 'phase-3' && !entry.target.classList.contains('typed')) {
                    entry.target.classList.add('typed');
                    const lines = entry.target.querySelectorAll('.typing-line');
                    const typeSpeed = 2800; 
                    
                    setTimeout(() => {
                        lines.forEach((line, index) => {
                            setTimeout(() => {
                                line.classList.add('type-active');
                                
                                // 🎥 镜头魔法 (段落运镜)：只有当打到 "......" 的时候，才往下滑！
                                if (line.textContent.trim() === '......') {
                                    // 耗时 2.5 秒，极其轻柔地推上去，不知不觉就挪好了位置
                                    cinematicScrollTo(line, 2500, -120);
                                }
                                
                            }, index * typeSpeed); 
                        });
                        
                        const totalTime = lines.length * typeSpeed;
                        
                        setTimeout(() => {
                            // 信打完后停留 2 秒，然后耗时 4 秒慢慢滑向生日祝福
                            cinematicScrollTo(document.getElementById('phase-4'), 4000, 0);
                        }, totalTime + 2000); 

                    }, 2800); 
                }
                
                // 🌟 Phase 4: 结局落幕与黑屏
                if(entry.target.id === 'phase-4' && !entry.target.classList.contains('triggered')) {
                    entry.target.classList.add('triggered');
                    
                    setTimeout(() => {
                        const blackout = document.getElementById('blackout-screen');
                        blackout.classList.add('active');
                        
                        setTimeout(() => {
                            let vol = bgMusic.volume;
                            const fadeAudio = setInterval(() => {
                                if (vol > 0.05) {
                                    vol -= 0.05;
                                    bgMusic.volume = vol;
                                } else {
                                    clearInterval(fadeAudio);
                                    bgMusic.pause();
                                }
                            }, 250); 
                        }, 2000); 
                        
                    }, 4500); 
                }
            }
        });
    }, { threshold: 0.3 }); 

    endingPhases.forEach(phase => phaseObserver.observe(phase));

    // --- 🌟 TIMELINE NAVIGATION ENGINE ---
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