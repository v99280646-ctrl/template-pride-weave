import { ArrowLeft, Heart, Share2, ShoppingCart, MessageCircle, ChevronLeft, ChevronRight, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/Header.dynamic";
import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";
import saree3 from "@/assets/saree-3.jpg";
import saree4 from "@/assets/saree-4.jpg";

const productImages = [saree1, saree2, saree3, saree4];

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border lg:hidden">
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
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Add to wishlist"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Share">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <Header />
      </div>

      {/* Main Content */}
      <div className="lg:container lg:mx-auto lg:px-6 lg:py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          
          {/* Image Gallery */}
          <div className="relative">
            {/* Mobile Image */}
            <div className="w-full aspect-square bg-muted lg:hidden">
              <img
                src={productImages[selectedImage]}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Desktop Image Gallery */}
            <div className="hidden lg:block">
              {/* Main Image */}
              <div className="relative aspect-[4/5] bg-muted rounded-2xl overflow-hidden group">
                <img
                  src={productImages[selectedImage]}
                  alt="Product"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {selectedImage + 1} / {productImages.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-3 mt-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-24 rounded-lg overflow-hidden transition-all ${
                      selectedImage === index 
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-4 lg:p-0 space-y-6 pb-28 lg:pb-8">
            {/* Title & Actions */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-primary font-medium mb-2 uppercase tracking-wide">Kanchipuram Collection</p>
                <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground">
                  Traditional Kanchipuram Silk Saree
                </h1>
                <p className="text-sm text-muted-foreground mt-2">SKU: KPS-001</p>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-4 w-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(42 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground line-through">
                  AED 2,999
                </span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                  20% OFF
                </span>
              </div>
              <span className="text-3xl lg:text-4xl font-bold text-primary">AED 2,399</span>
              <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                Exquisite handwoven Kanchipuram silk saree featuring traditional temple border designs. 
                This premium quality saree is perfect for weddings, festivals, and special occasions. 
                Each piece is meticulously crafted by skilled artisans using age-old techniques passed down through generations.
              </p>
            </div>

            {/* Product Details Grid */}
            <div className="bg-muted/50 rounded-xl p-4 lg:p-6">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Fabric</span>
                  <p className="font-medium">Pure Silk</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Length</span>
                  <p className="font-medium">6.3 meters</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Blouse Piece</span>
                  <p className="font-medium">Included (0.8m)</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Care</span>
                  <p className="font-medium">Dry Clean Only</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Origin</span>
                  <p className="font-medium">Kanchipuram, India</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-muted-foreground">Weave Type</span>
                  <p className="font-medium">Handwoven</p>
                </div>
              </div>
            </div>

            {/* Trust Badges - Desktop */}
            <div className="hidden lg:grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders above AED 500</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Authentic Product</p>
                  <p className="text-xs text-muted-foreground">100% Genuine</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                <div className="p-2 bg-primary/10 rounded-full">
                  <RotateCcw className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">7 days return policy</p>
                </div>
              </div>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex gap-4 pt-4">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 h-14 text-base"
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
                Chat with Us
              </Button>
              <Button size="lg" className="flex-1 h-14 text-base">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50 lg:hidden">
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