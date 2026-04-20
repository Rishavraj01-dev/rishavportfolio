import { Bot, MessageSquare, Send, Sparkles, User, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { blogs } from "@/lib/blogs";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const quickPrompts = [
  "Show all projects",
  "Tech stack summary",
  "Latest blogs",
  "How to contact?",
];

const STOP_WORDS = new Set([
  "the", "and", "for", "are", "with", "this", "that", "from", "your", "about",
  "into", "have", "what", "when", "where", "which", "how", "can", "you", "please",
  "tell", "show", "give", "want", "need", "all", "any", "more", "me", "to", "of",
  "is", "in", "on", "at", "or", "it", "as", "an", "a", "by",
]);

const SITE_TOPICS = [
  {
    id: "about",
    title: "About",
    route: "/about",
    content:
      "Rishav Raj is a full-stack developer focused on fast interfaces, scalable architecture, automation, and practical execution.",
  },
  {
    id: "experience",
    title: "Experience",
    route: "/#experience",
    content:
      "Current role: Full Stack Developer at Ultimate ITech since January 2026. Building job portal and ERP features across frontend, backend, and data workflows.",
  },
  {
    id: "stack",
    title: "Tech Stack",
    route: "/#stack",
    content:
      "Frontend: React.js, Tailwind CSS. Backend: Node.js, Express.js, FastAPI, Flask. Databases: MongoDB, Supabase. AI/ML: NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch. Tools: Git, GitHub, Vercel, Netlify.",
  },
  {
    id: "contact",
    title: "Contact",
    route: "/#contact",
    content:
      "Email contact is rishavraj5999@gmail.com. Use the START A PROJECT / INITIATE call-to-action in the website contact section.",
  },
  {
    id: "project-hhh",
    title: "HHH Jobs",
    route: "/#projects",
    content:
      "HHH Jobs is a scalable full-stack job portal with multi-role dashboards, ATS workflows, resume builder, and secure authentication.",
  },
  {
    id: "project-curebridge",
    title: "CureBridge",
    route: "/#projects",
    content:
      "CureBridge is a healthcare coordination platform with case submission, advisor and hospital matching, role-based dashboards, and case tracking.",
  },
  {
    id: "project-ai-assistant",
    title: "AI Assistant",
    route: "/#projects",
    content:
      "A Python-based AI assistant project for intelligent task execution, prompt workflows, and automation routines via API integrations.",
  },
  {
    id: "project-property-mart",
    title: "Property Mart",
    route: "/#projects",
    content:
      "Property Mart is a full-stack real estate platform for listing workflows, discovery, and scalable buyer-seller interactions.",
  },
];

const PROJECT_KEYWORDS: Record<string, string[]> = {
  "HHH Jobs": ["hhh", "job portal", "jobs", "ats", "resume builder"],
  CureBridge: ["curebridge", "healthcare", "medical tourism", "hospital", "patient"],
  "AI Assistant": ["ai assistant", "assistant project", "python automation", "fastapi assistant"],
  "Property Mart": ["property mart", "real estate", "property", "listing platform"],
};

function normalize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function tokenize(text: string) {
  return normalize(text)
    .split(" ")
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

function scoreMatch(queryTokens: string[], content: string) {
  if (!queryTokens.length) return 0;
  const normalizedContent = normalize(content);
  let score = 0;
  for (const token of queryTokens) {
    if (normalizedContent.includes(token)) score += 1;
  }
  return score;
}

function findMatchingBlog(query: string) {
  const normalized = normalize(query);
  return blogs.find((blog) => {
    const corpus = normalize(
      [
        blog.title,
        blog.slug,
        ...blog.intro,
        ...blog.sections.map((section) => section.heading),
        ...blog.sections.flatMap((section) => section.bullets ?? []),
      ].join(" ")
    );
    return scoreMatch(tokenize(normalized), corpus) >= 2;
  });
}

function getProjectReply(query: string) {
  const normalized = normalize(query);

  const specificProject = Object.entries(PROJECT_KEYWORDS).find(([, keys]) =>
    includesAny(normalized, keys)
  );

  if (specificProject) {
    const [projectName] = specificProject;
    const topic = SITE_TOPICS.find((item) => item.title === projectName);
    if (topic) {
      return `${topic.content} View: ${topic.route}`;
    }
  }

  return "Featured projects: HHH Jobs, CureBridge, AI Assistant, and Property Mart. Ask me about any one project for details, tech stack, and use-case.";
}

function getBlogReply(query: string) {
  const normalized = normalize(query);
  const wantsList = includesAny(normalized, ["all", "list", "latest", "show", "blogs", "articles", "writing"]);

  if (wantsList) {
    const lines = blogs
      .slice(0, 3)
      .map((blog, index) => `${index + 1}. ${blog.title} (${blog.readTime})`)
      .join(" ");
    return `Current writing pieces: ${lines} Open from Writing section: /#insights`;
  }

  const matchedBlog = findMatchingBlog(query);
  if (matchedBlog) {
    return `${matchedBlog.title} - ${matchedBlog.intro[0]} Read here: /blog/${matchedBlog.slug}`;
  }

  return "I can help with blog recommendations too. Ask like: 'show ERP article', 'AI resume analyzer blog', or 'latest blogs'.";
}

function getSearchReply(query: string) {
  const tokens = tokenize(query);
  const ranked = SITE_TOPICS.map((topic) => ({
    topic,
    score: scoreMatch(tokens, `${topic.title} ${topic.content}`),
  }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    return "I can answer questions about projects, skills, experience, blogs, about page, and contact details. Try asking: 'what stack is used in this portfolio?'";
  }

  const best = ranked[0].topic;
  return `${best.content} Check section: ${best.route}`;
}

function getAssistantReply(input: string) {
  const text = normalize(input);

  if (includesAny(text, ["hi", "hello", "hey"])) {
    return "Hi! I can guide you through this entire portfolio. Ask me about projects, experience, tech stack, blogs, or contact details.";
  }

  if (includesAny(text, ["project", "portfolio work", "case study", "hhh", "curebridge", "property", "assistant"])) {
    return getProjectReply(text);
  }

  if (includesAny(text, ["experience", "job", "company", "ultimate itech", "role"])) {
    return "Experience: Full Stack Developer at Ultimate ITech (JAN 2026 - PRESENT). Work includes job portal and ERP features across frontend, backend, and data workflows. View: /#experience";
  }

  if (includesAny(text, ["blog", "writing", "article", "post"])) {
    return getBlogReply(text);
  }

  if (includesAny(text, ["skill", "stack", "tech", "technology", "tools"])) {
    return "Tech stack includes React.js, Tailwind CSS, Node.js, Express.js, Supabase, Python, FastAPI, Flask, and AI/ML libraries like Scikit-learn, TensorFlow, and PyTorch. View: /#stack";
  }

  if (includesAny(text, ["about", "who", "intro", "profile"])) {
    return "Rishav Raj is a full-stack developer focused on performance, clean architecture, automation, and practical product delivery. View full details: /about";
  }

  if (includesAny(text, ["contact", "email", "hire", "reach", "connect"])) {
    return "You can contact via rishavraj5999@gmail.com or use the START A PROJECT section on the website. Jump: /#contact";
  }

  return getSearchReply(text);
}

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I am your portfolio assistant. I can answer questions about this entire website: projects, stack, experience, blogs, about, and contact.",
    },
  ]);

  const assistantHints = useMemo(() => quickPrompts.slice(0, 4), []);

  useEffect(() => {
    if (!isOpen) return;
    const container = messagesContainerRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight;
    });
  }, [messages, isOpen]);

  const submitMessage = (message: string) => {
    const trimmed = message.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { role: "user", content: trimmed },
      { role: "assistant", content: getAssistantReply(trimmed) },
    ]);
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitMessage(input);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-x-3 bottom-20 top-18 z-[80] flex max-h-[calc(100dvh-6.5rem)] flex-col border border-white/10 bg-background/95 shadow-2xl backdrop-blur-xl sm:inset-x-4 sm:bottom-24 sm:top-20 md:inset-x-auto md:bottom-28 md:right-8 md:top-auto md:max-h-[min(42rem,calc(100vh-9rem))] md:w-[24rem]">
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-3 sm:px-4 sm:py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">AI Assistant</p>
                <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px] sm:tracking-[0.18em]">
                  Portfolio Guide
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground transition-colors hover:text-white"
              aria-label="Close assistant"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={messagesContainerRef}
            className="flex-1 space-y-4 overflow-y-auto px-3 py-3 sm:px-4 sm:py-4"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[88%] px-3 py-2.5 text-sm leading-6 sm:max-w-[85%] sm:px-4 sm:py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-white/10 bg-white/[0.03] text-muted-foreground"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 px-3 py-3 sm:px-4 sm:py-4">
            <div className="mb-3 flex flex-wrap gap-2 sm:mb-4">
              {assistantHints.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => submitMessage(prompt)}
                  className="border border-primary/25 px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-[0.12em] text-primary transition-colors hover:bg-primary/10 sm:px-3 sm:py-2 sm:text-[11px] sm:tracking-[0.16em]"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about projects, blogs, or contact"
                className="h-11 min-w-0 flex-1 border border-white/10 bg-white/[0.03] px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40 sm:h-12 sm:px-4"
              />
              <button
                type="submit"
                className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-transform hover:scale-[1.03] sm:h-12 sm:w-12"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-3 text-[11px] text-muted-foreground sm:mt-4 sm:text-xs">
              Need full details? Visit the{" "}
              <Link href="/#insights" className="text-primary hover:text-white">
                Writing
              </Link>{" "}
              or{" "}
              <Link href="/#contact" className="text-primary hover:text-white">
                Contact
              </Link>{" "}
              section.
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="fixed bottom-4 right-3 z-[80] flex items-center gap-2 border border-primary/30 bg-background/85 px-3 py-2.5 text-[11px] font-mono uppercase tracking-[0.12em] text-primary shadow-lg backdrop-blur-xl transition-colors hover:border-primary hover:bg-primary/10 hover:text-white sm:bottom-6 sm:right-4 sm:gap-3 sm:px-4 sm:py-3 sm:text-sm sm:tracking-[0.18em] md:bottom-8 md:right-8"
        aria-label="Open AI assistant"
      >
        <MessageSquare className="h-4 w-4" />
        AI Assistant
      </button>
    </>
  );
}
