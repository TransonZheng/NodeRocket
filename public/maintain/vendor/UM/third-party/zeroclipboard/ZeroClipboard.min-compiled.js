/*!
* ZeroClipboard
* The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
* Copyright (c) 2014 Jon Rohan, James M. Greene
* Licensed MIT
* http://zeroclipboard.org/
* v2.0.0-beta.5
*/
!function (a) {
  "use strict";
  var b,
      c = { bridge: null, version: "0.0.0", pluginType: "unknown", disabled: null, outdated: null, unavailable: null, deactivated: null, overdue: null, ready: null },
      d = {},
      e = null,
      f = 0,
      g = {},
      h = 0,
      i = {},
      j = function () {
    var a,
        b,
        c,
        d,
        e = "ZeroClipboard.swf";if (!document.currentScript || !(d = document.currentScript.src)) {
      var f = document.getElementsByTagName("script");if ("readyState" in f[0]) for (a = f.length; a-- && ("interactive" !== f[a].readyState || !(d = f[a].src)););else if ("loading" === document.readyState) d = f[f.length - 1].src;else {
        for (a = f.length; a--;) {
          if (c = f[a].src, !c) {
            b = null;break;
          }if (c = c.split("#")[0].split("?")[0], c = c.slice(0, c.lastIndexOf("/") + 1), null == b) b = c;else if (b !== c) {
            b = null;break;
          }
        }null !== b && (d = b);
      }
    }return d && (d = d.split("#")[0].split("?")[0], e = d.slice(0, d.lastIndexOf("/") + 1) + e), e;
  }(),
      k = function () {
    var a = /\-([a-z])/g,
        b = function (a, b) {
      return b.toUpperCase();
    };return function (c) {
      return c.replace(a, b);
    };
  }(),
      l = function (b, c) {
    var d, e, f;return a.getComputedStyle ? d = a.getComputedStyle(b, null).getPropertyValue(c) : (e = k(c), d = b.currentStyle ? b.currentStyle[e] : b.style[e]), "cursor" !== c || d && "auto" !== d || (f = b.tagName.toLowerCase(), "a" !== f) ? d : "pointer";
  },
      m = function (b) {
    b || (b = a.event);var c;this !== a ? c = this : b.target ? c = b.target : b.srcElement && (c = b.srcElement), L.activate(c);
  },
      n = function (a, b, c) {
    a && 1 === a.nodeType && (a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c));
  },
      o = function (a, b, c) {
    a && 1 === a.nodeType && (a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c));
  },
      p = function (a, b) {
    if (!a || 1 !== a.nodeType) return a;if (a.classList) return a.classList.contains(b) || a.classList.add(b), a;if (b && "string" == typeof b) {
      var c = (b || "").split(/\s+/);if (1 === a.nodeType) if (a.className) {
        for (var d = " " + a.className + " ", e = a.className, f = 0, g = c.length; g > f; f++) d.indexOf(" " + c[f] + " ") < 0 && (e += " " + c[f]);a.className = e.replace(/^\s+|\s+$/g, "");
      } else a.className = b;
    }return a;
  },
      q = function (a, b) {
    if (!a || 1 !== a.nodeType) return a;if (a.classList) return a.classList.contains(b) && a.classList.remove(b), a;if (b && "string" == typeof b || void 0 === b) {
      var c = (b || "").split(/\s+/);if (1 === a.nodeType && a.className) if (b) {
        for (var d = (" " + a.className + " ").replace(/[\n\t]/g, " "), e = 0, f = c.length; f > e; e++) d = d.replace(" " + c[e] + " ", " ");a.className = d.replace(/^\s+|\s+$/g, "");
      } else a.className = "";
    }return a;
  },
      r = function () {
    var a,
        b,
        c,
        d = 1;return "function" == typeof document.body.getBoundingClientRect && (a = document.body.getBoundingClientRect(), b = a.right - a.left, c = document.body.offsetWidth, d = Math.round(b / c * 100) / 100), d;
  },
      s = function (b, c) {
    var d = { left: 0, top: 0, width: 0, height: 0, zIndex: y(c) - 1 };if (b.getBoundingClientRect) {
      var e,
          f,
          g,
          h = b.getBoundingClientRect();"pageXOffset" in a && "pageYOffset" in a ? (e = a.pageXOffset, f = a.pageYOffset) : (g = r(), e = Math.round(document.documentElement.scrollLeft / g), f = Math.round(document.documentElement.scrollTop / g));var i = document.documentElement.clientLeft || 0,
          j = document.documentElement.clientTop || 0;d.left = h.left + e - i, d.top = h.top + f - j, d.width = "width" in h ? h.width : h.right - h.left, d.height = "height" in h ? h.height : h.bottom - h.top;
    }return d;
  },
      t = function (a, b) {
    var c = null == b || b && b.cacheBust === !0;return c ? (-1 === a.indexOf("?") ? "?" : "&") + "noCache=" + new Date().getTime() : "";
  },
      u = function (b) {
    var c,
        d,
        e,
        f,
        g = "",
        h = [];if (b.trustedDomains && ("string" == typeof b.trustedDomains ? f = [b.trustedDomains] : "object" == typeof b.trustedDomains && "length" in b.trustedDomains && (f = b.trustedDomains)), f && f.length) for (c = 0, d = f.length; d > c; c++) if (f.hasOwnProperty(c) && f[c] && "string" == typeof f[c]) {
      if (e = A(f[c]), !e) continue;if ("*" === e) {
        h = [e];break;
      }h.push.apply(h, [e, "//" + e, a.location.protocol + "//" + e]);
    }return h.length && (g += "trustedOrigins=" + encodeURIComponent(h.join(","))), b.forceEnhancedClipboard === !0 && (g += (g ? "&" : "") + "forceEnhancedClipboard=true"), g;
  },
      v = function (a, b, c) {
    if ("function" == typeof b.indexOf) return b.indexOf(a, c);var d,
        e = b.length;for ("undefined" == typeof c ? c = 0 : 0 > c && (c = e + c), d = c; e > d; d++) if (b.hasOwnProperty(d) && b[d] === a) return d;return -1;
  },
      w = function (a) {
    if ("string" == typeof a) throw new TypeError("ZeroClipboard doesn't accept query strings.");return "number" != typeof a.length ? [a] : a;
  },
      x = function (b, c, d, e) {
    e ? a.setTimeout(function () {
      b.apply(c, d);
    }, 0) : b.apply(c, d);
  },
      y = function (a) {
    var b, c;return a && ("number" == typeof a && a > 0 ? b = a : "string" == typeof a && (c = parseInt(a, 10)) && !isNaN(c) && c > 0 && (b = c)), b || ("number" == typeof O.zIndex && O.zIndex > 0 ? b = O.zIndex : "string" == typeof O.zIndex && (c = parseInt(O.zIndex, 10)) && !isNaN(c) && c > 0 && (b = c)), b || 0;
  },
      z = function () {
    var a,
        b,
        c,
        d,
        e,
        f,
        g = arguments[0] || {};for (a = 1, b = arguments.length; b > a; a++) if (null != (c = arguments[a])) for (d in c) if (c.hasOwnProperty(d)) {
      if (e = g[d], f = c[d], g === f) continue;void 0 !== f && (g[d] = f);
    }return g;
  },
      A = function (a) {
    if (null == a || "" === a) return null;if (a = a.replace(/^\s+|\s+$/g, ""), "" === a) return null;var b = a.indexOf("//");a = -1 === b ? a : a.slice(b + 2);var c = a.indexOf("/");return a = -1 === c ? a : -1 === b || 0 === c ? null : a.slice(0, c), a && ".swf" === a.slice(-4).toLowerCase() ? null : a || null;
  },
      B = function () {
    var a = function (a, b) {
      var c, d, e;if (null != a && "*" !== b[0] && ("string" == typeof a && (a = [a]), "object" == typeof a && "number" == typeof a.length)) for (c = 0, d = a.length; d > c; c++) if (a.hasOwnProperty(c) && (e = A(a[c]))) {
        if ("*" === e) {
          b.length = 0, b.push("*");break;
        }-1 === v(e, b) && b.push(e);
      }
    };return function (b, c) {
      var d = A(c.swfPath);null === d && (d = b);var e = [];a(c.trustedOrigins, e), a(c.trustedDomains, e);var f = e.length;if (f > 0) {
        if (1 === f && "*" === e[0]) return "always";if (-1 !== v(b, e)) return 1 === f && b === d ? "sameDomain" : "always";
      }return "never";
    };
  }(),
      C = function (a) {
    if (null == a) return [];if (Object.keys) return Object.keys(a);var b = [];for (var c in a) a.hasOwnProperty(c) && b.push(c);return b;
  },
      D = function (a) {
    if (a) for (var b in a) a.hasOwnProperty(b) && delete a[b];return a;
  },
      E = function () {
    try {
      return document.activeElement;
    } catch (a) {}return null;
  },
      F = function (a, b) {
    for (var c = {}, d = 0, e = b.length; e > d; d++) b[d] in a && (c[b[d]] = a[b[d]]);return c;
  },
      G = function (a, b) {
    var c = {};for (var d in a) -1 === v(d, b) && (c[d] = a[d]);return c;
  },
      H = function (a) {
    var b = {},
        c = {};if ("object" == typeof a && a) {
      for (var d in a) if (d && a.hasOwnProperty(d) && "string" == typeof a[d] && a[d]) switch (d.toLowerCase()) {case "text/plain":case "text":case "air:text":case "flash:text":
          b.text = a[d], c.text = d;break;case "text/html":case "html":case "air:html":case "flash:html":
          b.html = a[d], c.html = d;break;case "application/rtf":case "text/rtf":case "rtf":case "richtext":case "air:rtf":case "flash:rtf":
          b.rtf = a[d], c.rtf = d;}return { data: b, formatMap: c };
    }
  },
      I = function (a, b) {
    if ("object" != typeof a || !a || "object" != typeof b || !b) return a;var c = {};for (var d in a) if (a.hasOwnProperty(d)) {
      if ("success" !== d && "data" !== d) {
        c[d] = a[d];continue;
      }c[d] = {};var e = a[d];for (var f in e) f && e.hasOwnProperty(f) && b.hasOwnProperty(f) && (c[d][b[f]] = e[f]);
    }return c;
  },
      J = function (a) {
    return function (b) {
      return a.call(b, 0);
    };
  }(a.Array.prototype.slice),
      K = function () {
    function a(a) {
      var b = a.match(/[\d]+/g);return b.length = 3, b.join(".");
    }function b(a) {
      return !!a && (a = a.toLowerCase()) && (/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(a) || "chrome.plugin" === a.slice(-13));
    }function d(c) {
      c && (h = !0, c.version && (k = a(c.version)), !k && c.description && (k = a(c.description)), c.filename && (j = b(c.filename)));
    }var e,
        f,
        g,
        h = !1,
        i = !1,
        j = !1,
        k = "";if (navigator.plugins && navigator.plugins.length) e = navigator.plugins["Shockwave Flash"], d(e), navigator.plugins["Shockwave Flash 2.0"] && (h = !0, k = "2.0.0.11");else if (navigator.mimeTypes && navigator.mimeTypes.length) g = navigator.mimeTypes["application/x-shockwave-flash"], e = g && g.enabledPlugin, d(e);else if ("undefined" != typeof ActiveXObject) {
      i = !0;try {
        f = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), h = !0, k = a(f.GetVariable("$version"));
      } catch (l) {
        try {
          f = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), h = !0, k = "6.0.21";
        } catch (m) {
          try {
            f = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), h = !0, k = a(f.GetVariable("$version"));
          } catch (n) {
            i = !1;
          }
        }
      }
    }c.disabled = h !== !0, c.outdated = k && parseFloat(k) < 11, c.version = k || "0.0.0", c.pluginType = j ? "pepper" : i ? "activex" : h ? "netscape" : "unknown";
  };K();var L = function (a) {
    if (!(this instanceof L)) return new L(a);if (this.id = "" + f++, g[this.id] = { instance: this, elements: [], handlers: {} }, a && this.clip(a), "boolean" != typeof c.ready && (c.ready = !1), !L.isFlashUnusable() && null === c.bridge) {
      var b = this,
          d = O.flashLoadTimeout;"number" == typeof d && d >= 0 && setTimeout(function () {
        "boolean" != typeof c.deactivated && (c.deactivated = !0), c.deactivated === !0 && L.emit({ type: "error", name: "flash-deactivated", client: b });
      }, d), c.overdue = !1, P();
    }
  };L.prototype.setText = function (a) {
    return L.setData("text/plain", a), this;
  }, L.prototype.setHtml = function (a) {
    return L.setData("text/html", a), this;
  }, L.prototype.setRichText = function (a) {
    return L.setData("application/rtf", a), this;
  }, L.prototype.setData = function () {
    return L.setData.apply(L, J(arguments)), this;
  }, L.prototype.clearData = function () {
    return L.clearData.apply(L, J(arguments)), this;
  }, L.prototype.setSize = function (a, b) {
    return T(a, b), this;
  };var M = function (a) {
    c.ready === !0 && c.bridge && "function" == typeof c.bridge.setHandCursor ? c.bridge.setHandCursor(a) : c.ready = !1;
  };L.prototype.destroy = function () {
    this.unclip(), this.off(), delete g[this.id];
  };var N = function () {
    var a,
        b,
        c,
        d = [],
        e = C(g);for (a = 0, b = e.length; b > a; a++) c = g[e[a]].instance, c && c instanceof L && d.push(c);return d;
  };L.version = "2.0.0-beta.5";var O = { swfPath: j, trustedDomains: a.location.host ? [a.location.host] : [], cacheBust: !0, forceHandCursor: !1, forceEnhancedClipboard: !1, zIndex: 999999999, debug: !1, title: null, autoActivate: !0, flashLoadTimeout: 3e4 };L.isFlashUnusable = function () {
    return !!(c.disabled || c.outdated || c.unavailable || c.deactivated);
  }, L.config = function (a) {
    "object" == typeof a && null !== a && z(O, a);{
      if ("string" != typeof a || !a) {
        var b = {};for (var c in O) O.hasOwnProperty(c) && (b[c] = "object" == typeof O[c] && null !== O[c] ? "length" in O[c] ? O[c].slice(0) : z({}, O[c]) : O[c]);return b;
      }if (O.hasOwnProperty(a)) return O[a];
    }
  }, L.destroy = function () {
    L.deactivate();for (var a in g) if (g.hasOwnProperty(a) && g[a]) {
      var b = g[a].instance;b && "function" == typeof b.destroy && b.destroy();
    }var d = c.bridge;if (d) {
      var e = R(d);e && ("activex" === c.pluginType && "readyState" in d ? (d.style.display = "none", function f() {
        if (4 === d.readyState) {
          for (var a in d) "function" == typeof d[a] && (d[a] = null);d.parentNode.removeChild(d), e.parentNode && e.parentNode.removeChild(e);
        } else setTimeout(f, 10);
      }()) : (d.parentNode.removeChild(d), e.parentNode && e.parentNode.removeChild(e))), c.ready = null, c.bridge = null, c.deactivated = null;
    }L.clearData();
  }, L.activate = function (a) {
    b && (q(b, O.hoverClass), q(b, O.activeClass)), b = a, p(a, O.hoverClass), S();var d = O.title || a.getAttribute("title");if (d) {
      var e = R(c.bridge);e && e.setAttribute("title", d);
    }var f = O.forceHandCursor === !0 || "pointer" === l(a, "cursor");M(f);
  }, L.deactivate = function () {
    var a = R(c.bridge);a && (a.removeAttribute("title"), a.style.left = "0px", a.style.top = "-9999px", T(1, 1)), b && (q(b, O.hoverClass), q(b, O.activeClass), b = null);
  }, L.state = function () {
    return { browser: F(a.navigator, ["userAgent", "platform", "appName"]), flash: G(c, ["bridge"]), zeroclipboard: { version: L.version, config: L.config() } };
  }, L.setData = function (a, b) {
    var c;if ("object" == typeof a && a && "undefined" == typeof b) c = a, L.clearData();else {
      if ("string" != typeof a || !a) return;c = {}, c[a] = b;
    }for (var e in c) e && c.hasOwnProperty(e) && "string" == typeof c[e] && c[e] && (d[e] = c[e]);
  }, L.clearData = function (a) {
    "undefined" == typeof a ? (D(d), e = null) : "string" == typeof a && d.hasOwnProperty(a) && delete d[a];
  };var P = function () {
    var b,
        d,
        e = document.getElementById("global-zeroclipboard-html-bridge");if (!e) {
      var f = B(a.location.host, O),
          g = "never" === f ? "none" : "all",
          h = u(O),
          i = O.swfPath + t(O.swfPath, O);e = Q();var j = document.createElement("div");e.appendChild(j), document.body.appendChild(e);var k = document.createElement("div"),
          l = "activex" === c.pluginType;k.innerHTML = '<object id="global-zeroclipboard-flash-bridge" name="global-zeroclipboard-flash-bridge" width="100%" height="100%" ' + (l ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' : 'type="application/x-shockwave-flash" data="' + i + '"') + ">" + (l ? '<param name="movie" value="' + i + '"/>' : "") + '<param name="allowScriptAccess" value="' + f + '"/><param name="allowNetworking" value="' + g + '"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="' + h + '"/></object>', b = k.firstChild, k = null, b.ZeroClipboard = L, e.replaceChild(b, j);
    }b || (b = document["global-zeroclipboard-flash-bridge"], b && (d = b.length) && (b = b[d - 1]), b || (b = e.firstChild)), c.bridge = b || null;
  },
      Q = function () {
    var a = document.createElement("div");return a.id = "global-zeroclipboard-html-bridge", a.className = "global-zeroclipboard-container", a.style.position = "absolute", a.style.left = "0px", a.style.top = "-9999px", a.style.width = "1px", a.style.height = "1px", a.style.zIndex = "" + y(O.zIndex), a;
  },
      R = function (a) {
    for (var b = a && a.parentNode; b && "OBJECT" === b.nodeName && b.parentNode;) b = b.parentNode;return b || null;
  },
      S = function () {
    if (b) {
      var a = s(b, O.zIndex),
          d = R(c.bridge);d && (d.style.top = a.top + "px", d.style.left = a.left + "px", d.style.width = a.width + "px", d.style.height = a.height + "px", d.style.zIndex = a.zIndex + 1), T(a.width, a.height);
    }
  },
      T = function (a, b) {
    var d = R(c.bridge);d && (d.style.width = a + "px", d.style.height = b + "px");
  };L.emit = function (b) {
    var f, g, h, i, j, k, l, m, n;if ("string" == typeof b && b && (f = b), "object" == typeof b && b && "string" == typeof b.type && b.type && (f = b.type, g = b), f) {
      if (b = W(f, g), Y(b), "ready" === b.type && c.overdue === !0) return L.emit({ type: "error", name: "flash-overdue" });if (h = !/^(before)?copy$/.test(b.type), b.client) U.call(b.client, b, h);else for (i = b.target && b.target !== a && O.autoActivate === !0 ? Z(b.target) : N(), j = 0, k = i.length; k > j; j++) l = z({}, b, { client: i[j] }), U.call(i[j], l, h);return "copy" === b.type && (n = H(d), m = n.data, e = n.formatMap), m;
    }
  };var U = function (b, c) {
    var d = g[this.id] && g[this.id].handlers[b.type];if (d && d.length) {
      var e,
          f,
          h,
          i,
          j = this;for (e = 0, f = d.length; f > e; e++) h = d[e], i = j, "string" == typeof h && "function" == typeof a[h] && (h = a[h]), "object" == typeof h && h && "function" == typeof h.handleEvent && (i = h, h = h.handleEvent), "function" == typeof h && x(h, i, [b], c);
    }return this;
  },
      V = { ready: "Flash communication is established", error: { "flash-disabled": "Flash is disabled or not installed", "flash-outdated": "Flash is too outdated to support ZeroClipboard", "flash-unavailable": "Flash is unable to communicate bidirectionally with JavaScript", "flash-deactivated": "Flash is too outdated for your browser and/or is configured as click-to-activate", "flash-overdue": "Flash communication was established but NOT within the acceptable time limit" } },
      W = function (a, d) {
    if (a || d && d.type) {
      d = d || {}, a = (a || d.type).toLowerCase(), z(d, { type: a, target: d.target || b || null, relatedTarget: d.relatedTarget || null, currentTarget: c && c.bridge || null });var f = V[d.type];return "error" === d.type && d.name && f && (f = f[d.name]), f && (d.message = f), "ready" === d.type && z(d, { target: null, version: c.version }), "error" === d.type && (d.target = null, /^flash-(outdated|unavailable|deactivated|overdue)$/.test(d.name) && z(d, { version: c.version, minimumVersion: "11.0.0" })), "copy" === d.type && (d.clipboardData = { setData: L.setData, clearData: L.clearData }), "aftercopy" === d.type && (d = I(d, e)), d.target && !d.relatedTarget && (d.relatedTarget = X(d.target)), d;
    }
  },
      X = function (a) {
    var b = a && a.getAttribute && a.getAttribute("data-clipboard-target");return b ? document.getElementById(b) : null;
  },
      Y = function (a) {
    var e = a.target || b;switch (a.type) {case "error":
        v(a.name, ["flash-disabled", "flash-outdated", "flash-deactivated", "flash-overdue"]) && z(c, { disabled: "flash-disabled" === a.name, outdated: "flash-outdated" === a.name, unavailable: "flash-unavailable" === a.name, deactivated: "flash-deactivated" === a.name, overdue: "flash-overdue" === a.name, ready: !1 });break;case "ready":
        var f = c.deactivated === !0;z(c, { disabled: !1, outdated: !1, unavailable: !1, deactivated: !1, overdue: f, ready: !f });break;case "copy":
        var g,
            h,
            i = a.relatedTarget;!d["text/html"] && !d["text/plain"] && i && (h = i.value || i.outerHTML || i.innerHTML) && (g = i.value || i.textContent || i.innerText) ? (a.clipboardData.clearData(), a.clipboardData.setData("text/plain", g), h !== g && a.clipboardData.setData("text/html", h)) : !d["text/plain"] && a.target && (g = a.target.getAttribute("data-clipboard-text")) && (a.clipboardData.clearData(), a.clipboardData.setData("text/plain", g));break;case "aftercopy":
        L.clearData(), e && e !== E() && e.focus && e.focus();break;case "mouseover":
        p(e, O.hoverClass);break;case "mouseout":
        O.autoActivate === !0 && L.deactivate();break;case "mousedown":
        p(e, O.activeClass);break;case "mouseup":
        q(e, O.activeClass);}
  };L.prototype.on = function (a, b) {
    var d,
        e,
        f,
        h = {},
        i = g[this.id] && g[this.id].handlers;if ("string" == typeof a && a) f = a.toLowerCase().split(/\s+/);else if ("object" == typeof a && a && "undefined" == typeof b) for (d in a) a.hasOwnProperty(d) && "string" == typeof d && d && "function" == typeof a[d] && this.on(d, a[d]);if (f && f.length) {
      for (d = 0, e = f.length; e > d; d++) a = f[d].replace(/^on/, ""), h[a] = !0, i[a] || (i[a] = []), i[a].push(b);if (h.ready && c.ready && L.emit({ type: "ready", client: this }), h.error) {
        var j = ["disabled", "outdated", "unavailable", "deactivated", "overdue"];for (d = 0, e = j.length; e > d; d++) if (c[j[d]]) {
          L.emit({ type: "error", name: "flash-" + j[d], client: this });break;
        }
      }
    }return this;
  }, L.prototype.off = function (a, b) {
    var c,
        d,
        e,
        f,
        h,
        i = g[this.id] && g[this.id].handlers;if (0 === arguments.length) f = C(i);else if ("string" == typeof a && a) f = a.split(/\s+/);else if ("object" == typeof a && a && "undefined" == typeof b) for (c in a) a.hasOwnProperty(c) && "string" == typeof c && c && "function" == typeof a[c] && this.off(c, a[c]);if (f && f.length) for (c = 0, d = f.length; d > c; c++) if (a = f[c].toLowerCase().replace(/^on/, ""), h = i[a], h && h.length) if (b) for (e = v(b, h); -1 !== e;) h.splice(e, 1), e = v(b, h, e);else i[a].length = 0;return this;
  }, L.prototype.handlers = function (a) {
    var b,
        c = null,
        d = g[this.id] && g[this.id].handlers;if (d) {
      if ("string" == typeof a && a) return d[a] ? d[a].slice(0) : null;c = {};for (b in d) d.hasOwnProperty(b) && d[b] && (c[b] = d[b].slice(0));
    }return c;
  }, L.prototype.clip = function (a) {
    a = w(a);for (var b = 0; b < a.length; b++) if (a.hasOwnProperty(b) && a[b] && 1 === a[b].nodeType) {
      a[b].zcClippingId ? -1 === v(this.id, i[a[b].zcClippingId]) && i[a[b].zcClippingId].push(this.id) : (a[b].zcClippingId = "zcClippingId_" + h++, i[a[b].zcClippingId] = [this.id], O.autoActivate === !0 && n(a[b], "mouseover", m));var c = g[this.id].elements;-1 === v(a[b], c) && c.push(a[b]);
    }return this;
  }, L.prototype.unclip = function (a) {
    var b = g[this.id];if (!b) return this;var c,
        d = b.elements;a = "undefined" == typeof a ? d.slice(0) : w(a);for (var e = a.length; e--;) if (a.hasOwnProperty(e) && a[e] && 1 === a[e].nodeType) {
      for (c = 0; -1 !== (c = v(a[e], d, c));) d.splice(c, 1);var f = i[a[e].zcClippingId];if (f) {
        for (c = 0; -1 !== (c = v(this.id, f, c));) f.splice(c, 1);0 === f.length && (O.autoActivate === !0 && o(a[e], "mouseover", m), delete a[e].zcClippingId);
      }
    }return this;
  }, L.prototype.elements = function () {
    var a = g[this.id];return a && a.elements ? a.elements.slice(0) : [];
  };var Z = function (a) {
    var b,
        c,
        d,
        e,
        f,
        h = [];if (a && 1 === a.nodeType && (b = a.zcClippingId) && i.hasOwnProperty(b) && (c = i[b], c && c.length)) for (d = 0, e = c.length; e > d; d++) f = g[c[d]].instance, f && f instanceof L && h.push(f);return h;
  };O.hoverClass = "zeroclipboard-is-hover", O.activeClass = "zeroclipboard-is-active", "function" == typeof define && define.amd ? define(function () {
    return L;
  }) : "object" == typeof module && module && "object" == typeof module.exports && module.exports ? module.exports = L : a.ZeroClipboard = L;
}(function () {
  return this;
}());

//# sourceMappingURL=ZeroClipboard.min-compiled.js.map