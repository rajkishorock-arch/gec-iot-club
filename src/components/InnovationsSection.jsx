import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import { Cpu, Radio, Terminal, Bot, Sparkles, Search, Layers, ShieldCheck, Activity, ChevronRight } from 'lucide-react';

export const InnovationsSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const focusAreas = [
    {
      id: 'edge-ai',
      badge: 'EDGE AI & TINYML',
      badgeColor: 'bg-orange-500/10 text-[#FF8918] border-orange-500/30',
      title: 'Autonomous Edge Systems & TinyML',
      description: 'Architect, quantize, and deploy ultra-low-power machine learning inference models directly on ESP32 and ARM Cortex-M4 microcontrollers without cloud dependency.',
      points: [
        'TensorFlow Lite for Microcontrollers & Edge Impulse pipelines',
        'On-device acoustic & vibration anomaly detection for industrial gearboxes',
        'Real-time multi-sensor fusion with extended Kalman filtering (EKF)'
      ],
      icon: Cpu,
      mockupTitle: 'Edge Intelligence & Sensor Fusion',
      mockupItems: [
        {
          title: 'INT8 Quantized Neural Classifier',
          desc: 'Runs at 45ms inference latency consuming < 80mA power',
          icon: Layers,
          color: 'text-[#00BFFB]'
        },
        {
          title: 'Autonomous Failover & Telemetry Loop',
          desc: 'Self-healing local decisions during campus internet dropouts',
          icon: ShieldCheck,
          color: 'text-[#FF8918]'
        },
        {
          title: 'Real-Time Vibration & Thermal Analytics',
          desc: 'Industrial predictive maintenance for campus power transformers',
          icon: Activity,
          color: 'text-emerald-400'
        }
      ]
    },
    {
      id: 'lorawan',
      badge: 'LONG RANGE TELEMETRY',
      badgeColor: 'bg-cyan-500/10 text-[#00BFFB] border-cyan-500/30',
      title: 'Industrial IoT & LoRaWAN Networks',
      description: 'Deploy long-range, low-power telemetry networks spanning 15+ km across Khagaria district for autonomous environmental sensing and river flood monitoring.',
      points: [
        'Private ChirpStack 868MHz LoRaWAN gateway stationed on Academic Block',
        'AES-128 end-to-end hardware-level encrypted packet transmission',
        'Deep sleep power states yielding 3+ year battery life on solar supercapacitors'
      ],
      icon: Radio,
      mockupTitle: 'LoRaWAN Long-Range Transceiver Hub',
      mockupItems: [
        {
          title: 'Sub-GHz 868MHz LoRa Transceiver',
          desc: 'Up to 15.4 km verified line-of-sight signal coverage',
          icon: Radio,
          color: 'text-[#00BFFB]'
        },
        {
          title: 'Packet Payload Encryption (AES-128)',
          desc: 'Military-grade cryptographic integrity verified by Club node',
          icon: ShieldCheck,
          color: 'text-[#FF8918]'
        },
        {
          title: 'Autonomous River Level Telemetry',
          desc: 'Alerts sent to district administration dashboard in < 400ms',
          icon: Activity,
          color: 'text-emerald-400'
        }
      ]
    },
    {
      id: 'freertos',
      badge: 'FIRMWARE & RTOS',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      title: 'Embedded C, RTOS & Firmware Architecture',
      description: 'Master deterministic preemptive multitasking, direct register-level peripheral control, and fail-safe over-the-air (OTA) bootloaders.',
      points: [
        'FreeRTOS task scheduling with mutexes, queues, and software timers',
        'DMA (Direct Memory Access) transfers for zero-copy high-speed SPI/I2C',
        'Dual-bank A/B flash partitioning for bulletproof remote firmware rollbacks'
      ],
      icon: Terminal,
      mockupTitle: 'Deterministic RTOS Kernel Console',
      mockupItems: [
        {
          title: 'Preemptive Multi-threaded Scheduling',
          desc: '1ms tick rate ensuring hard real-time sensor sampling',
          icon: Terminal,
          color: 'text-purple-400'
        },
        {
          title: 'Zero-Copy Ring Buffer & DMA Pipelines',
          desc: 'High-throughput UART/SPI streaming without CPU stall',
          icon: Layers,
          color: 'text-[#00BFFB]'
        },
        {
          title: 'Dual-Partition Secure OTA Bootloader',
          desc: 'Automatic rollback if cryptographic checksum verification fails',
          icon: ShieldCheck,
          color: 'text-emerald-400'
        }
      ]
    },
    {
      id: 'robotics',
      badge: 'AUTONOMOUS SYSTEMS',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      title: 'Robotics, Telemetry Drones & Rovers',
      description: 'Design custom PCB flight controllers, LiDAR obstacle avoidance rovers, and automated robotic arms for precision agricultural harvesting.',
      points: [
        'Custom 4-layer PCB design using KiCad with impedance-matched RF traces',
        'ROS 2 (Robot Operating System) nodes running on Raspberry Pi CM4',
        'Waypoint autonomous navigation with RTK GPS (centimeter-level accuracy)'
      ],
      icon: Bot,
      mockupTitle: 'Autonomous Rover & Drone Hub',
      mockupItems: [
        {
          title: 'Centimeter-Level RTK GPS Navigation',
          desc: 'Autonomous field mapping and precision soil scanning',
          icon: Bot,
          color: 'text-emerald-400'
        },
        {
          title: 'LiDAR 2D Obstacle Mapping',
          desc: 'Dynamic obstacle collision avoidance at 12Hz frame rate',
          icon: Layers,
          color: 'text-[#00BFFB]'
        },
        {
          title: 'Telemetry Teleoperation over 4G/LTE',
          desc: 'Live telemetry broadcast to student dashboard control panel',
          icon: Activity,
          color: 'text-[#FF8918]'
        }
      ]
    }
  ];

  return (
    <section className="relative w-full py-16 sm:py-24 bg-black overflow-hidden font-['General_Sans',sans-serif]">
      
      {/* Ambient background glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full blur-[160px] opacity-15 pointer-events-none"
        style={{ background: '#00BFFB' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        
        {/* Title with Signature Beam Animation */}
        <SectionTitle 
          title="IoT & Embedded Innovations"
          subtitle="Explore our core technical focus areas spanning edge intelligence, low-power telemetry, real-time embedded systems, and robotics."
        />

        {/* Focus Area Pill Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-8 sm:my-12">
          {focusAreas.map((area, idx) => (
            <button
              key={area.id}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === idx
                  ? 'bg-white/15 text-white border border-white/30 shadow-[0_0_20px_rgba(0,191,251,0.25)]'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              <area.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeTab === idx ? 'text-[#00BFFB]' : 'text-white/40'}`} />
              <span>{area.title.split('&')[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Stacking Display Card with Rotating Conic Glow */}
        {(() => {
          const item = focusAreas[activeTab];
          return (
            <div className="relative p-[1.5px] rounded-3xl overflow-hidden shadow-[0_-15px_40px_rgba(0,0,0,0.95),0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(0,191,251,0.15)] group transition-all duration-500">
              
              {/* Rotating Conic Rainbow Border */}
              <div 
                className="absolute -inset-[150%] origin-center pointer-events-none animate-spin-slow opacity-60"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0deg, #FF8918 45deg, #DA4E24 95deg, transparent 155deg, #00BFFB 225deg, #0098F3 275deg, transparent 335deg)',
                  animationDuration: '10s'
                }}
              />

              {/* Inside Card Body */}
              <div className="relative w-full rounded-3xl bg-[#030712] border border-white/10 p-6 sm:p-10 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Column: Details & Checklist */}
                  <div className="lg:col-span-6 space-y-6">
                    <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider border ${item.badgeColor}`}>
                      {item.badge}
                    </span>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>

                    {/* 3-Point Checklist with Sparkle Icons */}
                    <div className="space-y-3.5 pt-2">
                      {item.points.map((pt, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#00BFFB]/15 border border-[#00BFFB]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Sparkles className="w-3 h-3 text-[#00BFFB]" />
                          </div>
                          <span className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                            {pt}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <button 
                        onClick={() => {
                          const el = document.getElementById('events');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#00BFFB] hover:text-white transition-colors group/btn"
                      >
                        <span>Explore active hardware workshops in this track</span>
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Exact Mockup Terminal / Visual Card */}
                  <div className="lg:col-span-6">
                    <div className="rounded-2xl bg-black/80 border border-white/15 p-5 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                      
                      {/* Search Pill Header */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 mb-5">
                        <div className="flex items-center gap-2.5">
                          <item.icon className="w-4 h-4 text-[#00BFFB]" />
                          <span className="text-xs sm:text-[13px] font-mono text-white/80 font-medium">
                            {item.mockupTitle}
                          </span>
                        </div>
                        <Search className="w-4 h-4 text-white/40" />
                      </div>

                      {/* Mockup Items */}
                      <div className="space-y-3">
                        {item.mockupItems.map((mItem, mIdx) => (
                          <div 
                            key={mIdx}
                            className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-all flex items-start gap-3.5 group/item"
                          >
                            <div className="w-9 h-9 rounded-lg bg-black border border-white/10 flex items-center justify-center flex-shrink-0 group-hover/item:scale-105 transition-transform shadow-inner">
                              <mItem.icon className={`w-4 h-4 ${mItem.color}`} />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                                {mItem.title}
                              </h4>
                              <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed font-mono">
                                {mItem.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Status Indicator */}
                      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Hardware Lab Status: Operational</span>
                        </div>
                        <span>GEC Khagaria Node #01</span>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

            </div>
          );
        })()}

      </div>
    </section>
  );
};

export default InnovationsSection;
