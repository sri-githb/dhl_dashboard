import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

const Header = ({ username, onLogout }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary px-6 py-4 shadow-lg">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/DHL_Logo.svg" 
            alt="DHL Supply Chain" 
            className="h-10"
          />
          <span className="ml-3 text-primary-foreground font-semibold text-lg">Supply Chain</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-primary-foreground font-medium">
            Admin: {username}
          </span>
          <Button
            variant="secondary"
            onClick={onLogout}
            className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
