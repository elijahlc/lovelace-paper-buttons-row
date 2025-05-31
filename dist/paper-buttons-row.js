var at = Object.defineProperty, lt = Object.defineProperties;
var ct = Object.getOwnPropertyDescriptors;
var ve = Object.getOwnPropertySymbols;
var ut = Object.prototype.hasOwnProperty, dt = Object.prototype.propertyIsEnumerable;
var ye = (r, e, t) => e in r ? at(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, x = (r, e) => {
  for (var t in e || (e = {}))
    ut.call(e, t) && ye(r, t, e[t]);
  if (ve)
    for (var t of ve(e))
      dt.call(e, t) && ye(r, t, e[t]);
  return r;
}, _e = (r, e) => lt(r, ct(e));
var be = (r, e, t) => new Promise((i, s) => {
  var n = (a) => {
    try {
      c(t.next(a));
    } catch (l) {
      s(l);
    }
  }, o = (a) => {
    try {
      c(t.throw(a));
    } catch (l) {
      s(l);
    }
  }, c = (a) => a.done ? i(a.value) : Promise.resolve(a.value).then(n, o);
  c((t = t.apply(r, e)).next());
});
function V() {
  if (document.querySelector("hc-main"))
    return document.querySelector("hc-main").hass;
  if (document.querySelector("home-assistant"))
    return document.querySelector("home-assistant").hass;
}
function ht(r) {
  if (document.querySelector("hc-main"))
    return document.querySelector("hc-main").provideHass(r);
  if (document.querySelector("home-assistant"))
    return document.querySelector("home-assistant").provideHass(r);
}
var ge, $e;
(function(r) {
  r.language = "language", r.system = "system", r.comma_decimal = "comma_decimal", r.decimal_comma = "decimal_comma", r.space_comma = "space_comma", r.none = "none";
})(ge || (ge = {})), function(r) {
  r.language = "language", r.system = "system", r.am_pm = "12", r.twenty_four = "24";
}($e || ($e = {}));
function K(r) {
  return r.substr(0, r.indexOf("."));
}
function pt(r) {
  return r.substr(r.indexOf(".") + 1);
}
var mt = ["closed", "locked", "off"], g = function(r, e, t, i) {
  i = i || {}, t = t == null ? {} : t;
  var s = new Event(e, { bubbles: i.bubbles === void 0 || i.bubbles, cancelable: !!i.cancelable, composed: i.composed === void 0 || i.composed });
  return s.detail = t, r.dispatchEvent(s), s;
}, ft = /* @__PURE__ */ new Set(["call-service", "divider", "section", "weblink", "cast", "select"]), vt = { alert: "toggle", automation: "toggle", climate: "climate", cover: "cover", fan: "toggle", group: "group", input_boolean: "toggle", input_number: "input-number", input_select: "input-select", input_text: "input-text", light: "toggle", lock: "lock", media_player: "media-player", remote: "toggle", scene: "scene", script: "script", sensor: "sensor", timer: "timer", switch: "toggle", vacuum: "toggle", water_heater: "climate", input_datetime: "input-datetime" }, yt = function(r, e) {
  var t = function(a, l) {
    return i("hui-error-card", { type: "error", error: a, config: l });
  }, i = function(a, l) {
    var h = window.document.createElement(a);
    try {
      if (!h.setConfig) return;
      h.setConfig(l);
    } catch (p) {
      return console.error(a, p), t(p.message, l);
    }
    return h;
  };
  if (!r || typeof r != "object") return t("No type defined", r);
  var s = r.type;
  if (s && s.startsWith("custom:")) s = s.substr(7);
  else if (ft.has(s)) s = "hui-" + s + "-row";
  else {
    if (!r.entity) return t("Invalid config given.", r);
    var n = r.entity.split(".", 1)[0];
    s = "hui-" + (vt[n] || "text") + "-entity-row";
  }
  if (customElements.get(s)) return i(s, r);
  var o = t("Custom element doesn't exist: " + r.type + ".", r);
  o.style.display = "None";
  var c = setTimeout(function() {
    o.style.display = "";
  }, 2e3);
  return customElements.whenDefined(r.type).then(function() {
    clearTimeout(c), g(o, "ll-rebuild", {}, o);
  }), o;
}, we = { alert: "mdi:alert", automation: "mdi:playlist-play", calendar: "mdi:calendar", camera: "mdi:video", climate: "mdi:thermostat", configurator: "mdi:settings", conversation: "mdi:text-to-speech", device_tracker: "mdi:account", fan: "mdi:fan", group: "mdi:google-circles-communities", history_graph: "mdi:chart-line", homeassistant: "mdi:home-assistant", homekit: "mdi:home-automation", image_processing: "mdi:image-filter-frames", input_boolean: "mdi:drawing", input_datetime: "mdi:calendar-clock", input_number: "mdi:ray-vertex", input_select: "mdi:format-list-bulleted", input_text: "mdi:textbox", light: "mdi:lightbulb", mailbox: "mdi:mailbox", notify: "mdi:comment-alert", person: "mdi:account", plant: "mdi:flower", proximity: "mdi:apple-safari", remote: "mdi:remote", scene: "mdi:google-pages", script: "mdi:file-document", sensor: "mdi:eye", simple_alarm: "mdi:bell", sun: "mdi:white-balance-sunny", switch: "mdi:flash", timer: "mdi:timer", updater: "mdi:cloud-upload", vacuum: "mdi:robot-vacuum", water_heater: "mdi:thermometer", weblink: "mdi:open-in-new" };
function W(r, e) {
  if (r in we) return we[r];
  switch (r) {
    case "alarm_control_panel":
      switch (e) {
        case "armed_home":
          return "mdi:bell-plus";
        case "armed_night":
          return "mdi:bell-sleep";
        case "disarmed":
          return "mdi:bell-outline";
        case "triggered":
          return "mdi:bell-ring";
        default:
          return "mdi:bell";
      }
    case "binary_sensor":
      return e && e === "off" ? "mdi:radiobox-blank" : "mdi:checkbox-marked-circle";
    case "cover":
      return e === "closed" ? "mdi:window-closed" : "mdi:window-open";
    case "lock":
      return e && e === "unlocked" ? "mdi:lock-open" : "mdi:lock";
    case "media_player":
      return e && e !== "off" && e !== "idle" ? "mdi:cast-connected" : "mdi:cast";
    case "zwave":
      switch (e) {
        case "dead":
          return "mdi:emoticon-dead";
        case "sleeping":
          return "mdi:sleep";
        case "initializing":
          return "mdi:timer-sand";
        default:
          return "mdi:z-wave";
      }
    default:
      return console.warn("Unable to find icon for domain " + r + " (" + e + ")"), "mdi:bookmark";
  }
}
var _ = function(r) {
  g(window, "haptic", r);
}, _t = function(r, e, t) {
  t === void 0 && (t = !1), t ? history.replaceState(null, "", e) : history.pushState(null, "", e), g(window, "location-changed", { replace: t });
}, bt = function(r, e, t) {
  t === void 0 && (t = !0);
  var i, s = K(e), n = s === "group" ? "homeassistant" : s;
  switch (s) {
    case "lock":
      i = t ? "unlock" : "lock";
      break;
    case "cover":
      i = t ? "open_cover" : "close_cover";
      break;
    default:
      i = t ? "turn_on" : "turn_off";
  }
  return r.callService(n, i, { entity_id: e });
}, gt = function(r, e) {
  var t = mt.includes(r.states[e].state);
  return bt(r, e, t);
}, Ae = { humidity: "mdi:water-percent", illuminance: "mdi:brightness-5", temperature: "mdi:thermometer", pressure: "mdi:gauge", power: "mdi:flash", signal_strength: "mdi:wifi" }, Ee = { binary_sensor: function(r, e) {
  var t = r === "off";
  switch (e == null ? void 0 : e.attributes.device_class) {
    case "battery":
      return t ? "mdi:battery" : "mdi:battery-outline";
    case "battery_charging":
      return t ? "mdi:battery" : "mdi:battery-charging";
    case "cold":
      return t ? "mdi:thermometer" : "mdi:snowflake";
    case "connectivity":
      return t ? "mdi:server-network-off" : "mdi:server-network";
    case "door":
      return t ? "mdi:door-closed" : "mdi:door-open";
    case "garage_door":
      return t ? "mdi:garage" : "mdi:garage-open";
    case "power":
      return t ? "mdi:power-plug-off" : "mdi:power-plug";
    case "gas":
    case "problem":
    case "safety":
    case "tamper":
      return t ? "mdi:check-circle" : "mdi:alert-circle";
    case "smoke":
      return t ? "mdi:check-circle" : "mdi:smoke";
    case "heat":
      return t ? "mdi:thermometer" : "mdi:fire";
    case "light":
      return t ? "mdi:brightness-5" : "mdi:brightness-7";
    case "lock":
      return t ? "mdi:lock" : "mdi:lock-open";
    case "moisture":
      return t ? "mdi:water-off" : "mdi:water";
    case "motion":
      return t ? "mdi:walk" : "mdi:run";
    case "occupancy":
      return t ? "mdi:home-outline" : "mdi:home";
    case "opening":
      return t ? "mdi:square" : "mdi:square-outline";
    case "plug":
      return t ? "mdi:power-plug-off" : "mdi:power-plug";
    case "presence":
      return t ? "mdi:home-outline" : "mdi:home";
    case "running":
      return t ? "mdi:stop" : "mdi:play";
    case "sound":
      return t ? "mdi:music-note-off" : "mdi:music-note";
    case "update":
      return t ? "mdi:package" : "mdi:package-up";
    case "vibration":
      return t ? "mdi:crop-portrait" : "mdi:vibrate";
    case "window":
      return t ? "mdi:window-closed" : "mdi:window-open";
    default:
      return t ? "mdi:radiobox-blank" : "mdi:checkbox-marked-circle";
  }
}, cover: function(r) {
  var e = r.state !== "closed";
  switch (r.attributes.device_class) {
    case "garage":
      return e ? "mdi:garage-open" : "mdi:garage";
    case "door":
      return e ? "mdi:door-open" : "mdi:door-closed";
    case "shutter":
      return e ? "mdi:window-shutter-open" : "mdi:window-shutter";
    case "blind":
      return e ? "mdi:blinds-open" : "mdi:blinds";
    case "window":
      return e ? "mdi:window-open" : "mdi:window-closed";
    default:
      return W("cover", r.state);
  }
}, sensor: function(r) {
  var e = r.attributes.device_class;
  if (e && e in Ae) return Ae[e];
  if (e === "battery") {
    var t = Number(r.state);
    if (isNaN(t)) return "mdi:battery-unknown";
    var i = 10 * Math.round(t / 10);
    return i >= 100 ? "mdi:battery" : i <= 0 ? "mdi:battery-alert" : "hass:battery-" + i;
  }
  var s = r.attributes.unit_of_measurement;
  return s === "°C" || s === "°F" ? "mdi:thermometer" : W("sensor");
}, input_datetime: function(r) {
  return r.attributes.has_date ? r.attributes.has_time ? W("input_datetime") : "mdi:calendar" : "mdi:clock";
} }, $t = function(r) {
  if (!r) return "mdi:bookmark";
  if (r.attributes.icon) return r.attributes.icon;
  var e = K(r.entity_id);
  return e in Ee ? Ee[e](r) : W(e, r.state);
};
function wt(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Q, Se;
function At() {
  if (Se) return Q;
  Se = 1;
  var r = function(d) {
    return e(d) && !t(d);
  };
  function e(u) {
    return !!u && typeof u == "object";
  }
  function t(u) {
    var d = Object.prototype.toString.call(u);
    return d === "[object RegExp]" || d === "[object Date]" || n(u);
  }
  var i = typeof Symbol == "function" && Symbol.for, s = i ? Symbol.for("react.element") : 60103;
  function n(u) {
    return u.$$typeof === s;
  }
  function o(u) {
    return Array.isArray(u) ? [] : {};
  }
  function c(u, d) {
    return d.clone !== !1 && d.isMergeableObject(u) ? $(o(u), u, d) : u;
  }
  function a(u, d, m) {
    return u.concat(d).map(function(w) {
      return c(w, m);
    });
  }
  function l(u, d) {
    if (!d.customMerge)
      return $;
    var m = d.customMerge(u);
    return typeof m == "function" ? m : $;
  }
  function h(u) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(u).filter(function(d) {
      return Object.propertyIsEnumerable.call(u, d);
    }) : [];
  }
  function p(u) {
    return Object.keys(u).concat(h(u));
  }
  function f(u, d) {
    try {
      return d in u;
    } catch (m) {
      return !1;
    }
  }
  function b(u, d) {
    return f(u, d) && !(Object.hasOwnProperty.call(u, d) && Object.propertyIsEnumerable.call(u, d));
  }
  function X(u, d, m) {
    var w = {};
    return m.isMergeableObject(u) && p(u).forEach(function(y) {
      w[y] = c(u[y], m);
    }), p(d).forEach(function(y) {
      b(u, y) || (f(u, y) && m.isMergeableObject(d[y]) ? w[y] = l(y, m)(u[y], d[y], m) : w[y] = c(d[y], m));
    }), w;
  }
  function $(u, d, m) {
    m = m || {}, m.arrayMerge = m.arrayMerge || a, m.isMergeableObject = m.isMergeableObject || r, m.cloneUnlessOtherwiseSpecified = c;
    var w = Array.isArray(d), y = Array.isArray(u), ot = w === y;
    return ot ? w ? m.arrayMerge(u, d, m) : X(u, d, m) : c(d, m);
  }
  $.all = function(d, m) {
    if (!Array.isArray(d))
      throw new Error("first argument should be an array");
    return d.reduce(function(w, y) {
      return $(w, y, m);
    }, {});
  };
  var nt = $;
  return Q = nt, Q;
}
var Et = At();
const ue = /* @__PURE__ */ wt(Et);
const Z = window, me = Z.ShadowRoot && (Z.ShadyCSS === void 0 || Z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, qe = Symbol(), xe = /* @__PURE__ */ new WeakMap();
let St = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== qe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (me && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = xe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && xe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ve = (r) => new St(typeof r == "string" ? r : r + "", void 0, qe), xt = (r, e) => {
  me ? r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet) : e.forEach((t) => {
    const i = document.createElement("style"), s = Z.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, r.appendChild(i);
  });
}, ke = me ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Ve(t);
})(r) : r;
var ee;
const J = window, Te = J.trustedTypes, kt = Te ? Te.emptyScript : "", Oe = J.reactiveElementPolyfillSupport, de = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? kt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch (i) {
        t = null;
      }
  }
  return t;
} }, We = (r, e) => e !== r && (e == e || r == r), te = { attribute: !0, type: String, converter: de, reflect: !1, hasChanged: We }, he = "finalized";
let R = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this._$Eu();
  }
  static addInitializer(e) {
    var t;
    this.finalize(), ((t = this.h) !== null && t !== void 0 ? t : this.h = []).push(e);
  }
  static get observedAttributes() {
    this.finalize();
    const e = [];
    return this.elementProperties.forEach((t, i) => {
      const s = this._$Ep(i, t);
      s !== void 0 && (this._$Ev.set(s, i), e.push(s));
    }), e;
  }
  static createProperty(e, t = te) {
    if (t.state && (t.attribute = !1), this.finalize(), this.elementProperties.set(e, t), !t.noAccessor && !this.prototype.hasOwnProperty(e)) {
      const i = typeof e == "symbol" ? Symbol() : "__" + e, s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Object.defineProperty(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    return { get() {
      return this[t];
    }, set(s) {
      const n = this[e];
      this[t] = s, this.requestUpdate(e, n, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || te;
  }
  static finalize() {
    if (this.hasOwnProperty(he)) return !1;
    this[he] = !0;
    const e = Object.getPrototypeOf(this);
    if (e.finalize(), e.h !== void 0 && (this.h = [...e.h]), this.elementProperties = new Map(e.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties, i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) t.unshift(ke(s));
    } else e !== void 0 && t.push(ke(e));
    return t;
  }
  static _$Ep(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  _$Eu() {
    var e;
    this._$E_ = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (e = this.constructor.h) === null || e === void 0 || e.forEach((t) => t(this));
  }
  addController(e) {
    var t, i;
    ((t = this._$ES) !== null && t !== void 0 ? t : this._$ES = []).push(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) === null || i === void 0 || i.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.splice(this._$ES.indexOf(e) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((e, t) => {
      this.hasOwnProperty(t) && (this._$Ei.set(t, this[t]), delete this[t]);
    });
  }
  createRenderRoot() {
    var e;
    const t = (e = this.shadowRoot) !== null && e !== void 0 ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return xt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var e;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) === null || i === void 0 ? void 0 : i.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) === null || i === void 0 ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$EO(e, t, i = te) {
    var s;
    const n = this.constructor._$Ep(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (((s = i.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? i.converter : de).toAttribute(t, i.type);
      this._$El = e, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$El = null;
    }
  }
  _$AK(e, t) {
    var i;
    const s = this.constructor, n = s._$Ev.get(e);
    if (n !== void 0 && this._$El !== n) {
      const o = s.getPropertyOptions(n), c = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((i = o.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? o.converter : de;
      this._$El = n, this[n] = c.fromAttribute(t, o.type), this._$El = null;
    }
  }
  requestUpdate(e, t, i) {
    let s = !0;
    e !== void 0 && (((i = i || this.constructor.getPropertyOptions(e)).hasChanged || We)(this[e], t) ? (this._$AL.has(e) || this._$AL.set(e, t), i.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, i))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  _$Ej() {
    return be(this, null, function* () {
      this.isUpdatePending = !0;
      try {
        yield this._$E_;
      } catch (t) {
        Promise.reject(t);
      }
      const e = this.scheduleUpdate();
      return e != null && (yield e), !this.isUpdatePending;
    });
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, n) => this[n] = s), this._$Ei = void 0);
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (e = this._$ES) === null || e === void 0 || e.forEach((s) => {
        var n;
        return (n = s.hostUpdate) === null || n === void 0 ? void 0 : n.call(s);
      }), this.update(i)) : this._$Ek();
    } catch (s) {
      throw t = !1, this._$Ek(), s;
    }
    t && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((i) => {
      var s;
      return (s = i.hostUpdated) === null || s === void 0 ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$EC !== void 0 && (this._$EC.forEach((t, i) => this._$EO(i, this[i], t)), this._$EC = void 0), this._$Ek();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
R[he] = !0, R.elementProperties = /* @__PURE__ */ new Map(), R.elementStyles = [], R.shadowRootOptions = { mode: "open" }, Oe == null || Oe({ ReactiveElement: R }), ((ee = J.reactiveElementVersions) !== null && ee !== void 0 ? ee : J.reactiveElementVersions = []).push("1.6.3");
var re;
const Y = window, N = Y.trustedTypes, He = N ? N.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, pe = "$lit$", E = `lit$${(Math.random() + "").slice(9)}$`, Ze = "?" + E, Tt = `<${Ze}>`, H = document, I = () => H.createComment(""), C = (r) => r === null || typeof r != "object" && typeof r != "function", Fe = Array.isArray, Ot = (r) => Fe(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", ie = `[ 	
\f\r]`, L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pe = /-->/g, Re = />/g, k = RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Me = /'/g, Ne = /"/g, Ke = /^(?:script|style|textarea|title)$/i, Ht = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), A = Ht(1), S = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), Ue = /* @__PURE__ */ new WeakMap(), O = H.createTreeWalker(H, 129, null, !1);
function Je(r, e) {
  if (!Array.isArray(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return He !== void 0 ? He.createHTML(e) : e;
}
const Pt = (r, e) => {
  const t = r.length - 1, i = [];
  let s, n = e === 2 ? "<svg>" : "", o = L;
  for (let c = 0; c < t; c++) {
    const a = r[c];
    let l, h, p = -1, f = 0;
    for (; f < a.length && (o.lastIndex = f, h = o.exec(a), h !== null); ) f = o.lastIndex, o === L ? h[1] === "!--" ? o = Pe : h[1] !== void 0 ? o = Re : h[2] !== void 0 ? (Ke.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = k) : h[3] !== void 0 && (o = k) : o === k ? h[0] === ">" ? (o = s != null ? s : L, p = -1) : h[1] === void 0 ? p = -2 : (p = o.lastIndex - h[2].length, l = h[1], o = h[3] === void 0 ? k : h[3] === '"' ? Ne : Me) : o === Ne || o === Me ? o = k : o === Pe || o === Re ? o = L : (o = k, s = void 0);
    const b = o === k && r[c + 1].startsWith("/>") ? " " : "";
    n += o === L ? a + Tt : p >= 0 ? (i.push(l), a.slice(0, p) + pe + a.slice(p) + E + b) : a + E + (p === -2 ? (i.push(void 0), c) : b);
  }
  return [Je(r, n + (r[t] || "<?>") + (e === 2 ? "</svg>" : "")), i];
};
class D {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let n = 0, o = 0;
    const c = e.length - 1, a = this.parts, [l, h] = Pt(e, t);
    if (this.el = D.createElement(l, i), O.currentNode = this.el.content, t === 2) {
      const p = this.el.content, f = p.firstChild;
      f.remove(), p.append(...f.childNodes);
    }
    for (; (s = O.nextNode()) !== null && a.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const p = [];
          for (const f of s.getAttributeNames()) if (f.endsWith(pe) || f.startsWith(E)) {
            const b = h[o++];
            if (p.push(f), b !== void 0) {
              const X = s.getAttribute(b.toLowerCase() + pe).split(E), $ = /([.?@])?(.*)/.exec(b);
              a.push({ type: 1, index: n, name: $[2], strings: X, ctor: $[1] === "." ? Mt : $[1] === "?" ? Ut : $[1] === "@" ? Lt : G });
            } else a.push({ type: 6, index: n });
          }
          for (const f of p) s.removeAttribute(f);
        }
        if (Ke.test(s.tagName)) {
          const p = s.textContent.split(E), f = p.length - 1;
          if (f > 0) {
            s.textContent = N ? N.emptyScript : "";
            for (let b = 0; b < f; b++) s.append(p[b], I()), O.nextNode(), a.push({ type: 2, index: ++n });
            s.append(p[f], I());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ze) a.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = s.data.indexOf(E, p + 1)) !== -1; ) a.push({ type: 7, index: n }), p += E.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const i = H.createElement("template");
    return i.innerHTML = e, i;
  }
}
function U(r, e, t = r, i) {
  var s, n, o, c;
  if (e === S) return e;
  let a = i !== void 0 ? (s = t._$Co) === null || s === void 0 ? void 0 : s[i] : t._$Cl;
  const l = C(e) ? void 0 : e._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== l && ((n = a == null ? void 0 : a._$AO) === null || n === void 0 || n.call(a, !1), l === void 0 ? a = void 0 : (a = new l(r), a._$AT(r, t, i)), i !== void 0 ? ((o = (c = t)._$Co) !== null && o !== void 0 ? o : c._$Co = [])[i] = a : t._$Cl = a), a !== void 0 && (e = U(r, a._$AS(r, e.values), a, i)), e;
}
class Rt {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    var t;
    const { el: { content: i }, parts: s } = this._$AD, n = ((t = e == null ? void 0 : e.creationScope) !== null && t !== void 0 ? t : H).importNode(i, !0);
    O.currentNode = n;
    let o = O.nextNode(), c = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (c === l.index) {
        let h;
        l.type === 2 ? h = new q(o, o.nextSibling, this, e) : l.type === 1 ? h = new l.ctor(o, l.name, l.strings, this, e) : l.type === 6 && (h = new jt(o, this, e)), this._$AV.push(h), l = s[++a];
      }
      c !== (l == null ? void 0 : l.index) && (o = O.nextNode(), c++);
    }
    return O.currentNode = H, n;
  }
  v(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class q {
  constructor(e, t, i, s) {
    var n;
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cp = (n = s == null ? void 0 : s.isConnected) === null || n === void 0 || n;
  }
  get _$AU() {
    var e, t;
    return (t = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && t !== void 0 ? t : this._$Cp;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = U(this, e, t), C(e) ? e === v || e == null || e === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : e !== this._$AH && e !== S && this._(e) : e._$litType$ !== void 0 ? this.g(e) : e.nodeType !== void 0 ? this.$(e) : Ot(e) ? this.T(e) : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.k(e));
  }
  _(e) {
    this._$AH !== v && C(this._$AH) ? this._$AA.nextSibling.data = e : this.$(H.createTextNode(e)), this._$AH = e;
  }
  g(e) {
    var t;
    const { values: i, _$litType$: s } = e, n = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = D.createElement(Je(s.h, s.h[0]), this.options)), s);
    if (((t = this._$AH) === null || t === void 0 ? void 0 : t._$AD) === n) this._$AH.v(i);
    else {
      const o = new Rt(n, this), c = o.u(this.options);
      o.v(i), this.$(c), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Ue.get(e.strings);
    return t === void 0 && Ue.set(e.strings, t = new D(e)), t;
  }
  T(e) {
    Fe(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const n of e) s === t.length ? t.push(i = new q(this.k(I()), this.k(I()), this, this.options)) : i = t[s], i._$AI(n), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, t); e && e !== this._$AB; ) {
      const s = e.nextSibling;
      e.remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cp = e, (t = this._$AP) === null || t === void 0 || t.call(this, e));
  }
}
class G {
  constructor(e, t, i, s, n) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = v;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, t = this, i, s) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = U(this, e, t, 0), o = !C(e) || e !== this._$AH && e !== S, o && (this._$AH = e);
    else {
      const c = e;
      let a, l;
      for (e = n[0], a = 0; a < n.length - 1; a++) l = U(this, c[i + a], t, a), l === S && (l = this._$AH[a]), o || (o = !C(l) || l !== this._$AH[a]), l === v ? e = v : e !== v && (e += (l != null ? l : "") + n[a + 1]), this._$AH[a] = l;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class Mt extends G {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === v ? void 0 : e;
  }
}
const Nt = N ? N.emptyScript : "";
class Ut extends G {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== v ? this.element.setAttribute(this.name, Nt) : this.element.removeAttribute(this.name);
  }
}
class Lt extends G {
  constructor(e, t, i, s, n) {
    super(e, t, i, s, n), this.type = 5;
  }
  _$AI(e, t = this) {
    var i;
    if ((e = (i = U(this, e, t, 0)) !== null && i !== void 0 ? i : v) === S) return;
    const s = this._$AH, n = e === v && s !== v || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== v && (s === v || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (t = this.options) === null || t === void 0 ? void 0 : t.host) !== null && i !== void 0 ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class jt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    U(this, e);
  }
}
const Le = Y.litHtmlPolyfillSupport;
Le == null || Le(D, q), ((re = Y.litHtmlVersions) !== null && re !== void 0 ? re : Y.litHtmlVersions = []).push("2.8.0");
const zt = (r, e, t) => {
  var i, s;
  const n = (i = t == null ? void 0 : t.renderBefore) !== null && i !== void 0 ? i : e;
  let o = n._$litPart$;
  if (o === void 0) {
    const c = (s = t == null ? void 0 : t.renderBefore) !== null && s !== void 0 ? s : null;
    n._$litPart$ = o = new q(e.insertBefore(I(), c), c, void 0, t != null ? t : {});
  }
  return o._$AI(r), o;
};
var se, ne;
class z extends R {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, t;
    const i = super.createRenderRoot();
    return (e = (t = this.renderOptions).renderBefore) !== null && e !== void 0 || (t.renderBefore = i.firstChild), i;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = zt(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!1);
  }
  render() {
    return S;
  }
}
z.finalized = !0, z._$litElement$ = !0, (se = globalThis.litElementHydrateSupport) === null || se === void 0 || se.call(globalThis, { LitElement: z });
const je = globalThis.litElementPolyfillSupport;
je == null || je({ LitElement: z });
((ne = globalThis.litElementVersions) !== null && ne !== void 0 ? ne : globalThis.litElementVersions = []).push("3.3.3");
const It = (r) => (e) => typeof e == "function" ? ((t, i) => (customElements.define(t, i), i))(r, e) : ((t, i) => {
  const { kind: s, elements: n } = i;
  return { kind: s, elements: n, finisher(o) {
    customElements.define(t, o);
  } };
})(r, e);
const Ct = (r, e) => e.kind === "method" && e.descriptor && !("value" in e.descriptor) ? _e(x({}, e), { finisher(t) {
  t.createProperty(e.key, r);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e.key, initializer() {
  typeof e.initializer == "function" && (this[e.key] = e.initializer.call(this));
}, finisher(t) {
  t.createProperty(e.key, r);
} }, Dt = (r, e, t) => {
  e.constructor.createProperty(t, r);
};
function Ye(r) {
  return (e, t) => t !== void 0 ? Dt(r, e, t) : Ct(r, e);
}
var oe;
((oe = window.HTMLSlotElement) === null || oe === void 0 ? void 0 : oe.prototype.assignedElements) != null;
const ae = (r) => r != null ? r : v;
const Bt = { ATTRIBUTE: 1 }, Ge = (r) => (...e) => ({ _$litDirective$: r, values: e });
let Xe = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, i) {
    this._$Ct = e, this._$AM = t, this._$Ci = i;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
};
const Qe = "important", qt = " !" + Qe, T = Ge(class extends Xe {
  constructor(r) {
    var e;
    if (super(r), r.type !== Bt.ATTRIBUTE || r.name !== "style" || ((e = r.strings) === null || e === void 0 ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(r) {
    return Object.keys(r).reduce((e, t) => {
      const i = r[t];
      return i == null ? e : e + `${t = t.includes("-") ? t : t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(r, [e]) {
    const { style: t } = r.element;
    if (this.ht === void 0) {
      this.ht = /* @__PURE__ */ new Set();
      for (const i in e) this.ht.add(i);
      return this.render(e);
    }
    this.ht.forEach((i) => {
      e[i] == null && (this.ht.delete(i), i.includes("-") ? t.removeProperty(i) : t[i] = "");
    });
    for (const i in e) {
      const s = e[i];
      if (s != null) {
        this.ht.add(i);
        const n = typeof s == "string" && s.endsWith(qt);
        i.includes("-") || n ? t.setProperty(i, n ? s.slice(0, -11) : s, n ? Qe : "") : t[i] = s;
      }
    }
    return S;
  }
}), P = (r, e) => g(r, "hass-notification", e), le = (r) => Array.isArray(r) ? r.reduce((e, t) => Object.assign(e, t), {}) : r, Vt = (r, e, t, i) => {
  let s;
  i === "double_tap" && t.double_tap_action ? s = t.double_tap_action : i === "hold" && t.hold_action ? s = t.hold_action : i === "tap" && t.tap_action && (s = t.tap_action), Wt(r, e, t, s);
};
function Wt(r, e, t, i) {
  if (i || (i = {
    action: "more-info"
  }), !(i.confirmation && (!i.confirmation.exemptions || !i.confirmation.exemptions.some(
    (s) => {
      var n;
      return s.user === ((n = e == null ? void 0 : e.user) == null ? void 0 : n.id);
    }
  )) && (_("warning"), !confirm(
    i.confirmation.text || `Are you sure you want to ${i.action}?`
  ))))
    switch (i.action) {
      case "more-info": {
        const s = i.entity || t.entity;
        s ? g(r, "hass-more-info", { entityId: s }) : (P(r, {
          message: e.localize(
            "ui.panel.lovelace.cards.actions.no_entity_more_info"
          )
        }), _("failure"));
        break;
      }
      case "navigate":
        if (!i.navigation_path) {
          P(r, {
            message: e.localize(
              "ui.panel.lovelace.cards.actions.no_navigation_path"
            )
          }), _("failure");
          return;
        }
        _t(r, i.navigation_path), _("light");
        break;
      case "url":
        if (!i.url_path) {
          P(r, {
            message: e.localize("ui.panel.lovelace.cards.actions.no_url")
          }), _("failure");
          return;
        }
        window.open(i.url_path), _("light");
        break;
      case "toggle":
        if (!t.entity) {
          P(r, {
            message: e.localize(
              "ui.panel.lovelace.cards.actions.no_entity_toggle"
            )
          }), _("failure");
          return;
        }
        gt(e, t.entity), _("light");
        break;
      case "call-service": {
        if (!i.service) {
          P(r, {
            message: e.localize("ui.panel.lovelace.cards.actions.no_service")
          }), _("failure");
          return;
        }
        const [s, n] = i.service.split(".", 2);
        e.callService(
          s,
          n,
          i.service_data,
          i.target
        ), _("light");
        break;
      }
      case "fire-event": {
        if (!i.event_type) {
          P(r, {
            message: "No event to call specified"
          }), _("failure");
          return;
        }
        e.callApi(
          "POST",
          `events/${i.event_type}`,
          i.event_data || {}
        ), _("light");
        break;
      }
      case "fire-dom-event":
        g(r, "ll-custom", i), _("light");
    }
}
function ze(r) {
  return r !== void 0 && r.action !== "none";
}
const F = (r, e) => {
  if (r === e)
    return !0;
  if (r && e && typeof r == "object" && typeof e == "object") {
    if (r.constructor !== e.constructor)
      return !1;
    let t, i;
    if (Array.isArray(r)) {
      if (i = r.length, i !== e.length)
        return !1;
      for (t = i; t-- !== 0; )
        if (!F(r[t], e[t]))
          return !1;
      return !0;
    }
    if (r instanceof Map && e instanceof Map) {
      if (r.size !== e.size)
        return !1;
      for (t of r.entries())
        if (!e.has(t[0]))
          return !1;
      for (t of r.entries())
        if (!F(t[1], e.get(t[0])))
          return !1;
      return !0;
    }
    if (r instanceof Set && e instanceof Set) {
      if (r.size !== e.size)
        return !1;
      for (t of r.entries())
        if (!e.has(t[0]))
          return !1;
      return !0;
    }
    if (ArrayBuffer.isView(r) && ArrayBuffer.isView(e)) {
      if (i = r.length, i !== e.length)
        return !1;
      for (t = i; t-- !== 0; )
        if (r[t] !== e[t])
          return !1;
      return !0;
    }
    if (r.constructor === RegExp)
      return r.source === e.source && r.flags === e.flags;
    if (r.valueOf !== Object.prototype.valueOf)
      return r.valueOf() === e.valueOf();
    if (r.toString !== Object.prototype.toString)
      return r.toString() === e.toString();
    const s = Object.keys(r);
    if (i = s.length, i !== Object.keys(e).length)
      return !1;
    for (t = i; t-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(e, s[t]))
        return !1;
    for (t = i; t-- !== 0; ) {
      const n = s[t];
      if (!F(r[n], e[n]))
        return !1;
    }
    return !0;
  }
  return r !== r && e !== e;
}, Ie = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
class Zt extends HTMLElement {
  constructor() {
    super(), this.holdTime = 500, this.held = !1, this.cancelled = !1, this.isRepeating = !1, this.ripple = document.createElement("mwc-ripple");
  }
  connectedCallback() {
    Object.assign(this.style, {
      position: "fixed",
      width: Ie ? "100px" : "50px",
      height: Ie ? "100px" : "50px",
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
      zIndex: "999"
    }), this.appendChild(this.ripple), this.ripple.primary = !0;
    for (const e of [
      "touchcancel",
      "mouseout",
      "mouseup",
      "touchmove",
      "mousewheel",
      "wheel",
      "scroll"
    ])
      document.addEventListener(
        e,
        () => {
          this.cancelled = !0, this.timer && (this.stopAnimation(), clearTimeout(this.timer), this.timer = void 0, this.isRepeating && this.repeatTimeout && (clearInterval(this.repeatTimeout), this.isRepeating = !1));
        },
        { passive: !0 }
      );
  }
  bind(e, t = {}) {
    e.actionHandler && F(t, e.actionHandler.options) || (e.actionHandler ? (e.actionHandler.start && (e.removeEventListener("touchstart", e.actionHandler.start), e.removeEventListener("mousedown", e.actionHandler.start)), e.actionHandler.end && (e.removeEventListener("touchend", e.actionHandler.end), e.removeEventListener("touchcancel", e.actionHandler.end), e.removeEventListener("click", e.actionHandler.end)), e.actionHandler.handleEnter && e.removeEventListener("keyup", e.actionHandler.handleEnter)) : e.addEventListener("contextmenu", (i) => {
      const s = i || window.event;
      return s.preventDefault && s.preventDefault(), s.stopPropagation && s.stopPropagation(), s.cancelBubble = !0, s.returnValue = !1, !1;
    }), e.actionHandler = { options: t }, !t.disabled && (e.actionHandler.start = (i) => {
      this.cancelled = !1;
      let s, n;
      i.touches ? (s = i.touches[0].pageX, n = i.touches[0].pageY) : (s = i.pageX, n = i.pageY), t.hasHold && (this.held = !1, this.timer = window.setTimeout(() => {
        this.startAnimation(s, n), this.held = !0, t.repeat && !this.isRepeating && (this.isRepeating = !0, this.repeatTimeout = setInterval(() => {
          g(e, "action", { action: "hold" });
        }, t.repeat));
      }, this.holdTime));
    }, e.actionHandler.end = (i) => {
      if (["touchend", "touchcancel"].includes(i.type) && this.cancelled) {
        this.isRepeating && this.repeatTimeout && (clearInterval(this.repeatTimeout), this.isRepeating = !1);
        return;
      }
      const s = i.target;
      i.cancelable && i.preventDefault(), t.hasHold && (clearTimeout(this.timer), this.isRepeating && this.repeatTimeout && clearInterval(this.repeatTimeout), this.isRepeating = !1, this.stopAnimation(), this.timer = void 0), t.hasHold && this.held ? t.repeat || g(s, "action", { action: "hold" }) : t.hasDoubleClick ? i.type === "click" && i.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, g(s, "action", { action: "tap" });
      }, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, g(s, "action", { action: "double_tap" })) : g(s, "action", { action: "tap" });
    }, e.actionHandler.handleEnter = (i) => {
      var s, n;
      i.keyCode === 13 && ((n = (s = i.currentTarget.actionHandler) == null ? void 0 : s.end) == null || n.call(s, i));
    }, e.addEventListener("touchstart", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("touchend", e.actionHandler.end), e.addEventListener("touchcancel", e.actionHandler.end), e.addEventListener("mousedown", e.actionHandler.start, {
      passive: !0
    }), e.addEventListener("click", e.actionHandler.end), e.addEventListener("keyup", e.actionHandler.handleEnter)));
  }
  startAnimation(e, t) {
    Object.assign(this.style, {
      left: `${e}px`,
      top: `${t}px`,
      display: null
    }), this.ripple.disabled = !1, this.ripple.startPress(), this.ripple.unbounded = !0;
  }
  stopAnimation() {
    this.ripple.endPress(), this.ripple.disabled = !0, this.style.display = "none";
  }
}
customElements.define("paper-buttons-row-action-handler", Zt);
const Ft = () => {
  const r = document.body;
  if (r.querySelector("paper-buttons-row-action-handler"))
    return r.querySelector(
      "paper-buttons-row-action-handler"
    );
  const e = document.createElement(
    "paper-buttons-row-action-handler"
  );
  return r.appendChild(e), e;
}, Kt = (r, e) => {
  const t = Ft();
  t && t.bind(r, e);
}, Jt = Ge(
  class extends Xe {
    update(r, [e]) {
      return Kt(r.element, e), S;
    }
    render(r) {
    }
  }
), Yt = /* @__PURE__ */ new Set([
  "fan",
  "input_boolean",
  "light",
  "switch",
  "group",
  "automation",
  "cover",
  "script",
  "vacuum",
  "lock"
]), Gt = /* @__PURE__ */ new Set(["open", "unlocked", "on"]), ce = "on", Xt = "off", Qt = "unavailable", er = ["name", "icon", "image", "state"], et = (r) => {
  var e;
  return (e = r.attributes) != null && e.friendly_name ? r.attributes.friendly_name : r.entity_id ? pt(r.entity_id).replace(/_/g, " ") : "Unknown";
};
function Ce(r, e, t, i) {
  if (!t || !t.action || t.action === "none")
    return "";
  let s = `${i ? r.localize("ui.panel.lovelace.cards.picture-elements.hold") : r.localize("ui.panel.lovelace.cards.picture-elements.tap")} `;
  switch (t.action) {
    case "navigate":
      s += `${r.localize(
        "ui.panel.lovelace.cards.picture-elements.navigate_to",
        "location",
        t.navigation_path
      )}`;
      break;
    case "url":
      s += `${r.localize(
        "ui.panel.lovelace.cards.picture-elements.url",
        "url_path",
        t.url_path
      )}`;
      break;
    case "toggle":
      s += `${r.localize(
        "ui.panel.lovelace.cards.picture-elements.toggle",
        "name",
        e
      )}`;
      break;
    case "call-service":
      s += `${r.localize(
        "ui.panel.lovelace.cards.picture-elements.call_service",
        "name",
        t.service
      )}`;
      break;
    case "more-info":
      s += `${r.localize(
        "ui.panel.lovelace.cards.picture-elements.more_info",
        "name",
        e
      )}`;
      break;
  }
  return s;
}
const tr = (r, e) => {
  if (!e || r.tooltip === !1)
    return "";
  if (r.tooltip)
    return r.tooltip;
  let t = "", i = "";
  if (r.entity && (t = r.entity in e.states ? et(e.states[r.entity]) : r.entity), !r.tap_action && !r.hold_action)
    return t;
  const s = r.tap_action ? Ce(e, t, r.tap_action, !1) : "", n = r.hold_action ? Ce(e, t, r.hold_action, !0) : "";
  return i = s + (s && n ? `
` : "") + n, i;
}, tt = () => {
  var i, s, n, o, c, a;
  const r = (n = (s = (i = document.querySelector("home-assistant")) == null ? void 0 : i.shadowRoot) == null ? void 0 : s.querySelector("home-assistant-main")) == null ? void 0 : n.shadowRoot, e = (r == null ? void 0 : r.querySelector("ha-drawer partial-panel-resolver")) || (r == null ? void 0 : r.querySelector("app-drawer-layout partial-panel-resolver")), t = (a = (c = (o = (e == null ? void 0 : e.shadowRoot) || e) == null ? void 0 : o.querySelector("ha-panel-lovelace")) == null ? void 0 : c.shadowRoot) == null ? void 0 : a.querySelector("hui-root");
  if (t) {
    const l = t.lovelace;
    return l.current_view = t.___curView, l;
  }
  return null;
};
let j = tt();
function rr(r, e) {
  var s, n;
  j || (j = tt());
  const t = ((n = (s = j == null ? void 0 : j.config) == null ? void 0 : s.paper_buttons_row) == null ? void 0 : n.presets) || {}, i = r.preset || (e == null ? void 0 : e.preset);
  return i ? ue(
    {
      mushroom: ir
    }[i] || t[i] || {},
    r
  ) : r;
}
const ir = {
  ripple: "none",
  styles: {
    button: {
      "min-width": "42px",
      "min-height": "42px",
      "border-radius": "12px",
      "box-sizing": "border-box",
      transition: "background-color 280ms ease-in-out 0s",
      "--pbs-button-rgb-color": "var(--rgb-primary-text-color)",
      "--pbs-button-rgb-default-color": "var(--rgb-primary-text-color)",
      "--pbs-button-rgb-active-color": "var(--pbs-button-rgb-state-color)",
      "--pbs-button-rgb-bg-color": "var(--pbs-button-rgb-color)",
      "--pbs-button-rgb-bg-active-color": "var(--pbs-button-rgb-active-color)",
      "--pbs-button-rgb-bg-opacity": "0.05",
      "--pbs-button-rgb-bg-active-opacity": "0.2"
    }
  }
}, sr = ".flex-box{display:flex;justify-content:space-evenly;align-items:center}.flex-column{display:inline-flex;flex-direction:column;align-items:center}.hidden{display:none}paper-button{--pbs-button-rgb-fallback: 68, 115, 158;color:var( --pbs-button-color, rgb( var( --pbs-button-rgb-color, var( --pbs-button-rgb-state-color, var( --pbs-button-rgb-default-color, var(--rgb-state-default-color, var(--pbs-button-rgb-fallback)) ) ) ) ) );background-color:var( --pbs-button-bg-color, rgba(var(--pbs-button-rgb-bg-color), var(--pbs-button-rgb-bg-opacity, 1)) );padding:6px;cursor:pointer;position:relative;display:inline-flex;align-items:center;justify-content:center;user-select:none}span{padding:2px;text-align:center}ha-icon{padding:2px}.button-active{color:var( --paper-item-icon-active-color, var( --pbs-button-active-color, rgb( var( --pbs-button-rgb-active-color, var( --pbs-button-rgb-state-color, var( --pbs-button-rgb-default-color, var(--rgb-state-default-color, var(--pbs-button-rgb-fallback)) ) ) ) ) ) );background-color:var( --pbs-button-bg-active-color, rgba( var(--pbs-button-rgb-bg-active-color, var(--pbs-button-rgb-bg-color)), var( --pbs-button-rgb-bg-active-opacity, var(--pbs-button-rgb-bg-opacity, 1) ) ) )}.button-unavailable{color:var( --pbs-button-unavailable-color, rgb(var(--pbs-button-rgb-unavailable-color, var(--rgb-disabled-color))) )}.image{position:relative;display:inline-block;width:28px;border-radius:50%;height:28px;text-align:center;background-size:cover;line-height:28px;vertical-align:middle;box-sizing:border-box}@keyframes blink{0%{opacity:0}50%{opacity:1}to{opacity:0}}@-webkit-keyframes rotating{0%{-webkit-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotating{0%{-ms-transform:rotate(0deg);-moz-transform:rotate(0deg);-webkit-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0)}to{-ms-transform:rotate(360deg);-moz-transform:rotate(360deg);-webkit-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}[rotating]{-webkit-animation:rotating 2s linear infinite;-moz-animation:rotating 2s linear infinite;-ms-animation:rotating 2s linear infinite;-o-animation:rotating 2s linear infinite;animation:rotating 2s linear infinite}", M = "lovelace-player-device-id";
function rt() {
  if (!localStorage[M]) {
    const r = () => Math.floor((1 + Math.random()) * 1e5).toString(16).substring(1);
    window.fully && typeof fully.getDeviceId == "function" ? localStorage[M] = fully.getDeviceId() : localStorage[M] = `${r()}${r()}-${r()}${r()}`;
  }
  return localStorage[M];
}
let it = rt();
const nr = (r) => {
  r !== null && (r === "clear" ? localStorage.removeItem(M) : localStorage[M] = r, it = rt());
}, De = new URLSearchParams(window.location.search);
De.get("deviceID") && nr(De.get("deviceID"));
function or(r) {
  if (String(r).includes("{%") || String(r).includes("{{"))
    return !0;
}
function ar(r, e, t, i = !0) {
  r || (r = V().connection);
  let s = x({
    user: V().user.name,
    browser: it,
    hash: location.hash.substr(1) || " "
  }, t.variables), n = t.template, o = t.entity_ids;
  return r.subscribeMessage(
    (c) => {
      if (i) {
        let a = String(c.result);
        const l = /_\([^)]*\)/g;
        a = a.replace(l, (h) => V().localize(h.substring(2, h.length - 1)) || h), e(a);
      } else
        e(c.result);
    },
    {
      type: "render_template",
      template: n,
      variables: s,
      entity_ids: o
    }
  );
}
function lr(r, e) {
  for (const t of r)
    t.callback(cr(t.template, e));
}
function cr(r, e) {
  let t = e.states[r.entity];
  if (!t) return;
  r.attribute ? t = t.attributes[r.attribute] : t = t.state;
  let i = (r.prefix || "") + t + (r.postfix || "");
  return r.case && (i = ur(i, r.case)), i;
}
function ur(r, e) {
  switch (e) {
    case "upper":
      return r.toUpperCase();
    case "lower":
      return r.toLowerCase();
    case "first":
      return r[0].toUpperCase() + r.slice(1);
  }
}
function Be(r, e, t) {
  var s, n;
  const i = e[t];
  typeof i == "object" ? (i.entity || (i.entity = r.entity), i.entity !== r.entity && ((s = this._entities) == null || s.push(i.entity)), (n = this._templates) == null || n.push({
    template: i,
    callback: (o) => {
      o && (e[t] = o);
    }
  })) : or(i) && (ar(
    null,
    (o) => {
      e[t] = o, this.requestUpdate();
    },
    {
      template: i,
      variables: { config: r }
    }
  ), e[t] = "");
}
function dr(r, e) {
  customElements.whenDefined(r).then(() => {
    const t = customElements.get(r), i = t.prototype.firstUpdated;
    t.prototype.firstUpdated = function(s) {
      i.call(this, s), e.call(this, s);
    }, g(window, "ll-rebuild", {});
  });
}
dr("hui-generic-entity-row", function() {
  var r;
  if ((r = this.config) != null && r.extend_paper_buttons_row && this.shadowRoot) {
    const e = this.config.extend_paper_buttons_row, t = yt(
      x({
        type: "custom:paper-buttons-row"
      }, e)
    );
    ht(t);
    let i = this.shadowRoot.querySelector("slot");
    if (!i) return;
    if (i.parentElement && (i.parentElement.parentElement ? i.parentElement.classList.contains("state") && i.parentElement.parentElement.classList.contains("text-content") ? i = i.parentElement.parentElement : console.error("unexpected parent node found") : i.parentElement.classList.contains("text-content") ? i = i.parentElement : console.error("unexpected parent node found")), e.hide_state && (i.style.display = "none"), e.hide_badge) {
      const s = this.shadowRoot.querySelector("state-badge");
      s && (s.style.visibility = "hidden", s.style.marginLeft = "-48px");
    }
    e.position === "right" ? hr(t, i) : st(t, i);
  }
});
function st(r, e) {
  var t;
  (t = e.parentNode) == null || t.insertBefore(r, e);
}
function hr(r, e) {
  var t;
  e.nextElementSibling ? st(r, e.nextElementSibling) : (t = e.parentNode) == null || t.appendChild(r);
}
var pr = Object.defineProperty, mr = Object.getOwnPropertyDescriptor, fe = (r, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? mr(e, t) : e, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (s = (i ? o(e, t, s) : o(s)) || s);
  return i && s && pr(e, t, s), s;
};
console.groupCollapsed(
  "%c PAPER-BUTTONS-ROW %c 5bff900 ",
  "color: white; background: #039be5; font-weight: 700;",
  "color: #039be5; background: white; font-weight: 700;"
);
console.info("branch   : main");
console.info("commit   : 5bff900b5fa1669cffa882dd68902518f9ec3cb3");
console.info("built at : 2025-05-31T16:47:55.310Z");
console.info("https://github.com/jcwillox/lovelace-paper-buttons-row");
console.groupEnd();
const fr = (r) => {
  if (r.state_icons && typeof r.state == "string")
    return r.state_icons[r.state.toLowerCase()];
}, vr = (r) => r.state_text && typeof r.state == "string" && r.state_text[r.state.toLowerCase()] || r.state, yr = (r) => {
  switch (console.warn(
    "PAPER-BUTTONS-ROW",
    "'align_icon' and 'align_icons' is deprecated and will be removed in a future version"
  ), r) {
    case "top":
      return [["icon", "name"]];
    case "bottom":
      return [["name", "icon"]];
    case "right":
      return ["name", "icon"];
    default:
      return ["icon", "name"];
  }
};
let B = class extends z {
  constructor() {
    super(...arguments), this._getStateColor = (r, e) => {
      const t = getComputedStyle(this);
      if (r.attributes.device_class) {
        const s = t.getPropertyValue(
          `--state-${e}-${r.attributes.device_class}-${r.state}-color`
        );
        if (s)
          return this._hexToRgb(s);
      }
      let i = t.getPropertyValue(
        `--state-${e}-${r.state}-color`
      );
      if (i) return this._hexToRgb(i);
      if (r.state === ce || r.state === Xt) {
        const s = r.state === ce ? "active" : "inactive";
        if (i = t.getPropertyValue(`--state-${e}-${s}-color`), i) return this._hexToRgb(i);
        if (r.state === ce && (i = t.getPropertyValue("--state-active-color"), i))
          return this._hexToRgb(i);
      }
    };
  }
  // convert an externally set config to the correct internal structure
  _transformConfig(r) {
    if (!r) throw new Error("Invalid configuration");
    if (!r.buttons) throw new Error("Missing buttons.");
    if (!Array.isArray(r.buttons))
      throw new Error("Buttons must be an array.");
    if (r.buttons.length <= 0)
      throw new Error("At least one button required.");
    if (r = JSON.parse(JSON.stringify(r)), r.buttons.every((e) => !Array.isArray(e)))
      r.buttons = [r.buttons];
    else if (!r.buttons.every((e) => Array.isArray(e)))
      throw new Error("Cannot mix rows and buttons");
    if (r.styles === void 0)
      r.styles = {};
    else
      for (const e in r.styles)
        r.styles[e] = le(r.styles[e]);
    return r.buttons = r.buttons.map(
      (e) => e.map((t) => {
        if (typeof t == "string" && (t = { entity: t }), t = ue(r.base_config || {}, t), typeof t.layout == "string" && (t.layout = t.layout.split("|").map(
          (i) => i.includes("_") ? i.split("_") : i
        )), typeof t.active == "string" && (t.active = [t.active]), t.styles === void 0 && (t.styles = t.style), t.styles === void 0)
          t.styles = {};
        else
          for (const i in t.styles)
            t.styles[i] = le(t.styles[i]);
        if (t.state_styles)
          for (const i in t.state_styles)
            for (const s in t.state_styles[i])
              t.state_styles[i][s] = le(
                t.state_styles[i][s]
              );
        return t = this._defaultConfig(r, t), t;
      })
    ), r;
  }
  setConfig(r) {
    this._config = this._transformConfig(r), this.hass || (this.hass = V()), this._entities = [], this._templates = [], this._config.buttons = this._config.buttons.map((e) => e.map((t) => {
      var i;
      t = rr(t, this._config), t.entity && ((i = this._entities) == null || i.push(t.entity));
      for (const s of er)
        Be.call(this, t, t, s);
      for (const s of Object.values(t.styles))
        if (typeof s == "object")
          for (const n of Object.keys(s))
            Be.call(this, t, s, n);
      return t;
    }));
  }
  render() {
    return !this._config || !this.hass ? A`` : (lr(this._templates, this.hass), A`
      ${this._config.extra_styles ? A`
            <style>
              ${this._config.extra_styles}
            </style>
          ` : ""}
      ${this._config.buttons.map((r) => {
      var e;
      return A`
          <div
            class="flex-box"
            style="${T((e = this._config) == null ? void 0 : e.styles)}"
          >
            ${r.map((t) => {
        var a, l, h;
        const i = t.entity !== void 0 && ((a = this.hass) == null ? void 0 : a.states[t.entity]) || void 0, s = t.entity && K(t.entity), n = this._getStyles(t), o = x(x(x({}, this._getBaseStyles()), this._getStateStyles(s, i)), n.button || {}), c = t.active ? new Set(t.active) : Gt;
        return A`
                <paper-button
                  @action="${(p) => this._handleAction(p, t)}"
                  .actionHandler="${Jt({
          hasHold: ze(t.hold_action),
          hasDoubleClick: ze(t.double_tap_action),
          repeat: (l = t.hold_action) == null ? void 0 : l.repeat
        })}"
                  style="${T(o)}"
                  class="${this._getClass(
          c,
          t.state,
          i == null ? void 0 : i.state
        )}"
                  title="${tr(t, this.hass)}"
                  data-domain="${ae(s)}"
                  data-entity-state="${ae(i == null ? void 0 : i.state)}"
                  data-state="${ae(
          typeof t.state == "string" && t.state.toLowerCase()
        )}"
                >
                  ${(h = t.layout) == null ? void 0 : h.map((p) => Array.isArray(p) ? A`
                        <div class="flex-column">
                          ${p.map(
          (f) => this.renderElement(f, t, n, i)
        )}
                        </div>
                      ` : this.renderElement(p, t, n, i))}

                  <paper-ripple
                    center
                    style="${T(n.ripple || {})}"
                    class="${this._getRippleClass(t)}"
                  ></paper-ripple>
                </paper-button>
              `;
      })}
          </div>
        `;
    })}
    `);
  }
  renderElement(r, e, t, i) {
    const s = (t == null ? void 0 : t[r]) || {};
    switch (r) {
      case "icon":
        return this.renderIcon(e, s, i);
      case "name":
        return this.renderName(e, s, i);
      case "state":
        return this.renderState(e, s);
    }
  }
  renderIcon(r, e, t) {
    const i = r.icon !== !1 && (r.icon || r.entity) ? fr(r) || r.icon || t && $t(t) : !1;
    return r.image ? A`<img
        src="${r.image}"
        class="image"
        style="${T(e)}"
        alt="icon"
      />` : i ? A`
          <ha-icon style="${T(e)}" .icon="${i}" />` : "";
  }
  renderName(r, e, t) {
    return r.name !== !1 && (r.name || r.entity) ? A`
        <span style="${T(e)}">
            ${r.name || et(t)}
          </span>
      ` : "";
  }
  renderState(r, e) {
    return r.state !== !1 ? A`
        <span style="${T(e)}"> ${vr(r)} </span>
      ` : "";
  }
  _handleAction(r, e) {
    this.hass && e && r.detail.action && Vt(this, this.hass, e, r.detail.action);
  }
  _getClass(r, e, t) {
    return typeof e == "string" && r.has(e.toLowerCase()) ? "button-active" : Qt === t ? "button-unavailable" : "";
  }
  _getBaseStyles() {
    var e;
    const r = getComputedStyle(this).getPropertyValue("--state-icon-color");
    return {
      "--rgb-state-default-color": (e = this._hexToRgb(r)) == null ? void 0 : e.join(", ")
    };
  }
  _getStateStyles(r, e) {
    if (!r || !e) return {};
    if (e.attributes.rgb_color)
      return {
        "--pbs-button-rgb-state-color": e.attributes.rgb_color
      };
    const t = this._getStateColor(e, r);
    return t ? {
      "--pbs-button-rgb-state-color": t.join(", ")
    } : {};
  }
  _hexToRgb(r) {
    var e;
    return (e = r.match(/[A-Za-z0-9]{2}/g)) == null ? void 0 : e.map((t) => Number.parseInt(t, 16));
  }
  _getRippleClass(r) {
    var e, t;
    switch (r.ripple) {
      case "none":
        return "hidden";
      case "circle":
        return "circle";
      case "fill":
        return "";
    }
    return ((e = r.layout) == null ? void 0 : e.length) === 1 && r.layout[0] === "icon" ? "circle" : r.name || r.name !== !1 && r.entity || (t = r.layout) != null && t.includes("state") ? "" : "circle";
  }
  _getStyles(r) {
    if (!r.state || !r.state_styles)
      return r.styles;
    const e = r.state_styles[r.state.toLowerCase()];
    return e ? ue(r.styles, e) : r.styles;
  }
  _defaultConfig(r, e) {
    if (!e.layout) {
      const t = e.align_icon || r.align_icons;
      t ? e.layout = yr(t) : e.layout = ["icon", "name"];
    }
    if (!e.state && e.entity && (e.state = { case: "upper" }), e.entity) {
      const t = K(e.entity);
      e.hold_action || (e.hold_action = { action: "more-info" }), e.tap_action || (Yt.has(t) ? e.tap_action = { action: "toggle" } : t === "scene" ? e.tap_action = {
        action: "call-service",
        service: "scene.turn_on",
        service_data: {
          entity_id: e.entity
        }
      } : e.tap_action = { action: "more-info" });
    }
    return e;
  }
  shouldUpdate(r) {
    if (r.has("_config"))
      return !0;
    if (this._entities) {
      const e = r.get("hass");
      return e ? this._entities.some(
        (t) => {
          var i;
          return e.states[t] !== ((i = this.hass) == null ? void 0 : i.states[t]);
        }
      ) : !0;
    }
    return !1;
  }
};
B.styles = Ve(sr);
fe([
  Ye()
], B.prototype, "hass", 2);
fe([
  Ye()
], B.prototype, "_config", 2);
B = fe([
  It("paper-buttons-row")
], B);
export {
  B as PaperButtonsRow
};
