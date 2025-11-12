import { useEffect, useRef } from "react";

const promoMessages = [
  "Handwoven Kanchipuram Sarees",
  "Authentic South Indian Weaves",
  "Exclusive Temple Jewellery Collections",
  "Designer Sarees for Every Occasion",
  "Free Shipping on Orders Above ₹1999",
  "Limited Stock – Grab Yours Now!",
];

export const PromoBar = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollAmount;
        
        // Reset scroll when reaching the end (considering duplicated content)
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
        {/* Duplicate messages for seamless loop */}
        {[...promoMessages, ...promoMessages].map((message, index) => (
          <div key={index} className="flex items-center gap-2 whitespace-nowrap px-4">
            <span className="text-accent">✦</span>
            <span className="text-sm md:text-base font-medium">{message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
