import { createContext, JSX, Resource, useContext } from 'solid-js';

export type Mode = 'VAPORWAVE' | 'EVA-02';

let Context = createContext<Resource<Mode> | undefined>();

export default function ThemeProvider(props: {
	children?: JSX.Element;
	value: Resource<Mode> | undefined;
}) {
	return (
		<Context.Provider value={props.value}>{props.children}</Context.Provider>
	);
}

export function useTheme() {
	return useContext(Context);
}
