import { createRenderer } from 'solid-js/universal';
import * as THREE from 'three';

type Element = HTMLUnknownElement | THREE.Object3D;

type Three = typeof THREE;
type THREEKey = keyof Three;

function isThreeKey(name: string): name is THREEKey {
	return Object.hasOwn(THREE, name);
}

function getFromThree<T extends string>(
	name: T,
): T extends keyof Three ? Three[T] : never {
	if (isThreeKey(name)) {
		return new THREE[name]();
	}
	throw new Error('!');
}

function createInstance(node: HTMLUnknownElement) {
	console.log(node.localName);
	let name = node.localName[0].toUpperCase() + node.localName.slice(1);
	return getFromThree(name);
}

function isObject3D(obj: Element): obj is THREE.Object3D {
	return (
		Object.hasOwn(obj, 'isObject3D') &&
		(obj as THREE.Object3D).isObject3D === true
	);
}

export let {
	render,
	effect,
	memo,
	createComponent,
	createElement,
	createTextNode,
	insertNode,
	insert,
	spread,
	setProp,
	mergeProps,
} = createRenderer<Element>({
	createElement: function (tag: string): Element {
		throw new Error('createElement not implemented.');
	},
	createTextNode: function (value: string): Element {
		throw new Error('createTextNode not implemented.');
	},
	replaceText: function (textNode: Element, value: string): void {
		throw new Error('replaceText not implemented.');
	},
	isTextNode: function (node: Element): boolean {
		throw new Error('isTextNode not implemented.');
	},
	setProperty: function <T>(
		node: Element,
		name: string,
		value: T,
		prev?: T | undefined,
	): void {
		throw new Error('setProperty not implemented.');
	},
	insertNode: function (
		parent: Element,
		node: Element,
		anchor?: Element | undefined,
	): void {
		let instance = createInstance(node);
		if (isObject3D(parent)) {
			parent.add(instance);
		}
		console.log(node.children);
		if (node.children instanceof HTMLCollection) {
			for (let child of node.children) {
				insertNode(instance, child);
			}
		}
	},
	removeNode: function (parent: Element, node: Element): void {
		throw new Error('removeNode not implemented.');
	},
	getParentNode: function (node: Element): Element | undefined {
		throw new Error('getParentNode not implemented.');
	},
	getFirstChild: function (node: Element): Element | undefined {
		throw new Error('getFirstChild not implemented.');
	},
	getNextSibling: function (node: Element): Element | undefined {
		throw new Error('getNextSibling not implemented.');
	},
});
