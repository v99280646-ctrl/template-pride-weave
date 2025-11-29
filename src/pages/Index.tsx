import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { HeroSlider } from "@/components/HeroSlider";
import { PromoBar } from "@/components/PromoBar";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { getPublishedWebCatalogueByAccountTypeId, getPublishedWebProductsByCatalogueId, Catalogue, Product } from "@/services/api";

// Import product images
import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";
import saree3 from "@/assets/saree-3.jpg";
import saree4 from "@/assets/saree-4.jpg";
import saree5 from "@/assets/saree-5.jpg";
import saree6 from "@/assets/saree-6.jpg";
import jewellery1 from "@/assets/jewellery-1.webp";
import jewellery2 from "@/assets/jewellery-2.webp";
import jewellery3 from "@/assets/jewellery-3.webp";
import jewellery4 from "@/assets/jewellery-4.webp";
import jewellery5 from "@/assets/jewellery-5.webp";
import jewellery6 from "@/assets/jewellery-6.webp";
import pattuCategory from "@/assets/pattu-saree-category.jpg";
import designerCategory from "@/assets/designer-saree-category.jpg";

const categories = [
  {
    title: "Pattu Saree Collection",
    description: "Handcrafted pure silk sarees with traditional zari work and vibrant designs",
    image: pattuCategory,
    imageAlt: "Traditional Kanchipuram Silk Sarees",
  },
  {
    title: "Jewellery Collection",
    description: "Authentic temple jewellery and exquisite designs inspired by South Indian heritage",
    image: jewellery1,
    imageAlt: "Traditional Temple Jewellery",
  },
  {
    title: "Designer Sarees",
    description: "Contemporary designs with traditional craftsmanship for modern celebrations",
    image: designerCategory,
    imageAlt: "Designer Silk Sarees",
  },
];

const products = [
  {
    title: "Traditional Kanchipuram Silk Saree with Zari Border",
    price: "8,999",
    originalPrice: "12,999",
    image: saree1,
    imageAlt: "Traditional Kanchipuram Silk Saree",
  },
  {
    title: "Royal Red Kanchipuram Silk Saree with Gold Zari",
    price: "10,500",
    image: saree2,
    imageAlt: "Royal Red Kanchipuram Silk Saree",
  },
  {
    title: "Elegant Green Silk Saree with Traditional Border",
    price: "9,200",
    originalPrice: "13,500",
    image: saree3,
    imageAlt: "Elegant Green Silk Saree",
  },
  {
    title: "Premium Purple Kanchipuram Silk Saree",
    price: "11,999",
    image: saree4,
    imageAlt: "Premium Purple Kanchipuram Silk Saree",
  },
  {
    title: "Classic Maroon Silk Saree with Gold Motifs",
    price: "8,500",
    originalPrice: "11,000",
    image: saree5,
    imageAlt: "Classic Maroon Silk Saree",
  },
  {
    title: "Bridal Pink Kanchipuram Silk Saree",
    price: "15,999",
    image: saree6,
    imageAlt: "Bridal Pink Kanchipuram Silk Saree",
  },
  {
    title: "Temple Jewellery Necklace Set - Antique Gold",
    price: "4,999",
    originalPrice: "6,999",
    image: jewellery1,
    imageAlt: "Temple Jewellery Necklace Set",
  },
  {
    title: "Traditional Gold Plated Choker Necklace",
    price: "3,500",
    image: jewellery2,
    imageAlt: "Traditional Gold Plated Choker",
  },
  {
    title: "Kundan Temple Jewellery Necklace Set",
    price: "5,999",
    originalPrice: "8,500",
    image: jewellery3,
    imageAlt: "Kundan Temple Jewellery Set",
  },
  {
    title: "South Indian Bridal Jewellery Collection",
    price: "12,999",
    image: jewellery4,
    imageAlt: "South Indian Bridal Jewellery",
  },
  {
    title: "Antique Temple Jewellery Haram Set",
    price: "6,500",
    originalPrice: "9,000",
    image: jewellery5,
    imageAlt: "Antique Temple Jewellery Haram",
  },
  {
    title: "Designer Temple Jewellery Necklace",
    price: "4,200",
    image: jewellery6,
    imageAlt: "Designer Temple Jewellery Necklace",
  },
];

const Index = () => {
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catalogueResponse = await getPublishedWebCatalogueByAccountTypeId();
        const cataloguesData = catalogueResponse.data || [];
        setCatalogues(cataloguesData);

        if (cataloguesData.length > 0) {
          const productsResponse = await getPublishedWebProductsByCatalogueId({
            catalogId: cataloguesData[0]._id,
            limit: 8,
          });
          setProducts(productsResponse.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <Header />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Promo Bar */}
      <PromoBar />

      {/* Collections Section */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-3">
              Our Collections
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collections
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-muted h-64 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {catalogues.map((catalogue) => (
                <CategoryCard
                  key={catalogue._id}
                  title={catalogue.name}
                  description={`${catalogue.totalProducts} Products`}
                  image={catalogue.image}
                  imageAlt={catalogue.name}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-3">
              Featured Products
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked selections from our latest collections
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-muted h-80 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  slug={product.slug}
                  title={product.name}
                  price={product.pricing.salePrice.toString()}
                  originalPrice={product.pricing.basePrice.toString()}
                  image={product.images[0] || ""}
                  imageAlt={product.name}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif font-bold text-lg mb-4">Kanchi Pride</h3>
              <p className="text-sm text-muted-foreground">
                Bringing authentic Kanchipuram traditions to your doorstep
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Collections</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Pattu Sarees</li>
                <li>Jewellery</li>
                <li>Designer Sarees</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Our Story</li>
                <li>Our Artisans</li>
                <li>Quality Promise</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>contact@kanchipride.com</li>
                <li>+91 XXX XXX XXXX</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Kanchi Pride. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default Index;
