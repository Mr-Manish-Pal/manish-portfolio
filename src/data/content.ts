export type ProjectFilter = 'IoT' | 'Computer Vision' | 'Firmware' | 'Linux'

export type Project = {
  id: string
  number: string
  title: string
  category: string
  description: string
  technologies: string[]
  status: 'Roadmap' | 'In development' | 'Concept'
  filters: ProjectFilter[]
  problem: string
  approach: string
  hardware: string[]
  software: string[]
  challenges: string[]
  future: string
  github?: string
}

export const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Journey', id: 'journey' },
  { label: 'Contact', id: 'contact' },
]

export const socialLinks = {
  github: 'https://github.com/Mr-Manish-Pal',
  linkedin: '',
  email: '',
  resume: '/resume/Manish_Pal_Resume.pdf',
  resumeAvailable: false,
}

export const profile = {
  name: 'Manish Pal',
  role: 'Electronics & Communication Engineering student',
  location: 'Meerut, Uttar Pradesh, India',
  about:
    'I’m a B.Tech Electronics & Communication Engineering student focused on the space where hardware and firmware meet. My work leans practical: wire the system, read the datasheet, measure the signal, then make the next iteration better.',
  aboutMore:
    'Alongside embedded systems, I’m exploring Edge AI and TinyML, Linux-based development, and the research questions that shape efficient, secure computing.',
  value:
    'Building practical embedded systems at the intersection of electronics, firmware, Linux, and edge AI.',
}

export const skills = [
  {
    label: 'Embedded & Hardware',
    level: 'Hands-on / working knowledge',
    items: [
      'ESP32',
      'STM32',
      'Arduino',
      'Raspberry Pi Pico',
      'GPIO',
      'UART',
      'I2C',
      'SPI',
      'PWM',
      'ADC',
      'Interrupts',
      'FreeRTOS',
      'PCB debugging',
      'Digital multimeter',
      'Oscilloscope',
      'Breadboard prototyping',
    ],
  },
  {
    label: 'Programming',
    level: 'Working knowledge',
    items: ['C', 'C++', 'Python'],
  },
  {
    label: 'Computer Vision & AI',
    level: 'Exploring',
    items: ['OpenCV', 'Computer vision', 'TinyML', 'Signal processing', 'Edge AI'],
  },
  {
    label: 'Linux & Tools',
    level: 'Working knowledge',
    items: ['Linux / Fedora', 'VS Code', 'PlatformIO', 'Git', 'GitHub', 'KiCad'],
  },
  {
    label: 'IoT & Connectivity',
    level: 'Working knowledge',
    items: ['MQTT', 'Wi-Fi', 'Blynk', 'Raspberry Pi'],
  },
]

export const projects: Project[] = [
  {
    id: 'attendance-system',
    number: '01',
    title: 'Smart Attendance System',
    category: 'Computer Vision',
    description:
      'A classroom computer-vision system under development that connects camera input to a structured attendance record.',
    technologies: ['Computer Vision', 'OpenCV', 'ESP-CAM', 'Raspberry Pi'],
    status: 'In development',
    filters: ['Computer Vision'],
    problem:
      'Explore a more consistent classroom attendance workflow using a camera, spatial reasoning, and a database.',
    approach:
      'Camera → detection → seat/person analysis → attendance database, with the processing architecture kept modular.',
    hardware: ['ESP-CAM (potential)', 'Raspberry Pi (potential)', 'Network switch (potential)'],
    software: ['OpenCV', 'Computer Vision', 'Detection pipeline', 'Database'],
    challenges: [
      'Handling occlusion and classroom variation',
      'Designing privacy-conscious data handling',
    ],
    future:
      'Hardware and model choices will be documented once the current prototype settles.',
  },
  {
    id: 'predictive-maintenance',
    number: '02',
    title: 'TinyML Predictive Maintenance System',
    category: 'Edge AI / Sensing',
    description:
      'A low-cost edge monitor exploring how vibration signatures can surface abnormal motor and fan behaviour locally.',
    technologies: ['ESP32', 'MPU6050', 'TinyML', 'FreeRTOS'],
    status: 'Roadmap',
    filters: ['Firmware'],
    problem:
      'How can useful maintenance signals be extracted close to a motor without sending every raw sample to the cloud?',
    approach:
      'Capture vibration over I2C, experiment with signal processing and feature extraction, then evaluate a TinyML classifier on-device.',
    hardware: ['ESP32', 'MPU6050', 'OLED', 'Buzzer'],
    software: ['C/C++', 'I2C', 'DSP / FFT', 'TinyML', 'MQTT (planned)'],
    challenges: [
      'Collecting representative normal and abnormal vibration data',
      'Balancing model size with useful signal resolution',
    ],
    future:
      'A Raspberry Pi dashboard and MQTT telemetry are planned for later iterations.',
  },
  {
    id: 'energy-monitor',
    number: '03',
    title: 'Smart Energy Monitor',
    category: 'Instrumentation / IoT',
    description:
      'An ESP32-based instrument for tracking electrical measurements and surfacing them through a connected dashboard.',
    technologies: ['ESP32', 'ACS712', 'Blynk', 'C++'],
    status: 'In development',
    filters: ['IoT', 'Firmware'],
    problem:
      'Make household energy measurements easier to observe, compare, and reason about in real time.',
    approach:
      'Read voltage and current sensors, derive electrical quantities in firmware, and expose the readings to a local or Blynk dashboard.',
    hardware: ['ESP32', 'ZMPT101B', 'ACS712', 'LCD', 'Relay'],
    software: ['C/C++', 'ADC', 'Power calculation', 'Wi-Fi', 'Blynk'],
    challenges: [
      'Calibrating sensor readings against a trusted reference',
      'Designing safe mains-side measurement boundaries',
    ],
    future:
      'Power factor, frequency, estimated cost, and longer-term energy views remain part of the build roadmap.',
    github: 'https://github.com/Mr-Manish-Pal/smart-energy-monitor',
  },
  {
    id: 'digital-oscilloscope',
    number: '04',
    title: 'Low-Cost Digital Oscilloscope',
    category: 'Embedded Instrumentation',
    description:
      'An STM32 exploration of signal acquisition, sampling, and waveform visualization with accessible hardware.',
    technologies: ['STM32', 'ADC', 'Firmware'],
    status: 'Concept',
    filters: ['Firmware'],
    problem:
      'Build a focused learning instrument around the acquisition path rather than treating an oscilloscope as a black box.',
    approach:
      'Develop the ADC sampling pipeline, buffer captured signal data, and render a useful waveform view.',
    hardware: ['STM32', '[Add display / probe details]'],
    software: ['C/C++', 'ADC', 'Sampling', 'Signal acquisition'],
    challenges: [
      'Choosing a useful sampling strategy',
      'Keeping acquisition and visualization responsive',
    ],
    future:
      'Measurement bandwidth and accuracy will be documented after hardware validation.',
  },
  {
    id: 'programmer-platform',
    number: '05',
    title: 'Universal Microcontroller Programmer',
    category: 'Hardware / Firmware',
    description:
      'A hardware and firmware platform for learning how programming and debugging workflows differ across MCU targets.',
    technologies: ['MCUs', 'Debugging', 'Firmware'],
    status: 'Concept',
    filters: ['Firmware'],
    problem:
      'Understand the practical boundaries between a target board, its programming interface, and a repeatable debug workflow.',
    approach:
      'Build a modular platform and document target-specific interfaces as they are validated.',
    hardware: ['[Add confirmed target chips]'],
    software: ['Firmware', 'Programming interfaces', 'Debug tooling'],
    challenges: [
      'Keeping target adapters modular',
      'Validating each interface without assuming compatibility',
    ],
    future:
      'Supported devices will be added here as each one is confirmed on the bench.',
  },
  {
    id: 'thermal-camera',
    number: '06',
    title: 'Portable Thermal Camera',
    category: 'Sensing / Visualization',
    description:
      'An STM32-centered concept for turning thermal measurements into a compact, understandable visual instrument.',
    technologies: ['STM32', 'Thermal imaging', 'Visualization'],
    status: 'Concept',
    filters: ['Firmware'],
    problem:
      'Make temperature distribution more tangible through a portable embedded display.',
    approach:
      'Integrate a thermal sensor once selected, map measurements to a visual representation, and keep the firmware path inspectable.',
    hardware: ['STM32', '[Add sensor model]'],
    software: ['C/C++', 'Sensor interface', 'Visualization'],
    challenges: [
      'Selecting a suitable sensor and optical setup',
      'Presenting thermal data without implying unsupported accuracy',
    ],
    future:
      'Sensor model, resolution, and accuracy will be added after the hardware choice is finalized.',
  },
]

export const researchTopics = [
  ['Embedded Systems', 'Reliable hardware and firmware boundaries for practical devices.', 'Research'],
  ['Edge AI / TinyML', 'Small models, local inference, and signal-aware embedded intelligence.', 'In progress'],
  ['Hardware Security', 'Understanding how physical systems shape security assumptions.', 'Research'],
  [
    'FinFET & Semiconductor Technology',
    'Exploring the devices and processes beneath modern compute.',
    'Research',
  ],
  [
    'User-Centric Cybersecurity',
    'Security that respects real people, workflows, and constraints.',
    'Research',
  ],
  [
    'Low-Power Computing',
    'Efficient architectures for devices that must work within tight budgets.',
    'In progress',
  ],
]

export const experience = [
  {
    title: 'Practical troubleshooting & repair',
    date: 'Hands-on electronics experience',
    duration: '~ 3.5 years',
    description:
      'Hands-on exposure to TV and audio amplifier systems, home theatre systems, dish antenna systems, PCB debugging, component-level troubleshooting, and electronic equipment diagnostics.',
  },
  {
    title: 'Internship details pending',
    date: 'Summer internship',
    duration: '[Add dates / organization]',
    description: '[Add organization, dates, and scope when confirmed.]',
  },
]

export const education = {
  degree: 'B.Tech',
  field: 'Electronics & Communication Engineering',
  institution: 'Dewan VS Group of Engineering & Technology',
  location: 'Meerut, Uttar Pradesh',
}

export const certifications = [
  'Basic Computer Certificate',
  'Technofilia / TechnoFliia Certificate',
  'School / college competition certificates',
]

export const contact = {
  formspreeEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT ?? '',
}
