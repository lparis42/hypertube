import withProtection from "@/hoc/withProtection/withProtection";
import useSession from "@/hooks/session.hook";

function Home() {
	const { session } = useSession();

	return (
		<div>
			<span>Hello {session?.first_name}!</span>
		</div>
	);
}

const ProtectedHome = withProtection(Home, { authenticated: true, fallback: '/signin' });

export default ProtectedHome;