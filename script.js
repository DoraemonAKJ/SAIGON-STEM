// ==================== 1. CƠ SỞ DỮ LIỆU BÀI HỌC ĐẦY ĐỦ (DATA-DRIVEN) ====================
const lessonsData = [
    // --- MÔN STEM ---
    { id: 1, subject: 'STEM', grade: 3, lesson: 2, title: 'Quạt máy mini', illu: '🪓', downloaded: false },
    { id: 2, subject: 'STEM', grade: 4, lesson: 3, title: 'Mô hình Hệ Mặt Trời', illu: '🪐', downloaded: true },
    { id: 3, subject: 'STEM', grade: 5, lesson: 1, title: 'Xe chạy bằng thế năng', illu: '🏎️', downloaded: false },
    { id: 4, subject: 'STEM', grade: 2, lesson: 4, title: 'Đèn giao thông mini', illu: '🚦', downloaded: true },
    { id: 6, subject: 'STEM', grade: 1, lesson: 2, title: 'Chong chóng gió', illu: '🪁', downloaded: true },
    { id: 10, subject: 'STEM', grade: 3, lesson: 4, title: 'Cầu giấy chịu lực', illu: '🌉', downloaded: false },

    // --- MÔN ROBOTICS ---
    { id: 5, subject: 'Robotics', grade: 4, lesson: 1, title: 'Lắp ráp Cánh tay Robot', illu: '🤖', downloaded: false },
    { id: 9, subject: 'Robotics', grade: 5, lesson: 3, title: 'Xe dò line tự động Yolo Uno', illu: '🏎️', downloaded: false },

    // --- MÔN KỸ NĂNG SỐNG ---
    { id: 7, subject: 'Kỹ năng sống', grade: 3, lesson: 5, title: 'Giao tiếp thấu cảm', illu: '💬', downloaded: false },
    { id: 11, subject: 'Kỹ năng sống', grade: 4, lesson: 2, title: 'Quản lý cảm xúc cá nhân', illu: '💖', downloaded: true },

    // --- MÔN CÔNG DÂN SỐ ---
    { id: 8, subject: 'Công dân số', grade: 5, lesson: 2, title: 'An toàn trên không gian mạng', illu: '🛡️', downloaded: true },
    { id: 12, subject: 'Công dân số', grade: 3, lesson: 1, title: 'Tìm kiếm thông tin hiệu quả', illu: '🔍', downloaded: false },

    // --- CHƯƠNG TRÌNH KHU VỰC 2 ---
    { id: 13, subject: 'Chương trình khu vực 2', grade: 3, lesson: 4, title: 'Dự án khám phá địa phương', illu: '⭐', downloaded: false },
    { id: 14, subject: 'Chương trình khu vực 2', grade: 5, lesson: 2, title: 'Giao lưu văn hóa vùng miền', illu: '⭐', downloaded: true }
];

let currentGrade = 'all';
let currentSearchText = '';

// NHẬN DIỆN TRANG SIÊU LINH HOẠT (Bất chấp Vercel ẩn đuôi .html hay viết hoa/thường)
function getCurrentPageCategory() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('stem')) return 'STEM';
    if (path.includes('kynangsong')) return 'Kỹ năng sống';
    if (path.includes('congdanso')) return 'Công dân số';
    if (path.includes('robotics')) return 'Robotics';
    if (path.includes('khuvuc2')) return 'Chương trình khu vực 2';
    return 'all'; // Mặc định ở Trang chủ
}

// TỰ ĐỘNG BÔI SÁNG MENU BÊN TRÁI CHUẨN XÁC 100%
function highlightActiveSidebar() {
    const currentPage = getCurrentPageCategory();
    const sidebarNav = document.getElementById('sidebarNav');
    if (!sidebarNav) return;

    const pageTitleText = document.getElementById('pageTitleText');
    if (pageTitleText && currentPage !== 'all') {
        pageTitleText.textContent = `Danh sách bài giảng ${currentPage}`;
    }

    // Kiểm tra từng nút menu và bật màu sáng cho nút khớp với trang hiện tại
    sidebarNav.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active');
        const href = (el.getAttribute('href') || '').toLowerCase();
        
        if (currentPage === 'all' && (href.includes('index') || href === '/' || href === '#')) {
            el.classList.add('active');
        } else if (currentPage === 'STEM' && href.includes('stem')) {
            el.classList.add('active');
        } else if (currentPage === 'Kỹ năng sống' && href.includes('kynangsong')) {
            el.classList.add('active');
        } else if (currentPage === 'Công dân số' && href.includes('congdanso')) {
            el.classList.add('active');
        } else if (currentPage === 'Robotics' && href.includes('robotics')) {
            el.classList.add('active');
        } else if (currentPage === 'Chương trình khu vực 2' && href.includes('khuvuc2')) {
            el.classList.add('active');
        }
    });
}

// ==================== 2. HÀM KHỞI TẠO HỆ THỐNG ====================
document.addEventListener('DOMContentLoaded', () => {
    initUI();
    highlightActiveSidebar();
    renderLessons();
});

function initUI() {
    const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('sidebar');
    if (toggleSidebarBtn && sidebar) {
        toggleSidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.body.removeAttribute('data-theme');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i><span class="nav-label">Giao diện tối</span>';
            } else {
                document.body.setAttribute('data-theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i><span class="nav-label">Giao diện sáng</span>';
            }
        });
    }

    const gradeFilter = document.getElementById('gradeFilter');
    if (gradeFilter) {
        gradeFilter.addEventListener('change', (e) => {
            currentGrade = e.target.value;
            renderLessons();
        });
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchText = e.target.value.toLowerCase().trim();
            renderLessons();
        });
    }

    const lessonsGrid = document.getElementById('lessonsGrid');
    if (lessonsGrid) {
        lessonsGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            const id = parseInt(btn.getAttribute('data-id'));
            const action = btn.getAttribute('data-action');

            if (action === 'download') {
                simulateDownloadLesson(id, btn);
            } else if (action === 'ppt') {
                alert(`▶ Đang mở PPT bài giảng cho bài ID: ${id}`);
            } else if (action === 'khbd') {
                alert(`📄 Đang xem KHBD cho bài ID: ${id}`);
            }
        });
    }
}

// ==================== 3. ENGINE RENDER BÀI HỌC ====================
function renderLessons() {
    const grid = document.getElementById('lessonsGrid');
    if (!grid) return;
    
    const pageCategory = getCurrentPageCategory();

    const filteredLessons = lessonsData.filter(item => {
        const matchCategory = (pageCategory === 'all') || (item.subject === pageCategory);
        const matchGrade = currentGrade === 'all' || item.grade.toString() === currentGrade;
        const matchSearch = item.title.toLowerCase().includes(currentSearchText) ||
                            item.subject.toLowerCase().includes(currentSearchText);
        return matchCategory && matchGrade && matchSearch;
    });

    const resultCountEl = document.getElementById('resultCount');
    if (resultCountEl) {
        resultCountEl.textContent = `Hiển thị ${filteredLessons.length} bài học`;
    }

    if (filteredLessons.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-folder-open"></i>
                <h3>Không tìm thấy bài học phù hợp</h3>
                <p>Mục này hiện chưa có bài học nào hoặc không khớp với bộ lọc.</p>
            </div>`;
        return;
    }

    grid.innerHTML = filteredLessons.map(item => `
        <article class="card-v2" data-id="${item.id}">
            <div class="card-banner">
                <span class="card-badge">${item.subject} - LỚP ${item.grade}</span>
                <div class="card-illu">${item.illu}</div>
                <h3 class="card-title">${item.title}</h3>
            </div>

            <div class="card-footer">
                ${!item.downloaded ? `
                    <button class="btn-action-icon btn-download" data-id="${item.id}" data-action="download" title="Tải giáo án">
                        <img src="image/dow.png" alt="Tải về" class="btn-img-icon" />
                    </button>
                ` : `
                    <button class="btn-action-icon btn-ppt" data-id="${item.id}" data-action="ppt" title="Mở PPT">
                        <img src="image/start.png" alt="PPT" class="btn-img-icon" />
                    </button>
                    <button class="btn-action-icon btn-khbd" data-id="${item.id}" data-action="khbd" title="Xem KHBD">
                        <img src="image/Tailieu.png" alt="KHBD" class="btn-img-icon" />
                    </button>
                `}
            </div>
        </article>
    `).join('');
}

function simulateDownloadLesson(id, buttonEl) {
    buttonEl.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="font-size: 45px; color: #0284c7;"></i>`;
    buttonEl.style.pointerEvents = 'none';

    setTimeout(() => {
        const lessonIndex = lessonsData.findIndex(item => item.id === id);
        if (lessonIndex !== -1) {
            lessonsData[lessonIndex].downloaded = true;
        }
        renderLessons();
    }, 800);
}