/* ... existing imports ... */
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import {
  Sparkles, X, ChevronRight, Music, HeartHandshake, ArrowLeft, ArrowRight,
  Navigation, Cloud, Heart, Zap, Car, AlertTriangle, CircleDot, Wrench, Settings,
  Type, Keyboard, Eraser, ShoppingBasket, Mail, Quote, PenTool, Lock, ShieldAlert, Command, Lightbulb, Gift
} from 'lucide-react';
import './index.css';

/* 
  -------------------------------------------------------------
  Hello! This project is set up for you to add your own images.
  Look for the 'images' array in the Gallery component below.
  Replace the placeholder URLs with your own image paths or URLs.
  -------------------------------------------------------------
*/

const ImpossibleGame = ({ onLose }) => {
  const [timeLeft, setTimeLeft] = useState(20);
  const [input, setInput] = useState("");
  const [letters, setLetters] = useState([]);
  const targetWord = "FOREVER";
  const gameActive = useRef(true);

  // Initialize and animate letters
  useEffect(() => {
    const chars = "FOREVERLOVEISPATIENTKIND".split("");
    const initialLetters = chars.map((c, i) => ({
      id: i,
      char: c,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));
    setLetters(initialLetters);

    const loop = setInterval(() => {
      setTimeLeft(prev => {
        const newVal = Math.max(0, prev - 0.1);
        if (newVal <= 5 && gameActive.current) {
          gameActive.current = false;
          onLose();
        }
        return newVal;
      });

      setLetters(prev => prev.map(l => {
        let nextX = l.x + l.vx * 0.5;
        let nextY = l.y + l.vy * 0.5;
        let nextVX = l.vx;
        let nextVY = l.vy;

        if (nextX < 5 || nextX > 95) nextVX *= -1;
        if (nextY < 5 || nextY > 95) nextVY *= -1;

        return { ...l, x: nextX, y: nextY, vx: nextVX, vy: nextVY };
      }));
    }, 50);

    return () => clearInterval(loop);
  }, [onLose]);

  const handleLetterClick = (char) => {
    if (!gameActive.current) return;
    setInput(prev => (prev + char).slice(0, 12));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(circle at center, #0f0c29 0%, #302b63 50%, #24243e 100%)'
      }}
    >
      {/* Background Glows */}
      <div style={{ position: 'absolute', top: '20%', left: '20%', width: '300px', height: '300px', background: 'rgba(212,175,55,0.1)', filter: 'blur(100px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: '300px', height: '300px', background: 'rgba(255,77,77,0.1)', filter: 'blur(100px)', borderRadius: '50%' }} />

      {/* Main Game Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          width: 'min(90vw, 500px)',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(25px)',
          borderRadius: '40px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
          zIndex: 10
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            color: '#fff',
            fontSize: '2.5rem',
            fontWeight: '900',
            letterSpacing: '8px',
            margin: 0,
            textShadow: '0 0 20px rgba(255,255,255,0.3)'
          }}>
            HEART STRINGS
          </h2>
          <p style={{ color: '#d4af37', fontSize: '0.8rem', letterSpacing: '3px', marginTop: '10px', opacity: 0.8 }}>
            SPELL THE UNBREAKABLE WORD
          </p>
        </div>

        {/* Input Display */}
        <div style={{
          width: '100%',
          height: '70px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          overflow: 'hidden',
          padding: '0 1rem'
        }}>
          {input.split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{ color: '#d4af37', fontSize: '1.8rem', fontWeight: 'bold' }}
            >
              {c}
            </motion.span>
          ))}
          {input.length === 0 && <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '1rem', letterSpacing: '2px' }}>CLICK FLOATING LETTERS</span>}
        </div>

        {/* Floating Letters Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '300px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.03)',
          overflow: 'hidden'
        }}>
          {letters.map(l => (
            <motion.button
              key={l.id}
              onClick={() => handleLetterClick(l.char)}
              whileHover={{ scale: 1.2, color: '#d4af37' }}
              whileTap={{ scale: 0.8 }}
              style={{
                position: 'absolute',
                left: `${l.x}%`,
                top: `${l.y}%`,
                transform: 'translate(-50%, -50%)',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                opacity: 0.6,
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              {l.char}
            </motion.button>
          ))}
        </div>

        {/* Controls/Time */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => setInput("")}
            style={{
              background: 'rgba(255,77,77,0.1)',
              border: '1px solid rgba(255,77,77,0.2)',
              color: '#ff4d4d',
              padding: '0.8rem 1.5rem',
              borderRadius: '15px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Eraser size={16} /> CLEAR
          </button>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: '#fff', opacity: 0.5, letterSpacing: '1px' }}>TIMEOUT IN</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: timeLeft < 8 ? '#ff4d4d' : '#d4af37' }}>{Math.floor(timeLeft)}s</div>
          </div>
        </div>
      </motion.div>

      {/* Floating Decor */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: '10%', right: '10%', opacity: 0.05 }}
      >
        <Keyboard size={150} color="#fff" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{ position: 'absolute', bottom: '10%', left: '10%', opacity: 0.05 }}
      >
        <Type size={120} color="#d4af37" />
      </motion.div>

      {/* Scanline effect for texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02))', zIndex: 100, pointerEvents: 'none', backgroundSize: '100% 4px, 3px 100%' }} />
    </motion.div>
  );
};

const Landing = ({ onEnter }) => {
  const [noClicks, setNoClicks] = useState(0);
  const [trickyStep, setTrickyStep] = useState(0);
  const [isHoveringNo, setIsHoveringNo] = useState(false);
  const [gameState, setGameState] = useState('landing'); // landing, playing, lost, wife-msg, tricky
  const [mainText, setMainText] = useState("Will you be my Valentine?");

  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [yesPos, setYesPos] = useState({ x: 0, y: 0 });
  const [isThrown, setIsThrown] = useState(false);

  const trickyQuestions = [
    { q: "Wait... is your mouse/screen broken? You clicked 'No' so many times! 🖱️", yes: "Yes, it's lagging! 😅", no: "Nope, I'm just fast.", trick: 'move' },
    { q: "Are you just testing my patience to see if I'll give up? 🥺", yes: "Maybe a little... 😇", no: "I'd never! ❤️", trick: 'swap' },
    { q: "Is 'No' your favorite word when you're being dramatic? 🎭", yes: "You caught me... 🙈", no: "Definitely not.", trick: 'transform' },
    { q: "Do you think there's any universe where I'd let you say No? 🌌", yes: "Probably not... 😆", no: "Let me try!", trick: 'basket' },
    { q: "Final confirmation: Ready for our forever adventure? 💍✨", yes: "YES, FOREVER! 😍❤️", no: "No", trick: 'move' }
  ];

  const moveNo = () => {
    if (trickyQuestions[trickyStep].trick === 'basket') {
      setIsThrown(true);
      return;
    }
    const intensity = (trickyStep + 1) * 30;
    const x = Math.random() * (intensity * 2) - intensity;
    const y = Math.random() * (intensity * 2) - intensity;
    setNoPos({ x, y });
  };

  const moveYes = () => {
    const x = Math.random() * 250 - 125;
    const y = Math.random() * 250 - 125;
    setYesPos({ x, y });
  };

  const handleYes = () => {
    if ((noClicks > 0 || gameState === 'wife-msg') && trickyStep < trickyQuestions.length) {
      setGameState('tricky');
    } else {
      onEnter();
    }
  };

  const handleNo = () => {
    if (noClicks === 0) {
      setMainText("Are you sure? 🥺");
      setNoClicks(1);
    } else if (noClicks === 1) {
      setMainText("Really sure? 💔");
      setNoClicks(2);
    } else if (noClicks === 2) {
      setMainText("Survive 20s to say No");
      setNoClicks(3);
    } else if (noClicks === 3) {
      setGameState('playing');
    }
  };

  const handleLose = () => {
    setGameState('lost');
  };

  const handleAcceptLoss = () => {
    setGameState('wife-msg');
    setNoClicks(100); // Hide button
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      className="full-screen"
      style={{
        background: 'radial-gradient(circle at center, #1a1a24 0%, #000 100%)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          key={gameState}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ width: '100%', padding: '0 2rem' }}
        >
          {gameState === 'wife-msg' ? (
            <div style={{ marginBottom: '4rem' }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
                style={{ marginBottom: '2rem' }}
              >
                <Heart size={80} fill="#d4af37" color="#d4af37" style={{ filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.5))' }} />
              </motion.div>

              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: '900',
                color: '#fff',
                margin: '0 0 1.5rem 0',
                letterSpacing: '2px',
                lineHeight: '1.1'
              }}>
                To My <span style={{ color: '#d4af37' }}>Forever</span> Wife
              </h1>

              <p style={{
                fontSize: '1.4rem',
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6',
                fontStyle: 'italic',
                letterSpacing: '0.5px'
              }}>
                "You have only one option 💍. I am gonna remove the NO game 😏"
              </p>
            </div>
          ) : (
            <h1 style={{
              fontSize: '4rem',
              lineHeight: '1.2',
              marginBottom: '3.5rem',
              minHeight: '20vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              transition: 'all 0.5s ease'
            }}>
              {mainText}
            </h1>
          )}
        </motion.div>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYes}
            className="btn-elegant"
            style={{
              fontSize: '1.4rem',
              padding: '1.2rem 4rem',
              borderColor: '#d4af37',
              background: 'rgba(212, 175, 55, 0.15)',
              boxShadow: '0 0 20px rgba(212,175,55,0.2)'
            }}
          >
            {gameState === 'wife-msg' ? "YES! 💍" : "YES ❤️"}
          </motion.button>

          <AnimatePresence>
            {/* The Original No Button (Hides after game start) */}
            {noClicks <= 3 && window.innerWidth > 0 && gameState === 'landing' && (
              <motion.button
                initial={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0, scale: 0, padding: 0, margin: 0 }}
                whileHover={{ scale: 1.1, x: noClicks > 0 ? [0, -10, 10, -10, 10, 0] : 0 }}
                onClick={handleNo}
                className="btn-elegant"
                style={{
                  fontSize: '1rem',
                  padding: '0.8rem 2rem',
                  borderColor: '#a0a0a0',
                  color: '#a0a0a0',
                  opacity: 0.7
                }}
              >
                {noClicks === 3 ? "Start Game" : "NO"}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Game State Overlays */}
      <AnimatePresence>
        {gameState === 'playing' && (
          <ImpossibleGame onLose={handleLose} />
        )}

        {gameState === 'lost' && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="glass-panel"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              style={{ maxWidth: '500px', padding: '3rem', textAlign: 'center' }}
            >
              <h2 style={{ border: 'none', fontSize: '2.5rem', color: '#d4af37', marginBottom: '1rem' }}>
                SYSTEM FAILED!
              </h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#ccc' }}>
                Strategic override detected. You were never meant to win this... 😏
              </p>
              <button
                onClick={handleAcceptLoss}
                className="btn-elegant"
                style={{ width: '100%', borderColor: '#d4af37', color: '#d4af37' }}
              >
                Accept Fate 💍
              </button>
            </motion.div>
          </motion.div>
        )}

        {gameState === 'tricky' && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="glass-panel"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              style={{ maxWidth: '500px', padding: '3rem', textAlign: 'center' }}
            >
              <div style={{ color: '#d4af37', marginBottom: '1.5rem' }}>
                <Sparkles size={50} style={{ margin: '0 auto' }} />
              </div>
              <h2 style={{ border: 'none', fontSize: '1.8rem', color: '#fff', marginBottom: '2rem', lineHeight: '1.4' }}>
                {trickyQuestions[trickyStep].q}
              </h2>

              <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', position: 'relative' }}>
                <motion.button
                  animate={{ x: yesPos.x, y: yesPos.y }}
                  onClick={() => {
                    if (trickyStep < trickyQuestions.length - 1) {
                      setTrickyStep(prev => prev + 1);
                      setNoPos({ x: 0, y: 0 });
                      setYesPos({ x: 0, y: 0 });
                      setIsThrown(false);
                    } else {
                      onEnter();
                    }
                  }}
                  className="btn-elegant"
                  style={{ width: '100%', borderColor: '#d4af37', color: '#d4af37', background: 'rgba(212,175,55,0.1)', zIndex: 20 }}
                >
                  {trickyQuestions[trickyStep].yes}
                </motion.button>

                <motion.button
                  animate={isThrown ? {
                    x: 0,
                    y: 150,
                    scale: 0.2,
                    opacity: 0,
                    rotate: 360
                  } : {
                    x: noPos.x,
                    y: noPos.y,
                    scale: 1,
                    opacity: 0.6
                  }}
                  transition={{ duration: isThrown ? 0.8 : 0.2 }}
                  onMouseEnter={() => {
                    if (trickyQuestions[trickyStep].trick === 'move') moveNo();
                    if (trickyQuestions[trickyStep].trick === 'teleport') {
                      setNoPos({ x: (Math.random() > 0.5 ? 200 : -200), y: (Math.random() > 0.5 ? 200 : -200) });
                    }
                    if (trickyQuestions[trickyStep].trick === 'basket') moveNo();
                    if (trickyQuestions[trickyStep].trick === 'swap') setIsHoveringNo(true);
                  }}
                  onMouseLeave={() => setIsHoveringNo(false)}
                  onClick={() => {
                    if (trickyQuestions[trickyStep].trick === 'transform' || trickyStep === 1) {
                      if (trickyStep < trickyQuestions.length - 1) {
                        setTrickyStep(prev => prev + 1);
                        setNoPos({ x: 0, y: 0 });
                      } else {
                        onEnter();
                      }
                    }
                  }}
                  className="btn-elegant"
                  style={{
                    width: '100%',
                    borderColor: '#a0a0a0',
                    color: '#a0a0a0',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  {trickyQuestions[trickyStep].trick === 'transform' && isHoveringNo ? trickyQuestions[trickyStep].yes : trickyQuestions[trickyStep].no}
                  {trickyQuestions[trickyStep].trick === 'swap' && isHoveringNo ? "I LOVE YOU! ❤️" : ""}
                  {!(trickyQuestions[trickyStep].trick === 'swap' && isHoveringNo) && trickyQuestions[trickyStep].no}
                </motion.button>
              </div>

              {trickyQuestions[trickyStep].trick === 'basket' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: '2rem', color: '#d4af37' }}
                >
                  <ShoppingBasket size={40} style={{ margin: '0 auto' }} />
                  <div style={{ fontSize: '0.7rem', marginTop: '0.5rem', opacity: 0.5 }}>TRASH BIN</div>
                </motion.div>
              )}
            </motion.div>

            <div style={{ marginTop: '2rem', fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '2px' }}>
              CONFIRMATION STEP {trickyStep + 1} / {trickyQuestions.length}
            </div>

            {/* Invisible Trick Areas around the button */}
            {trickyStep >= 2 && !isThrown && (
              <>
                <div onMouseEnter={moveYes} style={{ position: 'absolute', top: '40%', left: '10%', width: '100px', height: '100px', pointerEvents: 'auto', zIndex: 15 }} />
                <div onMouseEnter={moveYes} style={{ position: 'absolute', top: '40%', right: '10%', width: '100px', height: '100px', pointerEvents: 'auto', zIndex: 15 }} />
                <div onMouseEnter={moveYes} style={{ position: 'absolute', bottom: '20%', left: '30%', width: '100px', height: '100px', pointerEvents: 'auto', zIndex: 15 }} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Specialized Background Decor for Wife State */}
      <AnimatePresence>
        {gameState === 'wife-msg' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          >
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                initial={{
                  x: Math.random() * 100 + '%',
                  y: '110%',
                  opacity: 0,
                  rotate: Math.random() * 360
                }}
                animate={{
                  y: '-10%',
                  opacity: [0, 0.4, 0],
                  rotate: Math.random() * 720
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 10
                }}
                style={{ position: 'absolute', color: i % 2 === 0 ? '#d4af37' : '#ff4d4d' }}
              >
                {i % 3 === 0 ? <Heart size={20} fill="currentColor" /> : <Sparkles size={15} />}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Letter = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
      className="full-screen"
      style={{
        background: 'radial-gradient(circle at center, #0a0a0f 0%, #000 100%)',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background light */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(255,77,77,0.05) 0%, transparent 70%)', filter: 'blur(100px)' }} />

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          width: 'min(90vw, 750px)',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(30px)',
          borderRadius: '40px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '4rem min(8vw, 5rem)',
          position: 'relative',
          boxShadow: '0 50px 100px rgba(0,0,0,0.6)',
          zIndex: 10
        }}
      >
        {/* Floating Mail Icon */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '-30px', left: '50px', color: '#d4af37', opacity: 0.8 }}
        >
          <div style={{ background: '#1a1a1a', padding: '15px', borderRadius: '20px', border: '1px solid rgba(212,175,55,0.3)' }}>
            <Mail size={32} />
          </div>
        </motion.div>

        <Quote
          size={60}
          style={{ position: 'absolute', top: '2rem', right: '3rem', opacity: 0.05, color: '#fff' }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h2 style={{
            fontSize: 'min(3.5rem, 10vw)',
            fontFamily: "'Playfair Display', serif",
            color: '#d4af37',
            marginBottom: '3.5rem',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            My Dearest,
          </h2>

          <div style={{
            fontSize: '1.35rem',
            lineHeight: '2.1',
            color: 'rgba(255,255,255,0.85)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: '300',
            letterSpacing: '0.3px'
          }}>
            <p style={{ marginBottom: '2.5rem', position: 'relative' }}>
              There are moments in life that feel like <span style={{ color: '#fff', fontWeight: '500' }}>magic</span>, not because they are extraordinary, but because they are shared with you.
            </p>

            <p style={{ marginBottom: '2.5rem' }}>
              I wanted to create something that captures just a fraction of the <span style={{ color: '#d4af37', fontWeight: '500' }}>light</span> you bring into my world. Every photo here is a chapter, a laugh, a memory I hold close.
            </p>

            <p style={{ marginBottom: '4rem' }}>
              Thank you for being my partner, my muse, and my greatest <span style={{ color: '#fff', fontWeight: '500' }}>adventure</span>.
            </p>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)', marginBottom: '3rem' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#d4af37', opacity: 0.8 }}>
              <PenTool size={20} />
              <span style={{ fontSize: '1.1rem', fontStyle: 'italic', fontFamily: "'Playfair Display', serif" }}>Always Yours...</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, background: 'rgba(212, 175, 55, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="btn-elegant"
              style={{
                fontSize: '1.1rem',
                padding: '1rem 3rem',
                borderColor: '#d4af37',
                color: '#d4af37',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              Open Gallery <ChevronRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Atmospheric Particles specifically for this view */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100],
              x: [0, (i % 2 === 0 ? 20 : -20)],
              opacity: [0, 0.2, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.8
            }}
            style={{
              position: 'absolute',
              left: (10 + i * 12) + '%',
              bottom: '10%',
              width: '2px',
              height: '2px',
              background: '#d4af37',
              boxShadow: '0 0 10px #d4af37'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const PullCord = ({ onPull, isPulled }) => {
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        right: '10%',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div style={{ width: '2px', height: '100px', background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.5))' }} />
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 100 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.y > 50) onPull();
        }}
        whileHover={{ scale: 1.1 }}
        style={{
          width: '30px',
          height: '80px',
          background: '#d4af37',
          borderRadius: '15px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(212,175,55,0.4)'
        }}
      >
        <Lightbulb size={18} fill={isPulled ? "#000" : "none"} color={isPulled ? "#000" : "#fff"} />
        <div style={{ height: '20px', width: '2px', background: 'rgba(0,0,0,0.2)', marginTop: '5px' }} />
      </motion.div>
    </motion.div>
  );
};

const Gallery = () => {
  const images = [
    { id: 1, url: '/assets/1.png', title: 'THE BEGINNING', date: 'MOMENT 01', desc: 'The moment our worlds collided.' },
    { id: 2, url: '/assets/2.jpeg', title: 'SOUL CONNECTION', date: 'MOMENT 02', desc: 'When every glance started feeling like a promise.' },
    { id: 3, url: '/assets/3.jpeg', title: 'PURE ENCHANTMENT', date: 'MOMENT 03', desc: 'Lost in the magic of being with you.' },
    { id: 4, url: '/assets/4.jpeg', title: 'INFINITE HORIZONS', date: 'MOMENT 04', desc: 'Wherever we go, as long as it is with you, I am home.' },
    { id: 5, url: '/assets/5.jpeg', title: 'STRENGTH', date: 'MOMENT 05', desc: 'Through every storm, we stood taller.' },
    { id: 6, url: '/assets/6.jpeg', title: 'FOREVER', date: 'ETERNITY', desc: 'The best is yet to come.' },
  ];

  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const selectedImage = images.find(i => i.id === selectedId);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [showValentine, setShowValentine] = useState(false);
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.98 && !showValentine && isRevealed) {
      setShowValentine(true);
    }
  });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        minHeight: '200vh',
        background: '#050505',
        position: 'relative',
        overflowX: 'hidden'
      }}
    >
      {/* Central Thread */}
      {isRevealed && (
        <div style={{ position: 'absolute', left: '50%', top: '300px', bottom: '100px', width: '2px', background: 'rgba(212,175,55,0.1)', transform: 'translateX(-50%)', zIndex: 1 }}>
          <motion.div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, transparent, #d4af37, #ff4d4d, #d4af37, transparent)',
              scaleY: pathLength,
              transformOrigin: 'top'
            }}
          />
        </div>
      )}

      <header style={{ padding: '8rem 0 4rem 0', textAlign: 'center', zIndex: 10, position: 'relative' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} style={{ color: '#d4af37', letterSpacing: '10px', fontSize: '0.6rem', marginBottom: '1rem' }}>SINCE.THE.START</motion.p>
        <h1 style={{ fontSize: 'clamp(3rem, 15vw, 8rem)', textTransform: 'none', color: '#fff', fontFamily: 'var(--font-serif)', fontStyle: 'italic', lineHeight: 0.8, letterSpacing: '-4px' }}>
          {isRevealed ? 'Eternal Thread' : 'A Silent Gift'}
        </h1>
      </header>

      <PullCord onPull={() => setIsRevealed(true)} isRevealed={isRevealed} />

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="gift-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 2, filter: 'blur(100px)' }}
            className="full-screen"
            style={{ height: '40vh' }}
          >
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <Gift size={120} color="#d4af37" strokeWidth={1} style={{ filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.4))' }} />
            </motion.div>
            <p style={{ color: '#333', letterSpacing: '8px', marginTop: '2rem', fontSize: '0.8rem' }}>THE JOURNEY BEGINS HERE</p>
          </motion.div>
        ) : (
          <div style={{ position: 'relative', zIndex: 2, padding: '10vh 0' }}>
            {images.map((img, index) => (
              <TimelineItem
                key={img.id}
                img={img}
                index={index}
                onClick={() => setSelectedId(img.id)}
              />
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '20vh 0' }}
            >
              <Heart size={40} color="#ff4d4d" style={{ filter: 'drop-shadow(0 0 10px #ff4d4d)' }} />
              <h2 style={{ border: 'none', color: '#fff', fontSize: '1rem', letterSpacing: '10px', marginTop: '2rem' }}>TO INFINITY</h2>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedId && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5vw', backdropFilter: 'blur(10px)' }}
          >
            <motion.div layoutId={`card-${selectedId}`} style={{ width: '100%', maxWidth: '1000px', textAlign: 'center' }}>
              <img src={selectedImage.url} style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain', boxShadow: '0 0 50px rgba(0,0,0,1)', borderRadius: '24px' }} />
              <p style={{ color: '#d4af37', fontSize: '0.8rem', letterSpacing: '5px', marginTop: '2rem' }}>{selectedImage.date}</p>
              <h2 style={{ color: '#fff', fontSize: '3rem', border: 'none', fontFamily: 'var(--font-serif)', fontStyle: 'italic', margin: '0.5rem 0' }}>{selectedImage.title}</h2>
              <p style={{ color: '#999', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>{selectedImage.desc}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showValentine && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5,5,5,0.95)',
              zIndex: 3000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              backdropFilter: 'blur(20px)'
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <Heart size={100} fill="#ff4d4d" color="#ff4d4d" style={{ filter: 'drop-shadow(0 0 40px #ff4d4d)' }} />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                color: '#fff',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                textTransform: 'none',
                margin: '2rem 0',
                lineHeight: 1.1
              }}
            >
              Happy Valentine's Day<br />
              <span style={{ color: '#d4af37' }}>My Love</span>
            </motion.h1>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowValentine(false)}
              style={{
                background: 'transparent',
                border: '1px solid #d4af37',
                color: '#d4af37',
                padding: '1rem 3rem',
                borderRadius: '50px',
                fontSize: '0.8rem',
                letterSpacing: '5px',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              CLOSE
            </motion.button>

            <div style={{ position: 'absolute', inset: 0, zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-20, -1200],
                    x: [0, Math.sin(i) * 100],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5]
                  }}
                  transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  style={{
                    position: 'absolute',
                    bottom: -50,
                    left: `${Math.random() * 100}%`,
                    color: i % 2 === 0 ? '#ff4d4d' : '#d4af37',
                    opacity: 0.2
                  }}
                >
                  <Heart fill="currentColor" size={20 + Math.random() * 30} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TimelineItem = ({ img, index, onClick }) => {
  const isEven = index % 2 === 0;
  return (
    <div style={{
      display: 'flex',
      justifyContent: isEven ? 'flex-start' : 'flex-end',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '10vh 5vw',
      position: 'relative'
    }}>
      {/* Connector Dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: '12px',
          height: '12px',
          background: '#d4af37',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 5,
          boxShadow: '0 0 15px #d4af37'
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: isEven ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ margin: "-20%" }}
        transition={{ duration: 1, type: 'spring' }}
        style={{ width: '40%', position: 'relative' }}
      >
        <div style={{ position: 'absolute', [isEven ? 'right' : 'left']: '-20%', top: '-2rem', textAlign: isEven ? 'right' : 'left' }}>
          <p style={{ color: '#333', fontSize: '4rem', fontWeight: '900', margin: 0, opacity: 0.3, letterSpacing: '-5px' }}>0{index + 1}</p>
          <p style={{ color: '#d4af37', letterSpacing: '4px', fontSize: '0.7rem' }}>{img.date}</p>
        </div>

        <motion.div
          whileHover={{ scale: 1.02, y: -10 }}
          onClick={onClick}
          style={{ cursor: 'pointer', background: '#111', padding: '15px', borderRadius: '30px', overflow: 'hidden' }}
        >
          <img src={img.url} style={{ width: '100%', height: '500px', objectFit: 'cover', opacity: 0.8, borderRadius: '20px' }} />
          <div style={{ padding: '2rem 0', textAlign: isEven ? 'left' : 'right' }}>
            <h3 style={{ color: '#fff', fontSize: '2rem', border: 'none', margin: 0, fontFamily: 'var(--font-heading)' }}>{img.title}</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>{img.desc}</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const AuthPopup = ({ onVerified }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toUpperCase() === "MARCH") {
      onVerified();
    } else {
      setError(true);
      setShowHint(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="full-screen"
      style={{
        background: 'rgba(0,0,0,0.95)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <motion.div
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        style={{
          width: 'min(90vw, 450px)',
          background: '#0a0a0a',
          border: '1px solid #ff4d4d',
          padding: '3rem 2rem',
          borderRadius: '30px',
          textAlign: 'center',
          boxShadow: '0 0 70px rgba(255,77,77,0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, #ff4d4d, transparent, #ff4d4d)' }} />

        <div style={{ color: '#ff4d4d', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <ShieldAlert size={64} style={{ filter: 'drop-shadow(0 0 10px rgba(255,77,77,0.5))' }} />
        </div>

        <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: '900', marginBottom: '0.5rem', border: 'none', letterSpacing: '2px' }}>
          SYSTEM ERROR
        </h2>
        <p style={{ color: '#ff4d4d', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '4px', marginBottom: '2.5rem', opacity: 0.8 }}>
          ENCRYPTED DATA SOURCE DETECTED
        </p>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem 1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
            Verification Required:<br />
            <span style={{ color: '#fff', fontWeight: 'bold' }}>"When was our love anniversary?"</span>
          </p>

          {showHint && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: '#ff4d4d', fontSize: '0.75rem', marginBottom: '1rem', fontStyle: 'italic' }}
            >
              Hint: It's a month 🗓️
            </motion.p>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ position: 'relative', marginBottom: '2rem' }}>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ENTER KEYCODE"
                autoFocus
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid rgba(255,77,77,0.5)',
                  color: '#fff',
                  padding: '1rem 0',
                  fontSize: '1.3rem',
                  textAlign: 'center',
                  outline: 'none',
                  letterSpacing: '8px',
                  fontFamily: 'monospace'
                }}
              />
              <Lock style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} size={20} color="#ff4d4d" />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, background: 'rgba(255,77,77,0.1)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-elegant"
              style={{
                width: '100%',
                borderColor: '#ff4d4d',
                color: '#ff4d4d',
                padding: '1rem',
                fontSize: '1rem',
                letterSpacing: '3px',
                fontWeight: 'bold'
              }}
            >
              AUTHENTICATE
            </motion.button>
          </form>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', opacity: 0.2 }}>
          <Command size={14} color="#fff" />
          <span style={{ fontSize: '0.6rem', color: '#fff', letterSpacing: '1px' }}>SECURITY_LAYER_V2.0.4.VALENTINE</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const App = () => {
  const [stage, setStage] = useState('landing');

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {stage === 'landing' && (
          <Landing key="landing" onEnter={() => setStage('letter')} />
        )}
        {stage === 'letter' && (
          <Letter key="letter" onNext={() => setStage('auth')} />
        )}
        {stage === 'auth' && (
          <AuthPopup key="auth" onVerified={() => setStage('gallery')} />
        )}
        {stage === 'gallery' && (
          <Gallery key="gallery" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
