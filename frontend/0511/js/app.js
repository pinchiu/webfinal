/**
 * 前端系統進入點 - 當 DOM 載入完畢後進行 MVC 的初始化與引導
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. 初始化基礎 Lucide 圖示
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. 實例化 Model 與各個 View 元件
    const model = new CompanyModel();
    const companyView = new CompanyView();
    const threeView = new ThreeView();
    const dockingView = new DockingView();
    const dnaView = new DnaView();
    const hudView = new HudView();
    const uiView = new UiView();

    // 獨立初始化不受 Controller 管理的背景視覺
    dockingView.init();

    // 3. 實例化 Controller 並進行對接
    const controller = new CompanyController(
        model,
        companyView,
        threeView,
        dnaView,
        hudView,
        uiView
    );

    // 4. 啟動系統
    controller.init();
});
