class ImageDisplay {
    constructor(imageView, imageBox, imagePage, prevBtn, nextBtn, closeButton, images, imageFolder) {
        this.imageView = imageView;
        this.imageBox = imageBox;
        this.imagePage = imagePage;
        this.prevBtn = prevBtn;
        this.nextBtn = nextBtn;
        this.closeButton = closeButton;
        this.images = images;
        this.imageFolder = imageFolder;
        this.currentImageIdx = 0;

        this.preloadImages();
        this.setupEventListeners();
    }

    preloadImages() {
        this.images.forEach((image) => {
            const img = new Image();
            img.src = image.src;
        });
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => {
            this.currentImageIdx--;
            if (this.currentImageIdx < 0) {
                this.currentImageIdx = this.images.length - 1;
            }
            this.currentImageDisplay();
        });

        this.nextBtn.addEventListener('click', () => {
            this.currentImageIdx++;
            if (this.currentImageIdx >= this.images.length) {
                this.currentImageIdx = 0;
            }
            this.currentImageDisplay();
        });

        this.closeButton.addEventListener('click', () => this.hideImageView());
        this.imageView.addEventListener('click', () => this.hideImageView());

        this.images.forEach((image, index) => {
            image.addEventListener('click', () => {
                this.imageView.style.display = 'block';
                this.imageBox.style.display = 'block';
                this.currentImageIdx = index;
                this.currentImageDisplay();
            });
        });
    }

    hideImageView() {
        this.imageView.style.animation = "fadeOut 0.5s forwards";
        this.imageBox.style.animation = "scaleOut 0.5s forwards";
        this.imageView.addEventListener('animationend', () => {
            this.imageView.style.display = "none";
            this.imageView.style.animation = "";
        }, { once: true });
        this.imageBox.addEventListener('animationend', () => {
            this.imageBox.style.display = "none";
            this.imageBox.style.animation = "";
        }, { once: true });
    }

    currentImageDisplay() {
        this.imagePage.style.background = `url("${this.imageFolder}/Pyesta Diner Menu P${this.currentImageIdx + 1}.jpg") center no-repeat`;
        this.imagePage.style.display = 'block';
        this.imagePage.style.backgroundSize = 'contain';
    }
}

// Initialization for web version
const webImageView = document.querySelector(".image-view");
const webPrevBtn = document.getElementById("prev-btn");
const webNextBtn = document.getElementById("next-btn");
const webImageBox = document.querySelector('.image-box');
const webImagePage = document.querySelector('.image-page');
const webCloseButton = document.getElementById("close-btn");
const webImages = document.querySelectorAll('.img-page-web');

const webImageDisplay = new ImageDisplay(webImageView, webImageBox, webImagePage, webPrevBtn, webNextBtn, webCloseButton, webImages, "./menu_imgs/web_ver");

// Initialization for mobile version
const mobileImageView = document.querySelector(".image-view-m");
const mobilePrevBtn = document.getElementById("prev-btn-m");
const mobileNextBtn = document.getElementById("next-btn-m");
const mobileImageBox = document.querySelector('.image-box-m');
const mobileImagePage = document.querySelector('.image-page-m');
const mobileCloseButton = document.getElementById("close-btn-m");
const mobileImages = document.querySelectorAll('.img-page-mob');

const mobileImageDisplay = new ImageDisplay(mobileImageView, mobileImageBox, mobileImagePage, mobilePrevBtn, mobileNextBtn, mobileCloseButton, mobileImages, "./menu_imgs/mobile_ver");
