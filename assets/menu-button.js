export default class MenuButton extends HTMLElement {
  connectedCallback() {
    const button = this.querySelector("button");
    const close = this.querySelector(".menu-close");
    const menu = this.querySelector(":scope > div");

    let current = menu.querySelector("[aria-current]");
    let text = "/";

    while (current) {
      text = `/ ${current.dataset.order} ${current.innerText} ${text}`;
      const parent = current.closest("li")?.parentElement?.closest("li")
        ?.querySelector(":scope > a");
      current = this.contains(parent) ? parent : null;
    }

    button.innerHTML = text;

    button.addEventListener("click", () => {
      menu.showPopover();
    });

    menu.addEventListener("beforetoggle", (event) => {
      button.setAttribute(
        "aria-expanded",
        event.newState === "open" ? "true" : "false",
      );
    });

    close.addEventListener("click", () => {
      menu.hidePopover();
    });

    const media = matchMedia("(width < 750px)");
    media.addEventListener("change", (e) => {
      if (e.matches) {
        menu.setAttribute("popover", "");
        menu.classList.add("is-popover");
        menu.classList.add("theme-light");
      } else {
        menu.removeAttribute("popover");
        menu.classList.remove("is-popover");
        menu.classList.remove("theme-light");
      }
    });

    if (media.matches) {
      menu.setAttribute("popover", "");
      menu.classList.add("is-popover");
      menu.classList.add("theme-light");
    }
  }
}
