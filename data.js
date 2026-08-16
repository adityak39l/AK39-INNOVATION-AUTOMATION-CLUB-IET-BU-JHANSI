/* ==========================================================================
   Innovation & Automation Club (IAC) - Master Data Store
   Department of Electronics & Instrumentation Engineering (EIE)
   Institute of Engineering & Technology, Bundelkhand University, Jhansi
   ========================================================================== */

const IACApp_DATA = {
    // ----------------------------------------------------------------------
    // 1. DEPARTMENTAL FACULTY & MENTORS DATA (EXACT OFFICIAL DETAILS)
    // ----------------------------------------------------------------------
    faculty: [
        {
            id: "f1",
            name: "Er. Neha Jain",
            designation: "Coordinator / Head of Department (HOD)",
            category: "hod",
            qualification: "M.Tech. (Communication Control & Networking)",
            specialization: "Communication Control, Networking, Industrial Automation",
            experience: "18 years",
            phone: "+91 9453001426",
            email: "nehajain488@bujhansi.ac.in",
            cabin: "Room 101, 1st Floor, IET Building",
            officeHours: "Mon - Fri (11:00 AM - 1:00 PM)",
            researchPapers: "18+ Years Academic & Research Experience",
            patents: "Patents & Research Publications",
            bio: "Er. Neha Jain serves as the Coordinator and Head of Department (HOD) of Electronics & Instrumentation Engineering at Bundelkhand University, Jhansi. With 18 years of teaching and administrative experience, she leads departmental research and mentors IAC student hardware initiatives.",
            image: "assets/faculty/neha.jpg.jpeg",
            linkedin: "https://linkedin.com/in/"
        },
        {
            id: "f2",
            name: "Er. Ikroop Verma",
            designation: "Assistant Professor",
            category: "assistant_professor",
            qualification: "Ph.D. , M.Tech. (Digital & Communication)",
            specialization: "Digital & Wireless Communication, Signal Processing",
            experience: "21 years",
            phone: "+91 9454806929",
            email: "ikroop09@bujhansi.ac.in",
            cabin: "Room 104, 1st Floor, IET Building",
            officeHours: "Mon - Thu (2:00 PM - 4:00 PM)",
            researchPapers: "21+ Years Experience in Digital Communications",
            patents: "Academic Publications",
            bio: "Er. Ikroop Verma is an Assistant Professor with 21 years of academic experience in Digital & Communication Engineering. She guides advanced research in signal processing and communication systems.",
            image: "assets/faculty/ikroop.jpg.jpeg",
            linkedin: "https://linkedin.com/in/"
        },
        {
            id: "f3",
            name: "Dr. Ram Singh Kushwaha",
            designation: "Assistant Professor",
            category: "assistant_professor",
            qualification: "Ph.D. (Electronics & Communication)",
            specialization: "Electronics & Communication Systems, Microprocessors",
            experience: "20 years",
            phone: "+91 9415113184",
            email: "ramsinghkushwaha634@bujhansi.ac.in",
            cabin: "Room 106, 1st Floor, IET Building",
            officeHours: "Tue - Fri (10:00 AM - 12:00 PM)",
            researchPapers: "20+ Years Doctoral Research & Teaching",
            patents: "IEEE Conference Publications",
            bio: "Dr. Ram Singh Kushwaha holds a Ph.D. in Electronics & Communication Engineering and brings 20 years of experience in higher technical education, semiconductor device modeling, and embedded systems.",
            image: "assets/faculty/ramsingh.jpg.jpeg",
            linkedin: "https://linkedin.com/in/"
        },
        {
            id: "f4",
            name: "Er. Anurag Gupta",
            designation: "Teaching Assistant",
            category: "teaching_assistant",
            qualification: "M.Tech. (Electronics & Communication)",
            specialization: "Electronics & Communication, Microcontrollers & Lab Systems",
            experience: "16 years",
            phone: "+91 8770735820",
            email: "bu.ganurag@bujhansi.ac.in",
            cabin: "Room 108, 1st Floor, IET Building",
            officeHours: "Mon - Wed (3:00 PM - 5:00 PM)",
            researchPapers: "16+ Years Practical Laboratory Training",
            patents: "N/A",
            bio: "Er. Anurag Gupta is a Teaching Assistant with 16 years of experience in Electronics & Communication Engineering. He conducts practical laboratory sessions and microcontroller hardware workshops.",
            image: "assets/faculty/anurag.jpg.jpeg",
            linkedin: "https://linkedin.com/in/"
        },
        {
            id: "f5",
            name: "Er. Ashish Swarnkar",
            designation: "Teaching Assistant",
            category: "teaching_assistant",
            qualification: "M.Tech. (Microelectronics & VLSI)",
            specialization: "Microelectronics & VLSI Design, Sensor Interfacing",
            experience: "10 years",
            phone: "+91 9452335450",
            email: "bu.gashish@bujhansi.ac.in",
            cabin: "Instrumentation Lab 2, IET Building",
            officeHours: "Mon - Sat (10:00 AM - 4:00 PM)",
            researchPapers: "10+ Years Experience in VLSI & Circuit Design",
            patents: "N/A",
            bio: "Er. Ashish Swarnkar specializes in Microelectronics & VLSI design with 10 years of experience. He oversees hardware project design, circuit prototyping, and sensor interfacing labs.",
            image: "assets/faculty/ashish.jpg.jpeg",
            linkedin: "https://linkedin.com/in/"
        }
    ],

    // ----------------------------------------------------------------------
    // 2. IAC CORE TEAM DOMAINS & OFFICIAL TEAM HIERARCHY
    // ----------------------------------------------------------------------
    domains: [
        { id: "all", name: "All Core Members", icon: "fa-users", description: "Complete IAC Student Leadership & Domain Members" },
        { id: "presidential", name: "Presidential Office", icon: "fa-crown", description: "Executive leadership & strategic direction" },
        { id: "technical", name: "Technical & Hardware", icon: "fa-microchip", description: "Embedded C++, IoT, web development & hardware systems" },
        { id: "documentation", name: "Documentation & Research", icon: "fa-file-code", description: "Official club reports, research papers & activity records" },
        { id: "event", name: "Event Management", icon: "fa-calendar-alt", description: "Planning, campus logistics, workshops & competitions" },
        { id: "finance", name: "Finance & Accounts", icon: "fa-calculator", description: "Budget allocation, expense tracking & lab procurement" },
        { id: "design", name: "Design & Media", icon: "fa-palette", description: "Visual branding, graphic design & social media strategy" }
    ],

    team: [
        // 1. PRESIDENTIAL OFFICE DOMAIN
        {
            id: "t1",
            name: "Shubhra Yadav",
            role: "President",
            domain: "presidential",
            batch: "B.Tech EIE",
            bio: "Leading overall execution, domain operations, and strategy for IAC.",
            image: "assets/team/shubhra.jpg.jpeg",
            github: "https://github.com/",
            linkedin: "https://www.linkedin.com/in/shubhra-yadav-846218398?utm_source=share_via&utm_content=profile&utm_medium=member_android"
        },
        {
            id: "t2",
            name: "Aditya Kumar Yadav",
            role: "Vice President",
            domain: "presidential",
            batch: "B.Tech EIE",
            bio: "Overseeing executive coordination and management operations.",
            image: "assets/team/aditya.jpg.jpeg",
            github: "https://github.com/",
            linkedin: "https://www.linkedin.com/in/aditya-kumar-yadav-7181b7390?utm_source=share_via&utm_content=profile&utm_medium=member_android"
        },
        {
            id: "t3",
            name: "Gautam Rajput",
            role: "Vice President Associate Member",
            domain: "presidential",
            batch: "B.Tech EIE",
            bio: "Assisting in club operations and member workflows under VP office.",
            image: "assets/team/gautam.jpg.jpeg",
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/"
        },

        // 2. TECHNICAL DOMAIN
        {
            id: "t4",
            name: "Sumit",
            role: "Technical Head",
            domain: "technical",
            batch: "B.Tech EIE",
            bio: "Managing web development, technical projects, and systems.",
            image: "assets/team/sumit.jpg.jpeg",
            github: "https://github.com/sumichaudhary0416-create",
            linkedin: "https://www.linkedin.com/in/sumit-chaudhary-33205a393?utm_source=share_via&utm_content=profile&utm_medium=member_android"
        },
        {
            id: "t5",
            name: "Vishal Ahirwar",
            role: "Technical Member",
            domain: "technical",
            batch: "B.Tech EIE",
            bio: "Core developer handling frontend components and features.",
            image: "assets/team/vishal.jpg.jpeg",
            github: "https://github.com/",
            linkedin: "https://www.linkedin.com/in/vishal-ahirwar-5619483a5?utm_source=share_via&utm_content=profile&utm_medium=member_android"
        },
        {
            id: "t6",
            name: "Satyam Tiwari",
            role: "Technical Member",
            domain: "technical",
            batch: "B.Tech EIE",
            bio: "Managing technical support, testing, and implementation.",
            image: "assets/team/satyam.jpg.jpeg",
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/"
        },

        // 3. DOCUMENTATION DOMAIN
        {
            id: "t7",
            name: "Shubhashini Dwivedi",
            role: "Documentation Head",
            domain: "documentation",
            batch: "B.Tech EIE",
            bio: "Managing official club documentation, reports, and records.",
            image: "assets/team/shubhashini.jpg.jpeg",
            github: "https://github.com/",
            linkedin: "https://www.linkedin.com/in/shubhashini-dwivedi-baa38a2b3?utm_source=share_via&utm_content=profile&utm_medium=member_android"
        },
        {
            id: "t8",
            name: "Yogesh Ahirwar",
            role: "Documentation Member",
            domain: "documentation",
            batch: "B.Tech EIE",
            bio: "Assisting in drafting official reports and event records.",
            image: "assets/team/yogesh.jpg.jpeg",
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/"
        },
        {
            id: "t9",
            name: "Shivam Mishra",
            role: "Documentation Member",
            domain: "documentation",
            batch: "B.Tech EIE",
            bio: "Assisting in drafting official reports and event records.",
            image: "assets/team/shivam.jpg.jpeg",
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/"
        },

        // 4. EVENT MANAGEMENT DOMAIN
        {
            id: "t10",
            name: "Event Coordination Lead",
            role: "Event Management Head",
            domain: "event",
            batch: "B.Tech EIE",
            bio: "Planning and scheduling campus events, workshops, and competitions.",
            image: "assets/team/event/lead.jpg.jpeg",
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/"
        },
        {
            id: "t11",
            name: "Divyanshu Singh",
            role: "Event Coordinator",
            domain: "event",
            batch: "B.Tech EIE",
            bio: "Handling logistics, venue coordination, and scheduling.",
            image: "assets/team/divyanshu.jpg.jpeg",
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/"
        },
        {
            id: "t12",
            name: "Anjali Kumari",
            role: "Event Coordinator",
            domain: "event",
            batch: "B.Tech EIE",
            bio: "Managing volunteer groups and registration desks.",
            image: "assets/team/anjali.jpg.jpeg",
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/"
        },

        // 5. FINANCE DOMAIN
        {
            id: "t13",
            name: "Gaurav Yadav",
            role: "Finance Lead",
            domain: "finance",
            batch: "B.Tech EIE",
            bio: "Managing budgets, accounts, and financial allocation.",
            image: "assets/team/gaurav.jpg.jpeg",
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/"
        },
        {
            id: "t14",
            name: "Deepak Kumar Gupta",
            role: "Finance Associate",
            domain: "finance",
            batch: "B.Tech EIE",
            bio: "Handling documentation and expense tracking under Finance domain.",
            image: "assets/team/deepak.jpg.jpeg",
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/"
        },

        // 6. DESIGN & MEDIA DOMAIN
        {
            id: "t15",
            name: "Kartik Yadav",
            role: "Design & Media Head",
            domain: "design",
            batch: "B.Tech EIE",
            bio: "Directing visual branding, graphic design, and media strategy.",
            image: "assets/team/kartik.jpg.jpeg",
            github: "https://github.com/",
            linkedin: "https://linkedin.com/in/"
        }
    ],

    // ----------------------------------------------------------------------
    // 3. B.TECH EIE LAB MANUALS & EQUIPMENT INVENTORY
    // ----------------------------------------------------------------------
    labManuals: [
        { id: "m1", title: "Process Control & SCADA Lab Manual", subject: "EIE-601", size: "2.4 MB PDF" },
        { id: "m2", title: "Microprocessor 8085 & 8086 Assembly Guide", subject: "EIE-502", size: "3.1 MB PDF" },
        { id: "m3", title: "Biomedical Bio-Signal Acquisition Lab Manual", subject: "EIE-703", size: "1.8 MB PDF" },
        { id: "m4", title: "Sensors & Transducers Signal Conditioning", subject: "EIE-404", size: "2.9 MB PDF" }
    ],

    // ----------------------------------------------------------------------
    // 4. ALUMNI SPOTLIGHT DATA
    // ----------------------------------------------------------------------
    alumni: [
        {
            id: "a1",
            name: "Aakash Verma",
            passoutYear: "2023 Batch",
            designation: "Automation Systems Engineer at Siemens",
            companyLogo: "Siemens",
            quote: "Hands-on PLC & SCADA projects at IAC gave me a massive headstart during my campus placement interviews.",
            linkedin: "https://linkedin.com/in/"
        },
        {
            id: "a2",
            name: "Pooja Gupta",
            passoutYear: "2022 Batch",
            designation: "Embedded Firmware Engineer at Bosch India",
            companyLogo: "Bosch",
            quote: "Building microcontrollers and RTOS projects in the EIE department labs helped me crack core automotive engineering roles.",
            linkedin: "https://linkedin.com/in/"
        },
        {
            id: "a3",
            name: "Rohan Tripathi",
            passoutYear: "2024 Batch",
            designation: "IoT Solutions Specialist at TCS Innovation Lab",
            companyLogo: "TCS",
            quote: "IAC provided the perfect platform to present our hardware prototypes at national engineering exhibitions.",
            linkedin: "https://linkedin.com/in/"
        }
    ],

    // ----------------------------------------------------------------------
    // 5. PROJECTS LAB & HARDWARE SHOWCASE
    // ----------------------------------------------------------------------
    projects: [
        {
            id: "p1",
            title: "Smart PLC & SCADA Industrial Water Treatment Plant",
            category: "control",
            techStack: ["Siemens S7 PLC", "Ladder Logic", "SCADA GUI", "Modbus RS485"],
            description: "An automated industrial water treatment plant prototype featuring closed-loop PID level control, automated solenoid valves, and real-time SCADA monitoring.",
            demoVideo: "https://youtube.com/",
            github: "https://github.com/"
        },
        {
            id: "p2",
            title: "ESP32 IoT Telemetry & Environmental Weather Station",
            category: "iot",
            techStack: ["ESP32 Wi-Fi", "BME280 Sensor", "MQTT Protocol", "Grafana Dashboard"],
            description: "Wireless sensor telemetry node monitoring ambient temperature, relative humidity, pressure, and air quality index pushed to cloud dashboards over MQTT.",
            demoVideo: "https://youtube.com/",
            github: "https://github.com/"
        },
        {
            id: "p3",
            title: "Portable Bio-Medical ECG Heartbeat Monitor",
            category: "embedded",
            techStack: ["AD8232 ECG Shield", "Arduino Nano", "OLED Display", "Active Op-Amp Filter"],
            description: "Low-cost non-invasive ECG monitor acquiring Real-time cardiac biopotential signals with digital QRS wave detection and heartbeat alerts.",
            demoVideo: "https://youtube.com/",
            github: "https://github.com/"
        }
    ],

    // ----------------------------------------------------------------------
    // 6. UPCOMING EVENTS & WORKSHOPS
    // ----------------------------------------------------------------------
    events: [
        {
            id: "e1",
            title: "Hands-on ESP32 IoT & Microcontroller Bootcamp 2026",
            date: "August 28, 2026",
            time: "10:00 AM - 4:00 PM",
            venue: "EIE Main Seminar Hall, 1st Floor, IET Building",
            status: "Upcoming",
            description: "Learn microcontroller firmware writing in C++, Wi-Fi telemetry protocols, and sensor interfacing from scratch."
        },
        {
            id: "e2",
            title: "Industrial PLC Ladder Logic & SCADA Workshop",
            date: "September 15, 2026",
            time: "11:00 AM - 3:00 PM",
            venue: "Process Control Laboratory, IET Building",
            status: "Upcoming",
            description: "Practical training session on Siemens S7 PLC hardware wiring, timers, counters, and SCADA HMI GUI development."
        }
    ]
};

window.IAC_DATA = IACApp_DATA;
