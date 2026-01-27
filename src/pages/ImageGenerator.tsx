import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneratedImage {
  name: string;
  prompt: string;
  imageUrl: string | null;
  loading: boolean;
}

const ImageGenerator = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<GeneratedImage[]>([
    {
      name: "project-solar-1",
      prompt: "Photorealistic aerial view of a modern Canadian residential home with premium black solar panels installed on the roof, snow-capped Rocky Mountains in background, Calgary Alberta setting, warm evening light, professional architectural photography, 16:9 aspect ratio",
      imageUrl: null,
      loading: false
    },
    {
      name: "project-solar-2",
      prompt: "Photorealistic wide shot of a large commercial warehouse building with extensive solar panel array covering the entire roof, industrial setting in Southern Alberta prairie landscape, clear blue sky, professional commercial photography, high detail, 16:9 aspect ratio",
      imageUrl: null,
      loading: false
    },
    {
      name: "project-heatpump",
      prompt: "Photorealistic image of a modern air-source heat pump unit installed outside a luxury Canadian home, professional HVAC installation with clean mounting, winter setting with light snow, premium German engineering aesthetic, detailed industrial hardware, 16:9 aspect ratio",
      imageUrl: null,
      loading: false
    }
  ]);

  const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-image`;
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const pingFunction = async () => {
    try {
      const resp = await fetch(functionUrl, {
        method: "GET",
        headers: {
          // Provide keys explicitly for maximum compatibility across environments
          Authorization: `Bearer ${anonKey}`,
          apikey: anonKey,
        },
      });

      // Consume body (avoids resource leak warnings)
      const text = await resp.text();
      console.log("Ping response:", resp.status, text);

      if (!resp.ok) {
        throw new Error(`Ping failed (${resp.status})`);
      }
      return true;
    } catch (e) {
      console.error("Ping failed:", e);
      toast({
        title: "Keine Verbindung zur Backend-Funktion",
        description:
          "Der Browser kann die Funktion nicht erreichen (Netzwerk/CORS/Blocker). Bitte AdBlock/Privacy-Extensions testweise deaktivieren und neu laden.",
        variant: "destructive",
      });
      return false;
    }
  };

  const generateImage = async (index: number) => {
    console.log("Starting image generation for index:", index);
    
    setImages(prev => prev.map((img, i) => 
      i === index ? { ...img, loading: true } : img
    ));

    // First: verify we can reach the function without triggering any AI call/credits
    const ok = await pingFunction();
    if (!ok) {
      setImages(prev => prev.map((img, i) =>
        i === index ? { ...img, loading: false } : img
      ));
      return;
    }

    toast({
      title: "Generiere Bild...",
      description: `${images[index].name} wird mit Nano Banana erstellt.`,
    });

    try {
      console.log("Calling edge function with prompt:", images[index].prompt);
      
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { 
          prompt: images[index].prompt,
          aspectRatio: "16:9"
        }
      });

      console.log("Edge function response:", { data, error });

      if (error) throw error;

      if (!data?.imageUrl) {
        throw new Error("Kein Bild in der Antwort erhalten");
      }

      setImages(prev => prev.map((img, i) => 
        i === index ? { ...img, imageUrl: data.imageUrl, loading: false } : img
      ));

      toast({
        title: "Bild generiert!",
        description: `${images[index].name} wurde erfolgreich erstellt.`,
      });
    } catch (error) {
      console.error("Error generating image:", error);
      setImages(prev => prev.map((img, i) => 
        i === index ? { ...img, loading: false } : img
      ));
      
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : "Bild konnte nicht generiert werden.",
        variant: "destructive",
      });
    }
  };

  const generateAllImages = async () => {
    for (let i = 0; i < images.length; i++) {
      await generateImage(i);
    }
  };

  const downloadImage = (imageUrl: string, name: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-light text-architectural mb-4">
                NANO BANANA
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Generiere photorealistische Projektbilder mit AI
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={generateAllImages} size="lg">
                  Alle Bilder generieren
                </Button>
                <Button onClick={pingFunction} size="lg" variant="outline">
                  Verbindung testen
                </Button>
              </div>
            </div>

            <div className="grid gap-12">
              {images.map((image, index) => (
                <div key={image.name} className="border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-medium">{image.name}</h3>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => generateImage(index)}
                        disabled={image.loading}
                        variant="outline"
                      >
                        {image.loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generiere...
                          </>
                        ) : (
                          "Generieren"
                        )}
                      </Button>
                      {image.imageUrl && (
                        <Button 
                          onClick={() => downloadImage(image.imageUrl!, image.name)}
                          variant="default"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{image.prompt}</p>
                  
                  {image.imageUrl ? (
                    <img 
                      src={image.imageUrl} 
                      alt={image.name}
                      className="w-full h-auto rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">
                        {image.loading ? "Bild wird generiert..." : "Noch kein Bild generiert"}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImageGenerator;
