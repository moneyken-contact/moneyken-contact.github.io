'use client';

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const easing = [0.16, 1, 0.3, 1] as const;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 1, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

function TiltProduct() {
  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 75, damping: 22, mass: 1.2 });
  const springY = useSpring(rotateY, { stiffness: 75, damping: 22, mass: 1.2 });

  return (
    <div className="product-perspective">
      <motion.figure
        className="product-visual"
        style={{ rotateX: springX, rotateY: springY }}
        onPointerMove={(event) => {
          if (reduceMotion || event.pointerType === 'touch') return;
          const rect = event.currentTarget.getBoundingClientRect();
          rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 3.5);
          rotateX.set(((event.clientY - rect.top) / rect.height - 0.5) * -3.5);
        }}
        onPointerLeave={() => { rotateX.set(0); rotateY.set(0); }}
      >
        <img src={`${basePath}/media/product.webp`} alt="Керамическая чашка кофе Aurelia" loading="lazy" decoding="async" />
        <figcaption>Фильтр · 240 мл · 93°</figcaption>
      </motion.figure>
    </div>
  );
}

function SmokeOrigin() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const smokeY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const smokeScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.16]);

  return (
    <section ref={sectionRef} id="origin" className="origin-section">
      <motion.img
        className="origin-smoke"
        style={{ y: smokeY, scale: smokeScale }}
        src={`${basePath}/media/smoke.webp`}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div className="origin-overlay" />
      <div className="section-index light"><span>03</span><i /></div>
      <div className="origin-grid page-grid">
        <Reveal className="origin-title">
          <p className="eyebrow">Высота формирует характер</p>
          <h2>Там, где воздух<br />становится <em>тоньше</em></h2>
        </Reveal>
        <Reveal className="origin-copy" delay={0.12}>
          <p>Наш кофе взрослеет медленно. Прохладные ночи, вулканическая почва и ручной сбор сохраняют сладость внутри каждого зерна.</p>
          <div className="origin-metrics" aria-label="Характеристики происхождения">
            <div><strong>1 850</strong><span>метров над морем</span></div>
            <div><strong>18°</strong><span>средняя температура</span></div>
            <div><strong>72h</strong><span>контролируемая ферментация</span></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.13]);
  const copyY = useTransform(scrollYProgress, [0, 1], [35, -35]);

  return (
    <section ref={sectionRef} id="ritual" className="story-section">
      <motion.img
        className="story-image"
        style={{ scale: imageScale }}
        src={`${basePath}/media/story.webp`}
        alt="Чашка кофе, книги и свежеобжаренные зёрна"
        loading="lazy"
        decoding="async"
      />
      <div className="story-shade" />
      <motion.div className="story-copy" style={{ y: copyY }}>
        <p className="eyebrow">Не спешить — тоже искусство</p>
        <h2>Ваш тихий<br /><em>ритуал</em></h2>
        <p>Утро не обязано начинаться громко. Иногда достаточно тёплой чашки, пары страниц и аромата, который возвращает в настоящий момент.</p>
      </motion.div>
      <p className="story-side">Aurelia Journal · Vol. 01</p>
    </section>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 42, damping: 24, mass: 1.4 });
  const smoothY = useSpring(pointerY, { stiffness: 42, damping: 24, mass: 1.4 });
  const mediaX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const mediaY = useTransform(smoothY, [-0.5, 0.5], [-11, 11]);
  const textX = useTransform(smoothX, [-0.5, 0.5], [9, -9]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(heroProgress, [0, 0.82], [1, 0.4]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    if (reduceMotion) videoRef.current.pause();
    else void videoRef.current.play().catch(() => undefined);
  }, [reduceMotion]);

  return (
    <main className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      <header className={`nav ${scrolled ? 'nav--compact' : ''}`}>
        <a className="brand" href="#top" aria-label="Aurelia Coffee — на главную">
          <span className="brand-mark" aria-hidden="true">A</span>
          <span>Aurelia</span>
        </a>
        <nav aria-label="Главная навигация">
          <a href="#philosophy">Философия</a>
          <a href="#origin">Происхождение</a>
          <a href="#ritual">Ритуал</a>
        </nav>
        <a className="nav-cta" href="#collection">Коллекция</a>
      </header>

      <motion.section
        ref={heroRef}
        id="top"
        className="hero"
        style={{ scale: heroScale, opacity: heroOpacity }}
        onPointerMove={(event) => {
          if (reduceMotion || event.pointerType === 'touch') return;
          const rect = event.currentTarget.getBoundingClientRect();
          pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
          pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
        }}
        onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
      >
        <motion.div className="hero-media" style={{ x: mediaX, y: mediaY }} aria-hidden="true">
          <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" poster={`${basePath}/media/hero-poster.webp`}>
            <source src={`${basePath}/media/hero.mp4`} type="video/mp4" />
          </video>
        </motion.div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit--two" aria-hidden="true" />

        <motion.div className="hero-copy" style={{ x: textX, y: textY }}>
          <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.15, delay: .08, ease: easing }}>
            Кофе<br /><em>в движении</em>
          </motion.h1>
          <motion.div className="hero-footer" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .48, ease: easing }}>
            <p>Редкие зёрна, точная обжарка и вкус, который продолжает раскрываться после первого глотка.</p>
            <a className="magnetic-link" href="#philosophy">Почувствовать глубину <span>↘</span></a>
          </motion.div>
        </motion.div>

        <div className="hero-index" aria-hidden="true"><span>01</span><i /></div>
        <p className="scroll-note">Прокрутите, чтобы раскрыть историю</p>
      </motion.section>

      <section id="philosophy" className="philosophy-section">
        <div className="section-index dark"><span>02</span><i /></div>
        <div className="philosophy-intro page-grid">
          <Reveal>
            <p className="eyebrow dark">Ничего лишнего между зерном и вкусом</p>
            <h2>Четыре жеста.<br />Один <em>характер.</em></h2>
          </Reveal>
          <Reveal className="intro-note" delay={0.12}>
            <p>Мы оставляем природе достаточно пространства, а мастерству — точность. В результате каждая чашка звучит ясно, чисто и долго.</p>
          </Reveal>
        </div>
        <div className="philosophy-visual page-grid">
          <motion.img
            src={`${basePath}/media/philosophy.webp`}
            alt="Четыре принципа кофе: зерно, огонь, заваривание и происхождение"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 1.025 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.25, ease: easing }}
          />
          <div className="principle principle--1"><b>01</b><span>Редкое зерно</span></div>
          <div className="principle principle--2"><b>02</b><span>Точный огонь</span></div>
          <div className="principle principle--3"><b>03</b><span>Чистый ритуал</span></div>
          <div className="principle principle--4"><b>04</b><span>Живое место</span></div>
        </div>
      </section>

      <SmokeOrigin />

      <section id="collection" className="product-section">
        <div className="section-index dark"><span>04</span><i /></div>
        <div className="product-grid page-grid">
          <Reveal className="product-copy">
            <p className="eyebrow dark">Signature lot · 01</p>
            <h2>Светлая<br /><em>глубина</em></h2>
            <p className="product-lead">Эфиопия Гуджи. Жасмин, абрикос, какао и долгое карамельное послевкусие.</p>
            <dl className="taste-line">
              <div><dt>Обжарка</dt><dd>Светлая</dd></div>
              <div><dt>Процесс</dt><dd>Натуральный</dd></div>
              <div><dt>Партия</dt><dd>№ 0148</dd></div>
            </dl>
            <a className="dark-link" href="#final">Открыть коллекцию <span>→</span></a>
          </Reveal>
          <Reveal className="product-media" delay={0.08}><TiltProduct /></Reveal>
        </div>
      </section>

      <section className="immersive-section">
        <motion.div
          className="pattern-layer"
          style={{ backgroundImage: `url('${basePath}/media/bean-pattern.webp')` }}
          initial={{ backgroundPosition: '50% 0%' }}
          whileInView={{ backgroundPosition: '50% 22%' }}
          viewport={{ amount: .15 }}
          transition={{ duration: 12, ease: 'linear' }}
        />
        <div className="immersive-glow" />
        <div className="section-index light"><span>05</span><i /></div>
        <Reveal className="immersive-copy">
          <p>После первого глотка</p>
          <h2>время становится<br /><em>медленнее.</em></h2>
          <div className="roast-scale" aria-label="Профиль обжарки">
            <span>Светлая</span><i><b /></i><span>Тёмная</span>
          </div>
        </Reveal>
      </section>

      <section className="craft-section">
        <div className="section-index dark"><span>06</span><i /></div>
        <div className="craft-grid page-grid">
          <Reveal className="craft-number"><span>09</span><small>минут<br />тишины</small></Reveal>
          <Reveal className="craft-copy" delay={0.1}>
            <p className="eyebrow dark">Ритуал точности</p>
            <h2>Температура.<br />Время. <em>Внимание.</em></h2>
            <p>Мы верим, что роскошь — не в сложности. Она в ощущении, что каждая деталь находится на своём месте.</p>
          </Reveal>
          <div className="craft-rings" aria-hidden="true"><i /><i /><i /><span>93°</span></div>
        </div>
      </section>

      <StorySection />

      <section id="final" className="final-section">
        <div className="final-grain" style={{ backgroundImage: `url('${basePath}/media/bean-pattern.webp')` }} />
        <Reveal className="final-copy">
          <p className="eyebrow">Ваша чашка уже близко</p>
          <h2>Оставьте место<br />для <em>глубины.</em></h2>
          <a className="final-cta" href="mailto:hello@aurelia.coffee">
            <span>Выбрать свой кофе</span><i>↗</i>
          </a>
        </Reveal>
        <footer>
          <a className="brand" href="#top"><span className="brand-mark">A</span><span>Aurelia</span></a>
          <p>Редкий кофе · Минск · 2026</p>
          <div><a href="#">Instagram</a><a href="#">Journal</a><a href="mailto:hello@aurelia.coffee">Связаться</a></div>
        </footer>
      </section>
    </main>
  );
}
