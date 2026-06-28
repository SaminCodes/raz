var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var import_cors = __toESM(require("cors"), 1);
var import_genai = require("@google/genai");
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use((0, import_cors.default)());
  app.use(import_express.default.json({ limit: "50mb" }));
  const getAI = () => {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    return new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  };
  async function fetchImageAsBase64(imageUrl) {
    if (!imageUrl) return null;
    if (imageUrl.startsWith("data:")) {
      const parts = imageUrl.split(",");
      const meta = parts[0];
      const base64 = parts[1] || parts[0];
      let mimeType = "image/jpeg";
      if (meta.includes("image/png")) mimeType = "image/png";
      else if (meta.includes("image/webp")) mimeType = "image/webp";
      else if (meta.includes("image/gif")) mimeType = "image/gif";
      return { base64, mimeType };
    }
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) return null;
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString("base64");
        const contentType = response.headers.get("content-type") || "image/jpeg";
        return { base64, mimeType: contentType };
      } catch (e) {
        console.warn("Error fetching remote image URL in fetchImageAsBase64:", imageUrl, e);
        return null;
      }
    }
    try {
      const cleanPath = imageUrl.startsWith("/") ? imageUrl.substring(1) : imageUrl;
      let localPath = import_path.default.join(process.cwd(), cleanPath);
      if (!import_fs.default.existsSync(localPath)) {
        localPath = import_path.default.join(process.cwd(), "public", cleanPath);
      }
      if (import_fs.default.existsSync(localPath)) {
        const buffer = import_fs.default.readFileSync(localPath);
        const base64 = buffer.toString("base64");
        let mimeType = "image/jpeg";
        if (cleanPath.endsWith(".png")) mimeType = "image/png";
        else if (cleanPath.endsWith(".webp")) mimeType = "image/webp";
        else if (cleanPath.endsWith(".gif")) mimeType = "image/gif";
        return { base64, mimeType };
      }
    } catch (e) {
      console.warn("Error reading local image file in fetchImageAsBase64:", imageUrl, e);
    }
    return null;
  }
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const ai = getAI();
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        history,
        config: {
          systemInstruction: "You are a helpful, witty, and highly intelligent AI assistant called Gemini Hub. You provide concise but deep insights.",
          tools: [{ googleSearch: {} }]
        }
      });
      const response = await chat.sendMessage({ message });
      res.json({
        text: response.text || "No response received.",
        sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk) => ({
          title: chunk.web?.title || "Source",
          uri: chunk.web?.uri || "#"
        })) || []
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message || "Unknown error" });
    }
  });
  app.post("/api/gemini/analyze-image", async (req, res) => {
    try {
      const { prompt, base64Image } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: {
          parts: [
            { inlineData: { mimeType: "image/jpeg", data: base64Image } },
            { text: prompt }
          ]
        }
      });
      res.json({ text: response.text });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message || "Unknown error" });
    }
  });
  app.post("/api/gemini/generate-image", async (req, res) => {
    try {
      const { prompt, base64Image } = req.body;
      const ai = getAI();
      let contentsParts = [{ text: prompt }];
      if (base64Image) {
        const resolved = await fetchImageAsBase64(base64Image);
        if (resolved) {
          contentsParts.unshift({
            inlineData: {
              data: resolved.base64,
              mimeType: resolved.mimeType
            }
          });
        }
      }
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: { parts: contentsParts },
        config: {
          imageConfig: { aspectRatio: "1:1" }
        }
      });
      let imageData = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageData = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
      if (!imageData) {
        throw new Error("No image data returned from model");
      }
      res.json({ imageUrl: imageData });
    } catch (err) {
      console.warn("Gemini Image API Error/Quota exceeded, applying curated fallback:", err);
      const lower = (req.body.prompt || "").toLowerCase();
      let fallbackUrl = "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&h=600&q=80";
      if (lower.includes("cyber") || lower.includes("neon") || lower.includes("tech") || lower.includes("city")) {
        fallbackUrl = "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&h=600&q=80";
      } else if (lower.includes("magic") || lower.includes("spell") || lower.includes("forest") || lower.includes("enchanted")) {
        fallbackUrl = "https://images.unsplash.com/photo-1519074069444-1ba4e6664104?auto=format&fit=crop&w=600&h=600&q=80";
      } else if (lower.includes("pixel") || lower.includes("8bit") || lower.includes("16bit") || lower.includes("game")) {
        fallbackUrl = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&h=600&q=80";
      } else if (lower.includes("dark") || lower.includes("shadow") || lower.includes("abyss") || lower.includes("death")) {
        fallbackUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=600&q=80";
      } else if (lower.includes("castle") || lower.includes("knight") || lower.includes("war") || lower.includes("battle")) {
        fallbackUrl = "https://images.unsplash.com/photo-1599831013473-c6aa741f237f?auto=format&fit=crop&w=600&h=600&q=80";
      }
      res.json({
        imageUrl: fallbackUrl,
        isFallback: true,
        warning: "\u041F\u0440\u0435\u0432\u044B\u0448\u0435\u043D\u0430 \u043A\u0432\u043E\u0442\u0430 \u0438\u043B\u0438 \u0418\u0418 \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E \u043F\u0435\u0440\u0435\u0433\u0440\u0443\u0436\u0435\u043D. \u0412\u043A\u043B\u044E\u0447\u0435\u043D \u0440\u0435\u0436\u0438\u043C \u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0433\u043E\u0442\u043E\u0432\u044B\u0445 \u0430\u0440\u0442\u043E\u0432!"
      });
    }
  });
  app.post("/api/gemini/search-grounding", async (req, res) => {
    try {
      const { query } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: query,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk) => ({
        title: chunk.web?.title || "Reference",
        uri: chunk.web?.uri || "#"
      })) || [];
      res.json({ text: response.text, sources });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message || "Unknown error" });
    }
  });
  app.post("/api/gemini/text-to-speech", async (req, res) => {
    try {
      const { text } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [import_genai.Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Kore" }
            }
          }
        }
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) throw new Error("Audio generation failed");
      res.json({ base64Audio });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message || "Unknown error" });
    }
  });
  app.post("/api/gemini/describe-character-art", async (req, res) => {
    try {
      const { char, base64Image } = req.body;
      const ai = getAI();
      const resolved = await fetchImageAsBase64(base64Image || char.imageUrl);
      if (resolved) {
        const cleanBase64 = resolved.base64;
        const mimeType = resolved.mimeType;
        const prompt = `\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u043E \u043E\u043F\u0438\u0448\u0438 \u0432\u043D\u0435\u0448\u043D\u043E\u0441\u0442\u044C, \u043F\u043E\u0437\u0443, \u043E\u0434\u0435\u0436\u0434\u0443, \u0446\u0432\u0435\u0442\u0430, \u0444\u043E\u043D \u0438 \u0445\u0443\u0434\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0441\u0442\u0438\u043B\u044C \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430 \u043D\u0430 \u044D\u0442\u043E\u043C \u0430\u0440\u0442\u0435. \u041D\u0430\u043F\u0438\u0448\u0438 \u0437\u0430\u0445\u0432\u0430\u0442\u044B\u0432\u0430\u044E\u0449\u0435\u0435 \u0445\u0443\u0434\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (3\u20135 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439) \u043D\u0430 \u0440\u0443\u0441\u0441\u043A\u043E\u043C \u044F\u0437\u044B\u043A\u0435. 
        \u041A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0432\u0430\u0436\u043D\u043E\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u043E: \u043D\u0438 \u0432 \u043A\u043E\u0435\u043C \u0441\u043B\u0443\u0447\u0430\u0435 \u041D\u0415 \u0443\u043F\u043E\u043C\u0438\u043D\u0430\u0439 \u0438\u043C\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430 "${char.name}", \u0435\u0433\u043E \u0432\u043E\u0437\u0440\u0430\u0441\u0442, \u0435\u0433\u043E \u0444\u0440\u0430\u043A\u0446\u0438\u044E \u0438\u043B\u0438 \u043B\u044E\u0431\u043E\u0435 \u0434\u0440\u0443\u0433\u043E\u0435 \u043F\u0440\u044F\u043C\u043E\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u0438\u0435 \u043D\u0430 \u0435\u0433\u043E \u043B\u0438\u0447\u043D\u043E\u0441\u0442\u044C.
        \u041D\u0430\u0447\u043D\u0438 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u0440\u0430\u0437\u0443, \u0431\u0435\u0437 \u0432\u0432\u043E\u0434\u043D\u044B\u0445 \u0444\u0440\u0430\u0437 \u0432\u0440\u043E\u0434\u0435 "\u041D\u0430 \u044D\u0442\u043E\u0439 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D..." \u0438\u043B\u0438 "\u041D\u0430 \u0440\u0438\u0441\u0443\u043D\u043A\u0435 \u043C\u044B \u0432\u0438\u0434\u0438\u043C...".`;
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: {
            parts: [
              { inlineData: { mimeType, data: cleanBase64 } },
              { text: prompt }
            ]
          }
        });
        res.json({ text: response.text || "" });
      } else {
        const infoSummary = `\u0418\u043C\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430: ${char.name}
\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435/\u0411\u0438\u043E\u0433\u0440\u0430\u0444\u0438\u044F: ${char.additionalInfo || ""}
\u0422\u0435\u0433\u0438: ${char.tags?.join(", ") || ""} ${char.hiddenTags?.join(", ") || ""}
\u0412\u043E\u0437\u0440\u0430\u0441\u0442: ${char.age || ""}
\u0420\u043E\u0441\u0442: ${char.height || ""}
\u0425\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438/\u0434\u0435\u0442\u0430\u043B\u0438: ${char.customFields?.map((f) => `${f.name}: ${f.value}`).join("; ") || ""}`;
        const prompt = `\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0438\u0437\u0443\u0447\u0438 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0435:
        ${infoSummary}
        
        \u041D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u0434\u0430\u043D\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043F\u0440\u0438\u0434\u0443\u043C\u0430\u0439 \u0438 \u043D\u0430\u043F\u0438\u0448\u0438 \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u043E\u0435 \u0445\u0443\u0434\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (3\u20135 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439) \u0434\u043B\u044F \u0435\u0433\u043E \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u0446\u0435\u043F\u0442-\u0430\u0440\u0442\u0430/\u0438\u043B\u043B\u044E\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u043D\u0430 \u0440\u0443\u0441\u0441\u043A\u043E\u043C \u044F\u0437\u044B\u043A\u0435. \u041E\u043F\u0438\u0448\u0438, \u043A\u0430\u043A \u044D\u0442\u043E\u0442 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436 \u0434\u043E\u043B\u0436\u0435\u043D \u0432\u044B\u0433\u043B\u044F\u0434\u0435\u0442\u044C \u043D\u0430 \u0441\u0432\u043E\u0435\u043C \u0430\u0440\u0442\u0435: \u0435\u0433\u043E \u0432\u043D\u0435\u0448\u043D\u043E\u0441\u0442\u044C, \u043E\u0434\u0435\u0436\u0434\u0443, \u0446\u0432\u0435\u0442\u043E\u0432\u0443\u044E \u0433\u0430\u043C\u043C\u0443, \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043B\u0438\u0446\u0430, \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u0435, \u043F\u043E\u0437\u0443 \u0438 \u0430\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0443. 
        \u041A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0432\u0430\u0436\u043D\u043E\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u043E: \u043D\u0438 \u0432 \u043A\u043E\u0435\u043C \u0441\u043B\u0443\u0447\u0430\u0435 \u041D\u0415 \u0443\u043F\u043E\u043C\u0438\u043D\u0430\u0439 \u0438\u043C\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430 "${char.name}", \u0435\u0433\u043E \u0432\u043E\u0437\u0440\u0430\u0441\u0442, \u0435\u0433\u043E \u0444\u0440\u0430\u043A\u0446\u0438\u044E \u0438\u043B\u0438 \u043B\u044E\u0431\u043E\u0435 \u043F\u0440\u044F\u043C\u043E\u0435 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u043E\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u0438\u0435 \u043D\u0430 \u0435\u0433\u043E \u043B\u0438\u0447\u043D\u043E\u0441\u0442\u044C. \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u043E \u0442\u0430\u043A, \u0431\u0443\u0434\u0442\u043E \u0442\u044B \u0441\u043C\u043E\u0442\u0440\u0438\u0448\u044C \u043D\u0430 \u0443\u0436\u0435 \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0430\u0440\u0442 \u044D\u0442\u043E\u0433\u043E \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430.
        \u041D\u0430\u0447\u043D\u0438 \u0445\u0443\u0434\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u0440\u0430\u0437\u0443, \u0431\u0435\u0437 \u0432\u0432\u043E\u0434\u043D\u044B\u0445 \u0444\u0440\u0430\u0437 \u0432\u0440\u043E\u0434\u0435 "\u041D\u0430 \u044D\u0442\u043E\u043C \u043A\u043E\u043D\u0446\u0435\u043F\u0442-\u0430\u0440\u0442\u0435..." \u0438\u043B\u0438 "\u041D\u0430 \u0440\u0438\u0441\u0443\u043D\u043A\u0435 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D...".`;
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt
        });
        res.json({ text: response.text || "" });
      }
    } catch (err) {
      console.warn("Gemini Character Description Error, using high-fidelity fallback:", err);
      try {
        const { char } = req.body;
        const cleanName = char?.name || "\u0433\u0435\u0440\u043E\u0439";
        const rawBio = char?.additionalInfo || "";
        let bioSnippet = rawBio;
        if (cleanName && bioSnippet) {
          bioSnippet = bioSnippet.replace(new RegExp(cleanName, "gi"), "\u0433\u0435\u0440\u043E\u0439");
        }
        if (bioSnippet.length > 180) {
          bioSnippet = bioSnippet.substring(0, 180) + "...";
        }
        if (!bioSnippet) {
          bioSnippet = "\u043E\u043A\u0440\u0443\u0436\u0435\u043D \u0437\u0430\u0433\u0430\u0434\u043E\u0447\u043D\u043E\u0439 \u0430\u0443\u0440\u043E\u0439 \u0432\u0435\u043B\u0438\u0447\u0438\u044F \u0438 \u0442\u0430\u0439\u043D\u043E\u0439 \u0441\u0438\u043B\u044B, \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u044C \u0441\u0432\u043E\u0435 \u0438\u0441\u0442\u0438\u043D\u043D\u043E\u0435 \u043C\u0430\u0441\u0442\u0435\u0440\u0441\u0442\u0432\u043E";
        }
        const tagsLower = (char?.tags || []).map((t) => t.toLowerCase());
        const isMagical = tagsLower.some((t) => ["\u043C\u0430\u0433", "\u043C\u0430\u0433\u0438\u044F", "\u0432\u043E\u043B\u0448\u0435\u0431\u0441\u0442\u0432\u043E", "magic", "wizard", "\u043A\u043E\u043B\u0434\u0443\u043D"].includes(t));
        const isTech = tagsLower.some((t) => ["\u0442\u0435\u0445", "\u043A\u0438\u0431\u0435\u0440", "cyber", "neon", "\u0440\u043E\u0431\u043E\u0442", "robot", "tech"].includes(t));
        let themeContext = "\u044D\u043F\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u0438\u0439 \u0438 \u0431\u043B\u0430\u0433\u043E\u0440\u043E\u0434\u043D\u043E\u0439 \u0431\u043E\u0440\u044C\u0431\u044B";
        if (isMagical) {
          themeContext = "\u0434\u0440\u0435\u0432\u043D\u0438\u0445 \u0441\u0432\u0438\u0442\u043A\u043E\u0432 \u0437\u0430\u043A\u043B\u0438\u043D\u0430\u043D\u0438\u0439, \u0437\u0430\u0433\u0430\u0434\u043E\u0447\u043D\u044B\u0445 \u0437\u0432\u0435\u0437\u0434\u043D\u044B\u0445 \u0440\u0443\u043D \u0438 \u043C\u0435\u0440\u0446\u0430\u044E\u0449\u0435\u0433\u043E \u043C\u0438\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0441\u0438\u044F\u043D\u0438\u044F";
        } else if (isTech) {
          themeContext = "\u043D\u0435\u043E\u043D\u043E\u0432\u043E\u0433\u043E \u0441\u0438\u044F\u043D\u0438\u044F, \u043F\u0435\u0440\u0435\u0434\u043E\u0432\u044B\u0445 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439 \u0438 \u0443\u0440\u0431\u0430\u043D\u0438\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0431\u0443\u0434\u0443\u0449\u0435\u0433\u043E";
        }
        const fallbackText = `\u0421\u0442\u0430\u0442\u043D\u044B\u0439 \u0438 \u0437\u0430\u0433\u0430\u0434\u043E\u0447\u043D\u044B\u0439 \u0441\u0438\u043B\u0443\u044D\u0442, \u043F\u043B\u0430\u0432\u043D\u043E \u0443\u0433\u0430\u0434\u044B\u0432\u0430\u044E\u0449\u0438\u0439\u0441\u044F \u0441\u0440\u0435\u0434\u0438 \u0433\u0430\u0440\u043C\u043E\u043D\u0438\u0447\u043D\u044B\u0445 \u043F\u043E\u043B\u0443\u0442\u043E\u043D\u043E\u0432 \u0441\u0432\u0435\u0442\u0430 \u0438 \u0442\u0435\u043D\u0438. \u041E\u0431\u043B\u0438\u043A \u043F\u0440\u0435\u0432\u043E\u0441\u0445\u043E\u0434\u043D\u043E \u043F\u0435\u0440\u0435\u0434\u0430\u0435\u0442 \u0430\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0443 ${themeContext}. \u0412\u0437\u0433\u043B\u044F\u0434 \u0443\u0441\u0442\u0440\u0435\u043C\u043B\u0435\u043D \u0432\u043F\u0435\u0440\u0435\u0434 \u043A \u0434\u0430\u043B\u0435\u043A\u0438\u043C \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043C, \u043E\u0442\u0440\u0430\u0436\u0430\u044F \u0436\u0435\u043B\u0435\u0437\u043D\u0443\u044E \u0432\u043E\u043B\u044E \u0438 \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u0443\u044E \u043C\u0443\u0434\u0440\u043E\u0441\u0442\u044C, \u0430 \u043A\u0430\u0436\u0434\u0430\u044F \u0434\u0435\u0442\u0430\u043B\u044C \u044D\u043A\u0438\u043F\u0438\u0440\u043E\u0432\u043A\u0438 \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u043E \u0437\u0430\u0432\u0435\u0440\u0448\u0430\u0435\u0442 \u043E\u0431\u0449\u0443\u044E \u043A\u0430\u0440\u0442\u0438\u043D\u0443. \u041E\u0441\u043E\u0431\u044B\u0439 \u043F\u043E\u043A\u0440\u043E\u0439 \u043E\u0434\u0435\u0436\u0434 \u0438 \u0430\u043A\u0446\u0435\u043D\u0442\u044B \u0432\u044B\u0434\u0430\u044E\u0442 \u0433\u043B\u0443\u0431\u043E\u043A\u0443\u044E \u043F\u0440\u0435\u0434\u044B\u0441\u0442\u043E\u0440\u0438\u044E: ${bioSnippet}.`;
        res.json({
          text: fallbackText,
          isFallback: true,
          warning: "\u0418\u0418 \u043F\u0435\u0440\u0435\u0433\u0440\u0443\u0436\u0435\u043D. \u0410\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0432\u044B\u0441\u043E\u043A\u043E\u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0435 \u0442\u0435\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435."
        });
      } catch (fallbackErr) {
        res.json({
          text: "\u0424\u0438\u0433\u0443\u0440\u0430, \u043F\u0440\u043E\u043D\u0438\u0437\u0430\u043D\u043D\u0430\u044F \u043D\u0435\u0432\u0435\u0440\u043E\u044F\u0442\u043D\u044B\u043C \u0434\u0443\u0445\u043E\u043C \u043F\u0440\u0438\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0439, \u0437\u0430\u043C\u0435\u0440\u043B\u0430 \u0432 \u044D\u0444\u0444\u0435\u043A\u0442\u043D\u043E\u0439 \u043A\u043E\u043D\u0442\u0440\u0430\u0441\u0442\u043D\u043E\u0439 \u043F\u043E\u0437\u0435. \u0412\u0437\u0433\u043B\u044F\u0434 \u043F\u043E\u043B\u043E\u043D \u043D\u0435\u043F\u043E\u043A\u043E\u043B\u0435\u0431\u0438\u043C\u043E\u0439 \u0443\u0432\u0435\u0440\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0438 \u0442\u0430\u0438\u043D\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u0431\u043B\u0435\u0441\u043A\u0430, \u043F\u0435\u0440\u0435\u043A\u043B\u0438\u043A\u0430\u044F\u0441\u044C \u0441 \u0433\u043B\u0443\u0431\u043E\u043A\u0438\u043C\u0438 \u0445\u0443\u0434\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u043C\u0438 \u0444\u043E\u043D\u0430\u043C\u0438.",
          isFallback: true
        });
      }
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use("/raz", import_express.default.static(distPath));
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
