const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const assetsDir = path.join(root, "assets");
const outputFile = path.join(assetsDir, "portfolio-data.js");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

const skillByKeyword = [
  ["carnival", ["Prompt Design", "AI Visuals", "Fashion Concepts", "Creative Direction"]],
  ["candy", ["Prompt Design", "AI Visuals", "Social Media", "Creative Direction"]],
  ["romantic", ["Prompt Design", "AI Visuals", "Fashion Concepts", "Visual Storytelling"]],
  ["floral", ["AI Visuals", "Fashion Concepts", "Digital Aesthetics", "Creative Direction"]],
  ["luxury", ["AI Portraits", "Creative Direction", "Editorial Concepts", "Prompt Design"]],
  ["glam", ["AI Portraits", "AI Visuals", "Editorial Concepts", "Creative Direction"]],
  ["botanical", ["AI Visuals", "Fashion Concepts", "Digital Aesthetics", "Creative Direction"]],
  ["pop", ["Social Media", "AI Visuals", "Creative Direction", "Digital Aesthetics"]],
  ["fashion", ["Prompt Design", "AI Visuals", "Fashion Concepts", "Creative Direction"]],
  ["beauty", ["Prompt Design", "AI Visuals", "Beauty Concepts", "Branding"]],
  ["zodiac", ["AI Art", "Prompt Design", "Editorial Concepts", "Creative Direction"]],
  ["canva", ["Canva", "Social Media", "Branding", "Visual Storytelling"]],
  ["brand", ["Branding", "Creative Direction", "Moodboard", "Digital Aesthetics"]],
  ["mood", ["Branding", "Moodboard", "Creative Direction", "Digital Aesthetics"]],
  ["social", ["Social Media", "Canva", "AI Visuals", "Content Strategy"]],
  ["instagram", ["Social Media", "Canva", "AI Visuals", "Content Strategy"]],
  ["pinterest", ["Pinterest", "Social Media", "Visual Concepts", "Digital Aesthetics"]],
  ["portrait", ["AI Portraits", "Prompt Design", "AI Visuals", "Creative Direction"]],
  ["editorial", ["Editorial Concepts", "AI Visuals", "Creative Direction", "Branding"]]
];

const descriptorByKeyword = [
  ["carnival", "Playful AI fashion editorials with carousel lights, candy colors, and whimsical styling for high-impact social storytelling."],
  ["candy", "Bright candy-inspired AI concepts with glossy styling, pop color, and creator-ready visual energy."],
  ["romantic", "Romantic floral fashion portraits with soft light, couture details, and feminine editorial direction."],
  ["floral", "Flower-led AI fashion concepts with delicate textures, soft palettes, and refined visual storytelling."],
  ["luxury", "Luxury AI portraits with cinematic styling, polished accessories, and premium campaign atmosphere."],
  ["glam", "Glam editorial portraits shaped through bold styling, luminous detail, and confident AI art direction."],
  ["botanical", "Botanical fantasy fashion concepts where couture silhouettes, flowers, and soft surrealism create a dreamy brand mood."],
  ["pop", "Pop candy visual concepts with playful styling, bright gradients, and energetic social-first composition."],
  ["fashion", "Editorial AI fashion concepts with refined styling, confident silhouettes, and premium campaign energy."],
  ["beauty", "Beauty-focused AI visuals built around polished lighting, feminine details, and luxury cosmetic storytelling."],
  ["zodiac", "Symbolic AI concepts with celestial atmosphere, character-led storytelling, and expressive art direction."],
  ["canva", "Clean Canva-ready designs for presentations, social campaigns, brand communication, and digital launch materials."],
  ["brand", "Branding moodboards and visual systems shaped through color, texture, composition, and creative positioning."],
  ["mood", "Aesthetic moodboards that translate visual references into a clear digital direction for modern brands."],
  ["social", "Social media visuals designed for Instagram, Pinterest, creator content, and campaign-ready digital storytelling."],
  ["instagram", "Instagram-ready content concepts with strong composition, scroll appeal, and polished brand consistency."],
  ["pinterest", "Pinterest visual concepts created for inspiration-led discovery, moodboard culture, and elegant content planning."],
  ["portrait", "AI portrait concepts with expressive character direction, refined lighting, and modern editorial presence."],
  ["editorial", "Editorial AI concepts with cinematic framing, sophisticated styling, and premium visual storytelling."]
];

const zodiacByFile = {
  "photo_4_2026-04-23_19-06-35.jpg": ["Aries Couture Concept", "Aries"],
  "photo_5_2026-04-23_19-06-35.jpg": ["Taurus Couture Concept", "Taurus"],
  "photo_6_2026-04-23_19-06-35.jpg": ["Gemini Couture Concept", "Gemini"],
  "photo_7_2026-04-23_19-06-35.jpg": ["Cancer Couture Concept", "Cancer"],
  "photo_8_2026-04-23_19-06-35.jpg": ["Leo Couture Concept", "Leo"],
  "photo_9_2026-04-23_19-06-35.jpg": ["Virgo Couture Concept", "Virgo"],
  "photo_10_2026-04-23_19-06-35.jpg": ["Libra Couture Concept", "Libra"],
  "photo_11_2026-04-23_19-06-35.jpg": ["Scorpio Couture Concept", "Scorpio"],
  "photo_12_2026-04-23_19-06-35.jpg": ["Sagittarius Couture Concept", "Sagittarius"],
  "photo_13_2026-04-23_19-06-35.jpg": ["Capricorn Couture Concept", "Capricorn"],
  "photo_14_2026-04-23_19-06-35.jpg": ["Aquarius Couture Concept", "Aquarius"],
  "photo_15_2026-04-23_19-06-35.jpg": ["Pisces Couture Concept", "Pisces"]
};

function toTitle(text) {
  return text
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function cleanBaseName(fileName) {
  return path.basename(fileName, path.extname(fileName))
    .replace(/^\d+[\s_.-]*/g, "")
    .replace(/\b(img|image|photo|copy|final|export)\b/gi, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function categoryDescription(folderName) {
  const lower = folderName.toLowerCase();
  const match = descriptorByKeyword.find(([keyword]) => lower.includes(keyword));
  return match ? match[1] : `Premium AI visual concepts for ${toTitle(folderName).toLowerCase()}, shaped with prompt design, creative direction, and refined digital aesthetics.`;
}

function categoryTags(folderName) {
  const lower = folderName.toLowerCase();
  const match = skillByKeyword.find(([keyword]) => lower.includes(keyword));
  return match ? match[1] : ["Prompt Design", "AI Visuals", "Creative Direction", "Digital Aesthetics"];
}

function projectTitle(fileName, folderName, index) {
  if (folderName.toLowerCase().includes("zodiac") && zodiacByFile[fileName]) {
    return zodiacByFile[fileName][0];
  }

  const base = cleanBaseName(fileName);
  const looksGeneric = /^(photo|promti)?[\s\d()_-]*$/i.test(base) || /\b20\d{2}\b/.test(base) || /^[a-f0-9]{8,}$/i.test(base);
  if (base.length > 2 && !looksGeneric) {
    return toTitle(base);
  }

  const lower = folderName.toLowerCase();
  const nameSets = [
    [["carnival"], ["Carousel Candy Muse", "Pastel Fairground Editorial", "Balloon Couture Story", "Sweet Carnival Portrait"]],
    [["romantic", "floral"], ["Blush Garden Muse", "Peony Light Editorial", "Romantic Bow Portrait", "Soft Bloom Couture", "Golden Hour Florals"]],
    [["luxury", "glam"], ["Desert Disco Glam", "Crystal Night Portrait", "Fur And Sequins Story", "Luxury Mirage Editorial", "Statement Glam Muse"]],
    [["zodiac"], ["Celestial Libra Couture", "Crystal Zodiac Muse", "Astral Sign Editorial", "Sacred Symbol Portrait", "Star Map Couture"]],
    [["botanical"], ["Botanical Couture Muse", "Petal Armor Fantasy", "Soft Garden Dream", "Rose Sleeve Editorial", "Pastel Flora Portrait"]],
    [["pop", "candy"], ["Pixel Candy Muse", "Gloss Pop Editorial", "Lollipop Digital Story", "Sweet Arcade Concept", "Bubblegum Visual Mood"]]
  ];
  const matchedSet = nameSets.find(([keywords]) => keywords.some((keyword) => lower.includes(keyword)));
  const names = matchedSet ? matchedSet[1] : ["Visual Study", "Editorial Concept", "Aesthetic Story", "Creative Direction", "Digital Mood"];
  return names[index % names.length];
}

function projectDescription(folderName, title) {
  const lower = folderName.toLowerCase();
  if (lower.includes("zodiac")) {
    const sign = title.replace(" Couture Concept", "");
    return `${title} interprets ${sign} through symbolic couture styling, celestial atmosphere, and polished AI art direction.`;
  }
  if (lower.includes("carnival")) return `${title} uses playful styling, pastel color, and fairground atmosphere to create an AI fashion concept with strong social campaign appeal.`;
  if (lower.includes("romantic") || lower.includes("floral")) return `${title} combines soft florals, feminine couture details, and warm editorial light for a refined AI fashion story.`;
  if (lower.includes("luxury") || lower.includes("glam")) return `${title} builds a confident luxury portrait with polished accessories, cinematic lighting, and high-fashion prompt direction.`;
  if (lower.includes("botanical")) return `${title} blends floral scale, couture texture, and dreamy botanical atmosphere into an elegant fantasy fashion concept.`;
  if (lower.includes("pop") || lower.includes("candy")) return `${title} turns candy color, glossy fashion, and playful digital motifs into energetic social-first AI visuals.`;
  if (lower.includes("fashion")) return `${title} explores fashion-led AI styling with editorial composition, premium texture, and campaign-ready visual direction.`;
  if (lower.includes("beauty")) return `${title} focuses on luminous beauty aesthetics, polished detail, and refined prompt direction for brand storytelling.`;
  if (lower.includes("zodiac")) return `${title} blends symbolic storytelling, atmospheric AI art, and celestial visual language.`;
  if (lower.includes("canva")) return `${title} translates visual ideas into clean, flexible Canva content for digital communication.`;
  if (lower.includes("brand") || lower.includes("mood")) return `${title} builds a cohesive brand mood through color, imagery, layout rhythm, and aesthetic positioning.`;
  if (lower.includes("social") || lower.includes("instagram") || lower.includes("pinterest")) return `${title} is shaped for social-first storytelling with strong scroll appeal and clear visual identity.`;
  if (lower.includes("portrait")) return `${title} presents an expressive AI portrait concept with polished lighting and modern editorial character.`;
  return `${title} is a premium AI visual concept shaped through prompt design, creative direction, and digital aesthetic refinement.`;
}

function getImageFiles(directory) {
  const seenSizes = new Set();
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .filter((fileName) => {
      const size = fs.statSync(path.join(directory, fileName)).size;
      if (seenSizes.has(size)) return false;
      seenSizes.add(size);
      return true;
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function buildData() {
  fs.mkdirSync(assetsDir, { recursive: true });
  const folders = fs.readdirSync(assetsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const categories = folders.map((folderName) => {
    const files = getImageFiles(path.join(assetsDir, folderName));
    const title = toTitle(folderName);
    return {
      title,
      folder: folderName,
      description: categoryDescription(folderName),
      projects: files.map((fileName, index) => {
        const title = projectTitle(fileName, folderName, index);
        return {
          title,
          src: `assets/${folderName}/${fileName}`.replace(/\\/g, "/"),
          fileName,
          description: projectDescription(folderName, title),
          tags: categoryTags(folderName)
        };
      })
    };
  }).filter((category) => category.projects.length > 0);

  return {
    generatedAt: new Date().toISOString(),
    categories
  };
}

const data = buildData();
fs.writeFileSync(outputFile, `window.PORTFOLIO_DATA = ${JSON.stringify(data, null, 2)};\n`);
console.log(`Generated ${outputFile}`);
console.log(`Categories: ${data.categories.length}`);
