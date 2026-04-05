"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt = __importStar(require("bcryptjs"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
// Load env vars
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
var job_model_1 = __importDefault(require("../lib/models/job.model"));
var application_model_1 = __importDefault(
  require("../lib/models/application.model")
);
var savedJob_model_1 = __importDefault(require("../lib/models/savedJob.model"));
var prisma = new client_1.PrismaClient();
var MONGODB_URI = process.env.MONGODB_URI;
function main() {
  return __awaiter(this, void 0, void 0, function () {
    var demoPassword,
      posterPassword,
      demoUser,
      posterUser,
      user3,
      user4,
      reqObj,
      job1,
      job2,
      job3,
      interview;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          console.log("🌱 Seeding JobVue AI database...");
          if (!MONGODB_URI) {
            throw new Error("MONGODB_URI is required to seed the database.");
          }
          console.log("🔗 Connecting to MongoDB...");
          return [
            4 /*yield*/,
            mongoose_1.default.connect(MONGODB_URI, { dbName: "jobvue" }),
          ];
        case 1:
          _a.sent();
          // Clear Mongo Collections
          return [4 /*yield*/, job_model_1.default.deleteMany({})];
        case 2:
          // Clear Mongo Collections
          _a.sent();
          return [4 /*yield*/, application_model_1.default.deleteMany({})];
        case 3:
          _a.sent();
          return [4 /*yield*/, savedJob_model_1.default.deleteMany({})];
        case 4:
          _a.sent();
          return [4 /*yield*/, bcrypt.hash("demo1234", 10)];
        case 5:
          demoPassword = _a.sent();
          return [4 /*yield*/, bcrypt.hash("poster1234", 10)];
        case 6:
          posterPassword = _a.sent();
          return [
            4 /*yield*/,
            prisma.user.upsert({
              where: { email: "demo@jobvue.com" },
              update: {},
              create: {
                name: "Demo User",
                email: "demo@jobvue.com",
                password: demoPassword,
                accountType: "both",
                city: "Kolkata",
                bio: "Full-stack developer and open source enthusiast. Looking for freelance gigs in web development.",
                tagline: "🚀 Building cool stuff with code",
                skills: [
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "Tailwind CSS",
                  "PostgreSQL",
                ],
                languages: ["English", "Hindi", "Bengali"],
                isAvailable: true,
                education: JSON.stringify([
                  {
                    institution: "IIT Kharagpur",
                    degree: "B.Tech CSE",
                    year: "2025",
                    cgpa: "8.9",
                  },
                ]),
                socialLinks: JSON.stringify({
                  linkedin: "https://linkedin.com/in/demo-user",
                  github: "https://github.com/demo-user",
                  portfolio: "https://demo-user.dev",
                }),
              },
            }),
          ];
        case 7:
          demoUser = _a.sent();
          console.log("\u2705 Demo user created...");
          return [
            4 /*yield*/,
            prisma.user.upsert({
              where: { email: "poster@jobvue.com" },
              update: {},
              create: {
                name: "Startup Founder",
                email: "poster@jobvue.com",
                password: posterPassword,
                accountType: "poster",
                city: "Bangalore",
                bio: "Building the next unicorn",
                tagline: "💼 Hiring at TechStart.io",
                skills: ["Product Management", "UX Design", "Leadership"],
              },
            }),
          ];
        case 8:
          posterUser = _a.sent();
          return [
            4 /*yield*/,
            prisma.user.upsert({
              where: { email: "priya@jobvue.com" },
              update: {},
              create: {
                name: "Priya Nair",
                email: "priya@jobvue.com",
                password: demoPassword,
                accountType: "both",
              },
            }),
          ];
        case 9:
          user3 = _a.sent();
          return [
            4 /*yield*/,
            prisma.user.upsert({
              where: { email: "rahul@jobvue.com" },
              update: {},
              create: {
                name: "Rahul Sharma",
                email: "rahul@jobvue.com",
                password: demoPassword,
                accountType: "seeker",
              },
            }),
          ];
        case 10:
          user4 = _a.sent();
          reqObj = {
            posterId: posterUser.id,
            title: "React.js Frontend Developer — Build a SaaS Dashboard",
            description:
              "<p>We are building a <strong>SaaS analytics dashboard</strong> and need a skilled React developer.</p>",
            jobType: "freelance",
            category: "Tech & Development",
            skills: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
            requirements: [
              "2+ years React experience",
              "Strong TypeScript skills",
            ],
            payType: "fixed",
            payMin: 25000,
            payMax: 40000,
            isUrgent: true,
            status: "open",
            tags: ["react", "frontend", "saas"],
          };
          return [4 /*yield*/, job_model_1.default.create(reqObj)];
        case 11:
          job1 = _a.sent();
          return [
            4 /*yield*/,
            job_model_1.default.create({
              posterId: posterUser.id,
              title: "Logo & Brand Identity Designer for EdTech Startup",
              description:
                "<p>We need a creative designer to craft our <strong>complete brand identity</strong>.</p>",
              jobType: "freelance",
              category: "UI/UX Design",
              skills: ["Logo Design", "Branding", "Figma", "Adobe Illustrator"],
              requirements: ["Portfolio with brand work"],
              payType: "fixed",
              payMin: 8000,
              payMax: 15000,
              status: "open",
            }),
          ];
        case 12:
          job2 = _a.sent();
          return [
            4 /*yield*/,
            job_model_1.default.create({
              posterId: user3.id,
              title: "Social Media Manager — Instagram & LinkedIn",
              description:
                "<p>Manage our social media presence and grow our audience.</p>",
              jobType: "parttime",
              category: "Digital Marketing",
              skills: [
                "Social Media",
                "Content Creation",
                "Canva",
                "Analytics",
              ],
              payType: "monthly",
              payMin: 8000,
              payMax: 12000,
              city: "Kolkata",
              status: "open",
            }),
          ];
        case 13:
          job3 = _a.sent();
          console.log("\u2705 MongoDB demo jobs created");
          // ---------- DEMO APPLICATIONS (MONGODB) ----------
          return [
            4 /*yield*/,
            application_model_1.default.create([
              {
                jobId: job1._id,
                applicantId: demoUser.id,
                coverNote: "I have 2+ years of React experience.",
                expectedPay: 35000,
                status: "shortlisted",
              },
              {
                jobId: job2._id,
                applicantId: user3.id,
                coverNote: "Brand identity is my specialty!",
                expectedPay: 12000,
                status: "pending",
              },
              {
                jobId: job1._id,
                applicantId: user4.id,
                coverNote: "I have experience building React components.",
                expectedPay: 20000,
                status: "pending",
              },
            ]),
          ];
        case 14:
          // ---------- DEMO APPLICATIONS (MONGODB) ----------
          _a.sent();
          // Update job applicant count
          return [
            4 /*yield*/,
            job_model_1.default.findByIdAndUpdate(job1._id, {
              $inc: { applicantsCount: 2 },
            }),
          ];
        case 15:
          // Update job applicant count
          _a.sent();
          return [
            4 /*yield*/,
            job_model_1.default.findByIdAndUpdate(job2._id, {
              $inc: { applicantsCount: 1 },
            }),
          ];
        case 16:
          _a.sent();
          console.log("\u2705 MongoDB demo applications created");
          // ---------- SAVED JOBS (MONGODB) ----------
          return [
            4 /*yield*/,
            savedJob_model_1.default.create([
              { userId: demoUser.id, jobId: job2._id },
              { userId: user4.id, jobId: job1._id },
            ]),
          ];
        case 17:
          // ---------- SAVED JOBS (MONGODB) ----------
          _a.sent();
          console.log("\u2705 MongoDB saved jobs created");
          return [
            4 /*yield*/,
            prisma.interview.create({
              data: {
                role: "Frontend Developer",
                level: "mid",
                type: "technical",
                techstack: ["React", "TypeScript", "CSS"],
                questions: [
                  "What is the virtual DOM in React?",
                  "Explain the difference between useMemo and useCallback.",
                ],
                finalized: true,
                userId: demoUser.id,
              },
            }),
          ];
        case 18:
          interview = _a.sent();
          return [
            4 /*yield*/,
            prisma.feedback.create({
              data: {
                interviewId: interview.id,
                userId: demoUser.id,
                totalScore: 78,
                categoryScores: JSON.stringify([
                  { name: "Technical Knowledge", score: 80 },
                ]),
                strengths: ["Strong React fundamentals"],
                areasForImprovement: [
                  "Needs deeper CSS architecture knowledge",
                ],
                finalAssessment: "Good overall performance.",
              },
            }),
          ];
        case 19:
          _a.sent();
          console.log("\n🎉 Seeding complete! Demo credentials:");
          console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
          console.log("📧 demo@jobvue.com  / 🔑 demo1234");
          console.log("📧 poster@jobvue.com / 🔑 poster1234");
          console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
          return [2 /*return*/];
      }
    });
  });
}
main()
  .then(function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, prisma.$disconnect()];
          case 1:
            _a.sent();
            return [4 /*yield*/, mongoose_1.default.disconnect()];
          case 2:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  })
  .catch(function (e) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            console.error("❌ Seed error:", e);
            return [4 /*yield*/, prisma.$disconnect()];
          case 1:
            _a.sent();
            return [4 /*yield*/, mongoose_1.default.disconnect()];
          case 2:
            _a.sent();
            process.exit(1);
            return [2 /*return*/];
        }
      });
    });
  });
