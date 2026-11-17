"use client";

import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import EastRounded from "@mui/icons-material/EastRounded";
import BrushRounded from "@mui/icons-material/BrushRounded";
import CodeRounded from "@mui/icons-material/CodeRounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import FlagRounded from "@mui/icons-material/FlagRounded";
import HelpOutlineRounded from "@mui/icons-material/HelpOutlineRounded";
import PhoneRounded from "@mui/icons-material/PhoneRounded";
import PlaceRounded from "@mui/icons-material/PlaceRounded";
import ScheduleRounded from "@mui/icons-material/ScheduleRounded";
import TravelExploreRounded from "@mui/icons-material/TravelExploreRounded";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { getDictionary } from "@/content/dictionary";
import { faqCategories, faqs, type Faq } from "@/content/faq";
import { getPost, posts, readingMinutes } from "@/content/posts";
import { featuredProjects, getProject, projectLang, projects, projectsByService, projectTitle } from "@/content/projects";
import { serviceDetails } from "@/content/serviceDetails";
import { getService, serviceById, services, titleLang, type ServiceId } from "@/content/services";
import { site } from "@/content/site";
import { formatDate, href, type Locale } from "@/lib/i18n";
import { glass, HOLO } from "./Registry";
import { ContactForm, CountUp, CtaBand, DISPLAY, EASE, FaqAccordion, HoloCover, ICON, PageHero, PostBody, PostCard, PostCover, PostToc, ProcessStepper, ProjectCard, ReadingProgress, Reveal, section, SectionTitle, ServiceCard, ServiceIcon, StackMarquee } from "./ui";

/* sayfalar. */

type P = { locale: Locale };

/* ---------- ortak bölümler ---------- */

function Facts({ locale }: P) {
  const t = getDictionary(locale);
  return (
    <Grid container spacing={2}>
      {t.about.facts.map((fact, i) => (
        <Grid key={fact.label} size={6}>
          <Reveal delay={i * 0.08}>
            <Paper sx={{ ...glass, p: 3, height: "100%" }}>
              <Typography className="holo-text" sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(1.9rem, 3.4vw, 3rem)", lineHeight: 1.1 }}>
                <CountUp value={fact.value} />
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                {fact.label}
              </Typography>
            </Paper>
          </Reveal>
        </Grid>
      ))}
    </Grid>
  );
}

function ServiceTabs({ locale }: P) {
  const t = getDictionary(locale);
  const [tab, setTab] = useState(0);
  const active = services[tab];
  const indicator = { "& .MuiTabs-indicator": { background: HOLO } };
  return (
    <Paper sx={{ ...glass, mt: { xs: 5, md: 7 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "300px 1fr" }, overflow: "hidden" }}>
      <Tabs value={tab} onChange={(_, v: number) => setTab(v)} orientation="vertical" aria-label={t.home.servicesEyebrow} sx={{ display: { xs: "none", md: "flex" }, borderRight: "1px solid", borderColor: "divider", py: 1.5, ...indicator, "& .MuiTabs-indicator": { width: 3, borderRadius: 3, background: HOLO } }}>
        {services.map((s) => (
          <Tab key={s.id} icon={ICON[s.id]} iconPosition="start" label={s.title[locale]} sx={{ justifyContent: "flex-start", px: 3 }} />
        ))}
      </Tabs>
      <Tabs value={tab} onChange={(_, v: number) => setTab(v)} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile aria-label={t.home.servicesEyebrow} sx={{ display: { md: "none" }, borderBottom: "1px solid", borderColor: "divider", "& .MuiTabs-indicator": { height: 3, background: HOLO } }}>
        {services.map((s) => (
          <Tab key={s.id} icon={ICON[s.id]} iconPosition="start" label={s.title[locale]} sx={{ alignItems: "center" }} />
        ))}
      </Tabs>
      <Box sx={{ p: { xs: 3, md: 6 }, minHeight: { md: 500 } }}>
        <AnimatePresence mode="wait">
          <motion.div key={active.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.35, ease: EASE }}>
            <Typography variant="h3" lang={titleLang(active, locale)} sx={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}>
              {active.title[locale]}
            </Typography>
            <Typography sx={{ mt: 2, fontSize: "1.25rem", lineHeight: 1.45, maxWidth: 720 }}>{active.lead[locale]}</Typography>
            <Grid container spacing={4} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, lg: 6 }}>
                <Typography color="text.secondary">{active.body[locale]}</Typography>
                <Button component={Link} href={href(locale, `/services/${active.slug}`)} variant="outlined" color="inherit" endIcon={<ArrowOutwardRounded />} sx={{ mt: 3 }}>
                  {t.cta.viewService}
                </Button>
              </Grid>
              <Grid size={{ xs: 12, lg: 6 }}>
                <Typography variant="overline" color="text.secondary" component="p">
                  {t.services.deliverables}
                </Typography>
                <Checks items={active.deliverables[locale]} />
              </Grid>
            </Grid>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Paper>
  );
}

function Checks({ items }: { items: string[] }) {
  return (
    <List dense disablePadding sx={{ mt: 1 }}>
      {items.map((item) => (
        <ListItem key={item} disableGutters>
          <ListItemIcon sx={{ minWidth: 34, color: "#7cf7ff" }}>
            <CheckCircleRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={item} slotProps={{ primary: { sx: { fontSize: "1.02rem" } } }} />
        </ListItem>
      ))}
    </List>
  );
}

/* ---------- Ana sayfa ---------- */

export function HomePage({ locale }: P) {
  const t = getDictionary(locale);
  const words = t.hero.title.split(" ");
  const head = words.slice(0, -2).join(" ");
  const tail = words.slice(-2).join(" ");
  const featured = [...featuredProjects, ...projects.filter((p) => !p.featured)].slice(0, 6);

  return (
    <>
      <Container maxWidth="xl" sx={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: { xs: "flex-end", lg: "center" }, pt: { xs: "46svh", lg: 12 }, pb: { xs: 5, lg: 8 } }}>
        <Box sx={{ maxWidth: { lg: "56%" } }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}>
            <Chip label={t.hero.eyebrow} variant="outlined" sx={{ borderColor: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }} />
          </motion.div>
          <Typography variant="h1" sx={{ mt: 3 }}>
            <motion.span style={{ display: "block" }} initial={{ opacity: 0, y: 40, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1, ease: EASE, delay: 0.2 }}>
              {head}
            </motion.span>
            <motion.span className="holo-text" style={{ display: "block", backgroundSize: "200% 100%", animation: "site-holo-shift 7s linear infinite alternate" }} initial={{ opacity: 0, y: 40, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1, ease: EASE, delay: 0.38 }}>
              {tail}
            </motion.span>
          </Typography>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}>
            <Typography color="text.secondary" sx={{ mt: 3.5, maxWidth: 560, fontSize: { xs: "1.05rem", md: "1.2rem" } }}>
              {t.hero.lead}
            </Typography>
            <Stack direction="row" spacing={1.5} useFlexGap sx={{ mt: 4.5, flexWrap: "wrap" }}>
              <Button component={Link} variant="contained" size="large" href={href(locale, "/contact")} endIcon={<ArrowOutwardRounded />}>
                {t.cta.start}
              </Button>
              <Button component={Link} variant="outlined" size="large" color="inherit" href={href(locale, "/portfolio")}>
                {t.cta.work}
              </Button>
            </Stack>
          </motion.div>
        </Box>
        <Box aria-hidden="true" sx={{ display: { xs: "none", lg: "block" }, position: "absolute", left: "50%", bottom: 28, width: 24, height: 38, ml: "-12px", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 999 }}>
          <Box sx={{ position: "absolute", left: "50%", top: 7, width: 4, height: 7, ml: "-2px", borderRadius: 999, bgcolor: "#fff", animation: "site-scroll-dot 1.8s ease-in-out infinite" }} />
        </Box>
      </Container>

      <Box component="section" sx={section}>
        <Container maxWidth="xl">
          <SectionTitle overline={t.home.servicesEyebrow} title={t.home.servicesTitle} lead={t.home.servicesLead} link={{ label: t.cta.allServices, href: href(locale, "/services") }} />
          <Reveal delay={0.1}>
            <ServiceTabs locale={locale} />
          </Reveal>
        </Container>
      </Box>

      <Box component="section" sx={section}>
        <Container maxWidth="xl">
          <SectionTitle overline={t.home.workEyebrow} title={t.home.workTitle} link={{ label: t.cta.allWork, href: href(locale, "/portfolio") }} />
          <Grid container spacing={3} sx={{ mt: { xs: 3, md: 5 } }}>
            {featured.map((p, i) => (
              <Grid key={p.slug} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Reveal delay={(i % 3) * 0.08}>
                  <ProjectCard project={p} locale={locale} t={t} />
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={section}>
        <Container maxWidth="xl">
          <SectionTitle overline={t.home.processEyebrow} title={t.home.processTitle} lead={t.home.processLead} />
          <Reveal delay={0.1}>
            <ProcessStepper steps={t.process} />
          </Reveal>
        </Container>
      </Box>

      <Box component="section" sx={section}>
        <Container maxWidth="xl">
          <SectionTitle overline={t.about.eyebrow} title={t.about.title} link={{ label: t.nav.about, href: href(locale, "/about") }} />
          <Grid container spacing={{ xs: 4, md: 8 }} sx={{ mt: { xs: 2, md: 4 } }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Reveal>
                <Typography sx={{ fontSize: { xs: "1.35rem", md: "1.9rem" }, lineHeight: 1.35, fontWeight: 600, textWrap: "pretty" }}>{t.about.story[0]}</Typography>
              </Reveal>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Facts locale={locale} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <StackMarquee label={t.home.stackEyebrow} />

      <Box component="section" sx={section}>
        <Container maxWidth="xl">
          <SectionTitle overline={t.home.blogEyebrow} title={t.home.blogTitle} link={{ label: t.cta.allPosts, href: href(locale, "/blog") }} />
          <Grid container spacing={3} sx={{ mt: { xs: 3, md: 5 } }}>
            {posts.slice(0, 3).map((p, i) => (
              <Grid key={p.slug} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Reveal delay={i * 0.08}>
                  <PostCard post={p} locale={locale} t={t} />
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={section}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 4, md: 8 }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <SectionTitle overline={t.home.faqEyebrow} title={t.home.faqTitle} link={{ label: t.cta.allFaqs, href: href(locale, "/faq") }} />
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Reveal delay={0.1}>
                <FaqAccordion items={faqs.slice(0, 5)} locale={locale} />
              </Reveal>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <CtaBand locale={locale} t={t} />
    </>
  );
}

/* ---------- Hizmetler ---------- */

export function ServicesPage({ locale }: P) {
  const t = getDictionary(locale);
  return (
    <>
      <PageHero overline={t.services.eyebrow} title={t.services.title} lead={t.services.lead} />
      <Container maxWidth="xl" component="section" sx={{ pb: { xs: 9, md: 15 } }}>
        <Grid container spacing={3}>
          {services.map((s, i) => {
            const top = serviceDetails[s.id].highlights[0];
            return (
              <Grid key={s.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Reveal delay={(i % 4) * 0.07}>
                  <ServiceCard service={s} locale={locale} note={`${top.value} · ${top.label[locale]}`} />
                </Reveal>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <Box component="section" sx={section}>
        <Container maxWidth="xl">
          <SectionTitle overline={t.services.whyEyebrow} title={t.services.whyTitle} />
          <Grid container spacing={3} sx={{ mt: { xs: 3, md: 5 } }}>
            {t.services.why.map((item, i) => (
              <Grid key={item.title} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Reveal delay={i * 0.07}>
                  <Paper sx={{ ...glass, p: 3.5, height: "100%" }}>
                    <Typography className="holo-text" sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "1.6rem" }}>
                      {String(i + 1).padStart(2, "0")}
                    </Typography>
                    <Typography variant="h4" component="h3" sx={{ mt: 2, fontSize: "1.2rem" }}>
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary" variant="body2" sx={{ mt: 1.25 }}>
                      {item.text}
                    </Typography>
                  </Paper>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={section}>
        <Container maxWidth="xl">
          <SectionTitle overline={t.home.processEyebrow} title={t.home.processTitle} lead={t.home.processLead} />
          <Reveal delay={0.1}>
            <ProcessStepper steps={t.process} />
          </Reveal>
        </Container>
      </Box>

      <ServiceFaq locale={locale} items={faqs} />
      <CtaBand locale={locale} t={t} />
    </>
  );
}

/** Sayfa sonundaki SSS bölümü: solda başlık, sağda sorular */
function ServiceFaq({ locale, items }: P & { items: Faq[] }) {
  const t = getDictionary(locale);
  if (items.length === 0) return null;
  return (
    <Box component="section" sx={section}>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <SectionTitle overline={t.services.faqEyebrow} title={t.services.faqTitle} link={{ label: t.cta.allFaqs, href: href(locale, "/faq") }} />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal delay={0.1}>
              <FaqAccordion items={items} locale={locale} />
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export function ServicePage({ locale, slug }: P & { slug: string }) {
  const service = getService(slug);
  const t = getDictionary(locale);
  if (!service) return null;
  const detail = serviceDetails[service.id];
  // Bu hizmetin ana hizmet olduğu projeler önce gelir
  const related = projectsByService(service.id)
    .sort((a, b) => a.services.indexOf(service.id) - b.services.indexOf(service.id))
    .slice(0, 3);
  const faqItems = faqCategories.find((c) => c.id === service.id)?.items ?? [];

  return (
    <>
      <PageHero crumbs={[{ label: t.services.eyebrow, href: href(locale, "/services") }]} title={service.title[locale]} titleLang={titleLang(service, locale)} lead={service.lead[locale]}>
        <Box sx={{ mt: 4 }}>
          <ServiceIcon id={service.id} size={72} />
        </Box>
      </PageHero>

      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {detail.highlights.map((h, i) => (
            <Grid key={h.label.en} size={{ xs: 12, sm: 4 }}>
              <Reveal delay={i * 0.08}>
                <Paper sx={{ ...glass, p: { xs: 2.5, md: 3.5 }, height: "100%" }}>
                  <Typography className="holo-text" sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)", lineHeight: 1.1 }}>
                    <CountUp value={h.value} />
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {h.label[locale]}
                  </Typography>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="xl" component="section" sx={{ py: { xs: 7, md: 12 } }}>
        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal>
              <Typography sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" }, lineHeight: 1.55, textWrap: "pretty" }}>{service.body[locale]}</Typography>
              <Typography variant="overline" color="text.secondary" component="h2" sx={{ mt: 5 }}>
                {t.services.stack}
              </Typography>
              <Stack direction="row" useFlexGap spacing={1} sx={{ mt: 1.5, flexWrap: "wrap" }}>
                {service.stack.map((name) => (
                  <Chip key={name} label={name} variant="outlined" />
                ))}
              </Stack>
              <Button component={Link} href={href(locale, "/contact")} variant="contained" size="large" endIcon={<ArrowOutwardRounded />} sx={{ mt: 5 }}>
                {t.cta.start}
              </Button>
            </Reveal>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal delay={0.1}>
              <Paper sx={{ ...glass, p: { xs: 3, md: 4 } }}>
                <Typography variant="h4" component="h2">
                  {t.services.fit}
                </Typography>
                <Checks items={detail.fit[locale]} />
              </Paper>
            </Reveal>
          </Grid>
        </Grid>
      </Container>

      <Box component="section" sx={section}>
        <Container maxWidth="xl">
          <SectionTitle overline={t.services.deliverables} title={t.services.offerings} />
          <Grid container spacing={3} sx={{ mt: { xs: 3, md: 5 } }}>
            {detail.offerings.map((o, i) => (
              <Grid key={o.title.en} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Reveal delay={(i % 3) * 0.07}>
                  <Paper sx={{ ...glass, p: 3.5, height: "100%", transition: "border-color .3s", "&:hover": { borderColor: "rgba(255,255,255,0.3)" } }}>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                      <CheckCircleRounded sx={{ color: "#7cf7ff" }} />
                      <Typography variant="h4" component="h3" sx={{ fontSize: "1.15rem" }}>
                        {o.title[locale]}
                      </Typography>
                    </Stack>
                    <Typography color="text.secondary" variant="body2" sx={{ mt: 1.5 }}>
                      {o.text[locale]}
                    </Typography>
                  </Paper>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={section}>
        <Container maxWidth="xl">
          <SectionTitle overline={t.home.processEyebrow} title={t.services.steps} lead={t.services.stepsLead} />
          <Grid container spacing={3} sx={{ mt: { xs: 3, md: 5 } }}>
            {detail.steps.map((s, i) => (
              <Grid key={s.title.en} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Reveal delay={i * 0.08}>
                  <Paper sx={{ ...glass, p: 3.5, height: "100%", borderTop: "2px solid", borderTopColor: ["#7cf7ff", "#b79cff", "#ff8fd8", "#7cf7ff"][i % 4] }}>
                    <Typography className="holo-text" sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "2.2rem", lineHeight: 1 }}>
                      {String(i + 1).padStart(2, "0")}
                    </Typography>
                    <Typography variant="h4" component="h3" sx={{ mt: 2.5, fontSize: "1.15rem" }}>
                      {s.title[locale]}
                    </Typography>
                    <Typography color="text.secondary" variant="body2" sx={{ mt: 1.25 }}>
                      {s.text[locale]}
                    </Typography>
                  </Paper>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {related.length > 0 && (
        <Box component="section" sx={section}>
          <Container maxWidth="xl">
            <SectionTitle overline={t.portfolio.eyebrow} title={t.services.related} link={{ label: t.cta.allWork, href: href(locale, "/portfolio") }} />
            <Grid container spacing={3} sx={{ mt: { xs: 3, md: 5 } }}>
              {related.map((p, i) => (
                <Grid key={p.slug} size={{ xs: 12, sm: 6, lg: 4 }}>
                  <Reveal delay={i * 0.08}>
                    <ProjectCard project={p} locale={locale} t={t} />
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      <ServiceFaq locale={locale} items={faqItems} />

      <Container maxWidth="xl" component="section" sx={{ py: { xs: 6, md: 9 } }}>
        <Typography variant="overline" color="text.secondary" component="h2">
          {t.services.others}
        </Typography>
        <Stack direction="row" useFlexGap spacing={1.25} sx={{ mt: 2.5, flexWrap: "wrap" }}>
          {services
            .filter((s) => s.id !== service.id)
            .map((s) => (
              <Chip key={s.id} component={Link} href={href(locale, `/services/${s.slug}`)} clickable icon={ICON[s.id]} label={s.title[locale]} variant="outlined" sx={{ height: 46, px: 1, fontSize: "0.9rem" }} />
            ))}
        </Stack>
      </Container>

      <CtaBand locale={locale} t={t} />
    </>
  );
}

/* ---------- Portfolyo ---------- */

export function PortfolioPage({ locale }: P) {
  const t = getDictionary(locale);
  const [filter, setFilter] = useState<ServiceId | "all">("all");
  const shown = filter === "all" ? projects : projects.filter((p) => p.services.includes(filter));
  return (
    <>
      <PageHero overline={t.portfolio.eyebrow} title={t.portfolio.title} lead={t.portfolio.lead} />
      <Container maxWidth="xl" component="section" sx={{ pb: { xs: 9, md: 15 } }}>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }} role="group" aria-label={t.portfolio.servicesLabel}>
          <Chip label={t.portfolio.all} onClick={() => setFilter("all")} color={filter === "all" ? "primary" : "default"} variant={filter === "all" ? "filled" : "outlined"} aria-pressed={filter === "all"} />
          {services.map((s) => (
            <Chip key={s.id} label={s.title[locale]} onClick={() => setFilter(s.id)} color={filter === s.id ? "primary" : "default"} variant={filter === s.id ? "filled" : "outlined"} aria-pressed={filter === s.id} />
          ))}
        </Stack>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <Grid key={p.slug} size={{ xs: 12, sm: 6, lg: 4 }} component={motion.div} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.45, ease: EASE }}>
                <ProjectCard project={p} locale={locale} t={t} />
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </Container>
      <CtaBand locale={locale} t={t} />
    </>
  );
}

export function ProjectPage({ locale, slug }: P & { slug: string }) {
  const project = getProject(slug);
  const t = getDictionary(locale);
  if (!project) return null;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <>
      <PageHero crumbs={[{ label: t.portfolio.eyebrow, href: href(locale, "/portfolio") }]} title={projectTitle(project, locale)} titleLang={projectLang(project, locale)} lead={project.tagline[locale]}>
        <Stack direction="row" spacing={0.75} useFlexGap sx={{ mt: 3, flexWrap: "wrap" }}>
          {project.status && <Chip label={t.portfolio[project.status]} color="secondary" />}
          {project.count && <Chip label={project.count[locale]} color="primary" variant="outlined" />}
          {project.platforms[locale].map((name) => (
            <Chip key={name} variant="outlined" label={name} />
          ))}
        </Stack>
      </PageHero>

      <Container maxWidth="xl">
        <Reveal>
          <Box sx={{ borderRadius: "26px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
            <HoloCover project={project} locale={locale} ratio="21 / 8" title={false} />
          </Box>
        </Reveal>
      </Container>

      <Container maxWidth="xl" component="section" sx={{ py: { xs: 7, md: 12 } }}>
        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Reveal fill={false}>
              <Typography sx={{ fontSize: { xs: "1.4rem", md: "2.1rem" }, lineHeight: 1.3, fontWeight: 600, textWrap: "pretty" }}>{project.summary[locale]}</Typography>
            </Reveal>
            <Grid container spacing={3} sx={{ mt: { xs: 2, md: 4 } }}>
              {[
                { title: t.portfolio.challenge, text: project.challenge[locale], color: "#ff8fd8" },
                { title: t.portfolio.solution, text: project.solution[locale], color: "#7cf7ff" },
              ].map((item, i) => (
                <Grid key={item.title} size={{ xs: 12, sm: 6 }}>
                  <Reveal delay={i * 0.1}>
                    <Paper sx={{ ...glass, p: 3.5, height: "100%", borderTop: `2px solid ${item.color}` }}>
                      <Typography variant="overline" sx={{ color: item.color }} component="h2">
                        {item.title}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mt: 1 }}>
                        {item.text}
                      </Typography>
                    </Paper>
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Reveal delay={0.1}>
              <Paper sx={{ ...glass, p: 3.5 }}>
                <Typography variant="overline" color="text.secondary" component="h2">
                  {t.portfolio.features}
                </Typography>
                <Checks items={project.features[locale]} />
                <Typography variant="overline" color="text.secondary" component="h2" sx={{ mt: 3 }}>
                  {t.portfolio.servicesLabel}
                </Typography>
                <Stack direction="row" spacing={1} useFlexGap sx={{ mt: 1.5, flexWrap: "wrap" }}>
                  {project.services.map((id) => {
                    const s = serviceById(id);
                    return <Chip key={id} component={Link} href={href(locale, `/services/${s.slug}`)} clickable icon={ICON[id]} label={s.title[locale]} variant="outlined" />;
                  })}
                </Stack>
                {project.link && (
                  <Button href={project.link} target="_blank" rel="noopener noreferrer" variant="contained" endIcon={<ArrowOutwardRounded />} sx={{ mt: 3.5 }}>
                    {t.cta.visit}
                  </Button>
                )}
                {project.status && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                    {t.portfolio[`${project.status}Note`]}
                  </Typography>
                )}
              </Paper>
            </Reveal>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl" component="section">
        <Reveal>
          <Paper component={Link} href={href(locale, `/portfolio/${next.slug}`)} sx={{ ...glass, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 3, p: { xs: 3, md: 6 }, color: "inherit", textDecoration: "none", transition: "border-color .3s", "&:hover": { borderColor: "rgba(255,255,255,0.35)" }, "&:hover .go": { transform: "translateX(8px)" } }}>
            <Box>
              <Typography variant="overline" color="text.secondary" component="p">
                {t.cta.nextProject}
              </Typography>
              <Typography variant="h2" lang={projectLang(next, locale)} sx={{ mt: 1 }}>
                {projectTitle(next, locale)}
              </Typography>
            </Box>
            <EastRounded className="go" sx={{ fontSize: { xs: 36, md: 56 }, transition: "transform .4s cubic-bezier(.2,.7,.2,1)" }} />
          </Paper>
        </Reveal>
      </Container>

      <CtaBand locale={locale} t={t} />
    </>
  );
}

/* ---------- Hakkımızda ---------- */

export function AboutPage({ locale }: P) {
  const t = getDictionary(locale);
  const a = t.about;
  return (
    <>
      <PageHero overline={a.eyebrow} title={a.title} lead={a.lead} />
      <Container maxWidth="xl" component="section" sx={{ pb: { xs: 9, md: 15 } }}>
        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal>
              <Typography variant="overline" className="holo-text" component="h2">
                {a.storyTitle}
              </Typography>
              <Typography sx={{ mt: 2, fontSize: { xs: "1.35rem", md: "1.9rem" }, lineHeight: 1.35, fontWeight: 600, textWrap: "pretty" }}>{a.story[0]}</Typography>
              <Typography color="text.secondary" sx={{ mt: 3, fontSize: "1.15rem" }}>
                {a.story[1]}
              </Typography>
            </Reveal>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Facts locale={locale} />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: { xs: 5, md: 10 } }}>
          {[
            { title: a.visionTitle, text: a.vision },
            { title: a.missionTitle, text: a.mission },
          ].map((item, i) => (
            <Grid key={item.title} size={{ xs: 12, md: 6 }}>
              <Reveal delay={i * 0.1}>
                <Box sx={{ p: "1.5px", borderRadius: "26px", background: HOLO, height: "100%" }}>
                  <Box sx={{ borderRadius: "25px", background: "rgba(9,9,14,0.93)", p: { xs: 3.5, md: 6 }, height: "100%" }}>
                    <Typography variant="h2" sx={{ fontSize: "clamp(1.6rem, 2.8vw, 2.5rem)" }}>
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 2.5, fontSize: "1.15rem" }}>
                      {item.text}
                    </Typography>
                  </Box>
                </Box>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box component="section" sx={section}>
        <Container maxWidth="xl">
          <SectionTitle overline={a.teamEyebrow} title={a.teamTitle} lead={a.teamLead} />
          <Grid container spacing={3} sx={{ mt: { xs: 3, md: 5 } }}>
            {a.roles.map((role, i) => (
              <Grid key={role.title} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Reveal delay={i * 0.08}>
                  <Paper sx={{ ...glass, p: 3.5, height: "100%" }}>
                    <Box sx={{ width: 52, height: 52, borderRadius: "30%", p: "1.5px", background: HOLO }}>
                      <Box sx={{ width: "100%", height: "100%", borderRadius: "inherit", bgcolor: "#0d0d13", display: "grid", placeItems: "center", color: "#f4f2ee" }}>
                        {[<TravelExploreRounded key="r" />, <BrushRounded key="d" />, <CodeRounded key="c" />, <FlagRounded key="p" />][i]}
                      </Box>
                    </Box>
                    <Typography variant="h3" sx={{ mt: 3, fontSize: "1.35rem" }}>
                      {role.title}
                    </Typography>
                    <Typography color="text.secondary" variant="body2" sx={{ mt: 1.5 }}>
                      {role.text}
                    </Typography>
                  </Paper>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={section}>
        <Container maxWidth="xl">
          <SectionTitle overline={a.eyebrow} title={a.valuesTitle} />
          <Grid container spacing={3} sx={{ mt: { xs: 3, md: 5 } }}>
            {a.values.map((value, i) => (
              <Grid key={value.title} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Reveal delay={i * 0.08}>
                  <Paper sx={{ ...glass, p: 3.5, height: "100%", position: "relative", overflow: "hidden", "&::before": { content: '""', position: "absolute", inset: "0 0 auto 0", height: 2, background: HOLO, opacity: 0.8 } }}>
                    <Typography variant="h4" component="h3">
                      {value.title}
                    </Typography>
                    <Typography color="text.secondary" variant="body2" sx={{ mt: 1.5 }}>
                      {value.text}
                    </Typography>
                  </Paper>
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={section}>
        <Container maxWidth="xl">
          <SectionTitle overline={a.clientsEyebrow} title={a.clientsTitle} />
          <Grid container spacing={3} sx={{ mt: { xs: 3, md: 5 } }}>
            {a.clients.map((client, i) => (
              <Grid key={client.title} size={{ xs: 12, md: 4 }}>
                <Reveal delay={i * 0.08}>
                  <Paper sx={{ ...glass, p: { xs: 3.5, md: 4.5 }, height: "100%", borderTop: `2px solid ${["#7cf7ff", "#b79cff", "#ff8fd8"][i]}` }}>
                    <Typography variant="h3">{client.title}</Typography>
                    <Typography color="text.secondary" sx={{ mt: 2 }}>
                      {client.text}
                    </Typography>
                  </Paper>
                </Reveal>
              </Grid>
            ))}
          </Grid>
          <Reveal fill={false} delay={0.1}>
            <Typography variant="overline" color="text.secondary" component="h3" sx={{ display: "block", mt: { xs: 6, md: 8 } }}>
              {a.whatWeDo}
            </Typography>
            <Stack direction="row" useFlexGap spacing={1.25} sx={{ mt: 2, flexWrap: "wrap" }}>
              {services.map((s) => (
                <Chip key={s.id} component={Link} href={href(locale, `/services/${s.slug}`)} clickable icon={ICON[s.id]} label={s.title[locale]} variant="outlined" sx={{ height: 46, px: 1, fontSize: "0.9rem" }} />
              ))}
            </Stack>
          </Reveal>
        </Container>
      </Box>

      <StackMarquee label={t.home.stackEyebrow} />
      <CtaBand locale={locale} t={t} />
    </>
  );
}

/* ---------- Blog ---------- */

export function BlogPage({ locale }: P) {
  const t = getDictionary(locale);
  const [topic, setTopic] = useState<ServiceId | "all">("all");
  const topics = services.filter((s) => posts.some((p) => p.topic === s.id));
  const shown = topic === "all" ? posts : posts.filter((p) => p.topic === topic);
  const [first, ...rest] = shown;
  return (
    <>
      <PageHero overline={t.blog.eyebrow} title={t.blog.title} lead={t.blog.lead} />
      <Container maxWidth="xl" component="section" sx={{ pb: { xs: 9, md: 15 } }}>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap", mb: 4 }} role="group" aria-label={t.blog.eyebrow}>
          <Chip label={t.portfolio.all} onClick={() => setTopic("all")} color={topic === "all" ? "primary" : "default"} variant={topic === "all" ? "filled" : "outlined"} aria-pressed={topic === "all"} />
          {topics.map((s) => (
            <Chip key={s.id} icon={ICON[s.id]} label={s.title[locale]} onClick={() => setTopic(s.id)} color={topic === s.id ? "primary" : "default"} variant={topic === s.id ? "filled" : "outlined"} aria-pressed={topic === s.id} />
          ))}
        </Stack>
        <AnimatePresence mode="wait">
          <motion.div key={topic} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: EASE }}>
            {first ? (
              <>
                <PostCard post={first} locale={locale} t={t} wide />
                <Grid container spacing={3} sx={{ mt: 0.5 }}>
                  {rest.map((p) => (
                    <Grid key={p.slug} size={{ xs: 12, sm: 6, lg: 4 }}>
                      <PostCard post={p} locale={locale} t={t} />
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : (
              <Typography color="text.secondary">{t.blog.empty}</Typography>
            )}
          </motion.div>
        </AnimatePresence>
      </Container>
      <CtaBand locale={locale} t={t} />
    </>
  );
}

export function PostPage({ locale, slug }: P & { slug: string }) {
  const post = getPost(slug);
  const t = getDictionary(locale);
  if (!post) return null;
  const related = post.related ?? [post.topic];
  // Önce aynı konudaki, sonra ilgili hizmetleri paylaşan yazılar
  const more = posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: (p.topic === post.topic ? 2 : 0) + (related.includes(p.topic) ? 1 : 0) }))
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, 3)
    .map((x) => x.p);
  const body = post.body[locale];
  const panel = { ...glass, p: 3, borderRadius: "22px" } as const;

  return (
    <>
      <ReadingProgress targetId="post-article" />
      <Container maxWidth="xl" sx={{ pt: { xs: 15, md: 22 }, pb: { xs: 8, md: 12 } }}>
        <motion.div initial={{ opacity: 0, y: 30, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}>
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap", alignItems: "center" }}>
            <Chip component={Link} href={href(locale, "/blog")} clickable label={`← ${t.blog.eyebrow}`} variant="outlined" />
            <Chip icon={ICON[post.topic]} label={serviceById(post.topic).title[locale]} variant="outlined" sx={{ color: "#7cf7ff" }} />
            <Typography variant="caption" color="text.secondary">
              {formatDate(post.date, locale)} · {readingMinutes(post, locale)} {t.blog.minutes}
            </Typography>
          </Stack>
          <Typography variant="h1" sx={{ mt: 3.5, maxWidth: { md: "66%" }, fontSize: "clamp(1.8rem, 3.8vw, 3.4rem)", lineHeight: 1.1, textWrap: "balance" }}>
            {post.title[locale]}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 3, maxWidth: 720, fontSize: { xs: "1.15rem", md: "1.35rem" }, lineHeight: 1.5 }}>
            {post.excerpt[locale]}
          </Typography>
        </motion.div>

        <Reveal fill={false} delay={0.15}>
          <Box sx={{ mt: { xs: 4, md: 6 }, borderRadius: "26px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
            <PostCover post={post} locale={locale} big sx={{ aspectRatio: { xs: "16 / 9", md: "21 / 7" } }} />
          </Box>
        </Reveal>

        <Grid container spacing={{ xs: 3, md: 6 }} sx={{ mt: { xs: 1, md: 2 } }}>
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Mobilde içindekiler yazının üstünde, kapalı durur */}
            <Accordion disableGutters elevation={0} sx={{ ...glass, borderRadius: "18px !important", mb: 3, display: { md: "none" }, "&::before": { display: "none" } }}>
              <AccordionSummary expandIcon={<ExpandMoreRounded />} sx={{ px: 2.5 }}>
                <Typography sx={{ fontWeight: 700 }}>{t.blog.toc}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pb: 2.5 }}>
                <PostToc blocks={body} label={t.blog.toc} />
              </AccordionDetails>
            </Accordion>
            <Paper id="post-article" component="article" sx={{ ...glass, background: "rgba(11,11,16,0.82)", p: { xs: 3, md: 6 } }}>
              <PostBody blocks={body} />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3} sx={{ position: { md: "sticky" }, top: 100 }}>
              <Paper sx={{ ...panel, display: { xs: "none", md: "block" }, maxHeight: "52vh", overflowY: "auto" }} data-lenis-prevent>
                <Typography variant="overline" color="text.secondary" component="h2" sx={{ display: "block", mb: 1.5 }}>
                  {t.blog.toc}
                </Typography>
                <PostToc blocks={body} label={t.blog.toc} />
              </Paper>

              <Paper sx={panel}>
                <Typography variant="overline" color="text.secondary" component="h2" sx={{ display: "block", mb: 1 }}>
                  {t.blog.relatedServices}
                </Typography>
                <Stack divider={<Box sx={{ borderTop: "1px solid", borderColor: "divider" }} />}>
                  {related.map((id) => {
                    const s = serviceById(id);
                    return (
                      <Box
                        key={id}
                        component={Link}
                        href={href(locale, `/services/${s.slug}`)}
                        sx={{ display: "flex", alignItems: "center", gap: 2, py: 1.75, color: "inherit", textDecoration: "none", "&:hover .go": { transform: "translate(3px,-3px)", color: "#7cf7ff" } }}
                      >
                        <ServiceIcon id={id} size={44} />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography sx={{ fontWeight: 700 }}>{s.title[locale]}</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {s.short[locale]}
                          </Typography>
                        </Box>
                        <ArrowOutwardRounded className="go" sx={{ color: "text.secondary", transition: "transform .3s, color .3s" }} />
                      </Box>
                    );
                  })}
                </Stack>
              </Paper>

              <Box sx={{ p: "1.5px", borderRadius: "22px", background: HOLO }}>
                <Box sx={{ borderRadius: "21px", background: "rgba(9,9,14,0.94)", p: 3 }}>
                  <Typography variant="h4" component="h2">
                    {t.blog.ctaTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1.25 }}>
                    {t.blog.ctaText}
                  </Typography>
                  <Button component={Link} href={href(locale, "/contact")} variant="contained" endIcon={<ArrowOutwardRounded />} sx={{ mt: 2.5 }}>
                    {t.cta.start}
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Box component="section" sx={{ ...section, pt: 0 }}>
        <Container maxWidth="xl">
          <SectionTitle overline={t.blog.eyebrow} title={t.blog.more} link={{ label: t.cta.allPosts, href: href(locale, "/blog") }} />
          <Grid container spacing={3} sx={{ mt: { xs: 3, md: 5 } }}>
            {more.map((p, i) => (
              <Grid key={p.slug} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Reveal delay={i * 0.08}>
                  <PostCard post={p} locale={locale} t={t} />
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <CtaBand locale={locale} t={t} />
    </>
  );
}

/* ---------- SSS, iletişim, 404 ---------- */

export function FaqPage({ locale }: P) {
  const t = getDictionary(locale);
  const [tab, setTab] = useState(0);
  const category = faqCategories[tab];
  const title = (id: (typeof faqCategories)[number]["id"]) => (id === "general" ? t.faq.general : serviceById(id).title[locale]);
  const tabs = (vertical: boolean) => (
    <Tabs
      value={tab}
      onChange={(_, v: number) => setTab(v)}
      orientation={vertical ? "vertical" : "horizontal"}
      variant={vertical ? "standard" : "scrollable"}
      scrollButtons={vertical ? false : "auto"}
      allowScrollButtonsMobile
      aria-label={t.faq.categories}
      sx={{
        display: vertical ? { xs: "none", md: "flex" } : { md: "none" },
        ...(vertical ? { position: "sticky", top: 104, borderLeft: "1px solid", borderColor: "divider" } : { mb: 3, borderBottom: "1px solid", borderColor: "divider" }),
        "& .MuiTabs-indicator": vertical ? { left: 0, right: "auto", width: 3, borderRadius: 3, background: HOLO } : { height: 3, background: HOLO },
      }}
    >
      {faqCategories.map((c) => (
        <Tab
          key={c.id}
          icon={c.id === "general" ? <HelpOutlineRounded /> : ICON[c.id]}
          iconPosition="start"
          label={title(c.id)}
          sx={vertical ? { justifyContent: "flex-start", px: 3, minHeight: 52 } : { alignItems: "center" }}
        />
      ))}
    </Tabs>
  );

  return (
    <>
      <PageHero overline={t.faq.eyebrow} title={t.faq.title} lead={t.faq.lead} />
      <Container maxWidth="xl" component="section" sx={{ pb: { xs: 9, md: 14 } }}>
        <Grid container spacing={{ xs: 0, md: 6 }}>
          <Grid size={{ xs: 12, md: 3.5 }}>{tabs(true)}</Grid>
          <Grid size={{ xs: 12, md: 8.5 }}>
            {tabs(false)}
            <AnimatePresence mode="wait">
              <motion.div key={category.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: EASE }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 3 }}>
                  {category.id !== "general" && <ServiceIcon id={category.id} size={48} />}
                  <Typography variant="h2" sx={{ fontSize: "clamp(1.5rem, 2.6vw, 2.2rem)" }} lang={category.id === "general" ? undefined : titleLang(serviceById(category.id), locale)}>
                    {title(category.id)}
                  </Typography>
                </Stack>
                <FaqAccordion items={category.items} locale={locale} />
                {category.id !== "general" && (
                  <Button component={Link} href={href(locale, `/services/${serviceById(category.id).slug}`)} variant="outlined" color="inherit" endIcon={<ArrowOutwardRounded />} sx={{ mt: 3 }}>
                    {t.cta.viewService}
                  </Button>
                )}
              </motion.div>
            </AnimatePresence>
          </Grid>
        </Grid>
      </Container>
      <CtaBand locale={locale} t={t} />
    </>
  );
}

export function ContactPage({ locale }: P) {
  const t = getDictionary(locale);
  const rows = [
    { icon: <EmailRounded />, text: site.email, href: `mailto:${site.email}` },
    { icon: <PhoneRounded />, text: site.phone, href: site.phoneHref },
    { icon: <PlaceRounded />, text: site.address[locale] },
    { icon: <ScheduleRounded />, text: site.hours[locale] },
  ];
  return (
    <>
      <PageHero overline={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead} />
      <Container maxWidth="xl" component="section" sx={{ pb: { xs: 9, md: 15 } }}>
        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal>
              <List>
                {rows.map((row) => (
                  <ListItem key={row.text} disableGutters>
                    <ListItemIcon sx={{ minWidth: 44, color: "#b79cff" }}>{row.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        row.href ? (
                          <Box component="a" href={row.href} sx={{ color: "inherit", fontWeight: 700, fontSize: { xs: "1.15rem", md: "1.4rem" }, textDecorationColor: "rgba(255,255,255,0.3)", textUnderlineOffset: 5 }}>
                            {row.text}
                          </Box>
                        ) : (
                          row.text
                        )
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Button href={site.whatsapp} target="_blank" rel="noopener noreferrer" variant="outlined" color="inherit" endIcon={<ArrowOutwardRounded />} sx={{ mt: 2 }}>
                {t.cta.whatsapp}
              </Button>
            </Reveal>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal delay={0.1}>
              <ContactForm locale={locale} t={t} />
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export function NotFoundPage({ locale }: P) {
  const t = getDictionary(locale);
  return (
    <Container maxWidth="xl" sx={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", pt: 14, pb: 8 }}>
      <Typography className="holo-text" sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(6rem, 24vw, 18rem)", lineHeight: 0.85, letterSpacing: "-0.05em" }}>
        404
      </Typography>
      <Typography variant="h2" component="h1" sx={{ mt: 3 }}>
        {t.notFound.title}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 2, fontSize: "1.15rem", maxWidth: 520 }}>
        {t.notFound.lead}
      </Typography>
      <Button component={Link} href={href(locale)} variant="contained" size="large" endIcon={<ArrowOutwardRounded />} sx={{ mt: 4 }}>
        {t.cta.backHome}
      </Button>
    </Container>
  );
}
