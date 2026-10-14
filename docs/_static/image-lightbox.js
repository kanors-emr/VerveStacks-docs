(function () {
    var openLightbox = null;

    function createLightbox() {
        var MIN_SCALE = 0.5;
        var MAX_SCALE = 4;
        var SCALE_STEP = 0.2;
        var currentScale = 1;
        var offsetX = 0;
        var offsetY = 0;
        var isDragging = false;
        var dragStartX = 0;
        var dragStartY = 0;
        var dragPointerId = null;
        var savedScrollY = 0;

        var overlay = document.createElement("div");
        overlay.className = "vs-lightbox";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-label", "Image preview");
        overlay.setAttribute("aria-hidden", "true");

        var closeButton = document.createElement("button");
        closeButton.className = "vs-lightbox__close";
        closeButton.type = "button";
        closeButton.setAttribute("aria-label", "Close image");
        closeButton.textContent = "\u00D7";

        var image = document.createElement("img");
        image.className = "vs-lightbox__img";
        image.alt = "";

        var controls = document.createElement("div");
        controls.className = "vs-lightbox__controls";

        var zoomOutButton = document.createElement("button");
        zoomOutButton.className = "vs-lightbox__control";
        zoomOutButton.type = "button";
        zoomOutButton.setAttribute("aria-label", "Zoom out");
        zoomOutButton.textContent = "\u2212";

        var zoomResetButton = document.createElement("button");
        zoomResetButton.className = "vs-lightbox__control";
        zoomResetButton.type = "button";
        zoomResetButton.setAttribute("aria-label", "Reset zoom");
        zoomResetButton.textContent = "100%";

        var zoomInButton = document.createElement("button");
        zoomInButton.className = "vs-lightbox__control";
        zoomInButton.type = "button";
        zoomInButton.setAttribute("aria-label", "Zoom in");
        zoomInButton.textContent = "+";

        var hint = document.createElement("div");
        hint.className = "vs-lightbox__hint";
        hint.textContent = "Scroll to zoom · Drag to pan · Esc to close";

        controls.appendChild(zoomOutButton);
        controls.appendChild(zoomResetButton);
        controls.appendChild(zoomInButton);

        overlay.appendChild(closeButton);
        overlay.appendChild(controls);
        overlay.appendChild(image);
        overlay.appendChild(hint);
        document.body.appendChild(overlay);

        function clampScale(scale) {
            return Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale));
        }

        function updateImageTransform() {
            image.style.transform =
                "translate(" + offsetX + "px, " + offsetY + "px) scale(" + currentScale + ")";
            zoomResetButton.textContent = Math.round(currentScale * 100) + "%";
            if (currentScale > 1) {
                image.style.cursor = isDragging ? "grabbing" : "grab";
            } else {
                image.style.cursor = "zoom-in";
            }
        }

        function applyZoom(scale) {
            var nextScale = clampScale(scale);
            if (nextScale <= 1) {
                offsetX = 0;
                offsetY = 0;
            }
            currentScale = nextScale;
            updateImageTransform();
        }

        function zoomBy(delta) {
            applyZoom(currentScale + delta);
        }

        function unlockPageScroll() {
            var y = savedScrollY;
            document.documentElement.classList.remove("vs-lightbox-scroll-lock");
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            window.requestAnimationFrame(function () {
                window.scrollTo(0, y);
                window.requestAnimationFrame(function () {
                    window.scrollTo(0, y);
                });
            });
        }

        function lockPageScroll() {
            savedScrollY =
                window.scrollY ||
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                0;
            document.documentElement.classList.add("vs-lightbox-scroll-lock");
            document.body.style.position = "fixed";
            document.body.style.top = "-" + savedScrollY + "px";
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.width = "100%";
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        }

        function closeLightbox() {
            overlay.classList.remove("is-open");
            overlay.setAttribute("aria-hidden", "true");
            image.removeAttribute("src");
            image.style.transform = "";
            image.style.cursor = "";
            isDragging = false;
            dragPointerId = null;
            unlockPageScroll();
        }

        function open(src, alt) {
            image.src = src;
            image.alt = alt || "";
            offsetX = 0;
            offsetY = 0;
            isDragging = false;
            dragPointerId = null;
            applyZoom(1);
            overlay.classList.add("is-open");
            overlay.setAttribute("aria-hidden", "false");
            lockPageScroll();
            closeButton.focus();
        }

        closeButton.addEventListener("click", closeLightbox);
        zoomInButton.addEventListener("click", function () {
            zoomBy(SCALE_STEP);
        });
        zoomOutButton.addEventListener("click", function () {
            zoomBy(-SCALE_STEP);
        });
        zoomResetButton.addEventListener("click", function () {
            applyZoom(1);
        });

        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) {
                closeLightbox();
            }
        });

        image.addEventListener("wheel", function (event) {
            if (!overlay.classList.contains("is-open")) {
                return;
            }
            event.preventDefault();
            if (event.deltaY < 0) {
                zoomBy(SCALE_STEP);
            } else {
                zoomBy(-SCALE_STEP);
            }
        }, { passive: false });

        image.addEventListener("pointerdown", function (event) {
            if (!overlay.classList.contains("is-open") || currentScale <= 1) {
                return;
            }
            isDragging = true;
            dragPointerId = event.pointerId;
            dragStartX = event.clientX - offsetX;
            dragStartY = event.clientY - offsetY;
            image.setPointerCapture(event.pointerId);
            updateImageTransform();
            event.preventDefault();
        });

        image.addEventListener("pointermove", function (event) {
            if (!isDragging || event.pointerId !== dragPointerId) {
                return;
            }
            offsetX = event.clientX - dragStartX;
            offsetY = event.clientY - dragStartY;
            updateImageTransform();
        });

        function stopDragging(event) {
            if (!isDragging || event.pointerId !== dragPointerId) {
                return;
            }
            isDragging = false;
            dragPointerId = null;
            updateImageTransform();
        }

        image.addEventListener("pointerup", stopDragging);
        image.addEventListener("pointercancel", stopDragging);

        document.addEventListener("keydown", function (event) {
            if (!overlay.classList.contains("is-open")) {
                return;
            }
            if (event.key === "Escape") {
                closeLightbox();
            } else if (event.key === "+" || event.key === "=") {
                zoomBy(SCALE_STEP);
            } else if (event.key === "-" || event.key === "_") {
                zoomBy(-SCALE_STEP);
            } else if (event.key === "0") {
                applyZoom(1);
            }
        });

        return open;
    }

    function bindContentImages() {
        if (!openLightbox) {
            openLightbox = createLightbox();
        }

        var contentImages = document.querySelectorAll(".md-typeset img");
        contentImages.forEach(function (img) {
            if (img.dataset.vsLightboxBound === "1") {
                return;
            }
            var parentLink = img.closest("a[href]");
            if (parentLink && parentLink.hostname && parentLink.hostname !== window.location.hostname) {
                return;
            }
            img.dataset.vsLightboxBound = "1";
            img.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                openLightbox(img.currentSrc || img.src, img.alt);
            });
        });
    }

    /* Material instant navigation re-renders content without full reload */
    if (typeof document$ !== "undefined" && document$.subscribe) {
        document$.subscribe(bindContentImages);
    } else {
        document.addEventListener("DOMContentLoaded", bindContentImages);
    }
})();
