// 萌雨社网站主要JavaScript文件
async function fetchHint() {
                const response = await fetch('hints.txt');
                const text = await response.text();
                const hints = text.split('\n').filter(line => line.trim() !== '');
                const randomHint = hints[Math.floor(Math.random() * hints.length)];
                document.getElementById('logo').innerText = randomHint;
            }

// 每次刷新页面时，重新加载随机提示
window.onload = fetchHint;
// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeLoader();
    initializeAnimations();
    initializeScrollEffects();
    initializeCounters();
    initializeNavigation();
    initializeProjectCards();
});

// 加载动画
function initializeLoader() {
    const loader = document.getElementById('loader');
    
    // 模拟加载时间
    setTimeout(() => {
        loader.classList.add('hidden');
        // 启动页面动画
        startPageAnimations();
    }, 2000);
}

// 页面动画初始化
function startPageAnimations() {
    // Hero区域文字动画
    if (typeof Splitting !== 'undefined') {
        Splitting();
    }
    
    // 标题动画
    anime({
        targets: '[data-splitting] .char',
        translateY: [100, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1400,
        delay: anime.stagger(30)
    });

    // Logo动画
    anime({
        targets: '.floating',
        translateY: [-20, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        easing: 'easeOutElastic(1, .8)',
        duration: 2000,
        delay: 500
    });

// 修改前：targets: '.hero-bg p'
// 修改后：精准指向描述文字部分
anime({
    targets: '.hero-description', 
    translateY: [30, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1000,
    delay: 800
});

// 给 Hint 增加一个单独的微弱淡入，更有层次感
anime({
    targets: '.logo-hint',
    opacity: [0, 1],
    duration: 1200,
    delay: 1500 // 晚一点点出现，效果更惊艳
});

    // 按钮动画
    anime({
        targets: '.hero-bg .flex a',
        translateY: [30, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: anime.stagger(200, {start: 1200})
    });
}

// 初始化动画
function initializeAnimations() {
    // 滚动触发动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// 滚动效果
function initializeScrollEffects() {
    let ticking = false;

    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // 视差背景效果
        const hero = document.querySelector('.hero-bg');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }

        // 导航栏背景透明度
        const nav = document.querySelector('nav');
        if (nav) {
            const opacity = Math.min(scrolled / 100, 0.95);
            nav.style.background = `rgba(15, 20, 30, ${opacity * 0.25})`;
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// 数字计数器动画
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    };

    // 使用Intersection Observer触发动画
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// 导航功能
function initializeNavigation() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Dock导航项点击效果
    document.querySelectorAll('.dock-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // 移除所有active类
            document.querySelectorAll('.dock-item').forEach(i => i.classList.remove('active'));
            // 添加active类到当前项
            this.classList.add('active');
            
            // 添加点击动画
            anime({
                targets: this,
                scale: [1, 1.3, 1],
                duration: 300,
                easing: 'easeOutElastic(1, .6)'
            });
        });
    });

    // 移动端菜单切换
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// 项目卡片交互
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // 3D倾斜效果
        card.addEventListener('mouseenter', function(e) {
            anime({
                targets: this,
                rotateX: -5,
                rotateY: 5,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });

        card.addEventListener('mouseleave', function(e) {
            anime({
                targets: this,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });

        // 鼠标跟随倾斜
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // 点击效果
        card.addEventListener('click', function() {
            // 创建涟漪效果
            createRippleEffect(this, event);
            
            // 延迟跳转
            setTimeout(() => {
                const button = this.querySelector('button');
                if (button) {
                    button.click();
                }
            }, 300);
        });
    });
}

// 创建涟漪效果
function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    anime({
        targets: ripple,
        scale: [0, 2],
        opacity: [0.6, 0],
        duration: 600,
        easing: 'easeOutExpo',
        complete: () => {
            ripple.remove();
        }
    });
}

// 粒子背景效果
function initializeParticleBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const heroSection = document.querySelector('.hero-bg');
    
    if (!heroSection) return;
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    heroSection.appendChild(canvas);
    
    let particles = [];
    const particleCount = 50;
    
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
            ctx.fill();
        });
        
        // 绘制连接线
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    initParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// 搜索功能
function initializeSearch() {
    const searchInput = document.querySelector('input[type="text"]');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                anime({
                    targets: card,
                    opacity: [0, 1],
                    scale: [0.9, 1],
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            } else {
                anime({
                    targets: card,
                    opacity: [1, 0],
                    scale: [1, 0.9],
                    duration: 300,
                    easing: 'easeOutCubic',
                    complete: () => {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 性能监控
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('页面加载时间:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// 初始化粒子背景（在页面加载完成后）
window.addEventListener('load', () => {
    setTimeout(initializeParticleBackground, 1000);
    initializeSearch();
});

// 导出主要函数供其他页面使用
window.MoeRain = {
    initializeAnimations,
    initializeScrollEffects,
    createRippleEffect,
    debounce,
    throttle
};

card.addEventListener('click', function(e) {
    // 如果点击的是链接 <a>，直接让它跳转，不要拦截
    if (e.target.tagName === 'A') return;

    createRippleEffect(this, e);

});