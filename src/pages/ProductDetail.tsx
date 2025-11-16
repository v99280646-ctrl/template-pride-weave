import { ArrowLeft, Heart, Share2, ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import saree1 from "@/assets/saree-1.jpg";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Add to wishlist">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Share">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Product Image */}
      <div className="w-full aspect-square bg-muted">
        <img
          src={saree1}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Traditional Kanchipuram Silk Saree
          </h1>
          <p className="text-sm text-muted-foreground">SKU: KPS-001</p>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground line-through">
              AED 2,999
            </span>
            <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded">
              20% OFF
            </span>
          </div>
          <span className="text-3xl font-bold text-primary">AED 2,399</span>
        </div>

        <div className="prose prose-sm">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground">
            Exquisite handwoven Kanchipuram silk saree featuring traditional temple border designs. 
            This premium quality saree is perfect for weddings, festivals, and special occasions.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Details</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fabric:</span>
              <span className="font-medium">Pure Silk</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Length:</span>
              <span className="font-medium">6.3 meters</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Blouse:</span>
              <span className="font-medium">Included (0.8m)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Care:</span>
              <span className="font-medium">Dry Clean Only</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => navigate("/chat", {
              state: {
                product: {
                  title: "Traditional Kanchipuram Silk Saree",
                  price: "2,399",
                  originalPrice: "2,999"
                }
              }
            })}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Chat
          </Button>
          <Button size="lg" className="flex-1">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
