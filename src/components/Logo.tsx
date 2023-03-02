import { JSX } from 'solid-js';

export default function Logo() {
	return (
		<h1 class="inline-flex flex-col items-center">
			<Japanese>クリスチャン・デボットン</Japanese>
			<English>Christian</English>
			<English>
				<Small>de</Small> Botton
			</English>
		</h1>
	);
}

function Japanese(props: { children?: JSX.Element }) {
	return (
		<span lang="ja" class="text-sm">
			{props.children}
		</span>
	);
}

function English(props: { children?: JSX.Element }) {
	return (
		<span class="bg-[attachment:fixed] animate-[bg-scroll-x_7s_linear_infinite_alternate] bg-gradient-to-br bg-[size:400vw_400vh] bg-clip-text text-4xl font-black uppercase leading-[0.82] text-[transparent] vapor:from-blue-dark-9 vapor:via-purple-dark-9 vapor:to-blue-dark-9 eva:from-red-9 eva:via-orange-9 eva:to-red-9">
			{props.children}
		</span>
	);
}

function Small(props: { children?: JSX.Element }) {
	return (
		<small class="mx-1 vapor:text-plum-dark-12 eva:text-red-12">
			{props.children}
		</small>
	);
}
