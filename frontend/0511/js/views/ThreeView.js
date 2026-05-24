/**
 * ThreeView - 負責 Three.js 3D 場景渲染的 View (Biotech 數據節點主題)
 */
class ThreeView {
    constructor() {
        this.compContainer = document.getElementById('computer-container');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        
        // 互動狀態
        this.targetRotY = 0;
        this.currentRotY = 0;
        this.targetRotX = 0;
        this.currentRotX = 0;
        this.targetPosX = 0;
        this.currentPosX = 0;
        this.targetPosY = 0;
        this.currentPosY = 0;

        this.dnaGroup = null;
        this.particles = null;
        this.connections = null;
        this.clock = null;
    }

    init() {
        if (!this.compContainer || typeof THREE === 'undefined') return;

        // 場景
        this.scene = new THREE.Scene();
        // 加入一點霧效讓深處有神祕感
        this.scene.fog = new THREE.FogExp2(0x030712, 0.03);

        // 相機
        this.camera = new THREE.PerspectiveCamera(
            45,
            this.compContainer.clientWidth / this.compContainer.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 20);

        // 渲染器
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.compContainer.clientWidth, this.compContainer.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.compContainer.appendChild(this.renderer.domElement);

        // 綁定 Resize
        window.addEventListener('resize', this.onResize.bind(this));

        // 建立生物科技 DNA 視覺
        this.createBiotechDNA();

        // 燈光
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x10b981, 3, 50); // Emerald Green
        pointLight1.position.set(5, 5, 5);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x06b6d4, 3, 50); // Cyan
        pointLight2.position.set(-5, -5, 5);
        this.scene.add(pointLight2);

        this.clock = new THREE.Clock();
        this.animate();
    }

    createBiotechDNA() {
        this.dnaGroup = new THREE.Group();
        
        const numParticles = 400;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(numParticles * 3);
        const colors = new Float32Array(numParticles * 3);
        const sizes = new Float32Array(numParticles);
        
        const color1 = new THREE.Color(0x10b981); // Green
        const color2 = new THREE.Color(0x06b6d4); // Cyan

        let i = 0;
        for (let pt = 0; pt < numParticles; pt++) {
            // 雙股螺旋的數學分佈
            const t = pt * 0.15;
            const radius = 4 + Math.random() * 0.5;
            
            // 決定屬於哪一股
            const strandOffset = (pt % 2 === 0) ? 0 : Math.PI;
            
            const x = Math.cos(t + strandOffset) * radius;
            const y = (pt - numParticles / 2) * 0.2;
            const z = Math.sin(t + strandOffset) * radius;

            positions[i] = x;
            positions[i + 1] = y;
            positions[i + 2] = z;

            const mixRatio = (y + 20) / 40; // 隨高度漸變
            const pColor = color1.clone().lerp(color2, Math.random() * 0.5 + mixRatio * 0.5);
            colors[i] = pColor.r;
            colors[i + 1] = pColor.g;
            colors[i + 2] = pColor.b;

            sizes[pt] = Math.random() * 2 + 1;

            i += 3;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        // 畫圓形粒子
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.4, 'rgba(16,185,129,0.8)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 16, 16);
        const texture = new THREE.CanvasTexture(canvas);

        const material = new THREE.PointsMaterial({
            size: 0.8,
            map: texture,
            vertexColors: true,
            transparent: true,
            opacity: 1.0,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particles = new THREE.Points(geometry, material);
        this.dnaGroup.add(this.particles);

        // 建立連線 (Data Platform 意象)
        const lineMat = new THREE.LineBasicMaterial({
            color: 0x06b6d4, // Use cyan for the linking lines for a more techy feel
            transparent: true,
            opacity: 0.35,
            blending: THREE.AdditiveBlending
        });
        
        const lineGeo = new THREE.BufferGeometry();
        const linePositions = [];
        // 每對粒子建立橫向連接
        for(let j=0; j<numParticles-1; j+=2) {
            linePositions.push(
                positions[j*3], positions[j*3+1], positions[j*3+2],
                positions[(j+1)*3], positions[(j+1)*3+1], positions[(j+1)*3+2]
            );
        }
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        this.connections = new THREE.LineSegments(lineGeo, lineMat);
        this.dnaGroup.add(this.connections);

        // 隨機資料微粒背景
        const bgParticlesGeo = new THREE.BufferGeometry();
        const bgCount = 800;
        const bgPos = new Float32Array(bgCount * 3);
        for(let k=0; k<bgCount*3; k++) {
            bgPos[k] = (Math.random() - 0.5) * 50;
        }
        bgParticlesGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
        const bgMat = new THREE.PointsMaterial({
            color: 0x06b6d4,
            size: 0.15,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });
        this.bgParticles = new THREE.Points(bgParticlesGeo, bgMat);
        this.scene.add(this.bgParticles);

        this.dnaGroup.position.set(0, 0, 0);
        this.dnaGroup.rotation.z = Math.PI / 12; // 微傾斜
        this.scene.add(this.dnaGroup);
    }

    updateMousePosition(x, y) {
        // x, y 為已標準化的 -1 至 1
        this.targetRotY = x * 0.5;
        this.targetRotX = y * 0.3;
        this.targetPosX = x * 2;
        this.targetPosY = -y * 2;
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        if (!this.clock) return;
        const elapsed = this.clock.getElapsedTime();

        // 平滑漸進旋轉與位移 (響應滑鼠)
        this.currentRotY += (this.targetRotY - this.currentRotY) * 0.05;
        this.currentRotX += (this.targetRotX - this.currentRotX) * 0.05;
        this.currentPosX += (this.targetPosX - this.currentPosX) * 0.05;
        this.currentPosY += (this.targetPosY - this.currentPosY) * 0.05;

        // DNA 自轉加上滑鼠控制
        if (this.dnaGroup) {
            this.dnaGroup.rotation.y = elapsed * 0.15 + this.currentRotY;
            this.dnaGroup.rotation.x = this.currentRotX;
            this.dnaGroup.position.x = this.currentPosX;
            this.dnaGroup.position.y = Math.sin(elapsed * 0.5) * 0.5 + this.currentPosY;
        }

        // 背景粒子緩慢飄動
        if (this.bgParticles) {
            this.bgParticles.rotation.y = elapsed * 0.03;
            this.bgParticles.rotation.z = elapsed * 0.01;
        }

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    onResize() {
        if (!this.compContainer || !this.camera || !this.renderer) return;
        this.camera.aspect = this.compContainer.clientWidth / this.compContainer.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.compContainer.clientWidth, this.compContainer.clientHeight);
    }
}
