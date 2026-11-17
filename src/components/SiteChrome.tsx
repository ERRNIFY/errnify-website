"use client";

import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import KeyboardArrowUpRounded from "@mui/icons-material/KeyboardArrowUpRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import PhoneRounded from "@mui/icons-material/PhoneRounded";
import WhatsApp from "@mui/icons-material/WhatsApp";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { getDictionary } from "@/content/dictionary";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { href, type Locale } from "@/lib/i18n";
import { DISPLAY, EASE, LogoMark } from "./ui";

/* Sitenin çerçevesi: 3D sahne, üst çubuk ve alt bilgi. Sayfalar arasında gezinirken yerinde kalır. */

const Scene = dynamic(() => import("./Scene"), { ssr: false });

/** WebGL yoksa (ya da sahne açılamazsa) gösterilen, yalnızca CSS ile çizilen arka plan */
function Backdrop() {
  const orb = { position: "absolute", borderRadius: "50%", filter: "blur(90px)", opacity: 0.5 } as const;
  return (
    <Box aria-hidden="true" sx={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none", bgcolor: "#07070a" }}>
      <Box sx={{ ...orb, width: "46vw", height: "46vw", right: "-8vw", top: "-6vw", background: "#b79cff", animation: "site-drift 22s ease-in-out infinite alternate" }} />
      <Box sx={{ ...orb, width: "38vw", height: "38vw", left: "-10vw", top: "38vh", background: "#7cf7ff", opacity: 0.28, animation: "site-drift 28s ease-in-out infinite alternate-reverse" }} />
      <Box sx={{ ...orb, width: "34vw", height: "34vw", right: "8vw", bottom: "-12vw", background: "#ff8fd8", opacity: 0.3, animation: "site-drift 25s ease-in-out infinite alternate" }} />
      <Box sx={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)", backgroundSize: "34px 34px", maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000, transparent 75%)" }} />
    </Box>
  );
}

/** 3D sahne hata verirse sayfanın geri kalanı çalışmaya devam eder */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Backdrop /> : this.props.children;
  }
}

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Sayfa değişince yumuşak kaydırmayı en üste sıfırlar */
function ScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis, pathname]);
  return null;
}

/** Sağ alt köşedeki yuvarlak düğmeler: sayfa başına dön; mobilde ayrıca arama ve WhatsApp */
function FloatingActions({ labels }: { labels: { top: string; call: string; whatsapp: string } }) {
  const lenis = useLenis();
  const show = useScrollTrigger({ disableHysteresis: true, threshold: 320 });
  const ref = useRef<HTMLButtonElement>(null);

  // Aşağı indikçe düğme yavaş yavaş koyulaşır: kaydırma miktarı CSS değişkenine yazılır
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, (window.scrollY - 320) / 1600));
      ref.current?.style.setProperty("--depth", progress.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const circle = {
    width: 48,
    height: 48,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.22)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    color: "#f4f2ee",
    transition: "background-color .3s, border-color .3s, transform .3s cubic-bezier(.2,.7,.2,1)",
    "&:hover": { transform: "translateY(-3px)", borderColor: "rgba(255,255,255,0.5)" },
  } as const;

  return (
    <Stack spacing={1.25} sx={{ position: "fixed", right: { xs: 14, md: 24 }, bottom: { xs: "calc(14px + env(safe-area-inset-bottom))", md: 24 }, zIndex: 1100, alignItems: "center" }}>
      <ButtonBase component="a" href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={labels.whatsapp} sx={{ ...circle, display: { xs: "inline-flex", md: "none" }, background: "rgba(13,13,19,0.72)", "& svg": { color: "#4fe38a" } }}>
        <WhatsApp />
      </ButtonBase>
      <ButtonBase component="a" href={site.phoneHref} aria-label={labels.call} sx={{ ...circle, display: { xs: "inline-flex", md: "none" }, background: "rgba(13,13,19,0.72)", "& svg": { color: "#7cf7ff" } }}>
        <PhoneRounded />
      </ButtonBase>
      <Collapse in={show} timeout={350} unmountOnExit={false}>
        <ButtonBase
          ref={ref}
          onClick={toTop}
          aria-label={labels.top}
          tabIndex={show ? 0 : -1}
          sx={{
            ...circle,
            // --depth: 0 (yeni belirdi, yarı saydam) → 1 (sayfanın derinlerinde, koyu)
            background: "rgba(13, 13, 19, calc(0.3 + 0.62 * var(--depth, 0)))",
            opacity: "calc(0.5 + 0.5 * var(--depth, 0))",
            "&:hover": { ...circle["&:hover"], opacity: 1, background: "rgba(13,13,19,0.95)" },
          }}
        >
          <KeyboardArrowUpRounded />
        </ButtonBase>
      </Collapse>
    </Stack>
  );
}

export function SiteChrome({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [smooth, setSmooth] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 30 });
  const home = href(locale);
  const isHome = pathname === home;

  useEffect(() => {
    // Yumuşak kaydırma yalnızca hareket azaltma istenmediyse ve fareyle kullanılan cihazlarda
    const ok = !window.matchMedia("(prefers-reduced-motion: reduce)").matches && window.matchMedia("(pointer: fine)").matches;
    const id = requestAnimationFrame(() => {
      setSmooth(ok);
      setWebgl(canUseWebGL());
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const links = [
    { label: t.nav.services, href: href(locale, "/services") },
    { label: t.nav.portfolio, href: href(locale, "/portfolio") },
    { label: t.nav.about, href: href(locale, "/about") },
    { label: t.nav.blog, href: href(locale, "/blog") },
    { label: t.nav.faq, href: href(locale, "/faq") },
  ];
  const contact = href(locale, "/contact");
  const other: Locale = locale === "tr" ? "en" : "tr";
  const otherHref = pathname.replace(/^\/(tr|en)(?=\/|$)/, `/${other}`);

  const page = (
    <Box sx={{ position: "relative", zIndex: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        color="transparent"
        sx={{
          transition: "background-color .4s, backdrop-filter .4s, border-color .4s",
          borderBottom: "1px solid",
          borderColor: scrolled ? "divider" : "transparent",
          ...(scrolled ? { background: "rgba(7,7,10,0.72)", backdropFilter: "blur(16px)" } : {}),
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 76 }, gap: 1 }}>
            <Typography component={Link} href={home} lang="en" sx={{ mr: "auto", display: "inline-flex", alignItems: "center", gap: 1.25, fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.02em", color: "inherit", textDecoration: "none" }}>
              <LogoMark size={26} />
              <span>
                ERRNIFY<span className="holo-text">_</span>
              </span>
            </Typography>
            <Stack direction="row" spacing={0.5} sx={{ display: { xs: "none", lg: "flex" }, mr: 2 }}>
              {links.map((l) => {
                const active = pathname.startsWith(l.href);
                return (
                  <Button key={l.href} component={Link} href={l.href} color="inherit" aria-current={active ? "page" : undefined} sx={{ color: active ? "text.primary" : "text.secondary", fontWeight: 600, "&:hover": { color: "text.primary" }, ...(active ? { background: "rgba(255,255,255,0.08)" } : {}) }}>
                    {l.label}
                  </Button>
                );
              })}
            </Stack>
            <ToggleButtonGroup size="small" exclusive value={locale} aria-label={t.nav.language} sx={{ "& .MuiToggleButton-root": { px: 1.5, py: 0.6 } }}>
              <ToggleButton value="tr" component={Link} href={locale === "tr" ? pathname : otherHref} hrefLang="tr">
                TR
              </ToggleButton>
              <ToggleButton value="en" component={Link} href={locale === "en" ? pathname : otherHref} hrefLang="en">
                EN
              </ToggleButton>
            </ToggleButtonGroup>
            <Button component={Link} variant="contained" href={contact} sx={{ display: { xs: "none", sm: "inline-flex" }, ml: 1 }}>
              {t.cta.start}
            </Button>
            <IconButton aria-label={t.nav.menu} onClick={() => setMenu(true)} sx={{ display: { lg: "none" }, ml: 0.5, border: "1px solid", borderColor: "divider" }}>
              <MenuRounded />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobil menü: tam ekran, arka planda ışıltılı renkler ve büyük logo */}
      <Drawer
        anchor="right"
        open={menu}
        onClose={() => setMenu(false)}
        slotProps={{ paper: { sx: { width: "100vw", maxWidth: 520, bgcolor: "#07070a", backgroundImage: "none", overflow: "hidden" }, "data-lenis-prevent": true } as object }}
      >
        <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <Box sx={{ position: "absolute", width: 380, height: 380, right: -150, top: -120, borderRadius: "50%", background: "#8a6bff", filter: "blur(90px)", opacity: 0.55 }} />
          <Box sx={{ position: "absolute", width: 300, height: 300, left: -160, top: "38%", borderRadius: "50%", background: "#34d6f0", filter: "blur(100px)", opacity: 0.3 }} />
          <Box sx={{ position: "absolute", width: 340, height: 340, right: -120, bottom: -140, borderRadius: "50%", background: "#ff7fd2", filter: "blur(100px)", opacity: 0.34 }} />
          <Box sx={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)", backgroundSize: "26px 26px", maskImage: "linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)" }} />
          <Box sx={{ position: "absolute", right: -70, bottom: 90, animation: "site-float 9s ease-in-out infinite alternate" }}>
            <LogoMark size={330} sx={{ opacity: 0.32, transform: "rotate(-14deg)", filter: "drop-shadow(0 0 50px rgba(183,156,255,0.6))" }} />
          </Box>
        </Box>

        <Box sx={{ position: "relative", display: "flex", flexDirection: "column", minHeight: "100%", px: 3, pb: 3.5, overflowY: "auto" }}>
          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", minHeight: 64 }}>
            <Typography component={Link} href={home} lang="en" onClick={() => setMenu(false)} sx={{ display: "inline-flex", alignItems: "center", gap: 1.25, fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.02em", color: "inherit", textDecoration: "none" }}>
              <LogoMark size={26} />
              <span>
                ERRNIFY<span className="holo-text">_</span>
              </span>
            </Typography>
            <IconButton aria-label={t.nav.close} onClick={() => setMenu(false)} sx={{ border: "1px solid", borderColor: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }}>
              <CloseRounded />
            </IconButton>
          </Stack>

          <Box component="nav" aria-label={t.nav.menu} sx={{ mt: 3 }}>
            {[...links, { label: t.nav.contact, href: contact }].map((l, i) => {
              const active = pathname.startsWith(l.href);
              return (
                <motion.div key={l.href} initial={{ opacity: 0, x: 44 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, ease: EASE, delay: 0.14 + i * 0.06 }}>
                  <ButtonBase
                    component={Link}
                    href={l.href}
                    onClick={() => setMenu(false)}
                    aria-current={active ? "page" : undefined}
                    sx={{
                      width: "100%",
                      justifyContent: "space-between",
                      py: 1.9,
                      borderBottom: "1px solid rgba(255,255,255,0.12)",
                      fontFamily: DISPLAY,
                      fontWeight: 700,
                      fontSize: "clamp(1.6rem, 7.4vw, 2.1rem)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.1,
                      "& .go": { fontSize: 26, color: active ? "#7cf7ff" : "rgba(255,255,255,0.45)", transition: "transform .3s, color .3s" },
                      "&:active .go, &:hover .go": { transform: "translate(4px,-4px)", color: "#7cf7ff" },
                    }}
                  >
                    <span className={active ? "holo-text" : undefined}>{l.label}</span>
                    <ArrowOutwardRounded className="go" />
                  </ButtonBase>
                </motion.div>
              );
            })}
          </Box>

          <motion.div style={{ marginTop: "auto" }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}>
            <Button component={Link} fullWidth variant="contained" size="large" href={contact} onClick={() => setMenu(false)} endIcon={<ArrowOutwardRounded />} sx={{ mt: 4, minHeight: 56 }}>
              {t.cta.start}
            </Button>
            <Stack spacing={1} sx={{ mt: 3, "& a": { display: "inline-flex", alignItems: "center", gap: 1.25, color: "inherit", textDecoration: "none", fontWeight: 600 }, "& svg": { color: "#b79cff", fontSize: 20 } }}>
              <a href={`mailto:${site.email}`}>
                <EmailRounded />
                {site.email}
              </a>
              <a href={site.phoneHref}>
                <PhoneRounded />
                {site.phone}
              </a>
            </Stack>
            <Stack direction="row" sx={{ mt: 3, alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="caption" color="text.secondary">
                {site.hours[locale]}
              </Typography>
              <ToggleButtonGroup size="small" exclusive value={locale} aria-label={t.nav.language} sx={{ "& .MuiToggleButton-root": { px: 1.75, py: 0.7 } }}>
                <ToggleButton value="tr" component={Link} href={locale === "tr" ? pathname : otherHref} hrefLang="tr" onClick={() => setMenu(false)}>
                  TR
                </ToggleButton>
                <ToggleButton value="en" component={Link} href={locale === "en" ? pathname : otherHref} hrefLang="en" onClick={() => setMenu(false)}>
                  EN
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </motion.div>
        </Box>
      </Drawer>

      <main>{children}</main>
      <FloatingActions labels={{ top: locale === "tr" ? "Sayfa başına dön" : "Back to top", call: t.cta.call, whatsapp: t.cta.whatsapp }} />

      <Box component="footer" sx={{ position: "relative", overflow: "hidden", borderTop: "1px solid", borderColor: "divider", background: "rgba(7,7,10,0.72)", backdropFilter: "blur(14px)" }}>
        <Container maxWidth="xl" sx={{ pt: 8 }}>
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box component={Link} href={home} lang="en" aria-label="Errnify" sx={{ display: "inline-flex", alignItems: "center", gap: 1.75, textDecoration: "none" }}>
                <LogoMark size={54} />
                <Typography component="span" className="holo-text" sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(2rem, 3.4vw, 2.75rem)", lineHeight: 1, letterSpacing: "-0.04em" }}>
                  ERRNIFY
                </Typography>
              </Box>
              <Typography color="text.secondary" sx={{ mt: 3, maxWidth: 380 }}>
                {site.description[locale]}
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
              <Typography variant="overline" color="text.secondary" component="h2">
                {t.footer.pages}
              </Typography>
              <Stack spacing={1} sx={{ mt: 2, "& a": { color: "inherit", textDecoration: "none", "&:hover": { color: "#7cf7ff" } } }}>
                {[...links, { label: t.nav.contact, href: contact }].map((l) => (
                  <Link key={l.href} href={l.href}>
                    {l.label}
                  </Link>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Typography variant="overline" color="text.secondary" component="h2">
                {t.footer.services}
              </Typography>
              <Stack spacing={1} sx={{ mt: 2, "& a": { color: "inherit", textDecoration: "none", "&:hover": { color: "#7cf7ff" } } }}>
                {services.map((s) => (
                  <Link key={s.id} href={href(locale, `/services/${s.slug}`)}>
                    {s.title[locale]}
                  </Link>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="overline" color="text.secondary" component="h2">
                {t.footer.contact}
              </Typography>
              <Stack spacing={1} component="address" sx={{ mt: 2, fontStyle: "normal", "& a": { color: "inherit", fontWeight: 700, fontSize: "1.1rem", textDecoration: "none", "&:hover": { color: "#7cf7ff" } } }}>
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <a href={site.phoneHref}>{site.phone}</a>
                <Typography color="text.secondary" variant="body2" sx={{ pt: 1, maxWidth: 260 }}>
                  {site.address[locale]}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {site.hours[locale]}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
        <Divider sx={{ mt: { xs: 6, md: 9 } }} />
        <Container maxWidth="xl" sx={{ py: 2.5, pr: { xs: 10, md: 13 }, display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "space-between" }}>
          <Typography variant="caption" color="text.secondary">
            © {site.year} Errnify. {t.footer.rights}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {t.footer.tagline}
          </Typography>
        </Container>
      </Box>
    </Box>
  );

  return (
    <>
      {webgl === false ? (
        <Backdrop />
      ) : webgl ? (
        <SceneBoundary>
          <Scene home={isHome} />
        </SceneBoundary>
      ) : null}
      {smooth ? (
        <ReactLenis root options={{ lerp: 0.085 }}>
          <ScrollReset />
          {page}
        </ReactLenis>
      ) : (
        page
      )}
    </>
  );
}
