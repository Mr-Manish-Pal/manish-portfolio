export type Project = {
  id: string
  number: string
  title: string
  category: string
  description: string
  technologies: string[]
  status: 'Roadmap' | 'In development' | 'Concept'
  problem: string
  approach: string
  hardware: string[]
  software: string[]
  challenges: string[]
  future: string
  github?: string
}

export const navItems = ['About', 'Skills', 'Projects', 'Research', 'Experience', 'Certifications', 'Contact']

export const projects: Project[] = [
  {
    id: 'predictive-maintenance',
    number: '01',
    title: 'TinyML Predictive Maintenance System',
    category: 'Edge AI / Sensing',
    description: 'A low-cost edge monitor exploring how vibration signatures can surface abnormal motor and fan behaviour locally.',
    technologies: ['ESP32', 'MPU6050', 'TinyML', 'FreeRTOS'],
    status: 'Roadmap',
    problem: 'How can useful maintenance signals be extracted close to a motor without sending every raw sample to the cloud?',
    approach: 'Capture vibration over I2C, experiment with signal processing and feature extraction, then evaluate a TinyML classifier on-device.',
    hardware: ['ESP32', 'MPU6050', 'OLED', 'Buzzer'],
    software: ['C/C++', 'I2C', 'DSP / FFT', 'TinyML', 'MQTT (planned)'],
    challenges: ['Collecting representative normal and abnormal vibration data', 'Balancing model size with useful signal resolution'],
    future: 'A Raspberry Pi dashboard and MQTT telemetry are planned for later iterations.',
  },
  {
    id: 'energy-monitor',
    number: '02',
    title: 'Smart Energy Monitor',
    category: 'Instrumentation / IoT',
    description: 'An ESP32-based instrument for tracking electrical measurements and surfacing them through a connected dashboard.',
    technologies: ['ESP32', 'ACS712', 'Blynk', 'C++'],
    status: 'In development',
    problem: 'Make household energy measurements easier to observe, compare, and reason about in real time.',
    approach: 'Read voltage and current sensors, derive electrical quantities in firmware, and expose the readings to a local or Blynk dashboard.',
    hardware: ['ESP32', 'ZMPT101B', 'ACS712', 'LCD', 'Relay'],
    software: ['C/C++', 'ADC', 'Power calculation', 'Wi-Fi', 'Blynk'],
    challenges: ['Calibrating sensor readings against a trusted reference', 'Designing safe mains-side measurement boundaries'],
    future: 'Power factor, frequency, estimated cost, and longer-term energy views remain part of the build roadmap.',
    github: 'https://github.com/Mr-Manish-Pal/smart-energy-monitor',
  },
  {
    id: 'digital-oscilloscope',
    number: '03',
    title: 'Low-Cost Digital Oscilloscope',
    category: 'Embedded Instrumentation',
    description: 'An STM32 exploration of signal acquisition, sampling, and waveform visualization with accessible hardware.',
    technologies: ['STM32', 'ADC', 'Firmware'],
    status: 'Concept',
    problem: 'Build a focused learning instrument around the acquisition path rather than treating an oscilloscope as a black box.',
    approach: 'Develop the ADC sampling pipeline, buffer captured signal data, and render a useful waveform view.',
    hardware: ['STM32', '[Add display / probe details]'],
    software: ['C/C++', 'ADC', 'Sampling', 'Signal acquisition'],
    challenges: ['Choosing a useful sampling strategy', 'Keeping acquisition and visualization responsive'],
    future: 'Measurement bandwidth and accuracy will be documented after hardware validation.',
  },
  {
    id: 'programmer-platform',
    number: '04',
    title: 'Universal Microcontroller Programmer',
    category: 'Hardware / Firmware',
    description: 'A hardware and firmware platform for learning how programming and debugging workflows differ across MCU targets.',
    technologies: ['MCUs', 'Debugging', 'Firmware'],
    status: 'Concept',
    problem: 'Understand the practical boundaries between a target board, its programming interface, and a repeatable debug workflow.',
    approach: 'Build a modular platform and document target-specific interfaces as they are validated.',
    hardware: ['[Add confirmed target chips]'],
    software: ['Firmware', 'Programming interfaces', 'Debug tooling'],
    challenges: ['Keeping target adapters modular', 'Validating each interface without assuming compatibility'],
    future: 'Supported devices will be added here as each one is confirmed on the bench.',
  },
  {
    id: 'attendance-system',
    number: '05',
    title: 'Smart Attendance System',
    category: 'Computer Vision',
    description: 'A classroom computer-vision system under development that connects camera input to a structured attendance record.',
    technologies: ['Computer Vision', 'ESP-CAM', 'Raspberry Pi'],
    status: 'In development',
    problem: 'Explore a more consistent classroom attendance workflow using a camera, spatial reasoning, and a database.',
    approach: 'Camera → detection → seat/person analysis → attendance database, with the processing architecture kept modular.',
    hardware: ['ESP-CAM (potential)', 'Raspberry Pi (potential)', 'Network switch (potential)'],
    software: ['Computer Vision', 'Detection pipeline', 'Database'],
    challenges: ['Handling occlusion and classroom variation', 'Designing privacy-conscious data handling'],
    future: 'Hardware and model choices will be documented once the current prototype settles.',
  },
  {
    id: 'thermal-camera',
    number: '06',
    title: 'Portable Thermal Camera',
    category: 'Sensing / Visualization',
    description: 'An STM32-centered concept for turning thermal measurements into a compact, understandable visual instrument.',
    technologies: ['STM32', 'Thermal imaging', 'Visualization'],
    status: 'Concept',
    problem: 'Make temperature distribution more tangible through a portable embedded display.',
    approach: 'Integrate a thermal sensor once selected, map measurements to a visual representation, and keep the firmware path inspectable.',
    hardware: ['STM32', '[Add sensor model]'],
    software: ['C/C++', 'Sensor interface', 'Visualization'],
    challenges: ['Selecting a suitable sensor and optical setup', 'Presenting thermal data without implying unsupported accuracy'],
    future: 'Sensor model, resolution, and accuracy will be added after the hardware choice is finalized.',
  },
]

export const skillGroups = [
  { label: 'Microcontrollers', level: 'Working knowledge', items: ['ESP32', 'STM32', 'Arduino', 'Raspberry Pi Pico'] },
  { label: 'Programming', level: 'Working knowledge', items: ['C', 'C++', 'Python'] },
  { label: 'Embedded interfaces', level: 'Working knowledge', items: ['GPIO', 'UART', 'I2C', 'SPI', 'PWM', 'ADC', 'Interrupts', 'FreeRTOS', 'MQTT'] },
  { label: 'Tools & workflow', level: 'Working knowledge', items: ['VS Code', 'PlatformIO', 'Git', 'GitHub', 'KiCad', 'Linux / Fedora'] },
  { label: 'Bench & hardware', level: 'Hands-on', items: ['Digital multimeter', 'Oscilloscope', 'Breadboard prototyping', 'PCB debugging'] },
  { label: 'AI at the edge', level: 'Exploring', items: ['TinyML', 'Signal processing', 'Computer vision', 'Edge AI'] },
]

export const researchTopics = [
  ['Embedded Systems', 'Reliable hardware and firmware boundaries for practical devices.', 'Research'],
  ['Edge AI / TinyML', 'Small models, local inference, and signal-aware embedded intelligence.', 'In progress'],
  ['Hardware Security', 'Understanding how physical systems shape security assumptions.', 'Research'],
  ['FinFET & Semiconductor Technology', 'Exploring the devices and processes beneath modern compute.', 'Research'],
  ['User-Centric Cybersecurity', 'Security that respects real people, workflows, and constraints.', 'Research'],
  ['Low-Power Computing', 'Efficient architectures for devices that must work within tight budgets.', 'In progress'],
]

export const toolbox = ['ESP32', 'STM32', 'Arduino', 'Raspberry Pi', 'KiCad', 'PlatformIO', 'VS Code', 'Git', 'GitHub', 'Linux', 'Oscilloscope', 'Multimeter']
