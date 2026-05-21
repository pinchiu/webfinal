document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Responsive Mobile Menu Toggle
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose && navMenu) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('show-menu');
            }
        });
    });

    // 0. Mock Data for Robust Offline Fallback
    const MOCK_COMPANIES = [
        // 基因體與生物資訊
        { id: 1, name: "基龍米克斯", category: "基因體與生物資訊", products: "次世代定序(NGS)、核酸合成、生物資訊分析", address: "新北市汐止區新台五路一段100號14樓", city: "新北市", phone: "02-2696-1658", email: "info@genomics.com.tw", website: "https://www.genomics.com.tw", capital: "4.5億", profit: 38.5, salary: "75,000", image: "" },
        { id: 2, name: "行動基因", category: "基因體與生物資訊", products: "癌症基因檢測 (ACTOnco)、免疫治療評估", address: "台北市內湖區新湖二路345號3樓", city: "台北市", phone: "02-2795-3660", email: "service@actgenomics.com", website: "https://www.actgenomics.com", capital: "3.2億", profit: 45.0, salary: "82,000", image: "" },
        { id: 3, name: "華聯生技", category: "基因體與生物資訊", products: "基因微陣列晶片、RNA定序、臨床分子檢測", address: "台北市南港區園區街3號12樓", city: "台北市", phone: "02-6616-0001", email: "service@welgene.com.tw", website: "https://www.welgene.com.tw", capital: "2.8億", profit: 41.2, salary: "70,000", image: "" },
        { id: 4, name: "麗寶生醫", category: "基因體與生物資訊", products: "癌症與罕見疾病基因檢測、分子診斷", address: "台北市中山區建國北路二段135號14樓", city: "台北市", phone: "02-2509-0822", email: "service@libobio.com", website: "http://www.libobio.com", capital: "1.5億", profit: 35.6, salary: "68,000", image: "" },
        { id: 5, name: "創源生技", category: "基因體與生物資訊", products: "新生兒篩檢、非侵入性胎兒染色體檢測(NIPT)", address: "台北市內湖區新湖一路36巷28號", city: "台北市", phone: "02-2795-1777", email: "service@bionetcorp.com", website: "https://healthgene.bionetcorp.com", capital: "2.5億", profit: 42.8, salary: "72,000", image: "" },
        { id: 6, name: "即時基因", category: "基因體與生物資訊", products: "生物資訊大數據運算平台、雲端基因分析", address: "台北市中正區羅斯福路二段9號9樓", city: "台北市", phone: "02-2396-0120", email: "service@atgenomix.com", website: "https://www.atgenomix.com", capital: "8,000萬", profit: 48.0, salary: "88,000", image: "" },
        { id: 7, name: "精拓生技", category: "基因體與生物資訊", products: "體外腫瘤細胞培養與藥物測試 (E.V.A. 平台)", address: "台北市內湖區瑞光路258巷56號3樓之2", city: "台北市", phone: "02-2732-2701", email: "info@cancerfree.io", website: "https://cancerfree.io", capital: "1.2億", profit: 44.5, salary: "76,000", image: "" },
        { id: 8, name: "維致生醫", category: "基因體與生物資訊", products: "女性疾病體外診斷試劑 (子宮內膜異位症檢測)", address: "新竹縣竹北市生醫五路66號9樓之3", city: "新竹縣市", phone: "03-668-8058", email: "info@vcheckinc.com", website: "http://www.vcheckinc.com", capital: "9,500萬", profit: 39.0, salary: "71,000", image: "" },

        // 新藥研發與生物製藥
        { id: 9, name: "藥華醫藥", category: "新藥研發與生物製藥", products: "血液腫瘤罕病新藥 (Besremi 百斯瑞明)", address: "台北市南港區園區街3號2樓之5", city: "台北市", phone: "02-2655-7688", email: "info@pharmaessentia.com", website: "https://www.pharmaessentia.com", capital: "32.8億", profit: 78.4, salary: "95,000", image: "" },
        { id: 10, name: "中裕新藥", category: "新藥研發與生物製藥", products: "愛滋病單株抗體靶向藥物 (Trogarzo)", address: "台北市內湖區瑞光路607號3樓", city: "台北市", phone: "02-2658-0058", email: "IR@taimedbiologics.com", website: "https://www.taimedbiologics.com", capital: "25.1億", profit: 72.1, salary: "92,000", image: "" },
        { id: 11, name: "東洋藥品", category: "新藥研發與生物製藥", products: "癌症、重症抗感染藥物、微脂體技術平台", address: "台北市南港區園區街3-1號3樓", city: "台北市", phone: "02-2652-5999", email: "info@tty.com.tw", website: "https://www.tty.com.tw", capital: "24.9億", profit: 60.5, salary: "85,000", image: "" },
        { id: 12, name: "浩鼎生技", category: "新藥研發與生物製藥", products: "抗乳癌等主動免疫抗癌新藥 (OBI-822)", address: "台北市南港區園區街3號7樓", city: "台北市", phone: "02-2655-8799", email: "info@obipharma.com", website: "https://www.obipharma.com", capital: "22.5億", profit: 55.0, salary: "88,000", image: "" },
        { id: 13, name: "中天生技", category: "新藥研發與生物製藥", products: "糖尿病足部傷口潰瘍新藥 (Fespixon 速必一)", address: "台北市大安區敦化南路二段76號16樓", city: "台北市", phone: "02-2703-1098", email: "service@onenessbio.com.tw", website: "https://www.onenessbio.com.tw", capital: "41.6億", profit: 58.0, salary: "86,000", image: "" },
        { id: 14, name: "逸達生技", category: "新藥研發與生物製藥", products: "前列腺癌緩釋針劑 (Camcevi)、新劑型新藥", address: "台北市南港區園區街3號", city: "台北市", phone: "02-2655-2658", email: "info@foreseepharma.com", website: "https://www.foreseepharma.com", capital: "11.2億", profit: 64.0, salary: "83,000", image: "" },
        { id: 15, name: "美時化學", category: "新藥研發與生物製藥", products: "困難學名藥、抗癌及中樞神經系統口服藥", address: "台北市信義區松仁路277號11樓", city: "台北市", phone: "02-2700-5908", email: "info@lotuspharm.com", website: "https://www.lotuspharm.com", capital: "26.2億", profit: 53.5, salary: "89,000", image: "" },
        { id: 16, name: "太景生技", category: "新藥研發與生物製藥", products: "抗感染新藥 (太捷信)、幹細胞驅動劑", address: "台北市南港區復興街109號7樓", city: "台北市", phone: "02-8177-7072", email: "info@taigenbiotech.com", website: "https://www.taigenbiotech.com", capital: "10.0億", profit: 51.2, salary: "80,000", image: "" },
        { id: 17, name: "亞諾法", category: "新藥研發與生物製藥", products: "抗體、重組蛋白質、醫療檢測儀器與試劑", address: "台北市內湖區洲子街108號9樓", city: "台北市", phone: "02-8751-1888", email: "ir@abnova.com.tw", website: "https://www.abnova.com.tw", capital: "6.0億", profit: 46.8, salary: "73,000", image: "" },
        { id: 18, name: "漢康生醫", category: "新藥研發與生物製藥", products: "臨床階段腫瘤免疫新藥 (FBDB™ 平台)", address: "台北市內湖區堤頂大道一段1號5樓", city: "台北市", phone: "02-2792-1366", email: "info@hanchorbio.com", website: "https://www.hanchorbio.com", capital: "3.5億", profit: 50.0, salary: "82,000", image: "" },
        { id: 19, name: "全福生技", category: "新藥研發與生物製藥", products: "眼科與退化性關節炎新藥 (BRM421 乾眼症)", address: "台北市內湖區瑞光路358巷30弄1號8樓", city: "台北市", phone: "02-2659-8586", email: "info@brimbiotech.com", website: "https://www.brimbiotech.com", capital: "11.5億", profit: 48.5, salary: "79,000", image: "" },
        { id: 20, name: "醣基生醫", category: "新藥研發與生物製藥", products: "醣分子工程技術平台、抗體新藥與疫苗", address: "台北市南港區研究院路一段130巷99號7樓", city: "台北市", phone: "02-2655-8059", email: "info@chopharma.com", website: "https://www.chopharma.com", capital: "18.2億", profit: 52.3, salary: "87,000", image: "" },
        { id: 21, name: "旭富製藥", category: "新藥研發與生物製藥", products: "人用原料藥 (API)、醫藥中間體", address: "桃園市蘆竹區海湖北路309巷61號", city: "桃園市", phone: "03-354-3133", email: "sales@sci-pharmtech.com.tw", website: "https://www.sci-pharmtech.com.tw", capital: "11.9億", profit: 34.2, salary: "70,000", image: "" },

        // 委託開發暨製造服務 (CDMO)
        { id: 22, name: "台康生技", category: "委託開發暨製造服務 (CDMO)", products: "大分子蛋白質藥物、生物相似藥CDMO", address: "新北市汐止區康寧街169巷101號", city: "新北市", phone: "02-7708-0123", email: "IR@eirgenix.com", website: "https://www.eirgenix.com", capital: "30.5億", profit: 28.5, salary: "78,000", image: "" },
        { id: 23, name: "保瑞藥業", category: "委託開發暨製造服務 (CDMO)", products: "大小分子全方位CDMO (口服、半固體、液體)", address: "台北市內湖區行愛路69號6樓", city: "台北市", phone: "02-2790-0555", email: "info@bora-corp.com", website: "https://www.bora-corp.com", capital: "10.1億", profit: 42.0, salary: "84,000", image: "" },
        { id: 24, name: "永昕生物", category: "委託開發暨製造服務 (CDMO)", products: "細胞株開發、哺乳類/微生物製程CDMO", address: "苗栗縣竹南鎮科研路8號", city: "苗栗縣市", phone: "037-586-988", email: "info@mycenax.com.tw", website: "https://www.mycenax.com.tw", capital: "16.8億", profit: 31.5, salary: "75,000", image: "" },
        { id: 25, name: "台灣神隆", category: "委託開發暨製造服務 (CDMO)", products: "高致癌性高活性原料藥(API)、針劑CDMO", address: "台南市善化區南科八路1號", city: "台南市", phone: "06-505-2888", email: "info@scinopharm.com", website: "https://www.scinopharm.com", capital: "79.0億", profit: 36.2, salary: "80,000", image: "" },
        { id: 26, name: "台灣生物醫藥製造", category: "委託開發暨製造服務 (CDMO)", products: "核酸藥物(mRNA)、基因與細胞治療CDMO", address: "台北市南港區生技園區", city: "台北市", phone: "02-2783-0000", email: "contact@tbmc.com.tw", website: "https://www.tbmc.com.tw", capital: "15.0億", profit: 30.0, salary: "85,000", image: "" },
        { id: 27, name: "喜康生技", category: "委託開發暨製造服務 (CDMO)", products: "蛋白質新藥研發、生物藥品 CDMO 服務", address: "新北市汐止區新台五路一段99號19樓之1", city: "新北市", phone: "03-658-3899", email: "info@edenbiologics.com", website: "https://www.edenbiologics.com", capital: "12.0億", profit: 33.4, salary: "76,000", image: "" },
        { id: 28, name: "安美得", category: "委託開發暨製造服務 (CDMO)", products: "專業創傷敷材 (赫麗敷系列)、醫療級水膠", address: "新北市五股區五權七路14號之1", city: "新北市", phone: "02-2298-1755", email: "info@amed.com.tw", website: "https://www.amed.com.tw", capital: "3.8億", profit: 48.0, salary: "72,000", image: "" },

        // 細胞治療與再生醫學
        { id: 29, name: "訊聯生技", category: "細胞治療與再生醫學", products: "臍帶血/臍帶儲存、間質幹細胞治療、外泌體", address: "台北市內湖區新湖一路36巷28號", city: "台北市", phone: "02-2795-1777", email: "service@bionetcorp.com", website: "https://www.bionetcorp.com", capital: "5.2億", profit: 39.5, salary: "74,000", image: "" },
        { id: 30, name: "亞果生醫", category: "細胞治療與再生醫學", products: "超臨界二氧化碳去細胞技術、膠原蛋白生醫材料", address: "高雄市路竹區路科二路57號3樓", city: "高雄市", phone: "07-695-5569", email: "info@acrobiomedical.com", website: "https://www.acrobiomedical.com", capital: "3.0億", profit: 35.0, salary: "71,000", image: "" },
        { id: 31, name: "基亞生技", category: "細胞治療與再生醫學", products: "自然殺手細胞(NK)、PIK3細胞治療、肝癌新藥", address: "台北市南港區園區街3號14樓", city: "台北市", phone: "02-2653-5200", email: "info@medigen.com.tw", website: "https://www.medigen.com.tw", capital: "13.8億", profit: 42.3, salary: "78,000", image: "" },
        { id: 32, name: "和訊生技", category: "細胞治療與再生醫學", products: "幹細胞新藥開發、心血管疾病再生醫學", address: "桃園市桃園區大業路一段18號6樓", city: "桃園市", phone: "03-358-1155", email: "info@hexunbio.com", website: "https://www.hexunbio.com", capital: "1.8億", profit: 36.0, salary: "70,000", image: "" },
        { id: 33, name: "台安生技", category: "細胞治療與再生醫學", products: "生技產業投資顧問與創投管理", address: "台北市信義區信義路五段7號28樓A室", city: "台北市", phone: "02-8758-0000", email: "info@taiantech.com", website: "http://www.taiantech.com", capital: "6.0億", profit: 45.0, salary: "85,000", image: "" },

        // 疫苗與檢測試劑
        { id: 34, name: "國光生技", category: "疫苗與檢測試劑", products: "流感疫苗、破傷風疫苗、無菌針劑充填CDMO", address: "台中市潭子區潭興路一段3號", city: "台中市", phone: "04-2538-1220", email: "IR@adimmune.com.tw", website: "https://www.adimmune.com.tw", capital: "42.9億", profit: 30.5, salary: "75,000", image: "" },
        { id: 35, name: "高端疫苗", category: "疫苗與檢測試劑", products: "腸病毒71型疫苗、新冠疫苗、四價流感疫苗", address: "台北市內湖區基湖路10巷57號7樓", city: "台北市", phone: "02-7745-0830", email: "info@medigenvac.com", website: "https://www.medigenvac.com", capital: "32.2億", profit: 25.0, salary: "76,000", image: "" },
        { id: 36, name: "普生", category: "疫苗與檢測試劑", products: "B肝/C肝體外診斷試劑、自動化核酸檢測設備", address: "新竹縣寶山鄉創新一路6號", city: "新竹縣市", phone: "03-577-9221", email: "info@gbc.com.tw", website: "https://www.gbc.com.tw", capital: "6.2億", profit: 40.5, salary: "72,000", image: "" },
        { id: 37, name: "光鼎生技", category: "疫苗與檢測試劑", products: "毛細管電泳儀 (Qsep系列)、核酸檢測平台", address: "新北市新店區中正路238號4樓", city: "新北市", phone: "02-2218-8726", email: "info@bioptic.com.tw", website: "https://www.bioptic.com.tw", capital: "4.0億", profit: 48.5, salary: "77,000", image: "" },
        { id: 38, name: "立景生技", category: "疫苗與檢測試劑", products: "抗原/抗體開發、免疫診斷試劑原料", address: "台南市新市區南科二路12號4樓", city: "台南市", phone: "06-505-8822", email: "info@leadgene.com.tw", website: "https://www.leadgene.com.tw", capital: "1.5億", profit: 42.0, salary: "71,000", image: "" },
        { id: 39, name: "國鼎生技", category: "疫苗與檢測試劑", products: "新藥研發 (Antroquinonol)、牛樟芝保健食品", address: "新北市淡水區中正東路二段27-6號15樓", city: "新北市", phone: "02-2808-6006", email: "info@goldenbiotech.com", website: "https://www.goldenbiotech.com", capital: "14.8億", profit: 32.5, salary: "73,000", image: "" },
        { id: 40, name: "創益生技", category: "疫苗與檢測試劑", products: "自費醫療服務、醫藥保健品供應", address: "台北市南港區園區街3之1號3樓之1", city: "台北市", phone: "02-2655-7339", email: "info@cybiotech.com.tw", website: "https://www.cybiotech.com.tw", capital: "3.5億", profit: 38.0, salary: "70,000", image: "" }
    ];

    // Floating notification system
    function showToast(message) {
        const toast = document.getElementById('toastNotification');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // 1. GSAP Scroll Reveals
    gsap.registerPlugin(ScrollTrigger);

    const revealAnims = [
        { selector: '.reveal-up', y: 50, x: 0 },
        { selector: '.reveal-left', x: -50, y: 0 },
        { selector: '.reveal-right', x: 50, y: 0 }
    ];

    revealAnims.forEach(anim => {
        gsap.utils.toArray(anim.selector).forEach(el => {
            gsap.fromTo(el,
                { autoAlpha: 0, x: anim.x, y: anim.y },
                {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    duration: 1.2,
                    delay: parseFloat(el.style.getPropertyValue('--d')) || 0,
                    ease: 'power4.out'
                }
            );
        });
    });

    window.addEventListener('load', () => ScrollTrigger.refresh());

    // 2. Three.js Interactive 3D Computer Hero Animation - GLTF Model
    function init3DComputer() {
        const compContainer = document.getElementById('computer-container');
        if (!compContainer || typeof THREE === 'undefined') return;

        const isMobile = window.innerWidth < 768;

        // --- Loading indicator ---
        const loadingEl = document.createElement('div');
        loadingEl.id = 'comp3d-loading';
        loadingEl.style.cssText = `
            position: absolute; inset: 0; display: flex; flex-direction: column;
            align-items: center; justify-content: center; z-index: 10;
            color: #10b981; font-family: monospace; font-size: 0.85rem;
            gap: 1rem; pointer-events: none;
        `;
        loadingEl.innerHTML = `
            <div style="
                width: 40px; height: 40px; border: 2px solid rgba(16,185,129,0.2);
                border-top-color: #10b981; border-radius: 50%;
                animation: comp3d-spin 0.8s linear infinite;
            "></div>
            <span>載入 3D 模型...</span>
        `;
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `@keyframes comp3d-spin { to { transform: rotate(360deg); } }`;
        document.head.appendChild(spinStyle);
        compContainer.style.position = 'relative';
        compContainer.appendChild(loadingEl);

        // --- Scene ---
        const scene = new THREE.Scene();

        // --- Camera ---
        const camera = new THREE.PerspectiveCamera(
            25,
            compContainer.clientWidth / compContainer.clientHeight,
            0.1,
            1000
        );
        camera.position.set(20, 3, 5);

        // --- Renderer ---
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(compContainer.clientWidth, compContainer.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        compContainer.appendChild(renderer.domElement);

        // --- Orbit Controls ---
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = true;
        controls.maxPolarAngle = Math.PI * 0.85; // Allow looking from above & below
        controls.minPolarAngle = 0.1;           // Almost straight down from above
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = false;
        controls.autoRotateSpeed = 0.6;

        // Listen to arrow keys to move (pan) the computer up/down/left/right
        controls.listenToKeyEvents(window);

        // Map left-click drag to rotate (360 view) the computer, right-click to pan
        controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
        };

        // Touch settings: one-finger drag to rotate, two-fingers to pan
        controls.touches = {
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
        };

        // --- Cinematic Lighting (Tuned from Computers.jsx + branding accents) ---
        // Hemisphere sky/ground (matches hemisphereLight in Computers.jsx)
        const hemi = new THREE.HemisphereLight(0xffffff, 0x000000, 0.15);
        scene.add(hemi);

        // SpotLight (matches spotLight in Computers.jsx)
        const spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.position.set(-20, 50, 10);
        spotLight.angle = 0.12;
        spotLight.penumbra = 1;
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.bias = -0.001;
        scene.add(spotLight);

        // PointLight at the center (matches pointLight in Computers.jsx)
        const pointLight = new THREE.PointLight(0xffffff, 1);
        scene.add(pointLight);

        // Green emissive fill (branding accent)
        const fillLight = new THREE.PointLight(0x10b981, 0.6, 40);
        fillLight.position.set(8, 2, 8);
        scene.add(fillLight);

        // Subtle purple under-light
        const underLight = new THREE.PointLight(0x6366f1, 0.4, 30);
        underLight.position.set(-5, -8, 5);
        scene.add(underLight);

        // --- Ground shadow plane ---
        const groundGeo = new THREE.PlaneGeometry(60, 60);
        const groundMat = new THREE.ShadowMaterial({ opacity: 0.18 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -4;
        ground.receiveShadow = true;
        scene.add(ground);

        // --- Animated Terminal Screen Canvas Texture ---
        const screenCanvas = document.createElement('canvas');
        screenCanvas.width = 1024;
        screenCanvas.height = 640;
        const sCtx = screenCanvas.getContext('2d');

        const termLines = [
            '> 404BIOTECH INTELLIGENCE SYSTEM v2.4.1',
            '> 連線中... 台灣生技交易所 [OK]',
            '> 載入企業資料庫... 40 筆資料完成',
            '> 藥華醫藥 (6446)   NT$320.5  ▲2.30%',
            '> 台康生技 (6589)   NT$178.0  ▲1.10%',
            '> 東洋藥品 (4105)   NT$145.5  ▼0.50%',
            '> 資本額排行 #1: 台灣神隆 79.0億',
            '> 平均毛利率: 新藥研發類 62.4%',
            '> 薪資競爭力 TOP: 藥華醫藥 NT$95,000',
            '> 生醫園區掃描: 南港 / 內湖 / 竹南',
            '> 財務指標同步完畢 ............. [OK]',
            '> AI 媒合演算法啟動中...',
            '> 候選企業配對處理中...',
            '> 匹配成功率評估: 87.3%',
            '> SYSTEM READY. AWAITING QUERY...',
        ];
        let termScroll = 0;
        let lastTermUpdate = 0;

        function drawTerminalScreen(elapsed) {
            const w = 1024, h = 640;
            // Background
            sCtx.fillStyle = '#020b18';
            sCtx.fillRect(0, 0, w, h);

            // Subtle scanlines
            for (let y = 0; y < h; y += 4) {
                sCtx.fillStyle = 'rgba(0,0,0,0.12)';
                sCtx.fillRect(0, y, w, 2);
            }

            // Grid
            sCtx.strokeStyle = 'rgba(16, 185, 129, 0.05)';
            sCtx.lineWidth = 1;
            for (let i = 0; i < w; i += 32) { sCtx.beginPath(); sCtx.moveTo(i, 0); sCtx.lineTo(i, h); sCtx.stroke(); }
            for (let i = 0; i < h; i += 32) { sCtx.beginPath(); sCtx.moveTo(0, i); sCtx.lineTo(w, i); sCtx.stroke(); }

            // Header bar
            sCtx.fillStyle = 'rgba(16, 185, 129, 0.12)';
            sCtx.fillRect(0, 0, w, 38);
            sCtx.fillStyle = '#10b981';
            sCtx.font = 'bold 18px monospace';
            sCtx.fillText('404BIOTECH  TERMINAL  v2.4.1', 18, 26);

            // Live clock top right
            const time = new Date().toLocaleTimeString('zh-TW', { hour12: false });
            sCtx.textAlign = 'right';
            sCtx.fillStyle = 'rgba(16,185,129,0.7)';
            sCtx.font = '14px monospace';
            sCtx.fillText(time, w - 18, 26);
            sCtx.textAlign = 'left';

            // Blinking cursor
            if (Math.floor(Date.now() / 500) % 2 === 0) {
                sCtx.fillStyle = '#10b981';
                sCtx.fillRect(w - 58, 8, 8, 18);
            }

            // Terminal lines (scrolling)
            sCtx.font = '15px monospace';
            const visibleLines = 14;
            for (let i = 0; i < visibleLines; i++) {
                const lineIdx = (termScroll + i) % termLines.length;
                const y = 68 + i * 38;
                const freshness = 1 - (i / visibleLines) * 0.4;
                sCtx.fillStyle = `rgba(16, 185, 129, ${freshness})`;
                sCtx.fillText(termLines[lineIdx], 18, y);
            }

            // Active cursor line at bottom
            const cursorY = 68 + visibleLines * 38;
            sCtx.fillStyle = 'rgba(16,185,129,0.5)';
            sCtx.fillText('> _', 18, cursorY);

            // Bottom status bar
            sCtx.fillStyle = 'rgba(99, 102, 241, 0.12)';
            sCtx.fillRect(0, h - 36, w, 36);
            sCtx.fillStyle = '#6366f1';
            sCtx.font = '13px monospace';
            sCtx.fillText(`SYS: ONLINE  |  40 COMPANIES  |  BIOTECH.AI  |  ${time}`, 18, h - 12);
        }

        const screenTexture = new THREE.CanvasTexture(screenCanvas);

        // --- Glowing Cyber-Particle System ---
        function createParticleTexture() {
            const pCanvas = document.createElement('canvas');
            pCanvas.width = 16;
            pCanvas.height = 16;
            const pCtx = pCanvas.getContext('2d');
            const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
            grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
            grad.addColorStop(0.3, 'rgba(16, 185, 129, 0.8)');
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            pCtx.fillStyle = grad;
            pCtx.fillRect(0, 0, 16, 16);
            return new THREE.CanvasTexture(pCanvas);
        }

        const particleGeo = new THREE.BufferGeometry();
        const pCount = 150; // Increased count
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount * 3; i++) pPos[i] = (Math.random() - 0.5) * 12; // Compact distribution to avoid viewport edge clipping
        particleGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const particleMat = new THREE.PointsMaterial({
            size: 0.16,
            map: createParticleTexture(),
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // --- Mouse tilt & movement interaction (disabled, static unless OrbitControls are dragged) ---
        let targetRotY = 0, currentRotY = 0;
        let targetRotX = 0, currentRotX = 0;
        let targetPosX = 0, currentPosX = 0;
        let targetPosY = 0, currentPosY = 0;

        // --- Procedural Fallback Computer ---
        function buildProceduralComputer() {
            const group = new THREE.Group();

            const metalMat = new THREE.MeshStandardMaterial({
                color: 0x1a1f35, metalness: 0.9, roughness: 0.12
            });
            const accentMat = new THREE.MeshStandardMaterial({
                color: 0x10b981, metalness: 0.4, roughness: 0.3,
                emissive: 0x10b981, emissiveIntensity: 0.3
            });
            const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });

            // Monitor bezel
            const bezel = new THREE.Mesh(new THREE.BoxGeometry(6.4, 4.4, 0.2), metalMat);
            bezel.position.set(0, 0.8, -0.4); bezel.castShadow = true;
            group.add(bezel);

            // Screen face
            const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.9, 3.9), screenMat);
            screenMesh.position.set(0, 0.8, -0.29);
            group.add(screenMesh);

            // Glow ring
            const glowMesh = new THREE.Mesh(
                new THREE.BoxGeometry(6.0, 4.0, 0.02),
                new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.12 })
            );
            glowMesh.position.set(0, 0.8, -0.27);
            group.add(glowMesh);

            // Neck
            const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 1.4, 20), metalMat);
            neck.position.set(0, -1.5, -0.4);
            group.add(neck);

            // Base
            const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.14, 2.4), metalMat);
            baseMesh.position.set(0, -2.22, -0.2); baseMesh.receiveShadow = true;
            group.add(baseMesh);

            // Accent strip
            const accentStrip = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.08, 0.21), accentMat);
            accentStrip.position.set(0, -1.35, -0.4);
            group.add(accentStrip);

            // Keyboard
            const kb = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.1, 2.8), metalMat);
            kb.position.set(0, -2.16, 1.2); kb.rotation.x = 0.04; kb.castShadow = true;
            group.add(kb);

            // Keyboard accent
            const kbAccent = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.02, 0.06), accentMat);
            kbAccent.position.set(0, -2.1, -0.18);
            group.add(kbAccent);

            group.scale.set(0.45, 0.45, 0.45);
            group.position.set(0, -1.0, 0);
            return { group, glowMesh, screenMesh };
        }

        let proceduralRefs = null;
        let gltfModel = null;
        let modelReady = false;

        // Build procedural as immediate fallback
        proceduralRefs = buildProceduralComputer();
        scene.add(proceduralRefs.group);

        // --- Load GLTF Model ---
        if (typeof THREE.GLTFLoader !== 'undefined') {
            const loader = new THREE.GLTFLoader();
            loader.load(
                'public/desktop_pc/scene.gltf',
                (gltf) => {
                    // Success: swap out procedural, use real model
                    scene.remove(proceduralRefs.group);
                    proceduralRefs = null;

                    gltfModel = gltf.scene;

                    // Scale and position to match the portfolio project's values (further zoomed out)
                    const scale = isMobile ? 0.7 : 0.75;
                    gltfModel.scale.set(scale, scale, scale);
                    gltfModel.position.set(0, isMobile ? -3.0 : -3.25, -1.5);
                    gltfModel.rotation.set(-0.01, -0.2, -0.1);

                    // Enable shadows on all meshes
                    gltfModel.traverse((child) => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;

                            // Inject live screen texture onto the monitor screen mesh/material
                            const hasScreenName = child.name && (
                                child.name.toLowerCase().includes('screen') ||
                                child.name.toLowerCase().includes('monitor') ||
                                child.name.toLowerCase().includes('display') ||
                                child.name.toLowerCase().includes('plane')
                            );
                            const hasScreenMat = child.material && child.material.name && (
                                child.material.name.toLowerCase().includes('screen') ||
                                child.material.name.toLowerCase().includes('monitor') ||
                                child.material.name.toLowerCase().includes('display') ||
                                child.material.name.toLowerCase().includes('desktop')
                            );

                            if (hasScreenName || hasScreenMat) {
                                child.material = new THREE.MeshBasicMaterial({
                                    map: screenTexture,
                                    toneMapped: false // Keeps canvas colors bright and glowing
                                });
                            }
                        }
                    });

                    scene.add(gltfModel);
                    modelReady = true;

                    // Remove loading indicator
                    if (loadingEl.parentNode) loadingEl.remove();
                },
                (progress) => {
                    if (progress.total > 0) {
                        const pct = Math.round((progress.loaded / progress.total) * 100);
                        const span = loadingEl.querySelector('span');
                        if (span) span.textContent = `載入 3D 模型... ${pct}%`;
                    }
                },
                () => {
                    // Failure: keep procedural fallback, hide loading
                    if (loadingEl.parentNode) loadingEl.remove();
                    modelReady = true;
                }
            );
        } else {
            if (loadingEl.parentNode) loadingEl.remove();
            modelReady = true;
        }

        // --- Animation Loop ---
        const clock = new THREE.Clock();
        let termTimer = 0;

        function animate3D() {
            requestAnimationFrame(animate3D);

            const elapsed = clock.getElapsedTime();
            const delta = clock.getDelta();

            // Scroll terminal every 1.8s
            termTimer += delta;
            if (termTimer > 1.8) { termScroll++; termTimer = 0; }

            // Update screen texture
            drawTerminalScreen(elapsed);
            screenTexture.needsUpdate = true;

            // Procedural fallback animations & mouse movement
            if (proceduralRefs) {
                proceduralRefs.glowMesh.material.opacity = 0.08 + 0.07 * Math.sin(elapsed * 2.2);

                // If GLTF model is not loaded yet or failed, apply hover to procedural model
                if (!gltfModel) {
                    currentRotY += (targetRotY - currentRotY) * 0.06;
                    currentRotX += (targetRotX - currentRotX) * 0.06;
                    currentPosX += (targetPosX - currentPosX) * 0.06;
                    currentPosY += (targetPosY - currentPosY) * 0.06;

                    proceduralRefs.group.rotation.y = currentRotY;
                    proceduralRefs.group.rotation.x = currentRotX;
                    proceduralRefs.group.position.x = currentPosX;
                    proceduralRefs.group.position.y = -1.0 + currentPosY;
                }
            }

            // Mouse tilt & translation — smooth lerp for GLTF model
            if (gltfModel && modelReady) {
                currentRotY += (targetRotY - currentRotY) * 0.06;
                currentRotX += (targetRotX - currentRotX) * 0.06;
                currentPosX += (targetPosX - currentPosX) * 0.06;
                currentPosY += (targetPosY - currentPosY) * 0.06;

                gltfModel.rotation.y = -0.2 + currentRotY;
                gltfModel.rotation.x = -0.01 + currentRotX;

                // Base Y position is -3.25 (desktop) / -3.0 (mobile)
                const basePosY = isMobile ? -3.0 : -3.25;
                gltfModel.position.x = currentPosX;
                gltfModel.position.y = basePosY + currentPosY;
            }

            // Particle drift
            particles.rotation.y = elapsed * 0.04;
            particles.rotation.x = elapsed * 0.015;

            // Animate lights for subtle life
            fillLight.intensity = 0.7 + 0.2 * Math.sin(elapsed * 1.3);

            controls.update();
            renderer.render(scene, camera);
        }
        animate3D();

        // --- Resize ---
        window.addEventListener('resize', () => {
            if (!compContainer) return;
            camera.aspect = compContainer.clientWidth / compContainer.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(compContainer.clientWidth, compContainer.clientHeight);
        });
    }
    init3DComputer();

    // Unified Filtering & Sorting State (declared early so home-reset can access it)
    let allCompaniesData = [];
    let currentFilters = {
        location: 'all',
        category: 'all',
        sortBy: 'default',
        sortDir: 'desc',
        search: ''
    };

    // 3. DNA Animation Overlay (right panel, interactive)
    function initDNAOverlay() {
        const dnaContainer = document.getElementById('dnaPanelRight');
        if (!dnaContainer) return;

        // Remove old wrappers if any
        dnaContainer.querySelectorAll('.dna-dot-wrapper').forEach(w => w.remove());

        // Mouse interaction state
        let mouseInfluence = 0; // 0 = no hover, 1 = fully hovered

        dnaContainer.addEventListener('mouseenter', () => {
            gsap.to({ val: mouseInfluence }, {
                val: 1, duration: 0.5,
                onUpdate: function () { mouseInfluence = this.targets()[0].val; }
            });
        });
        dnaContainer.addEventListener('mouseleave', () => {
            gsap.to({ val: mouseInfluence }, {
                val: 0, duration: 0.8,
                onUpdate: function () { mouseInfluence = this.targets()[0].val; }
            });
        });

        // Mouse position for ripple effect
        let mouseX = 0.5, mouseY = 0.5;
        dnaContainer.addEventListener('mousemove', (e) => {
            const rect = dnaContainer.getBoundingClientRect();
            mouseX = (e.clientX - rect.left) / rect.width;
            mouseY = (e.clientY - rect.top) / rect.height;
        });

        const dots = 14;
        const dnaTimelines = [];

        for (let i = 0; i < dots; i++) {
            const wrapper = document.createElement('div');
            wrapper.className = 'dna-dot-wrapper';
            wrapper.style.cssText = `
                position: absolute;
                top: ${(i / dots) * 88 + 6}%;
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
            dnaContainer.appendChild(wrapper);

            const delay = i * 0.14;
            const baseSpeed = 0.72;

            const t1 = gsap.timeline({ repeat: -1, delay });
            t1.set(dot1, { x: -60, scale: 0.6, opacity: 0.3, filter: 'blur(1px)' });
            t1.to(dot1, { x: 0, scale: 1.4, opacity: 1.0, filter: 'blur(0px)', duration: baseSpeed, ease: 'sine.out' })
                .to(dot1, { x: 60, scale: 0.6, opacity: 0.3, filter: 'blur(1px)', duration: baseSpeed, ease: 'sine.in' })
                .to(dot1, { x: 0, scale: 0.4, opacity: 0.2, filter: 'blur(2px)', duration: baseSpeed, ease: 'sine.out' })
                .to(dot1, { x: -60, scale: 0.6, opacity: 0.3, filter: 'blur(1px)', duration: baseSpeed, ease: 'sine.in' });

            const t2 = gsap.timeline({ repeat: -1, delay });
            t2.set(dot2, { x: 60, scale: 0.6, opacity: 0.3, filter: 'blur(1px)' });
            t2.to(dot2, { x: 0, scale: 0.4, opacity: 0.2, filter: 'blur(2px)', duration: baseSpeed, ease: 'sine.out' })
                .to(dot2, { x: -60, scale: 0.6, opacity: 0.3, filter: 'blur(1px)', duration: baseSpeed, ease: 'sine.in' })
                .to(dot2, { x: 0, scale: 1.4, opacity: 1.0, filter: 'blur(0px)', duration: baseSpeed, ease: 'sine.out' })
                .to(dot2, { x: 60, scale: 0.6, opacity: 0.3, filter: 'blur(1px)', duration: baseSpeed, ease: 'sine.in' });

            // Sync connecting line
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

            dnaTimelines.push({ t1, t2, dot1, dot2, rowIndex: i });
        }

        // Interactive tick: on each frame, adjust speed and color based on mouse
        function dnaInteractiveTick() {
            requestAnimationFrame(dnaInteractiveTick);
            dnaTimelines.forEach(({ t1, t2, dot1, dot2, rowIndex }) => {
                // Rows near mouse Y light up more
                const rowY = (rowIndex / dots) + (1 / dots / 2);
                const proximity = 1 - Math.min(Math.abs(rowY - mouseY) * 4, 1);
                const boost = 1 + mouseInfluence * proximity * 1.8;

                // Speed up timelines when hovered near that row
                t1.timeScale(boost);
                t2.timeScale(boost);

                // Color shift: green -> cyan when mouse is close
                const r = Math.round(16 - 16 * mouseInfluence * proximity);
                const g = Math.round(185 + 40 * mouseInfluence * proximity);
                const b = Math.round(129 + 100 * mouseInfluence * proximity);
                const col = `rgb(${r},${g},${b})`;
                dot1.style.background = col;
                dot1.style.boxShadow = `0 0 ${8 + mouseInfluence * proximity * 14}px ${col}`;
                dot2.style.background = col;
                dot2.style.boxShadow = `0 0 ${8 + mouseInfluence * proximity * 14}px ${col}`;
            });
        }
        dnaInteractiveTick();
    }
    initDNAOverlay();

    // 4. Home nav link: reset all filters to "all" on click
    const homeNavLink = document.querySelector('a[href="#home"]');
    if (homeNavLink) {
        homeNavLink.addEventListener('click', () => {
            // Reset filter state
            currentFilters.location = 'all';
            currentFilters.category = 'all';
            currentFilters.search = '';
            currentFilters.sortBy = 'default';
            currentFilters.sortDir = 'desc';

            // Reset UI dropdowns
            document.querySelectorAll('.location-filter').forEach(sel => sel.value = 'all');
            const catFilter = document.getElementById('categoryFilter');
            if (catFilter) catFilter.value = 'all';

            // Reset search
            const searchInput = document.getElementById('bioSearch');
            if (searchInput) searchInput.value = '';

            // Reset sort buttons
            document.querySelectorAll('.sort-options button').forEach(b => {
                b.classList.toggle('active', b.dataset.sort === 'default');
            });
            const sortDirBtn = document.getElementById('sortDirectionBtn');
            if (sortDirBtn) {
                sortDirBtn.setAttribute('data-dir', 'desc');
                sortDirBtn.innerHTML = '<i data-lucide="arrow-down-narrow-wide"></i>';
                lucide.createIcons();
            }

            // Re-render
            applyFiltersAndSort();
        });
    }

    // (Filtering & Sorting State declared above near init3DComputer)

    // Helper to parse capital string (e.g. "32.8億" -> 3280000000)
    function parseCapital(capitalStr) {
        if (!capitalStr) return 0;
        const str = capitalStr.toString().replace(/,/g, '');
        let multiplier = 1;
        if (str.includes('億')) {
            multiplier = 100000000;
        } else if (str.includes('萬')) {
            multiplier = 10000;
        }
        const num = parseFloat(str.replace(/[^0-9.]/g, '')) || 0;
        return num * multiplier;
    }

    // Helper to format capital numeric value back to readable Chinese units
    function formatCapital(capital) {
        if (!capital) return '無';
        if (capital >= 100000000) {
            const val = capital / 100000000;
            return (val % 1 === 0 ? val : val.toFixed(1)) + '億';
        } else if (capital >= 10000) {
            const val = capital / 10000;
            return (val % 1 === 0 ? val : val.toFixed(1)) + '萬';
        }
        return capital.toLocaleString() + '元';
    }

    // Helper to format salary numeric value to currency style
    function formatSalary(salary) {
        if (!salary) return '無';
        return salary.toLocaleString() + '元';
    }

    // Helper to format stock price
    function formatStockPrice(price) {
        if (!price || price === 0) return '未上市';
        return price.toFixed(2) + '元';
    }

    // Helper to format percentage values
    function formatPercent(val) {
        if (val === undefined || val === null || isNaN(val)) return '--%';
        const num = parseFloat(val);
        if (isNaN(num)) return '--%';
        return num.toFixed(1).replace(/\.0$/, '') + '%';
    }

    // Helper to extract city from a full address string
    function extractCityFromAddress(address) {
        if (!address) return '其他';
        const match = address.match(/(台北市|新北市|桃園市|台中市|台南市|高雄市|新竹縣|新竹市|苗栗縣|彰化縣|南投縣|雲林縣|嘉義縣|嘉義市|屏東縣|宜蘭縣|花蓮縣|台東縣|澎湖縣|金門縣|連江縣|基隆市)/);
        return match ? match[0] : '其他';
    }

    // Normalizes company data to ensure fields from database and mock data align
    function normalizeData(rawData) {
        return rawData.map(c => {
            const id = parseInt(c.id) || 0;
            const category = c.category || '其他';
            const address = c.address || '無';
            let city = c.city || '';
            if (!city || city === 'all') {
                city = extractCityFromAddress(address);
            }

            // Normalise salary (database: salary_avg as number, mock: salary as string)
            let salary = 0;
            if (c.salary_avg !== undefined && c.salary_avg !== null) {
                salary = parseInt(c.salary_avg) || 0;
            } else if (c.salary !== undefined && c.salary !== null) {
                salary = parseInt(c.salary.toString().replace(/[^0-9.]/g, '')) || 0;
            }

            // Normalise capital (database: capital as number, mock: capital as string)
            let capital = 0;
            if (c.capital !== undefined && c.capital !== null) {
                if (typeof c.capital === 'number') {
                    capital = c.capital;
                } else {
                    capital = parseCapital(c.capital);
                }
            }

            // Normalise margins and profits
            let gross_margin = 0;
            let profit = 0;
            if (c.gross_margin !== undefined && c.gross_margin !== null) {
                gross_margin = parseFloat(c.gross_margin) || 0;
                profit = parseFloat(c.profit) || 0;
            } else if (c.profit !== undefined && c.profit !== null) {
                // Mock data stored the gross margin percentage in profit key
                gross_margin = parseFloat(c.profit) || 0;
                profit = 0;
            }

            // Normalise stock price
            let stock_price = 0;
            if (c.stock_price !== undefined && c.stock_price !== null) {
                stock_price = parseFloat(c.stock_price) || 0;
            }

            return {
                id,
                name: c.name || '未命名企業',
                category,
                address,
                city,
                products: c.products || '無提供產品描述',
                phone: c.phone || '無',
                email: c.email || '無',
                website: c.website || '無',
                capital,
                gross_margin,
                profit,
                stock_price,
                salary,
                image: c.image || ''
            };
        });
    }

    // Apply filters and sorting to render results
    function applyFiltersAndSort() {
        let filtered = [...allCompaniesData];

        // 1. Filter by Search Query
        if (currentFilters.search) {
            const query = currentFilters.search.toLowerCase();
            filtered = filtered.filter(c =>
                (c.name && c.name.toLowerCase().includes(query)) ||
                (c.products && c.products.toLowerCase().includes(query)) ||
                (c.category && c.category.toLowerCase().includes(query))
            );
        }

        // 2. Filter by Location
        if (currentFilters.location !== 'all') {
            filtered = filtered.filter(c => c.city === currentFilters.location);
        }

        // 3. Filter by Category
        if (currentFilters.category !== 'all') {
            filtered = filtered.filter(c => c.category === currentFilters.category);
        }

        // 4. Sort results
        const sortBy = currentFilters.sortBy;
        const sortDir = currentFilters.sortDir;

        filtered.sort((a, b) => {
            let valA, valB;
            if (sortBy === 'salary') {
                valA = a.salary;
                valB = b.salary;
            } else if (sortBy === 'capital') {
                valA = a.capital;
                valB = b.capital;
            } else if (sortBy === 'margin') {
                valA = a.gross_margin;
                valB = b.gross_margin;
            } else {
                // default sort: by id
                valA = a.id || 0;
                valB = b.id || 0;
                return valA - valB; // always ascending for default
            }

            if (valA === valB) return 0;
            return sortDir === 'asc' ? valA - valB : valB - valA;
        });

        renderCompanies(filtered);
    }

    // 3. Analysis Button / Search Simulation with AI HUD
    const analyzeBtn = document.getElementById('analyzeBtn');
    const matchPreview = document.getElementById('matchPreview');
    const bioSearch = document.getElementById('bioSearch');

    function runAISimulation(query) {
        if (!analyzeBtn || !matchPreview) return;

        // UI Feedback
        analyzeBtn.disabled = true;
        analyzeBtn.querySelector('span').textContent = '診斷分析中...';

        const statusEl = matchPreview.querySelector('.status');
        const detailsEl = matchPreview.querySelector('.hud-details');
        statusEl.textContent = 'DNA序列與財務比對中...';

        // Hide details during search scanning
        if (detailsEl) {
            detailsEl.style.display = 'none';
        }

        // Apply search query filter
        currentFilters.search = query;
        applyFiltersAndSort();

        // Simulate core computation
        setTimeout(() => {
            statusEl.textContent = '分析成功 | 核心數據同步';
            analyzeBtn.disabled = false;
            analyzeBtn.querySelector('span').textContent = '數據分析';

            // Find matching company details for HUD
            let match = null;
            if (query) {
                const searchQ = query.toLowerCase();
                // Exact or partial name match
                match = allCompaniesData.find(c => c.name.toLowerCase().includes(searchQ));
            }
            // Fallback to top list item if no direct match
            if (!match && allCompaniesData.length > 0) {
                // If there are search results, pick the first one
                const currentFiltered = allCompaniesData.filter(c =>
                    !query ||
                    c.name.toLowerCase().includes(query.toLowerCase()) ||
                    c.products.toLowerCase().includes(query.toLowerCase())
                );
                if (currentFiltered.length > 0) {
                    match = currentFiltered[0];
                }
            }

            if (match && detailsEl) {
                // Populate AI HUD values
                detailsEl.style.display = 'block';
                detailsEl.querySelector('.hud-title').textContent = match.name;

                // Random high match score
                const matchScore = Math.floor(Math.random() * 8) + 92;
                detailsEl.querySelector('.score-val').textContent = matchScore + '%';

                // Salary Percent (capped at 120k max scale)
                const salNum = match.salary;
                const salPercent = Math.min(100, Math.max(10, Math.round((salNum / 120000) * 100)));

                // Margin Percent
                const margNum = match.gross_margin;
                const margPercent = Math.min(100, Math.max(10, Math.round(margNum)));

                // Capital Percent (capped at 50億 max scale)
                const capNum = match.capital;
                const capPercent = Math.min(100, Math.max(10, Math.round((capNum / 5000000000) * 100)));

                // Animate bars
                gsap.to(detailsEl.querySelector('.salary-bar'), { width: `${salPercent}%`, duration: 0.8, ease: 'power2.out' });
                gsap.to(detailsEl.querySelector('.margin-bar'), { width: `${margPercent}%`, duration: 0.8, ease: 'power2.out' });
                gsap.to(detailsEl.querySelector('.capital-bar'), { width: `${capPercent}%`, duration: 0.8, ease: 'power2.out' });

                // Set labels
                detailsEl.querySelector('.salary-val').textContent = formatSalary(match.salary);
                detailsEl.querySelector('.margin-val').textContent = formatPercent(match.gross_margin);
                detailsEl.querySelector('.capital-val').textContent = formatCapital(match.capital);
            } else if (detailsEl) {
                // General state
                detailsEl.style.display = 'block';
                detailsEl.querySelector('.hud-title').textContent = '生技產業綜合診斷';
                detailsEl.querySelector('.score-val').textContent = '85%';

                gsap.to(detailsEl.querySelector('.salary-bar'), { width: `65%`, duration: 0.8 });
                gsap.to(detailsEl.querySelector('.margin-bar'), { width: `45%`, duration: 0.8 });
                gsap.to(detailsEl.querySelector('.capital-bar'), { width: `50%`, duration: 0.8 });

                detailsEl.querySelector('.salary-val').textContent = '綜合均值';
                detailsEl.querySelector('.margin-val').textContent = '均值';
                detailsEl.querySelector('.capital-val').textContent = '均值';
            }

            // Pulse HUD container
            gsap.fromTo(matchPreview, { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 });
        }, 800);
    }

    if (analyzeBtn && matchPreview) {
        analyzeBtn.addEventListener('click', () => {
            const query = bioSearch.value.trim();
            runAISimulation(query);
        });
    }

    // 4. Interactive Trending Tags
    const tags = document.querySelectorAll('.trending-tags .tag');
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Extract core name (e.g. "藥華藥 (6446)" -> "藥華")
            let text = tag.textContent.trim();
            const parenIndex = text.indexOf('(');
            if (parenIndex !== -1) {
                text = text.substring(0, parenIndex).trim();
            }
            // Normalize names to match mock/DB entities
            if (text === "藥華藥") text = "藥華醫藥";
            if (text === "美時") text = "美時化學";
            if (text === "台康") text = "台康生技";

            if (bioSearch) {
                bioSearch.value = text;
                runAISimulation(text);
            }
        });
    });

    // 5. Global Interactive Cursor
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            gsap.to(cursorGlow, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.4,
                ease: 'power2.out'
            });
        }

        // DNA Mouse Repulsion
        const dDots = document.querySelectorAll('.dna-dot');
        dDots.forEach(dot => {
            const rect = dot.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 80) {
                const angle = Math.atan2(dy, dx);
                const force = (80 - dist) / 80;
                gsap.to(dot, {
                    y: Math.sin(angle) * force * 30,
                    duration: 0.3,
                    overwrite: 'auto'
                });
            } else {
                gsap.to(dot, { y: 0, duration: 0.6, overwrite: 'auto' });
            }
        });
    });

    // 6. Magnetic Elements
    const magneticElements = document.querySelectorAll('.btn-cta, .nav__button, .tag, .btn-direction');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });
    });

    // 7. Scroll Behavior
    const header = document.getElementById('header');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (header) {
            if (currentScroll > lastScroll && currentScroll >= 400) {
                header.classList.add('scroll-nav');
            } else {
                header.classList.remove('scroll-nav');
            }
        }
        lastScroll = currentScroll;

        const progress = document.querySelector('.scroll-progress');
        if (progress) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progress.style.width = scrolled + '%';
        }
    });

    // 8. Market Counting Animation
    function initMarketCounting() {
        if (window.marketScrollTriggers) {
            window.marketScrollTriggers.forEach(st => st.kill());
        }
        window.marketScrollTriggers = [];

        const marketItems = document.querySelectorAll('.m-row .val');
        marketItems.forEach(item => {
            const originalText = item.textContent;
            const targetValue = parseFloat(originalText.replace(/[^0-9.]/g, ''));
            const suffix = originalText.replace(/[0-9.]/g, '');

            if (!isNaN(targetValue)) {
                const st = ScrollTrigger.create({
                    trigger: item,
                    start: 'top 95%',
                    onEnter: () => {
                        let obj = { val: 0 };
                        gsap.to(obj, {
                            val: targetValue,
                            duration: 2,
                            onUpdate: () => {
                                let displayVal = obj.val;
                                if (suffix === '') {
                                    displayVal = Math.round(obj.val).toLocaleString();
                                    item.textContent = displayVal;
                                } else {
                                    item.textContent = obj.val.toFixed(1) + suffix;
                                }
                            }
                        });
                    }
                });
                window.marketScrollTriggers.push(st);
            }
        });
    }

    // Render Market Insights
    function renderMarketInsights(companies) {
        if (!companies || companies.length === 0) return;

        // 1. Capital Ranking (Top 3 Companies)
        const capitalSorted = [...companies].sort((a, b) => {
            return b.capital - a.capital;
        }).slice(0, 3);

        const capitalContainer = document.getElementById('capitalRanking');
        if (capitalContainer) {
            capitalContainer.innerHTML = capitalSorted.map(c =>
                `<div class="m-row"><span>${c.name}</span><span class="val">${formatCapital(c.capital)}</span></div>`
            ).join('');
        }

        // 2. Average Profit by Category (Top 3 Categories)
        const categoryProfit = {};
        companies.forEach(c => {
            const profitVal = c.gross_margin;
            if (c.category && profitVal !== undefined && profitVal !== null) {
                if (!categoryProfit[c.category]) categoryProfit[c.category] = { sum: 0, count: 0 };
                categoryProfit[c.category].sum += profitVal;
                categoryProfit[c.category].count++;
            }
        });
        const profitSorted = Object.keys(categoryProfit).map(cat => ({
            category: cat,
            avg: categoryProfit[cat].sum / categoryProfit[cat].count
        })).sort((a, b) => b.avg - a.avg).slice(0, 3);

        const profitContainer = document.getElementById('profitRanking');
        if (profitContainer) {
            profitContainer.innerHTML = profitSorted.map(c =>
                `<div class="m-row"><span>${c.category.substring(0, 6)}</span><span class="val">${formatPercent(c.avg)}</span></div>`
            ).join('');
        }

        // 3. Salary Competitiveness (Top 3 Companies)
        const salarySorted = [...companies].sort((a, b) => {
            return b.salary - a.salary;
        }).slice(0, 3);

        const salaryContainer = document.getElementById('salaryRanking');
        if (salaryContainer) {
            salaryContainer.innerHTML = salarySorted.map(c =>
                `<div class="m-row"><span>${c.name}</span><span class="val">${formatSalary(c.salary)}</span></div>`
            ).join('');
        }

        initMarketCounting();
    }

    // 9. Fetch Data & Manage Filters
    const modal = document.getElementById('companyModal');
    const companyGrid = document.getElementById('companyGrid');
    const locationFilters = document.querySelectorAll('.location-filter');
    const categoryFilter = document.getElementById('categoryFilter');

    // Sync Location Dropdowns
    locationFilters.forEach(filter => {
        filter.addEventListener('change', (e) => {
            const val = e.target.value;
            locationFilters.forEach(f => f.value = val); // Sync dropdowns
            currentFilters.location = val;
            applyFiltersAndSort();
        });
    });

    // Category Dropdown Listener
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            currentFilters.category = e.target.value;
            applyFiltersAndSort();
        });
    }

    // Sort buttons listener
    const sortButtons = document.querySelectorAll('.sort-options button');
    sortButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sortButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilters.sortBy = btn.dataset.sort;
            applyFiltersAndSort();
        });
    });

    // Sort direction toggle listener
    const sortDirectionBtn = document.getElementById('sortDirectionBtn');
    if (sortDirectionBtn) {
        sortDirectionBtn.addEventListener('click', () => {
            const currentDir = sortDirectionBtn.getAttribute('data-dir');
            const newDir = currentDir === 'desc' ? 'asc' : 'desc';
            sortDirectionBtn.setAttribute('data-dir', newDir);

            // Update Icon
            if (newDir === 'asc') {
                sortDirectionBtn.innerHTML = '<i data-lucide="arrow-up-narrow-wide"></i>';
            } else {
                sortDirectionBtn.innerHTML = '<i data-lucide="arrow-down-narrow-wide"></i>';
            }
            lucide.createIcons();

            currentFilters.sortDir = newDir;
            applyFiltersAndSort();
        });
    }

    // Search bar listener (real-time keyup)
    if (bioSearch) {
        bioSearch.addEventListener('input', (e) => {
            currentFilters.search = e.target.value.trim();
            applyFiltersAndSort();
        });
    }

    async function loadCompanies() {
        try {
            // Attempt to connect to PHP SQL API
            const response = await fetch('api.php');
            if (!response.ok) throw new Error('API server returned error code');
            const data = await response.json();

            if (data.error) {
                throw new Error('Database connection failed: ' + JSON.stringify(data.error));
            }

            allCompaniesData = normalizeData(data);
            showToast("成功載入即時雲端數據庫");
        } catch (error) {
            console.warn('API error, falling back to local dataset:', error);
            allCompaniesData = normalizeData(MOCK_COMPANIES);
            showToast("已載入離線示範數據模式");
        }

        // Initialize Filter Dropdowns Dynamically
        const cities = [...new Set(allCompaniesData.map(c => c.city))].filter(Boolean).sort();
        locationFilters.forEach(filter => {
            filter.innerHTML = '<option value="all">所有地點</option>';
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                filter.appendChild(option);
            });
        });

        const categories = [...new Set(allCompaniesData.map(c => c.category))].filter(Boolean).sort();
        if (categoryFilter) {
            categoryFilter.innerHTML = '<option value="all">所有領域</option>';
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                option.textContent = cat;
                categoryFilter.appendChild(option);
            });
        }

        // Apply filters (initial render)
        applyFiltersAndSort();
        renderMarketInsights(allCompaniesData);
    }

    // Render Cards in DOM
    function renderCompanies(companies) {
        if (!companyGrid) return;
        companyGrid.innerHTML = '';

        if (companies.length === 0) {
            companyGrid.innerHTML = '<div class="no-results-message" style="grid-column: span 3; text-align: center; color: var(--text-secondary); padding: 4rem 0;">無符合當前篩選條件之企業。</div>';
            return;
        }

        // Group cards by category
        const categories = [...new Set(companies.map(c => c.category))].filter(Boolean);

        categories.forEach(cat => {
            const catSection = document.createElement('div');
            catSection.className = 'card-section';

            const title = document.createElement('h2');
            title.className = 'category__title';
            title.textContent = cat;
            catSection.appendChild(title);

            const cardWrapper = document.createElement('section');
            cardWrapper.className = 'card';

            const catCompanies = companies.filter(c => c.category === cat);
            catCompanies.forEach((company, index) => {
                const article = document.createElement('article');
                article.className = `card__article ${index === 0 ? 'card__active' : ''}`;

                // Varied scientific background images
                const placeholderImages = [
                    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800", // Microscope
                    "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800", // Lab overall
                    "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800", // Pipette
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800", // Test tubes
                    "https://images.unsplash.com/photo-1614935151651-0bea6508ab6b?auto=format&fit=crop&q=80&w=800", // DNA/Tech
                    "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800", // Scientific research
                    "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800", // Tech lab
                    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"  // Classic lab
                ];

                const imgIndex = (company.id || index) % placeholderImages.length;
                const imageUrl = company.image && company.image.startsWith('http')
                    ? company.image
                    : placeholderImages[imgIndex];

                article.innerHTML = `
                    <img src="${imageUrl}" alt="${company.name}" class="card__img">
                    <div class="card__shadow"></div>

                    <div class="card__data">
                        <div class="card__icon">
                            <i data-lucide="building-2"></i>
                        </div>

                        <div class="card__info">
                            <h2 class="card__title">${company.name}</h2>
                            <p class="card__description">${company.products ? company.products.substring(0, 30) : ''}...</p>
                        </div>
                    </div>
                `;

                article.addEventListener('click', () => showModal(company));
                cardWrapper.appendChild(article);
            });

            catSection.appendChild(cardWrapper);
            companyGrid.appendChild(catSection);
        });

        lucide.createIcons();

        // GSAP reveals for cards
        if (window.cardScrollTriggers) {
            window.cardScrollTriggers.forEach(st => st.kill());
        }
        window.cardScrollTriggers = [];

        gsap.utils.toArray('.category__title').forEach(title => {
            const anim = gsap.fromTo(title,
                { opacity: 0, x: -50 },
                {
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power2.out'
                }
            );
            window.cardScrollTriggers.push(anim.scrollTrigger);
        });

        gsap.utils.toArray('.card').forEach(cardWrapper => {
            const articles = cardWrapper.querySelectorAll('.card__article');
            const anim = gsap.fromTo(articles,
                { opacity: 0, y: 100 },
                {
                    scrollTrigger: {
                        trigger: cardWrapper,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: { amount: Math.min(1.5, articles.length * 0.15) },
                    ease: 'power3.out'
                }
            );
            window.cardScrollTriggers.push(anim.scrollTrigger);
        });

        if (window.ScrollTrigger) {
            ScrollTrigger.refresh();
        }
    }

    // Modal Display Details
    function showModal(company) {
        if (!modal) return;
        modal.querySelector('.category-badge').textContent = company.category;
        modal.querySelector('.modal-title').textContent = company.name;
        modal.querySelector('.modal-location').innerHTML = `<i data-lucide="map-pin"></i> ${company.address}`;
        modal.querySelector('.modal-products').textContent = company.products;

        const contactHtml = `
            <p>聯絡電話: ${company.phone || '無'}</p>
            <p>Email: ${company.email || '無'}</p>
        `;
        modal.querySelector('.modal-contact').innerHTML = contactHtml;

        // Populate dynamic financial info in modal
        const capitalEl = modal.querySelector('.modal-finance-capital');
        const marginEl = modal.querySelector('.modal-finance-margin');
        const stockEl = modal.querySelector('.modal-finance-stock');
        const salaryEl = modal.querySelector('.modal-finance-salary');

        if (capitalEl) capitalEl.textContent = formatCapital(company.capital);
        if (marginEl) marginEl.textContent = formatPercent(company.gross_margin);
        if (stockEl) stockEl.textContent = formatStockPrice(company.stock_price);
        if (salaryEl) salaryEl.textContent = formatSalary(company.salary);

        const ctaBtn = modal.querySelector('.btn-cta');
        if (ctaBtn) {
            ctaBtn.onclick = () => {
                if (company.website && company.website !== '無' && company.website !== '') {
                    let url = company.website;
                    if (!/^https?:\/\//i.test(url)) {
                        url = 'https://' + url;
                    }
                    window.open(url, '_blank');
                } else {
                    showToast("此企業未登錄官網資訊");
                }
            };
        }

        lucide.createIcons();
        modal.classList.add('active');
    }

    // Start loading sequence
    loadCompanies();

    // Close Modal Bindings
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.getElementById('modalOverlay');
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    if (overlay) overlay.addEventListener('click', () => modal.classList.remove('active'));
});