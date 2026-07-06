import { useRef, useState } from "react";
import videoAsset from "@/assets/coming-summer-2026.mp4.asset.json";

const ComingSummerTeaser = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  };

  return (
    <section className="relative py-32 bg-background overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[40vh] glow-radial pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-minimal text-lime mb-4">A short film</p>
            <h2 className="text-4xl md:text-5xl font-light text-architectural">
              Coming to Calgary,
              <br />
              <span className="text-muted-foreground">this summer.</span>
            </h2>
          </div>

          <div className="relative rounded-2xl overflow-hidden card-raised group">
            <video
              ref={videoRef}
              src={videoAsset.url}
              className="w-full h-auto block"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              controls={false}
              onClick={toggleMute}
            />
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute video" : "Mute video"}
              className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide bg-background/70 backdrop-blur-sm border border-white/20 text-white hover:border-lime hover:text-lime transition-colors"
            >
              {muted ? "Unmute" : "Mute"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSummerTeaser;
