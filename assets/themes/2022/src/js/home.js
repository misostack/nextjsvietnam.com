import "@/styles/home.scss";
import "@/js/theia-sticky-sidebar.js";

(function ($) {
    $(() => {
        $(".content, .sidebar").theiaStickySidebar({
            // Settings
            additionalMarginTop: 120,
            minWidth: 1024,
        });
    });
})(jQuery);
