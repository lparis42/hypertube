import withProtection from "@/hoc/withProtection/withProtection";
import useSession from "@/hooks/session.hook";

function Profile() {
	const { session } = useSession();

	return (
		<div>
			<span>Profile of {session?.first_name}!</span>
		</div>
	);
}

const ProtectedProfile = withProtection(Profile, { authenticated: true, fallback: '/signin' });

export default ProtectedProfile;