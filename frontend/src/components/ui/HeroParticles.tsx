const PARTICLES = [
  { left: 6, top: 18, size: 3, duration: 19, delay: -3 },
  { left: 14, top: 72, size: 2, duration: 24, delay: -11 },
  { left: 22, top: 34, size: 4, duration: 21, delay: -7 },
  { left: 31, top: 84, size: 2, duration: 17, delay: -14 },
  { left: 39, top: 12, size: 3, duration: 26, delay: -2 },
  { left: 47, top: 58, size: 2, duration: 20, delay: -9 },
  { left: 55, top: 28, size: 3, duration: 23, delay: -16 },
  { left: 63, top: 76, size: 4, duration: 18, delay: -5 },
  { left: 71, top: 16, size: 2, duration: 25, delay: -12 },
  { left: 78, top: 48, size: 3, duration: 22, delay: -8 },
  { left: 86, top: 68, size: 2, duration: 19, delay: -1 },
  { left: 92, top: 30, size: 4, duration: 27, delay: -13 },
];

export default function HeroParticles() {
  return (
    <div className="hero-particles" aria-hidden="true">
      {PARTICLES.map((particle, index) => (
        <span
          key={index}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
