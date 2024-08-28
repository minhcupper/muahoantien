let isSwapping = false; // Tránh thao tác đồng thời
let swapped = false; // Theo dõi trạng thái hoán đổi

const swapButton = document.getElementById('swapButton');
const swapBackButton = document.getElementById('swapBackButton');
const allButtons = [swapButton,swapBackButton] ;

// Hàm để vô hiệu hóa tất cả các nút
function disableAllButtons() {
    allButtons.forEach(button => button.disabled = true);
}

// Hàm để kích hoạt tất cả các nút
function enableAllButtons() {
    allButtons.forEach(button => button.disabled = false);
}

// Lưu trạng thái lớp CSS khi trang được tải
let originalClasses = [];
document.addEventListener('DOMContentLoaded', () => {
    const carousels = [
        document.getElementById('carousel1'),
        document.getElementById('carousel2'),
        document.getElementById('carousel3'),
        document.getElementById('carousel4'),
        document.getElementById('carousel5')
    ];

    originalClasses = carousels.map(carousel => carousel.className);

    // Khởi động các carousel với dữ liệu auto-slide
    carousels.forEach(carousel => {
        new bootstrap.Carousel(carousel, {
            interval: 10000, // Điều chỉnh interval nếu cần
            ride: 'carousel'
        });
    });
});

function swapCarouselPositions() {
    if (isSwapping || swapped) return; // Tránh thao tác đồng thời và chỉ hoán đổi nếu chưa được hoán đổi
    isSwapping = true;
    disableAllButtons();

    const carousels = [
        document.getElementById('carousel1'),
        document.getElementById('carousel2'),
        document.getElementById('carousel3'),
        document.getElementById('carousel4'),
        document.getElementById('carousel5')
    ];

    // Tạm dừng và tắt auto-slide của tất cả các carousel
    carousels.forEach(carousel => {
        carousel.removeAttribute('data-bs-ride');
    });

    // Lưu các lớp CSS hiện tại của từng carousel
    const classes = carousels.map(carousel => carousel.className);

    // Hoán đổi các lớp CSS theo thứ tự lùi lại (left rotation)
    carousels.forEach((carousel, index) => {
        carousel.className = classes[(index - 1 + classes.length) % classes.length];
    });

    // Khôi phục auto-slide của tất cả các carousel
    carousels.forEach(carousel => {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 2000, // Điều chỉnh interval nếu cần
            ride: 'carousel'
        });
        carousel.setAttribute('data-bs-ride', '');
        carousel.setAttribute('data-bs-interval', '1000000000');
        bsCarousel.cycle();
    });

    swapped = true; // Đánh dấu đã hoán đổi
    setTimeout(() => {
        enableAllButtons();
        isSwapping = false;
    }, 1000); // Thời gian cần thiết để hoàn tất hoán đổi
}

function reverseSwapCarouselPositions() {
    if (isSwapping) return; // Tránh thao tác đồng thời
    isSwapping = true;
    disableAllButtons();

    const carousels = [
        document.getElementById('carousel1'),
        document.getElementById('carousel2'),
        document.getElementById('carousel3'),
        document.getElementById('carousel4'),
        document.getElementById('carousel5')
    ];

    if (swapped) {
        // Khôi phục các lớp CSS ban đầu cho từng carousel
        carousels.forEach((carousel, index) => {
            carousel.className = originalClasses[index];
        });

        // Kích hoạt lại auto-slide cho tất cả các carousel
        carousels.forEach(carousel => {
            const bsCarousel = new bootstrap.Carousel(carousel, {
                interval: 2000, // Điều chỉnh interval nếu cần
                ride: ''
            });
            carousel.setAttribute('data-bs-ride', '');
            carousel.setAttribute('data-bs-interval', '1000000000');
            bsCarousel.cycle();
        });

        swapped = false; // Cập nhật trạng thái hoán đổi

      
    }

    setTimeout(() => {
        enableAllButtons();
        isSwapping = false;
    }, 1000); // Thời gian cần thiết để hoàn tất khôi phục
    disableAllButtons();
}
// Đính kèm sự kiện click vào các nút
swapButton.addEventListener('click', swapCarouselPositions);
swapBackButton.addEventListener('click',reverseSwapCarouselPositions);
