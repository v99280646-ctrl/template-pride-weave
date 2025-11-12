import { Home, MessageCircle, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MobileNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
      <div className="flex items-center justify-around h-16 px-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex-col h-auto py-2 px-3 gap-1 flex-1"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-col h-auto py-2 px-3 gap-1 flex-1"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs">Chat</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-col h-auto py-2 px-3 gap-1 flex-1 relative"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="text-xs">Cart</span>
          <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium">
            0
          </span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-col h-auto py-2 px-3 gap-1 flex-1"
        >
          <User className="h-5 w-5" />
          <span className="text-xs">Account</span>
        </Button>
      </div>
    </nav>
  );
};
