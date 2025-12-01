import { useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCmsContent } from "@/hooks/useCmsContent";
import logo from "@/assets/logo.png";

export const Header = () => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { data: siteInfo } = useCmsContent("site_info");

  const siteData = (siteInfo as any)?.content || { logo: logo, title: "Kanchi Pride", tagline: "Traditional Elegance" };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <img 
              src={siteData.logo} 
              alt={siteData.title} 
              className="h-10 w-10 md:h-12 md:w-12 object-contain" 
            />
            <div className="block">
              <h1 className="text-lg md:text-xl font-serif font-bold text-primary leading-none">
                {siteData.title}
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">{siteData.tagline}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 flex-1">
            <a href="#kanchipuram" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Kanchipuram Saree</a>
            <a href="#jewellery" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Jewellery</a>
            <a href="#designer" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Designer Saree</a>
            <a href="#reviews" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Customer Review</a>
          </nav>

          {/* Search Bar - Desktop & Tablet */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4 lg:max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for sarees, jewellery..."
                className="pl-10 bg-muted/50 border-border"
              />
            </div>
          </div>

          {/* Mobile Search Icon */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Desktop Cart */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                0
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar - Conditional */}
        {mobileSearchOpen && (
          <div className="md:hidden pb-3 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for sarees, jewellery..."
                className="pl-10 bg-muted/50 border-border"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
