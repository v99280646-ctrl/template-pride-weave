import { CategoryCard } from "@/components/CategoryCard";
import { useCmsContent } from "@/hooks/useCmsContent";
import pattuCategory from "@/assets/pattu-saree-category.jpg";
import jewellery1 from "@/assets/jewellery-1.webp";
import designerCategory from "@/assets/designer-saree-category.jpg";

const defaultCategories = [
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

export const CollectionsSection = () => {
  const { data: collectionsData } = useCmsContent("collections");

  const categories = (collectionsData as any)?.content?.collections || defaultCategories;

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-3">
            Our Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collections of authentic Kanchipuram sarees and exquisite jewellery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category: any, index: number) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};
