// Level & Biome Data for the Mario & Dive Adventure (Robby Leonardi style)

export const WORLD_LENGTH = 12500
export const GROUND_Y = 480

export const BIOMES = [
  {
    id: 1,
    name: "WORLD 1-1: MARIO OVERWORLD",
    subtitle: "Academics & Core Skills",
    type: "overworld", // Grassland & Pipes
    startX: 0,
    endX: 4200,
    skyTop: "#4aa3df",
    skyBottom: "#87cefa",
    groundGrass: "#38b000",
    groundSoil: "#8b5a2b",
    themeColor: "#e52521", // Mario Red
  },
  {
    id: 2,
    name: "WORLD 1-2: DEEP SEA SUBMARINE DIVE",
    subtitle: "Ghost Call WebRTC & Real-Time Ocean",
    type: "underwater", // Submarine & Corals
    startX: 4200,
    endX: 6800,
    skyTop: "#031d38",
    skyBottom: "#0b4f6c",
    groundGrass: "#028090",
    groundSoil: "#00435c",
    themeColor: "#00f0ff", // Neon Ocean Cyan
  },
  {
    id: 3,
    name: "WORLD 1-3: INDUSTRIAL FACTORY & CITY",
    subtitle: "TRISX Technologies & Subcidys SaaS Engine",
    type: "factory", // Sunset & Gears
    startX: 6800,
    endX: 8800,
    skyTop: "#3a1c71",
    skyBottom: "#ffaf7b",
    groundGrass: "#d97706",
    groundSoil: "#451a03",
    themeColor: "#f59e0b", // Gold Factory
  },
  {
    id: 4,
    name: "WORLD 1-4: CLOUD FLIGHT KINGDOM",
    subtitle: "Travel Planner Flutter APK & Airship",
    type: "skyflight", // Cloud Islands & Airplane
    startX: 8800,
    endX: 10600,
    skyTop: "#312e81",
    skyBottom: "#c084fc",
    groundGrass: "#ec4899",
    groundSoil: "#581c87",
    themeColor: "#38bdf8", // Sky Blue
  },
  {
    id: 5,
    name: "WORLD 1-5: VICTORY CASTLE & FLAGPOLE",
    subtitle: "Final Flagpole & Hire Terminal",
    type: "castle", // Castle & Flagpole
    startX: 10600,
    endX: 12500,
    skyTop: "#111827",
    skyBottom: "#374151",
    groundGrass: "#475569",
    groundSoil: "#1e293b",
    themeColor: "#fbbf24", // Golden Star
  },
]

export const LEVELS = BIOMES

export const LEVEL_DATA = {
  // Ground segments with pipes and bridges
  groundSegments: [
    { x: 0, width: 2400, y: GROUND_Y, height: 220 },
    { x: 2550, width: 2350, y: GROUND_Y, height: 220 },
    { x: 5000, width: 2300, y: GROUND_Y, height: 220 },
    { x: 7400, width: 1800, y: GROUND_Y, height: 220 },
    { x: 9300, width: 1700, y: GROUND_Y, height: 220 },
  ],

  // Mario Green Warp Pipes
  pipes: [
    { x: 1150, y: GROUND_Y - 70, width: 64, height: 70, label: "MCA 8.18" },
    { x: 1750, y: GROUND_Y - 95, width: 64, height: 95, label: "REACT/NODE" },
    { x: 2350, y: GROUND_Y - 110, width: 68, height: 110, label: "DIVE ENTRY ↓" },
    // Underwater Pipes
    { x: 2750, y: GROUND_Y - 80, width: 64, height: 80, label: "SONAR PIPE" },
    { x: 4750, y: GROUND_Y - 90, width: 64, height: 90, label: "SURFACE ↑" },
    // Factory Pipes
    { x: 5400, y: GROUND_Y - 80, width: 64, height: 80, label: "SAAS CORE" },
    { x: 6750, y: GROUND_Y - 85, width: 64, height: 85, label: "LAUNCH PAD" },
    // Castle Pipe
    { x: 9450, y: GROUND_Y - 90, width: 68, height: 90, label: "FLAG ENTRY" },
  ],

  // Mario Brick Platforms
  platforms: [
    // World 1: Overworld Brick & Cloud Stacks (Starts after Title Scene at X: 1100)
    { x: 1250, y: 350, width: 140, height: 26, type: "brick", label: "MEDICAPS UNIV" },
    { x: 1450, y: 300, width: 180, height: 26, type: "brick", label: "8.18 MCA GPA" },
    { x: 1700, y: 340, width: 160, height: 26, type: "brick", label: "DSA & CORE" },
    { x: 1950, y: 310, width: 200, height: 26, type: "cloud", label: "FRONTEND CLOUD" },
    { x: 2200, y: 280, width: 220, height: 26, type: "cloud", label: "BACKEND CLOUD" },

    // World 2: Deep Sea Coral & Sunken Platforms
    { x: 2900, y: 360, width: 200, height: 26, type: "coral", label: "P2P CORAL REEF" },
    { x: 3300, y: 300, width: 220, height: 26, type: "coral", label: "WEBRTC CHANNEL" },
    { x: 3750, y: 340, width: 240, height: 26, type: "coral", label: "SIGNALING ENGINE" },
    { x: 4250, y: 310, width: 200, height: 26, type: "coral", label: "LOOTLO MULTIPLAYER" },

    // World 3: Factory Steel Girders
    { x: 5150, y: 350, width: 220, height: 26, type: "steel", label: "TRISX TECHNOLOGIES" },
    { x: 5550, y: 300, width: 240, height: 26, type: "steel", label: "SUBCIDYS SAAS" },
    { x: 6000, y: 340, width: 220, height: 26, type: "steel", label: "GST INVOICE CORE" },
    { x: 6400, y: 290, width: 220, height: 26, type: "steel", label: "JWT & WEBHOOKS" },

    // World 4: Sky Islands
    { x: 7600, y: 340, width: 220, height: 26, type: "cloud", label: "FLUTTER ENGINE" },
    { x: 8000, y: 290, width: 240, height: 26, type: "cloud", label: "TRAVEL PLANNER APK" },
    { x: 8500, y: 330, width: 220, height: 26, type: "cloud", label: "HCL CYBERSECURITY" },
    { x: 8900, y: 280, width: 220, height: 26, type: "cloud", label: "IBM CLOUD ARCH" },

    // World 5: Castle Bridge
    { x: 9600, y: 350, width: 260, height: 26, type: "brick", label: "CASTLE GATEWAY" },
  ],

  // Golden Mystery Question Blocks `[?]`
  questionBlocks: [
    // World 1: Overworld Skills
    {
      id: "q_react",
      x: 1350,
      y: 220,
      tech: "React.js & Vite",
      category: "Frontend Stack",
      xp: 250,
      desc: "Component lifecycle, Custom Hooks, Tailwind CSS v4, dynamic canvas graphics & high-speed SPA.",
    },
    {
      id: "q_node",
      x: 1410,
      y: 220,
      tech: "Node.js & Express",
      category: "Backend Engine",
      xp: 300,
      desc: "High-throughput REST APIs, asynchronous pipelines, middleware architectures, stream processing.",
    },
    {
      id: "q_python",
      x: 1470,
      y: 220,
      tech: "Python & C++",
      category: "Core Algorithms",
      xp: 250,
      desc: "Data Structures & Algorithms (DSA), time/space complexity optimization, automated scripts.",
    },
    {
      id: "q_db",
      x: 1850,
      y: 190,
      tech: "PostgreSQL & Redis",
      category: "Databases",
      xp: 300,
      desc: "Relational modeling, ACID transactions, Redis caching layers, query optimization.",
    },

    // World 2: Dive Skills
    {
      id: "q_webrtc",
      x: 3400,
      y: 210,
      tech: "WebRTC P2P Media",
      category: "Real-Time Protocol",
      xp: 400,
      desc: "Zero-server media relays, ICE/STUN/TURN negotiation, sub-40ms P2P audio & video channels.",
    },
    {
      id: "q_socket",
      x: 4350,
      y: 220,
      tech: "Socket.io Engine",
      category: "Bidirectional Events",
      xp: 300,
      desc: "Room-based event dispatching, reconnection buffers, multiplayer synchronization for Lootlo.",
    },

    // World 3: Factory Skills
    {
      id: "q_saas",
      x: 6100,
      y: 240,
      tech: "GST Billing & Webhooks",
      category: "Fintech SaaS",
      xp: 350,
      desc: "Automated GST compliance computation, payment gateway integrations, cryptographic webhook verification.",
    },

    // World 4: Sky Skills
    {
      id: "q_flutter",
      x: 7700,
      y: 240,
      tech: "Flutter & Dart",
      category: "Mobile Engineering",
      xp: 350,
      desc: "Cross-platform Android app development, offline SQLite sync, modern Material 3 UI design.",
    },
  ],

  // Collectibles: Coins, 1-UP Mushrooms, Super Stars, Trophies
  collectibles: [
    // World 1: Overworld Coins & Mushroom (Starts after Title Scene at X: 1100)
    { id: "c1", x: 1200, y: 410, type: "coin", xp: 50, label: "+50" },
    { id: "c2", x: 1300, y: 290, type: "star", xp: 500, label: "8.18 GPA", title: "Medi-Caps University MCA" },
    { id: "c3", x: 1500, y: 240, type: "mushroom", xp: 300, label: "1-UP", title: "Govt College Multai (B.Com 6.58)" },
    { id: "c4", x: 1650, y: 410, type: "coin", xp: 50, label: "+50" },
    { id: "c5", x: 2000, y: 250, type: "coin", xp: 100, label: "+100" },
    { id: "c6", x: 2250, y: 220, type: "coin", xp: 100, label: "+100" },

    // World 2: Underwater Bubble Coins & Pearls
    { id: "c7", x: 3000, y: 300, type: "pearl", xp: 200, label: "WebRTC Pearl" },
    { id: "c8", x: 3500, y: 240, type: "star", xp: 400, label: "Sub-40ms Star" },
    { id: "c9", x: 4400, y: 250, type: "pearl", xp: 200, label: "Lootlo Pearl" },

    // World 3: Factory Gold Bars
    { id: "c10", x: 5250, y: 290, type: "star", xp: 600, label: "TRISX Intern", title: "Full Stack Developer Intern" },
    { id: "c11", x: 5700, y: 240, type: "coin", xp: 200, label: "GST Coin" },
    { id: "c12", x: 6500, y: 230, type: "coin", xp: 200, label: "JWT Coin" },

    // World 4: Sky Stars & Cloud Badges
    { id: "c13", x: 8100, y: 230, type: "star", xp: 500, label: "APK 55.4MB", title: "Travel Planner Android App" },
    { id: "c14", x: 8600, y: 270, type: "trophy", xp: 400, label: "HCL Cert", title: "Cybersecurity Analyst 2026" },
    { id: "c15", x: 9000, y: 220, type: "trophy", xp: 400, label: "IBM Cert", title: "Cloud Computing 2025" },

    // World 5: Victory Star
    { id: "c16", x: 10000, y: 250, type: "star", xp: 1000, label: "HIRE ME!", title: "Victory Master Star" },
  ],

  // Interactive Game Portals & Stations
  portals: [
    // World 2: Ghost Call Sonar Station
    {
      id: "portal_ghostcall",
      x: 3850,
      y: GROUND_Y - 140,
      width: 140,
      height: 140,
      type: "project",
      title: "GHOST CALL",
      category: "WebRTC Video Call Live App",
      badge: "SUBMARINE SONAR",
      color: "#00f0ff",
      desc: "Direct P2P video and audio calling with zero intermediate media servers, sub-40ms ultra-low latency, and AES encryption.",
      techStack: ["WebRTC", "Socket.io", "Node.js", "STUN/TURN"],
      liveUrl: "https://ghost-call-ten.vercel.app/",
      githubUrl: "https://github.com/krishna23810/ghost-call",
      stats: { latency: "< 40ms", encryption: "AES-128 P2P", topology: "Mesh" },
    },

    // World 3: Subcidys SaaS Factory Core
    {
      id: "portal_subcidys",
      x: 5650,
      y: GROUND_Y - 140,
      width: 150,
      height: 140,
      type: "experience",
      title: "SUBCIDYS SAAS",
      category: "TRISX Technologies Internship",
      badge: "FINTECH FACTORY",
      color: "#f59e0b",
      desc: "Automated MSME financial platform handling GST billing, merchant subsidies, and cryptographic webhook verifications.",
      techStack: ["React.js", "Node.js", "Express", "PostgreSQL", "Razorpay"],
      role: "Full Stack Developer Intern",
      stats: { impact: "Automated GST Invoicing", uptime: "99.9%" },
    },

    // World 4: Travel Planner APK Hangar Crate
    {
      id: "portal_travelplanner",
      x: 8150,
      y: GROUND_Y - 140,
      width: 140,
      height: 140,
      type: "download",
      title: "TRAVEL PLANNER APK",
      category: "Flutter Cross-Platform App",
      badge: "AIRSHIP CRATE",
      color: "#38bdf8",
      desc: "Smart destination travel guide, offline itinerary planner, and live weather forecast app built with Flutter and Dart.",
      techStack: ["Flutter", "Dart", "SQLite", "OpenWeather"],
      apkUrl: "/TravelPlanner.apk",
      apkSize: "55.37 MB",
      version: "v1.0.0",
      stats: { size: "55.37 MB", target: "Android 8.0+" },
    },

    // World 5: Victory Flagpole & Castle Hire Uplink
    {
      id: "portal_contact",
      x: 10100,
      y: GROUND_Y - 180,
      width: 160,
      height: 180,
      type: "contact",
      title: "VICTORY CASTLE",
      category: "Direct Communication & Hire Base",
      badge: "MISSION COMPLETE",
      color: "#fbbf24",
      desc: "Congratulations on completing the quest! Send an instant transmission to Krishnakant's inbox or connect directly.",
      email: "agrawall.krishna08@gmail.com",
      phone: "+91-9669070394",
      linkedin: "https://linkedin.com/in/krishnakant-agrawal-811a4b289/",
      github: "https://github.com/krishna23810",
    },
  ],

  // Flagpoles and Scenery
  scenery: [
    // World 1: Overworld Green Hills & Bushes
    { x: 120, y: GROUND_Y, type: "hill", size: "large" },
    { x: 700, y: GROUND_Y, type: "bush" },
    { x: 1500, y: GROUND_Y, type: "hill", size: "small" },
    // World 2: Corals & Seaweed
    { x: 2650, y: GROUND_Y, type: "seaweed" },
    { x: 3150, y: GROUND_Y, type: "coral_reef" },
    { x: 4100, y: GROUND_Y, type: "seaweed" },
    // World 3: Factory Smokestacks & Gears
    { x: 5100, y: GROUND_Y, type: "factory_chimney" },
    { x: 6300, y: GROUND_Y, type: "factory_gear" },
    // World 4: Sky Windmills & Rainbows
    { x: 7500, y: GROUND_Y, type: "sky_windmill" },
    // World 5: Flagpole & Castle
    { x: 9900, y: GROUND_Y - 220, type: "flagpole" },
    { x: 10250, y: GROUND_Y - 140, type: "castle_building" },
  ]
}
