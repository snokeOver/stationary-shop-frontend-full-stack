import { LogInForm } from "@/components/form/LoginForm";

const Login = () => {
  return (
    <div className="relative flex h-full min-h-[100vh] flex-col">
      <div
        className="relative w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        {/* Dark Overlay to Make Text More Visible */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

        {/* Login Form */}
        <div className="relative z-20 flex h-screen items-center justify-center">
          <div className="bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-lg">
            <LogInForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
