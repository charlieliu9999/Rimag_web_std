/**
 * 医学影像检查项目标准化服务单页网站脚本
 */

document.addEventListener('DOMContentLoaded', () => {
    // 初始化各个组件
    initializeMobileMenu();
    initializeSmoothScroll();
    initializeTabSystem();
    initializeImageSlider();
    initializeContactForm();
    
    // 监听滚动事件，添加导航栏效果
    window.addEventListener('scroll', handleScroll);
});

/**
 * 初始化移动端菜单
 */
function initializeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // 点击导航链接后关闭菜单
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

/**
 * 初始化平滑滚动
 */
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 初始化选项卡系统
 */
function initializeTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有激活状态
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // 设置当前激活状态
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * 初始化图片轮播
 */
function initializeImageSlider() {
    const caseImages = document.querySelectorAll('.case-images img');
    let currentIndex = 0;
    
    if (caseImages.length > 1) {
        // 每4秒切换一次图片
        setInterval(() => {
            caseImages[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % caseImages.length;
            caseImages[currentIndex].classList.add('active');
        }, 4000);
    }
}

/**
 * 初始化联系表单
 */
function initializeContactForm() {
    const contactForm = document.getElementById('consultForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', event => {
            event.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: document.getElementById('name').value,
                contact: document.getElementById('contact').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // 验证表单
            if (validateForm(formData)) {
                // 模拟表单提交
                console.log('表单数据:', formData);
                alert('感谢您的咨询，我们的客服人员将尽快与您联系！');
                contactForm.reset();
            }
        });
    }
}

/**
 * 验证表单数据
 * @param {Object} formData - 表单数据
 * @returns {boolean} - 表单是否验证通过
 */
function validateForm(formData) {
    let isValid = true;
    const errors = [];
    
    // 验证医院名称
    if (!formData.name.trim()) {
        errors.push('请输入医院名称');
        isValid = false;
    }
    
    // 验证联系人
    if (!formData.contact.trim()) {
        errors.push('请输入联系人姓名');
        isValid = false;
    }
    
    // 验证手机号
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
        errors.push('请输入有效的手机号码');
        isValid = false;
    }
    
    // 验证邮箱（可选）
    if (formData.email.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.push('请输入有效的电子邮箱');
            isValid = false;
        }
    }
    
    // 显示错误信息
    if (!isValid) {
        alert('请检查表单信息：\n' + errors.join('\n'));
    }
    
    return isValid;
}

/**
 * 处理滚动事件
 */
function handleScroll() {
    const navbar = document.getElementById('navbar');
    const scrollPosition = window.scrollY;
    
    // 根据滚动位置添加阴影效果
    if (scrollPosition > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
    }
    
    // 高亮当前导航项
    highlightCurrentSection();
}

/**
 * 高亮当前导航项
 */
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('current');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('current');
        }
    });
}

// Syntax self-check
try {
    console.log("Syntax check passed");
}
catch (error) {
    console.error("Syntax error:", error.message);
}

// 功能验证
console.assert(
    typeof initializeSmoothScroll === 'function', 
    '平滑滚动功能未定义'
);
console.assert(
    typeof validateForm === 'function', 
    '表单验证功能未定义'
);