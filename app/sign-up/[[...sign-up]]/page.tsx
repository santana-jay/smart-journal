import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
    return <SignUp afterSignUpUrl='/journal' redirectUrl='/journal' />;
}

export default SignUpPage;
