import { SlideImage, SpecItem, DesignFeature, EngineeringInnovation, GalleryItem, WhyNovarexItem } from '../types';

import heroImg from '../assets/images/hero_hypercar_1785576913617.jpg';
import sideImg from '../assets/images/side_profile_1785576927726.jpg';
import rearImg from '../assets/images/rear_view_1785576940530.jpg';
import interiorImg from '../assets/images/interior_cockpit_1785576953821.jpg';
import detailImg from '../assets/images/detail_shot_1785576969140.jpg';
import windTunnelImg from '../assets/images/wind_tunnel_aero_1785583025972.jpg';
import cfdAirflowImg from '../assets/images/cfd_airflow_1785583041653.jpg';

export const HERO_SLIDES: SlideImage[] = [
  {
    id: 'hero-1',
    title: 'NOVAREX SPEC-ONE',
    subtitle: 'THE PINNACLE OF HYPERCAR AUTOMOTIVE ARTISTRY',
    url: heroImg,
    tag: 'EXCLUSIVITY 1 OF 25'
  },
  {
    id: 'hero-2',
    title: 'AERODYNAMIC SILHOUETTE',
    subtitle: 'FORM SCULPTED ENTIRELY BY AIRFLOW & VELOCITY',
    url: windTunnelImg,
    tag: 'DRAG COEFFICIENT 0.28'
  },
  {
    id: 'hero-3',
    title: 'SIGNATURE REAR ARCHITECTURE',
    subtitle: 'ACTIVE DIFFUSER & FLUID LIGHT EMBEDDINGS',
    url: rearImg,
    tag: 'ACTIVE AERO DOWNFORCE 1200KG'
  },
  {
    id: 'hero-4',
    title: 'MONOCOQUE COCKPIT',
    subtitle: 'HANDCRAFTED LEATHER & TITANIUM INTERFACE',
    url: interiorImg,
    tag: 'FULL CARBON ARCHITECTURE'
  }
];

export const PERFORMANCE_SPECS: SpecItem[] = [
  {
    id: 'top-speed',
    value: '420',
    unit: 'KM/H',
    numericValue: 420,
    label: 'TOP SPEED',
    description: 'Electronically validated velocity on closed circuit telemetry.'
  },
  {
    id: 'acceleration',
    value: '2.1',
    unit: 'SEC',
    numericValue: 2.1,
    label: '0–100 KM/H',
    description: 'Instantaneous launch vector via dual-motor axial flux torque.'
  },
  {
    id: 'horse-power',
    value: '1600',
    unit: 'HP',
    numericValue: 1600,
    label: 'PEAK POWER',
    description: 'Quad-turbocharged hybrid V12 powertrain architecture.'
  },
  {
    id: 'peak-torque',
    value: '1700',
    unit: 'NM',
    numericValue: 1700,
    label: 'MAX TORQUE',
    description: 'Continuous vectoring torque delivered across all four wheels.'
  }
];

export const DESIGN_FEATURES: DesignFeature[] = [
  {
    id: 'aerodynamics',
    title: 'ACTIVE AERODYNAMICS',
    subtitle: 'Sculpted By Velocity & Wind Tunnel Testing',
    description: 'Every intake and body contour is engineered in full-scale wind tunnels with laser smoke visualization, funnelling wind effortlessly to generate 1,200 kg of downforce at peak velocity.',
    imageUrl: windTunnelImg,
    details: [
      'Dual-Stage Active Rear Wing & Air Brake Matrix',
      'Wind Tunnel Laser Smoke Streamline Testing',
      'Underbody Venturi Downforce Channels'
    ]
  },
  {
    id: 'carbon-fiber',
    title: 'CARBON FIBER MONOCOQUE',
    subtitle: 'Structural Precision',
    description: 'Constructed using aerospace-grade T1100 carbon fiber weaving. The single-piece tub weighs under 98kg while offering unmatched torsional rigidity.',
    imageUrl: detailImg,
    details: [
      'Aero-grade T1100 Carbon Weave',
      'Integrated Rollover Protection Structure',
      'Dry Weight: 98 kg Monocoque'
    ]
  },
  {
    id: 'handcrafted-luxury',
    title: 'HANDCRAFTED LUXURY',
    subtitle: 'Bespoke European Artistry',
    description: 'Inside the cabin, raw machined titanium meets Italian aniline leather. Uncompromising tactile control with zero artificial touchscreens.',
    imageUrl: interiorImg,
    details: [
      'Bespoke Aniline Leather & Alcantara',
      'Hand-milled Billet Titanium Knobs',
      'Acoustically Isolated Cabin Shell'
    ]
  },
  {
    id: 'precision-engineering',
    title: 'PRECISION ENGINEERING',
    subtitle: 'Zero Tolerance Standards',
    description: 'Manufactured in our ultra-modern facility with laser tolerances measured down to 0.002 millimeters.',
    imageUrl: cfdAirflowImg,
    details: [
      'Micron-Level Laser Alignment',
      'CFD Airflow Boundary Layer Simulation',
      'Individual Chassis Telemetry Signoff'
    ]
  }
];

export const ENGINEERING_INNOVATIONS: EngineeringInnovation[] = [
  {
    id: 'adaptive-aero',
    title: 'ADAPTIVE AERODYNAMICS',
    shortDesc: 'Dynamic surface actuation responding in 12 milliseconds.',
    fullDesc: 'Using real-time wind speed sensors, the rear wing and front diffuser flaps continuously morph geometry to maintain optimal balance in high-speed cornering.',
    iconName: 'Wind',
    highlightStat: '1,200 KG DOWNFORCE'
  },
  {
    id: 'ai-performance',
    title: 'AI PERFORMANCE OPTIMIZATION',
    shortDesc: 'Neural telemetry monitoring tire slip and energy flow.',
    fullDesc: 'On-board neural processing algorithms predict grip loss 200 milliseconds before it occurs, seamlessly adjusting torque vectoring for maximum cornering velocity.',
    iconName: 'Cpu',
    highlightStat: '10,000 CALCULATIONS/SEC'
  },
  {
    id: 'carbon-chassis',
    title: 'CARBON FIBER CHASSIS',
    shortDesc: 'Ultra-lightweight structural core with titanium inserts.',
    fullDesc: 'Forged carbon structural elements combined with 3D-printed titanium suspension nodes deliver 55,000 Nm/degree of torsional stiffness.',
    iconName: 'Layers',
    highlightStat: '55,000 NM/DEG RIGIDITY'
  },
  {
    id: 'active-suspension',
    title: 'ACTIVE SUSPENSION',
    shortDesc: 'Magnetorheological dampeners with pitch compensation.',
    fullDesc: 'Millisecond-response fluid dampeners read the road surface 1,000 times per second, completely eliminating body roll during high-G maneuvers.',
    iconName: 'Activity',
    highlightStat: '1,000 HZ SAMPLING'
  },
  {
    id: 'intelligent-modes',
    title: 'INTELLIGENT DRIVE MODES',
    shortDesc: 'Four distinct calibrations from Stealth to Corsa track mode.',
    fullDesc: 'Transform character at the flick of a titanium dial. Switch from pure electric zero-emission boulevard cruiser to 1600 HP track beast in milliseconds.',
    iconName: 'Zap',
    highlightStat: '4 DRIVE ARCHITECTURES'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Wind Tunnel Laser Smoke Aerodynamics Testing',
    category: 'Aerodynamics',
    imageUrl: windTunnelImg,
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'gal-2',
    title: 'Carbon Monocoque & Wheel Detail',
    category: 'Details',
    imageUrl: detailImg,
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'gal-3',
    title: 'Front Splitter CFD Airflow Streamlines',
    category: 'Aerodynamics',
    imageUrl: cfdAirflowImg,
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'gal-4',
    title: 'Hand-Crafted Titanium Cockpit',
    category: 'Interior',
    imageUrl: interiorImg,
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'gal-5',
    title: 'Matte Titanium Aerodynamic Silhouette',
    category: 'Exterior',
    imageUrl: sideImg,
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'gal-6',
    title: 'NOVAREX Showroom Stance',
    category: 'Exterior',
    imageUrl: heroImg,
    aspect: 'aspect-[4/3]'
  },
  {
    id: 'gal-7',
    title: 'Continuous LED Tail Light Arch',
    category: 'Exterior',
    imageUrl: rearImg,
    aspect: 'aspect-[16/9]'
  },
  {
    id: 'gal-8',
    title: 'Underbody Venturi Downforce Diffuser',
    category: 'Aerodynamics',
    imageUrl: windTunnelImg,
    aspect: 'aspect-[4/3]'
  }
];

export const WHY_NOVAREX: WhyNovarexItem[] = [
  {
    id: 'why-1',
    title: 'European Craftsmanship',
    description: 'Hand-assembled in limited production runs by master artisans with decades of motorsport heritage.',
    iconName: 'Crown',
    stat: '1 OF 25 WORLDWIDE'
  },
  {
    id: 'why-2',
    title: 'Precision Manufacturing',
    description: 'Every component is machined from solid blocks of aerospace titanium and carbon composites.',
    iconName: 'Compass',
    stat: '0.002 MM TOLERANCE'
  },
  {
    id: 'why-3',
    title: 'Luxury Interior',
    description: 'Custom ergonomics tailored to your exact seating posture and driving style with bespoke materials.',
    iconName: 'Sparkles',
    stat: '100% BESPOKE'
  },
  {
    id: 'why-4',
    title: 'Innovative Technology',
    description: 'Proprietary hybrid telemetry, active aerodynamics, and neural stability systems.',
    iconName: 'Shield',
    stat: 'PATENTED TECH'
  },
  {
    id: 'why-5',
    title: 'Performance Without Compromise',
    description: 'Unrivaled acceleration and extreme high-speed track capability paired with refined road comfort.',
    iconName: 'Flame',
    stat: '1600 HP POWER'
  }
];

export const EDITIONS = [
  {
    name: 'NOVAREX SPEC-ONE TITANIUM',
    price: '€4,800,000',
    highlight: 'Matte Titanium finish, exposed carbon fiber wings, titanium exhaust manifold.'
  },
  {
    name: 'NOVAREX CORSA CARBON EDITION',
    price: '€5,200,000',
    highlight: 'Full exposed carbon fiber weave body, track-tuned active aero, ceramic matrix brakes.'
  },
  {
    name: 'NOVAREX MIDNIGHT STEALTH',
    price: '€5,500,000',
    highlight: 'Smoked carbon finish, dark titanium accents, black aniline leather interior.'
  }
];
