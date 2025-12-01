import { useEffect, useRef } from "react";
import { useCmsContent } from "@/hooks/useCmsContent";

const defaultMessages = [
  "Handwoven Kanchipuram Sarees",
  "Authentic South Indian Weaves",
  "Exclusive Temple Jewellery Collections",
];

export const PromoBar = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: promoData } = useCmsContent("promo_banner");

  const promoMessages = (promoData as any)?.content?.messages || defaultMessages;

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollAmount;
        
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
      }
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="bg-primary text-primary-foreground py-3 overflow-hidden border-b border-primary/20">
      <div
        ref={scrollRef}
        className="flex gap-8 md:gap-12 scrollbar-hide overflow-x-auto"
        style={{ scrollBehavior: "auto" }}
      >
        {[...promoMessages, ...promoMessages].map((message: string, index: number) => (
          <div key={index} className="flex items-center gap-2 whitespace-nowrap px-4">
            <span className="text-accent">✦</span>
            <span className="text-sm md:text-base font-medium">{message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
