-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_id TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'RESIDENTIAL',
  description TEXT NOT NULL,
  specs TEXT,
  roi TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access (projects are public content)
CREATE POLICY "Anyone can view projects"
ON public.projects
FOR SELECT
USING (true);

-- Allow public insert/update/delete (admin password protection is in the app)
CREATE POLICY "Allow all modifications"
ON public.projects
FOR ALL
USING (true)
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default projects
INSERT INTO public.projects (image_id, title, location, category, description, specs, roi, sort_order, is_featured) VALUES
('project-solar-1', 'RESIDENTIAL SOLAR SYSTEM', 'CALGARY NW, 2024', 'RESIDENTIAL', '12kW premium solar installation with integrated battery storage. This family of four now achieves 85% energy self-sufficiency, significantly reducing their utility costs.', '12 kW System', '6.2 Year ROI', 1, true),
('project-solar-2', 'COMMERCIAL INSTALLATION', 'SOUTHERN ALBERTA, 2024', 'COMMERCIAL', 'Large-scale 150kW commercial solar array with advanced monitoring and load management. German engineering ensured optimal ROI.', '150 kW System', '5.8 Year ROI', 2, true),
('project-heatpump', 'INTEGRATED HEAT PUMP SYSTEM', 'CALGARY SW, 2024', 'HEAT PUMP', 'Complete home energy solution combining solar PV with an efficient air-source heat pump. True Nullpunkt: production meets consumption.', '10 kW + Heat Pump', 'Zero Gas Bills', 3, true);