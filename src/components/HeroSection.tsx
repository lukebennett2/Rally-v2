import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/AuthModal';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.style.opacity = '1';
    }

    const elements = [titleRef, subtitleRef, buttonsRef];
    elements.forEach((ref, index) => {
      if (ref.current) {
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.opacity = '1';
            ref.current.style.transform = 'translateY(0)';
          }
        }, 300 + index * 200);
      }
    });
  }, []);

  return (
    <div
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-32 md:py-40 transition-opacity duration-700 opacity-0"
      style={{
        background:
          'radial-gradient(circle at 50% 50%, rgba(255, 59, 48, 0.05) 0%, rgba(255, 255, 255, 1) 70%)',
      }}
    >
      <div className="w-full max-w-3xl mx-auto text-center">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-rally-charcoal mb-6 tracking-tight opacity-0 transform translate-y-8 transition-all duration-700"
        >
          Spontaneous moments,
          <br />
          <span className="text-rally-red">planned effortlessly</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-rally-darkGray mb-10 max-w-2xl mx-auto opacity-0 transform translate-y-8 transition-all duration-700 delay-200"
        >
          Rally brings friends together for seamless hangouts, whether spontaneous or planned. Co-create events, bring others in, and make memories that matter.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 transform translate-y-8 transition-all duration-700 delay-400"
        >
          <Button
            onClick={() => {
              setAuthMode('signup');
              setAuthModalOpen(true);
            }}
            className="rally-button-primary w-full sm:w-auto"
          >
            Get Started
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setAuthMode('login');
              setAuthModalOpen(true);
            }}
            className="rally-button-secondary w-full sm:w-auto"
          >
            Log In
          </Button>
        </div>
      </div>

      <div className="mt-16 md:mt-24 w-full max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-[1.01]">
          <div className="aspect-[16/9] bg-rally-lightGray flex items-center justify-center p-6">
            <div className="w-full h-full bg-white rounded-2xl shadow-inner flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg text-rally-mediumGray mb-3">App preview coming soon</div>
                <div className="inline-block px-4 py-1 rounded-full bg-rally-red/10 text-rally-red text-sm font-medium">
                  Rally with friends
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔐 Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
      />
    </div>
  );
};

export default HeroSection;
