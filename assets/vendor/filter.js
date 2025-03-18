export default class Filter extends HTMLElement {
  connectedCallback() {
    const form = this.querySelector("form");
    const items = this.querySelectorAll(":scope > ul > li");

    form.addEventListener("submit", (event) => {
      onChange();
      event.preventDefault();
    });
    form.addEventListener("input", onChange);

    onChange();

    function onChange() {
      const data = new FormData(form);
      filter(data);
      const permalink = new URLSearchParams(data).toString();

      if (permalink !== document.location.search) {
        const newUrl = permalink ? `?${permalink}` : document.location.pathname;
        history.pushState({}, null, newUrl);
      }
    }

    function filter(data) {
      const filters = Array.from(data.values());

      if (!filters.length) {
        items.forEach((item) => item.hidden = false);
        return;
      }

      const max = filters.length;
      const matches = Array.from(items).map((item) => [item, max]);

      for (const [, value] of data.entries()) {
        for (const match of matches) {
          if (match[0].matches(value)) {
            match[1]--;
          }
        }
      }

      for (const [item, count] of matches) {
        item.hidden = count === max;
      }
    }
  }
}
