import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, Check, Lock, ArrowLeft, Plus, Trash2, Save, Image } from "lucide-react";
import { Link } from "react-router-dom";
import WaitlistAdmin from "@/components/admin/WaitlistAdmin";
import AnalyticsAdmin from "@/components/admin/AnalyticsAdmin";

const ADMIN_PASSWORD = "admin123!";

interface Project {
  id: string;
  image_id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  specs: string | null;
  roi: string | null;
  sort_order: number;
  is_featured: boolean;
}

interface ProjectImage {
  id: string;
  name: string;
  storageUrl: string | null;
}

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [uploading, setUploading] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const [projects, setProjects] = useState<Project[]>([]);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const categories = ["RESIDENTIAL", "COMMERCIAL", "AGRICULTURAL", "DEVELOPER"];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({ title: "Erfolgreich angemeldet" });
    } else {
      toast({ title: "Falsches Passwort", variant: "destructive" });
    }
  };

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
      loadImages();
    }
  }, [isAuthenticated]);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Error loading projects:", error);
      toast({ title: "Fehler beim Laden", variant: "destructive" });
      return;
    }

    setProjects(data || []);
  };

  const loadImages = async () => {
    // Get list of all images in storage
    const { data: files } = await supabase.storage
      .from("project-images")
      .list();

    const loadedImages: ProjectImage[] = [];

    if (files) {
      for (const file of files) {
        if (file.name.endsWith(".jpg") || file.name.endsWith(".png") || file.name.endsWith(".webp")) {
          const imageId = file.name.replace(/\.(jpg|png|webp)$/, "");
          const { data } = supabase.storage
            .from("project-images")
            .getPublicUrl(file.name);

          loadedImages.push({
            id: imageId,
            name: file.name,
            storageUrl: data.publicUrl + "?t=" + Date.now(),
          });
        }
      }
    }

    // Add default image IDs if not uploaded yet
    const defaultIds = ["project-solar-1", "project-solar-2", "project-heatpump"];
    for (const id of defaultIds) {
      if (!loadedImages.find((img) => img.id === id)) {
        loadedImages.push({ id, name: `${id}.jpg`, storageUrl: null });
      }
    }

    setImages(loadedImages);
  };

  const handleUpload = async (imageId: string, file: File) => {
    setUploading(imageId);

    try {
      const extension = file.name.split(".").pop() || "jpg";
      const fileName = `${imageId}.${extension}`;

      // Delete existing file first
      await supabase.storage.from("project-images").remove([`${imageId}.jpg`, `${imageId}.png`, `${imageId}.webp`]);

      // Upload new file
      const { error } = await supabase.storage
        .from("project-images")
        .upload(fileName, file, { cacheControl: "3600", upsert: true });

      if (error) throw error;

      toast({ title: "Bild hochgeladen!" });
      loadImages();
    } catch (error) {
      console.error("Upload error:", error);
      toast({ title: "Upload fehlgeschlagen", variant: "destructive" });
    } finally {
      setUploading(null);
    }
  };

  const saveProject = async (project: Project) => {
    setSaving(true);

    try {
      const { error } = await supabase
        .from("projects")
        .update({
          image_id: project.image_id,
          title: project.title,
          location: project.location,
          category: project.category,
          description: project.description,
          specs: project.specs,
          roi: project.roi,
          sort_order: project.sort_order,
          is_featured: project.is_featured,
        })
        .eq("id", project.id);

      if (error) throw error;

      toast({ title: "Projekt gespeichert!" });
      setEditingProject(null);
      loadProjects();
    } catch (error) {
      console.error("Save error:", error);
      toast({ title: "Speichern fehlgeschlagen", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const addProject = async () => {
    const newProject = {
      image_id: "project-new-" + Date.now(),
      title: "NEUES PROJEKT",
      location: "CALGARY, 2024",
      category: "RESIDENTIAL",
      description: "Beschreibung des Projekts hier eingeben.",
      specs: "System Specs",
      roi: "ROI Info",
      sort_order: projects.length + 1,
      is_featured: false,
    };

    const { data, error } = await supabase
      .from("projects")
      .insert(newProject)
      .select()
      .single();

    if (error) {
      console.error("Add error:", error);
      toast({ title: "Hinzufügen fehlgeschlagen", variant: "destructive" });
      return;
    }

    toast({ title: "Projekt hinzugefügt!" });
    loadProjects();
    if (data) setEditingProject(data);
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Projekt wirklich löschen?")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      toast({ title: "Löschen fehlgeschlagen", variant: "destructive" });
      return;
    }

    toast({ title: "Projekt gelöscht!" });
    loadProjects();
  };

  const getImageUrl = (imageId: string) => {
    const img = images.find((i) => i.id === imageId);
    return img?.storageUrl || null;
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
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-architectural">Admin-Bereich</h1>
            <p className="text-muted-foreground">Projekte und Bilder verwalten</p>
          </div>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zur Seite
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="waitlist" className="space-y-6">
          <TabsList>
            <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
            <TabsTrigger value="projects">Projekte</TabsTrigger>
            <TabsTrigger value="images">Bilder</TabsTrigger>
          </TabsList>

          <TabsContent value="waitlist">
            <WaitlistAdmin password={password} />
          </TabsContent>


          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium">Alle Projekte</h2>
              <Button onClick={addProject}>
                <Plus className="w-4 h-4 mr-2" />
                Neues Projekt
              </Button>
            </div>

            {editingProject ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Projekt bearbeiten</span>
                    <Button variant="ghost" size="sm" onClick={() => setEditingProject(null)}>
                      Abbrechen
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Titel</Label>
                      <Input
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Standort</Label>
                      <Input
                        value={editingProject.location}
                        onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Kategorie</Label>
                      <Select
                        value={editingProject.category}
                        onValueChange={(value) => setEditingProject({ ...editingProject, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Bild-ID</Label>
                      <Input
                        value={editingProject.image_id}
                        onChange={(e) => setEditingProject({ ...editingProject, image_id: e.target.value })}
                        placeholder="z.B. project-solar-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Beschreibung</Label>
                    <Textarea
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>System/Specs</Label>
                      <Input
                        value={editingProject.specs || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, specs: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ROI</Label>
                      <Input
                        value={editingProject.roi || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, roi: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Reihenfolge</Label>
                      <Input
                        type="number"
                        value={editingProject.sort_order}
                        onChange={(e) => setEditingProject({ ...editingProject, sort_order: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={editingProject.is_featured}
                      onCheckedChange={(checked) => setEditingProject({ ...editingProject, is_featured: checked })}
                    />
                    <Label>Auf Startseite anzeigen (Featured)</Label>
                  </div>

                  <Button onClick={() => saveProject(editingProject)} disabled={saving} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Wird gespeichert..." : "Speichern"}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                          {getImageUrl(project.image_id) ? (
                            <img
                              src={getImageUrl(project.image_id)!}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Image className="w-6 h-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">{project.location} · {project.category}</p>
                          {project.is_featured && (
                            <span className="text-xs text-primary">★ Featured</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setEditingProject(project)}>
                            Bearbeiten
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => deleteProject(project.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium">Projektbilder</h2>
              <p className="text-sm text-muted-foreground">Lade Bilder hoch mit der Bild-ID als Dateiname</p>
            </div>

            <div className="grid gap-4">
              {images.map((image) => (
                <Card key={image.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                        {image.storageUrl ? (
                          <img src={image.storageUrl} alt={image.id} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                            Kein Bild
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-mono text-sm">{image.id}</p>
                        {image.storageUrl && <p className="text-xs text-primary">✓ Hochgeladen</p>}
                      </div>
                      <div>
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
                          variant="outline"
                          size="sm"
                          onClick={() => triggerFileInput(image.id)}
                          disabled={uploading === image.id}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {uploading === image.id ? "..." : image.storageUrl ? "Ersetzen" : "Hochladen"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add new image */}
              <Card className="border-dashed">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        Neues Bild hochladen: Gib eine neue Bild-ID ein und lade das Bild hoch. 
                        Verwende diese ID dann bei deinen Projekten.
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={(el) => (fileInputRefs.current["new-image"] = el)}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const newId = prompt("Bild-ID eingeben (z.B. project-new):");
                          if (newId) handleUpload(newId, file);
                        }
                      }}
                    />
                    <Button variant="outline" onClick={() => triggerFileInput("new-image")}>
                      <Plus className="w-4 h-4 mr-2" />
                      Neues Bild
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
