/* Homepage hero banner: move the soft spotlight with the cursor. */
(function () {
  "use strict";

  function initBanner(banner) {
    if (banner.getAttribute("data-vs-spot-init") === "true") {
      return;
    }

    var svg = banner.querySelector(".vs-hero-banner__layer");
    var lights = banner.querySelectorAll(".vs-hero-banner__spot-light");
    if (!svg || !lights.length || !svg.createSVGPoint) {
      return;
    }

    banner.setAttribute("data-vs-spot-init", "true");
    var point = svg.createSVGPoint();

    banner.addEventListener("mousemove", function (event) {
      var matrix = svg.getScreenCTM();
      if (!matrix) {
        return;
      }
      point.x = event.clientX;
      point.y = event.clientY;
      var local = point.matrixTransform(matrix.inverse());
      for (var i = 0; i < lights.length; i++) {
        lights[i].setAttribute("cx", local.x);
        lights[i].setAttribute("cy", local.y);
      }
    });
  }

  function initAll() {
    var banners = document.querySelectorAll(".vs-hero-banner");
    for (var i = 0; i < banners.length; i++) {
      initBanner(banners[i]);
    }
  }

  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(initAll);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAll);
  } else {
    initAll();
  }
})();
