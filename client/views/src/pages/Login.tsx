import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  return (
    <div className="">
      <h1>
        Sign in to <span className="text-lg font-pacifico">IGotYou</span>
      </h1>
      <form>
        <Label htmlFor="email">Email</Label>
        <Input type="text" />
        <Label htmlFor="password">Password</Label>
        <Input type="password" />
        <Button variant={"secondary"}>Sign in</Button>
      </form>
    </div>
  );
}

export default Login;
