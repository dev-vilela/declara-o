   const letterContent = "Há 1 ano atrás eu disse que ficaríamos juntos…\nE agora sinto que o momento está chegando.\nEu sei que o tempo passou, mas o que eu sinto só ficou mais forte.\nVocê conhece minhas intenções, sabe que não é algo passageiro.\n\nDesde que você entrou na minha vida, tudo ganhou mais cor, mais sentido…\nSeu sorriso tem o poder de acalmar meus dias mais difíceis,\ne a sua presença transforma qualquer momento simples em algo especial.\n\nEu admiro quem você é, o seu jeito, sua força, sua essência…\nE é impossível não imaginar um futuro onde você esteja ao meu lado.\nNão é só sobre gostar, é sobre querer cuidar, proteger,\nestar presente e construir algo verdadeiro com você.\n\nEu não quero algo passageiro, eu quero viver momentos,\ncriar memórias, enfrentar desafios juntos e crescer ao seu lado.\nQuero ser alguém que te faz bem, que te traz segurança,\ne que esteja ali em todos os momentos, bons e difíceis.\n\nPor isso hoje eu quero te fazer uma pergunta…";
   
        function createHeart() {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
        }

        function openLetter() {
            const intro = document.getElementById('intro-screen');
            const main = document.getElementById('main-content');
            const music = document.getElementById('bg-music');

            // Tentar tocar música
            music.volume = 0.3;
            music.play().catch(() => console.log("Auto-play bloqueado pelo navegador"));

            // Efeito de corações ao abrir
            for(let i=0; i<30; i++) {
                setTimeout(createHeart, i * 100);
            }

            intro.classList.add('opacity-0');
            setTimeout(() => {
                intro.classList.add('hidden');
                main.classList.remove('hidden');
                setTimeout(() => {
                    main.classList.add('opacity-100');
                    startTyping();
                }, 100);
            }, 1000);
        }

        function startTyping() {
            const textElement = document.getElementById('letter-text');
            let index = 0;

            function type() {
                if (index < letterContent.length) {
                    const char = letterContent.charAt(index);
                    textElement.innerHTML += char === '\n' ? '<br><br>' : char;
                    index++;
                    setTimeout(type, 50);
                } else {
                    document.getElementById('proposal-section').classList.add('opacity-100', 'translate-y-0');
                    // Ativar observador de scroll para as seções seguintes
                    initScrollReveal();
                }
            }
            type();
        }

        function initScrollReveal() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
        }

        function acceptProposal() {
            const final = document.getElementById('final-screen');
            final.classList.remove('hidden');
            final.classList.add('flex');
            
            // Explosão massiva de corações
            for(let i=0; i<100; i++) {
                setTimeout(createHeart, i * 20);
            }

            initStarfield();
        }

        function initStarfield() {
            const canvas = document.getElementById('starfield');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const stars = Array.from({ length: 200 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5 + 0.1
            }));

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'white';
                stars.forEach(star => {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                    ctx.fill();
                    star.y -= star.speed;
                    if (star.y < 0) star.y = canvas.height;
                });
                requestAnimationFrame(animate);
            }
            animate();
        }

        // Responsividade do Canvas
        window.addEventListener('resize', () => {
            const canvas = document.getElementById('starfield');
            if(canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        });