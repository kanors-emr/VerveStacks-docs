(function () {
  var pendingHash = location.hash;

  if (pendingHash && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  if (pendingHash) {
    window.scrollTo(0, 0);
  }

  function targetFromHash(hash) {
    if (!hash || hash === "#") return null;
    try {
      return document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch (e) {
      return null;
    }
  }

  function headerOffset() {
    var header = document.querySelector(".md-header");
    if (!header) return 0;
    var position = getComputedStyle(header).position;
    if (position !== "sticky" && position !== "fixed") return 0;
    return header.getBoundingClientRect().height;
  }

  function scrollToHash(hash, fromTop) {
    var el = targetFromHash(hash);
    if (!el) return false;

    if (fromTop) {
      window.scrollTo(0, 0);
    }

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset() - 8;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        el.classList.remove("anchor-motion");
        void el.offsetWidth;
        el.classList.add("anchor-motion");
      });
    });

    return true;
  }

  function onReady() {
    if (!pendingHash) return;
    window.scrollTo(0, 0);
    setTimeout(function () {
      scrollToHash(pendingHash, true);
    }, 50);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[href*='#']");
    if (!link) return;

    var href = link.getAttribute("href");
    if (!href) return;

    var url;
    try {
      url = new URL(link.href, location.href);
    } catch (e) {
      return;
    }

    if (url.pathname !== location.pathname || !url.hash) return;

    event.preventDefault();
    history.pushState(null, "", url.hash);
    scrollToHash(url.hash, false);
  });
})();
