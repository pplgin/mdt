
/**
 * 
 * @param {*} node 
 */
export function isHTMLElement(node: any): boolean {
	return node instanceof window.HTMLElement;
}
/**
 * 
 * @param {*} w 
 */
const isFirefox = (w: any): boolean => typeof w.InstallTrigger !== 'undefined';
/**
 * 
 * @param {*} element 
 */
export function getNodeName(element: any): string {
	return element ? (element.nodeName || '').toLowerCase() : '';
}
/**
 * 
 * @param {*} element 
 */
export function isTableElement(element: any): boolean {
	return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}
/**
 * 
 * @param {*} element 
 */
export function getComputedStyle(element: HTMLElement): CSSStyleDeclaration {
	return window.getComputedStyle(element);
}
/**
 * 
 * @param {*} element 
 */
function getTrueOffsetParent(element: any) {
	let offsetParent;

	if (
		!isHTMLElement(element) ||
		!(offsetParent = element.offsetParent) ||
		(isFirefox(window) && getComputedStyle(offsetParent).position === 'fixed')
	) {
		return null;
	}

	return offsetParent;
}
/**
 * 
 * @param {*} element 
 */
export function getOffsetParent(element: HTMLElement) {
	let offsetParent = getTrueOffsetParent(element);

	// Find the nearest non-table offsetParent
	while (offsetParent && isTableElement(offsetParent)) {
		offsetParent = getTrueOffsetParent(offsetParent);
	}

	if (
		offsetParent &&
		getNodeName(offsetParent) === 'body' &&
		getComputedStyle(offsetParent).position === 'static'
	) {
		return window;
	}

	return offsetParent || window;
}