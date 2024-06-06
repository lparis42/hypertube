import withProtection from "@/hoc/withProtection/withProtection";

function Home() {
	return (
		<div>
			<span>Home page!</span>
		</div>
	);
}

const ProtectedHome = withProtection(Home, { authenticated: true, fallback: '/signin' });

export default ProtectedHome;