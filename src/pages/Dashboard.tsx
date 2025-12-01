import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useCmsContent } from "@/hooks/useCmsContent";
import { ArrowLeft, Save, Image as ImageIcon, Settings, Layout, Tag, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Section = "site_info" | "hero_slider" | "collections" | "promo_banner";

const sections: { id: Section; label: string; icon: any }[] = [
  { id: "site_info", label: "Site Info", icon: Settings },
  { id: "hero_slider", label: "Hero Slider", icon: Layout },
  { id: "collections", label: "Collections", icon: Tag },
  { id: "promo_banner", label: "Promo Banner", icon: MessageSquare },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<Section>("site_info");
  const { data: allContent, isLoading } = useCmsContent();
  const { updateContent, isUpdating } = useCmsContent();

  const currentContent = Array.isArray(allContent)
    ? (allContent as any[]).find((item: any) => item.section === selectedSection)
    : selectedSection === (allContent as any)?.section
    ? allContent
    : null;

  const [formData, setFormData] = useState<any>(currentContent?.content || {});

  const handleSave = () => {
    updateContent({
      section: selectedSection,
      content: formData,
    });
  };

  const renderSectionEditor = () => {
    if (isLoading) {
      return <div className="p-8 text-center text-muted-foreground">Loading...</div>;
    }

    const content = (currentContent as any)?.content || {};

    switch (selectedSection) {
      case "site_info":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                value={formData.logo || content.logo || ""}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                placeholder="Enter logo image URL"
              />
              {(formData.logo || content.logo) && (
                <img
                  src={formData.logo || content.logo}
                  alt="Logo preview"
                  className="mt-2 h-16 w-16 object-contain border rounded"
                />
              )}
            </div>
            <div>
              <Label htmlFor="title">Site Title</Label>
              <Input
                id="title"
                value={formData.title || content.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter site title"
              />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={formData.tagline || content.tagline || ""}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="Enter tagline"
              />
            </div>
          </div>
        );

      case "hero_slider":
        const slides = formData.slides || content.slides || [];
        return (
          <div className="space-y-6">
            {slides.map((slide: any, index: number) => (
              <Card key={index} className="p-4 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Slide {index + 1}
                </h3>
                <div>
                  <Label>Desktop Image URL</Label>
                  <Input
                    value={slide.image || ""}
                    onChange={(e) => {
                      const newSlides = [...slides];
                      newSlides[index] = { ...slide, image: e.target.value };
                      setFormData({ ...formData, slides: newSlides });
                    }}
                    placeholder="Desktop image URL"
                  />
                  {slide.image && (
                    <img
                      src={slide.image}
                      alt={`Slide ${index + 1} preview`}
                      className="mt-2 h-24 w-auto object-cover border rounded"
                    />
                  )}
                </div>
                <div>
                  <Label>Mobile Image URL</Label>
                  <Input
                    value={slide.mobileImage || ""}
                    onChange={(e) => {
                      const newSlides = [...slides];
                      newSlides[index] = { ...slide, mobileImage: e.target.value };
                      setFormData({ ...formData, slides: newSlides });
                    }}
                    placeholder="Mobile image URL"
                  />
                  {slide.mobileImage && (
                    <img
                      src={slide.mobileImage}
                      alt={`Mobile slide ${index + 1} preview`}
                      className="mt-2 h-24 w-auto object-cover border rounded"
                    />
                  )}
                </div>
                <div>
                  <Label>Alt Text</Label>
                  <Input
                    value={slide.alt || ""}
                    onChange={(e) => {
                      const newSlides = [...slides];
                      newSlides[index] = { ...slide, alt: e.target.value };
                      setFormData({ ...formData, slides: newSlides });
                    }}
                    placeholder="Image description"
                  />
                </div>
              </Card>
            ))}
          </div>
        );

      case "collections":
        const collections = formData.collections || content.collections || [];
        return (
          <div className="space-y-6">
            {collections.map((collection: any, index: number) => (
              <Card key={index} className="p-4 space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Collection {index + 1}
                </h3>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={collection.title || ""}
                    onChange={(e) => {
                      const newCollections = [...collections];
                      newCollections[index] = { ...collection, title: e.target.value };
                      setFormData({ ...formData, collections: newCollections });
                    }}
                    placeholder="Collection title"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={collection.description || ""}
                    onChange={(e) => {
                      const newCollections = [...collections];
                      newCollections[index] = { ...collection, description: e.target.value };
                      setFormData({ ...formData, collections: newCollections });
                    }}
                    placeholder="Collection description"
                  />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={collection.image || ""}
                    onChange={(e) => {
                      const newCollections = [...collections];
                      newCollections[index] = { ...collection, image: e.target.value };
                      setFormData({ ...formData, collections: newCollections });
                    }}
                    placeholder="Image URL"
                  />
                  {collection.image && (
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="mt-2 h-32 w-auto object-cover border rounded"
                    />
                  )}
                </div>
                <div>
                  <Label>Image Alt Text</Label>
                  <Input
                    value={collection.imageAlt || ""}
                    onChange={(e) => {
                      const newCollections = [...collections];
                      newCollections[index] = { ...collection, imageAlt: e.target.value };
                      setFormData({ ...formData, collections: newCollections });
                    }}
                    placeholder="Image description for accessibility"
                  />
                </div>
              </Card>
            ))}
          </div>
        );

      case "promo_banner":
        const messages = formData.messages || content.messages || [];
        return (
          <div className="space-y-6">
            <div>
              <Label>Promo Messages (one per line)</Label>
              <Textarea
                value={messages.join("\n")}
                onChange={(e) => {
                  const newMessages = e.target.value.split("\n").filter((m) => m.trim());
                  setFormData({ ...formData, messages: newMessages });
                }}
                placeholder="Enter promotional messages, one per line"
                rows={8}
              />
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Preview:</p>
              <div className="flex gap-4 overflow-x-auto">
                {messages.map((msg: string, i: number) => (
                  <div key={i} className="whitespace-nowrap text-sm">
                    ✦ {msg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Update form data when section or content changes
  useState(() => {
    setFormData(currentContent?.content || {});
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-serif font-bold text-foreground">CMS Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage website content</p>
              </div>
            </div>
            <Button onClick={handleSave} disabled={isUpdating}>
              <Save className="h-4 w-4 mr-2" />
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Sidebar - Sections */}
          <div className="md:col-span-1">
            <Card className="p-4">
              <h2 className="font-semibold mb-4">Sections</h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        setSelectedSection(section.id);
                        setFormData(
                          Array.isArray(allContent)
                            ? (allContent as any[]).find((item: any) => item.section === section.id)?.content || {}
                            : {}
                        );
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        selectedSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Right Content - Editor */}
          <div className="md:col-span-3">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                {sections.find((s) => s.id === selectedSection)?.label}
              </h2>
              {renderSectionEditor()}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
