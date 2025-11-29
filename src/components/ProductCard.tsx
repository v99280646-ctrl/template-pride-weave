import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  slug: string;
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  imageAlt: string;
}

export const ProductCard = ({ slug, title, price, originalPrice, image, imageAlt }: ProductCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/product/${slug}`)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-card/90 hover:bg-card backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Quick Add Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-medium text-foreground line-clamp-2 min-h-[3rem]">
          {title}
        </h3>
        
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-1 md:gap-2">
          <span className="text-xl font-bold text-primary">AED {price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              AED {originalPrice}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
