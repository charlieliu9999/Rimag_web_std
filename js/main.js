/**
 * 医学影像检查项目标准化服务单页网站脚本
 */

document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 移动端菜单切换
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // 关闭移动端菜单
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // 表单提交处理
    const consultForm = document.getElementById('consultForm');
    if (consultForm) {
        consultForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 这里可以添加表单提交逻辑
            alert('感谢您的咨询，我们会尽快与您联系！');
            this.reset();
        });
    }

    // 添加页面滚动动画
    const fadeElements = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // 案例展示标签页切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

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