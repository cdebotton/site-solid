import { createServerAction$ } from 'solid-start/server';

import Button from '~/components/Button';

export default function Login() {
	let [action, { Form }] = createServerAction$(async (formData: FormData) => {
		let email = formData.get('email') as string;
		let password = formData.get('password') as string;

		return new Response();
	});

	return (
		<div>
			<h2>Login</h2>
			<Form>
				<input name="email" />
				<input name="password" />
				<Button disabled={action.pending} type="submit">
					Login
				</Button>
			</Form>
		</div>
	);
}
