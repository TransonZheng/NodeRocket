/*
 * jquery.flot.tooltip
 * 
 * description: easy-to-use tooltips for Flot charts
 * version: 0.7.1
 * author: Krzysztof Urbas @krzysu [myviews.pl]
 * website: https://github.com/krzysu/flot.tooltip
 * 
 * build on 2014-06-22
 * released under MIT License, 2012
*/
Array.prototype.indexOf || (Array.prototype.indexOf = function (t, i) {
  if (void 0 === this || null === this) throw new TypeError('"this" is null or not defined');var e = this.length >>> 0;for (i = +i || 0, 1 / 0 === Math.abs(i) && (i = 0), 0 > i && (i += e, 0 > i && (i = 0)); e > i; i++) if (this[i] === t) return i;return -1;
}), function (t) {
  var i = { tooltip: !1, tooltipOpts: { content: "%s | X: %x | Y: %y", xDateFormat: null, yDateFormat: null, monthNames: null, dayNames: null, shifts: { x: 10, y: 20 }, defaultTheme: !0, onHover: function () {} } },
      e = function (t) {
    this.tipPosition = { x: 0, y: 0 }, this.init(t);
  };e.prototype.init = function (i) {
    function e(t) {
      var i = {};i.x = t.pageX, i.y = t.pageY, o.updateTooltipPosition(i);
    }function s(t, i, e) {
      var s = o.getDomElement();if (e) {
        var a;a = o.stringFormat(o.tooltipOptions.content, e), s.html(a), o.updateTooltipPosition({ x: i.pageX, y: i.pageY }), s.css({ left: o.tipPosition.x + o.tooltipOptions.shifts.x, top: o.tipPosition.y + o.tooltipOptions.shifts.y }).show(), "function" == typeof o.tooltipOptions.onHover && o.tooltipOptions.onHover(e, s);
      } else s.hide().html("");
    }var o = this,
        a = t.plot.plugins.length;if (this.plotPlugins = [], a) for (var n = 0; a > n; n++) this.plotPlugins.push(t.plot.plugins[n].name);i.hooks.bindEvents.push(function (i, a) {
      o.plotOptions = i.getOptions(), o.plotOptions.tooltip !== !1 && void 0 !== o.plotOptions.tooltip && (o.tooltipOptions = o.plotOptions.tooltipOpts, o.getDomElement(), t(i.getPlaceholder()).bind("plothover", s), t(a).bind("mousemove", e));
    }), i.hooks.shutdown.push(function (i, o) {
      t(i.getPlaceholder()).unbind("plothover", s), t(o).unbind("mousemove", e);
    });
  }, e.prototype.getDomElement = function () {
    var i = t("#flotTip");return 0 === i.length && (i = t("<div />").attr("id", "flotTip"), i.appendTo("body").hide().css({ position: "absolute" }), this.tooltipOptions.defaultTheme && i.css({ background: "#fff", "z-index": "1040", padding: "0.4em 0.6em", "border-radius": "0.5em", "font-size": "0.8em", border: "1px solid #111", display: "none", "white-space": "nowrap" })), i;
  }, e.prototype.updateTooltipPosition = function (i) {
    var e = t("#flotTip"),
        s = e.outerWidth() + this.tooltipOptions.shifts.x,
        o = e.outerHeight() + this.tooltipOptions.shifts.y;i.x - t(window).scrollLeft() > t(window).innerWidth() - s && (i.x -= s), i.y - t(window).scrollTop() > t(window).innerHeight() - o && (i.y -= o), this.tipPosition.x = i.x, this.tipPosition.y = i.y;
  }, e.prototype.stringFormat = function (t, i) {
    var e,
        s,
        o,
        a = /%p\.{0,1}(\d{0,})/,
        n = /%s/,
        r = /%lx/,
        p = /%ly/,
        l = /%x\.{0,1}(\d{0,})/,
        d = /%y\.{0,1}(\d{0,})/,
        x = "%x",
        h = "%y",
        u = "%ct";if (i.series.threshold !== void 0 ? (e = i.datapoint[0], s = i.datapoint[1], o = i.datapoint[2]) : i.series.lines !== void 0 && i.series.lines.steps ? (e = i.series.datapoints.points[2 * i.dataIndex], s = i.series.datapoints.points[2 * i.dataIndex + 1], o = "") : (e = i.series.data[i.dataIndex][0], s = i.series.data[i.dataIndex][1], o = i.series.data[i.dataIndex][2]), null === i.series.label && i.series.originSeries && (i.series.label = i.series.originSeries.label), "function" == typeof t && (t = t(i.series.label, e, s, i)), i.series.percent !== void 0 && (t = this.adjustValPrecision(a, t, i.series.percent)), t = i.series.label !== void 0 ? t.replace(n, i.series.label) : t.replace(n, ""), t = this.hasAxisLabel("xaxis", i) ? t.replace(r, i.series.xaxis.options.axisLabel) : t.replace(r, ""), t = this.hasAxisLabel("yaxis", i) ? t.replace(p, i.series.yaxis.options.axisLabel) : t.replace(p, ""), this.isTimeMode("xaxis", i) && this.isXDateFormat(i) && (t = t.replace(l, this.timestampToDate(e, this.tooltipOptions.xDateFormat, i.series.xaxis.options))), this.isTimeMode("yaxis", i) && this.isYDateFormat(i) && (t = t.replace(d, this.timestampToDate(s, this.tooltipOptions.yDateFormat, i.series.yaxis.options))), "number" == typeof e && (t = this.adjustValPrecision(l, t, e)), "number" == typeof s && (t = this.adjustValPrecision(d, t, s)), i.series.xaxis.ticks !== void 0) {
      var c;c = this.hasRotatedXAxisTicks(i) ? "rotatedTicks" : "ticks";var m = i.dataIndex + i.seriesIndex;if (i.series.xaxis[c].length > m && !this.isTimeMode("xaxis", i)) {
        var f = this.isCategoriesMode("xaxis", i) ? i.series.xaxis[c][m].label : i.series.xaxis[c][m].v;f === e && (t = t.replace(l, i.series.xaxis[c][m].label));
      }
    }if (i.series.yaxis.ticks !== void 0) for (var y in i.series.yaxis.ticks) if (i.series.yaxis.ticks.hasOwnProperty(y)) {
      var v = this.isCategoriesMode("yaxis", i) ? i.series.yaxis.ticks[y].label : i.series.yaxis.ticks[y].v;v === s && (t = t.replace(d, i.series.yaxis.ticks[y].label));
    }return i.series.xaxis.tickFormatter !== void 0 && (t = t.replace(x, i.series.xaxis.tickFormatter(e, i.series.xaxis).replace(/\$/g, "$$"))), i.series.yaxis.tickFormatter !== void 0 && (t = t.replace(h, i.series.yaxis.tickFormatter(s, i.series.yaxis).replace(/\$/g, "$$"))), o && (t = t.replace(u, o)), t;
  }, e.prototype.isTimeMode = function (t, i) {
    return i.series[t].options.mode !== void 0 && "time" === i.series[t].options.mode;
  }, e.prototype.isXDateFormat = function () {
    return this.tooltipOptions.xDateFormat !== void 0 && null !== this.tooltipOptions.xDateFormat;
  }, e.prototype.isYDateFormat = function () {
    return this.tooltipOptions.yDateFormat !== void 0 && null !== this.tooltipOptions.yDateFormat;
  }, e.prototype.isCategoriesMode = function (t, i) {
    return i.series[t].options.mode !== void 0 && "categories" === i.series[t].options.mode;
  }, e.prototype.timestampToDate = function (i, e, s) {
    var o = t.plot.dateGenerator(i, s);return t.plot.formatDate(o, e, this.tooltipOptions.monthNames, this.tooltipOptions.dayNames);
  }, e.prototype.adjustValPrecision = function (t, i, e) {
    var s,
        o = i.match(t);return null !== o && "" !== RegExp.$1 && (s = RegExp.$1, e = e.toFixed(s), i = i.replace(t, e)), i;
  }, e.prototype.hasAxisLabel = function (t, i) {
    return -1 !== this.plotPlugins.indexOf("axisLabels") && i.series[t].options.axisLabel !== void 0 && i.series[t].options.axisLabel.length > 0;
  }, e.prototype.hasRotatedXAxisTicks = function (i) {
    return 1 === t.grep(t.plot.plugins, function (t) {
      return "tickRotor" === t.name;
    }).length && i.series.xaxis.rotatedTicks !== void 0;
  };var s = function (t) {
    new e(t);
  };t.plot.plugins.push({ init: s, options: i, name: "tooltip", version: "0.6.7" });
}(jQuery);

//# sourceMappingURL=jquery.flot.tooltip.min-compiled.js.map