import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, Check, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Fallback images (same as used on the site)
import projectSolar1Fallback from "@/assets/project-solar-1.jpg";
import projectSolar2Fallback from "@/assets/project-solar-2.jpg";
import projectHeatpumpFallback from "@/assets/project-heatpump.jpg";

const ADMIN_PASSWORD = "admin123!";

interface ProjectImage {
  id: string;
  name: string;
  description: string;
  fallback: string;
  storageUrl: string | null;
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
      description: "Residentielles Solarpanel-Projekt (Startseite + Work-Seite)",
      fallback: projectSolar1Fallback,
      storageUrl: null,
    },
    {
      id: "project-solar-2",
      name: "Solar Projekt 2", 
      description: "Kommerzielles Solarpanel-Projekt (Startseite + Work-Seite)",
      fallback: projectSolar2Fallback,
      storageUrl: null,
    },
    {
      id: "project-heatpump",
      name: "Wärmepumpe",
      description: "Wärmepumpen-Installation (Startseite + Work-Seite)",
      fallback: projectHeatpumpFallback,
      storageUrl: null,
    },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({ title: "Erfolgreich angemeldet" });
    } else {
      toast({ title: "Falsches Passwort", variant: "destructive" });
    }
  };

  // Load storage images when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadExistingImages();
    }
  }, [isAuthenticated]);

  const loadExistingImages = async () => {
    const updatedImages = await Promise.all(
      images.map(async (img) => {
        const { data } = supabase.storage
          .from("project-images")
          .getPublicUrl(`${img.id}.jpg`);

        // Check if image exists in storage
        try {
          const response = await fetch(data.publicUrl, { method: "HEAD" });
          if (response.ok) {
            return { ...img, storageUrl: data.publicUrl + "?t=" + Date.now() };
          }
        } catch {
          // Image doesn't exist in storage
        }
        return { ...img, storageUrl: null };
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

      // Get the public URL with cache buster
      const { data } = supabase.storage
        .from("project-images")
        .getPublicUrl(`${imageId}.jpg`);

      setImages((prev) =>
        prev.map((img) =>
          img.id === imageId ? { ...img, storageUrl: data.publicUrl + "?t=" + Date.now() } : img
        )
      );

      toast({ title: "Bild hochgeladen!", description: `${imageId} wurde aktualisiert. Lade die Seite neu um die Änderungen zu sehen.` });
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

  // Get display image: storage URL if exists, otherwise fallback
  const getDisplayImage = (image: ProjectImage) => {
    return image.storageUrl || image.fallback;
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
                  {/* Preview - Always shows current image (storage or fallback) */}
                  <div className="w-full md:w-64 h-40 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={getDisplayImage(image)}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info & Actions */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{image.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{image.description}</p>
                      <p className="text-xs text-muted-foreground font-mono">{image.id}.jpg</p>
                      {image.storageUrl && (
                        <p className="text-xs text-primary mt-1">✓ Eigenes Bild hochgeladen</p>
                      )}
                      {!image.storageUrl && (
                        <p className="text-xs text-muted-foreground mt-1">Zeigt Fallback-Bild</p>
                      )}
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
                            {image.storageUrl ? "Ersetzen" : "Hochladen"}
                          </>
                        )}
                      </Button>
                      {image.storageUrl && (
                        <span className="text-sm flex items-center text-primary">
                          <Check className="w-4 h-4 mr-1" />
                          Eigenes Bild
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
            <strong>Hinweis:</strong> Die Bilder werden auf der Startseite (Portfolio-Sektion) und auf der Work-Seite angezeigt. 
            Nach dem Hochladen einfach die Seite neu laden, um die Änderungen zu sehen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
