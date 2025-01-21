console.log('Script loaded');

const DEBUG = true;

const translations = {
    en: {
        home: "HOME",
        services: "SERVICES",
        portfolio: "PORTFOLIO",
        templates: "TEMPLATES",
        contacts: "CONTACTS",
        webDev: "Web Development",
        modeling: "3D Modeling",
        uiDesign: "UI/UX Design",
        aiIntegration: "AI Integration",
        webDevDesc: "Creating modern web applications using advanced technologies",
        modelingDesc: "Creating high-quality 3D models, animations and textures for your projects",
        uiDesignDesc: "Development of intuitive interfaces and unique user experience",
        aiDesc: "Integration of artificial intelligence and machine learning into your projects",
        orderButton: "ORDER",
        viewMore: "VIEW MORE",
        sendButton: "SEND",
        yourName: "Your Name",
        message: "Message",
        copyright: "© 2024 Miami Nights. All rights reserved."
    },
    es: {
        home: "INICIO",
        services: "SERVICIOS",
        portfolio: "PORTAFOLIO",
        templates: "PLANTILLAS",
        contacts: "CONTACTOS",
        webDev: "Desarrollo Web",
        modeling: "Modelado 3D",
        uiDesign: "Diseño UI/UX",
        aiIntegration: "Integración IA",
        webDevDesc: "Creación de aplicaciones web modernas con tecnologías avanzadas",
        modelingDesc: "Creación de modelos 3D, animaciones y texturas de alta calidad",
        uiDesignDesc: "Desarrollo de interfaces intuitivas y experiencia única",
        aiDesc: "Integración de inteligencia artificial y aprendizaje automático",
        orderButton: "ORDENAR",
        viewMore: "VER MÁS",
        sendButton: "ENVIAR",
        yourName: "Su Nombre",
        message: "Mensaje",
        copyright: "© 2024 Miami Nights. Todos los derechos reservados."
    },
    ru: {
        home: "ГЛАВНАЯ",
        services: "УСЛУГИ",
        portfolio: "ПОРТФОЛИО",
        templates: "ШАБЛОНЫ",
        contacts: "КОНТАКТЫ",
        webDev: "Веб-разработка",
        modeling: "3D Моделирование",
        uiDesign: "UI/UX Дизайн",
        aiIntegration: "AI Интеграция",
        webDevDesc: "Создание современных веб-приложений с использованием передовых технологий",
        modelingDesc: "Создание высококачественных 3D моделей, анимаций и текстур для ваших проектов",
        uiDesignDesc: "Разработка интуитивных интерфейсов и создание уникального пользовательского опыта",
        aiDesc: "Внедрение искусственного интеллекта и машинного обучения в ваши проекты",
        orderButton: "ЗАКАЗАТЬ",
        viewMore: "ПОДРОБНЕЕ",
        sendButton: "ОТПРАВИТЬ",
        yourName: "Ваше имя",
        message: "Сообщение",
        copyright: "© 2024 Miami Nights. Все права защищены."
    }
};

function log(message) {
    if (DEBUG) {
        console.log(`[Game Debug]: ${message}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const gameIntro = document.getElementById('gameIntro');
    const gameContainer = document.getElementById('gameContainer');
    const player = document.getElementById('player');
    
    let gameStarted = false;

    // Добавим прямой обработчик клавиш
    window.addEventListener('keydown', (e) => {
        console.log('Key pressed:', e.code); // Отладочный вывод
        
        if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault(); // Предотвращаем прокрутку страницы
            if (!gameStarted) {
                console.log('Starting game...'); // Отладочный вывод
                startGame();
            }
        }
        
        if (e.code === 'Escape') {
            console.log('Escape pressed'); // Отладочный вывод
            if (gameStarted) {
                // Добавим переключение меню
                const gameMenu = document.getElementById('gameMenu');
                if (gameMenu) {
                    gameMenu.style.display = gameMenu.style.display === 'none' ? 'block' : 'none';
                }
            }
        }
    });

    // Эффект при нажатии любой клавиши
    document.addEventListener('keydown', () => {
        const subtitle = document.querySelector('.neon-subtitle');
        subtitle.style.opacity = '0';
        setTimeout(() => {
            subtitle.style.opacity = '1';
        }, 100);
    });

    // Добавляем эффект наведения для feature-box
    const featureBoxes = document.querySelectorAll('.feature-box');
    featureBoxes.forEach(box => {
        box.addEventListener('mouseover', () => {
            const neonText = box.querySelector('[class^="neon-text"]');
            neonText.style.textShadow = '0 0 20px currentColor';
        });

        box.addEventListener('mouseout', () => {
            const neonText = box.querySelector('[class^="neon-text"]');
            neonText.style.textShadow = '0 0 10px currentColor';
        });
    });

    // Случайные глитч-эффекты для заголовка
    const glitchText = document.querySelector('.glitch');
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchText.style.textShadow = `
                ${Math.random() * 10}px ${Math.random() * 10}px ${Math.random() * 10}px rgba(255,0,128,0.8),
                ${Math.random() * -10}px ${Math.random() * -10}px ${Math.random() * 10}px rgba(0,255,255,0.8)
            `;
            setTimeout(() => {
                glitchText.style.textShadow = '0 0 10px rgba(179,0,255,1)';
            }, 100);
        }
    }, 50);

    // Инициализация particles.js
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: {
                value: 0.5,
                random: false,
                anim: { enable: false }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    });

    // Аудио контроллер
    const audioControls = {
        playPauseBtn: document.getElementById('playPause'),
        muteUnmuteBtn: document.getElementById('muteUnmute'),
        volumeSlider: document.querySelector('.volume-slider'),
        synthwave: document.getElementById('synthwave'),
        ambientSound: document.getElementById('ambient-sound'),
        
        init() {
            this.playPauseBtn.addEventListener('click', () => this.togglePlay());
            this.muteUnmuteBtn.addEventListener('click', () => this.toggleMute());
            this.volumeSlider.addEventListener('input', (e) => this.changeVolume(e.target.value));
        },

        togglePlay() {
            if (this.synthwave.paused) {
                this.synthwave.play();
                this.ambientSound.play();
                this.playPauseBtn.querySelector('i').className = 'fas fa-pause';
            } else {
                this.synthwave.pause();
                this.ambientSound.pause();
                this.playPauseBtn.querySelector('i').className = 'fas fa-play';
            }
        },

        toggleMute() {
            const isMuted = this.synthwave.muted = !this.synthwave.muted;
            this.ambientSound.muted = isMuted;
            this.muteUnmuteBtn.querySelector('i').className = 
                `fas fa-volume-${isMuted ? 'mute' : 'up'}`;
        },

        changeVolume(value) {
            this.synthwave.volume = value;
            this.ambientSound.volume = value;
        }
    };

    audioControls.init();

    // Эффекты для заголовка
    const glitchTitle = document.querySelector('.glitch-title');
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchTitle.style.textShadow = `
                ${Math.random() * 10}px ${Math.random() * 10}px ${Math.random() * 10}px rgba(255,0,128,0.8),
                ${Math.random() * -10}px ${Math.random() * -10}px ${Math.random() * 10}px rgba(0,255,255,0.8)
            `;
            setTimeout(() => {
                glitchTitle.style.textShadow = '0 0 10px rgba(179,0,255,1)';
            }, 100);
        }
    }, 50);

    // Инициализация эффектов
    createLightningEffect();
    initFogEffect();

    // Обработка модального окна для услуг
    const modal = document.getElementById('serviceModal');
    const serviceButtons = document.querySelectorAll('.service-button');
    const closeModal = document.querySelector('.close-modal');
    const serviceForm = document.querySelector('.service-form');

    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'block';
            gsap.from('.modal-content', {
                duration: 0.5,
                y: -50,
                opacity: 0,
                ease: 'power2.out'
            });
        });
    });

    closeModal.addEventListener('click', () => {
        gsap.to('.modal-content', {
            duration: 0.3,
            y: -50,
            opacity: 0,
            ease: 'power2.in',
            onComplete: () => {
                modal.style.display = 'none';
                gsap.set('.modal-content', { y: 0, opacity: 1 });
            }
        });
    });

    serviceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Здесь будет логика отправки формы
        alert('Форма отправлена!');
        modal.style.display = 'none';
    });

    // Анимация карточек услуг при прокрутке
    gsap.from('.service-card', {
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        }
    });

    // Анимация для страницы контактов
    if (document.querySelector('.contact-container')) {
        gsap.from('.contact-card', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        });

        gsap.from('.contact-form', {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.3,
            ease: 'power2.out'
        });

        gsap.from('.map-container', {
            duration: 1,
            scale: 0.9,
            opacity: 0,
            delay: 0.6,
            ease: 'power2.out'
        });

        // Анимация точек на карте
        const mapPoints = document.querySelectorAll('.map-point');
        mapPoints.forEach(point => {
            point.addEventListener('mouseenter', () => {
                gsap.to(point, {
                    scale: 1.2,
                    duration: 0.3
                });
            });

            point.addEventListener('mouseleave', () => {
                gsap.to(point, {
                    scale: 1,
                    duration: 0.3
                });
            });
        });

        // Обработка отправки формы
        const contactForm = document.querySelector('.contact-form');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Анимация успешной отправки
            gsap.to(contactForm, {
                scale: 1.02,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });

            // Здесь будет логика отправки формы
            setTimeout(() => {
                alert('Сообщение отправлено!');
                contactForm.reset();
            }, 500);
        });
    }

    // Функционал для страницы шаблонов
    if (document.querySelector('.templates-container')) {
        // Инициализация GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Анимация появления карточек
        gsap.from('.template-card', {
            duration: 1,
            y: 100,
            opacity: 0,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.templates-grid',
                start: 'top center+=100',
                toggleActions: 'play none none reverse'
            }
        });

        // Фильтрация шаблонов
        const categoryButtons = document.querySelectorAll('.category-button');
        const templateCards = document.querySelectorAll('.template-card');

        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Обновление активной кнопки
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.dataset.category;

                // Фильтрация карточек
                templateCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        gsap.to(card, {
                            duration: 0.5,
                            opacity: 1,
                            scale: 1,
                            display: 'block'
                        });
                    } else {
                        gsap.to(card, {
                            duration: 0.5,
                            opacity: 0,
                            scale: 0.8,
                            display: 'none'
                        });
                    }
                });
            });
        });

        // Обработка предпросмотра
        const previewButtons = document.querySelectorAll('.preview-button');
        const previewModal = document.querySelector('.preview-modal');
        const closePreview = document.querySelector('.close-preview');
        const previewFrame = document.querySelector('.preview-viewport iframe');
        const deviceButtons = document.querySelectorAll('.control-button');

        previewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const templateUrl = button.closest('.template-card').dataset.url;
                previewFrame.src = templateUrl;
                previewModal.style.display = 'block';
                
                gsap.from('.preview-content', {
                    duration: 0.5,
                    scale: 0.8,
                    opacity: 0,
                    ease: 'power2.out'
                });
            });
        });

        closePreview.addEventListener('click', () => {
            gsap.to('.preview-content', {
                duration: 0.3,
                scale: 0.8,
                opacity: 0,
                ease: 'power2.in',
                onComplete: () => {
                    previewModal.style.display = 'none';
                    previewFrame.src = '';
                }
            });
        });

        // Изменение размера предпросмотра для разных устройств
        deviceButtons.forEach(button => {
            button.addEventListener('click', () => {
                const device = button.dataset.device;
                let width = '100%';
                
                switch(device) {
                    case 'tablet':
                        width = '768px';
                        break;
                    case 'mobile':
                        width = '375px';
                        break;
                }

                gsap.to('.preview-viewport', {
                    duration: 0.3,
                    width: width,
                    ease: 'power2.inOut'
                });
            });
        });
    }

    // Игровой режим
    const menuItems = document.querySelectorAll('.menu-item');
    const synthwave = document.getElementById('synthwave');
    const hoverSound = document.getElementById('hover-sound');
    const selectSound = document.getElementById('select-sound');
    const movementSound = document.getElementById('movement-sound');
    const ambientSound = document.getElementById('ambient-sound');

    // Инициализация позиции игрока
    if (player) {
        player.style.left = '50%';
        player.style.top = '50%';
    }

    function startGame() {
        if (!gameIntro || !gameContainer || !player) {
            console.error('Required game elements not found!');
            return;
        }

        gameStarted = true;
        
        // Скрываем интро и показываем игру
        if (gameIntro) gameIntro.style.display = 'none';
        if (gameContainer) {
            gameContainer.style.display = 'block';
            gameContainer.classList.add('active');
        }

        // Устанавливаем начальную позицию игрока
        if (player) {
            player.style.left = '50%';
            player.style.top = '50%';
        }

        // Запускаем звуки
        if (synthwave) {
            synthwave.play().catch(error => {
                console.log('Audio play failed:', error);
            });
        }
        
        if (ambientSound) {
            ambientSound.play().catch(error => {
                console.log('Ambient audio play failed:', error);
            });
        }

        // Инициализируем эффекты
        initializeEffects();

        // Запускаем игровой цикл
        requestAnimationFrame(gameLoop);
    }

    function setupAudioControls() {
        const playPauseBtn = document.getElementById('playPause');
        const muteUnmuteBtn = document.getElementById('muteUnmute');
        const volumeSlider = document.querySelector('.volume-slider');
        
        playPauseBtn.addEventListener('click', () => {
            if (synthwave.paused) {
                synthwave.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                synthwave.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        muteUnmuteBtn.addEventListener('click', () => {
            synthwave.muted = !synthwave.muted;
            muteUnmuteBtn.innerHTML = synthwave.muted ? 
                '<i class="fas fa-volume-mute"></i>' : 
                '<i class="fas fa-volume-up"></i>';
        });
        
        volumeSlider.addEventListener('input', (e) => {
            synthwave.volume = e.target.value;
            if (synthwave.volume === 0) {
                muteUnmuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                muteUnmuteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        });
    }

    function gameLoop() {
        log('Game loop iteration');
        if (!gameStarted) return;

        const speed = 5;
        const playerRect = player.getBoundingClientRect();
        let x = playerRect.left;
        let y = playerRect.top;

        // Движение игрока
        if (keys.w) y -= speed;
        if (keys.s) y += speed;
        if (keys.a) x -= speed;
        if (keys.d) x += speed;

        // Ограничение движения
        x = Math.max(0, Math.min(window.innerWidth - playerRect.width, x));
        y = Math.max(0, Math.min(window.innerHeight - playerRect.height, y));

        // Обновляем позицию игрока
        player.style.left = `${x}px`;
        player.style.top = `${y}px`;

        // Создаем эффект следа
        if (keys.w || keys.s || keys.a || keys.d) {
            createTrailEffect(x + playerRect.width / 2, y + playerRect.height / 2);
        }

        // Проверяем взаимодействие с меню
        menuItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const distance = Math.hypot(
                (x + playerRect.width / 2) - (itemRect.left + itemRect.width / 2),
                (y + playerRect.height / 2) - (itemRect.top + itemRect.height / 2)
            );

            if (distance < 100) {
                item.style.transform = 'scale(1.1)';
                if (!item.dataset.hover) {
                    item.dataset.hover = 'true';
                    playHoverSound();
                }
            } else {
                item.style.transform = 'scale(1)';
                item.dataset.hover = 'false';
            }
        });

        requestAnimationFrame(gameLoop);
    }

    function createTrailEffect(x, y) {
        const trail = document.createElement('div');
        trail.className = 'player-trail';
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;
        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 500);
    }

    function playHoverSound() {
        if (hoverSound) {
            hoverSound.currentTime = 0;
            hoverSound.play();
        }
    }

    function initializeEffects() {
        createMatrixEffect();
        createAudioVisualizer();
        setupAudioControls();
        createHolograms();
        createInteractiveWindows();
        initDrones();
        initInteractiveParticles();
        createLightningEffect();
        initFogEffect();
    }

    // Добавляем эффект матрицы
    function createMatrixEffect() {
        const canvas = document.createElement('canvas');
        canvas.className = 'matrix-canvas';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0f0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(draw, 33);
    }

    // Добавляем аудио-визуализатор
    function createAudioVisualizer() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(synthwave);
        
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const canvas = document.createElement('canvas');
        canvas.className = 'audio-visualizer';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = 100;
        
        function draw() {
            requestAnimationFrame(draw);
            
            analyser.getByteFrequencyData(dataArray);
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;
            
            for(let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2;
                
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, 'var(--neon-pink)');
                gradient.addColorStop(1, 'var(--neon-blue)');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                
                x += barWidth + 1;
            }
        }
        
        draw();
    }

    // Добавляем функцию создания голограмм
    function createHolograms() {
        const texts = [
            'SYSTEM ONLINE',
            'CONNECTING...',
            'DATA TRANSFER',
            'NEURAL LINK',
            'CYBERPUNK 2024'
        ];
        
        const container = document.createElement('div');
        container.className = 'holograms';
        document.body.appendChild(container);
        
        for (let i = 0; i < 10; i++) {
            const hologram = document.createElement('div');
            hologram.className = 'hologram';
            hologram.textContent = texts[Math.floor(Math.random() * texts.length)];
            hologram.style.left = `${Math.random() * 100}%`;
            hologram.style.top = `${Math.random() * 100}%`;
            hologram.style.animationDelay = `${Math.random() * 5}s`;
            container.appendChild(hologram);
        }
    }

    // Создаем интерактивные окна в зданиях
    function createInteractiveWindows() {
        const buildings = document.querySelectorAll('.building');
        
        buildings.forEach(building => {
            const windowCount = Math.floor(Math.random() * 20) + 10;
            
            for (let i = 0; i < windowCount; i++) {
                const window = document.createElement('div');
                window.className = 'building-window';
                
                window.style.left = `${Math.random() * 100}%`;
                window.style.top = `${Math.random() * 100}%`;
                
                window.addEventListener('click', () => {
                    gsap.to(window, {
                        backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, 255)`,
                        boxShadow: '0 0 30px currentColor',
                        duration: 0.3,
                        yoyo: true,
                        repeat: 1
                    });
                });
                
                building.appendChild(window);
            }
        });
    }

    // Инициализация дронов
    function initDrones() {
        const droneCount = 5;
        
        for (let i = 0; i < droneCount; i++) {
            createDrone();
        }
    }

    function createDrone() {
        const drone = document.createElement('div');
        drone.className = 'drone';
        document.querySelector('.city-background').appendChild(drone);
        
        animateDrone(drone);
    }

    function animateDrone(drone) {
        const path = [
            { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
            { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
            { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }
        ];
        
        gsap.to(drone, {
            duration: 10,
            motionPath: {
                path: path,
                autoRotate: true
            },
            ease: 'none',
            repeat: -1,
            onRepeat: () => {
                path.forEach(point => {
                    point.x = Math.random() * window.innerWidth;
                    point.y = Math.random() * window.innerHeight;
                });
            }
        });
    }

    // Инициализация интерактивных частиц
    function initInteractiveParticles() {
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.9) {
                createInteractiveParticle(e.clientX, e.clientY);
            }
        });
    }

    function createInteractiveParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'interactive-particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        document.body.appendChild(particle);
        
        gsap.to(particle, {
            duration: Math.random() * 2 + 1,
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            opacity: 0,
            scale: Math.random() * 3,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }

    // Добавляем определение возможностей устройства
    const deviceCapabilities = {
        isTouch: 'ontouchstart' in window,
        hasGoodGPU: !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };

    // Оптимизируем эффекты в зависимости от устройства
    function optimizeEffects() {
        if (!deviceCapabilities.hasGoodGPU) {
            // Упрощаем эффект тумана
            const fogLayers = document.querySelectorAll('.fog-layer');
            fogLayers.forEach((layer, index) => {
                if (index > 0) layer.remove();
            });
            
            // Уменьшаем частоту молний
            const lightningContainer = document.querySelector('.lightning-container');
            lightningContainer.style.opacity = '0.5';
        }

        if (deviceCapabilities.prefersReducedMotion) {
            // Отключаем анимации для пользователей, предпочитающих уменьшенное движение
            document.body.classList.add('reduce-motion');
        }
    }

    // Добавляем поддержку тач-устройств
    function addTouchSupport() {
        if (deviceCapabilities.isTouch) {
            const player = document.getElementById('player');
            let touchStartX, touchStartY;

            document.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            });

            document.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touchX = e.touches[0].clientX;
                const touchY = e.touches[0].clientY;

                player.style.left = `${touchX}px`;
                player.style.top = `${touchY}px`;

                // Создаем эффекты при движении
                if (Math.abs(touchX - touchStartX) > 10 || Math.abs(touchY - touchStartY) > 10) {
                    createTrailEffect(touchX, touchY);
                }
            });
        }
    }

    // Оптимизация анимаций
    function optimizeAnimations() {
        // Используем requestAnimationFrame для плавных анимаций
        let lastTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;

        function animate(currentTime) {
            if (!lastTime) lastTime = currentTime;
            const deltaTime = currentTime - lastTime;

            if (deltaTime >= frameInterval) {
                // Обновляем анимации
                updateParticles();
                updateDrones();
                updateHolograms();
                lastTime = currentTime;
            }

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }

    // Добавляем обработку изменения размера окна
    function handleResize() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Обновляем размеры канвасов и позиции элементов
                updateCanvasSizes();
                repositionElements();
            }, 250);
        });
    }

    // Оптимизация загрузки ресурсов
    function optimizeResourceLoading() {
        // Предзагрузка важных изображений
        const preloadImages = [
            'assets/video/city-loop.mp4',
            // Добавьте другие важные ресурсы
        ];

        preloadImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        // Отложенная загрузка менее важных ресурсов
        window.addEventListener('load', () => {
            loadSecondaryResources();
        });
    }

    // Инициализация всех оптимизаций
    function initOptimizations() {
        optimizeEffects();
        addTouchSupport();
        optimizeAnimations();
        handleResize();
        optimizeResourceLoading();
    }

    // Вызываем инициализацию при загрузке
    document.addEventListener('DOMContentLoaded', initOptimizations);

    // Вызываем функции при загрузке страницы
    initCityParallax();
    createFlyingCars();
    createRain();
    createHolograms();

    function createRealityDistortion(x, y) {
        const canvas = document.createElement('canvas');
        canvas.className = 'reality-distortion';
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        const ripples = [];
        const rippleCount = 3;
        const maxRadius = Math.max(window.innerWidth, window.innerHeight);

        for (let i = 0; i < rippleCount; i++) {
            ripples.push({
                x: x,
                y: y,
                radius: 0,
                alpha: 0.5,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`
            });
        }

        function drawRipples() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ripples.forEach((ripple, index) => {
                ctx.beginPath();
                ctx.strokeStyle = ripple.color;
                ctx.lineWidth = 2;
                ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                ctx.stroke();
                
                ripple.radius += 5;
                ripple.alpha -= 0.01;
                
                if (ripple.radius > maxRadius) {
                    ripples.splice(index, 1);
                }
            });

            if (ripples.length > 0) {
                requestAnimationFrame(drawRipples);
            } else {
                canvas.remove();
            }
        }

        drawRipples();
    }

    function createCityPulse() {
        const cityPulse = document.createElement('div');
        cityPulse.className = 'city-pulse';
        document.body.appendChild(cityPulse);

        function pulsate() {
            const buildings = document.querySelectorAll('.building');
            const neonSigns = document.querySelectorAll('.neon-sign');
            
            buildings.forEach(building => {
                gsap.to(building, {
                    duration: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.3 + 0.7,
                    yoyo: true,
                    repeat: -1,
                    ease: 'power2.inOut'
                });
            });

            neonSigns.forEach(sign => {
                gsap.to(sign, {
                    duration: Math.random() * 1.5 + 0.5,
                    textShadow: `0 0 ${Math.random() * 20 + 10}px currentColor`,
                    yoyo: true,
                    repeat: -1,
                    ease: 'power2.inOut'
                });
            });
        }

        pulsate();
    }

    function createSoundWaves() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(synthwave);
        
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const canvas = document.createElement('canvas');
        canvas.className = 'sound-waves';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        function draw() {
            requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            ctx.beginPath();
            ctx.moveTo(centerX + dataArray[0], centerY);
            
            for (let i = 1; i < bufferLength; i++) {
                const angle = (i / bufferLength) * Math.PI * 2;
                const radius = dataArray[i] * 2;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                ctx.lineTo(x, y);
            }
            
            ctx.closePath();
            ctx.strokeStyle = `hsl(${Date.now() / 50 % 360}, 100%, 50%)`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        
        draw();
    }

    function createDigitalRain() {
        const canvas = document.createElement('canvas');
        canvas.className = 'digital-rain';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const columns = Math.floor(canvas.width / 20);
        const drops = Array(columns).fill(0);
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0f0';
            ctx.font = '15px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = String.fromCharCode(0x30A0 + Math.random() * 96);
                const x = i * 20;
                const y = drops[i] * 20;
                
                ctx.fillText(text, x, y);
                
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            
            requestAnimationFrame(draw);
        }
        
        draw();
    }

    // Добавляем функцию создания молний
    function createLightningEffect() {
        const lightningContainer = document.querySelector('.lightning-container');
        
        function createLightning() {
            // Создаем вспышку
            const flash = document.createElement('div');
            flash.className = 'lightning-flash';
            lightningContainer.appendChild(flash);

            // Создаем SVG молнии
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.style.position = 'absolute';
            svg.style.top = '0';
            svg.style.left = '0';
            svg.style.pointerEvents = 'none';
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('stroke', 'rgba(255, 255, 255, 0.8)');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('fill', 'none');

            // Генерируем случайный путь для молнии
            const startX = Math.random() * window.innerWidth;
            let d = `M ${startX} 0`;
            let y = 0;
            
            while (y < window.innerHeight) {
                y += Math.random() * 100;
                const x = startX + (Math.random() - 0.5) * 200;
                d += ` L ${x} ${y}`;
            }

            path.setAttribute('d', d);
            svg.appendChild(path);
            lightningContainer.appendChild(svg);

            // Анимация молнии
            gsap.fromTo(path, 
                { strokeDasharray: path.getTotalLength(), strokeDashoffset: path.getTotalLength() },
                {
                    duration: 0.2,
                    strokeDashoffset: 0,
                    ease: 'none',
                    onComplete: () => {
                        setTimeout(() => {
                            flash.remove();
                            svg.remove();
                        }, 100);
                    }
                }
            );

            // Добавляем звук грома
            const thunder = new Audio('assets/audio/thunder.mp3');
            thunder.volume = 0.3;
            setTimeout(() => {
                thunder.play();
            }, 200);
        }

        // Случайная генерация молний
        function scheduleLightning() {
            const delay = Math.random() * 10000 + 5000; // 5-15 секунд
            setTimeout(() => {
                createLightning();
                scheduleLightning();
            }, delay);
        }

        scheduleLightning();
    }

    // Добавляем функцию управления туманом
    function initFogEffect() {
        const fogLayers = document.querySelectorAll('.fog-layer');
        
        // Добавляем интерактивность тумана при движении мыши
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            fogLayers.forEach((layer, index) => {
                const depth = (index + 1) * 0.2;
                gsap.to(layer, {
                    duration: 1,
                    x: mouseX * 100 * depth,
                    y: mouseY * 50 * depth,
                    ease: 'power2.out'
                });
            });
        });

        // Добавляем эффект искажения при движении
        function distortFog() {
            fogLayers.forEach(layer => {
                const currentX = parseFloat(layer.style.transform.split('translateX(')[1]) || 0;
                const distortion = Math.sin(Date.now() * 0.001) * 10;
                
                gsap.to(layer, {
                    duration: 2,
                    skewX: distortion,
                    ease: 'power1.inOut'
                });
            });

            requestAnimationFrame(distortFog);
        }

        distortFog();
    }

    // Добавляем обработку мобильных устройств
    function initMobileOptimizations() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Уменьшаем количество частиц
            if (window.particlesJS) {
                particlesJS.load('particles-js', {
                    particles: {
                        number: { value: 30 }, // Уменьшенное количество частиц
                        size: { value: 2 }
                    }
                });
            }

            // Отключаем тяжелые эффекты
            const heavyEffects = document.querySelectorAll('.matrix-effect, .heavy-animation');
            heavyEffects.forEach(effect => effect.style.display = 'none');

            // Оптимизируем анимации
            document.body.classList.add('mobile-optimized');
        }
    }

    // Вызываем функцию при загрузке
    document.addEventListener('DOMContentLoaded', initMobileOptimizations);

    // Добавляем обработку изменения размера окна
    window.addEventListener('resize', () => {
        // Пересчитываем размеры и позиции
        const gameContainer = document.querySelector('.game-container');
        const menuItems = document.querySelectorAll('.menu-item');
        
        if (gameContainer && menuItems) {
            const containerRect = gameContainer.getBoundingClientRect();
            
            menuItems.forEach(item => {
                // Убеждаемся, что элементы не выходят за границы
                const itemRect = item.getBoundingClientRect();
                
                if (itemRect.right > containerRect.right) {
                    item.style.right = '5%';
                    item.style.left = 'auto';
                }
                if (itemRect.bottom > containerRect.bottom) {
                    item.style.bottom = '5%';
                    item.style.top = 'auto';
                }
            });
        }
    });

    function init3DCards() {
        const cards = document.querySelectorAll('.feature-box');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                card.style.filter = 'brightness(1.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                card.style.filter = 'brightness(1)';
            });
        });
    }

    function initInteractiveBackground() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.className = 'background-canvas';
        document.body.appendChild(canvas);

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles = [];
        const properties = {
            bgColor: 'rgba(17, 17, 19, 1)',
            particleColor: 'rgba(255, 40, 40, 1)',
            particleRadius: 3,
            particleCount: 60,
            particleMaxVelocity: 0.5,
            lineLength: 150,
            particleLife: 6
        };

        window.onresize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                this.life = Math.random() * properties.particleLife * 60;
            }

            position() {
                this.x + this.velocityX > width && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
                this.y + this.velocityY > height && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
                this.x += this.velocityX;
                this.y += this.velocityY;
            }

            reDraw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = properties.particleColor;
                ctx.fill();
            }

            reCalculateLife() {
                if (this.life < 1) {
                    this.x = Math.random() * width;
                    this.y = Math.random() * height;
                    this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                    this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                    this.life = Math.random() * properties.particleLife * 60;
                }
                this.life--;
            }
        }

        function reDrawBackground() {
            ctx.fillStyle = properties.bgColor;
            ctx.fillRect(0, 0, width, height);
        }

        function drawLines() {
            let x1, y1, x2, y2, length, opacity;
            for (let i in particles) {
                for (let j in particles) {
                    x1 = particles[i].x;
                    y1 = particles[i].y;
                    x2 = particles[j].x;
                    y2 = particles[j].y;
                    length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    if (length < properties.lineLength) {
                        opacity = 1 - length / properties.lineLength;
                        ctx.lineWidth = '0.5';
                        ctx.strokeStyle = `rgba(255, 40, 40, ${opacity})`;
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.closePath();
                        ctx.stroke();
                    }
                }
            }
        }

        function reDrawParticles() {
            for (let i in particles) {
                particles[i].reCalculateLife();
                particles[i].position();
                particles[i].reDraw();
            }
        }

        function loop() {
            reDrawBackground();
            reDrawParticles();
            drawLines();
            requestAnimationFrame(loop);
        }

        function init() {
            for (let i = 0; i < properties.particleCount; i++) {
                particles.push(new Particle);
            }
            loop();
        }

        init();
    }

    function initPreloader() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-text">ЗАГРУЗКА СИСТЕМЫ</div>
                <div class="progress-bar">
                    <div class="progress"></div>
                </div>
                <div class="loader-status">0%</div>
            </div>
        `;
        document.body.appendChild(loader);

        const resources = [
            { type: 'image', url: 'assets/images/background.jpg' },
            { type: 'audio', url: 'assets/audio/synthwave.mp3' },
            { type: 'audio', url: 'assets/audio/ambient.mp3' },
            // Добавьте другие ресурсы
        ];

        let loadedCount = 0;
        const statusElement = loader.querySelector('.loader-status');
        const progressBar = loader.querySelector('.progress');

        resources.forEach(resource => {
            const element = resource.type === 'image' ? new Image() : new Audio();
            element.src = resource.url;
            element.onload = element.oncanplaythrough = () => {
                loadedCount++;
                const progress = (loadedCount / resources.length) * 100;
                statusElement.textContent = `${Math.round(progress)}%`;
                progressBar.style.width = `${progress}%`;

                if (loadedCount === resources.length) {
                    setTimeout(() => {
                        gsap.to(loader, {
                            opacity: 0,
                            duration: 0.5,
                            onComplete: () => loader.remove()
                        });
                    }, 500);
                }
            };
        });
    }

    function initAdaptiveQuality() {
        let quality = 'high';
        const fps = new FPSMeter();

        function checkPerformance() {
            const currentFPS = fps.getFPS();
            
            if (currentFPS < 30 && quality !== 'low') {
                quality = 'low';
                applyLowQuality();
            } else if (currentFPS > 50 && quality !== 'high') {
                quality = 'high';
                applyHighQuality();
            }
        }

        function applyLowQuality() {
            document.body.classList.add('low-quality');
            // Уменьшаем качество эффектов
            reduceShadowEffects();
            reduceParticles();
            disableComplexAnimations();
        }

        function applyHighQuality() {
            document.body.classList.remove('low-quality');
            // Восстанавливаем качество эффектов
            restoreShadowEffects();
            restoreParticles();
            enableComplexAnimations();
        }

        setInterval(checkPerformance, 1000);
    }

    function initGestureSupport() {
        let touchStartX = 0;
        let touchStartY = 0;
        let lastTap = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Определяем жест
            if (Math.abs(deltaX) > 100) {
                // Свайп влево/вправо
                handleHorizontalSwipe(deltaX > 0);
            } else if (Math.abs(deltaY) > 100) {
                // Свайп вверх/вниз
                handleVerticalSwipe(deltaY > 0);
            }

            // Двойное нажатие
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 500 && tapLength > 0) {
                handleDoubleTap(e);
            }
            lastTap = currentTime;
        });
    }

    function initPowerSavingMode() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        function updatePowerMode(e) {
            if (e.matches) {
                // Включаем режим энергосбережения
                document.body.classList.add('power-saving');
                disableAnimations();
                reduceEffects();
            } else {
                // Выключаем режим энергосбережения
                document.body.classList.remove('power-saving');
                enableAnimations();
                restoreEffects();
            }
        }
        
        prefersReducedMotion.addListener(updatePowerMode);
        updatePowerMode(prefersReducedMotion);
    }

    function initLegacySupport() {
        const isOldDevice = !window.CSS || !CSS.supports('(backdrop-filter: blur(10px))');
        
        if (isOldDevice) {
            document.body.classList.add('legacy-device');
            
            // Заменяем современные эффекты на более простые
            const blurElements = document.querySelectorAll('.blur-effect');
            blurElements.forEach(el => {
                el.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            });
            
            // Отключаем сложные анимации
            disableComplexAnimations();
        }
    }

    // Функция определения языка браузера
    function detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang.split('-')[0]; // Получаем короткий код языка (ru, en, es)
        
        // Проверяем, поддерживается ли язык браузера
        if (translations[shortLang]) {
            return shortLang;
        }
        return 'ru'; // Возвращаем русский по умолчанию
    }

    // Обновленная функция инициализации языкового переключателя
    function initLanguageSelector() {
        const links = document.querySelectorAll('.language-link');
        
        // Загружаем сохраненный язык или определяем язык браузера
        const savedLang = localStorage.getItem('selectedLanguage') || detectBrowserLanguage();
        
        function updateLanguage(lang) {
            console.log('Updating language to:', lang);
            
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.dataset.translate;
                console.log('Translating element:', element, 'with key:', key);
                
                if (translations[lang] && translations[lang][key]) {
                    if (element.hasAttribute('placeholder')) {
                        element.placeholder = translations[lang][key];
                    } else {
                        element.textContent = translations[lang][key];
                    }
                    console.log('Translation applied:', translations[lang][key]);
                } else {
                    console.warn('Missing translation for key:', key);
                }
            });

            // Специальная обработка для уникальных элементов
            const specialElements = {
                '.service-card': {
                    '.cyber-heading': ['webDev', 'modeling', 'uiDesign', 'aiIntegration'],
                    '.cyber-text': ['webDevDesc', 'modelingDesc', 'uiDesignDesc', 'aiDesc']
                },
                '.cyber-button': {
                    '.cyber-button-text': 'orderButton'
                }
            };

            // Обновляем уникальные элементы
            Object.entries(specialElements).forEach(([parentSelector, childSelectors]) => {
                document.querySelectorAll(parentSelector).forEach((parent, index) => {
                    Object.entries(childSelectors).forEach(([childSelector, keys]) => {
                        const child = parent.querySelector(childSelector);
                        if (child) {
                            const key = Array.isArray(keys) ? keys[index] : keys;
                            if (translations[lang][key]) {
                                child.textContent = translations[lang][key];
                            }
                        }
                    });
                });
            });

            // Сохраняем выбранный язык
            localStorage.setItem('selectedLanguage', lang);
        }

        // Добавляем обработчики событий для каждой языковой ссылки
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const newLang = link.dataset.lang;
                updateLanguage(newLang);
            });
        });

        // Устанавливаем начальный язык
        updateLanguage(savedLang);

        // Добавляем отладочную информацию
        console.log('Language selector initialized');
        console.log('Current language:', localStorage.getItem('selectedLanguage'));
        
        // Проверяем наличие элементов для перевода
        const translatableElements = document.querySelectorAll('[data-translate]');
        console.log('Found translatable elements:', translatableElements.length);
    }

    // Вызываем функцию при загрузке страницы
    initLanguageSelector();
});

function createRain() {
    const container = document.createElement('div');
    container.className = 'rain';
    document.body.appendChild(container);
    
    for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(drop);
    }
}

// Вызываем функции при загрузке
document.addEventListener('DOMContentLoaded', () => {
    createHolograms();
    createRain();
});

function initCyberpunkEffects() {
    // Создаем неоновые линии
    const neonLines = document.querySelector('.neon-lines');
    for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.className = 'neon-line';
        line.style.top = `${Math.random() * 100}%`;
        line.style.animationDelay = `${Math.random() * 8}s`;
        neonLines.appendChild(line);
    }

    // Создаем голографические элементы
    const holoContainer = document.querySelector('.holo-elements');
    const holoTexts = [
        'CYBERPUNK',
        'SYSTEM ERROR',
        'ACCESS DENIED',
        'NEURAL LINK',
        'DATA BREACH'
    ];

    for (let i = 0; i < 10; i++) {
        const holo = document.createElement('div');
        holo.className = 'holo-element';
        holo.textContent = holoTexts[Math.floor(Math.random() * holoTexts.length)];
        holo.style.left = `${Math.random() * 100}%`;
        holo.style.top = `${Math.random() * 100}%`;
        holo.style.animationDelay = `${Math.random() * 5}s`;
        holoContainer.appendChild(holo);
    }

    // Добавляем эффект glitch при скролле
    window.addEventListener('scroll', () => {
        const glitchBg = document.querySelector('.glitch-bg');
        if (Math.random() > 0.95) {
            glitchBg.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
            setTimeout(() => {
                glitchBg.style.transform = 'translate(0)';
            }, 100);
        }
    });
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', initCyberpunkEffects);

function initTextEffects() {
    const headings = document.querySelectorAll('.cyber-heading');
    
    headings.forEach(heading => {
        heading.addEventListener('mouseover', () => {
            heading.style.transform = 'scale(1.05)';
            heading.style.textShadow = `
                0 0 5px var(--cyber-yellow),
                0 0 10px var(--cyber-yellow),
                0 0 20px var(--cyber-yellow)
            `;
        });

        heading.addEventListener('mouseout', () => {
            heading.style.transform = 'scale(1)';
            heading.style.textShadow = 'none';
        });
    });
}

function initCyberMap() {
    const gridContainer = document.querySelector('.grid-lines');
    
    // Создаем сетку
    for (let i = 0; i <= 10; i++) {
        // Горизонтальные линии
        const horizontalLine = document.createElement('div');
        horizontalLine.className = 'grid-line horizontal';
        horizontalLine.style.top = `${i * 10}%`;
        gridContainer.appendChild(horizontalLine);

        // Вертикальные линии
        const verticalLine = document.createElement('div');
        verticalLine.className = 'grid-line vertical';
        verticalLine.style.left = `${i * 10}%`;
        gridContainer.appendChild(verticalLine);
    }

    // Добавляем интерактивность маркеру
    const marker = document.querySelector('.location-marker');
    marker.addEventListener('mouseover', () => {
        marker.style.transform = 'translate(-50%, -50%) scale(1.1)';
    });
    
    marker.addEventListener('mouseout', () => {
        marker.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.cyber-map')) {
        initCyberMap();
    }
});

// Создание пиксельных эффектов
function initPixelEffects() {
    // Создаем пиксельную сетку
    function createPixelGrid(container) {
        const grid = document.createElement('div');
        grid.className = 'pixel-grid';
        
        for (let i = 0; i < 64; i++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            grid.appendChild(pixel);
        }
        
        container.appendChild(grid);
    }

    // Анимация пиксельного перехода
    function pixelTransition(element) {
        const pixels = [];
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const pixelSize = 4;

        for (let y = 0; y < height; y += pixelSize) {
            for (let x = 0; x < width; x += pixelSize) {
                const pixel = document.createElement('div');
                pixel.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${pixelSize}px;
                    height: ${pixelSize}px;
                    background-color: var(--hotline-pink);
                    transform: scale(0);
                `;
                pixels.push(pixel);
                element.appendChild(pixel);
            }
        }

        pixels.forEach((pixel, i) => {
            gsap.to(pixel, {
                scale: 1,
                duration: 0.5,
                delay: i * 0.01,
                ease: 'power2.out'
            });
        });
    }
}
