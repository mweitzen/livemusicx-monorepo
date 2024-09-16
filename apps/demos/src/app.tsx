import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { routes } from "./main";

export const AppDashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center font-semibold tracking-tight text-xl">
        Live Music X - Client-Side Demos
      </h1>
      {routes.map((route) => (
        <Button key={route.path} variant="outline" size="lg" asChild>
          <Link to={route.path}>{route.name}</Link>
        </Button>
      ))}
    </div>
  );
};
