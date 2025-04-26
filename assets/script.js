import Navigator from "./vendor/page-loader.js";
import MenuButton from "./menu-button.js";

// Register the custom element
customElements.define("menu-button", MenuButton);

const nav = new Navigator();

nav.links(async ({ load, event, submitter }) => {
  const circle = submitter.classList.contains("js-transition");
  let page;

  if (circle) {
    submitter.classList.add("is-transitioning");
    const svg = createSvg(event.clientX, event.clientY, "red");
    svg.classList.add("transition-circle");

    document.querySelectorAll(".navigation-item").forEach((item) => {
      if (!item.contains(submitter)) {
        item.style.opacity = 0;
      }
    });

    if (submitter.classList.contains("theme-dark")) {
      svg.classList.add("theme-dark");
    } else {
      svg.classList.add("theme-light");
    }

    document.body.appendChild(svg);

    const animation = new Promise((resolved) => {
      const anim = svg.firstElementChild.animate([
        { transform: "scale(.01)" },
        { transform: "scale(1)" },
      ], {
        duration: 666,
        easing: "ease-out",
        fill: "both",
      });

      anim.onfinish = resolved;
    });

    [page] = await Promise.all([
      load(),
      animation,
    ]);
  } else {
    page = await load();
  }

  await page.replaceStyles(); //Load the new css styles defined in <head> not present currently
  await page.replaceScripts(); //Load the new js files defined in <head> not present currently
  await page.replaceContent(); //Replace the <body> element
  await page.updateState(); //Update the page status (change url, title etc)
  await page.resetScroll(); //Reset the scroll position
});

function createSvg(x, y) {
  const width = innerWidth;
  const height = innerHeight;
  const svg = createNode("svg", {
    width,
    height,
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: "none",
  });

  const r = Math.max(
    Math.hypot(x, y),
    Math.hypot(x, height - y),
    Math.hypot(width - x, y),
    Math.hypot(width - x, height - y),
  );

  svg.appendChild(createNode("circle", {
    cx: x,
    cy: y,
    r: r,
    style: {
      "transform-origin": `${x}px ${y}px`,
    },
  }));

  return svg;
}

function createNode(name, properties = {}) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name);

  Object.keys(properties).forEach((name) => {
    if (name === "style") {
      Object.keys(properties[name]).forEach((propName) =>
        node.style[propName] = properties[name][propName]
      );

      return;
    }

    node.setAttributeNS(null, name, properties[name]);
  });

  return node;
}
