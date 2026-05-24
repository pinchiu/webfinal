/**
 * DnaView - 負責右側互動式 DNA 動畫的 View
 */
class DnaView {
    constructor() {
        this.dnaContainer = document.getElementById('dnaPanelRight');
        this.mouseInfluence = 0;
        this.mouseX = 0.5;
        this.mouseY = 0.5;
        this.dnaTimelines = [];
        this.dots = 14;
    }

    /**
     * 初始化 DNA 結構與滑鼠事件
     */
    init() {
        if (!this.dnaContainer) return;

        // 移除舊的節點
        this.dnaContainer.querySelectorAll('.dna-dot-wrapper').forEach(w => w.remove());

        // 綁定滑鼠懸停與移動事件
        this.dnaContainer.addEventListener('mouseenter', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    mouseInfluence: 1,
                    duration: 0.5,
                    overwrite: 'auto'
                });
            }
        });

        this.dnaContainer.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    mouseInfluence: 0,
                    duration: 0.8,
                    overwrite: 'auto'
                });
            }
        });

        this.dnaContainer.addEventListener('mousemove', (e) => {
            const rect = this.dnaContainer.getBoundingClientRect();
            this.mouseX = (e.clientX - rect.left) / rect.width;
            this.mouseY = (e.clientY - rect.top) / rect.height;
        });

        // 建立 DNA 連接點與線段
        this.createDnaElements();

        // 啟動動畫循環更新
        this.tick();
    }

    createDnaElements() {
        if (typeof gsap === 'undefined') return;

        for (let i = 0; i < this.dots; i++) {
            const wrapper = document.createElement('div');
            wrapper.className = 'dna-dot-wrapper';
            wrapper.style.cssText = `
                position: absolute;
                top: ${(i / this.dots) * 88 + 6}%;
                left: 50%;
                width: 0;
                height: 0;
                z-index: 4;
                pointer-events: none;
            `;

            const dot1 = document.createElement('div');
            const dot2 = document.createElement('div');
            const line = document.createElement('div');

            dot1.className = 'dna-dot dot-1';
            dot2.className = 'dna-dot dot-2';
            line.className = 'dna-line';

            wrapper.appendChild(line);
            wrapper.appendChild(dot1);
            wrapper.appendChild(dot2);
            this.dnaContainer.appendChild(wrapper);

            const delay = i * 0.14;
            const baseSpeed = 0.72;

            // 左點動畫
            const t1 = gsap.timeline({ repeat: -1, delay });
            t1.set(dot1, { x: -60, scale: 0.6, opacity: 0.3, filter: 'blur(1px)' });
            t1.to(dot1, { x: 0, scale: 1.4, opacity: 1.0, filter: 'blur(0px)', duration: baseSpeed, ease: 'sine.out' })
                .to(dot1, { x: 60, scale: 0.6, opacity: 0.3, filter: 'blur(1px)', duration: baseSpeed, ease: 'sine.in' })
                .to(dot1, { x: 0, scale: 0.4, opacity: 0.2, filter: 'blur(2px)', duration: baseSpeed, ease: 'sine.out' })
                .to(dot1, { x: -60, scale: 0.6, opacity: 0.3, filter: 'blur(1px)', duration: baseSpeed, ease: 'sine.in' });

            // 右點動畫
            const t2 = gsap.timeline({ repeat: -1, delay });
            t2.set(dot2, { x: 60, scale: 0.6, opacity: 0.3, filter: 'blur(1px)' });
            t2.to(dot2, { x: 0, scale: 0.4, opacity: 0.2, filter: 'blur(2px)', duration: baseSpeed, ease: 'sine.out' })
                .to(dot2, { x: -60, scale: 0.6, opacity: 0.3, filter: 'blur(1px)', duration: baseSpeed, ease: 'sine.in' })
                .to(dot2, { x: 0, scale: 1.4, opacity: 1.0, filter: 'blur(0px)', duration: baseSpeed, ease: 'sine.out' })
                .to(dot2, { x: 60, scale: 0.6, opacity: 0.3, filter: 'blur(1px)', duration: baseSpeed, ease: 'sine.in' });

            // 同步連接線
            t1.eventCallback('onUpdate', () => {
                const x1 = gsap.getProperty(dot1, 'x');
                const x2 = gsap.getProperty(dot2, 'x');
                const minX = Math.min(x1, x2);
                const maxX = Math.max(x1, x2);
                line.style.left = `${minX}px`;
                line.style.width = `${maxX - minX}px`;
                const op1 = gsap.getProperty(dot1, 'opacity');
                const op2 = gsap.getProperty(dot2, 'opacity');
                line.style.opacity = (op1 + op2) / 2 * 0.4;
            });

            this.dnaTimelines.push({ t1, t2, dot1, dot2, rowIndex: i });
        }
    }

    tick() {
        requestAnimationFrame(this.tick.bind(this));
        if (typeof gsap === 'undefined') return;

        this.dnaTimelines.forEach(({ t1, t2, dot1, dot2, rowIndex }) => {
            const rowY = (rowIndex / this.dots) + (1 / this.dots / 2);
            const proximity = 1 - Math.min(Math.abs(rowY - this.mouseY) * 4, 1);
            const boost = 1 + this.mouseInfluence * proximity * 1.8;

            // 滑鼠靠近時加速旋轉
            t1.timeScale(boost);
            t2.timeScale(boost);

            // 靠近時顏色漸變為青色
            const r = Math.round(16 - 16 * this.mouseInfluence * proximity);
            const g = Math.round(185 + 40 * this.mouseInfluence * proximity);
            const b = Math.round(129 + 100 * this.mouseInfluence * proximity);
            const col = `rgb(${r},${g},${b})`;
            dot1.style.background = col;
            dot1.style.boxShadow = `0 0 ${8 + this.mouseInfluence * proximity * 14}px ${col}`;
            dot2.style.background = col;
            dot2.style.boxShadow = `0 0 ${8 + this.mouseInfluence * proximity * 14}px ${col}`;
        });
    }
}
