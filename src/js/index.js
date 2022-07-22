// Declare dom & tools again to prevent Lint errors
const tools = window.tools;
const dom = window.dom;

const objMgr = tools.object;

setup();

function setup() {
	configureApp();
	installAnimations();
	getHTMLSnippet("views/template.html");
}

function configureApp() {
	fetch("/getSystemConfig")
		.then((resp) => resp.json())
		.then((jsonData) => {
			if (jsonData) objMgr.save(jsonData, "sysConfig");
		});
}

function installAnimations() {
	const bodyTag = dom.getTag("body");

	const isoSVG = dom.getTag("home-container");
	isoSVG.addEventListener("mouseenter", () => {
		dom.addClass(bodyTag, "black");
	});
	isoSVG.addEventListener("mouseleave", () => {
		dom.removeClass(bodyTag, "black");
	});

	const cursorRounded = dom.getTag("custom-cursor");
	const moveCursor = (e) => {
		const mouseY = e.clientY;
		const mouseX = e.clientX;

		cursorRounded.style.left = `${mouseX}px`;
		cursorRounded.style.top = `${mouseY}px`;
	};
	window.addEventListener("mousemove", moveCursor);
}

function getHTMLSnippet(path) {
	fetch(`/getFile?path=${path}`)
		.then((resp) => resp.text())
		.then(() => {
			//if (html) dom.append("home-container", html);
		});
}
