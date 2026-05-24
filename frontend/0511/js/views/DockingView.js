/**
 * DockingView - 高保真 3D 分子對接 (Molecular Docking) 動畫
 * 負責渲染「市場財務洞察」背景，提供擬真且互動的生技視覺體驗。
 */
class DockingView {
    constructor() {
        this.container = document.getElementById('docking-container');
        this.homeSection = document.getElementById('home');
        this.heroContent = document.querySelector('.hero-content');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        
        // 互動狀態
        this.isDocking = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotY = 0;
        this.currentRotY = 0;

        // 3D 物件
        this.receptor = null;
        this.ligands = [];
        this.clock = null;
    }

    init() {
        if (!this.container || typeof THREE === 'undefined') return;

        // 場景
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x030712, 0.02);

        // 相機
        this.camera = new THREE.PerspectiveCamera(
            35,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 35);

        // 渲染器 - 開啟物理渲染
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.container.appendChild(this.renderer.domElement);

        // 建立受體 (Receptor) 與配體 (Ligands)
        this.buildMolecules();

        // 高擬真燈光設置
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);

        // 主光源 (青藍色)
        const mainLight = new THREE.DirectionalLight(0x06b6d4, 2);
        mainLight.position.set(10, 10, 10);
        this.scene.add(mainLight);

        // 側背光 (翠綠色/亮藍色 - 突顯邊緣輪廓與表面凹凸)
        const rimLight = new THREE.SpotLight(0x38bdf8, 5);
        rimLight.position.set(-20, 10, -10);
        rimLight.angle = 0.5;
        this.scene.add(rimLight);

        // 底部補光 (填補暗部，模擬 Ambient Occlusion)
        const fillLight = new THREE.PointLight(0x1e3a8a, 2, 50);
        fillLight.position.set(0, -10, 5);
        this.scene.add(fillLight);

        // 綁定事件
        window.addEventListener('resize', this.onResize.bind(this));
        
        if (this.homeSection) {
            this.homeSection.addEventListener('mousemove', (e) => {
                const rect = this.homeSection.getBoundingClientRect();
                this.mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                this.mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                this.targetRotY = this.mouseX * 0.4;
            });
        }

        if (this.heroContent) {
            this.heroContent.addEventListener('mouseenter', () => {
                this.isDocking = true;
            });

            this.heroContent.addEventListener('mouseleave', () => {
                this.isDocking = false;
            });
        }

        this.clock = new THREE.Clock();
        this.animate();
    }

    buildMolecules() {
        // -----------------------------------------------------
        // 1. 建立受體大分子 (Receptor / Protein Surface)
        // -----------------------------------------------------
        this.receptor = new THREE.Group();
        
        // 使用更高級的物理材質 (MeshPhysicalMaterial) 來模擬真實蛋白質表面的塑膠質感與光澤
        const proteinMat = new THREE.MeshPhysicalMaterial({
            color: 0x4f8cff,     // 更加真實的蛋白質水藍色 (對齊圖片)
            roughness: 0.45,     // 適中的粗糙度產生柔和高光
            metalness: 0.05,     // 極低金屬感
            clearcoat: 0.3,      // 表面清漆層，模擬電子顯微鏡下的濕潤/光滑感
            clearcoatRoughness: 0.25,
            flatShading: false
        });

        // 建立超高面數球體作為連續表面的基底 (detail: 64 會產生約 4 萬個頂點，極度細膩)
        const baseRadius = 10;
        const geometry = new THREE.IcosahedronGeometry(baseRadius, 64);
        
        const positionAttribute = geometry.getAttribute('position');
        const vertex = new THREE.Vector3();
        const pocketCenter = new THREE.Vector3(8, 2, 8).normalize(); // 凹槽方向
        
        // 遍歷所有頂點進行形變 (Procedural Displacement)
        for (let i = 0; i < positionAttribute.count; i++) {
            vertex.fromBufferAttribute(positionAttribute, i);
            
            // 1. 全域起伏與原子級凹凸 (Bumps): 混合多種頻率的 Noise 來模擬真實的分子表面 (Van der Waals surface)
            // 大區塊起伏 (蛋白質結構域)
            const macroNoise = Math.sin(vertex.x * 0.5) * Math.cos(vertex.y * 0.5) * Math.sin(vertex.z * 0.5);
            // 中型突起 (胺基酸側鏈)
            const midNoise = Math.sin(vertex.x * 1.5 + 1) * Math.cos(vertex.y * 1.5 - 1) * Math.sin(vertex.z * 1.5);
            // 微小原子顆粒感 (Atomic bumps - 極高頻率)
            const microNoise = Math.sin(vertex.x * 4) * Math.cos(vertex.y * 4) * Math.sin(vertex.z * 4);
            
            // 結合各種頻率的形變
            const displacement = 1 + (macroNoise * 0.1) + (midNoise * 0.04) + (microNoise * 0.015);
            vertex.multiplyScalar(displacement);

            // 2. 雕刻凹槽 (Active Site / Pocket)
            // 測量頂點方向與凹槽方向的夾角
            const vDir = vertex.clone().normalize();
            const dot = vDir.dot(pocketCenter);
            
            // 如果頂點在這個錐角範圍內，則向內縮 (形成洞穴)
            if (dot > 0.8) {
                // dot 範圍是 0.8 ~ 1.0，映射到深度的強度
                const depthIntensity = (dot - 0.8) / 0.2; // 0 ~ 1
                
                // 洞口邊緣平滑過渡
                const smoothDepth = Math.pow(depthIntensity, 1.5) * 4.5; // 最大深度 4.5
                
                // 往中心內縮
                vertex.multiplyScalar(1 - (smoothDepth / baseRadius));
            }

            positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }

        // 重新計算法線以確保光照正確
        geometry.computeVertexNormals();

        const proteinMesh = new THREE.Mesh(geometry, proteinMat);
        this.receptor.add(proteinMesh);

        // 將整個受體移動到左側，給右側留空間
        this.receptor.position.set(-8, 0, 0); 
        this.scene.add(this.receptor);

        // -----------------------------------------------------
        // 2. 建立小分子配體 (Ligands / Drug Molecules)
        // -----------------------------------------------------
        const bondMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.2, metalness: 0.8 });
        // 對齊圖片：紅(氧), 橘(磷/特定元素), 灰白(碳/骨架)
        const atomMats = [
            new THREE.MeshStandardMaterial({ color: 0xff4500, roughness: 0.1, metalness: 0.2 }), // 橘色 (Orange)
            new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.1, metalness: 0.2 }), // 紅色 (Red)
            new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.2, metalness: 0.1 })  // 灰色 (Grey)
        ];

        for (let i = 0; i < 5; i++) {
            const ligand = this.createBallAndStickMolecule(atomMats, bondMat);
            
            // 初始漂浮位置 (在畫面右側)
            const initialPos = new THREE.Vector3(
                15 + Math.random() * 10,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 15
            );

            // 對接完美座標 (在 receptor pocket 內部)
            // pocket 在 receptor 局部座標約 (8, 2, 8) 的內縮處
            // receptor 位於 (-8, 0, 0)，所以世界座標 pocket 約在 (0, 2, 8) 附近
            const dockPos = i === 0 ? new THREE.Vector3(-1.5, 1.5, 5.5) : new THREE.Vector3(
                -1.5 + (Math.random() - 0.5) * 5,
                1.5 + (Math.random() - 0.5) * 5,
                5.5 + (Math.random() - 0.5) * 5
            );

            // 完美的對接旋轉角度 (Lock-and-key 原理)
            const dockRot = new THREE.Euler(
                0.5,
                -0.8,
                0.2
            );

            ligand.position.copy(initialPos);

            this.ligands.push({
                mesh: ligand,
                initPos: initialPos,
                dockPos: dockPos,
                dockRot: dockRot,
                floatOffset: Math.random() * Math.PI * 2,
                speed: 0.4 + Math.random() * 0.6,
                isMain: i === 0 // 標記主配體
            });

            this.scene.add(ligand);
        }
    }

    // 建立逼真的「球棍模型」(Ball-and-stick model)
    createBallAndStickMolecule(atomMats, bondMat) {
        const group = new THREE.Group();
        const atomGeo = new THREE.SphereGeometry(0.5, 32, 32); // 稍微加大原子半徑
        
        const coords = [
            new THREE.Vector3(0, 0, 0),       // Center (Orange)
            new THREE.Vector3(1.5, 0.8, 0),   // Branch 1 (Red)
            new THREE.Vector3(-1.2, 1.2, 0.6),// Branch 2 (Grey)
            new THREE.Vector3(0.3, -1.5, -1.0)// Branch 3 (Red)
        ];

        // 放置原子
        coords.forEach((pos, idx) => {
            const mat = atomMats[idx % atomMats.length];
            const atom = new THREE.Mesh(atomGeo, mat);
            atom.position.copy(pos);
            group.add(atom);
        });

        // 建立化學鍵 (更粗的圓柱體，更接近真實的 Ball-and-Stick 比例)
        for(let i=1; i<coords.length; i++) {
            const start = coords[0];
            const end = coords[i];
            const distance = start.distanceTo(end);
            
            // 增加圓柱半徑為 0.18，讓鍵看起來更厚實
            const bondGeo = new THREE.CylinderGeometry(0.18, 0.18, distance, 16);
            const bond = new THREE.Mesh(bondGeo, bondMat);
            
            // 將圓柱體定位並旋轉對齊兩個原子
            const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
            bond.position.copy(midPoint);
            bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.clone().sub(start).normalize());
            
            group.add(bond);
        }

        return group;
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        if (!this.clock) return;
        const elapsed = this.clock.getElapsedTime();

        // 1. 環境視角互動 (滑鼠跟隨)
        this.currentRotY += (this.targetRotY - this.currentRotY) * 0.05;
        this.scene.rotation.y = this.currentRotY;
        this.scene.rotation.x = this.mouseY * 0.1;

        // 2. 受體 (Receptor) 緩慢呼吸與自轉
        if (this.receptor) {
            this.receptor.rotation.y = elapsed * 0.05;
            this.receptor.rotation.z = Math.sin(elapsed * 0.1) * 0.05;
        }

        // 3. 配體 (Ligands) 對接與遊離邏輯
        this.ligands.forEach(lig => {
            if (this.isDocking) {
                // 模擬真實的 Induced-Fit 對接：快速拉近，然後微調旋轉以「卡入」凹槽
                
                // 平移
                lig.mesh.position.lerp(lig.dockPos, 0.04 * lig.speed);
                
                // 旋轉對齊 (Quaternion slerp)
                const targetQuat = new THREE.Quaternion().setFromEuler(lig.dockRot);
                lig.mesh.quaternion.slerp(targetQuat, 0.05 * lig.speed);

            } else {
                // 游離狀態：模擬布朗運動漂浮
                const floatPos = lig.initPos.clone().add(new THREE.Vector3(
                    Math.sin(elapsed * lig.speed + lig.floatOffset) * 2.5,
                    Math.cos(elapsed * lig.speed * 0.8 + lig.floatOffset) * 3.5,
                    Math.sin(elapsed * lig.speed * 1.2) * 2.5
                ));
                lig.mesh.position.lerp(floatPos, 0.03);
                
                // 隨機自轉
                lig.mesh.rotateX(0.01 * lig.speed);
                lig.mesh.rotateY(0.02 * lig.speed);
                lig.mesh.rotateZ(0.015 * lig.speed);
            }
        });

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    onResize() {
        if (!this.container || !this.camera || !this.renderer) return;
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
}
