function swapCarouselPositions() {
     
  
    // Lấy các phần tử carousel
    const carousels = [
        document.getElementById('carousel1'),
        document.getElementById('carousel2'),
        document.getElementById('carousel3'),
        document.getElementById('carousel4'),
        document.getElementById('carousel5')
    ];

    // Lưu các lớp CSS hiện tại của từng carousel
    const classes = carousels.map(carousel => carousel.className);
 // Thêm lớp hiệu ứng chuyển cảnh cho carousel hiện tại
    classes.forEach(classes => {
        classes.classList.add('transitioning');
    });


    // Hoán đổi các lớp CSS mà không thay đổi nội dung bên trong
    carousels[0].className = classes[1]; 
    carousels[1].className = classes[2]; 
    carousels[2].className = classes[3]; 
    carousels[3].className = classes[4];
    carousels[4].className = classes[0]; // Đưa carousel đầu tiên xuống cuối cùng

    // Khởi động lại carousel sau khi hoán đổi xong
    carousels.forEach(carousel => {
        const carouselInstance = bootstrap.Carousel.getInstance(carousel);
        if (carouselInstance) {
            carouselInstance.cycle();
        }
    });
}

// Gọi hàm swapCarouselPositions() mỗi 5 giây để hoán đổi vị trí
setInterval(swapCarouselPositions, 1000);


