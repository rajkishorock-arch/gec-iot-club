import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  ExternalLink, 
  Search, 
  FileCode, 
  Cpu, 
  Radio, 
  Layers,
  ArrowRight,
  Terminal
} from 'lucide-react';
import { projectDocs } from '../data/mockData';

const ProjectsDocsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Microcontrollers', 'Protocols', 'Wireless', 'Edge AI'];

  const filteredDocs = projectDocs.filter(doc => {
    const matchesCat = activeCategory === 'All' || doc.category === activeCategory;
    const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase()) || 
                          doc.description.toLowerCase().includes(search.toLowerCase()) ||
                          doc.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Knowledge Base & Technical Schematics</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Projects & Documentation Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Access open-source code repositories, circuit schematics, hardware datasheets, and step-by-step guides authored by GEC Khagaria engineers.
        </p>

        {/* Search & Categories */}
        <div className="pt-4 space-y-4 max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search guides, pinouts, MQTT, LoRa, ESP32..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900/60 text-slate-400 border border-white/5 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Docs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDocs.map((doc) => (
          <div 
            key={doc.id}
            className="glass-panel rounded-2xl p-7 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {doc.category}
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  {doc.badge}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {doc.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {doc.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {doc.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-slate-400 border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Format: PDF & Markdown Schematics
              </span>
              <a 
                href={doc.link} 
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading official documentation: ${doc.title}`);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Read & Download</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Code Snippet Preview (Interactive Terminal) */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 bg-slate-950">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-white">
              quickstart_esp32_mqtt.ino
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">C++ / Arduino Core</span>
        </div>

        <pre className="text-xs font-mono text-slate-300 overflow-x-auto p-4 rounded-xl bg-slate-900/90 leading-relaxed border border-white/5">
{`#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "GEC_CAMPUS_WIFI";
const char* mqtt_server = "192.168.1.100"; // GEC IoT Lab Local Broker

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, "password");
  while (WiFi.status() != WL_CONNECTED) delay(500);
  client.setServer(mqtt_server, 1883);
}

void loop() {
  if (!client.connected()) reconnect();
  client.loop();
  float temperature = analogRead(A0) * (3.3 / 4095.0) * 100.0;
  client.publish("gec/lab/telemetry", String(temperature).c_str());
  delay(2000);
}`}
        </pre>
      </div>

    </div>
  );
};

export default ProjectsDocsPage;
