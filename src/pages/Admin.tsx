import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, Check, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ADMIN_PASSWORD = "admin123!";

interface ProjectImage {
  id: string;
  name: string;
  description: string;
  currentUrl: string | null;
}

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const [images, setImages] = useState<ProjectImage[]>([
    {
      id: "project-solar-1",
      name: "Solar Projekt 1",
      description: "Residentielles Solarpanel-Projekt",
      currentUrl: null,
    },
    {
      id: "project-solar-2",
      name: "Solar Projekt 2", 
      description: "Kommerzielles Solarpanel-Projekt",
      currentUrl: null,
    },
    {
      id: "project-heatpump",
      name: "Wärmepumpe",
      description: "Wärmepumpen-Installation",
      currentUrl: null,
    },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({ title: "Erfolgreich angemeldet" });
      loadExistingImages();
    } else {
      toast({ title: "Falsches Passwort", variant: "destructive" });
    }
  };

  const loadExistingImages = async () => {
    const updatedImages = await Promise.all(
      images.map(async (img) => {
        const { data } = supabase.storage
          .from("project-images")
          .getPublicUrl(`${img.id}.jpg`);

        // Check if image exists by trying to fetch it
        try {
          const response = await fetch(data.publicUrl, { method: "HEAD" });
          if (response.ok) {
            return { ...img, currentUrl: data.publicUrl };
          }
        } catch {
          // Image doesn't exist
        }
        return img;
      })
    );
    setImages(updatedImages);
  };

  const handleUpload = async (imageId: string, file: File) => {
    setUploading(imageId);

    try {
      // Delete existing file first (if any)
      await supabase.storage.from("project-images").remove([`${imageId}.jpg`]);

      // Upload new file
      const { error } = await supabase.storage
        .from("project-images")
        .upload(`${imageId}.jpg`, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) throw error;

      // Get the public URL
      const { data } = supabase.storage
        .from("project-images")
        .getPublicUrl(`${imageId}.jpg`);

      setImages((prev) =>
        prev.map((img) =>
          img.id === imageId ? { ...img, currentUrl: data.publicUrl + "?t=" + Date.now() } : img
        )
      );

      toast({ title: "Bild hochgeladen!", description: `${imageId} wurde aktualisiert.` });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload fehlgeschlagen",
        description: error instanceof Error ? error.message : "Unbekannter Fehler",
        variant: "destructive",
      });
    } finally {
      setUploading(null);
    }
  };

  const triggerFileInput = (imageId: string) => {
    fileInputRefs.current[imageId]?.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Lock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <CardTitle>Admin-Bereich</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Passwort eingeben"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Anmelden
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-architectural">Admin-Bereich</h1>
            <p className="text-muted-foreground">Projektbilder verwalten</p>
          </div>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zur Seite
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {images.map((image) => (
            <Card key={image.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Preview */}
                  <div className="w-full md:w-64 h-40 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    {image.currentUrl ? (
                      <img
                        src={image.currentUrl}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        Kein Bild
                      </div>
                    )}
                  </div>

                  {/* Info & Actions */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{image.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{image.description}</p>
                      <p className="text-xs text-muted-foreground font-mono">{image.id}.jpg</p>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={(el) => (fileInputRefs.current[image.id] = el)}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpload(image.id, file);
                        }}
                      />
                      <Button
                        onClick={() => triggerFileInput(image.id)}
                        disabled={uploading === image.id}
                      >
                        {uploading === image.id ? (
                          "Wird hochgeladen..."
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            {image.currentUrl ? "Ersetzen" : "Hochladen"}
                          </>
                        )}
                      </Button>
                      {image.currentUrl && (
                        <span className="text-sm text-green-600 flex items-center">
                          <Check className="w-4 h-4 mr-1" />
                          Vorhanden
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Hinweis:</strong> Hochgeladene Bilder werden automatisch in der Portfolio-Sektion angezeigt, 
            sobald du die Seite aktualisierst.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
