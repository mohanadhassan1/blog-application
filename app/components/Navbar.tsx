import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full relative flex items-center justify-between max-w-2xl mx-auto px-4 py-5">
      <Link href="/" className="font-bold text-3xl">
        Mohanad<span className="text-primary">Blog</span>
      </Link>
      <Link href="/create" className="font-bold text-3xl">
        <Button variant="outline" size="icon">
          <Plus />
        </Button>
      </Link>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
