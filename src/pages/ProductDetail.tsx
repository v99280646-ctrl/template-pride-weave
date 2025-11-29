import { ArrowLeft, Heart, Share2, ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCatalogueProductDetailsApi, ProductDetail as ProductDetailType } from "@/services/api";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id: productSlug } = useParams();
  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productSlug) return;
      
      try {
        const response = await getCatalogueProductDetailsApi(productSlug);
        const data = response?.data;
        if (data) {
          setProduct(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

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
          src={product.images[0] || ""}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {product.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Category: {product.categoryId.name}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          {product.pricing.discountPercentage > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground line-through">
                AED {product.pricing.basePrice}
              </span>
              <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded">
                {product.pricing.discountPercentage}% OFF
              </span>
            </div>
          )}
          <span className="text-3xl font-bold text-primary">
            AED {product.pricing.salePrice}
          </span>
        </div>

        {product.description && (
          <div className="prose prose-sm">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-line">
              {product.description}
            </p>
          </div>
        )}

        {product.variants && product.variants.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{product.variantTitle || "Variants"}</h3>
            <div className="space-y-2">
              {product.variants.map((variant) => (
                <div key={variant._id} className="flex justify-between items-center p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">{variant.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Stock: {variant.stock}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      AED {variant.salePrice}
                    </p>
                    {variant.basePrice > variant.salePrice && (
                      <p className="text-sm text-muted-foreground line-through">
                        AED {variant.basePrice}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Details</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Stock Status:</span>
              <span className="font-medium">{product.inventory.stockStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Available Quantity:</span>
              <span className="font-medium">{product.inventory.totalQuantity}</span>
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
                  title: product.name,
                  price: product.pricing.salePrice.toString(),
                  originalPrice: product.pricing.basePrice.toString(),
                  image: product.images[0] || "",
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
