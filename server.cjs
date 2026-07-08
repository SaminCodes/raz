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
  app.use((req, res, next) => {
    if (req.url.startsWith("/raz/api/")) {
      req.url = req.url.substring(4);
    }
    next();
  });
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
  app.post("/api/nanobanana/generate", async (req, res) => {
    try {
      const { endpoint, apiKey, prompt, model, size, response_format, negative_prompt } = req.body;
      if (!apiKey) {
        return res.status(400).json({ error: "\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u043A\u043B\u044E\u0447 API (API Key is required)" });
      }
      if (!prompt) {
        return res.status(400).json({ error: "\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u043F\u0440\u043E\u043C\u043F\u0442 (Prompt is required)" });
      }
      const targetUrl = endpoint || "https://api.nanobanana.pro/v1/images/generations";
      console.log(`Forwarding image generation request to: ${targetUrl} for model: ${model || "default"}`);
      const requestBody = {
        prompt,
        n: 1,
        size: size || "1024x1024"
      };
      if (model) {
        requestBody.model = model;
      }
      if (response_format) {
        requestBody.response_format = response_format;
      }
      if (negative_prompt) {
        requestBody.negative_prompt = negative_prompt;
      }
      const apiResponse = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      });
      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.error(`Nanobanana API returned error status ${apiResponse.status}:`, errorText);
        let parsedError;
        try {
          parsedError = JSON.parse(errorText);
        } catch {
          parsedError = { error: errorText };
        }
        return res.status(apiResponse.status).json({
          error: parsedError.error?.message || parsedError.error || `\u041E\u0448\u0438\u0431\u043A\u0430 NanoBanana API (\u041A\u043E\u0434: ${apiResponse.status})`,
          details: parsedError
        });
      }
      const resData = await apiResponse.json();
      console.log("Nanobanana API response received successfully!");
      let imageUrl = "";
      if (resData.data && Array.isArray(resData.data) && resData.data[0]) {
        imageUrl = resData.data[0].url || (resData.data[0].b64_json ? `data:image/png;base64,${resData.data[0].b64_json}` : "");
      } else if (resData.imageUrl) {
        imageUrl = resData.imageUrl;
      } else if (resData.url) {
        imageUrl = resData.url;
      } else if (resData.image) {
        imageUrl = resData.image;
      } else {
        imageUrl = resData.url || "";
      }
      if (!imageUrl) {
        console.warn("Could not parse image URL from response:", JSON.stringify(resData));
        return res.status(500).json({
          error: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0438\u0437\u0432\u043B\u0435\u0447\u044C URL \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0438\u0437 \u043E\u0442\u0432\u0435\u0442\u0430 API. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u044D\u043D\u0434\u043F\u043E\u0438\u043D\u0442\u0430 \u0438\u043B\u0438 \u043E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u0432 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443.",
          rawResponse: resData
        });
      }
      res.json({ imageUrl });
    } catch (err) {
      console.error("Nanobanana proxy error:", err);
      res.status(500).json({ error: err.message || "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044F\u044F \u043E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u043F\u0440\u0438 \u043F\u0440\u043E\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u0430" });
    }
  });
  function parseCSV(csvText) {
    const result = [];
    let row = [];
    let currentVal = "";
    let insideQuote = false;
    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const nextChar = csvText[i + 1];
      if (char === '"') {
        if (insideQuote && nextChar === '"') {
          currentVal += '"';
          i++;
        } else {
          insideQuote = !insideQuote;
        }
      } else if (char === "," && !insideQuote) {
        row.push(currentVal);
        currentVal = "";
      } else if ((char === "\r" || char === "\n") && !insideQuote) {
        if (char === "\r" && nextChar === "\n") {
          i++;
        }
        row.push(currentVal);
        result.push(row);
        row = [];
        currentVal = "";
      } else {
        currentVal += char;
      }
    }
    if (currentVal || row.length > 0) {
      row.push(currentVal);
      result.push(row);
    }
    if (result.length === 0) return [];
    const headers = result[0].map((h) => h.trim());
    const rows = result.slice(1);
    return rows.filter((r) => r.length > 0 && r.some((cell) => cell.trim() !== "")).map((r) => {
      const obj = {};
      headers.forEach((h, idx) => {
        obj[h] = r[idx] !== void 0 ? r[idx] : "";
      });
      return obj;
    });
  }
  let fileListCache = null;
  const CACHE_TTL = 5 * 60 * 1e3;
  app.get("/api/github/files", async (req, res) => {
    try {
      const now = Date.now();
      if (fileListCache && now - fileListCache.timestamp < CACHE_TTL) {
        return res.json(fileListCache.data);
      }
      console.log("Fetching file list from GitHub repository SaminCodes/raz_storage...");
      const apiResponse = await fetch("https://api.github.com/repos/SaminCodes/raz_storage/contents", {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrono-Haven-App/1.0"
        }
      });
      if (!apiResponse.ok) {
        const errText = await apiResponse.text();
        console.error("GitHub API error:", errText);
        const fallbackList = [
          { name: "\u043E\u0431\u0449\u0435\u0435.csv", path: "\u043E\u0431\u0449\u0435\u0435.csv", download_url: "https://raw.githubusercontent.com/SaminCodes/raz_storage/main/%D0%BE%D0%B1%D1%89%D0%B5%D0%B5.csv" }
        ];
        if (fileListCache) {
          return res.json(fileListCache.data);
        }
        return res.json(fallbackList);
      }
      const contents = await apiResponse.json();
      const csvFiles = contents.filter((file) => file.name.endsWith(".csv")).map((file) => ({
        name: file.name,
        path: file.path,
        download_url: file.download_url
      }));
      fileListCache = { data: csvFiles, timestamp: now };
      res.json(csvFiles);
    } catch (err) {
      console.error("Failed to fetch GitHub files:", err);
      if (fileListCache) {
        return res.json(fileListCache.data);
      }
      res.json([
        { name: "\u043E\u0431\u0449\u0435\u0435.csv", path: "\u043E\u0431\u0449\u0435\u0435.csv", download_url: "https://raw.githubusercontent.com/SaminCodes/raz_storage/main/%D0%BE%D0%B1%D1%89%D0%B5%D0%B5.csv" }
      ]);
    }
  });
  let fileContentCache = {};
  app.get("/api/github/file-content", async (req, res) => {
    const filePath = req.query.path;
    if (!filePath || typeof filePath !== "string") {
      return res.status(400).json({ error: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 path \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u0435\u043D" });
    }
    try {
      const now = Date.now();
      if (fileContentCache[filePath] && now - fileContentCache[filePath].timestamp < CACHE_TTL) {
        return res.json(fileContentCache[filePath].data);
      }
      const downloadUrl = `https://raw.githubusercontent.com/SaminCodes/raz_storage/main/${encodeURIComponent(filePath)}`;
      console.log(`Fetching CSV content from: ${downloadUrl}`);
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u0430\u0439\u043B ${filePath} (\u041A\u043E\u0434: ${response.status})`);
      }
      const csvText = await response.text();
      const parsedData = parseCSV(csvText);
      fileContentCache[filePath] = { data: parsedData, timestamp: now };
      res.json(parsedData);
    } catch (err) {
      console.error(`Failed to load file content for ${filePath}:`, err);
      res.status(500).json({ error: err.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0433\u043E \u0444\u0430\u0439\u043B\u0430" });
    }
  });
  function getCleanBodyText(text) {
    if (!text) return "";
    return text.replace(/<@&?\d+>/g, "").replace(/<#\d+>/g, "").replace(/<a?:\w+:\d+>/g, "").replace(/https?:\/\/\S+/g, "").replace(/[\*_~`|]/g, "").trim();
  }
  function parseDateToTimestamp(dStr) {
    if (!dStr) return 0;
    const parts = dStr.split(",");
    const datePart = parts[0]?.trim();
    const timePart = parts[1]?.trim();
    if (datePart && timePart) {
      const d = /* @__PURE__ */ new Date(`${datePart}T${timePart}`);
      if (!isNaN(d.getTime())) return d.getTime();
    }
    const fallback = new Date(dStr.replace(" ", "T"));
    if (!isNaN(fallback.getTime())) return fallback.getTime();
    return 0;
  }
  function parsePostContentOnServer(rawContent) {
    if (!rawContent) return { header: null, body: "", characterNames: [] };
    const trimmed = rawContent.trim();
    if (trimmed.startsWith("|--")) {
      const body = trimmed.substring(3).trim();
      return {
        header: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435",
        body,
        characterNames: ["\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435"]
      };
    }
    let match = rawContent.match(/^\s*[\u2014\u2013-]\s*([^\n\r]+?)\s*[\u2014\u2013-]\s*(?:\r?\n|$)/);
    if (!match) {
      match = rawContent.match(/^\s*__\s*(?:["'«“])?\s*([^\n\r"'«»“”_]+?)\s*(?:["'»“”])?\s*__\s*(?:\r?\n|$)/);
    }
    if (!match) {
      match = rawContent.match(/^\s*_\s*(?:["'«“])?\s*([^\n\r"'«»“”_]+?)\s*(?:["'»“”])?\s*_\s*(?:\r?\n|$)/);
    }
    if (match) {
      const headerLine = match[0];
      const headerText = match[1];
      const body = rawContent.replace(headerLine, "").trim();
      const characterNames = headerText.split(/\s+(?:и|and|&|и)\s+|\s*[/&,]\s*/).map((n) => n.trim()).filter(Boolean);
      return {
        header: headerText,
        body,
        characterNames
      };
    }
    return {
      header: null,
      body: rawContent,
      characterNames: []
    };
  }
  function isValidPostOnServer(post) {
    const rawContent = (post.Content || "").trim();
    if (!rawContent) return false;
    const cleanContent = rawContent.replace(/<@&?\d+>/g, "").replace(/<#\d+>/g, "").replace(/<a?:\w+:\d+>/g, "").replace(/https?:\/\/\S+/g, "").trim();
    if (!cleanContent) return false;
    if (/^\d+$/.test(cleanContent)) return false;
    const { body } = parsePostContentOnServer(rawContent);
    const cleanBody = body.replace(/<@&?\d+>/g, "").replace(/<#\d+>/g, "").replace(/<a?:\w+:\d+>/g, "").replace(/https?:\/\/\S+/g, "").trim();
    if (!cleanBody) return false;
    if (/^\d+$/.test(cleanBody)) return false;
    return true;
  }
  const statsCacheMap = /* @__PURE__ */ new Map();
  app.all("/api/github/all-stats", async (req, res) => {
    try {
      const now = Date.now();
      const customMappings = req.body?.mappings || {};
      const cacheKey = JSON.stringify(customMappings);
      const isForceRefresh = req.query.refresh === "true";
      const cached = statsCacheMap.get(cacheKey);
      if (cached && now - cached.timestamp < CACHE_TTL && !isForceRefresh) {
        return res.json(cached.data);
      }
      let csvFiles = [];
      if (fileListCache && now - fileListCache.timestamp < CACHE_TTL) {
        csvFiles = fileListCache.data;
      } else {
        const apiResponse = await fetch("https://api.github.com/repos/SaminCodes/raz_storage/contents", {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrono-Haven-App/1.0"
          }
        });
        if (apiResponse.ok) {
          const contents = await apiResponse.json();
          csvFiles = contents.filter((file) => file.name.endsWith(".csv")).map((file) => ({
            name: file.name,
            path: file.path,
            download_url: file.download_url
          }));
          fileListCache = { data: csvFiles, timestamp: now };
        } else {
          csvFiles = fileListCache ? fileListCache.data : [
            { name: "\u043E\u0431\u0449\u0435\u0435.csv", path: "\u043E\u0431\u0449\u0435\u0435.csv", download_url: "https://raw.githubusercontent.com/SaminCodes/raz_storage/main/%D0%BE%D0%B1%D1%89%D0%B5%D0%B5.csv" }
          ];
        }
      }
      const allFilesData = [];
      await Promise.all(csvFiles.map(async (file) => {
        try {
          const filePath = file.path;
          let parsedData = [];
          if (fileContentCache[filePath] && now - fileContentCache[filePath].timestamp < CACHE_TTL) {
            parsedData = fileContentCache[filePath].data;
          } else {
            const downloadUrl = `https://raw.githubusercontent.com/SaminCodes/raz_storage/main/${encodeURIComponent(filePath)}`;
            const response = await fetch(downloadUrl);
            if (response.ok) {
              const csvText = await response.text();
              parsedData = parseCSV(csvText);
              fileContentCache[filePath] = { data: parsedData, timestamp: now };
            } else if (fileContentCache[filePath]) {
              parsedData = fileContentCache[filePath].data;
            }
          }
          if (parsedData && parsedData.length > 0) {
            allFilesData.push({ fileName: file.name, posts: parsedData });
          }
        } catch (err) {
          console.error(`Error loading file content for stats (${file.name}):`, err);
        }
      }));
      let totalPosts = 0;
      let totalCharacters = 0;
      let totalCharactersClean = 0;
      let totalCharactersNoSpaces = 0;
      const byDate = {};
      const byDayOfWeek = [0, 0, 0, 0, 0, 0, 0];
      const byHour = {};
      for (let h = 0; h < 24; h++) byHour[h] = 0;
      const byCharacter = {};
      const byAuthor = {};
      const byFile = {};
      let overallLongestPost = {
        length: 0,
        content: "",
        characterName: "",
        author: "",
        date: "",
        fileName: ""
      };
      allFilesData.forEach(({ fileName, posts }) => {
        let filePostsCount = 0;
        let fileTotalChars = 0;
        let fileTotalCharsClean = 0;
        let fileTotalCharsNoSpaces = 0;
        const sortedPosts = [...posts].sort((a, b) => parseDateToTimestamp(a.Date) - parseDateToTimestamp(b.Date));
        const mergedPosts = [];
        sortedPosts.forEach((post) => {
          const rawContent = (post.Content || "").trim();
          const parsed = parsePostContentOnServer(rawContent);
          let hasCharacter = parsed.characterNames.length > 0;
          if (!hasCharacter && post.Username && customMappings[post.Username]) {
            hasCharacter = true;
          }
          if (hasCharacter) {
            mergedPosts.push({ ...post });
          } else {
            if (mergedPosts.length > 0) {
              const lastPost = mergedPosts[mergedPosts.length - 1];
              lastPost.Content = (lastPost.Content || "") + "\n\n" + (post.Content || "");
            } else {
              mergedPosts.push({ ...post });
            }
          }
        });
        mergedPosts.forEach((post) => {
          if (!isValidPostOnServer(post)) return;
          const rawContent = post.Content || "";
          const { body, characterNames: rawCharacterNames } = parsePostContentOnServer(rawContent);
          let characterNames = [];
          if (rawCharacterNames.length === 0 && post.Username && customMappings[post.Username]) {
            characterNames = customMappings[post.Username].split(/[,;]+/).map((s) => s.trim()).filter(Boolean);
          } else {
            const tempNames = [];
            (rawCharacterNames.length > 0 ? rawCharacterNames : []).forEach((name) => {
              const mapped = customMappings[name];
              if (mapped) {
                mapped.split(/[,;]+/).map((s) => s.trim()).filter(Boolean).forEach((n) => tempNames.push(n));
              } else {
                tempNames.push(name);
              }
            });
            characterNames = tempNames;
          }
          characterNames = Array.from(new Set(characterNames));
          const bodyLen = body.length;
          const cleanBody = getCleanBodyText(body);
          const bodyLenClean = cleanBody.length;
          const bodyLenNoSpaces = cleanBody.replace(/\s/g, "").length;
          const authorName = post.Username || "\u0410\u043D\u043E\u043D\u0438\u043C";
          totalPosts++;
          totalCharacters += bodyLen;
          totalCharactersClean += bodyLenClean;
          totalCharactersNoSpaces += bodyLenNoSpaces;
          filePostsCount++;
          fileTotalChars += bodyLen;
          fileTotalCharsClean += bodyLenClean;
          fileTotalCharsNoSpaces += bodyLenNoSpaces;
          const dateStr = post.Date || "";
          if (dateStr) {
            const parts = dateStr.split(",");
            const datePart = parts[0]?.trim();
            const timePart = parts[1]?.trim();
            if (datePart && /^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
              byDate[datePart] = (byDate[datePart] || 0) + 1;
              try {
                const d = new Date(datePart);
                if (!isNaN(d.getTime())) {
                  const day = d.getDay();
                  byDayOfWeek[day] = (byDayOfWeek[day] || 0) + 1;
                }
              } catch (e) {
              }
            }
            if (timePart) {
              const hourMatch = timePart.match(/^(\d{2})/);
              if (hourMatch) {
                const hour = parseInt(hourMatch[1], 10);
                if (hour >= 0 && hour < 24) {
                  byHour[hour] = (byHour[hour] || 0) + 1;
                }
              }
            }
          }
          if (bodyLen > overallLongestPost.length) {
            overallLongestPost = {
              length: bodyLen,
              content: body,
              characterName: characterNames.length > 0 ? characterNames.join(" & ") : "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E",
              author: authorName,
              date: dateStr,
              fileName
            };
          }
          if (characterNames.length > 0) {
            characterNames.forEach((charName) => {
              if (!byCharacter[charName]) {
                byCharacter[charName] = {
                  postsCount: 0,
                  totalChars: 0,
                  totalCharsClean: 0,
                  totalCharsNoSpaces: 0,
                  longestPostLength: 0,
                  longestPostContent: "",
                  longestPostDate: "",
                  longestPostFile: "",
                  files: {},
                  hours: {},
                  dates: {},
                  authors: {}
                };
              }
              const cStat = byCharacter[charName];
              cStat.postsCount++;
              cStat.totalChars += bodyLen;
              cStat.totalCharsClean += bodyLenClean;
              cStat.totalCharsNoSpaces += bodyLenNoSpaces;
              if (bodyLen > cStat.longestPostLength) {
                cStat.longestPostLength = bodyLen;
                cStat.longestPostContent = body;
                cStat.longestPostDate = dateStr;
                cStat.longestPostFile = fileName;
              }
              const cleanFileName2 = fileName.replace(/\.csv$/i, "");
              if (!cStat.files[cleanFileName2]) {
                cStat.files[cleanFileName2] = { postsCount: 0, totalChars: 0, totalCharsClean: 0, totalCharsNoSpaces: 0 };
              }
              cStat.files[cleanFileName2].postsCount++;
              cStat.files[cleanFileName2].totalChars += bodyLen;
              cStat.files[cleanFileName2].totalCharsClean += bodyLenClean;
              cStat.files[cleanFileName2].totalCharsNoSpaces += bodyLenNoSpaces;
              cStat.authors[authorName] = (cStat.authors[authorName] || 0) + 1;
              if (dateStr) {
                const parts = dateStr.split(",");
                const datePart = parts[0]?.trim();
                const timePart = parts[1]?.trim();
                if (datePart && /^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
                  cStat.dates[datePart] = (cStat.dates[datePart] || 0) + 1;
                }
                if (timePart) {
                  const hourMatch = timePart.match(/^(\d{2})/);
                  if (hourMatch) {
                    const hour = parseInt(hourMatch[1], 10);
                    if (hour >= 0 && hour < 24) {
                      cStat.hours[hour] = (cStat.hours[hour] || 0) + 1;
                    }
                  }
                }
              }
            });
          }
          if (!byAuthor[authorName]) {
            byAuthor[authorName] = {
              postsCount: 0,
              totalChars: 0,
              totalCharsClean: 0,
              totalCharsNoSpaces: 0,
              longestPostLength: 0,
              longestPostContent: ""
            };
          }
          const aStat = byAuthor[authorName];
          aStat.postsCount++;
          aStat.totalChars += bodyLen;
          aStat.totalCharsClean += bodyLenClean;
          aStat.totalCharsNoSpaces += bodyLenNoSpaces;
          if (bodyLen > aStat.longestPostLength) {
            aStat.longestPostLength = bodyLen;
            aStat.longestPostContent = body;
          }
        });
        const cleanFileName = fileName.replace(/\.csv$/i, "");
        byFile[cleanFileName] = {
          postsCount: filePostsCount,
          totalChars: fileTotalChars,
          totalCharsClean: fileTotalCharsClean,
          totalCharsNoSpaces: fileTotalCharsNoSpaces
        };
      });
      const RUSSIAN_STOP_WORDS = [
        "\u0438",
        "\u0432",
        "\u0432\u043E",
        "\u043D\u0430",
        "\u0441",
        "\u0441\u043E",
        "\u0443",
        "\u043E",
        "\u043E\u0431",
        "\u043E\u0431\u043E",
        "\u043A",
        "\u043A\u043E",
        "\u0438\u0437",
        "\u043E\u0442",
        "\u0434\u043E",
        "\u0431\u0435\u0437",
        "\u0447\u0435\u0440\u0435\u0437",
        "\u043D\u0430\u0434",
        "\u043F\u043E\u0434",
        "\u043F\u0435\u0440\u0435\u0434",
        "\u043F\u0440\u0438",
        "\u0434\u043B\u044F",
        "\u0437\u0430",
        "\u043F\u043E",
        "\u0430",
        "\u043D\u043E",
        "\u0434\u0430",
        "\u0438\u043B\u0438",
        "\u0447\u0442\u043E",
        "\u043A\u0430\u043A",
        "\u0447\u0442\u043E\u0431\u044B",
        "\u0435\u0441\u043B\u0438",
        "\u0445\u043E\u0442\u044F",
        "\u043A\u043E\u0433\u0434\u0430",
        "\u0447\u0442\u043E\u0431",
        "\u0431\u0443\u0434\u0442\u043E",
        "\u0441\u043B\u043E\u0432\u043D\u043E",
        "\u0442\u043E",
        "\u0436\u0435",
        "\u043B\u0438",
        "\u0431\u044B",
        "\u0436\u0435",
        "\u0431\u044B\u043B\u043E",
        "\u0431\u044B\u043B\u0430",
        "\u0431\u044B\u043B\u0438",
        "\u0431\u044B\u043B",
        "\u0431\u0443\u0434\u0435\u0442",
        "\u0431\u0443\u0434\u0443\u0442",
        "\u043C\u0435\u043D\u044F",
        "\u043C\u043D\u0435",
        "\u043C\u043D\u043E\u0439",
        "\u043C\u043D\u043E\u044E",
        "\u0442\u0435\u0431\u044F",
        "\u0442\u0435\u0431\u0435",
        "\u0442\u043E\u0431\u043E\u0439",
        "\u0442\u043E\u0431\u043E\u044E",
        "\u0435\u0433\u043E",
        "\u043D\u0435\u0433\u043E",
        "\u0435\u043C\u0443",
        "\u043D\u0435\u043C\u0443",
        "\u0438\u043C",
        "\u043D\u0438\u043C",
        "\u043D\u0435\u0439",
        "\u0435\u044E",
        "\u043D\u0435\u044E",
        "\u0435\u0435",
        "\u043D\u0435\u0435",
        "\u0438\u0445",
        "\u043D\u0438\u0445",
        "\u0438\u043C\u0438",
        "\u043D\u0438\u043C\u0438",
        "\u0441\u0435\u0431\u044F",
        "\u0441\u0435\u0431\u0435",
        "\u0441\u043E\u0431\u043E\u0439",
        "\u0441\u043E\u0431\u043E\u044E",
        "\u043C\u043E\u0439",
        "\u043C\u043E\u044F",
        "\u043C\u043E\u0435",
        "\u043C\u043E\u0438",
        "\u0442\u0432\u043E\u0439",
        "\u0442\u0432\u043E\u044F",
        "\u0442\u0432\u043E\u0435",
        "\u0442\u0432\u043E\u0438",
        "\u043D\u0430\u0448",
        "\u043D\u0430\u0448\u0430",
        "\u043D\u0430\u0448\u0435",
        "\u043D\u0430\u0448\u0438",
        "\u0432\u0430\u0448",
        "\u0432\u0430\u0448\u0430",
        "\u0432\u0430\u0448\u0435",
        "\u0432\u0430\u0448\u0438",
        "\u0441\u0432\u043E\u0439",
        "\u0441\u0432\u043E\u044F",
        "\u0441\u0432\u043E\u0435",
        "\u0441\u0432\u043E\u0438",
        "\u043A\u0442\u043E",
        "\u0447\u0442\u043E",
        "\u043A\u0430\u043A\u043E\u0439",
        "\u043A\u0430\u043A\u0430\u044F",
        "\u043A\u0430\u043A\u043E\u0435",
        "\u043A\u0430\u043A\u0438\u0435",
        "\u0447\u0435\u0439",
        "\u0447\u044C\u044F",
        "\u0447\u044C\u0435",
        "\u0447\u044C\u0438",
        "\u044D\u0442\u043E\u0442",
        "\u044D\u0442\u0430",
        "\u044D\u0442\u043E",
        "\u044D\u0442\u0438",
        "\u0442\u043E\u0442",
        "\u0442\u0430",
        "\u0442\u0435",
        "\u0442\u0430\u043A\u043E\u0439",
        "\u0442\u0430\u043A\u0430\u044F",
        "\u0442\u0430\u043A\u043E\u0435",
        "\u0442\u0430\u043A\u0438\u0435",
        "\u0432\u0435\u0441\u044C",
        "\u0432\u0441\u044F",
        "\u0432\u0441\u0435",
        "\u0432\u0441\u0435\u0445",
        "\u0432\u0441\u0435\u043C\u0443",
        "\u0432\u0441\u0435\u043C\u0438",
        "\u0432\u0441\u044F\u043A\u0438\u0439",
        "\u043A\u0430\u0436\u0434\u044B\u0439",
        "\u0441\u0430\u043C",
        "\u0441\u0430\u043C\u044B\u0439",
        "\u043E\u0434\u0438\u043D",
        "\u043E\u0434\u043D\u0430",
        "\u043E\u0434\u043D\u043E",
        "\u043E\u0434\u043D\u0438",
        "\u0434\u0440\u0443\u0433\u043E\u0439",
        "\u0434\u0440\u0443\u0433\u0430\u044F",
        "\u0434\u0440\u0443\u0433\u043E\u0435",
        "\u0434\u0440\u0443\u0433\u0438\u0435",
        "\u0438\u043D\u043E\u0439",
        "\u043D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u0439",
        "\u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E",
        "\u043C\u043D\u043E\u0433\u043E",
        "\u043C\u0430\u043B\u043E",
        "\u043D\u0435",
        "\u043D\u0438",
        "\u043D\u0435\u0442",
        "\u043B\u0438\u0448\u044C",
        "\u0442\u043E\u043B\u044C\u043A\u043E",
        "\u0442\u043E\u0436\u0435",
        "\u0442\u0430\u043A\u0436\u0435",
        "\u0435\u0449\u0435",
        "\u0443\u0436\u0435",
        "\u0442\u0430\u043A",
        "\u0442\u0430\u043C",
        "\u0442\u0443\u0442",
        "\u0433\u0434\u0435",
        "\u043A\u0443\u0434\u0430",
        "\u043E\u0442\u043A\u0443\u0434\u0430",
        "\u0437\u0430\u0447\u0435\u043C",
        "\u043F\u043E\u0447\u0435\u043C\u0443",
        "\u0442\u0435\u043F\u0435\u0440\u044C",
        "\u0442\u043E\u0433\u0434\u0430",
        "\u0441\u0435\u0439\u0447\u0430\u0441",
        "\u043F\u043E\u0441\u043B\u0435",
        "\u043F\u043E\u0442\u043E\u043C",
        "\u043E\u043F\u044F\u0442\u044C",
        "\u0441\u043D\u043E\u0432\u0430",
        "\u0432\u0434\u0440\u0443\u0433",
        "\u0435\u0434\u0432\u0430",
        "\u0447\u0443\u0442\u044C",
        "\u043F\u043E\u0447\u0442\u0438",
        "\u043E\u0447\u0435\u043D\u044C",
        "\u0441\u043E\u0432\u0441\u0435\u043C",
        "\u0441\u043B\u0438\u0448\u043A\u043E\u043C",
        "\u0432\u0435\u0441\u044C\u043C\u0430",
        "\u043A\u0440\u0430\u0439\u043D\u0435",
        "\u0440\u0430\u0437\u0432\u0435",
        "\u043D\u0435\u0443\u0436\u0435\u043B\u0438"
      ];
      const RUSSIAN_PARASITE_WORDS = [
        "\u043F\u0440\u043E\u0441\u0442\u043E",
        "\u0442\u0438\u043F\u0430",
        "\u0432\u043E\u043E\u0431\u0449\u0435",
        "\u043A\u043E\u0440\u043E\u0447\u0435",
        "\u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E",
        "\u0437\u043D\u0430\u0447\u0438\u0442",
        "\u0431\u043B\u0438\u043D",
        "\u043D\u0430\u0432\u0435\u0440\u043D\u043E\u0435",
        "\u0432\u0435\u0440\u043E\u044F\u0442\u043D\u043E",
        "\u0431\u0443\u0434\u0442\u043E",
        "\u0441\u043B\u043E\u0432\u043D\u043E",
        "\u0432\u043E\u0442",
        "\u043F\u043E\u043D\u0438\u043C\u0430\u0435\u0448\u044C",
        "\u0441\u043B\u0443\u0448\u0430\u0439",
        "\u0432\u0438\u0434\u0438\u043C\u043E",
        "\u043A\u0430\u0436\u0435\u0442\u0441\u044F",
        "\u043B\u0430\u0434\u043D\u043E",
        "\u0442\u0430\u043A\u0436\u0435",
        "\u0442\u043E\u0436\u0435",
        "\u0445\u043E\u0442\u044F",
        "\u0432\u0434\u0440\u0443\u0433",
        "\u043F\u0440\u044F\u043C\u043E",
        "\u043F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438",
        "\u0441\u0440\u0430\u0437\u0443",
        "\u043A\u0430\u043A-\u0442\u043E",
        "\u043F\u043E\u0447\u0435\u043C\u0443-\u0442\u043E",
        "\u0437\u0430\u0447\u0435\u043C-\u0442\u043E",
        "\u0433\u0434\u0435-\u0442\u043E",
        "\u043A\u0442\u043E-\u0442\u043E",
        "\u0447\u0442\u043E-\u0442\u043E",
        "\u043A\u0430\u043A\u043E\u0439-\u0442\u043E",
        "\u0442\u0430\u043A\u0438",
        "\u0445\u043E\u0442\u044C",
        "\u0440\u0430\u0437\u0432\u0435",
        "\u043D\u0435\u0443\u0436\u0435\u043B\u0438",
        "\u0434\u0430\u0436\u0435",
        "\u0431\u0443\u043A\u0432\u0430\u043B\u044C\u043D\u043E",
        "\u0440\u0435\u0430\u043B\u044C\u043D\u043E",
        "\u0441\u0435\u0440\u044C\u0435\u0437\u043D\u043E",
        "\u0442\u043E\u0447\u043D\u043E",
        "\u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E",
        "\u0444\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438",
        "\u0447\u0438\u0441\u0442\u043E",
        "\u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E",
        "\u0442\u0438\u043F\u043E"
      ];
      const characterLeaderboard = Object.entries(byCharacter).map(([name, stat]) => {
        return {
          name,
          postsCount: stat.postsCount,
          totalChars: stat.totalChars,
          totalCharsClean: stat.totalCharsClean,
          totalCharsNoSpaces: stat.totalCharsNoSpaces,
          averageLength: Math.round(stat.totalChars / (stat.postsCount || 1)),
          averageLengthClean: Math.round(stat.totalCharsClean / (stat.postsCount || 1)),
          averageLengthNoSpaces: Math.round(stat.totalCharsNoSpaces / (stat.postsCount || 1)),
          longestPostLength: stat.longestPostLength,
          longestPostContent: stat.longestPostContent,
          longestPostDate: stat.longestPostDate,
          longestPostFile: stat.longestPostFile,
          files: stat.files,
          hours: stat.hours,
          dates: stat.dates,
          authors: stat.authors
        };
      }).sort((a, b) => b.totalCharsNoSpaces - a.totalCharsNoSpaces);
      const authorLeaderboard = Object.entries(byAuthor).map(([name, stat]) => ({
        name,
        postsCount: stat.postsCount,
        totalChars: stat.totalChars,
        totalCharsClean: stat.totalCharsClean,
        totalCharsNoSpaces: stat.totalCharsNoSpaces,
        averageLength: Math.round(stat.totalChars / (stat.postsCount || 1)),
        averageLengthClean: Math.round(stat.totalCharsClean / (stat.postsCount || 1)),
        averageLengthNoSpaces: Math.round(stat.totalCharsNoSpaces / (stat.postsCount || 1)),
        longestPostLength: stat.longestPostLength,
        longestPostContent: stat.longestPostContent
      })).sort((a, b) => b.totalCharsNoSpaces - a.totalCharsNoSpaces);
      const payload = {
        totalPosts,
        totalCharacters,
        totalCharactersClean,
        totalCharactersNoSpaces,
        averagePostLength: totalPosts > 0 ? Math.round(totalCharacters / totalPosts) : 0,
        averagePostLengthClean: totalPosts > 0 ? Math.round(totalCharactersClean / totalPosts) : 0,
        averagePostLengthNoSpaces: totalPosts > 0 ? Math.round(totalCharactersNoSpaces / totalPosts) : 0,
        overallLongestPost,
        byDate,
        byDayOfWeek,
        byHour,
        characterLeaderboard,
        authorLeaderboard,
        byFile,
        lastUpdated: now
      };
      statsCacheMap.set(cacheKey, { data: payload, timestamp: now });
      res.json(payload);
    } catch (err) {
      console.error("Failed to generate combined stats:", err);
      res.status(500).json({ error: err.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u0434\u0441\u0447\u0435\u0442\u0435 \u043E\u0431\u0449\u0435\u0439 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0438" });
    }
  });
  app.post("/api/github/character-advanced-stats", async (req, res) => {
    try {
      const { name, mappings } = req.body;
      if (!name) {
        return res.status(400).json({ error: "Character name is required" });
      }
      const customMappings = mappings || {};
      const targetCharName = name.trim().toLowerCase();
      const now = Date.now();
      let csvFiles = [];
      if (fileListCache && now - fileListCache.timestamp < CACHE_TTL) {
        csvFiles = fileListCache.data;
      } else {
        const apiResponse = await fetch("https://api.github.com/repos/SaminCodes/raz_storage/contents", {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrono-Haven-App/1.0"
          }
        });
        if (apiResponse.ok) {
          const contents = await apiResponse.json();
          csvFiles = contents.filter((file) => file.name.endsWith(".csv")).map((file) => ({
            name: file.name,
            path: file.path,
            download_url: file.download_url
          }));
          fileListCache = { data: csvFiles, timestamp: now };
        } else {
          csvFiles = fileListCache ? fileListCache.data : [
            { name: "\u043E\u0431\u0449\u0435\u0435.csv", path: "\u043E\u0431\u0449\u0435\u0435.csv", download_url: "https://raw.githubusercontent.com/SaminCodes/raz_storage/main/%D0%BE%D0%B1%D1%89%D0%B5%D0%B5.csv" }
          ];
        }
      }
      const allFilesData = [];
      await Promise.all(csvFiles.map(async (file) => {
        try {
          const filePath = file.path;
          let parsedData = [];
          if (fileContentCache[filePath] && now - fileContentCache[filePath].timestamp < CACHE_TTL) {
            parsedData = fileContentCache[filePath].data;
          } else {
            const downloadUrl = `https://raw.githubusercontent.com/SaminCodes/raz_storage/main/${encodeURIComponent(filePath)}`;
            const response = await fetch(downloadUrl);
            if (response.ok) {
              const csvText = await response.text();
              parsedData = parseCSV(csvText);
              fileContentCache[filePath] = { data: parsedData, timestamp: now };
            } else if (fileContentCache[filePath]) {
              parsedData = fileContentCache[filePath].data;
            }
          }
          if (parsedData && parsedData.length > 0) {
            allFilesData.push({ fileName: file.name, posts: parsedData });
          }
        } catch (err) {
          console.error(`Error loading file content for stats (${file.name}):`, err);
        }
      }));
      let totalWords = 0;
      const uniqueWordsSet = /* @__PURE__ */ new Set();
      let sentenceCount = 0;
      let exclamationCount = 0;
      let questionCount = 0;
      let dialogueLines = 0;
      let totalLines = 0;
      const responseTimes = [];
      const allWords = {};
      const allPhrases = {};
      const dialoguePhrases = {};
      const interactions = {};
      allFilesData.forEach(({ fileName, posts }) => {
        let lastPostInfo = null;
        const sortedPosts = [...posts].sort((a, b) => parseDateToTimestamp(a.Date) - parseDateToTimestamp(b.Date));
        const mergedPosts = [];
        sortedPosts.forEach((post) => {
          const rawContent = (post.Content || "").trim();
          const parsed = parsePostContentOnServer(rawContent);
          let hasCharacter = parsed.characterNames.length > 0;
          if (!hasCharacter && post.Username && customMappings[post.Username]) {
            hasCharacter = true;
          }
          if (hasCharacter) {
            mergedPosts.push({ ...post });
          } else {
            if (mergedPosts.length > 0) {
              const lastPost = mergedPosts[mergedPosts.length - 1];
              lastPost.Content = (lastPost.Content || "") + "\n\n" + (post.Content || "");
            } else {
              mergedPosts.push({ ...post });
            }
          }
        });
        mergedPosts.forEach((post) => {
          if (!isValidPostOnServer(post)) return;
          const rawContent = post.Content || "";
          const { body, characterNames: rawCharacterNames } = parsePostContentOnServer(rawContent);
          let characterNames = [];
          if (rawCharacterNames.length === 0 && post.Username && customMappings[post.Username]) {
            characterNames = customMappings[post.Username].split(/[,;]+/).map((s) => s.trim()).filter(Boolean);
          } else {
            const tempNames = [];
            (rawCharacterNames.length > 0 ? rawCharacterNames : []).forEach((name2) => {
              const mapped = customMappings[name2];
              if (mapped) {
                mapped.split(/[,;]+/).map((s) => s.trim()).filter(Boolean).forEach((n) => tempNames.push(n));
              } else {
                tempNames.push(name2);
              }
            });
            characterNames = tempNames;
          }
          characterNames = Array.from(new Set(characterNames));
          const hasTargetChar = characterNames.some((cn) => cn.trim().toLowerCase() === targetCharName);
          const dateStr = post.Date || "";
          let currentTimestamp = null;
          if (dateStr) {
            currentTimestamp = parseDateToTimestamp(dateStr);
          }
          if (hasTargetChar) {
            if (currentTimestamp !== null && lastPostInfo && lastPostInfo.timestamp !== null) {
              const diffMs = currentTimestamp - lastPostInfo.timestamp;
              if (diffMs > 0) {
                const responseTimeMinutes = Math.floor(diffMs / 6e4);
                if (responseTimeMinutes <= 2880) {
                  responseTimes.push(responseTimeMinutes);
                }
              }
            }
            const getDialogueTexts = (textStr) => {
              const linesList = textStr.split(/\r?\n/).map((l) => l.trim());
              const dialogueLinesList = [];
              for (const line of linesList) {
                if (line.startsWith("\u2014") || line.startsWith("\u2013") || line.startsWith("-")) {
                  const parts = line.split(/[\u2014\u2013]/);
                  if (parts.length > 1) {
                    const speech = parts[1]?.trim();
                    if (speech) dialogueLinesList.push(speech);
                    for (let i = 3; i < parts.length; i += 2) {
                      const part = parts[i]?.trim();
                      if (part) dialogueLinesList.push(part);
                    }
                  } else {
                    const cleanLine = line.replace(/^[\u2014\u2013-]\s*/, "").trim();
                    if (cleanLine) dialogueLinesList.push(cleanLine);
                  }
                }
                const quoteRegex = /[«“"']([^»”"']+)[»”"']/g;
                let match;
                while ((match = quoteRegex.exec(line)) !== null) {
                  const speech = match[1].trim();
                  if (speech.length > 3) {
                    dialogueLinesList.push(speech);
                  }
                }
              }
              return dialogueLinesList;
            };
            const getDashedDialogueTexts = (textStr) => {
              const linesList = textStr.split(/\r?\n/).map((l) => l.trim());
              const dialogueLinesList = [];
              for (const line of linesList) {
                if (line.startsWith("\u2014") || line.startsWith("\u2013") || line.startsWith("-")) {
                  const parts = line.split(/[\u2014\u2013-]/);
                  if (parts.length > 1) {
                    const speech = parts[1]?.trim();
                    if (speech) dialogueLinesList.push(speech);
                    for (let i = 3; i < parts.length; i += 2) {
                      const part = parts[i]?.trim();
                      if (part) dialogueLinesList.push(part);
                    }
                  } else {
                    const cleanLine = line.replace(/^[\u2014\u2013-]\s*/, "").trim();
                    if (cleanLine) dialogueLinesList.push(cleanLine);
                  }
                }
              }
              return dialogueLinesList;
            };
            const words = body.toLowerCase().match(/[а-яёa-z0-9-]+/g) || [];
            totalWords += words.length;
            words.forEach((w) => {
              if (w.length > 2) {
                uniqueWordsSet.add(w);
                allWords[w] = (allWords[w] || 0) + 1;
              }
            });
            for (let i = 0; i < words.length - 1; i++) {
              const w1 = words[i];
              const w2 = words[i + 1];
              if (w1.length >= 3 && w2.length >= 3) {
                const phrase = `${w1} ${w2}`;
                allPhrases[phrase] = (allPhrases[phrase] || 0) + 1;
              }
            }
            for (let i = 0; i < words.length - 2; i++) {
              const w1 = words[i];
              const w2 = words[i + 1];
              const w3 = words[i + 2];
              if (w1.length >= 3 && w2.length >= 2 && w3.length >= 3) {
                const phrase = `${w1} ${w2} ${w3}`;
                allPhrases[phrase] = (allPhrases[phrase] || 0) + 1;
              }
            }
            const dialogueTexts = getDashedDialogueTexts(body);
            dialogueTexts.forEach((text) => {
              const dWords = text.toLowerCase().match(/[а-яёa-z0-9-]+/g) || [];
              for (let i = 0; i < dWords.length - 1; i++) {
                const w1 = dWords[i];
                const w2 = dWords[i + 1];
                if (w1.length >= 3 && w2.length >= 3) {
                  const phrase = `${w1} ${w2}`;
                  dialoguePhrases[phrase] = (dialoguePhrases[phrase] || 0) + 1;
                }
              }
              for (let i = 0; i < dWords.length - 2; i++) {
                const w1 = dWords[i];
                const w2 = dWords[i + 1];
                const w3 = dWords[i + 2];
                if (w1.length >= 3 && w2.length >= 2 && w3.length >= 3) {
                  const phrase = `${w1} ${w2} ${w3}`;
                  dialoguePhrases[phrase] = (dialoguePhrases[phrase] || 0) + 1;
                }
              }
            });
            const sentences = body.split(/[.!?]+(?:\s+|$)/).map((s) => s.replace(/[*_#\-—~()]+/g, "").trim()).filter((s) => {
              const wordsInSec = s.match(/[а-яёa-z0-9-]+/gi) || [];
              return wordsInSec.length >= 2;
            });
            sentenceCount += sentences.length;
            exclamationCount += (body.match(/!/g) || []).length;
            questionCount += (body.match(/\?/g) || []).length;
            const bodyLines = body.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
            totalLines += bodyLines.length;
            dialogueLines += bodyLines.filter((l) => l.startsWith("\u2014") || l.startsWith("\u2013") || l.startsWith("-")).length;
            if (lastPostInfo && lastPostInfo.characterNames.length > 0) {
              lastPostInfo.characterNames.forEach((prevChar) => {
                if (prevChar.toLowerCase() !== targetCharName) {
                  interactions[prevChar] = (interactions[prevChar] || 0) + 1;
                }
              });
            }
          }
          if (characterNames.length > 0) {
            lastPostInfo = {
              characterNames,
              timestamp: currentTimestamp
            };
          }
        });
      });
      const avgRespTime = responseTimes.length > 0 ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length) : null;
      const RUSSIAN_STOP_WORDS = [
        "\u0438",
        "\u0432",
        "\u0432\u043E",
        "\u043D\u0430",
        "\u0441",
        "\u0441\u043E",
        "\u0443",
        "\u043E",
        "\u043E\u0431",
        "\u043E\u0431\u043E",
        "\u043A",
        "\u043A\u043E",
        "\u0438\u0437",
        "\u043E\u0442",
        "\u0434\u043E",
        "\u0431\u0435\u0437",
        "\u0447\u0435\u0440\u0435\u0437",
        "\u043D\u0430\u0434",
        "\u043F\u043E\u0434",
        "\u043F\u0435\u0440\u0435\u0434",
        "\u043F\u0440\u0438",
        "\u0434\u043B\u044F",
        "\u0437\u0430",
        "\u043F\u043E",
        "\u0430",
        "\u043D\u043E",
        "\u0434\u0430",
        "\u0438\u043B\u0438",
        "\u0447\u0442\u043E",
        "\u043A\u0430\u043A",
        "\u0447\u0442\u043E\u0431\u044B",
        "\u0435\u0441\u043B\u0438",
        "\u0445\u043E\u0442\u044F",
        "\u043A\u043E\u0433\u0434\u0430",
        "\u0447\u0442\u043E\u0431",
        "\u0431\u0443\u0434\u0442\u043E",
        "\u0441\u043B\u043E\u0432\u043D\u043E",
        "\u0442\u043E",
        "\u0436\u0435",
        "\u043B\u0438",
        "\u0431\u044B",
        "\u0436\u0435",
        "\u0431\u044B\u043B\u043E",
        "\u0431\u044B\u043B\u0430",
        "\u0431\u044B\u043B\u0438",
        "\u0431\u044B\u043B",
        "\u0431\u0443\u0434\u0435\u0442",
        "\u0431\u0443\u0434\u0443\u0442",
        "\u043C\u0435\u043D\u044F",
        "\u043C\u043D\u0435",
        "\u043C\u043D\u043E\u0439",
        "\u043C\u043D\u043E\u044E",
        "\u0442\u0435\u0431\u044F",
        "\u0442\u0435\u0431\u0435",
        "\u0442\u043E\u0431\u043E\u0439",
        "\u0442\u043E\u0431\u043E\u044E",
        "\u0435\u0433\u043E",
        "\u043D\u0435\u0433\u043E",
        "\u0435\u043C\u0443",
        "\u043D\u0435\u043C\u0443",
        "\u0438\u043C",
        "\u043D\u0438\u043C",
        "\u043D\u0435\u0439",
        "\u0435\u044E",
        "\u043D\u0435\u044E",
        "\u0435\u0435",
        "\u043D\u0435\u0435",
        "\u0438\u0445",
        "\u043D\u0438\u0445",
        "\u0438\u043C\u0438",
        "\u043D\u0438\u043C\u0438",
        "\u0441\u0435\u0431\u044F",
        "\u0441\u0435\u0431\u0435",
        "\u0441\u043E\u0431\u043E\u0439",
        "\u0441\u043E\u0431\u043E\u044E",
        "\u043C\u043E\u0439",
        "\u043C\u043E\u044F",
        "\u043C\u043E\u0435",
        "\u043C\u043E\u0438",
        "\u0442\u0432\u043E\u0439",
        "\u0442\u0432\u043E\u044F",
        "\u0442\u0432\u043E\u0435",
        "\u0442\u0432\u043E\u0438",
        "\u043D\u0430\u0448",
        "\u043D\u0430\u0448\u0430",
        "\u043D\u0430\u0448\u0435",
        "\u043D\u0430\u0448\u0438",
        "\u0432\u0430\u0448",
        "\u0432\u0430\u0448\u0430",
        "\u0432\u0430\u0448\u0435",
        "\u0432\u0430\u0448\u0438",
        "\u0441\u0432\u043E\u0439",
        "\u0441\u0432\u043E\u044F",
        "\u0441\u0432\u043E\u0435",
        "\u0441\u0432\u043E\u0438",
        "\u043A\u0442\u043E",
        "\u0447\u0442\u043E",
        "\u043A\u0430\u043A\u043E\u0439",
        "\u043A\u0430\u043A\u0430\u044F",
        "\u043A\u0430\u043A\u043E\u0435",
        "\u043A\u0430\u043A\u0438\u0435",
        "\u0447\u0435\u0439",
        "\u0447\u044C\u044F",
        "\u0447\u044C\u0435",
        "\u0447\u044C\u0438",
        "\u044D\u0442\u043E\u0442",
        "\u044D\u0442\u0430",
        "\u044D\u0442\u043E",
        "\u044D\u0442\u0438",
        "\u0442\u043E\u0442",
        "\u0442\u0430",
        "\u0442\u0435",
        "\u0442\u0430\u043A\u043E\u0439",
        "\u0442\u0430\u043A\u0430\u044F",
        "\u0442\u0430\u043A\u043E\u0435",
        "\u0442\u0430\u043A\u0438\u0435",
        "\u0432\u0435\u0441\u044C",
        "\u0432\u0441\u044F",
        "\u0432\u0441\u0435",
        "\u0432\u0441\u0435\u0445",
        "\u0432\u0441\u0435\u043C\u0443",
        "\u0432\u0441\u0435\u043C\u0438",
        "\u0432\u0441\u044F\u043A\u0438\u0439",
        "\u043A\u0430\u0436\u0434\u044B\u0439",
        "\u0441\u0430\u043C",
        "\u0441\u0430\u043C\u044B\u0439",
        "\u043E\u0434\u0438\u043D",
        "\u043E\u0434\u043D\u0430",
        "\u043E\u0434\u043D\u043E",
        "\u043E\u0434\u043D\u0438",
        "\u0434\u0440\u0443\u0433\u043E\u0439",
        "\u0434\u0440\u0443\u0433\u0430\u044F",
        "\u0434\u0440\u0443\u0433\u043E\u0435",
        "\u0434\u0440\u0443\u0433\u0438\u0435",
        "\u0438\u043D\u043E\u0439",
        "\u043D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u0439",
        "\u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E",
        "\u043C\u043D\u043E\u0433\u043E",
        "\u043C\u0430\u043B\u043E",
        "\u043D\u0435",
        "\u043D\u0438",
        "\u043D\u0435\u0442",
        "\u043B\u0438\u0448\u044C",
        "\u0442\u043E\u043B\u044C\u043A\u043E",
        "\u0442\u043E\u0436\u0435",
        "\u0442\u0430\u043A\u0436\u0435",
        "\u0435\u0449\u0435",
        "\u0443\u0436\u0435",
        "\u0442\u0430\u043A",
        "\u0442\u0430\u043C",
        "\u0442\u0443\u0442",
        "\u0433\u0434\u0435",
        "\u043A\u0443\u0434\u0430",
        "\u043E\u0442\u043A\u0443\u0434\u0430",
        "\u0437\u0430\u0447\u0435\u043C",
        "\u043F\u043E\u0447\u0435\u043C\u0443",
        "\u0442\u0435\u043F\u0435\u0440\u044C",
        "\u0442\u043E\u0433\u0434\u0430",
        "\u0441\u0435\u0439\u0447\u0430\u0441",
        "\u043F\u043E\u0441\u043B\u0435",
        "\u043F\u043E\u0442\u043E\u043C",
        "\u043E\u043F\u044F\u0442\u044C",
        "\u0441\u043D\u043E\u0432\u0430",
        "\u0432\u0434\u0440\u0443\u0433",
        "\u0435\u0434\u0432\u0430",
        "\u0447\u0443\u0442\u044C",
        "\u043F\u043E\u0447\u0442\u0438",
        "\u043E\u0447\u0435\u043D\u044C",
        "\u0441\u043E\u0432\u0441\u0435\u043C",
        "\u0441\u043B\u0438\u0448\u043A\u043E\u043C",
        "\u0432\u0435\u0441\u044C\u043C\u0430",
        "\u043A\u0440\u0430\u0439\u043D\u0435",
        "\u0440\u0430\u0437\u0432\u0435",
        "\u043D\u0435\u0443\u0436\u0435\u043B\u0438"
      ];
      const EXCLUDE_WORDS = /* @__PURE__ */ new Set([
        "\u043F\u0440\u043E\u0441\u0442\u043E",
        "\u0432\u043E\u0442",
        "\u043F\u043E\u043A\u0430",
        "\u0447\u0442\u043E",
        "\u0442\u0438\u043F\u0430",
        "\u0432\u043E\u043E\u0431\u0449\u0435",
        "\u043A\u043E\u0440\u043E\u0447\u0435",
        "\u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E",
        "\u0437\u043D\u0430\u0447\u0438\u0442",
        "\u0431\u043B\u0438\u043D",
        "\u043D\u0430\u0432\u0435\u0440\u043D\u043E\u0435",
        "\u0432\u0435\u0440\u043E\u044F\u0442\u043D\u043E",
        "\u0431\u0443\u0434\u0442\u043E",
        "\u0441\u043B\u043E\u0432\u043D\u043E",
        "\u043F\u043E\u043D\u0438\u043C\u0430\u0435\u0448\u044C",
        "\u0441\u043B\u0443\u0448\u0430\u0439",
        "\u0432\u0438\u0434\u0438\u043C\u043E",
        "\u043A\u0430\u0436\u0435\u0442\u0441\u044F",
        "\u043B\u0430\u0434\u043D\u043E",
        "\u0442\u0430\u043A\u0436\u0435",
        "\u0442\u043E\u0436\u0435",
        "\u0445\u043E\u0442\u044F",
        "\u0432\u0434\u0440\u0443\u0433",
        "\u043F\u0440\u044F\u043C\u043E",
        "\u043F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438",
        "\u0441\u0440\u0430\u0437\u0443",
        "\u043A\u0430\u043A-\u0442\u043E",
        "\u043F\u043E\u0447\u0435\u043C\u0443-\u0442\u043E",
        "\u0437\u0430\u0447\u0435\u043C-\u0442\u043E",
        "\u0433\u0434\u0435-\u0442\u043E",
        "\u043A\u0442\u043E-\u0442\u043E",
        "\u0447\u0442\u043E-\u0442\u043E",
        "\u043A\u0430\u043A\u043E\u0439-\u0442\u043E",
        "\u0442\u0430\u043A\u0438",
        "\u0445\u043E\u0442\u044C",
        "\u0440\u0430\u0437\u0432\u0435",
        "\u043D\u0435\u0443\u0436\u0435\u043B\u0438",
        "\u0434\u0430\u0436\u0435",
        "\u0431\u0443\u043A\u0432\u0430\u043B\u044C\u043D\u043E",
        "\u0440\u0435\u0430\u043B\u044C\u043D\u043E",
        "\u0441\u0435\u0440\u044C\u0435\u0437\u043D\u043E",
        "\u0442\u043E\u0447\u043D\u043E",
        "\u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E",
        "\u0444\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438",
        "\u0447\u0438\u0441\u0442\u043E",
        "\u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E",
        "\u0442\u0438\u043F\u043E",
        "\u0442\u0430\u043C",
        "\u0442\u0443\u0442",
        "\u0433\u0434\u0435",
        "\u043A\u0443\u0434\u0430",
        "\u043E\u0442\u043A\u0443\u0434\u0430",
        "\u0437\u0430\u0447\u0435\u043C",
        "\u043F\u043E\u0447\u0435\u043C\u0443",
        "\u0442\u0435\u043F\u0435\u0440\u044C",
        "\u0442\u043E\u0433\u0434\u0430",
        "\u0441\u0435\u0439\u0447\u0430\u0441",
        "\u043F\u043E\u0441\u043B\u0435",
        "\u043F\u043E\u0442\u043E\u043C",
        "\u043E\u043F\u044F\u0442\u044C",
        "\u0441\u043D\u043E\u0432\u0430",
        "\u0435\u0434\u0432\u0430",
        "\u0447\u0443\u0442\u044C",
        "\u043F\u043E\u0447\u0442\u0438",
        "\u043E\u0447\u0435\u043D\u044C",
        "\u0441\u043E\u0432\u0441\u0435\u043C",
        "\u0441\u043B\u0438\u0448\u043A\u043E\u043C",
        "\u0432\u0435\u0441\u044C\u043C\u0430",
        "\u043A\u0440\u0430\u0439\u043D\u0435",
        "\u0438",
        "\u0432",
        "\u0432\u043E",
        "\u043D\u0430",
        "\u0441",
        "\u0441\u043E",
        "\u0443",
        "\u043E",
        "\u043E\u0431",
        "\u043E\u0431\u043E",
        "\u043A",
        "\u043A\u043E",
        "\u0438\u0437",
        "\u043E\u0442",
        "\u0434\u043E",
        "\u0431\u0435\u0437",
        "\u0447\u0435\u0440\u0435\u0437",
        "\u043D\u0430\u0434",
        "\u043F\u043E\u0434",
        "\u043F\u0435\u0440\u0435\u0434",
        "\u043F\u0440\u0438",
        "\u0434\u043B\u044F",
        "\u0437\u0430",
        "\u043F\u043E",
        "\u0430",
        "\u043D\u043E",
        "\u0434\u0430",
        "\u0438\u043B\u0438",
        "\u0447\u0442\u043E\u0431\u044B",
        "\u0435\u0441\u043B\u0438",
        "\u0447\u0442\u043E\u0431",
        "\u0442\u043E",
        "\u0436\u0435",
        "\u043B\u0438",
        "\u0431\u044B",
        "\u0431\u044B\u043B\u043E",
        "\u0431\u044B\u043B\u0430",
        "\u0431\u044B\u043B\u0438",
        "\u0431\u044B\u043B",
        "\u0431\u0443\u0434\u0435\u0442",
        "\u0431\u0443\u0434\u0443\u0442",
        "\u043C\u0435\u043D\u044F",
        "\u043C\u043D\u0435",
        "\u043C\u043D\u043E\u0439",
        "\u043C\u043D\u043E\u044E",
        "\u0442\u0435\u0431\u044F",
        "\u0442\u0435\u0431\u0435",
        "\u0442\u043E\u0431\u043E\u0439",
        "\u0442\u043E\u0431\u043E\u044E",
        "\u0435\u0433\u043E",
        "\u043D\u0435\u0433\u043E",
        "\u0435\u043C\u0443",
        "\u043D\u0435\u043C\u0443",
        "\u0438\u043C",
        "\u043D\u0438\u043C",
        "\u043D\u0435\u0439",
        "\u0435\u044E",
        "\u043D\u0435\u044E",
        "\u0435\u0435",
        "\u043D\u0435\u0435",
        "\u0438\u0445",
        "\u043D\u0438\u0445",
        "\u0438\u043C\u0438",
        "\u043D\u0438\u043C\u0438",
        "\u0441\u0435\u0431\u044F",
        "\u0441\u0435\u0431\u0435",
        "\u0441\u043E\u0431\u043E\u0439",
        "\u0441\u043E\u0431\u043E\u044E",
        "\u043C\u043E\u0439",
        "\u043C\u043E\u044F",
        "\u043C\u043E\u0435",
        "\u043C\u043E\u0438",
        "\u0442\u0432\u043E\u0439",
        "\u0442\u0432\u043E\u044F",
        "\u0442\u0432\u043E\u0435",
        "\u0442\u0432\u043E\u0438",
        "\u043D\u0430\u0448",
        "\u043D\u0430\u0448\u0430",
        "\u043D\u0430\u0448\u0435",
        "\u043D\u0430\u0448\u0438",
        "\u0432\u0430\u0448",
        "\u0432\u0430\u0448\u0430",
        "\u0432\u0430\u0448\u0435",
        "\u0432\u0430\u0448\u0438",
        "\u0441\u0432\u043E\u0439",
        "\u0441\u0432\u043E\u044F",
        "\u0441\u0432\u043E\u0435",
        "\u0441\u0432\u043E\u0438",
        "\u043A\u0442\u043E",
        "\u043A\u0430\u043A\u043E\u0439",
        "\u043A\u0430\u043A\u0430\u044F",
        "\u043A\u0430\u043A\u043E\u0435",
        "\u043A\u0430\u043A\u0438\u0435",
        "\u0447\u0435\u0439",
        "\u0447\u044C\u044F",
        "\u0447\u044C\u0435",
        "\u0447\u044C\u0438",
        "\u044D\u0442\u043E\u0442",
        "\u044D\u0442\u0430",
        "\u044D\u0442\u043E",
        "\u044D\u0442\u0438",
        "\u0442\u043E\u0442",
        "\u0442\u0430",
        "\u0442\u0435",
        "\u0442\u0430\u043A\u043E\u0439",
        "\u0442\u0430\u043A\u0430\u044F",
        "\u0442\u0430\u043A\u043E\u0435",
        "\u0442\u0430\u043A\u0438\u0435",
        "\u0432\u0435\u0441\u044C",
        "\u0432\u0441\u044F",
        "\u0432\u0441\u0435",
        "\u0432\u0441\u0435\u0445",
        "\u0432\u0441\u0435\u043C\u0443",
        "\u0432\u0441\u0435\u043C\u0438",
        "\u0432\u0441\u044F\u043A\u0438\u0439",
        "\u043A\u0430\u0436\u0434\u044B\u0439",
        "\u0441\u0430\u043C",
        "\u0441\u0430\u043C\u044B\u0439",
        "\u043E\u0434\u0438\u043D",
        "\u043E\u0434\u043D\u0430",
        "\u043E\u0434\u043D\u043E",
        "\u043E\u0434\u043D\u0438",
        "\u0434\u0440\u0443\u0433\u043E\u0439",
        "\u0434\u0440\u0443\u0433\u0430\u044F",
        "\u0434\u0440\u0443\u0433\u043E\u0435",
        "\u0434\u0440\u0443\u0433\u0438\u0435",
        "\u0438\u043D\u043E\u0439",
        "\u043D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u0439",
        "\u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E",
        "m\u043D\u043E\u0433\u043E",
        "\u043C\u0430\u043B\u043E",
        "\u043D\u0435",
        "\u043D\u0438",
        "\u043D\u0435\u0442",
        "\u043B\u0438\u0448\u044C",
        "\u0442\u043E\u043B\u044C\u043A\u043E",
        "\u0435\u0449\u0435",
        "\u0443\u0436\u0435",
        "\u0442\u0430\u043A",
        "\u043A\u0430\u043A",
        "\u0431\u044B\u0442\u044C",
        "\u0431\u044B\u043B",
        "\u0431\u044B\u043B\u0430",
        "\u043C\u043E\u0436\u0435\u0442",
        "\u043C\u043E\u0433\u0443",
        "\u043C\u043E\u0436\u0435\u0448\u044C",
        "\u0445\u043E\u0447\u0435\u0442",
        "\u0445\u043E\u0447\u0443",
        "\u0431\u0443\u0434\u0435\u043C",
        "\u0431\u0443\u0434\u0435\u0448\u044C",
        "\u0431\u0443\u0434\u0443",
        "\u0435\u0441\u0442\u044C",
        "\u043D\u0435\u0442",
        "\u0432\u0441\u0435-\u0442\u0430\u043A\u0438",
        "\u0432\u0441\u0451-\u0442\u0430\u043A\u0438",
        "\u0432\u0441\u0451",
        "\u0432\u0441\u0435",
        "\u044D\u0442\u043E",
        "\u0442\u043E",
        "\u0434\u0430",
        "\u043D\u0435\u0442",
        "\u043D\u0443",
        "\u0434\u0430\u0436\u0435",
        "\u0436\u0435",
        "\u043B\u0438",
        "\u0431\u044B",
        "\u0445\u043E\u0442\u044F",
        "\u0442\u043E\u0436\u0435",
        "\u043F\u043E\u044D\u0442\u043E\u043C\u0443",
        "\u043A\u043E\u0433\u0434\u0430",
        "\u0442\u043E\u0433\u0434\u0430",
        "\u0447\u0442\u043E\u0431\u044B",
        "\u0432\u0435\u0434\u044C",
        "\u0440\u0430\u0437",
        "\u0434\u0432\u0430",
        "\u0442\u0440\u0438",
        "\u0441\u0432\u043E\u0438\u0445",
        "\u0441\u0432\u043E\u0438",
        "\u0441\u043A\u043E\u0440\u0435\u0435",
        "\u0432\u0441\u0435\u0433\u043E"
      ]);
      const phraseCandidates = Object.entries(dialoguePhrases).filter(([phrase]) => {
        const words = phrase.split(" ");
        return words.every((word) => word.length >= 2 && !EXCLUDE_WORDS.has(word) && !RUSSIAN_STOP_WORDS.includes(word));
      }).sort((a, b) => b[1] - a[1]);
      let parasiteWords = phraseCandidates.slice(0, 3).map(([phrase]) => phrase);
      if (parasiteWords.length < 3) {
        const topSingleWords = Object.entries(allWords).filter(([word]) => word.length >= 3 && !EXCLUDE_WORDS.has(word) && !RUSSIAN_STOP_WORDS.includes(word)).sort((a, b) => b[1] - a[1]).map(([word]) => word);
        for (const sw of topSingleWords) {
          if (parasiteWords.length >= 3) break;
          if (!parasiteWords.includes(sw)) {
            parasiteWords.push(sw);
          }
        }
      }
      if (parasiteWords.length < 3) {
        const relaxedPhrases = Object.entries(dialoguePhrases).filter(([phrase]) => {
          const words = phrase.split(" ");
          return words.every((word) => !RUSSIAN_STOP_WORDS.includes(word) && !EXCLUDE_WORDS.has(word));
        }).sort((a, b) => b[1] - a[1]).map(([phrase]) => phrase);
        for (const rp of relaxedPhrases) {
          if (parasiteWords.length >= 3) break;
          if (!parasiteWords.includes(rp)) {
            parasiteWords.push(rp);
          }
        }
      }
      const signaturePhrase = phraseCandidates[0] ? phraseCandidates[0][0] : "";
      res.json({
        totalWords,
        vocabularySize: uniqueWordsSet.size,
        sentenceCount,
        exclamationCount,
        questionCount,
        dialogueLines,
        totalLines,
        averageResponseTime: avgRespTime,
        parasiteWords,
        signaturePhrase,
        interactions
      });
    } catch (err) {
      console.error("Failed to generate advanced character stats:", err);
      res.status(500).json({ error: err.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u0434\u0441\u0447\u0435\u0442\u0435 \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u043E\u0439 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0438" });
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
  app.get("/api/proxy-image", async (req, res) => {
    try {
      const imageUrl = req.query.url;
      if (!imageUrl || typeof imageUrl !== "string") {
        return res.status(400).json({ error: "No URL provided" });
      }
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType) {
        res.setHeader("Content-Type", contentType);
      }
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "public, max-age=31536000");
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    } catch (err) {
      console.error("Image proxy error:", err);
      res.status(500).json({ error: "Failed to proxy image" });
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
