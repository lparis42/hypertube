import withProtection from "@/hoc/withProtection/withProtection";

function Library() {
	return (
		<div>
			<span>Welcome to library!</span>
		</div>
	);
}

const ProtectedLibrary = withProtection(Library, { authenticated: true, fallback: '/signin' });

export default ProtectedLibrary;