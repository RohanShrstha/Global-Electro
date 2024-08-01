/*------------------------------------------
 * jQuery elevateZoom 3.0.8
-------------------------------------------*/
/* jQuery elevateZoom 3.0.8 - Demo's and documentation: - www.elevateweb.co.uk/image-zoom -
 * Copyright (c) 2013 Andrew Eades - www.elevateweb.co.uk - Dual licensed under the LGPL licenses.
 * - http://en.wikipedia.org/wiki/MIT_License - http://en.wikipedia.org/wiki/GNU_General_Public_License */
"function" !== typeof Object.create &&
  (Object.create = function (b) {
    function a() {}
    a.prototype = b;
    return new a();
  });
(function (f, e, b, a) {
  var c = {
    init: function (d, g) {
      var h = this;
      h.elem = g;
      h.$elem = f(g);
      h.imageSrc = h.$elem.data("zoom-image")
        ? h.$elem.data("zoom-image")
        : h.$elem.attr("src");
      h.options = f.extend({}, f.fn.elevateZoom.options, d);
      h.options.tint &&
        ((h.options.lensColour = "none"), (h.options.lensOpacity = "1"));
      "inner" == h.options.zoomType && (h.options.showLens = !1);
      h.$elem.parent().removeAttr("title").removeAttr("alt");
      h.zoomImage = h.imageSrc;
      h.refresh(1);
      f("#" + h.options.gallery + " a").click(function (i) {
        h.options.galleryActiveClass &&
          (f("#" + h.options.gallery + " a").removeClass(
            h.options.galleryActiveClass
          ),
          f(this).addClass(h.options.galleryActiveClass));
        i.preventDefault();
        f(this).data("zoom-image")
          ? (h.zoomImagePre = f(this).data("zoom-image"))
          : (h.zoomImagePre = f(this).data("image"));
        h.swaptheimage(f(this).data("image"), h.zoomImagePre);
        return !1;
      });
    },
    refresh: function (d) {
      var g = this;
      setTimeout(function () {
        g.fetch(g.imageSrc);
      }, d || g.options.refresh);
    },
    fetch: function (d) {
      var g = this,
        h = new Image();
      h.onload = function () {
        g.largeWidth = h.width;
        g.largeHeight = h.height;
        g.startZoom();
        g.currentImage = g.imageSrc;
        g.options.onZoomedImageLoaded(g.$elem);
      };
      h.src = d;
    },
    startZoom: function () {
      var d = this;
      d.nzWidth = d.$elem.width();
      d.nzHeight = d.$elem.height();
      d.isWindowActive = !1;
      d.isLensActive = !1;
      d.isTintActive = !1;
      d.overWindow = !1;
      d.options.imageCrossfade &&
        ((d.zoomWrap = d.$elem.wrap(
          '<div style="height:' +
            d.nzHeight +
            "px;width:" +
            d.nzWidth +
            'px;" class="zoomWrapper" />'
        )),
        d.$elem.css("position", "absolute"));
      d.zoomLock = 1;
      d.scrollingLock = !1;
      d.changeBgSize = !1;
      d.currentZoomLevel = d.options.zoomLevel;
      d.nzOffset = d.$elem.offset();
      d.widthRatio = d.largeWidth / d.currentZoomLevel / d.nzWidth;
      d.heightRatio = d.largeHeight / d.currentZoomLevel / d.nzHeight;
      "window" == d.options.zoomType &&
        (d.zoomWindowStyle =
          "overflow: hidden;background-position: 0px 0px;text-align:center;background-color: " +
          String(d.options.zoomWindowBgColour) +
          ";width: " +
          String(d.options.zoomWindowWidth) +
          "px;height: " +
          String(d.options.zoomWindowHeight) +
          "px;float: left;background-size: " +
          d.largeWidth / d.currentZoomLevel +
          "px " +
          d.largeHeight / d.currentZoomLevel +
          "px;display: none;z-index:100;border: " +
          String(d.options.borderSize) +
          "px solid " +
          d.options.borderColour +
          ";background-repeat: no-repeat;position: absolute;");
      if ("inner" == d.options.zoomType) {
        var g = d.$elem.css("border-left-width");
        d.zoomWindowStyle =
          "overflow: hidden;margin-left: " +
          String(g) +
          ";margin-top: " +
          String(g) +
          ";background-position: 0px 0px;width: " +
          String(d.nzWidth) +
          "px;height: " +
          String(d.nzHeight) +
          "px;float: left;display: none;cursor:" +
          d.options.cursor +
          ";px solid " +
          d.options.borderColour +
          ";background-repeat: no-repeat;position: absolute;";
      }
      "window" == d.options.zoomType &&
        ((lensHeight =
          d.nzHeight < d.options.zoomWindowWidth / d.widthRatio
            ? d.nzHeight
            : String(d.options.zoomWindowHeight / d.heightRatio)),
        (lensWidth =
          d.largeWidth < d.options.zoomWindowWidth
            ? d.nzWidth
            : d.options.zoomWindowWidth / d.widthRatio),
        (d.lensStyle =
          "background-position: 0px 0px;width: " +
          String(d.options.zoomWindowWidth / d.widthRatio) +
          "px;height: " +
          String(d.options.zoomWindowHeight / d.heightRatio) +
          "px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:" +
          d.options.lensOpacity +
          ";filter: alpha(opacity = " +
          100 * d.options.lensOpacity +
          "); zoom:1;width:" +
          lensWidth +
          "px;height:" +
          lensHeight +
          "px;background-color:" +
          d.options.lensColour +
          ";cursor:" +
          d.options.cursor +
          ";border: " +
          d.options.lensBorderSize +
          "px solid " +
          d.options.lensBorderColour +
          ";background-repeat: no-repeat;position: absolute;"));
      d.tintStyle =
        "display: block;position: absolute;background-color: " +
        d.options.tintColour +
        ";filter:alpha(opacity=0);opacity: 0;width: " +
        d.nzWidth +
        "px;height: " +
        d.nzHeight +
        "px;";
      d.lensRound = "";
      "lens" == d.options.zoomType &&
        (d.lensStyle =
          "background-position: 0px 0px;float: left;display: none;border: " +
          String(d.options.borderSize) +
          "px solid " +
          d.options.borderColour +
          ";width:" +
          String(d.options.lensSize) +
          "px;height:" +
          String(d.options.lensSize) +
          "px;background-repeat: no-repeat;position: absolute;");
      "round" == d.options.lensShape &&
        (d.lensRound =
          "border-top-left-radius: " +
          String(d.options.lensSize / 2 + d.options.borderSize) +
          "px;border-top-right-radius: " +
          String(d.options.lensSize / 2 + d.options.borderSize) +
          "px;border-bottom-left-radius: " +
          String(d.options.lensSize / 2 + d.options.borderSize) +
          "px;border-bottom-right-radius: " +
          String(d.options.lensSize / 2 + d.options.borderSize) +
          "px;");
      d.zoomContainer = f(
        '<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:' +
          d.nzOffset.left +
          "px;top:" +
          d.nzOffset.top +
          "px;height:" +
          d.nzHeight +
          "px;width:" +
          d.nzWidth +
          'px;"></div>'
      );
      f("body").append(d.zoomContainer);
      d.options.containLensZoom &&
        "lens" == d.options.zoomType &&
        d.zoomContainer.css("overflow", "hidden");
      "inner" != d.options.zoomType &&
        ((d.zoomLens = f(
          "<div class='zoomLens' style='" +
            d.lensStyle +
            d.lensRound +
            "'> </div>"
        )
          .appendTo(d.zoomContainer)
          .click(function () {
            d.$elem.trigger("click");
          })),
        d.options.tint &&
          ((d.tintContainer = f("<div/>").addClass("tintContainer")),
          (d.zoomTint = f(
            "<div class='zoomTint' style='" + d.tintStyle + "'></div>"
          )),
          d.zoomLens.wrap(d.tintContainer),
          (d.zoomTintcss = d.zoomLens.after(d.zoomTint)),
          (d.zoomTintImage = f(
            '<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: ' +
              d.nzWidth +
              "px; height: " +
              d.nzHeight +
              'px;" src="' +
              d.imageSrc +
              '">'
          )
            .appendTo(d.zoomLens)
            .click(function () {
              d.$elem.trigger("click");
            }))));
      isNaN(d.options.zoomWindowPosition)
        ? (d.zoomWindow = f(
            "<div style='z-index:999;left:" +
              d.windowOffsetLeft +
              "px;top:" +
              d.windowOffsetTop +
              "px;" +
              d.zoomWindowStyle +
              "' class='zoomWindow'> </div>"
          )
            .appendTo("body")
            .click(function () {
              d.$elem.trigger("click");
            }))
        : (d.zoomWindow = f(
            "<div style='z-index:999;left:" +
              d.windowOffsetLeft +
              "px;top:" +
              d.windowOffsetTop +
              "px;" +
              d.zoomWindowStyle +
              "' class='zoomWindow'> </div>"
          )
            .appendTo(d.zoomContainer)
            .click(function () {
              d.$elem.trigger("click");
            }));
      d.zoomWindowContainer = f("<div/>")
        .addClass("zoomWindowContainer")
        .css("width", d.options.zoomWindowWidth);
      d.zoomWindow.wrap(d.zoomWindowContainer);
      "lens" == d.options.zoomType &&
        d.zoomLens.css({ backgroundImage: "url('" + d.imageSrc + "')" });
      "window" == d.options.zoomType &&
        d.zoomWindow.css({ backgroundImage: "url('" + d.imageSrc + "')" });
      "inner" == d.options.zoomType &&
        d.zoomWindow.css({ backgroundImage: "url('" + d.imageSrc + "')" });
      d.$elem.bind("touchmove", function (h) {
        h.preventDefault();
        d.setPosition(
          h.originalEvent.touches[0] || h.originalEvent.changedTouches[0]
        );
      });
      d.zoomContainer.bind("touchmove", function (h) {
        "inner" == d.options.zoomType && d.showHideWindow("show");
        h.preventDefault();
        d.setPosition(
          h.originalEvent.touches[0] || h.originalEvent.changedTouches[0]
        );
      });
      d.zoomContainer.bind("touchend", function (h) {
        d.showHideWindow("hide");
        d.options.showLens && d.showHideLens("hide");
        d.options.tint &&
          "inner" != d.options.zoomType &&
          d.showHideTint("hide");
      });
      d.$elem.bind("touchend", function (h) {
        d.showHideWindow("hide");
        d.options.showLens && d.showHideLens("hide");
        d.options.tint &&
          "inner" != d.options.zoomType &&
          d.showHideTint("hide");
      });
      d.options.showLens &&
        (d.zoomLens.bind("touchmove", function (h) {
          h.preventDefault();
          d.setPosition(
            h.originalEvent.touches[0] || h.originalEvent.changedTouches[0]
          );
        }),
        d.zoomLens.bind("touchend", function (h) {
          d.showHideWindow("hide");
          d.options.showLens && d.showHideLens("hide");
          d.options.tint &&
            "inner" != d.options.zoomType &&
            d.showHideTint("hide");
        }));
      d.$elem.bind("mousemove", function (h) {
        !1 == d.overWindow && d.setElements("show");
        if (d.lastX !== h.clientX || d.lastY !== h.clientY) {
          d.setPosition(h), (d.currentLoc = h);
        }
        d.lastX = h.clientX;
        d.lastY = h.clientY;
      });
      d.zoomContainer.bind("mousemove", function (h) {
        !1 == d.overWindow && d.setElements("show");
        if (d.lastX !== h.clientX || d.lastY !== h.clientY) {
          d.setPosition(h), (d.currentLoc = h);
        }
        d.lastX = h.clientX;
        d.lastY = h.clientY;
      });
      "inner" != d.options.zoomType &&
        d.zoomLens.bind("mousemove", function (h) {
          if (d.lastX !== h.clientX || d.lastY !== h.clientY) {
            d.setPosition(h), (d.currentLoc = h);
          }
          d.lastX = h.clientX;
          d.lastY = h.clientY;
        });
      d.options.tint &&
        "inner" != d.options.zoomType &&
        d.zoomTint.bind("mousemove", function (h) {
          if (d.lastX !== h.clientX || d.lastY !== h.clientY) {
            d.setPosition(h), (d.currentLoc = h);
          }
          d.lastX = h.clientX;
          d.lastY = h.clientY;
        });
      "inner" == d.options.zoomType &&
        d.zoomWindow.bind("mousemove", function (h) {
          if (d.lastX !== h.clientX || d.lastY !== h.clientY) {
            d.setPosition(h), (d.currentLoc = h);
          }
          d.lastX = h.clientX;
          d.lastY = h.clientY;
        });
      d.zoomContainer
        .add(d.$elem)
        .mouseenter(function () {
          !1 == d.overWindow && d.setElements("show");
        })
        .mouseleave(function () {
          d.scrollLock || d.setElements("hide");
        });
      "inner" != d.options.zoomType &&
        d.zoomWindow
          .mouseenter(function () {
            d.overWindow = !0;
            d.setElements("hide");
          })
          .mouseleave(function () {
            d.overWindow = !1;
          });
      d.minZoomLevel = d.options.minZoomLevel
        ? d.options.minZoomLevel
        : 2 * d.options.scrollZoomIncrement;
      d.options.scrollZoom &&
        d.zoomContainer
          .add(d.$elem)
          .bind("mousewheel DOMMouseScroll MozMousePixelScroll", function (h) {
            d.scrollLock = !0;
            clearTimeout(f.data(this, "timer"));
            f.data(
              this,
              "timer",
              setTimeout(function () {
                d.scrollLock = !1;
              }, 250)
            );
            var i = h.originalEvent.wheelDelta || -1 * h.originalEvent.detail;
            h.stopImmediatePropagation();
            h.stopPropagation();
            h.preventDefault();
            0 < i / 120
              ? d.currentZoomLevel >= d.minZoomLevel &&
                d.changeZoomLevel(
                  d.currentZoomLevel - d.options.scrollZoomIncrement
                )
              : d.options.maxZoomLevel
              ? d.currentZoomLevel <= d.options.maxZoomLevel &&
                d.changeZoomLevel(
                  parseFloat(d.currentZoomLevel) + d.options.scrollZoomIncrement
                )
              : d.changeZoomLevel(
                  parseFloat(d.currentZoomLevel) + d.options.scrollZoomIncrement
                );
            return !1;
          });
    },
    setElements: function (d) {
      if (!this.options.zoomEnabled) {
        return !1;
      }
      "show" == d &&
        this.isWindowSet &&
        ("inner" == this.options.zoomType && this.showHideWindow("show"),
        "window" == this.options.zoomType && this.showHideWindow("show"),
        this.options.showLens && this.showHideLens("show"),
        this.options.tint &&
          "inner" != this.options.zoomType &&
          this.showHideTint("show"));
      "hide" == d &&
        ("window" == this.options.zoomType && this.showHideWindow("hide"),
        this.options.tint || this.showHideWindow("hide"),
        this.options.showLens && this.showHideLens("hide"),
        this.options.tint && this.showHideTint("hide"));
    },
    setPosition: function (d) {
      if (!this.options.zoomEnabled) {
        return !1;
      }
      this.nzHeight = this.$elem.height();
      this.nzWidth = this.$elem.width();
      this.nzOffset = this.$elem.offset();
      this.options.tint &&
        "inner" != this.options.zoomType &&
        (this.zoomTint.css({ top: 0 }), this.zoomTint.css({ left: 0 }));
      this.options.responsive &&
        !this.options.scrollZoom &&
        this.options.showLens &&
        ((lensHeight =
          this.nzHeight < this.options.zoomWindowWidth / this.widthRatio
            ? this.nzHeight
            : String(this.options.zoomWindowHeight / this.heightRatio)),
        (lensWidth =
          this.largeWidth < this.options.zoomWindowWidth
            ? this.nzWidth
            : this.options.zoomWindowWidth / this.widthRatio),
        (this.widthRatio = this.largeWidth / this.nzWidth),
        (this.heightRatio = this.largeHeight / this.nzHeight),
        "lens" != this.options.zoomType &&
          ((lensHeight =
            this.nzHeight < this.options.zoomWindowWidth / this.widthRatio
              ? this.nzHeight
              : String(this.options.zoomWindowHeight / this.heightRatio)),
          (lensWidth =
            this.options.zoomWindowWidth < this.options.zoomWindowWidth
              ? this.nzWidth
              : this.options.zoomWindowWidth / this.widthRatio),
          this.zoomLens.css("width", lensWidth),
          this.zoomLens.css("height", lensHeight),
          this.options.tint &&
            (this.zoomTintImage.css("width", this.nzWidth),
            this.zoomTintImage.css("height", this.nzHeight))),
        "lens" == this.options.zoomType &&
          this.zoomLens.css({
            width: String(this.options.lensSize) + "px",
            height: String(this.options.lensSize) + "px",
          }));
      this.zoomContainer.css({ top: this.nzOffset.top });
      this.zoomContainer.css({ left: this.nzOffset.left });
      this.mouseLeft = parseInt(d.pageX - this.nzOffset.left);
      this.mouseTop = parseInt(d.pageY - this.nzOffset.top);
      "window" == this.options.zoomType &&
        ((this.Etoppos = this.mouseTop < this.zoomLens.height() / 2),
        (this.Eboppos =
          this.mouseTop >
          this.nzHeight -
            this.zoomLens.height() / 2 -
            2 * this.options.lensBorderSize),
        (this.Eloppos = this.mouseLeft < 0 + this.zoomLens.width() / 2),
        (this.Eroppos =
          this.mouseLeft >
          this.nzWidth -
            this.zoomLens.width() / 2 -
            2 * this.options.lensBorderSize));
      "inner" == this.options.zoomType &&
        ((this.Etoppos = this.mouseTop < this.nzHeight / 2 / this.heightRatio),
        (this.Eboppos =
          this.mouseTop > this.nzHeight - this.nzHeight / 2 / this.heightRatio),
        (this.Eloppos =
          this.mouseLeft < 0 + this.nzWidth / 2 / this.widthRatio),
        (this.Eroppos =
          this.mouseLeft >
          this.nzWidth -
            this.nzWidth / 2 / this.widthRatio -
            2 * this.options.lensBorderSize));
      0 >= this.mouseLeft ||
      0 > this.mouseTop ||
      this.mouseLeft > this.nzWidth ||
      this.mouseTop > this.nzHeight
        ? this.setElements("hide")
        : (this.options.showLens &&
            ((this.lensLeftPos = String(
              this.mouseLeft - this.zoomLens.width() / 2
            )),
            (this.lensTopPos = String(
              this.mouseTop - this.zoomLens.height() / 2
            ))),
          this.Etoppos && (this.lensTopPos = 0),
          this.Eloppos &&
            (this.tintpos = this.lensLeftPos = this.windowLeftPos = 0),
          "window" == this.options.zoomType &&
            (this.Eboppos &&
              (this.lensTopPos = Math.max(
                this.nzHeight -
                  this.zoomLens.height() -
                  2 * this.options.lensBorderSize,
                0
              )),
            this.Eroppos &&
              (this.lensLeftPos =
                this.nzWidth -
                this.zoomLens.width() -
                2 * this.options.lensBorderSize)),
          "inner" == this.options.zoomType &&
            (this.Eboppos &&
              (this.lensTopPos = Math.max(
                this.nzHeight - 2 * this.options.lensBorderSize,
                0
              )),
            this.Eroppos &&
              (this.lensLeftPos =
                this.nzWidth - this.nzWidth - 2 * this.options.lensBorderSize)),
          "lens" == this.options.zoomType &&
            ((this.windowLeftPos = String(
              -1 *
                ((d.pageX - this.nzOffset.left) * this.widthRatio -
                  this.zoomLens.width() / 2)
            )),
            (this.windowTopPos = String(
              -1 *
                ((d.pageY - this.nzOffset.top) * this.heightRatio -
                  this.zoomLens.height() / 2)
            )),
            this.zoomLens.css({
              backgroundPosition:
                this.windowLeftPos + "px " + this.windowTopPos + "px",
            }),
            this.changeBgSize &&
              (this.nzHeight > this.nzWidth
                ? ("lens" == this.options.zoomType &&
                    this.zoomLens.css({
                      "background-size":
                        this.largeWidth / this.newvalueheight +
                        "px " +
                        this.largeHeight / this.newvalueheight +
                        "px",
                    }),
                  this.zoomWindow.css({
                    "background-size":
                      this.largeWidth / this.newvalueheight +
                      "px " +
                      this.largeHeight / this.newvalueheight +
                      "px",
                  }))
                : ("lens" == this.options.zoomType &&
                    this.zoomLens.css({
                      "background-size":
                        this.largeWidth / this.newvaluewidth +
                        "px " +
                        this.largeHeight / this.newvaluewidth +
                        "px",
                    }),
                  this.zoomWindow.css({
                    "background-size":
                      this.largeWidth / this.newvaluewidth +
                      "px " +
                      this.largeHeight / this.newvaluewidth +
                      "px",
                  })),
              (this.changeBgSize = !1)),
            this.setWindowPostition(d)),
          this.options.tint &&
            "inner" != this.options.zoomType &&
            this.setTintPosition(d),
          "window" == this.options.zoomType && this.setWindowPostition(d),
          "inner" == this.options.zoomType && this.setWindowPostition(d),
          this.options.showLens &&
            (this.fullwidth &&
              "lens" != this.options.zoomType &&
              (this.lensLeftPos = 0),
            this.zoomLens.css({
              left: this.lensLeftPos + "px",
              top: this.lensTopPos + "px",
            })));
    },
    showHideWindow: function (d) {
      "show" != d ||
        this.isWindowActive ||
        (this.options.zoomWindowFadeIn
          ? this.zoomWindow
              .stop(!0, !0, !1)
              .fadeIn(this.options.zoomWindowFadeIn)
          : this.zoomWindow.show(),
        (this.isWindowActive = !0));
      "hide" == d &&
        this.isWindowActive &&
        (this.options.zoomWindowFadeOut
          ? this.zoomWindow.stop(!0, !0).fadeOut(this.options.zoomWindowFadeOut)
          : this.zoomWindow.hide(),
        (this.isWindowActive = !1));
    },
    showHideLens: function (d) {
      "show" != d ||
        this.isLensActive ||
        (this.options.lensFadeIn
          ? this.zoomLens.stop(!0, !0, !1).fadeIn(this.options.lensFadeIn)
          : this.zoomLens.show(),
        (this.isLensActive = !0));
      "hide" == d &&
        this.isLensActive &&
        (this.options.lensFadeOut
          ? this.zoomLens.stop(!0, !0).fadeOut(this.options.lensFadeOut)
          : this.zoomLens.hide(),
        (this.isLensActive = !1));
    },
    showHideTint: function (d) {
      "show" != d ||
        this.isTintActive ||
        (this.options.zoomTintFadeIn
          ? this.zoomTint
              .css({ opacity: this.options.tintOpacity })
              .animate()
              .stop(!0, !0)
              .fadeIn("slow")
          : (this.zoomTint.css({ opacity: this.options.tintOpacity }).animate(),
            this.zoomTint.show()),
        (this.isTintActive = !0));
      "hide" == d &&
        this.isTintActive &&
        (this.options.zoomTintFadeOut
          ? this.zoomTint.stop(!0, !0).fadeOut(this.options.zoomTintFadeOut)
          : this.zoomTint.hide(),
        (this.isTintActive = !1));
    },
    setLensPostition: function (d) {},
    setWindowPostition: function (d) {
      var g = this;
      if (isNaN(g.options.zoomWindowPosition)) {
        (g.externalContainer = f("#" + g.options.zoomWindowPosition)),
          (g.externalContainerWidth = g.externalContainer.width()),
          (g.externalContainerHeight = g.externalContainer.height()),
          (g.externalContainerOffset = g.externalContainer.offset()),
          (g.windowOffsetTop = g.externalContainerOffset.top),
          (g.windowOffsetLeft = g.externalContainerOffset.left);
      } else {
        switch (g.options.zoomWindowPosition) {
          case 1:
            g.windowOffsetTop = g.options.zoomWindowOffety;
            g.windowOffsetLeft = +g.nzWidth;
            break;
          case 2:
            g.options.zoomWindowHeight > g.nzHeight &&
              ((g.windowOffsetTop =
                -1 * (g.options.zoomWindowHeight / 2 - g.nzHeight / 2)),
              (g.windowOffsetLeft = g.nzWidth));
            break;
          case 3:
            g.windowOffsetTop =
              g.nzHeight - g.zoomWindow.height() - 2 * g.options.borderSize;
            g.windowOffsetLeft = g.nzWidth;
            break;
          case 4:
            g.windowOffsetTop = g.nzHeight;
            g.windowOffsetLeft = g.nzWidth;
            break;
          case 5:
            g.windowOffsetTop = g.nzHeight;
            g.windowOffsetLeft =
              g.nzWidth - g.zoomWindow.width() - 2 * g.options.borderSize;
            break;
          case 6:
            g.options.zoomWindowHeight > g.nzHeight &&
              ((g.windowOffsetTop = g.nzHeight),
              (g.windowOffsetLeft =
                -1 *
                (g.options.zoomWindowWidth / 2 -
                  g.nzWidth / 2 +
                  2 * g.options.borderSize)));
            break;
          case 7:
            g.windowOffsetTop = g.nzHeight;
            g.windowOffsetLeft = 0;
            break;
          case 8:
            g.windowOffsetTop = g.nzHeight;
            g.windowOffsetLeft =
              -1 * (g.zoomWindow.width() + 2 * g.options.borderSize);
            break;
          case 9:
            g.windowOffsetTop =
              g.nzHeight - g.zoomWindow.height() - 2 * g.options.borderSize;
            g.windowOffsetLeft =
              -1 * (g.zoomWindow.width() + 2 * g.options.borderSize);
            break;
          case 10:
            g.options.zoomWindowHeight > g.nzHeight &&
              ((g.windowOffsetTop =
                -1 * (g.options.zoomWindowHeight / 2 - g.nzHeight / 2)),
              (g.windowOffsetLeft =
                -1 * (g.zoomWindow.width() + 2 * g.options.borderSize)));
            break;
          case 11:
            g.windowOffsetTop = g.options.zoomWindowOffety;
            g.windowOffsetLeft =
              -1 * (g.zoomWindow.width() + 2 * g.options.borderSize);
            break;
          case 12:
            g.windowOffsetTop =
              -1 * (g.zoomWindow.height() + 2 * g.options.borderSize);
            g.windowOffsetLeft =
              -1 * (g.zoomWindow.width() + 2 * g.options.borderSize);
            break;
          case 13:
            g.windowOffsetTop =
              -1 * (g.zoomWindow.height() + 2 * g.options.borderSize);
            g.windowOffsetLeft = 0;
            break;
          case 14:
            g.options.zoomWindowHeight > g.nzHeight &&
              ((g.windowOffsetTop =
                -1 * (g.zoomWindow.height() + 2 * g.options.borderSize)),
              (g.windowOffsetLeft =
                -1 *
                (g.options.zoomWindowWidth / 2 -
                  g.nzWidth / 2 +
                  2 * g.options.borderSize)));
            break;
          case 15:
            g.windowOffsetTop =
              -1 * (g.zoomWindow.height() + 2 * g.options.borderSize);
            g.windowOffsetLeft =
              g.nzWidth - g.zoomWindow.width() - 2 * g.options.borderSize;
            break;
          case 16:
            g.windowOffsetTop =
              -1 * (g.zoomWindow.height() + 2 * g.options.borderSize);
            g.windowOffsetLeft = g.nzWidth;
            break;
          default:
            (g.windowOffsetTop = g.options.zoomWindowOffety),
              (g.windowOffsetLeft = g.nzWidth);
        }
      }
      g.isWindowSet = !0;
      g.windowOffsetTop += g.options.zoomWindowOffety;
      g.windowOffsetLeft += g.options.zoomWindowOffetx;
      g.zoomWindow.css({ top: g.windowOffsetTop });
      g.zoomWindow.css({ left: g.windowOffsetLeft });
      "inner" == g.options.zoomType &&
        (g.zoomWindow.css({ top: 0 }), g.zoomWindow.css({ left: 0 }));
      g.windowLeftPos = String(
        -1 *
          ((d.pageX - g.nzOffset.left) * g.widthRatio -
            g.zoomWindow.width() / 2)
      );
      g.windowTopPos = String(
        -1 *
          ((d.pageY - g.nzOffset.top) * g.heightRatio -
            g.zoomWindow.height() / 2)
      );
      g.Etoppos && (g.windowTopPos = 0);
      g.Eloppos && (g.windowLeftPos = 0);
      g.Eboppos &&
        (g.windowTopPos =
          -1 * (g.largeHeight / g.currentZoomLevel - g.zoomWindow.height()));
      g.Eroppos &&
        (g.windowLeftPos =
          -1 * (g.largeWidth / g.currentZoomLevel - g.zoomWindow.width()));
      g.fullheight && (g.windowTopPos = 0);
      g.fullwidth && (g.windowLeftPos = 0);
      if ("window" == g.options.zoomType || "inner" == g.options.zoomType) {
        1 == g.zoomLock &&
          (1 >= g.widthRatio && (g.windowLeftPos = 0),
          1 >= g.heightRatio && (g.windowTopPos = 0)),
          g.largeHeight < g.options.zoomWindowHeight && (g.windowTopPos = 0),
          g.largeWidth < g.options.zoomWindowWidth && (g.windowLeftPos = 0),
          g.options.easing
            ? (g.xp || (g.xp = 0),
              g.yp || (g.yp = 0),
              g.loop ||
                (g.loop = setInterval(function () {
                  g.xp += (g.windowLeftPos - g.xp) / g.options.easingAmount;
                  g.yp += (g.windowTopPos - g.yp) / g.options.easingAmount;
                  g.scrollingLock
                    ? (clearInterval(g.loop),
                      (g.xp = g.windowLeftPos),
                      (g.yp = g.windowTopPos),
                      (g.xp =
                        -1 *
                        ((d.pageX - g.nzOffset.left) * g.widthRatio -
                          g.zoomWindow.width() / 2)),
                      (g.yp =
                        -1 *
                        ((d.pageY - g.nzOffset.top) * g.heightRatio -
                          g.zoomWindow.height() / 2)),
                      g.changeBgSize &&
                        (g.nzHeight > g.nzWidth
                          ? ("lens" == g.options.zoomType &&
                              g.zoomLens.css({
                                "background-size":
                                  g.largeWidth / g.newvalueheight +
                                  "px " +
                                  g.largeHeight / g.newvalueheight +
                                  "px",
                              }),
                            g.zoomWindow.css({
                              "background-size":
                                g.largeWidth / g.newvalueheight +
                                "px " +
                                g.largeHeight / g.newvalueheight +
                                "px",
                            }))
                          : ("lens" != g.options.zoomType &&
                              g.zoomLens.css({
                                "background-size":
                                  g.largeWidth / g.newvaluewidth +
                                  "px " +
                                  g.largeHeight / g.newvalueheight +
                                  "px",
                              }),
                            g.zoomWindow.css({
                              "background-size":
                                g.largeWidth / g.newvaluewidth +
                                "px " +
                                g.largeHeight / g.newvaluewidth +
                                "px",
                            })),
                        (g.changeBgSize = !1)),
                      g.zoomWindow.css({
                        backgroundPosition:
                          g.windowLeftPos + "px " + g.windowTopPos + "px",
                      }),
                      (g.scrollingLock = !1),
                      (g.loop = !1))
                    : (g.changeBgSize &&
                        (g.nzHeight > g.nzWidth
                          ? ("lens" == g.options.zoomType &&
                              g.zoomLens.css({
                                "background-size":
                                  g.largeWidth / g.newvalueheight +
                                  "px " +
                                  g.largeHeight / g.newvalueheight +
                                  "px",
                              }),
                            g.zoomWindow.css({
                              "background-size":
                                g.largeWidth / g.newvalueheight +
                                "px " +
                                g.largeHeight / g.newvalueheight +
                                "px",
                            }))
                          : ("lens" != g.options.zoomType &&
                              g.zoomLens.css({
                                "background-size":
                                  g.largeWidth / g.newvaluewidth +
                                  "px " +
                                  g.largeHeight / g.newvaluewidth +
                                  "px",
                              }),
                            g.zoomWindow.css({
                              "background-size":
                                g.largeWidth / g.newvaluewidth +
                                "px " +
                                g.largeHeight / g.newvaluewidth +
                                "px",
                            })),
                        (g.changeBgSize = !1)),
                      g.zoomWindow.css({
                        backgroundPosition: g.xp + "px " + g.yp + "px",
                      }));
                }, 16)))
            : (g.changeBgSize &&
                (g.nzHeight > g.nzWidth
                  ? ("lens" == g.options.zoomType &&
                      g.zoomLens.css({
                        "background-size":
                          g.largeWidth / g.newvalueheight +
                          "px " +
                          g.largeHeight / g.newvalueheight +
                          "px",
                      }),
                    g.zoomWindow.css({
                      "background-size":
                        g.largeWidth / g.newvalueheight +
                        "px " +
                        g.largeHeight / g.newvalueheight +
                        "px",
                    }))
                  : ("lens" == g.options.zoomType &&
                      g.zoomLens.css({
                        "background-size":
                          g.largeWidth / g.newvaluewidth +
                          "px " +
                          g.largeHeight / g.newvaluewidth +
                          "px",
                      }),
                    g.largeHeight / g.newvaluewidth < g.options.zoomWindowHeight
                      ? g.zoomWindow.css({
                          "background-size":
                            g.largeWidth / g.newvaluewidth +
                            "px " +
                            g.largeHeight / g.newvaluewidth +
                            "px",
                        })
                      : g.zoomWindow.css({
                          "background-size":
                            g.largeWidth / g.newvalueheight +
                            "px " +
                            g.largeHeight / g.newvalueheight +
                            "px",
                        })),
                (g.changeBgSize = !1)),
              g.zoomWindow.css({
                backgroundPosition:
                  g.windowLeftPos + "px " + g.windowTopPos + "px",
              }));
      }
    },
    setTintPosition: function (d) {
      this.nzOffset = this.$elem.offset();
      this.tintpos = String(
        -1 * (d.pageX - this.nzOffset.left - this.zoomLens.width() / 2)
      );
      this.tintposy = String(
        -1 * (d.pageY - this.nzOffset.top - this.zoomLens.height() / 2)
      );
      this.Etoppos && (this.tintposy = 0);
      this.Eloppos && (this.tintpos = 0);
      this.Eboppos &&
        (this.tintposy =
          -1 *
          (this.nzHeight -
            this.zoomLens.height() -
            2 * this.options.lensBorderSize));
      this.Eroppos &&
        (this.tintpos =
          -1 *
          (this.nzWidth -
            this.zoomLens.width() -
            2 * this.options.lensBorderSize));
      this.options.tint &&
        (this.fullheight && (this.tintposy = 0),
        this.fullwidth && (this.tintpos = 0),
        this.zoomTintImage.css({ left: this.tintpos + "px" }),
        this.zoomTintImage.css({ top: this.tintposy + "px" }));
    },
    swaptheimage: function (d, g) {
      var i = this,
        h = new Image();
      i.options.loadingIcon &&
        ((i.spinner = f(
          "<div style=\"background: url('" +
            i.options.loadingIcon +
            "') no-repeat center;height:" +
            i.nzHeight +
            "px;width:" +
            i.nzWidth +
            'px;z-index: 2000;position: absolute; background-position: center center;"></div>'
        )),
        i.$elem.after(i.spinner));
      i.options.onImageSwap(i.$elem);
      h.onload = function () {
        i.largeWidth = h.width;
        i.largeHeight = h.height;
        i.zoomImage = g;
        i.zoomWindow.css({
          "background-size": i.largeWidth + "px " + i.largeHeight + "px",
        });
        i.zoomWindow.css({
          "background-size": i.largeWidth + "px " + i.largeHeight + "px",
        });
        i.swapAction(d, g);
      };
      h.src = g;
    },
    swapAction: function (d, h) {
      var l = this,
        k = new Image();
      k.onload = function () {
        l.nzHeight = k.height;
        l.nzWidth = k.width;
        l.options.onImageSwapComplete(l.$elem);
        l.doneCallback();
      };
      k.src = d;
      l.currentZoomLevel = l.options.zoomLevel;
      l.options.maxZoomLevel = !1;
      "lens" == l.options.zoomType &&
        l.zoomLens.css({ backgroundImage: "url('" + h + "')" });
      "window" == l.options.zoomType &&
        l.zoomWindow.css({ backgroundImage: "url('" + h + "')" });
      "inner" == l.options.zoomType &&
        l.zoomWindow.css({ backgroundImage: "url('" + h + "')" });
      l.currentImage = h;
      if (l.options.imageCrossfade) {
        var j = l.$elem,
          i = j.clone();
        l.$elem.attr("src", d);
        l.$elem.after(i);
        i.stop(!0).fadeOut(l.options.imageCrossfade, function () {
          f(this).remove();
        });
        l.$elem.width("auto").removeAttr("width");
        l.$elem.height("auto").removeAttr("height");
        j.fadeIn(l.options.imageCrossfade);
        l.options.tint &&
          "inner" != l.options.zoomType &&
          ((j = l.zoomTintImage),
          (i = j.clone()),
          l.zoomTintImage.attr("src", h),
          l.zoomTintImage.after(i),
          i.stop(!0).fadeOut(l.options.imageCrossfade, function () {
            f(this).remove();
          }),
          j.fadeIn(l.options.imageCrossfade),
          l.zoomTint.css({ height: l.$elem.height() }),
          l.zoomTint.css({ width: l.$elem.width() }));
        l.zoomContainer.css("height", l.$elem.height());
        l.zoomContainer.css("width", l.$elem.width());
        "inner" != l.options.zoomType ||
          l.options.constrainType ||
          (l.zoomWrap.parent().css("height", l.$elem.height()),
          l.zoomWrap.parent().css("width", l.$elem.width()),
          l.zoomWindow.css("height", l.$elem.height()),
          l.zoomWindow.css("width", l.$elem.width()));
      } else {
        l.$elem.attr("src", d),
          l.options.tint &&
            (l.zoomTintImage.attr("src", h),
            l.zoomTintImage.attr("height", l.$elem.height()),
            l.zoomTintImage.css({ height: l.$elem.height() }),
            l.zoomTint.css({ height: l.$elem.height() })),
          l.zoomContainer.css("height", l.$elem.height()),
          l.zoomContainer.css("width", l.$elem.width());
      }
      l.options.imageCrossfade &&
        (l.zoomWrap.css("height", l.$elem.height()),
        l.zoomWrap.css("width", l.$elem.width()));
      l.options.constrainType &&
        ("height" == l.options.constrainType &&
          (l.zoomContainer.css("height", l.options.constrainSize),
          l.zoomContainer.css("width", "auto"),
          l.options.imageCrossfade
            ? (l.zoomWrap.css("height", l.options.constrainSize),
              l.zoomWrap.css("width", "auto"),
              (l.constwidth = l.zoomWrap.width()))
            : (l.$elem.css("height", l.options.constrainSize),
              l.$elem.css("width", "auto"),
              (l.constwidth = l.$elem.width())),
          "inner" == l.options.zoomType &&
            (l.zoomWrap.parent().css("height", l.options.constrainSize),
            l.zoomWrap.parent().css("width", l.constwidth),
            l.zoomWindow.css("height", l.options.constrainSize),
            l.zoomWindow.css("width", l.constwidth)),
          l.options.tint &&
            (l.tintContainer.css("height", l.options.constrainSize),
            l.tintContainer.css("width", l.constwidth),
            l.zoomTint.css("height", l.options.constrainSize),
            l.zoomTint.css("width", l.constwidth),
            l.zoomTintImage.css("height", l.options.constrainSize),
            l.zoomTintImage.css("width", l.constwidth))),
        "width" == l.options.constrainType &&
          (l.zoomContainer.css("height", "200px"),
          l.zoomContainer.css("width", l.options.constrainSize),
          l.options.imageCrossfade
            ? (l.zoomWrap.css("height", "auto"),
              l.zoomWrap.css("width", l.options.constrainSize),
              (l.constheight = l.zoomWrap.height()))
            : (l.$elem.css("height", "auto"),
              l.$elem.css("width", l.options.constrainSize),
              (l.constheight = l.$elem.height())),
          "inner" == l.options.zoomType &&
            (l.zoomWrap.parent().css("height", l.constheight),
            l.zoomWrap.parent().css("width", l.options.constrainSize),
            l.zoomWindow.css("height", l.constheight),
            l.zoomWindow.css("width", l.options.constrainSize)),
          l.options.tint &&
            (l.tintContainer.css("height", l.constheight),
            l.tintContainer.css("width", l.options.constrainSize),
            l.zoomTint.css("height", l.constheight),
            l.zoomTint.css("width", l.options.constrainSize),
            l.zoomTintImage.css("height", l.constheight),
            l.zoomTintImage.css("width", l.options.constrainSize))));
    },
    doneCallback: function () {
      this.options.loadingIcon && this.spinner.hide();
      this.nzOffset = this.$elem.offset();
      this.nzWidth = this.$elem.width();
      this.nzHeight = this.$elem.height();
      this.currentZoomLevel = this.options.zoomLevel;
      this.widthRatio = this.largeWidth / this.nzWidth;
      this.heightRatio = this.largeHeight / this.nzHeight;
      "window" == this.options.zoomType &&
        ((lensHeight =
          this.nzHeight < this.options.zoomWindowWidth / this.widthRatio
            ? this.nzHeight
            : String(this.options.zoomWindowHeight / this.heightRatio)),
        (lensWidth =
          this.options.zoomWindowWidth < this.options.zoomWindowWidth
            ? this.nzWidth
            : this.options.zoomWindowWidth / this.widthRatio),
        this.zoomLens &&
          (this.zoomLens.css("width", lensWidth),
          this.zoomLens.css("height", lensHeight)));
    },
    getCurrentImage: function () {
      return this.zoomImage;
    },
    getGalleryList: function () {
      var d = this;
      d.gallerylist = [];
      d.options.gallery
        ? f("#" + d.options.gallery + " a").each(function () {
            var g = "";
            f(this).data("zoom-image")
              ? (g = f(this).data("zoom-image"))
              : f(this).data("image") && (g = f(this).data("image"));
            g == d.zoomImage
              ? d.gallerylist.unshift({
                  href: "" + g + "",
                  title: f(this).find("img").attr("title"),
                })
              : d.gallerylist.push({
                  href: "" + g + "",
                  title: f(this).find("img").attr("title"),
                });
          })
        : d.gallerylist.push({
            href: "" + d.zoomImage + "",
            title: f(this).find("img").attr("title"),
          });
      return d.gallerylist;
    },
    changeZoomLevel: function (d) {
      this.scrollingLock = !0;
      this.newvalue = parseFloat(d).toFixed(2);
      newvalue = parseFloat(d).toFixed(2);
      maxheightnewvalue =
        this.largeHeight /
        ((this.options.zoomWindowHeight / this.nzHeight) * this.nzHeight);
      maxwidthtnewvalue =
        this.largeWidth /
        ((this.options.zoomWindowWidth / this.nzWidth) * this.nzWidth);
      "inner" != this.options.zoomType &&
        (maxheightnewvalue <= newvalue
          ? ((this.heightRatio =
              this.largeHeight / maxheightnewvalue / this.nzHeight),
            (this.newvalueheight = maxheightnewvalue),
            (this.fullheight = !0))
          : ((this.heightRatio = this.largeHeight / newvalue / this.nzHeight),
            (this.newvalueheight = newvalue),
            (this.fullheight = !1)),
        maxwidthtnewvalue <= newvalue
          ? ((this.widthRatio =
              this.largeWidth / maxwidthtnewvalue / this.nzWidth),
            (this.newvaluewidth = maxwidthtnewvalue),
            (this.fullwidth = !0))
          : ((this.widthRatio = this.largeWidth / newvalue / this.nzWidth),
            (this.newvaluewidth = newvalue),
            (this.fullwidth = !1)),
        "lens" == this.options.zoomType &&
          (maxheightnewvalue <= newvalue
            ? ((this.fullwidth = !0), (this.newvaluewidth = maxheightnewvalue))
            : ((this.widthRatio = this.largeWidth / newvalue / this.nzWidth),
              (this.newvaluewidth = newvalue),
              (this.fullwidth = !1))));
      "inner" == this.options.zoomType &&
        ((maxheightnewvalue = parseFloat(
          this.largeHeight / this.nzHeight
        ).toFixed(2)),
        (maxwidthtnewvalue = parseFloat(this.largeWidth / this.nzWidth).toFixed(
          2
        )),
        newvalue > maxheightnewvalue && (newvalue = maxheightnewvalue),
        newvalue > maxwidthtnewvalue && (newvalue = maxwidthtnewvalue),
        maxheightnewvalue <= newvalue
          ? ((this.heightRatio = this.largeHeight / newvalue / this.nzHeight),
            (this.newvalueheight =
              newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue),
            (this.fullheight = !0))
          : ((this.heightRatio = this.largeHeight / newvalue / this.nzHeight),
            (this.newvalueheight =
              newvalue > maxheightnewvalue ? maxheightnewvalue : newvalue),
            (this.fullheight = !1)),
        maxwidthtnewvalue <= newvalue
          ? ((this.widthRatio = this.largeWidth / newvalue / this.nzWidth),
            (this.newvaluewidth =
              newvalue > maxwidthtnewvalue ? maxwidthtnewvalue : newvalue),
            (this.fullwidth = !0))
          : ((this.widthRatio = this.largeWidth / newvalue / this.nzWidth),
            (this.newvaluewidth = newvalue),
            (this.fullwidth = !1)));
      scrcontinue = !1;
      "inner" == this.options.zoomType &&
        (this.nzWidth > this.nzHeight &&
          (this.newvaluewidth <= maxwidthtnewvalue
            ? (scrcontinue = !0)
            : ((scrcontinue = !1), (this.fullwidth = this.fullheight = !0))),
        this.nzHeight > this.nzWidth &&
          (this.newvaluewidth <= maxwidthtnewvalue
            ? (scrcontinue = !0)
            : ((scrcontinue = !1), (this.fullwidth = this.fullheight = !0))));
      "inner" != this.options.zoomType && (scrcontinue = !0);
      scrcontinue &&
        ((this.zoomLock = 0),
        (this.changeZoom = !0),
        this.options.zoomWindowHeight / this.heightRatio <= this.nzHeight &&
          ((this.currentZoomLevel = this.newvalueheight),
          "lens" != this.options.zoomType &&
            "inner" != this.options.zoomType &&
            ((this.changeBgSize = !0),
            this.zoomLens.css({
              height:
                String(this.options.zoomWindowHeight / this.heightRatio) + "px",
            })),
          "lens" == this.options.zoomType ||
            "inner" == this.options.zoomType) &&
          (this.changeBgSize = !0),
        this.options.zoomWindowWidth / this.widthRatio <= this.nzWidth &&
          ("inner" != this.options.zoomType &&
            this.newvaluewidth > this.newvalueheight &&
            (this.currentZoomLevel = this.newvaluewidth),
          "lens" != this.options.zoomType &&
            "inner" != this.options.zoomType &&
            ((this.changeBgSize = !0),
            this.zoomLens.css({
              width:
                String(this.options.zoomWindowWidth / this.widthRatio) + "px",
            })),
          "lens" == this.options.zoomType ||
            "inner" == this.options.zoomType) &&
          (this.changeBgSize = !0),
        "inner" == this.options.zoomType &&
          ((this.changeBgSize = !0),
          this.nzWidth > this.nzHeight &&
            (this.currentZoomLevel = this.newvaluewidth),
          this.nzHeight > this.nzWidth &&
            (this.currentZoomLevel = this.newvaluewidth)));
      this.setPosition(this.currentLoc);
    },
    closeAll: function () {
      self.zoomWindow && self.zoomWindow.hide();
      self.zoomLens && self.zoomLens.hide();
      self.zoomTint && self.zoomTint.hide();
    },
    changeState: function (d) {
      "enable" == d && (this.options.zoomEnabled = !0);
      "disable" == d && (this.options.zoomEnabled = !1);
    },
  };
  f.fn.elevateZoom = function (d) {
    return this.each(function () {
      var g = Object.create(c);
      g.init(d, this);
      f.data(this, "elevateZoom", g);
    });
  };
  f.fn.elevateZoom.options = {
    zoomActivation: "hover",
    zoomEnabled: !0,
    preloading: 1,
    zoomLevel: 1,
    scrollZoom: !1,
    scrollZoomIncrement: 0.1,
    minZoomLevel: !1,
    maxZoomLevel: !1,
    easing: !1,
    easingAmount: 12,
    lensSize: 200,
    zoomWindowWidth: 400,
    zoomWindowHeight: 400,
    zoomWindowOffetx: 0,
    zoomWindowOffety: 0,
    zoomWindowPosition: 1,
    zoomWindowBgColour: "#fff",
    lensFadeIn: !1,
    lensFadeOut: !1,
    debug: !1,
    zoomWindowFadeIn: !1,
    zoomWindowFadeOut: !1,
    zoomWindowAlwaysShow: !1,
    zoomTintFadeIn: !1,
    zoomTintFadeOut: !1,
    borderSize: 4,
    showLens: !0,
    borderColour: "#888",
    lensBorderSize: 1,
    lensBorderColour: "#000",
    lensShape: "square",
    zoomType: "window",
    containLensZoom: !1,
    lensColour: "white",
    lensOpacity: 0.4,
    lenszoom: !1,
    tint: !1,
    tintColour: "#333",
    tintOpacity: 0.4,
    gallery: !1,
    galleryActiveClass: "zoomGalleryActive",
    imageCrossfade: !1,
    constrainType: !1,
    constrainSize: !1,
    loadingIcon: !1,
    cursor: "default",
    responsive: !0,
    onComplete: f.noop,
    onZoomedImageLoaded: function () {},
    onImageSwap: f.noop,
    onImageSwapComplete: f.noop,
  };
})(jQuery, window, document);
