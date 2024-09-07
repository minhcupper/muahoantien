document.addEventListener('DOMContentLoaded', () => {
    let isSwapping = false; // Tránh các thao tác đồng thời

    // Lấy các phần tử theo ID
    const swapButton = document.getElementById('swapButton');
    const revertButton = document.getElementById('revertButton'); // Nút để hoàn tác
    const carouselContainer = document.getElementById('jump'); // Đảm bảo container tồn tại

    // Kiểm tra sự tồn tại của các phần tử trước khi thêm sự kiện
    if (!swapButton || !revertButton || !carouselContainer) {
        console.error('Một hoặc nhiều phần tử cần thiết không tồn tại.');
        return;
    };

    const allButtons = [swapButton, revertButton];

    // Hàm vô hiệu hóa tất cả các nút
    function disableAllButtons() {
        allButtons.forEach(button => {
            if (button) {
                button.disabled = true;
            }
        });
    }

    // Hàm kích hoạt lại tất cả các nút
    function enableAllButtons() {
        allButtons.forEach(button => {
            if (button) {
                button.disabled = false;
            }
        });
    }

    // Lưu trữ các phần tử carousel
    const carousels = [
        document.getElementById('carousel1'),
        document.getElementById('carousel2'),
        document.getElementById('carousel3'),
        document.getElementById('carousel4'),
        document.getElementById('carousel5')
    ];

    // Đảm bảo tất cả các carousel tồn tại
    if (carousels.some(carousel => !carousel)) {
        console.error('Một hoặc nhiều phần tử carousel không tồn tại.');
        return;
    }

    // Hàm thực hiện hoán đổi tuần hoàn (hoán đổi CSS và hình ảnh)
    function swapCarouselContent() {
        if (isSwapping) return; // Tránh các thao tác đồng thời
        isSwapping = true;
        disableAllButtons();

        // Thực hiện hoán đổi tuần hoàn giữa các carousel theo chiều thuận
        for (let index = 0; index < carousels.length; index++) {
            const nextIndex = (index + 1) % carousels.length;
            const carousel = carousels[index];
            const nextCarousel = carousels[nextIndex];

            // Hoán đổi CSS class
            const tempClass = carousel.className;
            carousel.className = nextCarousel.className;
            nextCarousel.className = tempClass;

            // Hoán đổi hình ảnh
            const currentImages = [...carousel.querySelectorAll('img')];
            const nextImages = [...nextCarousel.querySelectorAll('img')];

            currentImages.forEach((img, i) => {
                const tempSrc = img.src;
                img.src = nextImages[i].src;
                nextImages[i].src = tempSrc;
            });
        }

        setTimeout(() => {
            enableAllButtons();
            isSwapping = false;
        }, 1000); // Thời gian cần thiết để hoàn thành hoán đổi
    }

    // Hàm hoàn tác bằng cách xoay ngược lại
    function revertCarouselContent() {
        if (isSwapping) return; // Tránh các thao tác đồng thời
        isSwapping = true;
        disableAllButtons();

        // Thực hiện hoán đổi tuần hoàn ngược lại giữa các carousel
        for (let index = carousels.length - 1; index >= 0; index--) {
            const prevIndex = (index - 1 + carousels.length) % carousels.length;
            const carousel = carousels[index];
            const prevCarousel = carousels[prevIndex];

            // Hoán đổi CSS class
            const tempClass = carousel.className;
            carousel.className = prevCarousel.className;
            prevCarousel.className = tempClass;

            // Hoán đổi hình ảnh
            const currentImages = [...carousel.querySelectorAll('img')];
            const prevImages = [...prevCarousel.querySelectorAll('img')];

            currentImages.forEach((img, i) => {
                const tempSrc = img.src;
                img.src = prevImages[i].src;
                prevImages[i].src = tempSrc;
            });
        }

        setTimeout(() => {
            enableAllButtons();
            isSwapping = false;
        }, 1000); // Thời gian cần thiết để hoàn thành hoàn tác
    }

    // Thêm sự kiện vào các nút
    swapButton.addEventListener('click', swapCarouselContent);
    revertButton.addEventListener('click', revertCarouselContent);
});