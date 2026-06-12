import { a as _export_sfc, _ as __nuxt_component_0$1 } from './server.mjs';
import { mergeProps, defineComponent, ref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const open = ref(false);
    const toggle = ref(null);
    const toggleMenu = () => {
      open.value = !open.value;
    };
    const closeMenu = () => {
      open.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiWrapper = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["site_header", { "is-open": open.value }]
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UiWrapper, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header_con"${_scopeId}><a class="brand" href="#top" aria-label="Chaimel Enjambre home"${_scopeId}><span class="brand_mark"${_scopeId}>CE</span><span class="brand_name"${_scopeId}>Chaimel Enjambre</span></a><nav id="primary-nav" class="page_nav" aria-label="Primary navigation"${_scopeId}><a href="#projects"${_scopeId}>Projects</a><a href="#experience"${_scopeId}>Experience</a><a href="#skills"${_scopeId}>Skills</a><a href="#contactus"${_scopeId}>Contact</a><a class="nav_cta" href="/Chaimel-Enjambre-Resume.pdf" target="_blank" rel="noopener"${_scopeId}> Résumé </a></nav><button class="nav_toggle" type="button" aria-controls="primary-nav"${ssrRenderAttr("aria-expanded", open.value)} aria-label="Toggle navigation"${_scopeId}><span${_scopeId}></span><span${_scopeId}></span><span${_scopeId}></span></button></div>`);
          } else {
            return [
              createVNode("div", { class: "header_con" }, [
                createVNode("a", {
                  class: "brand",
                  href: "#top",
                  "aria-label": "Chaimel Enjambre home"
                }, [
                  createVNode("span", { class: "brand_mark" }, "CE"),
                  createVNode("span", { class: "brand_name" }, "Chaimel Enjambre")
                ]),
                createVNode("nav", {
                  id: "primary-nav",
                  class: "page_nav",
                  "aria-label": "Primary navigation"
                }, [
                  createVNode("a", {
                    href: "#projects",
                    onClick: closeMenu
                  }, "Projects"),
                  createVNode("a", {
                    href: "#experience",
                    onClick: closeMenu
                  }, "Experience"),
                  createVNode("a", {
                    href: "#skills",
                    onClick: closeMenu
                  }, "Skills"),
                  createVNode("a", {
                    href: "#contactus",
                    onClick: closeMenu
                  }, "Contact"),
                  createVNode("a", {
                    class: "nav_cta",
                    href: "/Chaimel-Enjambre-Resume.pdf",
                    target: "_blank",
                    rel: "noopener",
                    onClick: closeMenu
                  }, " Résumé ")
                ]),
                createVNode("button", {
                  ref_key: "toggle",
                  ref: toggle,
                  class: "nav_toggle",
                  type: "button",
                  "aria-controls": "primary-nav",
                  "aria-expanded": open.value,
                  "aria-label": "Toggle navigation",
                  onClick: toggleMenu
                }, [
                  createVNode("span"),
                  createVNode("span"),
                  createVNode("span")
                ], 8, ["aria-expanded"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/Header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$2, { __name: "LayoutHeader" });
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_UiWrapper = __nuxt_component_0$1;
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer_btm" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_UiWrapper, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="footer_btm_con"${_scopeId}><span${_scopeId}>© 2026 Chaimel Enjambre · Built with Nuxt, Vue &amp; care</span><a href="#top"${_scopeId}>Back to top ↑</a></div>`);
      } else {
        return [
          createVNode("div", { class: "footer_btm_con" }, [
            createVNode("span", null, "© 2026 Chaimel Enjambre · Built with Nuxt, Vue & care"),
            createVNode("a", { href: "#top" }, "Back to top ↑")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]), { __name: "LayoutFooter" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_LayoutHeader = __nuxt_component_0;
  const _component_LayoutFooter = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "site" }, _attrs))}><a class="skip_link" href="#top">Skip to content</a>`);
  _push(ssrRenderComponent(_component_LayoutHeader, null, null, _parent));
  _push(`<main id="top" tabindex="-1">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_LayoutFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-CoccUbdB.mjs.map
