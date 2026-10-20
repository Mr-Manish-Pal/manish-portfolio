export type ProjectFilter = 'IoT' | 'Computer Vision' | 'Firmware' | 'Linux'

export type Project = {
  id: string
  number: string
  title: string
  category: string
  description: string
  technologies: string[]
  status: 'Completed' | 'In Progress' | 'Planned'
  filters: ProjectFilter[]
  problem: string
  approach: string
  hardware: string[]
  software: string[]
  challenges: string[]
  future: string
  outcome: string
  github?: string
}

export const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'Projects', id: 'projects' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Contact', id: 'contact' },
]

export const socialLinks = {
  github: 'https://github.com/Mr-Manish-Pal',
  linkedin: 'https://www.linkedin.com/in/manish-pal-b34928438/',
  email: 'palmanish1463@gmail.com',
  resume: '/resume/Manish_Pal_Resume.docx',
  resumeAvailable: true,
}

export const profile = {
  name: 'Manish Pal',
  role: 'Aspiring Embedded Systems Engineer',
  location: 'Meerut, Uttar Pradesh, India',
  about:
    'I’m a B.Tech Electronics & Communication Engineering student focused on practical hardware and firmware systems. My work revolves around microcontrollers, sensors, debugging, and turning real-world problems into working prototypes.',
  aboutMore:
    'I have hands-on experience with electronics troubleshooting, PCB-level diagnosis, and microcontroller-based project development. I am particularly interested in embedded systems, IoT, TinyML, and intelligent edge devices that connect sensing, control, and communication.',
  value:
    'Building practical embedded systems by combining microcontrollers, electronics, firmware, and connected hardware to solve real-world engineering problems.',
}

export const skills = [
  {
    label: 'Programming & Firmware',
    level: 'Working knowledge',
    items: ['C', 'C++', 'Embedded C', 'Python fundamentals', 'Firmware debugging'],
  },
  {
    label: 'Microcontrollers',
    level: 'Hands-on',
    items: ['ESP32', 'STM32F103C8T6', 'Arduino Uno', 'NodeMCU', 'Raspberry Pi Pico', 'Raspberry Pi 3 Model A+'],
  },
  {
    label: 'Embedded Interfaces',
    level: 'Applied',
    items: ['GPIO', 'ADC', 'PWM', 'UART', 'I2C', 'SPI', 'Sensor interfacing', 'OLED / LCD integration'],
  },
  {
    label: 'Electronics & Debugging',
    level: 'Practical',
    items: ['Circuit troubleshooting', 'PCB debugging', 'Multimeter-based testing', 'Oscilloscope fundamentals', 'Hardware and firmware integration'],
  },
  {
    label: 'Development Tools',
    level: 'Working knowledge',
    items: ['VS Code', 'PlatformIO', 'Arduino IDE', 'STM32CubeMX', 'Git & GitHub', 'Linux / Fedora', 'KiCad'],
  },
  {
    label: 'Advanced Learning',
    level: 'Exploring',
    items: ['TinyML', 'Edge AI', 'Digital Signal Processing', 'FFT', 'FreeRTOS concepts', 'IoT communication', 'HTTP APIs'],
  },
]

export const projects: Project[] = [
  {
    id: 'nexus-6',
    number: '01',
    title: 'NEXUS-6',
    category: 'Room Monitoring Prototype',
    description:
      'A multi-node ESP32 monitoring prototype designed to collect room-level sensor information and present it through a local web dashboard.',
    technologies: ['ESP32', 'ArduinoJson', 'HTTP API', 'Sensors', 'Local Dashboard'],
    status: 'Completed',
    filters: ['IoT', 'Firmware'],
    problem:
      'Monitor multiple rooms with shared sensor data and present meaningful status information in a simple local interface.',
    approach:
      'Use distributed ESP32 nodes to collect environmental and machine-related signals, then serve room data through a local web dashboard with online-status indicators.',
    hardware: ['ESP32 host and client nodes', 'Room monitoring sensors', 'Wi-Fi connectivity', 'Local dashboard hardware'],
    software: ['C++ / Arduino', 'ArduinoJson', 'HTTP endpoints', 'Data presentation and room views'],
    challenges: [
      'Coordinating multiple monitoring nodes and status reporting',
      'Presenting sensor information clearly without overstating system capabilities',
    ],
    future:
      'The prototype remains a monitoring platform and is not presented as certified industrial safety equipment.',
    outcome:
      'Reported as a first-place winner at the state-level Sewa Sankalp Innovation Challenge 2026.',
    github: 'https://github.com/Mr-Manish-Pal',
  },
  {
    id: 'gatex',
    number: '02',
    title: 'GateX',
    category: 'Automatic Gate Prototype',
    description:
      'An automated gate prototype that combines distance sensing, visual feedback, and configurable audible alerts.',
    technologies: ['ESP32', 'Ultrasonic Sensor', 'OLED', 'Buzzer', 'Automation'],
    status: 'Completed',
    filters: ['IoT', 'Firmware'],
    problem:
      'Create a compact gate-control prototype that demonstrates sensing, alerting, and state indication in a single workflow.',
    approach:
      'Measure the target distance, toggle the gate state based on logic, update the OLED display, and drive LED and buzzer alerts according to the operating mode.',
    hardware: ['Distance sensor', 'OLED display', 'Red LED', 'Green LED', 'Buzzer', 'Physical disable button'],
    software: ['C++ / Arduino', 'Sensor logic', 'Display state logic', 'Alert control'],
    challenges: [
      'Balancing automation with a manual buzzer override',
      'Keeping the state transitions simple and understandable',
    ],
    future:
      'This remains a prototype for learning and demonstration rather than a production-grade access-control system.',
    outcome:
      'The prototype demonstrates distance-based gate control, state LED indication, and an audible alert workflow.',
  },
  {
    id: 'predictive-maintenance',
    number: '03',
    title: 'TinyML Predictive Maintenance System',
    category: 'Edge AI / Sensing',
    description:
      'A low-cost edge-monitoring project investigating vibration sensing, signal processing, and on-device anomaly detection for rotating systems.',
    technologies: ['ESP32', 'MPU6050', 'TinyML', 'FFT', 'FreeRTOS'],
    status: 'In Progress',
    filters: ['Firmware'],
    problem:
      'Extract meaningful vibration information close to a machine without depending on every sample being sent to the cloud.',
    approach:
      'Collect vibration data over I2C, apply signal processing and feature extraction, then evaluate whether a compact on-device classifier is feasible.',
    hardware: ['ESP32 DevKit', 'MPU6050', 'OLED', 'Buzzer'],
    software: ['C / C++', 'I2C', 'DSP', 'FFT', 'TinyML exploration'],
    challenges: [
      'Collecting representative vibration data',
      'Balancing model size with useful signal quality',
    ],
    future:
      'A future revision may add a Raspberry Pi dashboard and MQTT telemetry once the signal pipeline is validated.',
    outcome:
      'The system is an active development project focused on data collection, signal analysis, and model feasibility studies.',
  },
  {
    id: 'smart-energy-monitor',
    number: '04',
    title: 'Smart Energy Monitor',
    category: 'Instrumentation / IoT',
    description:
      'An ESP32-based power-monitoring project that tracks electrical measurements and surfaces them through a connected dashboard.',
    technologies: ['ESP32', 'ACS712', 'ZMPT101B', 'Wi-Fi', 'Blynk'],
    status: 'In Progress',
    filters: ['IoT', 'Firmware'],
    problem:
      'Observe energy-use trends close to the source so that voltage, current, and overall behavior can be reasoned about in real time.',
    approach:
      'Read analog sensor data, estimate electrical quantities in firmware, and present the output through a local or Blynk dashboard with calibration in mind.',
    hardware: ['ESP32', 'ZMPT101B', 'ACS712', 'LCD or display module', 'Optional relay'],
    software: ['C / C++', 'ADC', 'Power estimation', 'Wi-Fi', 'Dashboard integration'],
    challenges: [
      'Calibrating sensor readings against a trusted reference',
      'Maintaining safe measurement boundaries for mains-side electrical work',
    ],
    future:
      'The next steps involve deeper calibration, measurement validation, and a more complete energy dashboard.',
    outcome:
      'The monitoring objective is established and the system is actively being improved for practical measurement reliability.',
    github: 'https://github.com/Mr-Manish-Pal/smart-energy-monitor',
  },
  {
    id: 'stm32-oscilloscope',
    number: '05',
    title: 'STM32 Oscilloscope Development',
    category: 'Embedded Instrumentation',
    description:
      'A learning-focused STM32 project exploring ADC sampling, waveform buffering, and display-driven signal visualization.',
    technologies: ['STM32F103C8T6', 'ADC', 'OLED', 'Firmware'],
    status: 'Planned',
    filters: ['Firmware'],
    problem:
      'Build a practical understanding of how a waveform display system works without depending on a commercial instrument for every observation.',
    approach:
      'Define the sampling pipeline, buffer incoming data, and render a waveform view on a display while keeping timing and acquisition logic transparent.',
    hardware: ['STM32F103C8T6', '0.96-inch 128x64 OLED', 'Signal probe setup'],
    software: ['C / C++', 'ADC configuration', 'Timing logic', 'Display rendering'],
    challenges: [
      'Choosing an appropriate sampling strategy',
      'Avoiding unsupported claims about measurement accuracy or bandwidth',
    ],
    future:
      'The project will be reported as a planned milestone until actual signal validation and timing measurements are completed.',
    outcome:
      'The concept is defined but remains under development and should not be presented as a fully verified oscilloscope.',
  },
  {
    id: 'sound-classifier',
    number: '06',
    title: 'ESP32 TinyML Sound Classifier',
    category: 'Edge AI / Audio',
    description:
      'A compact embedded audio-classification project using microphone input, signal processing, and lightweight on-device inference ideas.',
    technologies: ['ESP32', 'INMP441', 'TinyML', 'Audio processing'],
    status: 'In Progress',
    filters: ['Firmware', 'Computer Vision'],
    problem:
      'Explore how embedded audio data can be represented and classified locally with limited compute and memory.',
    approach:
      'Capture audio samples, prepare compact features, and evaluate whether a lightweight inference workflow can operate reliably on microcontroller hardware.',
    hardware: ['ESP32', 'INMP441 microphone', 'Display / output module'],
    software: ['C / C++', 'Signal processing', 'Feature extraction', 'TinyML experimentation'],
    challenges: [
      'Designing a small but representative feature pipeline',
      'Keeping expectations realistic when the model is still under development',
    ],
    future:
      'The project remains an exploratory embedded-AI build until a validated dataset and inference workflow are established.',
    outcome:
      'The project is a development effort centered on audio processing and TinyML feasibility rather than a finished deployed classifier.',
  },
]

export const researchTopics = [
  ['Embedded Systems', 'Reliable hardware and firmware boundaries for practical devices.', 'Research'],
  ['Edge AI / TinyML', 'Small models, local inference, and signal-aware embedded intelligence.', 'In Progress'],
  ['Hardware Security', 'Understanding how physical systems shape security assumptions.', 'Research'],
  ['Digital Signal Processing', 'Feature extraction, frequency-domain analysis, and practical signal interpretation.', 'In Progress'],
  ['Low-Power Computing', 'Efficient architectures for devices constrained by power and thermal budgets.', 'In Progress'],
  ['IoT & Connected Systems', 'Reliable sensing, communication, and local dashboards for practical devices.', 'Research'],
]

export const experience = [
  {
    title: 'Practical Electronics Experience',
    date: 'Hands-on electronics exposure',
    duration: '~ 3.5 years',
    description:
      'Approximately 3.5 years of hands-on electronics experience working on television amplifiers, home-theatre systems, dish antenna systems, PCB debugging, and component-level troubleshooting through a relative’s electronics shop.',
  },
  {
    title: 'Embedded Systems Internship',
    date: 'Details pending',
    duration: 'To be confirmed',
    description:
      'The internship details are intentionally kept editable until the organization, dates, and responsibilities are confirmed.',
  },
]

export const education = {
  degree: 'B.Tech',
  field: 'Electronics & Communication Engineering',
  institution: 'Dewan VS Group of Engineering & Technology',
  location: 'Meerut, Uttar Pradesh, India',
}

export const certifications = [
  'Basic Computer Certificate',
  'Technofilia / TechnoFliia Certificate',
  'State-level innovation challenge recognition (NEXUS-6)',
]

export const achievements = [
  {
    title: 'NEXUS-6 recognition',
    detail:
      'Reported as a first-place winner at the state-level Sewa Sankalp Innovation Challenge 2026.',
  },
  {
    title: 'Hands-on embedded prototyping',
    detail:
      'Built and iterated on multiple microcontroller-based projects, including monitoring systems, gate control, and sensing prototypes.',
  },
  {
    title: 'Technical workshop participation',
    detail:
      'Contributed to practical technology learning through hands-on embedded engineering activities and project discussions.',
  },
]

export const workshop = {
  title: 'Hands-on Embedded Systems Workshop: From Microcontroller to Real-World Project',
  mentor: 'Mentor: Manish Pal',
  studentCoordinator: 'Student Coordinator: Bholaxmi Sharma',
  facultyCoordinator: 'Faculty Coordinator: Pratibha Sukhroop Kaur',
  venue: 'Venue: Drone Lab',
  schedule: 'Scheduled date: 15 October (confirm final year and status before publication)',
  audience: 'Intended audience: second- and third-year ECE, EE, and CS students',
  topics: ['Arduino', 'NodeMCU', 'ESP32', 'STM32', 'Raspberry Pi Pico', 'Raspberry Pi', 'C fundamentals', 'Sensor interfacing', 'Practical project development'],
}

export const workflowStages = [
  'Requirements and problem definition',
  'Microcontroller and component selection',
  'Hardware and power planning',
  'Firmware development',
  'Peripheral and sensor integration',
  'Debugging and testing',
  'Documentation and iteration',
]

export const contact = {
  formspreeEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT ?? '',
}
