export const mockStatements = {
  "hardware": [
    { 
      id: "Track 1", 
      title: "Battery Zero", 
      problem: "Remote sensor networks deployed in extreme or isolated locations (such as forests, glaciers, and pipelines) stop functioning the moment their energy cells deplete. Due to geographic remoteness and harsh conditions, physically reaching these sites to conduct periodic battery replacements is logistically unfeasible, dangerous, or prohibitively expensive.",
      easy: "Remote sensor networks deployed in extreme or isolated locations (such as forests, glaciers, and pipelines) stop functioning the moment their energy cells deplete.",
      challenge: "How can we design an embedded hardware architecture that harvests ambient energy (such as mechanical vibration, thermal gradients, RF energy, or solar radiation) and intelligently duty-cycles computational and sensing workloads so the node theoretically sustains indefinite operation without ever requiring a battery swap?",
      why: "Teams can explore energy-harvesting circuit topologies, power-management IC integration, dynamic sleep profiling, and ultra-low-power firmware logic without having to construct a full field deployment."
    },
    { 
      id: "Track 2", 
      title: "The Silent Saboteur", 
      problem: "Counterfeit, cloned, and maliciously tampered integrated circuits are increasingly infiltrating global electronics supply chains. In critical hardware deployments, malicious logic or micro-architectural modifications can be baked directly into the silicon or PCB substrate, bypassing standard software-level security scans unnoticed.",
      easy: "Counterfeit, cloned, and maliciously tampered integrated circuits are increasingly infiltrating global electronics supply chains.",
      challenge: "How can we develop a robust, hardware-level verification scheme that enables an embedded system to cryptographically prove its own physical authenticity and silicon integrity before being granted network or system access?",
      why: "Participants can design theoretical frameworks utilizing Physical Unclonable Functions (PUFs), hardware watermarking, cryptographic board attestation, or non-destructive silicon fingerprinting."
    },
    { 
      id: "Track 3", 
      title: "One Board, Infinite Selves", 
      problem: "Traditional printed circuit boards are fixed in functionality the moment traces are chemically etched and components soldered. When application requirements pivot, organizations are forced to undergo costly and time-intensive board revision and fabrication cycles.",
      easy: "Traditional printed circuit boards are fixed in functionality the moment traces are chemically etched and components soldered.",
      challenge: "How can we conceptualize an adaptable, self-reconfiguring embedded hardware platform that dynamically alters its interconnects and routing to serve fundamentally different application roles—such as operating as a low-power environmental monitor one day and morphing into a multi-axis motor controller the next?",
      why: "Encourages architectural innovation across programmable crossbar interconnects, modular bus daughterboards, or hybrid FPGA-microcontroller arrangements without demanding fabrication resources."
    },
    { 
      id: "Track 4", 
      title: "Ghost in the Machine", 
      problem: "Embedded electronics operating in high-reliability automotive, aerospace, and industrial settings frequently experience silent physical degradation. Components often exhibit microscopic physical anomalies long before catastrophic functional failure occurs, but detecting these early signs remains challenging.",
      easy: "Embedded electronics operating in high-reliability automotive, aerospace, and industrial settings frequently experience silent physical degradation.",
      challenge: "How can we implement lightweight, on-chip or on-board edge-sensing and anomaly-detection techniques that allow a microcontroller to monitor its own component health, predict impending hardware failure, and enact fail-safe fallbacks in real time?",
      why: "Students can examine physical degradation indicators—including high-frequency current signatures, acoustic/vibration spectra, and junction thermal drift—combining signal analysis with practical embedded fail-safe logic."
    },
    { 
      id: "Track 5", 
      title: "Whispering Wires", 
      problem: "As the Internet of Things scales toward hundreds of billions of distributed nodes, standard radio communications (Wi-Fi, Bluetooth, cellular) dominate device energy budgets. Active radio transmission often consumes several orders of magnitude more power than all on-board computation combined.",
      easy: "As the Internet of Things scales toward hundreds of billions of distributed nodes, standard radio communications (Wi-Fi, Bluetooth, cellular) dominate device energy budgets.",
      challenge: "How can we reinvent physical-layer embedded communication to enable remote nodes to reliably broadcast telemetry data across substantial distances while operating on near-zero power margins?",
      why: "Offers an open playing field for rethinking transceiver physical layers, passive RF backscattering, sub-threshold radio transceivers, and asynchronous event-driven wake-up receiver topologies."
    },
    { 
      id: "Track 6", 
      title: "The Shape-Shifting Chip", 
      problem: "Developing dedicated application-specific integrated circuits (ASICs) offers tremendous power and speed advantages, but astronomical non-recurring engineering (NRE) costs and mask preparation fees place custom silicon out of reach for small enterprises and academic innovators.",
      easy: "Developing dedicated application-specific integrated circuits (ASICs) offers tremendous power and speed advantages, but astronomical non-recurring engineering (NRE) costs and mask preparation fees place custom silicon out of reach for small enterprises and academic innovators.",
      challenge: "How can we structure an accessible silicon design paradigm or modular hardware platform that empowers small engineering teams to achieve domain-specific acceleration without bearing prohibitive fabrication costs?",
      why: "Participants can propose architectures around Coarse-Grained Reconfigurable Arrays (CGRAs), standardized open-source chiplet interconnect topologies, or automated RISC-V extensions."
    },
    { 
      id: "Track 7", 
      title: "Hardware That Forgets Nothing, Reveals Nothing", 
      problem: "Even with mathematically unbreakable software cryptographic algorithms, physical hardware inadvertently leaks sensitive cryptographic keys and execution paths through side channels such as instantaneous power draw, electromagnetic emissions, and thermal fluctuations.",
      easy: "Even with mathematically unbreakable software cryptographic algorithms, physical hardware inadvertently leaks sensitive cryptographic keys and execution paths through side channels such as instantaneous power draw, electromagnetic emissions, and thermal fluctuations.",
      challenge: "How can we design embedded hardware circuits and PCB layouts that enforce privacy and anti-tamper security directly at the physical layer, making systems inherently immune to side-channel eavesdropping and physical extraction?",
      why: "Allows participants to conceptualize balanced differential logic, active power-rail noise injection, Faraday-shielded layers, and circuit-level masking strategies."
    },
    { 
      id: "Track 8", 
      title: "The Last-Mile Machine", 
      problem: "In remote and rural regions, essential public infrastructure—such as solar water pumps, microgrid switches, and automated irrigation equipment—frequently remains out of service for extended periods not from poor design, but because the local community lacks trained technicians or proprietary diagnostic tools.",
      easy: "In remote and rural regions, essential public infrastructure—such as solar water pumps, microgrid switches, and automated irrigation equipment—frequently remains out of service for extended periods not from poor design, but because the local community lacks trained technicians or proprietary diagnostic tools.",
      challenge: "How can we design an embedded system architecture for infrastructure that is radically serviceable, self-diagnosing, and engineered to guide non-technical community members through troubleshooting and field repairs?",
      why: "Combines social impact with resilient hardware engineering, prompting teams to propose modular swappable blocks, multimodal voice/visual guided indicators, and fool-proof mechanical interlocks."
    },
    { 
      id: "Track 9", 
      title: "Silicon Empathy", 
      problem: "The overwhelming majority of sensor networks measure external environmental variables like temperature, ambient luminance, and humidity, while remaining completely oblivious to the physiological or cognitive load of the human interacting with the system.",
      easy: "The overwhelming majority of sensor networks measure external environmental variables like temperature, ambient luminance, and humidity, while remaining completely oblivious to the physiological or cognitive load of the human interacting with the system.",
      challenge: "How can an embedded device accurately deduce and respond to human physiological or affective states using minimal, privacy-preserving physical sensors, without relying on invasive optical tracking or cloud-based processing?",
      why: "Encourages innovative integration of subtle biometric modalities (capacitive touch profiling, galvanic skin response, micro-vibration analysis) coupled with on-chip edge inference."
    },
    { 
      id: "Track 10", 
      title: "The Vanishing Interface", 
      problem: "Modern embedded devices and consumer IoT products often force users through cumbersome multi-touch menus, companion mobile applications, and constant alerts, creating cognitive fatigue rather than effortless utility.",
      easy: "Modern embedded devices and consumer IoT products often force users through cumbersome multi-touch menus, companion mobile applications, and constant alerts, creating cognitive fatigue rather than effortless utility.",
      challenge: "How can we reinvent common physical interfaces (switches, utility meters, access controls) so that interaction requires zero conscious learning curve and naturally blends into everyday human motion?",
      why: "Pushes the boundaries of human-machine interaction at the embedded edge, giving participants freedom to develop zero-UI interaction models, passive sensing, and intuitive kinetic ergonomics."
    }
  ],
  "iot-aiml": [
    { 
      id: "Track 1", 
      title: "The Wasted Resource", 
      problem: "Large institutions such as colleges, hostels, hospitals and offices consume significant amounts of electricity and water every day. Much of this consumption is influenced by changing human behavior and usage patterns, making it difficult to know where resources are unnecessarily being consumed.",
      easy: "Large institutions such as colleges, hostels, hospitals and offices consume significant amounts of electricity and water every day.",
      challenge: "How can we help institutions understand when, where and why resources are being unnecessarily consumed, and enable them to reduce this waste without negatively affecting the people using these facilities?",
      why: "A team could approach this through monitoring, prediction, behavioral insights, automation, incentives, or a combination of these."
    },
    { 
      id: "Track 2", 
      title: "Before the Breakdown", 
      problem: "Machines and equipment used in factories, laboratories, workshops and institutions can gradually develop problems before they stop functioning. Small changes in temperature, vibration, sound, performance or usage may occur beforehand, but identifying which changes actually matter can be difficult.",
      easy: "Machines and equipment used in factories, laboratories, workshops and institutions can gradually develop problems before they stop functioning.",
      challenge: "How can we help people recognize that a machine may be developing a problem before it becomes a costly failure or causes disruption?",
      why: "Students can explore monitoring, pattern recognition, prediction, anomaly detection, or simple physical sensing without needing to build an industrial-grade predictive-maintenance system."
    },
    { 
      id: "Track 3", 
      title: "Every Drop Matters", 
      problem: "Agriculture depends heavily on water, yet the amount of water required can vary according to the crop, soil, weather and conditions in different parts of a field. Farmers often have to make decisions with incomplete or infrequent information.",
      easy: "Agriculture depends heavily on water, yet the amount of water required can vary according to the crop, soil, weather and conditions in different parts of a field.",
      challenge: "How can we help farmers make better water-management decisions while reducing unnecessary water usage and ensuring that crops receive what they need?",
      why: "Teams could think about soil information, weather data, sensing, prediction, localized decisions, alerts, or automated intervention."
    },
    { 
      id: "Track 4", 
      title: "The Adaptive Campus", 
      problem: "A college campus contains thousands of people using classrooms, laboratories, libraries, cafeterias and other facilities at different times. Yet many campus resources are managed using fixed schedules or manual decisions, even though actual usage changes throughout the day.",
      easy: "A college campus contains thousands of people using classrooms, laboratories, libraries, cafeterias and other facilities at different times.",
      challenge: "How can we make campus facilities respond intelligently to how they are actually being used, while improving efficiency and maintaining a good experience for students and staff?",
      why: "Very relatable to VIT freshers. They can directly observe the problem and propose solutions involving occupancy, environmental conditions, prediction, automation, or resource allocation."
    },
    { 
      id: "Track 5", 
      title: "The Crowded Campus", 
      problem: "Crowding can occur unexpectedly at cafeterias, entrances, corridors, bus stops, event venues and other campus locations. The severity of the problem can change rapidly depending on schedules, events and the movement of people.",
      easy: "Crowding can occur unexpectedly at cafeterias, entrances, corridors, bus stops, event venues and other campus locations.",
      challenge: "How can we help campuses anticipate and manage crowding before it becomes a major inconvenience or safety concern?",
      why: "This is a genuine campus problem and gives students multiple solution paths: predicting demand, monitoring movement, changing schedules, redirecting people, improving resource allocation, etc."
    },
    { 
      id: "Track 6", 
      title: "Where Did I Leave It?", 
      problem: "Students and other users frequently misplace belongings such as bottles, bags, ID cards, books, chargers and electronic devices in shared environments. Finding a lost item can become increasingly difficult as time passes and the item may be moved by someone else.",
      easy: "Students and other users frequently misplace belongings such as bottles, bags, ID cards, books, chargers and electronic devices in shared environments.",
      challenge: "How can we make it significantly easier for people to find, identify or recover misplaced belongings in large shared environments?",
      why: "Extremely understandable to freshers, but still leaves room for interesting ideas involving identification, location, movement history, community assistance, prediction, or physical devices."
    },
    { 
      id: "Track 7", 
      title: "The Right Environment", 
      problem: "The conditions inside a classroom, hostel room, laboratory, office or other indoor space can change throughout the day. Temperature, humidity, air quality, noise and occupancy may all influence how comfortable or suitable a space is for the people using it.",
      easy: "The conditions inside a classroom, hostel room, laboratory, office or other indoor space can change throughout the day.",
      challenge: "How can we help people understand and improve the conditions of indoor spaces while balancing comfort, productivity, energy consumption and the different needs of different users?",
      why: "Freshers can easily understand and investigate the problem. More advanced teams can explore intelligent sensing, prediction and automated control."
    },
    { 
      id: "Track 8", 
      title: "The Food Mismatch", 
      problem: "Cafeterias, hostels and institutional kitchens prepare food based on expected demand. However, the number of people who actually eat, the amount they consume and their food preferences can vary significantly, resulting in both food shortages and unnecessary waste.",
      easy: "Cafeterias, hostels and institutional kitchens prepare food based on expected demand.",
      challenge: "How can we help food providers better match preparation with actual demand while reducing waste and ensuring that people still have sufficient food available?",
      why: "This is a strong ideathon problem because the solution doesn't have to be a prediction model. Teams could rethink ordering, preparation, communication, distribution, scheduling, demand estimation, or waste management."
    },
    { 
      id: "Track 9", 
      title: "Someone Should Know", 
      problem: "Laboratories, storage rooms, equipment areas and other facilities are often left unattended for long periods. Problems such as unusual activity, equipment being left running, environmental changes or unexpected incidents may occur without anyone noticing immediately.",
      easy: "Laboratories, storage rooms, equipment areas and other facilities are often left unattended for long periods.",
      challenge: "How can we ensure that important situations are noticed and communicated to the right person at the right time, even when a facility is unattended?",
      why: "The problem is simple to understand but surprisingly open-ended. Teams need to decide what should be monitored, what constitutes an important event, and who should be notified."
    },
    { 
      id: "Track 10", 
      title: "The Smarter Collection", 
      problem: "Waste and recyclable materials are generated at different rates across campuses, residential areas and public spaces. Fixed collection schedules cannot always account for these changing patterns, resulting in unnecessary collection trips in some locations and overflowing waste in others.",
      easy: "Waste and recyclable materials are generated at different rates across campuses, residential areas and public spaces.",
      challenge: "How can we make waste collection more responsive to actual conditions, while reducing unnecessary trips, operational effort and environmental impact?",
      why: "It is a genuine operational problem with a clear real-world impact. Students can approach it through prediction, monitoring, route planning, demand estimation, user reporting, or combinations of these."
    }
  ],
  "cyber": [
    { 
      id: "Track 1", 
      title: "The Sovereign Self", 
      problem: "As people increasingly depend on digital platforms for education, finance, healthcare, employment, and public services, their personal identities remain fragmented across hundreds of centralized silos. This architecture exposes individuals to massive credential theft, unauthorized impersonation, repetitive and intrusive KYC verification loops, and a near-total loss of agency over their personal attributes.",
      easy: "As people increasingly depend on digital platforms for education, finance, healthcare, employment, and public services, their personal identities remain fragmented across hundreds of centralized silos.",
      challenge: "How might we architect a self-sovereign digital identity (SSI) ecosystem that empowers users to cryptographically verify credentials and authenticate across heterogeneous services without relying on centralized identity providers, while enforcing granular, dynamic control over disclosed data?",
      why: "Teams can conceptualize novel Decentralized Identifiers (DIDs), selective attribute disclosure protocols, biometric key recovery schemas, or zero-knowledge identity wallets without the bottleneck of integrating legacy institutional backends."
    },
    { 
      id: "Track 2", 
      title: "Trust in the Void", 
      problem: "Modern digital ecosystems almost universally depend on central intermediaries—such as clearinghouses, platform gatekeepers, and institutional arbiters—to establish transactional validity. This dependence fosters catastrophic single points of failure, algorithmic censorship, arbitrary monopolistic rent extraction, and systemic vulnerability to central compromise.",
      easy: "Modern digital ecosystems almost universally depend on central intermediaries—such as clearinghouses, platform gatekeepers, and institutional arbiters—to establish transactional validity.",
      challenge: "How might we establish robust, decentralized consensus and verifiable coordination protocols that allow mutually distrusting entities to transact, align state, and enforce binding commitments across high-latency, adversarial environments without central oversight?",
      why: "Allows participants to formulate innovative consensus topologies, Sybil-defense mechanisms, game-theoretic incentive engines, or autonomous peer arbitration frameworks unconstrained by production network gas fees or mining hardware."
    },
    { 
      id: "Track 3", 
      title: "The Indivisible Token", 
      problem: "Digital assets—such as academic credentials, intellectual property, enterprise software licenses, digital land titles, and medical records—suffer from the intrinsic nature of the digital medium: effortless, zero-cost reproduction, piracy, and unprovable provenance. Establishing true uniqueness, provenance lineage, and cryptographically enforceable rights remains a fundamental hurdle.",
      easy: "Digital assets—such as academic credentials, intellectual property, enterprise software licenses, digital land titles, and medical records—suffer from the intrinsic nature of the digital medium: effortless, zero-cost reproduction, piracy, and unprovable provenance.",
      challenge: "How might we rethink the primitives of digital asset ownership, authenticity attestation, and lifecycle management so that ownership of digital goods can be verifiably established, audited, and transferred across sovereign platforms without risking unauthorized duplication or exploitation?",
      why: "Fosters out-of-the-box conceptual models for dynamic Soulbound Tokens, programmable licensing state machines, tamper-evident lineage graphs, and verifiable anti-counterfeiting transfer protocols."
    },
    { 
      id: "Track 4", 
      title: "Glass Walls, Sealed Rooms", 
      problem: "Public blockchains and immutable shared ledgers provide radical auditability, but their universal transparency creates severe surveillance risks. Open transaction histories and public ledger graphs expose proprietary business workflows, reveal personal spending habits, enable address clustering, and facilitate targeted economic profiling.",
      easy: "Public blockchains and immutable shared ledgers provide radical auditability, but their universal transparency creates severe surveillance risks.",
      challenge: "How might we balance public verifiability and regulatory accountability with radical confidentiality, enabling institutions and individuals to mathematically prove the legitimacy or compliance of a transaction without revealing underlying balances, participants, or sensitive data?",
      why: "Participants can invent novel applications combining Zero-Knowledge Proofs (zk-SNARKs/STARKs), stealth addressing schemes, confidential rollup pipelines, and verifiable credential disclosures tailored to business and financial privacy."
    },
    { 
      id: "Track 5", 
      title: "The Post-Quantum Horizon", 
      problem: "The security of virtually all modern financial, governmental, and commercial communication relies on public-key cryptographic algorithms (RSA, ECC) vulnerable to Shor's algorithm on upcoming quantum computers. Adversaries are actively capturing and archiving encrypted traffic today (\"Harvest Now, Decrypt Later\"), making future exposure an urgent, present reality.",
      easy: "The security of virtually all modern financial, governmental, and commercial communication relies on public-key cryptographic algorithms (RSA, ECC) vulnerable to Shor's algorithm on upcoming quantum computers.",
      challenge: "How can we design lightweight, quantum-resilient cryptographic protocols and agile migration frameworks that enable edge devices, IoT sensors, and decentralized networks to transition to post-quantum cryptography without crippling operational throughput or memory constraints?",
      why: "Encourages architectural innovation across lattice-based signature compression, hybrid post-quantum key-exchange pipelines, and cryptographically agile protocol wrappers designed for resource-constrained systems."
    },
    { 
      id: "Track 6", 
      title: "Blind Computation", 
      problem: "Modern collaborative AI and multi-institutional data analytics require vast pools of sensitive training data, such as private medical records, fraud detection telemetry, and biometric features. Traditional processing mandates decrypting this data in host memory, creating massive exposure vectors to malicious cloud operators, rogue hypervisors, and data breaches.",
      easy: "Modern collaborative AI and multi-institutional data analytics require vast pools of sensitive training data, such as private medical records, fraud detection telemetry, and biometric features.",
      challenge: "How might we design secure computing paradigms that allow untrusted cloud environments to compute, train machine learning models, or run complex analytics directly over encrypted data streams without ever decrypting or inspecting the underlying raw records?",
      why: "Teams can propose practical frameworks leveraging Fully Homomorphic Encryption (FHE), Secure Multi-Party Computation (SMPC), and confidential enclave architectures tailored for collaborative healthcare or cross-bank anti-money-laundering analytics."
    },
    { 
      id: "Track 7", 
      title: "The Unbroken Chain", 
      problem: "Modern software relies heavily on deeply nested open-source dependencies, external package registries, and multi-stage CI/CD build pipelines. Adversaries increasingly exploit this blind spot by injecting zero-day backdoors, malicious commits, or tampered binary artifacts into upstream libraries that automatically propagate down to millions of production deployments.",
      easy: "Modern software relies heavily on deeply nested open-source dependencies, external package registries, and multi-stage CI/CD build pipelines.",
      challenge: "How might we construct a decentralized, cryptographically verifiable software provenance and supply-chain attestation framework that independently audits, signs, and guarantees the bit-for-bit integrity and reproducible compilation of software artifacts from source commit to production execution?",
      why: "Spurs innovative thinking around cryptographic Software Bill of Materials (SBOMs), threshold-witness build pipelines, consensus-based reproducible builds, and tamper-resistant artifact ledgers."
    },
    { 
      id: "Track 8", 
      title: "Ghost in the Ledger", 
      problem: "Smart contracts execute autonomously and immutably once deployed onto decentralized networks. While immutability is essential for trust, it turns subtle architectural flaws, reentrancy vulnerabilities, or algorithmic edge cases into permanent, irreversible catastrophic exploits, bleeding billions of dollars with zero recourse or time-sensitive containment mechanisms.",
      easy: "Smart contracts execute autonomously and immutably once deployed onto decentralized networks.",
      challenge: "How might we create real-time, decentralized smart contract defense networks that can autonomously detect malicious on-chain transactions in the mempool and deploy non-custodial exploit mitigation, adaptive circuit breakers, or self-healing state rollbacks before malicious blocks finalize?",
      why: "Participants can conceptualize decentralized mempool monitoring swarms, MEV-resistant automated emergency pause protocols, verifiable runtime security invariants, and algorithmic circuit-breaking designs."
    },
    { 
      id: "Track 9", 
      title: "The Truth Machine", 
      problem: "Decentralized smart contracts operate in deterministic sandboxes and cannot natively perceive the physical world. To trigger payouts, settle parametric insurance, or enforce governance, they rely on external \"oracles.\" Centralized or lightly secured oracles are easily bribed, compromised, or flash-loan-manipulated, creating the catastrophic \"Oracle Problem.\"",
      easy: "Decentralized smart contracts operate in deterministic sandboxes and cannot natively perceive the physical world.",
      challenge: "How can we design a decentralized, cryptographically attested oracle architecture that reliably bridges physical, off-chain reality (IoT telemetry, satellite data, weather metrics, court rulings) into smart contracts while guaranteeing manipulation-proof data integrity and collusion resistance?",
      why: "Encourages novel integration of zero-knowledge TLS proofs (zk-TLS), multi-stakeholder staking games, decentralized trusted execution environments (TEEs), and tamper-evident sensor attestation protocols."
    },
    { 
      id: "Track 10", 
      title: "Autonomous Defense Swarms", 
      problem: "Cyber attacks operate at machine speed, leveraging automated vulnerability scanners, polymorphic malware, and distributed coordinated botnets. Traditional Security Operations Centers (SOCs) depend heavily on human analysts and delayed signature updates, consistently leaving defenders hours or days behind fast-moving intrusions.",
      easy: "Cyber attacks operate at machine speed, leveraging automated vulnerability scanners, polymorphic malware, and distributed coordinated botnets.",
      challenge: "How can we construct an autonomous, decentralized collective-defense protocol where independent machines dynamically share zero-day threat intelligence and execute synchronized, honey-token quarantine actions in real time without exposing proprietary internal network topologies to peers?",
      why: "Pushes boundaries across privacy-preserving federated threat sharing, decentralized honeypot swarms, cryptographic threat validation graphs, and verifiable autonomous remediation protocols."
    }
  ],
  "math": [
    { 
      id: "Track 1", 
      title: "Solar Storm Roulette", 
      problem: "When extreme coronal mass ejections and geomagnetic storms impact Earth, low Earth orbit (LEO) atmospheric density surges erratically, inducing non-conservative aerodynamic drag that destabilizes satellite orbital ephemerides within hours. Conventional linear drag estimators fail under sudden thermospheric expansion, resulting in tracking loss and catastrophic collision risks.",
      easy: "When extreme coronal mass ejections and geomagnetic storms impact Earth, low Earth orbit (LEO) atmospheric density surges erratically, inducing non-conservative aerodynamic drag that destabilizes satellite orbital ephemerides within hours.",
      challenge: "How can we formulate a coupled nonlinear ordinary differential equation (ODE) drag framework integrated with a physics-informed correction layer to accurately forecast orbital decay and optimize impulsive correction-burn windows under severe space-weather perturbations?",
      why: "Teams can devise mathematical drag models combining non-equilibrium density equations with hybrid surrogate layers, evaluating fuel-optimal delta-v execution schedules without requiring raw flight hardware."
    },
    { 
      id: "Track 2", 
      title: "The Kessler Cascade Simulator", 
      problem: "Hypervelocity fragmentations in congested orbital shells create positive feedback loops where debris collisions generate secondary projectiles, mirroring epidemiological outbreak propagation. Once a critical density threshold is breached, the cascading proliferation becomes mathematically irreversible, rendering targeted orbital bands permanently unusable.",
      easy: "Hypervelocity fragmentations in congested orbital shells create positive feedback loops where debris collisions generate secondary projectiles, mirroring epidemiological outbreak propagation.",
      challenge: "How might we adapt nonlinear population-dynamics systems (such as compartmental SIR/SEIR models) to capture multi-altitude fragment generation, identify orbital tipping points, and prove the analytical efficacy of targeted active debris removal (ADR) interventions?",
      why: "Encourages cross-domain mathematical translation between epidemiology and celestial mechanics, allowing participants to derive stability criteria, reproduction numbers for debris, and optimal orbital remediation quotas."
    },
    { 
      id: "Track 3", 
      title: "Hypersonic Shockwave Sculptor", 
      problem: "Vehicles traveling beyond Mach 5 generate intense bow shockwaves where severe aerothermodynamic heating coincides with sharp boundary-layer transitions. Traditional sharp geometric profiles experience localized thermal ablation that causes structural breakdown, while blunt bodies suffer prohibitive drag penalties that compromise aerodynamic range.",
      easy: "Vehicles traveling beyond Mach 5 generate intense bow shockwaves where severe aerothermodynamic heating coincides with sharp boundary-layer transitions.",
      challenge: "How can we solve an inverse nonlinear shape-optimization problem governed by compressible Euler and Navier-Stokes PDE constraints to sculpt a vehicle geometry that minimizes peak stagnation-point heat flux while strictly preserving lift-to-drag efficiency?",
      why: "Invites algorithmic formulation around adjoint-based shape optimization, parameter-space exploration, and reduced-order fluid-thermal coupling methods without demanding high-compute CFD cluster infrastructure."
    },
    { 
      id: "Track 4", 
      title: "Leaderless Satellite Swarm", 
      problem: "Megaconstellations and distributed satellite apertures depend heavily on centralized ephemeris broadcasts or master-satellite topologies for formation upkeep. In congested or contested domains, single-node communication dropouts, anti-satellite threats, or telemetry latency rapidly induce orbital dispersion and constellation disintegration.",
      easy: "Megaconstellations and distributed satellite apertures depend heavily on centralized ephemeris broadcasts or master-satellite topologies for formation upkeep.",
      challenge: "How might we design a fully decentralized nonlinear coupling control law—inspired by Kuramoto phase-synchronization models—that enables autonomous satellite swarms to restore lattice geometry and phase consensus even after abruptly losing up to 30% of constituent nodes?",
      why: "Participants can analyze network graph topology, phase synchronization dynamics, and Lyapunov-stable decentralized consensus laws under non-uniform inter-satellite communication delays."
    },
    { 
      id: "Track 5", 
      title: "Chaos Cone", 
      problem: "Derelict upper stages and tumbling satellites entering the upper atmosphere exhibit complex, non-axisymmetric rigid-body gyration. Microscopic uncertainties in initial attitude, angular rate, or aerodynamic torque decouple determinism, yielding enormous dispersion footprints where conventional single-point trajectory forecasts fail catastrophically.",
      easy: "Derelict upper stages and tumbling satellites entering the upper atmosphere exhibit complex, non-axisymmetric rigid-body gyration.",
      challenge: "How can we leverage nonlinear rigid-body dynamics and chaos-theory metrics (such as finite-time Lyapunov exponents and phase-space boundary propagation) to map bounded, probabilistic impact zones rather than relying on false-precision deterministic trajectories?",
      why: "Enables students to apply Hamiltonian mechanics, chaotic attractor characterization, and probabilistic phase-space diffusion without needing classified atmospheric entry test data."
    },
    { 
      id: "Track 6", 
      title: "Dust-Devil Defiant", 
      problem: "Operating rotorcraft in the Martian atmosphere is constrained by ultra-low fluid density (roughly 1% of Earth) coupled with violent, unpredictable convective dust-devil vortex encounters. Under sudden crosswind shear and blade stall conditions, linear PID and small-perturbation controllers saturate rapidly, inducing catastrophic loss of attitude authority.",
      easy: "Operating rotorcraft in the Martian atmosphere is constrained by ultra-low fluid density (roughly 1% of Earth) coupled with violent, unpredictable convective dust-devil vortex encounters.",
      challenge: "How might we construct a robust, Lyapunov-based nonlinear flight controller (such as adaptive backstepping or sliding-mode control) capable of maintaining rotorcraft attitude stability and trajectory bounds during severe convective vortex encounters in rarified atmospheres?",
      why: "Focuses on non-equilibrium aerodynamics, nonlinear stability proofs, control boundary guarantees, and state-dependent disturbance compensation across extreme flight envelopes."
    },
    { 
      id: "Track 7", 
      title: "Gravity's Slingshot", 
      problem: "Interplanetary mission trajectories based on classic two-body patched-conic approximations demand massive propellant budgets that severely restrict scientific payloads. Although low-energy pathways exist within the chaotic invariant manifolds of the Circular Restricted Three-Body Problem (CR3BP), their non-integrable phase space renders systematic route discovery exceptionally difficult.",
      easy: "Interplanetary mission trajectories based on classic two-body patched-conic approximations demand massive propellant budgets that severely restrict scientific payloads.",
      challenge: "How can we couple the nonlinear dynamical equations of the three-body problem with physics-informed machine learning or evolutionary boundary-value solvers to identify ultra-low-energy transit pathways and ballistic capture trajectories across complex planetary systems?",
      why: "Prompts innovative synergies between dynamical systems theory (Poincaré maps, stable/unstable manifolds) and modern machine learning search strategies to solve complex orbital optimization problems."
    },
    { 
      id: "Track 8", 
      title: "The Screaming Engine", 
      problem: "High-thrust rocket combustion chambers operate in extreme regimes where turbulent heat release locks in phase with chamber acoustic eigenmodes. This thermoacoustic feedback loop triggers high-amplitude nonlinear pressure fluctuations within milliseconds, stripping thermal barrier coatings and causing explosive structural wall burn-through.",
      easy: "High-thrust rocket combustion chambers operate in extreme regimes where turbulent heat release locks in phase with chamber acoustic eigenmodes.",
      challenge: "How might we formulate a coupled nonlinear thermoacoustic ODE/PDE model to capture limit-cycle bifurcation regimes, predict the exact operational envelope where combustion instability triggers, and optimize acoustic damping geometries (baffles, Helmholtz resonators) to shift stability margins?",
      why: "Allows teams to explore Rayleigh criterion mechanics, bifurcation theory, and analytical acoustic damping models, bridging pure mathematics with real-world aerospace propulsion safety."
    },
    { 
      id: "Track 9", 
      title: "Solar Sail Anarchist", 
      problem: "Collinear Lagrange points (L1 and L2) represent saddle-point equilibria whose unstable manifolds cause uncorrected spacecraft to drift rapidly into heliocentric escape. While photon radiation pressure offers propellantless propulsion, solar activity fluctuations and membrane flexure introduce severe nonlinear attitude-orbit cross-coupling.",
      easy: "Collinear Lagrange points (L1 and L2) represent saddle-point equilibria whose unstable manifolds cause uncorrected spacecraft to drift rapidly into heliocentric escape.",
      challenge: "How can we engineer a chaos-control station-keeping policy—exploiting the natural instability of saddle manifolds using OGY-style intermittent micro-actuations—that maintains bounded solar sail libration orbits at L2 while expending zero chemical propellant?",
      why: "Encourages non-traditional control architectures that utilize chaos rather than suppressing it, focusing on manifold geometry, solar radiation pressure dynamics, and minimal control actuation."
    },
    { 
      id: "Track 10", 
      title: "Whispers from the Void", 
      problem: "Deep-space sensor streams, interstellar telemetry, and astrophysical time-series records are dominated by stochastic thermal background noise and instrument jitter. Transient scientific anomalies—such as unmodeled planetary resonances, gravitational wave micro-signatures, or coherent narrowband transients—remain buried because linear spectral filtering cannot distinguish deterministic chaos from white noise.",
      easy: "Deep-space sensor streams, interstellar telemetry, and astrophysical time-series records are dominated by stochastic thermal background noise and instrument jitter.",
      challenge: "How might we construct a nonlinear dynamical systems classifier using phase-space delay-coordinate embedding, correlation dimensions, and recurrence quantification analysis to autonomously isolate low-dimensional structured chaos from high-dimensional stochastic noise in deep-space telemetry?",
      why: "Participants can cross-pollinate methods from nonlinear time-series analysis (Takens' theorem, entropy metrics) and statistical signal processing to develop innovative anomaly detection pipelines."
    }
  ]
};
