import { MeshTransmissionMaterial } from '@pmndrs/vanilla';
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import * as THREE from 'three';
import { PCFSoftShadowMap } from 'three';

type Size = [width: number, height: number];

export default function Background(props: { class?: string }) {
	let canvas!: HTMLCanvasElement;
	let container!: HTMLDivElement;
	let resizeObserver: ResizeObserver | null = null;

	let [size, setSize] = createSignal<Size>([0, 0]);

	let renderer: THREE.WebGLRenderer | null = null;
	let scene = new THREE.Scene();
	let camera = new THREE.OrthographicCamera();

	camera.position.set(10, 20, 20);
	camera.lookAt(0, 0, 0);

	let ambientLight = new THREE.AmbientLight('white', 0.4);
	let pointLight = new THREE.PointLight('white', 0.8);

	let planet = new THREE.Group();

	let box = new THREE.Mesh(
		new THREE.BoxGeometry(4, 4, 4),
		new MeshTransmissionMaterial(8),
	);

	box.material.transparent = true;
	box.material.transmission = 1.0;
	box.material.color = new THREE.Color('white');

	let orb = new THREE.Mesh(
		new THREE.SphereGeometry(2),
		new THREE.MeshToonMaterial({ color: 'hotpink' }),
	);

	planet.add(box, orb);

	let moons = new THREE.InstancedMesh(
		new THREE.SphereGeometry(),
		new THREE.MeshBasicMaterial(),
		750,
	);
	let dummyMoon = new THREE.Object3D();

	let moonData = Array.from({ length: 750 }, () => {
		let distance = Math.random() * 8;
		return {
			scale: Math.random() * 0.5 + 0.1,
			seed: Math.random() * 54127,
			distance,
			speed: distance / 10,
		};
	});

	let gridHelper = new THREE.GridHelper(100, 100);
	let plane = new THREE.Mesh(
		new THREE.PlaneGeometry(100, 100),
		new THREE.ShadowMaterial({
			color: 'black',
			transparent: true,
			opacity: 0.5,
		}),
	);

	planet.castShadow = true;
	pointLight.castShadow = true;
	plane.receiveShadow = true;

	gridHelper.position.setY(-4);
	plane.position.setY(-4);
	planet.position.set(0, 0, 0);
	pointLight.position.set(-4, 4, 4);

	plane.rotation.set(Math.PI / -2, 0, 0);

	scene.add(ambientLight, pointLight, planet, moons, plane, gridHelper);

	onMount(() => {
		renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: false,
			alpha: true,
		});

		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = PCFSoftShadowMap;
		renderer.pixelRatio = devicePixelRatio;
		renderer.render(scene, camera);

		resizeObserver = new ResizeObserver(([{ target }]) => {
			setSize([target.clientWidth, target.clientHeight]);
		});
		resizeObserver.observe(container);

		tick();
	});

	let clock = new THREE.Clock();

	function tick() {
		let t = clock.getElapsedTime();
		requestAnimationFrame(tick);
		setRotation({ x: Math.sin(t), z: Math.cos(t) });
		renderer?.render(scene, camera);

		moonData.forEach(({ speed, seed, scale, distance }, i) => {
			let t1 = t * speed + seed;

			dummyMoon.position.set(
				Math.sin(t1) * (distance + 5),
				0,
				Math.cos(t1) * (distance + 5),
			);
			dummyMoon.scale.setScalar(scale);

			dummyMoon.updateMatrix();

			moons.setMatrixAt(i, dummyMoon.matrix);
		});

		moons.instanceMatrix.needsUpdate = true;
	}

	onCleanup(() => {
		resizeObserver?.disconnect();
		resizeObserver = null;
	});

	let [rotation, setRotation] = createSignal({ x: 0, z: 0 });

	createEffect(() => {
		planet.rotation.x = rotation().x;
		planet.rotation.z = rotation().z;
	});

	const frustum = 10;

	createEffect(() => {
		let [width, height] = size();
		let aspect = width / height;

		renderer?.setSize(width, height);

		camera.top = frustum;
		camera.bottom = -1 * frustum;
		camera.left = -1 * aspect * frustum;
		camera.right = aspect * frustum;

		camera.updateProjectionMatrix();
	});

	return (
		<div ref={container} class={props.class}>
			<canvas ref={canvas} class="absolute inset-0" />
		</div>
	);
}
