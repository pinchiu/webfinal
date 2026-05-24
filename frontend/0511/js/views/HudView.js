/**
 * HudView - 負責 AI HUD 診斷比對面版的 View
 */
class HudView {
    constructor() {
        this.matchPreview = document.getElementById('matchPreview');
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.statusEl = this.matchPreview ? this.matchPreview.querySelector('.status') : null;
        this.detailsEl = this.matchPreview ? this.matchPreview.querySelector('.hud-details') : null;
    }

    /**
     * 設定 HUD 掃描中狀態
     */
    setSearchingState() {
        if (!this.analyzeBtn || !this.matchPreview) return;
        this.analyzeBtn.disabled = true;
        this.analyzeBtn.querySelector('span').textContent = '診斷分析中...';
        if (this.statusEl) this.statusEl.textContent = 'DNA序列與財務比對中...';
        if (this.detailsEl) this.detailsEl.style.display = 'none';
    }

    /**
     * 設定 HUD 搜尋成功狀態
     */
    setSuccessState() {
        if (!this.analyzeBtn || !this.statusEl) return;
        this.statusEl.textContent = '分析成功 | 核心數據同步';
        this.analyzeBtn.disabled = false;
        this.analyzeBtn.querySelector('span').textContent = '數據分析';
    }

    formatCapital(num) {
        if (!num) return '-- 億';
        if (num >= 100000000) {
            return (num / 100000000).toFixed(1).replace(/\.0$/, '') + '億';
        } else if (num >= 10000) {
            return (num / 10000).toFixed(0) + '萬';
        }
        return num.toLocaleString();
    }

    formatSalary(val) {
        if (!val || val === '--') return '面議';
        const num = parseInt(val);
        if (isNaN(num)) return '面議';
        return 'NT$' + num.toLocaleString();
    }

    formatPercent(val) {
        const num = parseFloat(val);
        if (isNaN(num)) return '--%';
        return num.toFixed(1).replace(/\.0$/, '') + '%';
    }

    /**
     * 更新面版內部細節數值與進度條動畫
     * @param {object|null} match
     */
    updateHudDetails(match) {
        if (!this.detailsEl) return;

        this.detailsEl.style.display = 'block';

        if (match) {
            this.detailsEl.querySelector('.hud-title').textContent = match.name;

            // 隨機生成 92-99% 匹配度
            const matchScore = Math.floor(Math.random() * 8) + 92;
            this.detailsEl.querySelector('.score-val').textContent = matchScore + '%';

            // 薪資比例 (以 120k 為上限)
            const salNum = match.salary;
            const salPercent = Math.min(100, Math.max(10, Math.round((salNum / 120000) * 100)));

            // 毛利率比例
            const margNum = match.gross_margin;
            const margPercent = Math.min(100, Math.max(10, Math.round(margNum)));

            // 資本實力比例 (以 50億 為上限)
            const capNum = match.capital;
            const capPercent = Math.min(100, Math.max(10, Math.round((capNum / 5000000000) * 100)));

            // 使用 GSAP 更新進度條寬度
            if (typeof gsap !== 'undefined') {
                gsap.to(this.detailsEl.querySelector('.salary-bar'), { width: `${salPercent}%`, duration: 0.8, ease: 'power2.out' });
                gsap.to(this.detailsEl.querySelector('.margin-bar'), { width: `${margPercent}%`, duration: 0.8, ease: 'power2.out' });
                gsap.to(this.detailsEl.querySelector('.capital-bar'), { width: `${capPercent}%`, duration: 0.8, ease: 'power2.out' });
            } else {
                this.detailsEl.querySelector('.salary-bar').style.width = `${salPercent}%`;
                this.detailsEl.querySelector('.margin-bar').style.width = `${margPercent}%`;
                this.detailsEl.querySelector('.capital-bar').style.width = `${capPercent}%`;
            }

            // 設定標題數值
            this.detailsEl.querySelector('.salary-val').textContent = this.formatSalary(match.salary);
            this.detailsEl.querySelector('.margin-val').textContent = this.formatPercent(match.gross_margin);
            this.detailsEl.querySelector('.capital-val').textContent = this.formatCapital(match.capital);
        } else {
            // 一般無匹配結果時的均值狀態
            this.detailsEl.querySelector('.hud-title').textContent = '生技產業綜合診斷';
            this.detailsEl.querySelector('.score-val').textContent = '85%';

            if (typeof gsap !== 'undefined') {
                gsap.to(this.detailsEl.querySelector('.salary-bar'), { width: `65%`, duration: 0.8 });
                gsap.to(this.detailsEl.querySelector('.margin-bar'), { width: `45%`, duration: 0.8 });
                gsap.to(this.detailsEl.querySelector('.capital-bar'), { width: `50%`, duration: 0.8 });
            } else {
                this.detailsEl.querySelector('.salary-bar').style.width = `65%`;
                this.detailsEl.querySelector('.margin-bar').style.width = `45%`;
                this.detailsEl.querySelector('.capital-bar').style.width = `50%`;
            }

            this.detailsEl.querySelector('.salary-val').textContent = '綜合均值';
            this.detailsEl.querySelector('.margin-val').textContent = '均值';
            this.detailsEl.querySelector('.capital-val').textContent = '均值';
        }

        // 診斷面版微幅縮放跳動特效
        if (typeof gsap !== 'undefined' && this.matchPreview) {
            gsap.fromTo(this.matchPreview, { scale: 1 }, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 });
        }
    }
}
