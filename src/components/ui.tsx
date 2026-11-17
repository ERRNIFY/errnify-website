"use client";

import AccountTreeRounded from "@mui/icons-material/AccountTreeRounded";
import AddRounded from "@mui/icons-material/AddRounded";
import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import CloudRounded from "@mui/icons-material/CloudRounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import HubRounded from "@mui/icons-material/HubRounded";
import LanguageRounded from "@mui/icons-material/LanguageRounded";
import NavigateNextRounded from "@mui/icons-material/NavigateNextRounded";
import PhoneIphoneRounded from "@mui/icons-material/PhoneIphoneRounded";
import SmartToyRounded from "@mui/icons-material/SmartToyRounded";
import TipsAndUpdatesRounded from "@mui/icons-material/TipsAndUpdatesRounded";
import SportsEsportsRounded from "@mui/icons-material/SportsEsportsRounded";
import WhatsApp from "@mui/icons-material/WhatsApp";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useLenis } from "lenis/react";
import { animate, AnimatePresence, motion, useInView } from "motion/react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type PointerEvent, type ReactElement, type ReactNode } from "react";
import type { Dictionary } from "@/content/dictionary";
import type { Faq } from "@/content/faq";
import { headingId, readingMinutes, type Block, type Post } from "@/content/posts";
import { projectLang, projects, projectTitle, type Project } from "@/content/projects";
import { serviceById, services, titleLang, type Service, type ServiceId } from "@/content/services";
import { site, stack } from "@/content/site";
import { formatDate, href, type Locale } from "@/lib/i18n";
import { useContactForm } from "@/lib/useContactForm";
import { glass, HOLO } from "./Registry";

/* sayfaların ortak MUI parçaları. */

export const EASE = [0.2, 0.7, 0.2, 1] as const;
export const DISPLAY = "var(--font-display)";
export const section = { position: "relative", py: { xs: 9, md: 15 } } as const;

export const ICON: Record<ServiceId, ReactElement> = {
  web: <LanguageRounded />,
  mobile: <PhoneIphoneRounded />,
  game: <SportsEsportsRounded />,
  bot: <SmartToyRounded />,
  ai: <AutoAwesomeRounded />,
  automation: <AccountTreeRounded />,
  saas: <CloudRounded />,
  web3: <HubRounded />,
};

/** İki oklu logonun düz (SVG) hâli: üst çubukta, menüde ve süslemelerde kullanılır */
export function LogoMark({ size = 24, sx }: { size?: number; sx?: SxProps<Theme> }) {
  const id = useId();
  return (
    <Box component="svg" viewBox="0 0 64 64" aria-hidden="true" sx={{ width: size, height: size, flexShrink: 0, ...sx } as SxProps<Theme>}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7cf7ff" />
          <stop offset="0.5" stopColor="#b79cff" />
          <stop offset="1" stopColor="#ff8fd8" />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`} stroke={`url(#${id})`} strokeWidth="2.4" strokeLinejoin="round">
        <path d="M8.8 25.9 21.3 12.2H35.3L22.8 25.9 35.3 39.6H21.3Z" />
        <path d="M55.2 38.1 42.7 51.8H28.7L41.2 38.1 28.7 24.4H42.7Z" />
      </g>
    </Box>
  );
}

/* ---------- hareket ---------- */

export function Reveal({ children, delay = 0, y = 36, fill = true }: { children: ReactNode; delay?: number; y?: number; fill?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      style={fill ? { height: "100%" } : undefined}
    >
      {children}
    </motion.div>
  );
}

/** İmlece göre hafifçe eğilen kart */
export function Tilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateZ(0)`;
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <Box ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} sx={{ height: "100%", transition: "transform 0.5s cubic-bezier(.2,.7,.2,1)", transformStyle: "preserve-3d" }}>
      {children}
    </Box>
  );
}

/** Sayı görünür olunca sıfırdan hedefe sayar; "7/24" gibi değerler olduğu gibi kalır */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const match = /^(\d+)(\D*)$/.exec(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || !match || !inView) return;
    const [, digits, suffix] = match;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, Number(digits), {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return <span ref={ref}>{value}</span>;
}

/* ---------- başlıklar ---------- */

export function SectionTitle({ overline, title, lead, link }: { overline: string; title: string; lead?: string; link?: { label: string; href: string } }) {
  return (
    <Reveal>
      <Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 3 }}>
        <Box>
          <Typography variant="overline" className="holo-text" component="p">
            {overline}
          </Typography>
          <Typography variant="h2" sx={{ mt: 1.5, maxWidth: "22ch", textWrap: "balance" }}>
            {title}
          </Typography>
          {lead && (
            <Typography color="text.secondary" sx={{ mt: 2.5, maxWidth: 620, fontSize: "1.15rem" }}>
              {lead}
            </Typography>
          )}
        </Box>
        {link && (
          <Button component={Link} href={link.href} variant="outlined" color="inherit" endIcon={<ArrowOutwardRounded />}>
            {link.label}
          </Button>
        )}
      </Stack>
    </Reveal>
  );
}

/** İç sayfaların üst bölümü */
export function PageHero({
  overline,
  crumbs,
  title,
  titleLang: lang,
  lead,
  children,
}: {
  overline?: string;
  crumbs?: { label: string; href: string }[];
  title: string;
  titleLang?: string;
  lead?: string;
  children?: ReactNode;
}) {
  const anim = (delay: number) => ({ initial: { opacity: 0, y: 32, filter: "blur(10px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.9, ease: EASE, delay } });
  return (
    <Container maxWidth="xl" component="header" sx={{ position: "relative", pt: { xs: 15, md: 23 }, pb: { xs: 4, md: 7 } }}>
      <motion.div {...anim(0.05)}>
        {crumbs ? (
          <Breadcrumbs separator={<NavigateNextRounded fontSize="small" />} sx={{ "& a": { color: "text.secondary", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "0.78rem", "&:hover": { color: "text.primary" } } }}>
            {crumbs.map((c) => (
              <Link key={c.href} href={c.href}>
                {c.label}
              </Link>
            ))}
            <Typography variant="caption" className="holo-text">
              {title}
            </Typography>
          </Breadcrumbs>
        ) : (
          <Typography variant="overline" className="holo-text" component="p">
            {overline}
          </Typography>
        )}
      </motion.div>
      <motion.div {...anim(0.15)}>
        <Typography variant="h1" lang={lang} sx={{ mt: 2.5, maxWidth: { xs: "100%", md: "62%" }, textWrap: "balance", fontSize: "clamp(2.1rem, 4.8vw, 4.6rem)" }}>
          {title}
        </Typography>
      </motion.div>
      {lead && (
        <motion.div {...anim(0.28)}>
          <Typography color="text.secondary" sx={{ mt: 3, maxWidth: 640, fontSize: { xs: "1.1rem", md: "1.3rem" }, lineHeight: 1.5 }}>
            {lead}
          </Typography>
        </motion.div>
      )}
      {children && <motion.div {...anim(0.38)}>{children}</motion.div>}
    </Container>
  );
}

/* ---------- kartlar ---------- */

/** Projeye özgü yanardöner kapak */
export function HoloCover({ project, locale, ratio = "16 / 10", title = true }: { project: Project; locale: Locale; ratio?: string; title?: boolean }) {
  const index = projects.indexOf(project);
  const angle = 40 + index * 53;
  return (
    <Box
      sx={{
        position: "relative",
        aspectRatio: ratio,
        overflow: "hidden",
        background: `
          radial-gradient(120% 90% at var(--gx, ${20 + ((index * 37) % 60)}%) var(--gy, 20%), rgba(255,255,255,0.5), transparent 46%),
          conic-gradient(from ${angle}deg at ${30 + ((index * 23) % 40)}% ${40 + ((index * 17) % 30)}%, #7cf7ff, #b79cff, #ff8fd8, #1b1b2a, #7cf7ff)`,
        "&::after": { content: '""', position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 35%, rgba(7,7,10,0.86))" },
      }}
    >
      {title && (
        <Typography lang={projectLang(project, locale)} sx={{ position: "absolute", left: 20, bottom: 14, right: 20, zIndex: 1, fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
          {projectTitle(project, locale)}
        </Typography>
      )}
    </Box>
  );
}

export function ProjectCard({ project: p, locale, t }: { project: Project; locale: Locale; t: Dictionary }) {
  return (
    <Tilt>
      <Card sx={{ ...glass, height: "100%" }}>
        <CardActionArea component={Link} href={href(locale, `/portfolio/${p.slug}`)} sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}>
          <HoloCover project={p} locale={locale} />
          <Box sx={{ p: 2.5, flex: 1 }}>
            <Typography color="text.secondary">{p.tagline[locale]}</Typography>
            <Stack direction="row" spacing={0.75} useFlexGap sx={{ mt: 2, flexWrap: "wrap" }}>
              {p.status && <Chip size="small" label={t.portfolio[p.status]} color="secondary" />}
              {p.count && <Chip size="small" label={p.count[locale]} color="primary" variant="outlined" />}
              {p.services.map((id) => (
                <Chip key={id} size="small" variant="outlined" label={serviceById(id).title[locale]} />
              ))}
            </Stack>
          </Box>
        </CardActionArea>
      </Card>
    </Tilt>
  );
}

/** Yazı kapağı: adrese göre değişen yanardöner zemin, üstünde konunun simgesi */
export function PostCover({ post, locale, big, sx }: { post: Post; locale: Locale; big?: boolean; sx?: SxProps<Theme> }) {
  const seed = Array.from(post.slug).reduce((n, ch) => (n * 31 + ch.charCodeAt(0)) % 9973, 7);
  const x = 18 + (seed % 60);
  const y = 22 + ((seed >> 3) % 50);
  return (
    <Box
      sx={
        {
          position: "relative",
          aspectRatio: "16 / 8",
          overflow: "hidden",
          background: `radial-gradient(90% 120% at ${x}% ${y}%, rgba(255,255,255,0.4), transparent 42%), conic-gradient(from ${seed % 360}deg at ${100 - x}% ${y}%, #7cf7ff, #b79cff, #ff8fd8, #15151f, #7cf7ff)`,
          "&::after": { content: '""', position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(7,7,10,0.05) 15%, rgba(7,7,10,0.82))" },
          ...sx,
        } as SxProps<Theme>
      }
    >
      <Box aria-hidden="true" sx={{ position: "absolute", right: "6%", top: "50%", transform: "translateY(-50%) rotate(-10deg)", zIndex: 1, lineHeight: 0, "& svg": { fontSize: big ? "clamp(7rem, 17vw, 14rem)" : "6.5rem", color: "rgba(255,255,255,0.92)", filter: "drop-shadow(0 10px 30px rgba(7,7,10,0.5))" } }}>
        {ICON[post.topic]}
      </Box>
      <Chip
        size="small"
        label={serviceById(post.topic).title[locale]}
        sx={{ position: "absolute", left: big ? 24 : 16, bottom: big ? 20 : 14, zIndex: 1, background: "rgba(7,7,10,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
      />
    </Box>
  );
}

export function PostCard({ post: p, locale, t, wide }: { post: Post; locale: Locale; t: Dictionary; wide?: boolean }) {
  return (
    <Card sx={{ ...glass, height: "100%", transition: "border-color .3s, transform .4s cubic-bezier(.2,.7,.2,1)", "&:hover": { borderColor: "rgba(255,255,255,0.3)", transform: "translateY(-6px)" } }}>
      <CardActionArea
        component={Link}
        href={href(locale, `/blog/${p.slug}`)}
        sx={{ height: "100%", display: wide ? { xs: "flex", md: "grid" } : "flex", flexDirection: "column", gridTemplateColumns: wide ? { md: "1.1fr 1fr" } : undefined, alignItems: "stretch" }}
      >
        <PostCover post={p} locale={locale} big={wide} sx={wide ? { aspectRatio: { xs: "16 / 9", md: "auto" }, minHeight: { md: 340 } } : undefined} />
        <Box sx={{ p: wide ? { xs: 3, md: 5 } : 3, display: "flex", flexDirection: "column", flex: 1 }}>
          <Typography variant={wide ? "h2" : "h4"} component="h3" sx={wide ? { fontSize: "clamp(1.5rem, 2.6vw, 2.3rem)" } : { fontSize: "1.2rem", lineHeight: 1.3 }}>
            {p.title[locale]}
          </Typography>
          <Typography color="text.secondary" variant={wide ? "body1" : "body2"} sx={{ mt: 1.5, mb: 3 }}>
            {p.excerpt[locale]}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: "auto" }}>
            {formatDate(p.date, locale)} · {readingMinutes(p, locale)} {t.blog.minutes}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export function ServiceCard({ service: s, locale, note }: { service: Service; locale: Locale; note?: string }) {
  return (
    <Card sx={{ ...glass, height: "100%", transition: "border-color .3s, transform .4s cubic-bezier(.2,.7,.2,1)", "&:hover": { borderColor: "rgba(255,255,255,0.3)", transform: "translateY(-6px)" }, "&:hover .go": { transform: "translate(3px,-3px)", color: "#7cf7ff" } }}>
      <CardActionArea component={Link} href={href(locale, `/services/${s.slug}`)} sx={{ height: "100%", p: 3.5, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Stack direction="row" sx={{ width: "100%", justifyContent: "space-between", alignItems: "flex-start" }}>
          <ServiceIcon id={s.id} />
          <ArrowOutwardRounded className="go" sx={{ color: "text.secondary", transition: "transform .3s, color .3s" }} />
        </Stack>
        <Typography variant="h3" lang={titleLang(s, locale)} sx={{ mt: 4 }}>
          {s.title[locale]}
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mt: 1.5 }}>
          {s.short[locale]}
        </Typography>
        {note && (
          <Typography variant="caption" sx={{ mt: "auto", pt: 3, fontFamily: "var(--font-mono)", color: "#7cf7ff" }}>
            {note}
          </Typography>
        )}
      </CardActionArea>
    </Card>
  );
}

/** Yanardöner çerçeveli hizmet simgesi */
export function ServiceIcon({ id, size = 56 }: { id: ServiceId; size?: number }) {
  return (
    <Box sx={{ width: size, height: size, borderRadius: "30%", p: "1.5px", background: HOLO, flexShrink: 0 }}>
      <Box sx={{ width: "100%", height: "100%", borderRadius: "inherit", bgcolor: "#0d0d13", display: "grid", placeItems: "center", "& svg": { fontSize: size * 0.48 } }}>{ICON[id]}</Box>
    </Box>
  );
}

/* ---------- bölümler ---------- */

export function ProcessStepper({ steps }: { steps: Dictionary["process"] }) {
  const [step, setStep] = useState(0);
  return (
    <Paper sx={{ ...glass, mt: { xs: 5, md: 7 }, p: { xs: 2.5, md: 5 } }}>
      <Stepper nonLinear activeStep={step} alternativeLabel sx={{ display: { xs: "none", md: "flex" }, "& .MuiStepIcon-root.Mui-active": { color: "#b79cff" }, "& .MuiStepIcon-text": { fill: "#07070a", fontWeight: 700 } }}>
        {steps.map((s, i) => (
          <Step key={s.title} completed={false}>
            <StepButton onClick={() => setStep(i)} sx={{ "& .MuiStepLabel-label": { fontFamily: DISPLAY, fontWeight: 600, fontSize: "0.95rem" } }}>
              {s.title}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Stack direction="row" spacing={1} useFlexGap sx={{ display: { md: "none" }, flexWrap: "wrap" }}>
        {steps.map((s, i) => (
          <Chip key={s.title} label={`${i + 1} · ${s.title}`} onClick={() => setStep(i)} color={step === i ? "primary" : "default"} variant={step === i ? "filled" : "outlined"} aria-pressed={step === i} />
        ))}
      </Stack>
      <Box sx={{ mt: { xs: 3, md: 5 }, minHeight: { xs: 150, md: 120 }, display: "grid", gridTemplateColumns: { md: "auto 1fr" }, gap: { xs: 1, md: 5 }, alignItems: "center" }}>
        <Typography className="holo-text" sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: { xs: "3.5rem", md: "6rem" }, lineHeight: 1 }}>
          0{step + 1}
        </Typography>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <Typography variant="h3">{steps[step].title}</Typography>
            <Typography color="text.secondary" sx={{ mt: 1.5, maxWidth: 640, fontSize: "1.15rem" }}>
              {steps[step].text}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Paper>
  );
}

export function StackMarquee({ label }: { label: string }) {
  return (
    <Box component="section" aria-label={label} sx={{ position: "relative", py: 5, overflow: "hidden", borderBlock: "1px solid", borderColor: "divider", background: "rgba(7,7,10,0.5)", backdropFilter: "blur(10px)" }}>
      {stack.map((row, r) => (
        <Box key={r} sx={{ display: "flex", width: "max-content", py: 0.75, animation: `site-marquee ${r % 2 ? 60 : 48}s linear infinite ${r % 2 ? "reverse" : "normal"}` }}>
          {[0, 1].map((copy) => (
            <Stack key={copy} direction="row" spacing={1.5} component="ul" aria-hidden={copy === 1 ? true : undefined} sx={{ listStyle: "none", m: 0, p: 0, pr: 1.5, flexShrink: 0 }}>
              {row.map((name) => (
                <Chip key={name} component="li" label={name} variant="outlined" sx={{ height: 46, px: 1.5, fontSize: "0.95rem", borderColor: "rgba(255,255,255,0.18)" }} />
              ))}
            </Stack>
          ))}
        </Box>
      ))}
    </Box>
  );
}

/** Soru listesi. Aynı anda en fazla bir soru açık kalır: biri açılınca diğeri kapanır. */
export function FaqAccordion({ items, locale }: { items: Faq[]; locale: Locale }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Stack spacing={1.5}>
      {items.map((f) => (
        <Accordion
          key={f.q.en}
          expanded={open === f.q.en}
          onChange={(_, expanded) => setOpen(expanded ? f.q.en : null)}
          disableGutters
          elevation={0}
          sx={{ ...glass, borderRadius: "18px !important", transition: "border-color .3s", "&.Mui-expanded": { borderColor: "rgba(183,156,255,0.5)" } }}
        >
          <AccordionSummary expandIcon={<AddRounded />} sx={{ px: 3, py: 1, "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": { transform: "rotate(45deg)", color: "#b79cff" } }}>
            <Typography component="h3" sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
              {f.q[locale]}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 3 }}>
            <Typography color="text.secondary">{f.a[locale]}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}

export function CtaBand({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <Box component="section" sx={{ ...section, pt: { xs: 4, md: 6 } }}>
      <Container maxWidth="xl">
        <Reveal>
          <Box sx={{ p: "1.5px", borderRadius: "30px", background: HOLO }}>
            <Box sx={{ borderRadius: "29px", background: "rgba(9,9,14,0.92)", backdropFilter: "blur(20px)", p: { xs: 4, md: 9 }, display: "grid", gridTemplateColumns: { md: "1.4fr 1fr" }, gap: { xs: 4, md: 8 }, alignItems: "end" }}>
              <Box>
                <Typography variant="overline" className="holo-text" component="p">
                  {t.cta_block.eyebrow}
                </Typography>
                <Typography variant="h2" sx={{ mt: 1.5, fontSize: "clamp(2rem, 4.6vw, 4.2rem)" }}>
                  {t.cta_block.title}
                </Typography>
              </Box>
              <Box>
                <Typography color="text.secondary" sx={{ fontSize: "1.15rem" }}>
                  {t.cta_block.lead}
                </Typography>
                <Stack direction="row" spacing={1.5} useFlexGap sx={{ mt: 3.5, flexWrap: "wrap" }}>
                  <Button component={Link} href={href(locale, "/contact")} variant="contained" size="large" endIcon={<ArrowOutwardRounded />}>
                    {t.cta.start}
                  </Button>
                  <Button href={site.whatsapp} target="_blank" rel="noopener noreferrer" variant="outlined" size="large" color="inherit" endIcon={<WhatsApp />}>
                    {t.cta.whatsapp}
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}

export function PostBody({ blocks }: { blocks: Block[] }) {
  const text = { color: "text.secondary", fontSize: "1.1rem", lineHeight: 1.75 } as const;
  return (
    <Box>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <Typography key={i} variant="h3" component="h2" id={headingId(b.text)} sx={{ mt: 6, mb: 1.5, scrollMarginTop: 104 }}>
                {b.text}
              </Typography>
            );
          case "ul":
            return (
              <List key={i} dense>
                {b.items.map((item) => (
                  <ListItem key={item} disableGutters sx={{ alignItems: "flex-start" }}>
                    <ListItemIcon sx={{ minWidth: 34, mt: 0.6, color: "#b79cff" }}>
                      <CheckCircleRounded fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item} slotProps={{ primary: { sx: { fontSize: "1.0625rem", lineHeight: 1.65, color: "text.secondary" } } }} />
                  </ListItem>
                ))}
              </List>
            );
          case "ol":
            return (
              <Stack key={i} component="ol" spacing={1.75} sx={{ listStyle: "none", p: 0, my: 2.5 }}>
                {b.items.map((item, n) => (
                  <Stack key={item} component="li" direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
                    <Box sx={{ width: 32, height: 32, flexShrink: 0, mt: 0.25, borderRadius: "50%", p: "1.5px", background: HOLO }}>
                      <Box sx={{ width: "100%", height: "100%", borderRadius: "50%", bgcolor: "#0d0d13", display: "grid", placeItems: "center", fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 700 }}>{n + 1}</Box>
                    </Box>
                    <Typography sx={{ ...text, fontSize: "1.0625rem", lineHeight: 1.65 }}>{item}</Typography>
                  </Stack>
                ))}
              </Stack>
            );
          case "quote":
            return (
              <Typography key={i} component="blockquote" sx={{ my: 4, mx: 0, pl: 3, borderLeft: "3px solid #b79cff", fontSize: "1.4rem", lineHeight: 1.4, fontWeight: 600 }}>
                {b.text}
              </Typography>
            );
          case "note":
            return (
              <Stack key={i} direction="row" spacing={2} sx={{ my: 4, p: { xs: 2.5, md: 3 }, borderRadius: 3, background: "rgba(124,247,255,0.06)", border: "1px solid rgba(124,247,255,0.24)" }}>
                <TipsAndUpdatesRounded sx={{ color: "#7cf7ff", mt: 0.25 }} />
                <Box>
                  {b.title && <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{b.title}</Typography>}
                  <Typography sx={{ color: "text.secondary", lineHeight: 1.65 }}>{b.text}</Typography>
                </Box>
              </Stack>
            );
          default:
            return (
              <Typography key={i} sx={{ ...text, mt: i === 0 ? 0 : 2.25 }}>
                {b.text}
              </Typography>
            );
        }
      })}
    </Box>
  );
}

/** İçindekiler: yazıdaki bölüm başlıkları. Okunan bölüm vurgulanır, tıklayınca o bölüme kayar. */
export function PostToc({ blocks, label }: { blocks: Block[]; label: string }) {
  const headings = blocks.filter((b) => b.type === "h2").map((b) => ({ id: headingId(b.text), text: b.text }));
  const [active, setActive] = useState(headings[0]?.id ?? "");
  const lenis = useLenis();
  const ids = headings.map((h) => h.id).join("|");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = "";
      for (const id of ids.split("|")) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) current = id;
      }
      setActive(current || ids.split("|")[0]);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ids]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -100 });
    else el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <Box component="nav" aria-label={label}>
      <Stack component="ol" sx={{ listStyle: "none", p: 0, m: 0, borderLeft: "1px solid", borderColor: "divider" }}>
        {headings.map((h) => {
          const on = h.id === active;
          return (
            <Box component="li" key={h.id}>
              <ButtonBase
                component="a"
                href={`#${h.id}`}
                aria-current={on ? "location" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(h.id);
                }}
                sx={{
                  width: "100%",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  py: 0.9,
                  pl: 2,
                  ml: "-1px",
                  borderLeft: "2px solid",
                  borderColor: on ? "#b79cff" : "transparent",
                  color: on ? "text.primary" : "text.secondary",
                  fontSize: "0.95rem",
                  fontWeight: on ? 700 : 500,
                  lineHeight: 1.35,
                  transition: "color .25s, border-color .25s",
                  "&:hover": { color: "text.primary" },
                }}
              >
                {h.text}
              </ButtonBase>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}

/** Sayfanın üstünde, yazının ne kadarının okunduğunu gösteren ince çizgi */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = document.getElementById(targetId);
      if (!el || !ref.current) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const done = Math.min(1, Math.max(0, (window.innerHeight * 0.4 - rect.top) / Math.max(total, 1)));
      ref.current.style.transform = `scaleX(${done})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [targetId]);
  return <Box ref={ref} aria-hidden="true" sx={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 1300, background: HOLO, transformOrigin: "left", transform: "scaleX(0)" }} />;
}

/** İletişim formu: MUI alanlarıyla */
export function ContactForm({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [topic, setTopic] = useState("");
  const f = t.contact.form;
  const { errors, onSubmit } = useContactForm(f, site.email, site.whatsapp);
  return (
    <Paper component="form" onSubmit={onSubmit} noValidate sx={{ ...glass, p: { xs: 2.5, md: 5 } }}>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth name="name" autoComplete="name" label={f.name} error={!!errors.name} helperText={errors.name} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth name="email" type="email" autoComplete="email" label={f.email} error={!!errors.email} helperText={errors.email} />
        </Grid>
        <Grid size={12}>
          <Typography variant="caption" color="text.secondary" component="p" id="contact-topic">
            {f.service}
          </Typography>
          <input type="hidden" name="topic" value={topic} />
          <Stack direction="row" spacing={1} useFlexGap sx={{ mt: 1.25, flexWrap: "wrap" }} role="group" aria-labelledby="contact-topic">
            {services.map((s) => {
              const name = s.title[locale];
              const on = topic === name;
              return <Chip key={s.id} icon={ICON[s.id]} label={name} onClick={() => setTopic(on ? "" : name)} color={on ? "primary" : "default"} variant={on ? "filled" : "outlined"} aria-pressed={on} />;
            })}
          </Stack>
        </Grid>
        <Grid size={12}>
          <TextField fullWidth multiline minRows={5} name="message" label={f.message} placeholder={f.messagePh} error={!!errors.message} helperText={errors.message} />
        </Grid>
      </Grid>
      <Stack direction="row" spacing={1.5} useFlexGap sx={{ mt: 3, flexWrap: "wrap" }}>
        <Button type="submit" value="email" variant="contained" size="large" endIcon={<EmailRounded />}>
          {f.sendEmail}
        </Button>
        <Button type="submit" value="whatsapp" variant="outlined" size="large" color="inherit" endIcon={<WhatsApp />}>
          {f.sendWhatsapp}
        </Button>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2.5, maxWidth: 560 }}>
        {f.note}
      </Typography>
    </Paper>
  );
}
