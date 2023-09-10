export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("click-out-side", {
    mounted: (el, binding) => {
      el.handleClickOutSide = (event: MouseEvent) => {
        if (el !== event.target && !el.contains(event.target))
          binding.value(event, el);
      };
      document
        .querySelector("body")
        ?.addEventListener("click", (e) => el.handleClickOutSide(e));
    },
    unmounted: (el) => {
      document
        .querySelector("body")
        ?.removeEventListener("click", (e) => el.handleClickOutSide(e));
    },
  });
});
