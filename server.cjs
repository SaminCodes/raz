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
var import_express2 = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_http = require("http");
var import_socket = require("socket.io");
var import_vite = require("vite");
var import_cors = __toESM(require("cors"), 1);
var import_sharp = __toESM(require("sharp"), 1);
var import_genai = require("@google/genai");

// server/characterApi.ts
var import_express = __toESM(require("express"), 1);
var import_crypto = __toESM(require("crypto"), 1);
var FIREBASE_DB_URL = process.env.FIREBASE_DB_URL || "https://razlom-db061-default-rtdb.firebaseio.com";
var ROOM_ID = process.env.ROOM_ID || "global_chronicles_main";
var MASTER_ENV_KEY = process.env.RAZLOM_API_KEY || process.env.API_KEY;
var DEFAULT_BOOTSTRAP_KEY = "rzl_live_master_secret_2026";
var cachedApiKeys = /* @__PURE__ */ new Map();
var lastKeysFetchTime = 0;
var KEYS_CACHE_TTL = 60 * 1e3;
var cachedCharactersList = [];
var lastCharactersFetchTime = 0;
var CHARACTERS_CACHE_TTL = 30 * 1e3;
function invalidateCharacterCache() {
  lastCharactersFetchTime = 0;
}
async function getAllCharacters() {
  const now = Date.now();
  if (cachedCharactersList.length > 0 && now - lastCharactersFetchTime < CHARACTERS_CACHE_TTL) {
    return cachedCharactersList;
  }
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/rooms/${ROOM_ID}/characters.json`);
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object") {
        cachedCharactersList = Object.entries(data).map(([key, value]) => ({
          ...value,
          id: value.id || key
        }));
        lastCharactersFetchTime = now;
      } else {
        cachedCharactersList = [];
      }
    }
  } catch (err) {
    console.error("Error fetching characters from RTDB:", err?.message || err);
  }
  return cachedCharactersList;
}
async function getCharacterById(id) {
  const all = await getAllCharacters();
  const cached = all.find((c) => c.id === id);
  if (cached) return cached;
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/rooms/${ROOM_ID}/characters/${id}.json`);
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object") {
        return { ...data, id: data.id || id };
      }
    }
  } catch (err) {
    console.error(`Error fetching character ${id} from RTDB:`, err?.message || err);
  }
  return null;
}
async function loadApiKeys() {
  const now = Date.now();
  if (cachedApiKeys.size > 0 && now - lastKeysFetchTime < KEYS_CACHE_TTL) {
    return cachedApiKeys;
  }
  const map = /* @__PURE__ */ new Map();
  const activeMasterKey = MASTER_ENV_KEY || DEFAULT_BOOTSTRAP_KEY;
  map.set(activeMasterKey, {
    id: "master_key",
    key: activeMasterKey,
    name: "Master Server Key",
    role: "super_admin",
    createdAt: 17e11,
    permissions: ["read", "create", "update", "delete", "manage_keys"]
  });
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/rooms/${ROOM_ID}/api_keys.json`);
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object") {
        for (const [keyId, record] of Object.entries(data)) {
          if (record && record.key) {
            map.set(record.key, {
              id: keyId,
              key: record.key,
              name: record.name || "External Bot/Service",
              role: record.role || "player",
              playerId: record.playerId,
              createdAt: record.createdAt || Date.now(),
              expiresAt: record.expiresAt || null,
              permissions: record.permissions || ["read"]
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn("Could not fetch API keys from RTDB, using in-memory keys:", err?.message || err);
  }
  cachedApiKeys = map;
  lastKeysFetchTime = now;
  return cachedApiKeys;
}
function requireApiKey(options) {
  return async (req, res, next) => {
    let token = "";
    const authHeader = req.headers["authorization"];
    if (authHeader && typeof authHeader === "string") {
      const parts = authHeader.split(" ");
      if (parts.length === 2 && (parts[0].toLowerCase() === "bearer" || parts[0].toLowerCase() === "token")) {
        token = parts[1].trim();
      } else {
        token = authHeader.trim();
      }
    }
    if (!token && req.headers["x-api-key"] && typeof req.headers["x-api-key"] === "string") {
      token = req.headers["x-api-key"].trim();
    }
    if (!token && req.query.api_key && typeof req.query.api_key === "string") {
      token = req.query.api_key.trim();
    }
    if (!token && options?.allowPublicRead && req.method === "GET") {
      req.apiKeyAuth = {
        keyId: "public_guest",
        name: "Public Visitor",
        role: "readonly",
        permissions: ["read"]
      };
      return next();
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
        message: "Authentication required. Provide an API key via 'Authorization: Bearer <key>', 'x-api-key: <key>' header, or '?api_key=<key>' query param.",
        documentation: "/api/docs"
      });
    }
    const keysMap = await loadApiKeys();
    const keyRecord = keysMap.get(token);
    if (!keyRecord) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
        message: "Invalid API key.",
        documentation: "/api/docs"
      });
    }
    if (keyRecord.expiresAt && Date.now() > keyRecord.expiresAt) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
        message: "The provided API key has expired."
      });
    }
    fetch(`${FIREBASE_DB_URL}/rooms/${ROOM_ID}/api_keys/${keyRecord.id}/lastUsedAt.json`, {
      method: "PUT",
      body: JSON.stringify(Date.now())
    }).catch(() => {
    });
    const roleRanking = {
      super_admin: 4,
      admin: 3,
      player: 2,
      readonly: 1
    };
    const userRank = roleRanking[keyRecord.role] || 1;
    const requiredRank = options?.minRole ? roleRanking[options.minRole] || 1 : 1;
    if (userRank < requiredRank) {
      return res.status(403).json({
        success: false,
        error: "Forbidden",
        message: `Insufficient permissions. Required role: ${options?.minRole}, your key has role: ${keyRecord.role}.`
      });
    }
    if (options?.requiredPermission) {
      const hasPerm = keyRecord.role === "super_admin" || keyRecord.permissions && keyRecord.permissions.includes(options.requiredPermission);
      if (!hasPerm) {
        return res.status(403).json({
          success: false,
          error: "Forbidden",
          message: `Missing required permission: ${options.requiredPermission}.`
        });
      }
    }
    req.apiKeyAuth = {
      keyId: keyRecord.id,
      name: keyRecord.name,
      role: keyRecord.role,
      playerId: keyRecord.playerId,
      permissions: keyRecord.permissions || []
    };
    next();
  };
}
function canManageCharacter(auth, char) {
  if (auth.role === "super_admin" || auth.role === "admin") {
    return { allowed: true };
  }
  if (auth.role === "player") {
    const isOwner = auth.playerId && char.playerId === auth.playerId || auth.playerId && char.createdBy === auth.playerId;
    if (isOwner) {
      return { allowed: true };
    }
    return {
      allowed: false,
      reason: "You can only modify or delete your own characters (playerId must match)."
    };
  }
  return {
    allowed: false,
    reason: "Read-only keys are not permitted to modify characters."
  };
}
function buildCharacterDetails(char, allCharacters) {
  const radar = {
    strength: char.stats?.strength ?? 0,
    agility: char.stats?.agility ?? 0,
    intellect: char.stats?.intellect ?? 0,
    defense: char.stats?.defense ?? 0,
    regeneration: char.stats?.regeneration ?? 0,
    magic: char.stats?.magic ?? 0,
    other: char.stats?.other ?? 0
  };
  const resonance = typeof char.soulResonanceMultiplier === "number" ? char.soulResonanceMultiplier : 1;
  const ignoredStats = Array.isArray(char.ignoredMultiplierStats) ? char.ignoredMultiplierStats : [];
  const effectiveRadar = {};
  for (const [key, val] of Object.entries(radar)) {
    const isIgnored = ignoredStats.includes(key);
    effectiveRadar[key] = isIgnored ? val : Math.round(val * resonance * 10) / 10;
  }
  const customStats = Array.isArray(char.customStats) ? char.customStats.map((cs) => {
    const isIgnored = ignoredStats.includes(cs.name);
    return {
      name: cs.name,
      baseValue: cs.value,
      effectiveValue: isIgnored ? cs.value : Math.round(cs.value * resonance * 10) / 10
    };
  }) : [];
  const rawConnections = Array.isArray(char.connections) ? char.connections : [];
  const charMap = /* @__PURE__ */ new Map();
  for (const c of allCharacters) {
    charMap.set(c.id, c);
  }
  const enrichedConnections = rawConnections.map((conn) => {
    const targetChar = charMap.get(conn.id);
    return {
      targetId: conn.id,
      targetName: targetChar?.name || conn.name || "Unknown Character",
      targetAvatar: targetChar?.miniImageUrl || targetChar?.imageUrl || null,
      role: conn.role || "\u0417\u043D\u0430\u043A\u043E\u043C\u044B\u0439",
      color: conn.color || "#eab308",
      characterFound: Boolean(targetChar)
    };
  });
  const gallery = Array.isArray(char.additionalImages) ? char.additionalImages.map((img) => typeof img === "string" ? { url: img } : img) : [];
  const tracks = Array.isArray(char.tracks) ? char.tracks : [];
  return {
    id: char.id,
    name: char.name,
    age: char.age ?? null,
    height: char.height ?? null,
    isDraft: Boolean(char.isDraft),
    playerId: char.playerId || null,
    createdBy: char.createdBy || null,
    createdAt: char.createdAt || null,
    tags: Array.isArray(char.tags) ? char.tags : [],
    hiddenTags: Array.isArray(char.hiddenTags) ? char.hiddenTags : [],
    additionalInfo: char.additionalInfo || "",
    discordPostCount: char.discordPostCount || 0,
    stats: {
      radar,
      effectiveRadar,
      soulResonanceMultiplier: resonance,
      ignoredMultiplierStats: ignoredStats,
      customStats
    },
    connections: enrichedConnections,
    media: {
      avatar: {
        imageUrl: char.imageUrl || null,
        miniImageUrl: char.miniImageUrl || null,
        cardImageUrl: char.cardImageUrl || null,
        scale: char.imageScale ?? 1,
        x: char.imageX ?? 50,
        y: char.imageY ?? 50,
        miniScale: char.miniImageScale ?? char.imageScale ?? 1,
        miniX: char.miniImageX ?? char.imageX ?? 50,
        miniY: char.miniImageY ?? char.imageY ?? 50
      },
      cardBackground: {
        url: char.cardBackgroundImageUrl || null,
        color: char.cardColor || null,
        dim: char.cardBackgroundDim ?? 0
      },
      gallery,
      audio: {
        primaryMusicUrl: char.musicUrl || null,
        musicTitle: char.musicTitle || null,
        musicStart: char.musicStart || 0,
        musicEnd: char.musicEnd || null,
        tracks
      }
    },
    cardGame: {
      cardDescription: char.cardDescription || null,
      cardLabels: Array.isArray(char.cardLabels) ? char.cardLabels : [],
      cardConfig: char.cardConfig || null
    },
    customFields: Array.isArray(char.customFields) ? char.customFields : []
  };
}
function createCharacterApiRouter(io) {
  const router = import_express.default.Router();
  router.get("/characters", requireApiKey({ minRole: "readonly", allowPublicRead: true }), async (req, res) => {
    try {
      const auth = req.apiKeyAuth;
      const allCharacters = await getAllCharacters();
      const page = Math.max(1, parseInt(req.query.page, 10) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
      const search = (req.query.search || req.query.q || "").trim().toLowerCase();
      const tagQuery = (req.query.tag || req.query.tags || "").trim();
      const playerIdFilter = (req.query.playerId || "").trim();
      const isDraftParam = req.query.isDraft;
      const minAge = req.query.minAge ? parseFloat(req.query.minAge) : null;
      const maxAge = req.query.maxAge ? parseFloat(req.query.maxAge) : null;
      const minHeight = req.query.minHeight ? parseFloat(req.query.minHeight) : null;
      const maxHeight = req.query.maxHeight ? parseFloat(req.query.maxHeight) : null;
      const hasMusic = req.query.hasMusic !== void 0 ? req.query.hasMusic === "true" || req.query.hasMusic === "1" : null;
      const hasCard = req.query.hasCard !== void 0 ? req.query.hasCard === "true" || req.query.hasCard === "1" : null;
      const hasConnections = req.query.hasConnections !== void 0 ? req.query.hasConnections === "true" || req.query.hasConnections === "1" : null;
      const sortBy = req.query.sortBy || "name";
      const order = (req.query.order || (sortBy === "createdAt" ? "desc" : "asc")).toLowerCase();
      const format = req.query.format || "standard";
      let filtered = allCharacters.filter((char) => {
        if (char.isDraft) {
          const isOwner = auth.playerId && (char.playerId === auth.playerId || char.createdBy === auth.playerId);
          const isAdmin = auth.role === "super_admin" || auth.role === "admin";
          if (!isAdmin && !isOwner) {
            return false;
          }
          if (isDraftParam === "false") return false;
        } else {
          if (isDraftParam === "true") return false;
        }
        if (search) {
          const inName = (char.name || "").toLowerCase().includes(search);
          const inInfo = (char.additionalInfo || "").toLowerCase().includes(search);
          const inDesc = (char.cardDescription || "").toLowerCase().includes(search);
          const inTags = Array.isArray(char.tags) && char.tags.some((t) => t.toLowerCase().includes(search));
          const inAliases = Array.isArray(char.aliases) && char.aliases.some((a) => a.toLowerCase().includes(search));
          if (!inName && !inInfo && !inDesc && !inTags && !inAliases) {
            return false;
          }
        }
        if (tagQuery) {
          const tags = tagQuery.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
          const charTags = (char.tags || []).map((t) => t.toLowerCase());
          const hasMatchingTag = tags.some((t) => charTags.includes(t));
          if (!hasMatchingTag) return false;
        }
        if (playerIdFilter) {
          if (playerIdFilter.toLowerCase() === "unassigned") {
            if (char.playerId) return false;
          } else if (char.playerId !== playerIdFilter) {
            return false;
          }
        }
        const ageNum = parseFloat(String(char.age));
        if (minAge !== null && (!ageNum || ageNum < minAge)) return false;
        if (maxAge !== null && (!ageNum || ageNum > maxAge)) return false;
        const heightNum = parseFloat(String(char.height));
        if (minHeight !== null && (!heightNum || heightNum < minHeight)) return false;
        if (maxHeight !== null && (!heightNum || heightNum > maxHeight)) return false;
        if (hasMusic !== null) {
          const charHasMusic = Boolean(char.musicUrl || char.tracks && char.tracks.length > 0);
          if (charHasMusic !== hasMusic) return false;
        }
        if (hasCard !== null) {
          const charHasCard = Boolean(char.cardImageUrl || char.cardConfig);
          if (charHasCard !== hasCard) return false;
        }
        if (hasConnections !== null) {
          const charHasConn = Boolean(char.connections && char.connections.length > 0);
          if (charHasConn !== hasConnections) return false;
        }
        return true;
      });
      filtered.sort((a, b) => {
        let valA = a.name || "";
        let valB = b.name || "";
        if (sortBy === "createdAt") {
          valA = a.createdAt || 0;
          valB = b.createdAt || 0;
        } else if (sortBy === "age") {
          valA = parseFloat(String(a.age)) || 0;
          valB = parseFloat(String(b.age)) || 0;
        } else if (sortBy === "height") {
          valA = parseFloat(String(a.height)) || 0;
          valB = parseFloat(String(b.height)) || 0;
        } else if (sortBy === "discordPostCount") {
          valA = a.discordPostCount || 0;
          valB = b.discordPostCount || 0;
        } else {
          valA = (a.name || "").toLowerCase();
          valB = (b.name || "").toLowerCase();
        }
        if (valA < valB) return order === "desc" ? 1 : -1;
        if (valA > valB) return order === "desc" ? -1 : 1;
        return 0;
      });
      const total = filtered.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const startIndex = (page - 1) * limit;
      const pageItems = filtered.slice(startIndex, startIndex + limit);
      let items = pageItems;
      if (format === "detailed") {
        items = pageItems.map((c) => buildCharacterDetails(c, allCharacters));
      } else if (format === "compact") {
        items = pageItems.map((c) => ({
          id: c.id,
          name: c.name,
          age: c.age,
          height: c.height,
          imageUrl: c.imageUrl,
          miniImageUrl: c.miniImageUrl,
          tags: c.tags || [],
          playerId: c.playerId,
          isDraft: Boolean(c.isDraft),
          connectionsCount: c.connections?.length || 0,
          tracksCount: (c.tracks?.length || 0) + (c.musicUrl ? 1 : 0)
        }));
      }
      res.json({
        success: true,
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        },
        filters: {
          search: search || void 0,
          tags: tagQuery || void 0,
          playerId: playerIdFilter || void 0,
          isDraft: isDraftParam || void 0,
          sortBy,
          order,
          format
        },
        items
      });
    } catch (err) {
      console.error("GET /api/characters error:", err);
      res.status(500).json({ success: false, error: "Internal Server Error", message: err?.message });
    }
  });
  router.get("/characters/:id", requireApiKey({ minRole: "readonly", allowPublicRead: true }), async (req, res) => {
    try {
      const auth = req.apiKeyAuth;
      const id = String(req.params.id);
      const allCharacters = await getAllCharacters();
      const char = allCharacters.find((c) => c.id === id) || await getCharacterById(id);
      if (!char) {
        return res.status(404).json({
          success: false,
          error: "Not Found",
          message: `Character with ID '${id}' was not found.`
        });
      }
      if (char.isDraft) {
        const isOwner = auth.playerId && (char.playerId === auth.playerId || char.createdBy === auth.playerId);
        const isAdmin = auth.role === "super_admin" || auth.role === "admin";
        if (!isAdmin && !isOwner) {
          return res.status(403).json({
            success: false,
            error: "Forbidden",
            message: "This character is a private draft and can only be viewed by its author or an administrator."
          });
        }
      }
      const format = req.query.format || "detailed";
      const detailed = buildCharacterDetails(char, allCharacters);
      if (format === "raw") {
        return res.json({ success: true, character: char });
      }
      res.json({
        success: true,
        character: char,
        details: detailed
      });
    } catch (err) {
      console.error(`GET /api/characters/${req.params.id} error:`, err);
      res.status(500).json({ success: false, error: "Internal Server Error", message: err?.message });
    }
  });
  router.post("/characters", requireApiKey({ minRole: "player", requiredPermission: "create" }), async (req, res) => {
    try {
      const auth = req.apiKeyAuth;
      const payload = req.body;
      if (!payload || typeof payload !== "object") {
        return res.status(400).json({
          success: false,
          error: "Bad Request",
          message: "Request body must be a JSON object containing character data."
        });
      }
      if (!payload.name || typeof payload.name !== "string" || !payload.name.trim()) {
        return res.status(400).json({
          success: false,
          error: "Validation Error",
          message: "Character 'name' is required and cannot be empty."
        });
      }
      const charId = payload.id && typeof payload.id === "string" && payload.id.trim() ? payload.id.trim() : `char_${Date.now()}_${import_crypto.default.randomBytes(4).toString("hex")}`;
      const existing = await getCharacterById(charId);
      if (existing) {
        return res.status(409).json({
          success: false,
          error: "Conflict",
          message: `A character with ID '${charId}' already exists. Use PUT or PATCH to update.`
        });
      }
      let targetPlayerId = payload.playerId || null;
      if (auth.role === "player") {
        targetPlayerId = auth.playerId || targetPlayerId;
      }
      const newCharacter = {
        ...payload,
        id: charId,
        name: payload.name.trim(),
        age: payload.age ?? "",
        height: payload.height ?? "",
        imageUrl: payload.imageUrl || "",
        miniImageUrl: payload.miniImageUrl || "",
        cardImageUrl: payload.cardImageUrl || "",
        cardBackgroundImageUrl: payload.cardBackgroundImageUrl || "",
        additionalInfo: payload.additionalInfo || "",
        playerId: targetPlayerId,
        createdBy: auth.playerId || auth.name,
        createdAt: Date.now(),
        isDraft: Boolean(payload.isDraft),
        tags: Array.isArray(payload.tags) ? payload.tags : [],
        connections: Array.isArray(payload.connections) ? payload.connections : [],
        tracks: Array.isArray(payload.tracks) ? payload.tracks : [],
        customStats: Array.isArray(payload.customStats) ? payload.customStats : [],
        stats: payload.stats || {
          strength: 0,
          agility: 0,
          intellect: 0,
          defense: 0,
          regeneration: 0,
          magic: 0,
          other: 0
        }
      };
      const saveRes = await fetch(`${FIREBASE_DB_URL}/rooms/${ROOM_ID}/characters/${charId}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCharacter)
      });
      if (!saveRes.ok) {
        throw new Error(`Firebase RTDB write error: ${saveRes.status} ${saveRes.statusText}`);
      }
      invalidateCharacterCache();
      if (io) {
        io.emit("character:created", { character: newCharacter, author: auth.name });
      }
      res.status(201).json({
        success: true,
        message: "Character created successfully.",
        character: newCharacter
      });
    } catch (err) {
      console.error("POST /api/characters error:", err);
      res.status(500).json({ success: false, error: "Internal Server Error", message: err?.message });
    }
  });
  router.put("/characters/:id", requireApiKey({ minRole: "player", requiredPermission: "update" }), async (req, res) => {
    try {
      const auth = req.apiKeyAuth;
      const id = String(req.params.id);
      const payload = req.body;
      if (!payload || typeof payload !== "object") {
        return res.status(400).json({
          success: false,
          error: "Bad Request",
          message: "Request body must be a JSON object."
        });
      }
      const existing = await getCharacterById(id);
      if (!existing) {
        return res.status(404).json({
          success: false,
          error: "Not Found",
          message: `Character with ID '${id}' was not found.`
        });
      }
      const check = canManageCharacter(auth, existing);
      if (!check.allowed) {
        return res.status(403).json({
          success: false,
          error: "Forbidden",
          message: check.reason || "You do not have permission to edit this character."
        });
      }
      const updatedCharacter = {
        ...payload,
        id,
        // ID cannot be altered
        name: payload.name ? String(payload.name).trim() : existing.name,
        createdAt: existing.createdAt || Date.now(),
        createdBy: existing.createdBy || auth.name,
        playerId: auth.role === "player" ? existing.playerId : payload.playerId ?? existing.playerId
      };
      const saveRes = await fetch(`${FIREBASE_DB_URL}/rooms/${ROOM_ID}/characters/${id}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCharacter)
      });
      if (!saveRes.ok) {
        throw new Error(`Firebase RTDB write error: ${saveRes.status} ${saveRes.statusText}`);
      }
      invalidateCharacterCache();
      if (io) {
        io.emit("character:updated", { id, character: updatedCharacter, author: auth.name });
      }
      res.json({
        success: true,
        message: "Character updated successfully.",
        character: updatedCharacter
      });
    } catch (err) {
      console.error(`PUT /api/characters/${req.params.id} error:`, err);
      res.status(500).json({ success: false, error: "Internal Server Error", message: err?.message });
    }
  });
  router.patch("/characters/:id", requireApiKey({ minRole: "player", requiredPermission: "update" }), async (req, res) => {
    try {
      const auth = req.apiKeyAuth;
      const id = String(req.params.id);
      const updates = req.body;
      if (!updates || typeof updates !== "object") {
        return res.status(400).json({
          success: false,
          error: "Bad Request",
          message: "Request body must be a JSON object."
        });
      }
      const existing = await getCharacterById(id);
      if (!existing) {
        return res.status(404).json({
          success: false,
          error: "Not Found",
          message: `Character with ID '${id}' was not found.`
        });
      }
      const check = canManageCharacter(auth, existing);
      if (!check.allowed) {
        return res.status(403).json({
          success: false,
          error: "Forbidden",
          message: check.reason || "You do not have permission to edit this character."
        });
      }
      const merged = {
        ...existing,
        ...updates,
        id,
        createdAt: existing.createdAt || Date.now(),
        createdBy: existing.createdBy,
        playerId: auth.role === "player" ? existing.playerId : updates.playerId ?? existing.playerId
      };
      if (updates.name) {
        merged.name = String(updates.name).trim();
      }
      if (updates.stats && typeof updates.stats === "object") {
        merged.stats = {
          ...existing.stats,
          ...updates.stats
        };
      }
      const saveRes = await fetch(`${FIREBASE_DB_URL}/rooms/${ROOM_ID}/characters/${id}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(merged)
      });
      if (!saveRes.ok) {
        throw new Error(`Firebase RTDB write error: ${saveRes.status} ${saveRes.statusText}`);
      }
      invalidateCharacterCache();
      if (io) {
        io.emit("character:updated", { id, character: merged, author: auth.name });
      }
      res.json({
        success: true,
        message: "Character updated successfully.",
        character: merged
      });
    } catch (err) {
      console.error(`PATCH /api/characters/${req.params.id} error:`, err);
      res.status(500).json({ success: false, error: "Internal Server Error", message: err?.message });
    }
  });
  router.delete("/characters/:id", requireApiKey({ minRole: "player", requiredPermission: "delete" }), async (req, res) => {
    try {
      const auth = req.apiKeyAuth;
      const id = String(req.params.id);
      const existing = await getCharacterById(id);
      if (!existing) {
        return res.status(404).json({
          success: false,
          error: "Not Found",
          message: `Character with ID '${id}' was not found.`
        });
      }
      const check = canManageCharacter(auth, existing);
      if (!check.allowed) {
        return res.status(403).json({
          success: false,
          error: "Forbidden",
          message: check.reason || "You do not have permission to delete this character."
        });
      }
      const delRes = await fetch(`${FIREBASE_DB_URL}/rooms/${ROOM_ID}/characters/${id}.json`, {
        method: "DELETE"
      });
      if (!delRes.ok) {
        throw new Error(`Firebase RTDB delete error: ${delRes.status} ${delRes.statusText}`);
      }
      invalidateCharacterCache();
      if (io) {
        io.emit("character:deleted", { id, name: existing.name, author: auth.name });
      }
      res.json({
        success: true,
        message: `Character '${existing.name}' (ID: ${id}) has been permanently deleted.`,
        deletedId: id
      });
    } catch (err) {
      console.error(`DELETE /api/characters/${req.params.id} error:`, err);
      res.status(500).json({ success: false, error: "Internal Server Error", message: err?.message });
    }
  });
  router.get("/keys", requireApiKey({ minRole: "admin", requiredPermission: "manage_keys" }), async (req, res) => {
    try {
      const keysMap = await loadApiKeys();
      const list = Array.from(keysMap.values()).map((k) => ({
        id: k.id,
        name: k.name,
        role: k.role,
        playerId: k.playerId || null,
        createdAt: k.createdAt,
        lastUsedAt: k.lastUsedAt || null,
        expiresAt: k.expiresAt || null,
        permissions: k.permissions || [],
        keyMasked: `${k.key.substring(0, 8)}...${k.key.substring(k.key.length - 4)}`
      }));
      res.json({
        success: true,
        total: list.length,
        keys: list
      });
    } catch (err) {
      console.error("GET /api/keys error:", err);
      res.status(500).json({ success: false, error: "Internal Server Error", message: err?.message });
    }
  });
  router.post("/keys", requireApiKey({ minRole: "admin", requiredPermission: "manage_keys" }), async (req, res) => {
    try {
      const { name, role, playerId, expiresInDays, permissions } = req.body;
      if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          error: "Validation Error",
          message: "API key 'name' is required (e.g. 'Discord Bot', 'Sync Script')."
        });
      }
      const validRoles = ["super_admin", "admin", "player", "readonly"];
      const assignedRole = validRoles.includes(role) ? role : "player";
      if (assignedRole === "super_admin" && req.apiKeyAuth?.role !== "super_admin") {
        return res.status(403).json({
          success: false,
          error: "Forbidden",
          message: "Only a super_admin can create another super_admin API key."
        });
      }
      const rawSecret = import_crypto.default.randomBytes(24).toString("hex");
      const generatedKey = `rzl_live_${rawSecret}`;
      const keyId = `key_${Date.now()}_${import_crypto.default.randomBytes(3).toString("hex")}`;
      const now = Date.now();
      const expiresAt = expiresInDays && Number(expiresInDays) > 0 ? now + Number(expiresInDays) * 24 * 60 * 60 * 1e3 : null;
      let finalPermissions = ["read"];
      if (assignedRole === "super_admin") {
        finalPermissions = ["read", "create", "update", "delete", "manage_keys"];
      } else if (assignedRole === "admin") {
        finalPermissions = ["read", "create", "update", "delete"];
      } else if (assignedRole === "player") {
        finalPermissions = ["read", "create", "update", "delete"];
      }
      if (Array.isArray(permissions)) {
        finalPermissions = permissions;
      }
      const newKeyRecord = {
        id: keyId,
        key: generatedKey,
        name: name.trim(),
        role: assignedRole,
        playerId: playerId ? String(playerId).trim() : void 0,
        createdAt: now,
        expiresAt,
        permissions: finalPermissions
      };
      await fetch(`${FIREBASE_DB_URL}/rooms/${ROOM_ID}/api_keys/${keyId}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newKeyRecord)
      });
      cachedApiKeys.set(generatedKey, newKeyRecord);
      res.status(201).json({
        success: true,
        message: "API key created successfully. Store the secret token safely, it will not be displayed in full again.",
        apiKey: newKeyRecord
      });
    } catch (err) {
      console.error("POST /api/keys error:", err);
      res.status(500).json({ success: false, error: "Internal Server Error", message: err?.message });
    }
  });
  router.delete("/keys/:keyId", requireApiKey({ minRole: "admin", requiredPermission: "manage_keys" }), async (req, res) => {
    try {
      const keyId = String(req.params.keyId);
      if (keyId === "master_key") {
        return res.status(400).json({
          success: false,
          error: "Bad Request",
          message: "Cannot delete the default server master key."
        });
      }
      await fetch(`${FIREBASE_DB_URL}/rooms/${ROOM_ID}/api_keys/${keyId}.json`, {
        method: "DELETE"
      });
      lastKeysFetchTime = 0;
      await loadApiKeys();
      res.json({
        success: true,
        message: `API key '${keyId}' has been revoked.`
      });
    } catch (err) {
      console.error("DELETE /api/keys error:", err);
      res.status(500).json({ success: false, error: "Internal Server Error", message: err?.message });
    }
  });
  router.get("/docs/json", (req, res) => {
    res.json(getApiDocumentationJson());
  });
  router.get(["/docs", "/"], (req, res) => {
    const accepts = req.headers["accept"] || "";
    if (accepts.includes("application/json") && !accepts.includes("text/html")) {
      return res.json(getApiDocumentationJson());
    }
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(getApiDocumentationHtml());
  });
  return router;
}
function getApiDocumentationJson() {
  return {
    name: "Razlom Characters REST API",
    version: "1.0.0",
    description: "Production-ready REST API for characters, stats, connections, media, and authorization tokens.",
    baseUrl: "/api",
    authentication: {
      type: "apiKey",
      methods: [
        "Header: 'Authorization: Bearer <API_KEY>'",
        "Header: 'x-api-key: <API_KEY>'",
        "Query Param: '?api_key=<API_KEY>'"
      ],
      defaultMasterKey: MASTER_ENV_KEY ? "(Configured via RAZLOM_API_KEY environment variable)" : DEFAULT_BOOTSTRAP_KEY,
      roles: {
        super_admin: "Full access to all characters, CRUD operations, and API key management.",
        admin: "Full access to view, create, edit, and delete any character.",
        player: "View published characters, create new characters, edit and delete only owned characters.",
        readonly: "Read-only access to published characters."
      }
    },
    endpoints: [
      {
        path: "/api/characters",
        method: "GET",
        summary: "List characters with filtering, search, and pagination",
        auth: "Required (or public view if key omitted)",
        queryParameters: {
          page: "Page number (integer, default: 1)",
          limit: "Items per page (1-100, default: 20)",
          search: "Search query across name, description, tags, aliases (e.g. ?search=\u0421\u0430\u043D\u0441)",
          tag: "Filter by tag or comma-separated tags (e.g. ?tag=\u041C\u0430\u0433,\u0411\u043E\u0441\u0441)",
          playerId: "Filter by player ID, or 'unassigned' for ownerless characters",
          isDraft: "Draft filter: 'false' (default), 'true', 'all' (drafts visible only to author or admin)",
          minAge: "Minimum age",
          maxAge: "Maximum age",
          minHeight: "Minimum height",
          maxHeight: "Maximum height",
          hasMusic: "Filter by presence of music tracks (true/false)",
          hasCard: "Filter by presence of card configuration (true/false)",
          hasConnections: "Filter by presence of character connections (true/false)",
          sortBy: "'name' | 'createdAt' | 'age' | 'height' | 'discordPostCount'",
          order: "'asc' | 'desc'",
          format: "'standard' | 'detailed' | 'compact'"
        }
      },
      {
        path: "/api/characters/:id",
        method: "GET",
        summary: "Get detailed information for a single character (stats, connections, media)",
        auth: "Required (or public view if key omitted)",
        parameters: {
          id: "Character ID (e.g. '1767370435542')"
        },
        queryParameters: {
          format: "'detailed' (default, rich parsed structure) | 'raw' (exact RTDB record)"
        }
      },
      {
        path: "/api/characters",
        method: "POST",
        summary: "Create a new character",
        auth: "Required (role: player, admin, or super_admin)",
        requestBody: {
          name: "string (required)",
          age: "number | string (optional)",
          height: "number | string (optional)",
          imageUrl: "string (optional)",
          miniImageUrl: "string (optional)",
          cardImageUrl: "string (optional)",
          additionalInfo: "string (optional)",
          tags: "string[] (optional)",
          stats: "{ strength, agility, intellect, defense, regeneration, magic, other } (optional)",
          customStats: "[{ name: string, value: number }] (optional)",
          connections: "[{ id: string, name?: string, role: string, color?: string }] (optional)",
          tracks: "[{ id, title, url, start, end }] (optional)"
        }
      },
      {
        path: "/api/characters/:id",
        method: "PUT",
        summary: "Full update of a character",
        auth: "Required (owner or admin)",
        parameters: { id: "Character ID" }
      },
      {
        path: "/api/characters/:id",
        method: "PATCH",
        summary: "Partial update of a character",
        auth: "Required (owner or admin)",
        parameters: { id: "Character ID" }
      },
      {
        path: "/api/characters/:id",
        method: "DELETE",
        summary: "Delete a character",
        auth: "Required (owner or admin)",
        parameters: { id: "Character ID" }
      },
      {
        path: "/api/keys",
        method: "GET",
        summary: "List all API keys (masked)",
        auth: "Admin or Super Admin"
      },
      {
        path: "/api/keys",
        method: "POST",
        summary: "Generate a new API key for a bot, service or player",
        auth: "Admin or Super Admin",
        requestBody: {
          name: "string (required, e.g. 'Discord Relay Bot')",
          role: "'super_admin' | 'admin' | 'player' | 'readonly'",
          playerId: "string (optional, bounds key to a specific player)",
          expiresInDays: "number (optional)"
        }
      },
      {
        path: "/api/keys/:keyId",
        method: "DELETE",
        summary: "Revoke an API key",
        auth: "Admin or Super Admin"
      }
    ]
  };
}
function getApiDocumentationHtml() {
  const masterKeyToDisplay = MASTER_ENV_KEY || DEFAULT_BOOTSTRAP_KEY;
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\u0420\u0430\u0437\u043B\u043E\u043C API \u2014 \u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044F \u0438 \u0421\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0d1117;
      --card-bg: #161b22;
      --border: #30363d;
      --text: #c9d1d9;
      --heading: #f0f6fc;
      --accent: #38bdf8;
      --accent-glow: rgba(56, 189, 248, 0.15);
      --get: #238636;
      --post: #1f6feb;
      --put: #d29922;
      --patch: #8957e5;
      --delete: #da3633;
      --code-bg: #090d13;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding: 32px 20px;
    }
    .container { max-width: 1080px; margin: 0 auto; }
    header {
      border-bottom: 1px solid var(--border);
      padding-bottom: 24px;
      margin-bottom: 32px;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      background: var(--accent-glow);
      color: var(--accent);
      border: 1px solid rgba(56, 189, 248, 0.3);
      margin-bottom: 12px;
    }
    h1 {
      color: var(--heading);
      font-size: 32px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
    }
    p.lead { font-size: 16px; color: #8b949e; max-width: 800px; }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
    }
    h2 { color: var(--heading); font-size: 20px; margin-bottom: 16px; font-weight: 700; }
    h3 { color: var(--heading); font-size: 16px; margin: 16px 0 8px; font-weight: 600; }
    code, pre {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
    }
    pre {
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 14px;
      overflow-x: auto;
      color: #79c0ff;
      margin: 10px 0;
    }
    .inline-code {
      background: rgba(110, 118, 129, 0.2);
      padding: 2px 6px;
      border-radius: 4px;
      color: #f0883e;
    }
    .endpoint {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      margin-bottom: 16px;
      overflow: hidden;
    }
    .endpoint-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      background: rgba(255, 255, 255, 0.02);
      border-bottom: 1px solid var(--border);
      flex-wrap: wrap;
    }
    .method {
      padding: 4px 10px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 12px;
      color: #fff;
    }
    .method.GET { background: var(--get); }
    .method.POST { background: var(--post); }
    .method.PUT { background: var(--put); }
    .method.PATCH { background: var(--patch); }
    .method.DELETE { background: var(--delete); }
    .path { font-family: 'JetBrains Mono', monospace; font-weight: 600; color: var(--heading); font-size: 15px; }
    .desc { color: #8b949e; font-size: 14px; margin-left: auto; }
    .endpoint-body { padding: 18px; font-size: 14px; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
    }
    th, td {
      text-align: left;
      padding: 8px 12px;
      border-bottom: 1px solid rgba(48, 54, 61, 0.6);
      font-size: 13px;
    }
    th { color: #8b949e; font-weight: 600; }
    td:first-child { font-family: 'JetBrains Mono', monospace; color: #a5d6ff; }
    .key-box {
      background: rgba(35, 134, 54, 0.1);
      border: 1px solid rgba(35, 134, 54, 0.3);
      padding: 16px;
      border-radius: 8px;
      margin-top: 12px;
    }
    .tabs { display: flex; gap: 8px; margin-bottom: 8px; }
    .tab {
      background: transparent;
      border: 1px solid var(--border);
      color: #8b949e;
      padding: 4px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
    }
    .tab.active { background: var(--border); color: #fff; }
    .btn {
      display: inline-block;
      background: var(--accent);
      color: #0d1117;
      font-weight: 700;
      padding: 8px 16px;
      border-radius: 6px;
      text-decoration: none;
      font-size: 13px;
      margin-top: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="badge">REST API v1.0</div>
      <h1>\u0420\u0430\u0437\u043B\u043E\u043C \u2014 \u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044F API \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0435\u0439</h1>
      <p class="lead">\u041F\u043E\u043B\u043D\u043E\u0446\u0435\u043D\u043D\u044B\u0439 REST API \u0434\u043B\u044F \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430\u043C\u0438, \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430\u043C\u0438, \u0441\u0432\u044F\u0437\u044F\u043C\u0438, \u043C\u0435\u0434\u0438\u0430\u0444\u0430\u0439\u043B\u0430\u043C\u0438 \u0438 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0430\u043C\u0438. \u041F\u0440\u0435\u0434\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D \u0434\u043B\u044F \u0431\u043E\u0442\u043E\u0432 (Discord, Telegram), \u0432\u043D\u0435\u0448\u043D\u0438\u0445 \u0441\u043A\u0440\u0438\u043F\u0442\u043E\u0432, \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0445 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0439 \u0438 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0439.</p>
    </header>

    <!-- AUTHENTICATION SECTION -->
    <div class="card">
      <h2>\u{1F510} \u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u043F\u043E API-\u041A\u043B\u044E\u0447\u0430\u043C</h2>
      <p>\u0414\u043B\u044F \u0432\u0441\u0435\u0445 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u043A API \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043E\u0434\u0438\u043D \u0438\u0437 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0445 \u0441\u043F\u043E\u0441\u043E\u0431\u043E\u0432 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0438 \u0442\u043E\u043A\u0435\u043D\u0430:</p>
      <pre># \u0421\u043F\u043E\u0441\u043E\u0431 1 (\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C\u044B\u0439): HTTP-\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A Authorization Bearer
Authorization: Bearer ${masterKeyToDisplay}

# \u0421\u043F\u043E\u0441\u043E\u0431 2: HTTP-\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A x-api-key
x-api-key: ${masterKeyToDisplay}

# \u0421\u043F\u043E\u0441\u043E\u0431 3: URL-\u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u0437\u0430\u043F\u0440\u043E\u0441\u0430
GET /api/characters?api_key=${masterKeyToDisplay}</pre>

      <div class="key-box">
        <strong style="color: #7ee787;">\u0421\u0442\u0430\u0440\u0442\u043E\u0432\u044B\u0439 Master API Key (Super Admin):</strong>
        <pre style="margin-top: 8px; background: #0d1117;">${masterKeyToDisplay}</pre>
        <span style="font-size: 12px; color: #8b949e;">\u042D\u0442\u043E\u0442 \u043A\u043B\u044E\u0447 \u043E\u0431\u043B\u0430\u0434\u0430\u0435\u0442 \u043F\u043E\u043B\u043D\u044B\u043C\u0438 \u043F\u0440\u0430\u0432\u0430\u043C\u0438 (CRUD \u043D\u0430 \u0432\u0441\u0435\u0445 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0435\u0439 \u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0434\u043E\u0447\u0435\u0440\u043D\u0438\u0445 \u0442\u043E\u043A\u0435\u043D\u043E\u0432). \u0412\u044B \u0442\u0430\u043A\u0436\u0435 \u043C\u043E\u0436\u0435\u0442\u0435 \u0437\u0430\u0434\u0430\u0442\u044C \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043A\u043B\u044E\u0447 \u0447\u0435\u0440\u0435\u0437 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u0443\u044E \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F <span class="inline-code">RAZLOM_API_KEY</span>.</span>
      </div>

      <h3 style="margin-top: 20px;">\u0420\u043E\u043B\u0438 \u0442\u043E\u043A\u0435\u043D\u043E\u0432:</h3>
      <table>
        <tr><th>\u0420\u043E\u043B\u044C</th><th>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u0440\u0430\u0432</th></tr>
        <tr><td>super_admin</td><td>\u041F\u043E\u043B\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F: \u043B\u044E\u0431\u044B\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438, \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 API-\u043A\u043B\u044E\u0447\u0430\u043C\u0438, \u0432\u0441\u0435 \u043F\u043E\u043B\u044F.</td></tr>
        <tr><td>admin</td><td>\u041F\u043E\u043B\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430\u043C: \u0447\u0442\u0435\u043D\u0438\u0435, \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435, \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043B\u044E\u0431\u044B\u0445 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A.</td></tr>
        <tr><td>player</td><td>\u0427\u0442\u0435\u043D\u0438\u0435 \u0431\u0430\u0437\u044B, \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0435\u0439 \u043E\u0442 \u0441\u0432\u043E\u0435\u0433\u043E \u0438\u043C\u0435\u043D\u0438, \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435/\u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0422\u041E\u041B\u042C\u041A\u041E \u0441\u0432\u043E\u0438\u0445 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0435\u0439.</td></tr>
        <tr><td>readonly</td><td>\u0422\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u0435\u043D\u0438\u0435 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0435\u0439 (\u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0438 \u0441\u043A\u0440\u044B\u0442\u044B).</td></tr>
      </table>
    </div>

    <!-- ENDPOINTS SECTION -->
    <h2 style="margin-bottom: 20px;">\u{1F4CC} \u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u042D\u043D\u0434\u043F\u043E\u0438\u043D\u0442\u044B</h2>

    <!-- GET /api/characters -->
    <div class="endpoint">
      <div class="endpoint-header">
        <span class="method GET">GET</span>
        <span class="path">/api/characters</span>
        <span class="desc">\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0435\u0439 \u0441 \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u0435\u0439, \u043F\u0430\u0433\u0438\u043D\u0430\u0446\u0438\u0435\u0439 \u0438 \u043F\u043E\u0438\u0441\u043A\u043E\u043C</span>
      </div>
      <div class="endpoint-body">
        <p>\u0412\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442 \u043F\u043E\u0441\u0442\u0440\u0430\u043D\u0438\u0447\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0435\u0439 \u0441 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u043E\u0439 \u043F\u043E\u0438\u0441\u043A\u0430, \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u0438 \u043F\u043E \u0442\u0435\u0433\u0430\u043C, \u0438\u0433\u0440\u043E\u043A\u0430\u043C, \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0430\u043C \u0438 \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438.</p>
        
        <h3>\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0437\u0430\u043F\u0440\u043E\u0441\u0430 (Query Params):</h3>
        <table>
          <tr><th>\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440</th><th>\u0422\u0438\u043F</th><th>\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</th></tr>
          <tr><td>page</td><td>integer</td><td>\u041D\u043E\u043C\u0435\u0440 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B (\u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E 1)</td></tr>
          <tr><td>limit</td><td>integer</td><td>\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 (1-100, \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E 20)</td></tr>
          <tr><td>search, q</td><td>string</td><td>\u041F\u043E\u0438\u0441\u043A \u0431\u0435\u0437 \u0443\u0447\u0435\u0442\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430 \u043F\u043E \u0438\u043C\u0435\u043D\u0438, \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044E, \u0442\u0435\u0433\u0430\u043C, \u043F\u0441\u0435\u0432\u0434\u043E\u043D\u0438\u043C\u0430\u043C</td></tr>
          <tr><td>tag, tags</td><td>string</td><td>\u0424\u0438\u043B\u044C\u0442\u0440 \u043F\u043E \u0442\u0435\u0433\u0443 \u0438\u043B\u0438 \u0442\u0435\u0433\u0430\u043C \u0447\u0435\u0440\u0435\u0437 \u0437\u0430\u043F\u044F\u0442\u0443\u044E (\u043D\u0430\u043F\u0440. <span class="inline-code">\u041C\u0430\u0433,\u0412\u043E\u0438\u043D</span>)</td></tr>
          <tr><td>playerId</td><td>string</td><td>\u0424\u0438\u043B\u044C\u0442\u0440 \u043F\u043E ID \u0438\u0433\u0440\u043E\u043A\u0430 (\u0438\u043B\u0438 <span class="inline-code">unassigned</span> \u0434\u043B\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0435\u0439 \u0431\u0435\u0437 \u0432\u043B\u0430\u0434\u0435\u043B\u044C\u0446\u0430)</td></tr>
          <tr><td>isDraft</td><td>string</td><td><span class="inline-code">false</span> (\u043F\u043E \u0443\u043C\u043E\u043B\u0447.), <span class="inline-code">true</span> (\u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0438), <span class="inline-code">all</span></td></tr>
          <tr><td>minAge, maxAge</td><td>number</td><td>\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0430</td></tr>
          <tr><td>minHeight, maxHeight</td><td>number</td><td>\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D \u0440\u043E\u0441\u0442\u0430</td></tr>
          <tr><td>hasMusic</td><td>boolean</td><td>\u041D\u0430\u043B\u0438\u0447\u0438\u0435 \u0441\u0430\u0443\u043D\u0434\u0442\u0440\u0435\u043A\u0430/\u043C\u0443\u0437\u044B\u043A\u0438 (<span class="inline-code">true</span> / <span class="inline-code">false</span>)</td></tr>
          <tr><td>hasCard</td><td>boolean</td><td>\u041D\u0430\u043B\u0438\u0447\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A \u043A\u0430\u0440\u0442\u043E\u0447\u043D\u043E\u0439 \u0438\u0433\u0440\u044B (<span class="inline-code">true</span> / <span class="inline-code">false</span>)</td></tr>
          <tr><td>hasConnections</td><td>boolean</td><td>\u041D\u0430\u043B\u0438\u0447\u0438\u0435 \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0445 \u0441\u0432\u044F\u0437\u0435\u0439 (<span class="inline-code">true</span> / <span class="inline-code">false</span>)</td></tr>
          <tr><td>sortBy</td><td>string</td><td><span class="inline-code">name</span>, <span class="inline-code">createdAt</span>, <span class="inline-code">age</span>, <span class="inline-code">height</span>, <span class="inline-code">discordPostCount</span></td></tr>
          <tr><td>order</td><td>string</td><td><span class="inline-code">asc</span> (\u043F\u043E \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0430\u043D\u0438\u044E) \u0438\u043B\u0438 <span class="inline-code">desc</span> (\u043F\u043E \u0443\u0431\u044B\u0432\u0430\u043D\u0438\u044E)</td></tr>
          <tr><td>format</td><td>string</td><td><span class="inline-code">standard</span>, <span class="inline-code">detailed</span> \u0438\u043B\u0438 <span class="inline-code">compact</span></td></tr>
        </table>

        <h3>\u041F\u0440\u0438\u043C\u0435\u0440 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 (cURL):</h3>
        <pre>curl -X GET "http://localhost:3000/api/characters?search=\u0421\u0430\u043D\u0441&limit=5&format=detailed" \\
  -H "Authorization: Bearer ${masterKeyToDisplay}"</pre>

        <h3>\u041F\u0440\u0438\u043C\u0435\u0440 \u043E\u0442\u0432\u0435\u0442\u0430:</h3>
        <pre>{
  "success": true,
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 5,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  },
  "items": [
    {
      "id": "1767370435542",
      "name": "Re:Sans",
      "age": 25,
      "height": 175,
      "stats": { ... },
      "connections": [ ... ],
      "media": { ... }
    }
  ]
}</pre>
      </div>
    </div>

    <!-- GET /api/characters/:id -->
    <div class="endpoint">
      <div class="endpoint-header">
        <span class="method GET">GET</span>
        <span class="path">/api/characters/:id</span>
        <span class="desc">\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0435 (\u0441\u0442\u0430\u0442\u044B, \u0441\u0432\u044F\u0437\u0438, \u043C\u0435\u0434\u0438\u0430)</span>
      </div>
      <div class="endpoint-body">
        <p>\u0412\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442 \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u044B\u0435 \u0440\u0430\u0437\u043E\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043E \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E\u043C \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0435: \u0431\u0430\u0437\u043E\u0432\u044B\u0435 \u0438 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0441 \u0443\u0447\u0435\u0442\u043E\u043C \u0420\u0435\u0437\u043E\u043D\u0430\u043D\u0441\u0430 \u0414\u0443\u0448\u0438, \u0441\u043F\u0438\u0441\u043E\u043A \u0441\u0432\u044F\u0437\u0435\u0439 \u0441 \u0430\u0432\u0430\u0442\u0430\u0440\u043A\u0430\u043C\u0438 \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0445 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0435\u0439, \u0430\u0443\u0434\u0438\u043E-\u0442\u0440\u0435\u043A\u0438, \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0438 \u0433\u0430\u043B\u0435\u0440\u0435\u044E.</p>
        
        <h3>\u041F\u0440\u0438\u043C\u0435\u0440 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 (JavaScript Fetch):</h3>
        <pre>const res = await fetch("http://localhost:3000/api/characters/1767370435542", {
  headers: { "Authorization": "Bearer ${masterKeyToDisplay}" }
});
const data = await res.json();
console.log(data.details.stats.effectiveRadar);
console.log(data.details.connections);
console.log(data.details.media.audio);</pre>

        <h3>\u041F\u0440\u0438\u043C\u0435\u0440 \u043E\u0442\u0432\u0435\u0442\u0430 (\u0441\u0435\u043A\u0446\u0438\u0438):</h3>
        <pre>{
  "success": true,
  "character": { ... },
  "details": {
    "id": "1767370435542",
    "name": "Re:Sans",
    "stats": {
      "radar": { "strength": 8, "agility": 9, "intellect": 4, "defense": 2, "regeneration": 10, "magic": 6, "other": 8 },
      "effectiveRadar": { "strength": 12, "agility": 13.5, ... },
      "soulResonanceMultiplier": 1.5,
      "customStats": []
    },
    "connections": [
      {
        "targetId": "1767370516144",
        "targetName": "\u0410\u0439\u0440\u0438\u0441 \u042F\u043D\u0433",
        "role": "\u041F\u0440\u0438\u044F\u0442\u043D\u043E \u0441 \u043D\u0435\u0439 \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C",
        "color": "#bc7d10",
        "targetAvatar": "https://..."
      }
    ],
    "media": {
      "avatar": { "imageUrl": "https://...", "scale": 1, "x": 50, "y": 50 },
      "cardBackground": { "url": "...", "color": "#000000" },
      "gallery": [],
      "audio": { "primaryMusicUrl": "...", "tracks": [] }
    }
  }
}</pre>
      </div>
    </div>

    <!-- POST /api/characters -->
    <div class="endpoint">
      <div class="endpoint-header">
        <span class="method POST">POST</span>
        <span class="path">/api/characters</span>
        <span class="desc">\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0433\u043E \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430 (CRUD)</span>
      </div>
      <div class="endpoint-body">
        <p>\u0421\u043E\u0437\u0434\u0430\u0435\u0442 \u043D\u043E\u0432\u043E\u0433\u043E \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430 \u0432 \u0431\u0430\u0437\u0435 \u0434\u0430\u043D\u043D\u044B\u0445. \u0422\u0440\u0435\u0431\u0443\u0435\u0442 \u0442\u043E\u043A\u0435\u043D \u0441 \u043F\u0440\u0430\u0432\u0430\u043C\u0438 <span class="inline-code">player</span>, <span class="inline-code">admin</span> \u0438\u043B\u0438 <span class="inline-code">super_admin</span>.</p>
        
        <h3>\u0422\u0435\u043B\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0430 (JSON):</h3>
        <pre>{
  "name": "\u041D\u043E\u0432\u044B\u0439 \u0413\u0435\u0440\u043E\u0439",
  "age": 28,
  "height": 182,
  "imageUrl": "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600",
  "additionalInfo": "\u041A\u0440\u0430\u0442\u043A\u0430\u044F \u0431\u0438\u043E\u0433\u0440\u0430\u0444\u0438\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430...",
  "tags": ["\u041C\u0430\u0433", "\u041E\u0440\u0434\u0435\u043D"],
  "stats": {
    "strength": 7,
    "agility": 8,
    "intellect": 9,
    "defense": 5,
    "regeneration": 6,
    "magic": 10,
    "other": 4
  },
  "connections": [
    { "id": "1767370435542", "role": "\u041D\u0430\u0441\u0442\u0430\u0432\u043D\u0438\u043A", "color": "#38bdf8" }
  ]
}</pre>

        <h3>\u041F\u0440\u0438\u043C\u0435\u0440 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 (Python):</h3>
        <pre>import requests

url = "http://localhost:3000/api/characters"
headers = {
    "Authorization": "Bearer ${masterKeyToDisplay}",
    "Content-Type": "application/json"
}
payload = {
    "name": "\u0410\u0441\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u0421\u0442\u0440\u0430\u043D\u043D\u0438\u043A",
    "age": 120,
    "tags": ["\u0421\u0442\u0440\u0430\u043D\u043D\u0438\u043A", "\u041A\u043E\u0441\u043C\u043E\u0441"]
}
response = requests.post(url, json=payload, headers=headers)
print(response.json())</pre>
      </div>
    </div>

    <!-- PUT & PATCH /api/characters/:id -->
    <div class="endpoint">
      <div class="endpoint-header">
        <span class="method PUT">PUT</span>
        <span class="method PATCH">PATCH</span>
        <span class="path">/api/characters/:id</span>
        <span class="desc">\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430 (\u043F\u043E\u043B\u043D\u043E\u0435 \u0438\u043B\u0438 \u0447\u0430\u0441\u0442\u0438\u0447\u043D\u043E\u0435)</span>
      </div>
      <div class="endpoint-body">
        <p>\u041F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430. <span class="inline-code">PATCH</span> \u043E\u0431\u044A\u0435\u0434\u0438\u043D\u044F\u0435\u0442 \u043F\u0435\u0440\u0435\u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E\u043B\u044F \u0441 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u043C\u0438, \u0430 <span class="inline-code">PUT</span> \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442 \u043F\u043E\u043B\u043D\u0443\u044E \u0437\u0430\u043C\u0435\u043D\u0443 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u043D\u044B\u0445 \u043F\u043E\u043B\u0435\u0439. \u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u043B\u0430\u0434\u0435\u043B\u044C\u0446\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430 \u0438\u043B\u0438 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0443.</p>
        
        <h3>\u041F\u0440\u0438\u043C\u0435\u0440 \u0447\u0430\u0441\u0442\u0438\u0447\u043D\u043E\u0433\u043E \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F (PATCH):</h3>
        <pre>curl -X PATCH "http://localhost:3000/api/characters/1767370435542" \\
  -H "Authorization: Bearer ${masterKeyToDisplay}" \\
  -H "Content-Type: application/json" \\
  -d '{"additionalInfo": "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430", "tags": ["\u042D\u043B\u0438\u0442\u0430", "\u0411\u043E\u0441\u0441"]}'</pre>
      </div>
    </div>

    <!-- DELETE /api/characters/:id -->
    <div class="endpoint">
      <div class="endpoint-header">
        <span class="method DELETE">DELETE</span>
        <span class="path">/api/characters/:id</span>
        <span class="desc">\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430</span>
      </div>
      <div class="endpoint-body">
        <p>\u0423\u0434\u0430\u043B\u044F\u0435\u0442 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430 \u0438\u0437 \u0431\u0430\u0437\u044B \u0434\u0430\u043D\u043D\u044B\u0445. \u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u043B\u0430\u0434\u0435\u043B\u044C\u0446\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430 \u0438\u043B\u0438 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0443.</p>
        <pre>curl -X DELETE "http://localhost:3000/api/characters/char_12345" \\
  -H "Authorization: Bearer ${masterKeyToDisplay}"</pre>
      </div>
    </div>

    <!-- KEY MANAGEMENT -->
    <div class="endpoint">
      <div class="endpoint-header">
        <span class="method POST">POST</span>
        <span class="method GET">GET</span>
        <span class="method DELETE">DELETE</span>
        <span class="path">/api/keys</span>
        <span class="desc">\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 API-\u043A\u043B\u044E\u0447\u0430\u043C\u0438 (\u0434\u043B\u044F \u0431\u043E\u0442\u043E\u0432 \u0438 \u0441\u043A\u0440\u0438\u043F\u0442\u043E\u0432)</span>
      </div>
      <div class="endpoint-body">
        <p>\u041F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430\u043C \u0432\u044B\u043F\u0443\u0441\u043A\u0430\u0442\u044C \u0442\u043E\u043A\u0435\u043D\u044B \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u0434\u043B\u044F \u0431\u043E\u0442\u043E\u0432, \u0441\u043A\u0440\u0438\u043F\u0442\u043E\u0432 \u0438 \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0445 \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0439.</p>
        
        <h3>\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u0442\u043E\u043A\u0435\u043D:</h3>
        <pre>curl -X POST "http://localhost:3000/api/keys" \\
  -H "Authorization: Bearer ${masterKeyToDisplay}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Discord Bot Relay",
    "role": "player",
    "playerId": "discord_bot_01"
  }'</pre>
      </div>
    </div>

    <div style="text-align: center; margin-top: 32px; color: #8b949e; font-size: 13px;">
      \u0420\u0430\u0437\u043B\u043E\u043C API &bull; JSON \u0421\u043F\u0435\u0446\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430 \u043F\u043E \u0430\u0434\u0440\u0435\u0441\u0443 <a href="/api/docs/json" style="color: var(--accent);">/api/docs/json</a>
    </div>
  </div>
</body>
</html>`;
}

// server.ts
async function startServer() {
  const app = (0, import_express2.default)();
  const httpServer = (0, import_http.createServer)(app);
  const io = new import_socket.Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  const PORT = 3e3;
  const games = /* @__PURE__ */ new Map();
  const socketMetadata = /* @__PURE__ */ new Map();
  const GAME_TIMEOUT_MS = 5 * 60 * 1e3;
  const matchmakingQueue = [];
  const getEnrichedGamesList = () => {
    const now = Date.now();
    const validGames = [];
    for (const [gameId, game] of games.entries()) {
      if (game.status === "waiting" && now - (game.createdAt || 0) > GAME_TIMEOUT_MS) {
        games.delete(gameId);
        continue;
      }
      validGames.push(game);
    }
    return validGames.map((game) => {
      const room = io.sockets.adapter.rooms.get(game.id);
      const onlineCount = room ? room.size : 0;
      const onlineNames = [];
      if (room) {
        for (const socketId of room) {
          const meta = socketMetadata.get(socketId);
          if (meta && meta.userName) {
            onlineNames.push(meta.userName);
          }
        }
      }
      let enrichedGame = {
        ...game,
        onlineCount,
        onlineNames: [...new Set(onlineNames)],
        guestId: game.guestId || "",
        guestName: game.guestName || "",
        guestAvatar: game.guestAvatar || "",
        hostId: game.hostId || "",
        hostName: game.hostName || "",
        hostAvatar: game.hostAvatar || "",
        status: game.status || "waiting"
      };
      if (game.state?.player2?.uid && !game.guestId) {
        enrichedGame.guestId = game.state.player2.uid;
      }
      return enrichedGame;
    });
  };
  const broadcastGamesList = () => {
    try {
      const enrichedList = getEnrichedGamesList();
      io.sockets.emit("games_list", enrichedList);
    } catch (e) {
      console.error(`[\u2717 Server] Error broadcasting games list:`, e.message);
    }
  };
  io.on("connection", (socket) => {
    socket.on("get_games_list", () => {
      try {
        const list = getEnrichedGamesList();
        socket.emit("games_list", list);
      } catch (e) {
        console.error(`[\u2717 Server] Error sending games list:`, e.message);
      }
    });
    socket.on("get_game", (sessionId) => {
      try {
        const game = games.get(sessionId);
        if (game) {
          socket.emit("game_sync", game);
        } else {
          socket.emit("game_sync", null);
        }
      } catch (e) {
        console.error(`[\u2717 Server] Error getting game ${sessionId}:`, e.message);
      }
    });
    socket.on("create_game", (session) => {
      try {
        if (!session || !session.id) return;
        session.createdAt = Date.now();
        games.set(session.id, session);
        socketMetadata.set(socket.id, { userId: session.hostId, userName: session.hostName, sessionId: session.id });
        socket.join(session.id);
        broadcastGamesList();
        socket.emit("game_sync", session);
      } catch (e) {
        console.error(`[\u2717 Server] Error creating game:`, e.message);
      }
    });
    socket.on("join_game", ({ sessionId, updates }) => {
      try {
        const game = games.get(sessionId);
        if (!game) {
          socket.emit("error", { message: "Game not found" });
          return;
        }
        if (updates) {
          if (updates.state) {
            const mergedState = { ...game.state };
            if (updates.state.player1) mergedState.player1 = { ...mergedState.player1, ...updates.state.player1 };
            if (updates.state.player2) mergedState.player2 = { ...mergedState.player2, ...updates.state.player2 };
            updates.state = mergedState;
          }
          Object.assign(game, updates);
          games.set(sessionId, game);
        }
        socketMetadata.set(socket.id, {
          userId: updates?.guestId || game.guestId || "spectator",
          userName: updates?.guestName || game.guestName || "\u041D\u0430\u0431\u043B\u044E\u0434\u0430\u0442\u0435\u043B\u044C",
          sessionId
        });
        socket.join(sessionId);
        io.to(sessionId).emit("game_sync", game);
        broadcastGamesList();
      } catch (e) {
        console.error(`[\u2717 Server] Error joining game:`, e.message);
      }
    });
    socket.on("rejoin_game", (data) => {
      try {
        const sessionId = typeof data === "string" ? data : data?.sessionId;
        const userData = typeof data === "object" ? data?.userData : null;
        const game = games.get(sessionId);
        if (!game) return;
        socket.join(sessionId);
        if (userData) {
          socketMetadata.set(socket.id, {
            userId: userData.userId,
            userName: userData.userName,
            sessionId
          });
        }
        socket.emit("game_sync", game);
        broadcastGamesList();
      } catch (e) {
        console.error(`[\u2717 Server] Error rejoining game:`, e.message);
      }
    });
    socket.on("update_game", ({ sessionId, updates }) => {
      try {
        const game = games.get(sessionId);
        if (!game) return;
        if (updates.state) {
          const mergedState = { ...game.state };
          if (updates.state.player1) mergedState.player1 = { ...mergedState.player1, ...updates.state.player1 };
          if (updates.state.player2) mergedState.player2 = { ...mergedState.player2, ...updates.state.player2 };
          game.state = mergedState;
        }
        if (updates.currentTurnId !== void 0) game.currentTurnId = updates.currentTurnId;
        if (updates.lastAction) game.lastAction = updates.lastAction;
        if (updates.status) game.status = updates.status;
        if (updates.winnerId) game.winnerId = updates.winnerId;
        const bothPlayersDone = game.state?.player1?.mulliganDone && game.state?.player2?.mulliganDone;
        if (bothPlayersDone && (!game.lastAction || game.lastAction.type !== "game_start")) {
          game.currentTurnId = game.state.player1.uid;
          game.lastAction = { type: "game_start", timestamp: Date.now() };
        }
        games.set(sessionId, game);
        io.to(sessionId).emit("game_sync", game);
        broadcastGamesList();
      } catch (e) {
        console.error(`[\u2717 Server] Error updating game ${sessionId}:`, e.message);
      }
    });
    socket.on("delete_game", (sessionId) => {
      try {
        if (games.has(sessionId)) {
          games.delete(sessionId);
          broadcastGamesList();
          io.in(sessionId).socketsLeave(sessionId);
        }
      } catch (e) {
        console.error(`[\u2717 Server] Error deleting game:`, e.message);
      }
    });
    socket.on("join_matchmaking", (userData) => {
      try {
        if (!userData || !userData.userId) return;
        const existingIndex = matchmakingQueue.findIndex((p) => p.userId === userData.userId);
        if (existingIndex >= 0) {
          matchmakingQueue[existingIndex] = { ...userData, socketId: socket.id };
        } else {
          matchmakingQueue.push({ ...userData, socketId: socket.id });
        }
        io.emit("matchmaking_count", matchmakingQueue.length);
        if (matchmakingQueue.length >= 2) {
          const player1 = matchmakingQueue.shift();
          const player2 = matchmakingQueue.shift();
          const gameId = Math.random().toString(36).substr(2, 9);
          const newGame = {
            id: gameId,
            status: "waiting",
            hostId: player1.userId,
            hostName: player1.userName,
            hostAvatar: player1.userAvatar || "",
            guestId: player2.userId,
            guestName: player2.userName,
            guestAvatar: player2.userAvatar || "",
            currentTurnId: player1.userId,
            createdAt: Date.now(),
            state: {
              player1: { uid: player1.userId, health: 30, mana: { current: 1, max: 1 }, hand: [], board: [], deck: [], fatigue: 0, mulliganDone: false },
              player2: { uid: player2.userId, health: 30, mana: { current: 0, max: 0 }, hand: [], board: [], deck: [], fatigue: 0, mulliganDone: false }
            }
          };
          games.set(gameId, newGame);
          io.to(player1.socketId).emit("match_found", newGame);
          io.to(player2.socketId).emit("match_found", newGame);
          io.emit("matchmaking_count", matchmakingQueue.length);
          broadcastGamesList();
        }
      } catch (e) {
        console.error(`[\u2717 Server] Error in join_matchmaking:`, e.message);
      }
    });
    socket.on("leave_matchmaking", () => {
      try {
        const index = matchmakingQueue.findIndex((p) => p.socketId === socket.id);
        if (index >= 0) {
          matchmakingQueue.splice(index, 1);
          io.emit("matchmaking_count", matchmakingQueue.length);
        }
      } catch (e) {
        console.error(`[\u2717 Server] Error in leave_matchmaking:`, e.message);
      }
    });
    socket.on("get_matchmaking_count", () => {
      socket.emit("matchmaking_count", matchmakingQueue.length);
    });
    socket.on("disconnect", (reason) => {
      try {
        const meta = socketMetadata.get(socket.id);
        const index = matchmakingQueue.findIndex((p) => p.socketId === socket.id);
        if (index >= 0) {
          matchmakingQueue.splice(index, 1);
          io.emit("matchmaking_count", matchmakingQueue.length);
        }
        if (meta) {
          socketMetadata.delete(socket.id);
          broadcastGamesList();
        }
      } catch (e) {
        console.error(`[\u2717 Server] Error on disconnect:`, e.message);
      }
    });
    socket.on("error", (err) => {
      console.error(`[\u2717 Server] Socket error for ${socket.id}:`, err);
    });
  });
  app.use((0, import_cors.default)());
  app.use(import_express2.default.json({ limit: "50mb" }));
  app.use(import_express2.default.text({ type: ["text/*", "application/text", "text/plain"], limit: "10mb" }));
  app.use(import_express2.default.urlencoded({ extended: true, limit: "50mb" }));
  app.use((req, res, next) => {
    if (req.url.startsWith("/.proxy/")) {
      req.url = req.url.substring(7);
    } else if (req.url === "/.proxy") {
      req.url = "/";
    }
    if (req.url.startsWith("/raz/api/")) {
      req.url = req.url.substring(4);
    }
    next();
  });
  app.use("/vendor", import_express2.default.static(import_path.default.join(process.cwd(), "public", "vendor")));
  app.use("/api", createCharacterApiRouter(io));
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
  app.get("/api/proxy-image", async (req, res) => {
    try {
      const rawUrl = req.query.url;
      if (!rawUrl || !rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
        return res.status(400).send("Invalid URL");
      }
      const response = await fetch(rawUrl);
      if (!response.ok) {
        return res.status(response.status).send("Failed to fetch upstream image");
      }
      const contentType = response.headers.get("content-type") || "image/png";
      const arrayBuffer = await response.arrayBuffer();
      res.setHeader("Content-Type", contentType);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.send(Buffer.from(arrayBuffer));
    } catch (e) {
      res.status(500).send(e.message || "Proxy error");
    }
  });
  app.get("/api/character-avatar/:characterId", async (req, res) => {
    try {
      const { characterId } = req.params;
      const allChars = await getCachedCharacters();
      const char = allChars.find((c) => c.id === characterId) || findCharacterByName(allChars, characterId);
      if (!char) {
        return res.status(404).send("Character not found");
      }
      const hasMini = Boolean(char.miniImageUrl && char.miniImageUrl.trim() !== "");
      const rawUrl = (hasMini ? char.miniImageUrl : char.imageUrl) || char.cardImageUrl || char.avatarUrl;
      if (!rawUrl) {
        return res.status(404).send("Character has no image");
      }
      const scale = (hasMini ? char.miniImageScale : char.miniImageScale ?? char.imageScale) ?? 1;
      const xPercent = (hasMini ? char.miniImageX : char.miniImageX ?? char.imageX) ?? 50;
      const yPercent = (hasMini ? char.miniImageY : char.miniImageY ?? char.imageY) ?? 50;
      const buffer = await generateCroppedAvatarBuffer(rawUrl, scale, xPercent, yPercent, 512);
      if (!buffer) {
        if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
          return res.redirect(rawUrl);
        }
        return res.status(500).send("Failed to generate avatar");
      }
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.send(buffer);
    } catch (err) {
      res.status(500).send(err.message || "Avatar generation error");
    }
  });
  async function uploadAvatarBufferToPublicHost(buffer) {
    if (!buffer || buffer.length === 0) return null;
    try {
      const fd = new FormData();
      fd.append("files[]", new Blob([buffer], { type: "image/png" }), "discord_avatar.png");
      const res = await fetch("https://uguu.se/upload", {
        method: "POST",
        body: fd,
        signal: AbortSignal.timeout(6e3)
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.success && data?.files?.[0]?.url) {
          return data.files[0].url;
        }
      }
    } catch (e) {
      console.warn("Uguu avatar upload failed:", e.message);
    }
    try {
      const fd = new FormData();
      fd.append("reqtype", "fileupload");
      fd.append("time", "72h");
      fd.append("fileToUpload", new Blob([buffer], { type: "image/png" }), "discord_avatar.png");
      const res = await fetch("https://litterbox.catbox.moe/resources/internals/api.php", {
        method: "POST",
        body: fd,
        signal: AbortSignal.timeout(6e3)
      });
      if (res.ok) {
        const text = await res.text();
        if (text && text.startsWith("http")) return text.trim();
      }
    } catch (e) {
      console.warn("Litterbox avatar upload failed:", e.message);
    }
    try {
      const fd = new FormData();
      fd.append("reqtype", "fileupload");
      fd.append("fileToUpload", new Blob([buffer], { type: "image/png" }), "avatar.png");
      const res = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: fd,
        signal: AbortSignal.timeout(6e3)
      });
      if (res.ok) {
        const text = await res.text();
        if (text && text.startsWith("http")) return text.trim();
      }
    } catch (e) {
      console.warn("Catbox avatar upload failed:", e.message);
    }
    try {
      const fd = new FormData();
      fd.append("files[]", new Blob([buffer], { type: "image/png" }), "discord_avatar.png");
      const res = await fetch("https://qu.ax/upload", {
        method: "POST",
        body: fd,
        signal: AbortSignal.timeout(6e3)
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.success && data?.files?.[0]?.url) {
          return data.files[0].url;
        }
      }
    } catch (e) {
      console.warn("qu.ax avatar upload failed:", e.message);
    }
    try {
      const fd = new FormData();
      fd.append("file", new Blob([buffer], { type: "image/png" }), "discord_avatar.png");
      const res = await fetch("https://tmpfiles.org/api/v1/upload", {
        method: "POST",
        body: fd,
        signal: AbortSignal.timeout(6e3)
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.status === "success" && data?.data?.url) {
          return data.data.url.replace("tmpfiles.org/", "tmpfiles.org/dl/");
        }
      }
    } catch (e) {
      console.warn("tmpfiles avatar upload failed:", e.message);
    }
    return null;
  }
  async function generateCroppedAvatarBuffer(imageUrl, scale = 1, xPercent = 50, yPercent = 50, targetWidth = 512, targetHeight = 512) {
    if (!imageUrl) return null;
    try {
      let imageBuffer;
      if (imageUrl.startsWith("data:image/")) {
        const match = imageUrl.match(/^data:image\/[a-zA-Z0-9+.-]+;base64,(.+)$/);
        if (!match) return null;
        imageBuffer = Buffer.from(match[1], "base64");
      } else {
        const resp = await fetch(imageUrl, { signal: AbortSignal.timeout(8e3) });
        if (!resp.ok) return null;
        imageBuffer = Buffer.from(await resp.arrayBuffer());
      }
      const meta = await (0, import_sharp.default)(imageBuffer).metadata();
      const imgW = meta.width || targetWidth;
      const imgH = meta.height || targetHeight;
      const sCover = Math.max(targetWidth / imgW, targetHeight / imgH);
      const cw = imgW * sCover;
      const ch = imgH * sCover;
      const baseLeft = (targetWidth - cw) * (xPercent / 100);
      const baseTop = (targetHeight - ch) * (yPercent / 100);
      const ox = targetWidth * (xPercent / 100);
      const oy = targetHeight * (yPercent / 100);
      const effectiveScale = Math.max(scale, 0.05);
      const finalLeft = ox + (baseLeft - ox) * effectiveScale;
      const finalTop = oy + (baseTop - oy) * effectiveScale;
      const finalWidth = Math.max(1, Math.round(cw * effectiveScale));
      const finalHeight = Math.max(1, Math.round(ch * effectiveScale));
      const resizedBuffer = await (0, import_sharp.default)(imageBuffer).resize(finalWidth, finalHeight, { fit: "fill" }).png().toBuffer();
      const srcX1 = Math.max(0, -finalLeft);
      const srcY1 = Math.max(0, -finalTop);
      const srcX2 = Math.min(finalWidth, targetWidth - finalLeft);
      const srcY2 = Math.min(finalHeight, targetHeight - finalTop);
      const extractW = Math.max(1, Math.round(srcX2 - srcX1));
      const extractH = Math.max(1, Math.round(srcY2 - srcY1));
      const extractLeft = Math.max(0, Math.min(Math.round(srcX1), finalWidth - extractW));
      const extractTop = Math.max(0, Math.min(Math.round(srcY1), finalHeight - extractH));
      const dstLeft = Math.max(0, Math.round(finalLeft));
      const dstTop = Math.max(0, Math.round(finalTop));
      const slice = await (0, import_sharp.default)(resizedBuffer).extract({
        left: extractLeft,
        top: extractTop,
        width: Math.min(extractW, finalWidth - extractLeft),
        height: Math.min(extractH, finalHeight - extractTop)
      }).toBuffer();
      const croppedBuffer = await (0, import_sharp.default)({
        create: {
          width: targetWidth,
          height: targetHeight,
          channels: 4,
          background: { r: 24, g: 24, b: 27, alpha: 1 }
        }
      }).composite([{
        input: slice,
        left: dstLeft,
        top: dstTop
      }]).png({ quality: 95 }).toBuffer();
      return croppedBuffer;
    } catch (e) {
      console.warn("Avatar sharp cropping failed:", e.message);
      return null;
    }
  }
  let cachedCharacters = [];
  let lastCharactersFetchTime2 = 0;
  const CHARACTERS_CACHE_TTL2 = 3e4;
  const avatarUrlCache = /* @__PURE__ */ new Map();
  async function getCachedCharacters() {
    const now = Date.now();
    if (cachedCharacters.length > 0 && now - lastCharactersFetchTime2 < CHARACTERS_CACHE_TTL2) {
      return cachedCharacters;
    }
    try {
      const res = await fetch("https://razlom-db061-default-rtdb.firebaseio.com/rooms/global_chronicles_main/characters.json");
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === "object") {
          cachedCharacters = Object.values(data).map((c) => ({
            id: c.id,
            name: c.name || "",
            imageUrl: c.imageUrl || c.avatarUrl || "",
            miniImageUrl: c.miniImageUrl || "",
            cardImageUrl: c.cardImageUrl || "",
            avatarUrl: c.avatarUrl || c.imageUrl || "",
            cardColor: c.cardColor || "",
            tags: Array.isArray(c.tags) ? c.tags : [],
            isDraft: Boolean(c.isDraft),
            aliases: Array.isArray(c.aliases) ? c.aliases : [],
            imageScale: typeof c.imageScale === "number" ? c.imageScale : 1,
            imageX: typeof c.imageX === "number" ? c.imageX : 50,
            imageY: typeof c.imageY === "number" ? c.imageY : 50,
            miniImageScale: typeof c.miniImageScale === "number" ? c.miniImageScale : typeof c.imageScale === "number" ? c.imageScale : 1,
            miniImageX: typeof c.miniImageX === "number" ? c.miniImageX : typeof c.imageX === "number" ? c.imageX : 50,
            miniImageY: typeof c.miniImageY === "number" ? c.miniImageY : typeof c.imageY === "number" ? c.imageY : 50,
            cardImageScale: typeof c.cardImageScale === "number" ? c.cardImageScale : 1,
            cardImageX: typeof c.cardImageX === "number" ? c.cardImageX : 50,
            cardImageY: typeof c.cardImageY === "number" ? c.cardImageY : 50
          }));
          lastCharactersFetchTime2 = now;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch characters from RTDB for webhook relay:", e.message);
    }
    return cachedCharacters;
  }
  async function getEffectiveAvatarUrlForCharacter(char) {
    if (!char) return void 0;
    const hasMini = Boolean(char.miniImageUrl && char.miniImageUrl.trim() !== "");
    const preferredUrl = (hasMini ? char.miniImageUrl : char.imageUrl) || char.cardImageUrl || char.avatarUrl;
    if (!preferredUrl) return void 0;
    const scale = (hasMini ? char.miniImageScale : char.miniImageScale ?? char.imageScale) ?? 1;
    const xPercent = (hasMini ? char.miniImageX : char.miniImageX ?? char.imageX) ?? 50;
    const yPercent = (hasMini ? char.miniImageY : char.miniImageY ?? char.imageY) ?? 50;
    if (scale === 1 && xPercent === 50 && yPercent === 50 && (preferredUrl.startsWith("http://") || preferredUrl.startsWith("https://"))) {
      return preferredUrl;
    }
    const cacheKey = `${char.id}_${preferredUrl}_${scale}_${xPercent}_${yPercent}`;
    if (avatarUrlCache.has(cacheKey)) {
      return avatarUrlCache.get(cacheKey);
    }
    try {
      const croppedBuf = await generateCroppedAvatarBuffer(preferredUrl, scale, xPercent, yPercent, 512);
      if (croppedBuf) {
        const uploaded = await uploadAvatarBufferToPublicHost(croppedBuf);
        if (uploaded) {
          avatarUrlCache.set(cacheKey, uploaded);
          return uploaded;
        }
      }
    } catch (err) {
      console.warn("Failed to generate cropped avatar URL for character:", char.name, err.message);
    }
    return preferredUrl.startsWith("http://") || preferredUrl.startsWith("https://") ? preferredUrl : void 0;
  }
  async function generateMultiAvatarBuffer(characters, targetSize = 512) {
    if (!characters || characters.length === 0) return null;
    if (characters.length === 1) {
      const c = characters[0];
      const hasMini = Boolean(c.miniImageUrl && c.miniImageUrl.trim() !== "");
      const rawUrl = (hasMini ? c.miniImageUrl : c.imageUrl) || c.cardImageUrl || c.avatarUrl;
      const scale = (hasMini ? c.miniImageScale : c.miniImageScale ?? c.imageScale) ?? 1;
      const x = (hasMini ? c.miniImageX : c.miniImageX ?? c.imageX) ?? 50;
      const y = (hasMini ? c.miniImageY : c.miniImageY ?? c.imageY) ?? 50;
      return generateCroppedAvatarBuffer(rawUrl, scale, x, y, targetSize, targetSize);
    }
    const count = characters.length;
    const composites = [];
    const getCharCrop = async (c, w, h) => {
      const hasMini = Boolean(c.miniImageUrl && c.miniImageUrl.trim() !== "");
      const rawUrl = (hasMini ? c.miniImageUrl : c.imageUrl) || c.cardImageUrl || c.avatarUrl;
      const scale = (hasMini ? c.miniImageScale : c.miniImageScale ?? c.imageScale) ?? 1;
      const x = (hasMini ? c.miniImageX : c.miniImageX ?? c.imageX) ?? 50;
      const y = (hasMini ? c.miniImageY : c.miniImageY ?? c.imageY) ?? 50;
      return generateCroppedAvatarBuffer(rawUrl, scale, x, y, w, h);
    };
    try {
      if (count === 2) {
        const halfW = Math.floor(targetSize / 2);
        const [leftHalf, rightHalf] = await Promise.all([
          getCharCrop(characters[0], halfW, targetSize),
          getCharCrop(characters[1], halfW, targetSize)
        ]);
        if (leftHalf) composites.push({ input: leftHalf, left: 0, top: 0 });
        if (rightHalf) composites.push({ input: rightHalf, left: halfW, top: 0 });
        const dividerSvg = Buffer.from(
          `<svg width="6" height="${targetSize}">
            <defs>
              <linearGradient id="divGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#10b981" stop-opacity="0.9"/>
                <stop offset="50%" stop-color="#38bdf8" stop-opacity="1"/>
                <stop offset="100%" stop-color="#10b981" stop-opacity="0.9"/>
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="6" height="${targetSize}" fill="#09090b" opacity="0.9"/>
            <line x1="3" y1="0" x2="3" y2="${targetSize}" stroke="url(#divGrad2)" stroke-width="2"/>
          </svg>`
        );
        composites.push({ input: dividerSvg, left: halfW - 3, top: 0 });
      } else if (count === 3) {
        const colW1 = Math.floor(targetSize / 3);
        const colW2 = Math.floor(targetSize / 3);
        const colW3 = targetSize - colW1 - colW2;
        const [part1, part2, part3] = await Promise.all([
          getCharCrop(characters[0], colW1, targetSize),
          getCharCrop(characters[1], colW2, targetSize),
          getCharCrop(characters[2], colW3, targetSize)
        ]);
        if (part1) composites.push({ input: part1, left: 0, top: 0 });
        if (part2) composites.push({ input: part2, left: colW1, top: 0 });
        if (part3) composites.push({ input: part3, left: colW1 + colW2, top: 0 });
        const divSvg = Buffer.from(
          `<svg width="6" height="${targetSize}">
            <defs>
              <linearGradient id="divGrad3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#10b981" stop-opacity="0.9"/>
                <stop offset="50%" stop-color="#38bdf8" stop-opacity="1"/>
                <stop offset="100%" stop-color="#a855f7" stop-opacity="0.9"/>
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="6" height="${targetSize}" fill="#09090b" opacity="0.9"/>
            <line x1="3" y1="0" x2="3" y2="${targetSize}" stroke="url(#divGrad3)" stroke-width="2"/>
          </svg>`
        );
        composites.push({ input: divSvg, left: colW1 - 3, top: 0 });
        composites.push({ input: divSvg, left: colW1 + colW2 - 3, top: 0 });
      } else {
        const half = Math.floor(targetSize / 2);
        const [p1, p2, p3, p4] = await Promise.all([
          getCharCrop(characters[0], half, half),
          getCharCrop(characters[1], half, half),
          getCharCrop(characters[2], half, half),
          getCharCrop(characters[3] || characters[0], half, half)
        ]);
        if (p1) composites.push({ input: p1, left: 0, top: 0 });
        if (p2) composites.push({ input: p2, left: half, top: 0 });
        if (p3) composites.push({ input: p3, left: 0, top: half });
        if (p4) composites.push({ input: p4, left: half, top: half });
        const crossSvg = Buffer.from(
          `<svg width="${targetSize}" height="${targetSize}">
            <defs>
              <linearGradient id="divGrad4" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#10b981" stop-opacity="0.9"/>
                <stop offset="50%" stop-color="#38bdf8" stop-opacity="1"/>
                <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.9"/>
              </linearGradient>
            </defs>
            <rect x="${half - 3}" y="0" width="6" height="${targetSize}" fill="#09090b" opacity="0.9"/>
            <line x1="${half}" y1="0" x2="${half}" y2="${targetSize}" stroke="url(#divGrad4)" stroke-width="2"/>
            <rect x="0" y="${half - 3}" width="${targetSize}" height="6" fill="#09090b" opacity="0.9"/>
            <line x1="0" y1="${half}" x2="${targetSize}" y2="${half}" stroke="url(#divGrad4)" stroke-width="2"/>
          </svg>`
        );
        composites.push({ input: crossSvg, left: 0, top: 0 });
      }
      return await (0, import_sharp.default)({
        create: {
          width: targetSize,
          height: targetSize,
          channels: 4,
          background: { r: 15, g: 15, b: 18, alpha: 1 }
        }
      }).composite(composites).png({ quality: 95 }).toBuffer();
    } catch (err) {
      console.warn("Multi avatar composition error:", err.message);
      return null;
    }
  }
  async function getMultiAvatarUrlForCharacters(characters) {
    if (!characters || characters.length === 0) return void 0;
    if (characters.length === 1) return getEffectiveAvatarUrlForCharacter(characters[0]);
    const sortedIds = characters.map((c) => c.id || c.name).sort().join("_");
    const cacheKey = `multi_${characters.length}_${sortedIds}`;
    if (avatarUrlCache.has(cacheKey)) {
      return avatarUrlCache.get(cacheKey);
    }
    try {
      const multiBuf = await generateMultiAvatarBuffer(characters, 512);
      if (multiBuf) {
        const uploadedUrl = await uploadAvatarBufferToPublicHost(multiBuf);
        if (uploadedUrl) {
          avatarUrlCache.set(cacheKey, uploadedUrl);
          return uploadedUrl;
        }
      }
    } catch (e) {
      console.warn("Multi avatar upload error:", e.message);
    }
    return await getEffectiveAvatarUrlForCharacter(characters[0]);
  }
  function findCharacterExact(characters, searchName) {
    if (!searchName) return null;
    const cleanSearch = searchName.replace(/^[\s\u2010-\u2015\u2212\-\—\–\[\*#_~="']+|[\s\u2010-\u2015\u2212\-\—\–\]\*#_~="']+$/g, "").trim().toLowerCase();
    if (!cleanSearch) return null;
    const exact = characters.find((c) => !c.isDraft && c.name?.trim().toLowerCase() === cleanSearch);
    if (exact) return exact;
    const draftExact = characters.find((c) => c.name?.trim().toLowerCase() === cleanSearch);
    if (draftExact) return draftExact;
    const aliasMatch = characters.find((c) => {
      if (c.isDraft || !c.aliases) return false;
      return c.aliases.some((a) => a.toLowerCase().trim() === cleanSearch);
    });
    if (aliasMatch) return aliasMatch;
    return null;
  }
  function splitCharacterNames(rawHeader) {
    if (!rawHeader) return [];
    const cleaned = rawHeader.replace(/^[\s\u2010-\u2015\u2212\-\—\–\[\*#_~="']+|[\s\u2010-\u2015\u2212\-\—\–\]\*#_~="']+$/g, "").trim();
    if (!cleaned) return [];
    const parts = cleaned.split(/(?:\s+(?:и|И|and|AND|&|\/|\+)\s+)|(?:,\s*(?:и|И|and|AND|&|\/|\+)?\s*)|(?:\s*[\/&+,]\s*)/).map((s) => s.trim().replace(/^[\s\u2010-\u2015\u2212\-\—\–\[\*#_~="']+|[\s\u2010-\u2015\u2212\-\—\–\]\*#_~="']+$/g, "").trim()).filter(Boolean);
    return parts;
  }
  function resolveCharactersFromHeader(characters, rawCharName, discordUserId) {
    if (!rawCharName && discordUserId) {
      const authorChar = characters.find((c) => String(c.discordUserId || "").trim() === String(discordUserId).trim());
      if (authorChar) {
        return {
          isMulti: false,
          characters: [authorChar],
          char1: authorChar,
          char2: null,
          displayName: authorChar.name
        };
      }
      return null;
    }
    if (!rawCharName) return null;
    const singleMatch = findCharacterExact(characters, rawCharName);
    if (singleMatch) {
      return {
        isMulti: false,
        characters: [singleMatch],
        char1: singleMatch,
        char2: null,
        displayName: singleMatch.name
      };
    }
    const parts = splitCharacterNames(rawCharName);
    if (parts.length >= 2) {
      const matchedList = [];
      for (const part of parts) {
        const match = findCharacterExact(characters, part) || findCharacterByName(characters, part);
        if (match) {
          matchedList.push(match);
        }
      }
      if (matchedList.length >= 2 && matchedList.length === parts.length) {
        let displayName = "";
        if (matchedList.length === 2) {
          displayName = `${matchedList[0].name} \u0438 ${matchedList[1].name}`;
        } else {
          const allExceptLast = matchedList.slice(0, -1).map((c) => c.name).join(", ");
          displayName = `${allExceptLast} & ${matchedList[matchedList.length - 1].name}`;
        }
        if (displayName.length > 80) {
          displayName = displayName.slice(0, 77) + "...";
        }
        return {
          isMulti: true,
          characters: matchedList,
          char1: matchedList[0],
          char2: matchedList[1] || null,
          displayName
        };
      }
    }
    const fuzzySingle = findCharacterByName(characters, rawCharName);
    if (fuzzySingle) {
      return {
        isMulti: false,
        characters: [fuzzySingle],
        char1: fuzzySingle,
        char2: null,
        displayName: fuzzySingle.name
      };
    }
    return null;
  }
  function findCharacterByName(characters, searchName) {
    if (!searchName) return null;
    const cleanSearch = searchName.replace(/^[—\-\s\[\*#_]+|[—\-\s\]\*#_]+$/g, "").trim().toLowerCase();
    if (!cleanSearch) return null;
    const exact = characters.find((c) => !c.isDraft && c.name?.trim().toLowerCase() === cleanSearch);
    if (exact) return exact;
    const draftExact = characters.find((c) => c.name?.trim().toLowerCase() === cleanSearch);
    if (draftExact) return draftExact;
    const aliasMatch = characters.find((c) => {
      if (c.isDraft || !c.aliases) return false;
      return c.aliases.some((a) => a.toLowerCase().trim() === cleanSearch);
    });
    if (aliasMatch) return aliasMatch;
    return null;
  }
  function parseFormattedPostText(rawInput) {
    let text = (rawInput || "").trim();
    const webhookUrlRegex = /https:\/\/(?:ptb\.|canary\.)?discord(?:app)?\.com\/api\/webhooks\/[0-9]+\/[A-Za-z0-9_\-]+(?:\?[^\s\n\r"']*)?/i;
    const webhookMatch = text.match(webhookUrlRegex);
    let webhookUrl = webhookMatch ? webhookMatch[0] : null;
    if (webhookUrl) {
      text = text.replace(webhookUrlRegex, "").trim();
    }
    let characterName = "";
    let content = text;
    const headerRegex = /^[\s\u2010-\u2015\u2212\-\—\–~=]*\[?([^\[\]\n\r\u2010-\u2015\u2212\-\—\–~=]+?)\]?[\s\u2010-\u2015\u2212\-\—\–~=]*(?:\r?\n+)([\s\S]*)$/;
    const headerMatch = text.match(headerRegex);
    if (headerMatch) {
      characterName = headerMatch[1].trim();
      content = headerMatch[2].trim();
    } else {
      const headerWithBrackets = text.match(/^(?:\[|\*\*\[|\*\*|\*|#+\s*\[?)([^\]\*\n\r]+?)(?:\]|\s*\]\*\*|\*\*|\*|\])?(?:\r?\n+)([\s\S]*)$/);
      if (headerWithBrackets) {
        characterName = headerWithBrackets[1].trim();
        content = headerWithBrackets[2].trim();
      } else {
        const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
        if (lines.length >= 2) {
          characterName = lines[0].replace(/^[\s\u2010-\u2015\u2212\-\—\–\[\*#_~=]+|[\s\u2010-\u2015\u2212\-\—\–\]\*#_~=]+$/g, "").trim();
          content = lines.slice(1).join("\n\n").trim();
        }
      }
    }
    const cleanCharName = (characterName || "").replace(/^[\s\u2010-\u2015\u2212\-\—\–\[\*#_~="']+|[\s\u2010-\u2015\u2212\-\—\–\]\*#_~="']+$/g, "").trim();
    return {
      characterName: cleanCharName,
      content: content.trim(),
      webhookUrl
    };
  }
  const recentDiscordChannelMessages = /* @__PURE__ */ new Map();
  app.get("/api/discord/messages", (req, res) => {
    try {
      const channelId = req.query.channelId || "all";
      if (channelId === "all") {
        const all = [];
        for (const list2 of recentDiscordChannelMessages.values()) {
          all.push(...list2);
        }
        all.sort((a, b) => b.timestamp - a.timestamp);
        return res.json({ messages: all.slice(0, 40) });
      }
      const list = recentDiscordChannelMessages.get(channelId) || [];
      return res.json({ messages: list });
    } catch (e) {
      res.status(500).json({ error: e.message || "Failed to fetch messages" });
    }
  });
  app.post("/api/discord/webhook", async (req, res) => {
    try {
      let rawBody = req.body;
      if (typeof rawBody === "string") {
        const parsed = parseFormattedPostText(rawBody);
        rawBody = {
          content: parsed.content,
          username: parsed.characterName,
          webhookUrl: parsed.webhookUrl || req.query.webhookUrl || req.headers["x-webhook-url"]
        };
      }
      let {
        webhookUrl = "https://discord.com/api/webhooks/1543256017541009408/87-f0tjU4PrV4zufqPgcJvLDrD9RjUsTqApb50ug2trF-lljECLmQT8bBzhIhAqYUIeV",
        channelId = "ch-1",
        username,
        avatarUrl,
        avatarBase64,
        content,
        embeds,
        location,
        replyMessageId,
        message_reference
      } = rawBody || {};
      if (content && typeof content === "string" && !username && (content.includes("\u2014") || content.startsWith("["))) {
        const parsed = parseFormattedPostText(content);
        if (parsed.characterName) {
          username = parsed.characterName;
          content = parsed.content;
          if (parsed.webhookUrl && !webhookUrl) {
            webhookUrl = parsed.webhookUrl;
          }
        }
      }
      if (username && !avatarUrl && !avatarBase64) {
        const allChars = await getCachedCharacters();
        const resolved = resolveCharactersFromHeader(allChars, username);
        if (resolved) {
          username = resolved.displayName;
          avatarUrl = await getMultiAvatarUrlForCharacters(resolved.characters);
        }
      }
      const targetUrl = webhookUrl || "https://discord.com/api/webhooks/1543256017541009408/87-f0tjU4PrV4zufqPgcJvLDrD9RjUsTqApb50ug2trF-lljECLmQT8bBzhIhAqYUIeV";
      if (!targetUrl || !targetUrl.startsWith("https://discord.com/api/webhooks/")) {
        return res.status(400).json({ error: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 Discord Webhook URL" });
      }
      if (!content && (!embeds || embeds.length === 0)) {
        return res.status(400).json({ error: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C" });
      }
      let effectiveAvatarUrl = avatarUrl;
      if (avatarBase64 && typeof avatarBase64 === "string" && avatarBase64.startsWith("data:image/")) {
        try {
          const match = avatarBase64.match(/^data:image\/[a-zA-Z0-9+.-]+;base64,(.+)$/);
          if (match) {
            const buffer = Buffer.from(match[1], "base64");
            const uploadedUrl = await uploadAvatarBufferToPublicHost(buffer);
            if (uploadedUrl) {
              effectiveAvatarUrl = uploadedUrl;
            }
          }
        } catch (cropErr) {
          console.error("Error processing avatarBase64 for Discord webhook:", cropErr);
        }
      }
      const payload = {};
      if (content) payload.content = String(content).slice(0, 2e3);
      if (username) payload.username = String(username).slice(0, 80);
      if (effectiveAvatarUrl && (effectiveAvatarUrl.startsWith("http://") || effectiveAvatarUrl.startsWith("https://"))) {
        payload.avatar_url = effectiveAvatarUrl;
      }
      if (Array.isArray(embeds) && embeds.length > 0) {
        payload.embeds = embeds.map((emb) => {
          const cleanEmb = {};
          if (emb.title) cleanEmb.title = String(emb.title).slice(0, 256);
          if (emb.description) cleanEmb.description = String(emb.description).slice(0, 4096);
          if (emb.color !== void 0) {
            cleanEmb.color = typeof emb.color === "number" ? emb.color : parseInt(String(emb.color).replace("#", ""), 16) || 3900150;
          }
          if (emb.author?.name) {
            const iconUrl = emb.author.icon_url || effectiveAvatarUrl;
            cleanEmb.author = {
              name: String(emb.author.name).slice(0, 256),
              icon_url: iconUrl && (iconUrl.startsWith("http://") || iconUrl.startsWith("https://")) ? iconUrl : void 0
            };
          }
          if (emb.image?.url && (emb.image.url.startsWith("http://") || emb.image.url.startsWith("https://"))) {
            cleanEmb.image = { url: emb.image.url };
          }
          if (emb.thumbnail?.url && (emb.thumbnail.url.startsWith("http://") || emb.thumbnail.url.startsWith("https://"))) {
            cleanEmb.thumbnail = { url: emb.thumbnail.url };
          } else if (effectiveAvatarUrl && (effectiveAvatarUrl.startsWith("http://") || effectiveAvatarUrl.startsWith("https://"))) {
            cleanEmb.thumbnail = { url: effectiveAvatarUrl };
          }
          if (emb.footer?.text) {
            cleanEmb.footer = { text: String(emb.footer.text).slice(0, 2048) };
          }
          if (emb.timestamp) {
            cleanEmb.timestamp = emb.timestamp;
          }
          if (Array.isArray(emb.fields)) {
            cleanEmb.fields = emb.fields.slice(0, 25).map((f) => ({
              name: String(f.name || "").slice(0, 256),
              value: String(f.value || "").slice(0, 1024),
              inline: Boolean(f.inline)
            }));
          }
          return cleanEmb;
        });
      }
      const postUrl = targetUrl.includes("?") ? `${targetUrl}&wait=true` : `${targetUrl}?wait=true`;
      const discordResponse = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (!discordResponse.ok) {
        const errText = await discordResponse.text();
        console.error(`[Discord Webhook Error ${discordResponse.status}]:`, errText);
        return res.status(discordResponse.status).json({
          error: `\u041E\u0448\u0438\u0431\u043A\u0430 Discord (${discordResponse.status}): ${errText}`
        });
      }
      let messageId = `msg-${Date.now()}`;
      try {
        const jsonResult = await discordResponse.json();
        if (jsonResult?.id) {
          messageId = jsonResult.id;
        }
      } catch {
      }
      const savedItem = {
        id: messageId,
        channelId: String(channelId),
        username: String(username || "\u0411\u0435\u0437\u044B\u043C\u044F\u043D\u043D\u044B\u0439"),
        avatarUrl: effectiveAvatarUrl,
        content: String(content || embeds?.[0]?.description || ""),
        timestamp: Date.now(),
        mode: Array.isArray(embeds) && embeds.length > 0 ? "embed" : "standard",
        location: location ? String(location) : void 0
      };
      const existingList = recentDiscordChannelMessages.get(channelId) || [];
      recentDiscordChannelMessages.set(channelId, [savedItem, ...existingList.filter((m) => m.id !== messageId)].slice(0, 50));
      res.json({ success: true, messageId, message: savedItem });
    } catch (err) {
      console.error("Discord Webhook endpoint exception:", err);
      res.status(500).json({ error: err.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0432 Discord" });
    }
  });
  const incomingRelayPosts = [];
  const sseClients = [];
  (async () => {
    try {
      const res = await fetch("https://razlom-db061-default-rtdb.firebaseio.com/rooms/global_chronicles_main/discord_incoming_posts.json");
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === "object") {
          const list = Object.values(data).filter(Boolean);
          list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
          incomingRelayPosts.length = 0;
          incomingRelayPosts.push(...list.slice(0, 200));
          console.log(`[Relay Hub] \u0417\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E ${incomingRelayPosts.length} \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u043F\u043E\u0441\u0442\u043E\u0432 \u0438\u0437 \u0431\u0430\u0437\u044B \u0434\u0430\u043D\u043D\u044B\u0445`);
        }
      }
    } catch (e) {
      console.warn("[Relay Hub] \u041F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u043F\u043E\u0441\u0442\u043E\u0432 \u0438\u0437 RTDB:", e.message);
    }
  })();
  function broadcastIncomingPost(post) {
    const data = JSON.stringify(post);
    for (let i = sseClients.length - 1; i >= 0; i--) {
      const client = sseClients[i];
      try {
        client.write(`data: ${data}

`);
      } catch {
        sseClients.splice(i, 1);
      }
    }
    try {
      io.emit("discord_relay_post", post);
    } catch {
    }
  }
  function recordIncomingPost(entry) {
    const fullEntry = {
      id: entry.id || `relay-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: entry.timestamp || Date.now(),
      rawInput: entry.rawInput || "",
      parsedName: entry.parsedName || "",
      characterFound: Boolean(entry.characterFound),
      character: entry.character || null,
      postedAs: entry.postedAs || { username: entry.parsedName || "\u0411\u0435\u0437\u044B\u043C\u044F\u043D\u043D\u044B\u0439" },
      content: entry.content || "",
      webhookUrl: entry.webhookUrl || "",
      discordMessageId: entry.discordMessageId,
      status: entry.status,
      error: entry.error,
      clientIp: entry.clientIp,
      source: entry.source || "bot_webhook"
    };
    incomingRelayPosts.unshift(fullEntry);
    if (incomingRelayPosts.length > 200) {
      incomingRelayPosts.pop();
    }
    broadcastIncomingPost(fullEntry);
    fetch(`https://razlom-db061-default-rtdb.firebaseio.com/rooms/global_chronicles_main/discord_incoming_posts/${fullEntry.id}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullEntry)
    }).catch((err) => {
      console.warn("[Relay Hub] \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u043F\u043E\u0441\u0442\u0430 \u0432 RTDB:", err.message);
    });
    return fullEntry;
  }
  const inFlightQueueIds = /* @__PURE__ */ new Set();
  async function processSinglePendingPost(item) {
    if (!item || !item.id || inFlightQueueIds.has(item.id)) return;
    inFlightQueueIds.add(item.id);
    try {
      fetch(`https://razlom-db061-default-rtdb.firebaseio.com/rooms/global_chronicles_main/discord_pending_posts/${item.id}.json`, {
        method: "DELETE"
      }).catch(() => {
      });
      const rawText = item.rawText || item.content || "";
      const characterName = item.characterName || item.parsedName || "";
      const content = item.content || rawText;
      let targetWebhookUrl = item.webhookUrl || "https://discord.com/api/webhooks/1543256017541009408/87-f0tjU4PrV4zufqPgcJvLDrD9RjUsTqApb50ug2trF-lljECLmQT8bBzhIhAqYUIeV";
      if (!content) {
        console.warn(`[Queue Worker] \u041F\u0440\u043E\u043F\u0443\u0441\u043A \u043F\u0443\u0441\u0442\u043E\u0433\u043E \u043F\u043E\u0441\u0442\u0430 ${item.id}`);
        return;
      }
      const allChars = await getCachedCharacters();
      const resolved = resolveCharactersFromHeader(allChars, characterName, item.authorDiscordId);
      let effectiveDisplayName = characterName || "\u0411\u0435\u0437\u044B\u043C\u044F\u043D\u043D\u044B\u0439";
      let effectiveAvatarUrl = void 0;
      let primaryCharData = null;
      let allCharsData = [];
      if (resolved) {
        effectiveDisplayName = resolved.displayName;
        allCharsData = resolved.characters.map((c) => ({
          id: c.id,
          name: c.name,
          imageUrl: c.imageUrl || c.avatarUrl || "",
          cardColor: c.cardColor || ""
        }));
        primaryCharData = allCharsData[0] || null;
        effectiveAvatarUrl = await getMultiAvatarUrlForCharacters(resolved.characters);
      }
      const payload = {
        username: String(effectiveDisplayName).slice(0, 80),
        content: String(content).slice(0, 2e3)
      };
      if (effectiveAvatarUrl && (effectiveAvatarUrl.startsWith("http://") || effectiveAvatarUrl.startsWith("https://"))) {
        payload.avatar_url = effectiveAvatarUrl;
      }
      let postUrl = targetWebhookUrl;
      if (item.threadId) {
        postUrl = postUrl.includes("?") ? `${postUrl}&thread_id=${item.threadId}&wait=true` : `${postUrl}?thread_id=${item.threadId}&wait=true`;
      } else {
        postUrl = postUrl.includes("?") ? `${postUrl}&wait=true` : `${postUrl}?wait=true`;
      }
      console.log(`[Queue Worker] \u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u043F\u043E\u0441\u0442\u0430 \u043E\u0442 \u0438\u043C\u0435\u043D\u0438 [${effectiveDisplayName}] \u0447\u0435\u0440\u0435\u0437 \u0432\u0435\u0431\u0445\u0443\u043A...`);
      const discordResponse = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!discordResponse.ok) {
        const errText = await discordResponse.text();
        console.error(`[Queue Worker] \u041E\u0448\u0438\u0431\u043A\u0430 Discord (${discordResponse.status}):`, errText);
        recordIncomingPost({
          id: item.id,
          timestamp: item.timestamp || Date.now(),
          rawInput: rawText,
          parsedName: effectiveDisplayName,
          characterFound: Boolean(resolved),
          character: primaryCharData,
          postedAs: {
            username: effectiveDisplayName,
            avatarUrl: effectiveAvatarUrl
          },
          content,
          webhookUrl: targetWebhookUrl,
          status: "error",
          error: `Discord error ${discordResponse.status}: ${errText}`,
          source: "discord_queue_worker"
        });
        return;
      }
      let discordMsgId = "";
      try {
        const resJson = await discordResponse.json();
        if (resJson?.id) discordMsgId = resJson.id;
      } catch {
      }
      console.log(`[Queue Worker] \u2713 \u041F\u043E\u0441\u0442 \u043E\u0442 [${effectiveDisplayName}] \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D \u0447\u0435\u0440\u0435\u0437 \u0432\u0435\u0431\u0445\u0443\u043A!`);
      const fullRecord = recordIncomingPost({
        id: item.id,
        timestamp: item.timestamp || Date.now(),
        rawInput: rawText,
        parsedName: effectiveDisplayName,
        characterFound: Boolean(resolved),
        character: primaryCharData,
        postedAs: {
          username: effectiveDisplayName,
          avatarUrl: effectiveAvatarUrl
        },
        content,
        webhookUrl: targetWebhookUrl,
        discordMessageId: discordMsgId,
        status: "success",
        source: "discord_queue_worker"
      });
      if (resolved && resolved.characters && resolved.characters.length > 0) {
        for (const ch of resolved.characters) {
          if (!ch || !ch.id) continue;
          fetch(`https://razlom-db061-default-rtdb.firebaseio.com/rooms/global_chronicles_main/characters/${ch.id}/discordPostCount.json`).then((r) => r.json()).then((count) => {
            const current = typeof count === "number" ? count : 0;
            return fetch(`https://razlom-db061-default-rtdb.firebaseio.com/rooms/global_chronicles_main/characters/${ch.id}/discordPostCount.json`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(current + 1)
            });
          }).catch(() => {
          });
        }
      }
    } catch (queueErr) {
      console.error(`[Queue Worker] \u0418\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043F\u0440\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0435 ${item.id}:`, queueErr);
    } finally {
      setTimeout(() => inFlightQueueIds.delete(item.id), 1e4);
    }
  }
  let isCheckingQueue = false;
  async function pollPendingPostsQueue() {
    if (isCheckingQueue) return;
    isCheckingQueue = true;
    try {
      const res = await fetch("https://razlom-db061-default-rtdb.firebaseio.com/rooms/global_chronicles_main/discord_pending_posts.json");
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === "object") {
          const entries = Object.entries(data);
          for (const [key, value] of entries) {
            if (value && typeof value === "object") {
              const item = { ...value, id: key };
              await processSinglePendingPost(item);
            }
          }
        }
      }
    } catch (e) {
    } finally {
      isCheckingQueue = false;
    }
  }
  setInterval(pollPendingPostsQueue, 1e3);
  console.log("\u26A1 [Discord Queue Worker] \u0421\u043B\u0443\u0448\u0430\u0442\u0435\u043B\u044C \u043E\u0447\u0435\u0440\u0435\u0434\u0438 \u043F\u043E\u0441\u0442\u043E\u0432 \u0438\u0437 Discord \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435");
  app.get("/api/discord/incoming-posts/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();
    res.write(`data: ${JSON.stringify({ type: "init", count: incomingRelayPosts.length })}

`);
    sseClients.push(res);
    req.on("close", () => {
      const idx = sseClients.indexOf(res);
      if (idx !== -1) {
        sseClients.splice(idx, 1);
      }
    });
  });
  app.get("/api/discord/incoming-posts", async (req, res) => {
    if (incomingRelayPosts.length === 0) {
      try {
        const rtdbRes = await fetch("https://razlom-db061-default-rtdb.firebaseio.com/rooms/global_chronicles_main/discord_incoming_posts.json");
        if (rtdbRes.ok) {
          const data = await rtdbRes.json();
          if (data && typeof data === "object") {
            const list2 = Object.values(data).filter(Boolean);
            list2.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
            incomingRelayPosts.push(...list2.slice(0, 200));
          }
        }
      } catch {
      }
    }
    const limit = Math.min(Number(req.query.limit) || 50, 200);
    const list = incomingRelayPosts.slice(0, limit);
    const total = incomingRelayPosts.length;
    const successCount = incomingRelayPosts.filter((p) => p.status === "success").length;
    const errorCount = incomingRelayPosts.filter((p) => p.status === "error").length;
    const charsFoundCount = incomingRelayPosts.filter((p) => p.characterFound).length;
    res.json({
      posts: list,
      total,
      stats: {
        total,
        success: successCount,
        error: errorCount,
        charactersFound: charsFoundCount
      }
    });
  });
  app.delete("/api/discord/incoming-posts", async (req, res) => {
    incomingRelayPosts.length = 0;
    try {
      await fetch("https://razlom-db061-default-rtdb.firebaseio.com/rooms/global_chronicles_main/discord_incoming_posts.json", {
        method: "DELETE"
      });
    } catch {
    }
    res.json({ success: true, message: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u043F\u043E\u0441\u0442\u043E\u0432 \u043E\u0447\u0438\u0449\u0435\u043D\u0430" });
  });
  app.post(["/api/discord/relay-character-post", "/api/discord/post-as-character"], async (req, res) => {
    let rawText = "";
    let directCharName = "";
    let directContent = "";
    let directWebhookUrl = "";
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    try {
      if (typeof req.body === "string") {
        rawText = req.body;
      } else if (req.body && typeof req.body === "object") {
        if (req.body.message && typeof req.body.message === "string") {
          rawText = req.body.message;
        } else if (req.body.text && typeof req.body.text === "string") {
          rawText = req.body.text;
        } else if (req.body.raw && typeof req.body.raw === "string") {
          rawText = req.body.raw;
        } else if (req.body.content && typeof req.body.content === "string") {
          directContent = req.body.content;
          directCharName = req.body.characterName || req.body.character || req.body.username || req.body.name || "";
          directWebhookUrl = req.body.webhookUrl || req.body.webhook || "";
          if (!directCharName || !directWebhookUrl) {
            rawText = req.body.content;
          }
        }
      }
      let parsedName = directCharName;
      let parsedContent = directContent;
      let parsedWebhookUrl = directWebhookUrl;
      if (rawText) {
        const parsed = parseFormattedPostText(rawText);
        if (!parsedName) parsedName = parsed.characterName;
        if (!parsedContent) parsedContent = parsed.content;
        if (!parsedWebhookUrl) parsedWebhookUrl = parsed.webhookUrl || "";
      }
      if (!parsedWebhookUrl) {
        parsedWebhookUrl = req.query.webhookUrl || req.headers["x-webhook-url"] || (typeof req.body === "object" ? req.body.webhookUrl : "") || "";
      }
      if (!parsedWebhookUrl || !parsedWebhookUrl.startsWith("https://discord.com/api/webhooks/") && !parsedWebhookUrl.startsWith("https://discordapp.com/api/webhooks/")) {
        const errMsg = "\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 Discord Webhook (\u0444\u043E\u0440\u043C\u0430\u0442: https://discord.com/api/webhooks/...)";
        recordIncomingPost({
          rawInput: rawText || JSON.stringify(req.body),
          parsedName,
          characterFound: false,
          postedAs: { username: parsedName || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439" },
          content: parsedContent,
          webhookUrl: parsedWebhookUrl,
          status: "error",
          error: errMsg,
          clientIp
        });
        return res.status(400).json({
          error: errMsg,
          parsedName,
          parsedContent: parsedContent ? parsedContent.slice(0, 100) + "..." : ""
        });
      }
      if (!parsedContent) {
        const errMsg = "\u0422\u0435\u043A\u0441\u0442 \u043F\u043E\u0441\u0442\u0430 \u043F\u0443\u0441\u0442";
        recordIncomingPost({
          rawInput: rawText || JSON.stringify(req.body),
          parsedName,
          characterFound: false,
          postedAs: { username: parsedName || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439" },
          content: "",
          webhookUrl: parsedWebhookUrl,
          status: "error",
          error: errMsg,
          clientIp
        });
        return res.status(400).json({
          error: errMsg,
          parsedName
        });
      }
      const allChars = await getCachedCharacters();
      const resolved = resolveCharactersFromHeader(allChars, parsedName);
      const matchedChar = resolved?.char1 || null;
      const effectiveUsername = resolved ? resolved.displayName : parsedName || "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436";
      let effectiveAvatarUrl;
      if (resolved) {
        effectiveAvatarUrl = await getMultiAvatarUrlForCharacters(resolved.characters);
      }
      if (effectiveAvatarUrl && effectiveAvatarUrl.startsWith("data:image/")) {
        try {
          const match = effectiveAvatarUrl.match(/^data:image\/[a-zA-Z0-9+.-]+;base64,(.+)$/);
          if (match) {
            const buffer = Buffer.from(match[1], "base64");
            const uploadedUrl = await uploadAvatarBufferToPublicHost(buffer);
            if (uploadedUrl) {
              effectiveAvatarUrl = uploadedUrl;
            }
          }
        } catch (cropErr) {
          console.error("Error processing avatar for character post relay:", cropErr);
        }
      }
      const payload = {
        username: effectiveUsername.slice(0, 80),
        content: parsedContent.slice(0, 2e3)
      };
      if (effectiveAvatarUrl && (effectiveAvatarUrl.startsWith("http://") || effectiveAvatarUrl.startsWith("https://"))) {
        payload.avatar_url = effectiveAvatarUrl;
      }
      const explicitThreadId = req.query.thread_id || req.query.threadId || (typeof req.body === "object" ? req.body.thread_id || req.body.threadId : "");
      let targetPostUrl = parsedWebhookUrl;
      if (explicitThreadId && !targetPostUrl.includes("thread_id=")) {
        targetPostUrl += targetPostUrl.includes("?") ? `&thread_id=${explicitThreadId}` : `?thread_id=${explicitThreadId}`;
      }
      const postUrl = targetPostUrl.includes("?") ? `${targetPostUrl}&wait=true` : `${targetPostUrl}?wait=true`;
      const discordResponse = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (!discordResponse.ok) {
        const errText = await discordResponse.text();
        console.error(`[Discord Relay Error ${discordResponse.status}]:`, errText);
        const errMsg = `\u041E\u0448\u0438\u0431\u043A\u0430 Discord (${discordResponse.status}): ${errText}`;
        recordIncomingPost({
          rawInput: rawText || JSON.stringify(req.body),
          parsedName,
          characterFound: Boolean(matchedChar),
          character: matchedChar ? {
            id: matchedChar.id,
            name: matchedChar.name,
            imageUrl: matchedChar.imageUrl,
            cardColor: matchedChar.cardColor
          } : null,
          postedAs: {
            username: effectiveUsername,
            avatarUrl: effectiveAvatarUrl
          },
          content: parsedContent,
          webhookUrl: parsedWebhookUrl,
          status: "error",
          error: errMsg,
          clientIp
        });
        return res.status(discordResponse.status).json({
          error: errMsg
        });
      }
      let discordMsgId = `msg-${Date.now()}`;
      let detectedChannelId = "relay";
      try {
        const jsonResult = await discordResponse.json();
        if (jsonResult?.id) {
          discordMsgId = jsonResult.id;
        }
        if (jsonResult?.channel_id) {
          detectedChannelId = String(jsonResult.channel_id);
        }
      } catch {
      }
      if (detectedChannelId === "relay") {
        const urlMatch = parsedWebhookUrl.match(/\/webhooks\/([0-9]+)/);
        if (urlMatch && urlMatch[1]) {
          detectedChannelId = urlMatch[1];
        }
      }
      recordIncomingPost({
        rawInput: rawText || JSON.stringify(req.body),
        parsedName,
        characterFound: Boolean(matchedChar),
        character: matchedChar ? {
          id: matchedChar.id,
          name: matchedChar.name,
          imageUrl: matchedChar.imageUrl,
          cardColor: matchedChar.cardColor
        } : null,
        postedAs: {
          username: effectiveUsername,
          avatarUrl: effectiveAvatarUrl
        },
        content: parsedContent,
        webhookUrl: parsedWebhookUrl,
        discordMessageId: discordMsgId,
        status: "success",
        clientIp
      });
      const savedItem = {
        id: discordMsgId,
        channelId: detectedChannelId,
        username: effectiveUsername,
        avatarUrl: effectiveAvatarUrl,
        content: parsedContent,
        timestamp: Date.now(),
        mode: "standard"
      };
      const keysToSave = [detectedChannelId, "relay", "all"];
      for (const k of keysToSave) {
        const existingList = recentDiscordChannelMessages.get(k) || [];
        recentDiscordChannelMessages.set(k, [savedItem, ...existingList.filter((m) => m.id !== discordMsgId)].slice(0, 50));
      }
      return res.json({
        success: true,
        characterFound: Boolean(matchedChar),
        character: matchedChar ? {
          id: matchedChar.id,
          name: matchedChar.name,
          imageUrl: matchedChar.imageUrl,
          cardColor: matchedChar.cardColor
        } : null,
        postedAs: {
          username: effectiveUsername,
          avatarUrl: effectiveAvatarUrl
        },
        content: parsedContent,
        discordMessageId: discordMsgId
      });
    } catch (err) {
      console.error("Relay character post error:", err);
      const errMsg = err.message || "\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u044F\u044F \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u043F\u043E\u0441\u0442\u0430";
      recordIncomingPost({
        rawInput: rawText || JSON.stringify(req.body),
        parsedName: directCharName,
        characterFound: false,
        postedAs: { username: directCharName || "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436" },
        content: directContent,
        webhookUrl: directWebhookUrl,
        status: "error",
        error: errMsg,
        clientIp
      });
      res.status(500).json({ error: errMsg });
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
  let soundListCache = null;
  app.get("/api/github/sounds", async (req, res) => {
    try {
      const now = Date.now();
      const isForceRefresh = req.query.refresh === "true";
      if (soundListCache && !isForceRefresh && now - soundListCache.timestamp < CACHE_TTL) {
        return res.json(soundListCache.data);
      }
      console.log("Fetching sound files from GitHub repository SaminCodes/raz_storage/sounds...");
      const apiResponse = await fetch("https://api.github.com/repos/SaminCodes/raz_storage/contents/sounds", {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrono-Haven-App/1.0"
        }
      });
      if (!apiResponse.ok) {
        const errText = await apiResponse.text();
        console.error("GitHub sounds API response error:", apiResponse.status, errText);
        if (soundListCache) {
          return res.json(soundListCache.data);
        }
        return res.json([]);
      }
      const contents = await apiResponse.json();
      if (!Array.isArray(contents)) {
        return res.json([]);
      }
      const audioExtensions = [".mp3", ".ogg", ".wav", ".m4a", ".aac", ".flac", ".opus", ".webm"];
      const soundFiles = contents.filter((file) => file.type === "file" && audioExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))).map((file) => ({
        name: file.name,
        path: file.path,
        size: file.size,
        download_url: file.download_url || `https://raw.githubusercontent.com/SaminCodes/raz_storage/main/${file.path}`,
        cdn_url: `https://cdn.jsdelivr.net/gh/SaminCodes/raz_storage@main/${file.path}`,
        raw_url: `https://raw.githubusercontent.com/SaminCodes/raz_storage/main/${file.path}`
      }));
      soundListCache = { data: soundFiles, timestamp: now };
      res.json(soundFiles);
    } catch (err) {
      console.error("Failed to fetch GitHub sound files:", err);
      if (soundListCache) {
        return res.json(soundListCache.data);
      }
      res.json([]);
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
  function extractYoutubeId(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }
  const ytInfoCache = /* @__PURE__ */ new Map();
  app.get("/api/youtube/info", async (req, res) => {
    try {
      const rawUrl = req.query.url;
      if (!rawUrl || typeof rawUrl !== "string") {
        return res.status(400).json({ error: "No URL provided" });
      }
      const videoId = extractYoutubeId(rawUrl);
      if (!videoId) {
        return res.status(400).json({ error: "Invalid YouTube URL" });
      }
      const cacheKey = `yt_info_${videoId}`;
      if (ytInfoCache.has(cacheKey)) {
        return res.json(ytInfoCache.get(cacheKey));
      }
      let title = "";
      let authorName = "";
      let authorUrl = "";
      let thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      let description = "";
      const detectedArtists = [];
      try {
        const oembedRes = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );
        if (oembedRes.ok) {
          const oembedData = await oembedRes.json();
          title = oembedData.title || "";
          authorName = oembedData.author_name || "";
          authorUrl = oembedData.author_url || "";
          if (oembedData.thumbnail_url) {
            thumbnail = oembedData.thumbnail_url;
          }
        }
      } catch (e) {
        console.warn("oEmbed fetch failed for videoId:", videoId);
      }
      try {
        const pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7"
          }
        });
        if (pageRes.ok) {
          const html = await pageRes.text();
          const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i) || html.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i);
          if (descMatch && descMatch[1]) {
            description = descMatch[1].replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
          }
          if (!authorName) {
            const channelMatch = html.match(/<link\s+itemprop=["']name["']\s+content=["'](.*?)["']/i) || html.match(/<meta\s+itemprop=["']channelId["']\s+content=["'](.*?)["']/i);
            if (channelMatch && channelMatch[1]) {
              authorName = channelMatch[1];
            }
          }
          if (!title) {
            const titleMatch = html.match(/<meta\s+name=["']title["']\s+content=["'](.*?)["']/i) || html.match(/<title>(.*?) - YouTube<\/title>/i);
            if (titleMatch && titleMatch[1]) {
              title = titleMatch[1];
            }
          }
        }
      } catch (e) {
        console.warn("Page fetch failed for videoId:", videoId);
      }
      const addArtistCandidate = (name) => {
        if (!name) return;
        const clean = name.trim();
        if (clean.length >= 2 && clean.length <= 80 && !detectedArtists.includes(clean)) {
          detectedArtists.push(clean);
        }
      };
      if (authorName) {
        const cleanAuthor = authorName.replace(/\s*-\s*Topic$/i, "").replace(/\s*VEVO$/i, "").replace(/\s*Official\s*(Channel|Music|Page|Audio|Video|TV)?$/i, "").replace(/\s*Records$/i, "").replace(/\s*Music$/i, "").trim();
        addArtistCandidate(cleanAuthor);
        if (authorName !== cleanAuthor) {
          addArtistCandidate(authorName);
        }
      }
      if (title) {
        const cleanTitle = title.replace(/\[.*?\]/g, " ").replace(/\(.*?(official|video|audio|remaster|hd|4k|lyric|clip|ost|soundtrack).*?\)/gi, " ").trim();
        const separators = [" - ", " \u2013 ", " \u2014 ", " : ", " // ", " \u2022 ", " | "];
        for (const sep of separators) {
          if (cleanTitle.includes(sep)) {
            const parts = cleanTitle.split(sep);
            addArtistCandidate(parts[0]);
            break;
          }
        }
      }
      if (description) {
        const ytMusicMatch = description.match(
          /(?:Provided to YouTube by[^\n]*\n+)([^\n·•]+)[·•]([^\n]+)/i
        );
        if (ytMusicMatch && ytMusicMatch[2]) {
          addArtistCandidate(ytMusicMatch[2]);
        }
        const patterns = [
          /(?:Artist|Исполнитель|Author|Автор музыки|Composer|Композитор|Music by|Музыка|Группа|Band):\s*([^\n,\r]+)/gi,
          /(?:Track|Песня):\s*([^\n\r-]+)\s*-\s*([^\n\r,]+)/gi
        ];
        for (const pat of patterns) {
          let match;
          while ((match = pat.exec(description)) !== null) {
            const val = (match[2] || match[1]).trim();
            addArtistCandidate(val);
          }
        }
      }
      const result = {
        videoId,
        title,
        authorName,
        authorUrl,
        thumbnail,
        description: description ? description.substring(0, 800) : "",
        detectedArtists
      };
      ytInfoCache.set(cacheKey, result);
      if (ytInfoCache.size > 500) {
        const firstKey = ytInfoCache.keys().next().value;
        if (firstKey) ytInfoCache.delete(firstKey);
      }
      res.json(result);
    } catch (err) {
      console.error("YouTube info error:", err);
      res.status(500).json({ error: err.message || "Failed to fetch YouTube info" });
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
    app.use("/.proxy", import_express2.default.static(distPath));
    app.use("/raz", import_express2.default.static(distPath));
    app.use(import_express2.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
