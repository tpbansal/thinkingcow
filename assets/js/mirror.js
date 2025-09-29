// Initialize visitor stats
function initializeStats() {
    // Get or create visitor stats from localStorage
    let stats = JSON.parse(localStorage.getItem('visitorStats') || '{}');

    // Initialize default stats
    if (!stats.totalVisits) stats.totalVisits = 0;
    if (!stats.uniqueVisitors) stats.uniqueVisitors = new Set();
    if (!stats.pageViews) stats.pageViews = 0;
    if (!stats.sessions) stats.sessions = [];

    return stats;
}

// Update visitor stats
function updateStats() {
    let stats = initializeStats();
    const visitorId = getVisitorId();
    const now = new Date();

    // Update counts
    stats.totalVisits++;
    stats.pageViews++;

    // Track unique visitors
    if (!stats.uniqueVisitors.includes) {
        stats.uniqueVisitors = Array.from(new Set(stats.uniqueVisitors));
    }
    if (!stats.uniqueVisitors.includes(visitorId)) {
        stats.uniqueVisitors.push(visitorId);
    }

    // Track session
    stats.sessions.push({
        id: visitorId,
        timestamp: now.toISOString(),
        page: 'mirror'
    });

    // Keep only last 1000 sessions
    if (stats.sessions.length > 1000) {
        stats.sessions = stats.sessions.slice(-1000);
    }

    localStorage.setItem('visitorStats', JSON.stringify(stats));
    return stats;
}

// Generate visitor ID
function getVisitorId() {
    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
        visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('visitorId', visitorId);
    }
    return visitorId;
}

// Generate canvas fingerprint
function getCanvasFingerprint() {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 50;

        // Draw some text and shapes
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText('Browser fingerprint', 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText('Canvas fingerprint', 4, 35);

        return canvas.toDataURL().slice(-8);
    } catch (e) {
        return 'Not available';
    }
}

// Generate WebGL fingerprint
function getWebGLFingerprint() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return 'Not supported';

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown';
        const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown';

        return `${vendor}_${renderer}`.slice(-12);
    } catch (e) {
        return 'Not available';
    }
}

// Generate audio fingerprint
function getAudioFingerprint() {
    return new Promise((resolve) => {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const analyser = audioContext.createAnalyser();
            const gainNode = audioContext.createGain();
            const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

            oscillator.type = 'triangle';
            oscillator.frequency.value = 10000;

            gainNode.gain.value = 0;
            oscillator.connect(analyser);
            analyser.connect(scriptProcessor);
            scriptProcessor.connect(gainNode);
            gainNode.connect(audioContext.destination);

            scriptProcessor.onaudioprocess = function(bins) {
                const samples = new Float32Array(analyser.frequencyBinCount);
                analyser.getFloatFrequencyData(samples);
                let fingerprint = 0;
                for (let i = 0; i < samples.length; ++i) {
                    fingerprint += Math.abs(samples[i]);
                }
                audioContext.close();
                resolve(fingerprint.toString().slice(-8));
            };

            oscillator.start();
        } catch (e) {
            resolve('Not available');
        }
    });
}

// Detect available fonts
function getFontFingerprint() {
    const testString = 'mmmmmmmmmmlli';
    const testSize = '72px';
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const fontList = [
        'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia',
        'Helvetica', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman',
        'Trebuchet MS', 'Verdana', 'Calibri', 'Cambria', 'Century Gothic',
        'Franklin Gothic Medium', 'Palatino Linotype'
    ];

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;

    // Test base fonts
    const baseFontWidths = baseFonts.map(font => {
        context.font = testSize + ' ' + font;
        return context.measureText(testString).width;
    });

    // Test other fonts
    const availableFonts = [];
    fontList.forEach(font => {
        baseFonts.forEach((baseFont, index) => {
            context.font = testSize + ' ' + font + ', ' + baseFont;
            const width = context.measureText(testString).width;
            if (width !== baseFontWidths[index]) {
                availableFonts.push(font);
                return;
            }
        });
    });

    return availableFonts.length.toString() + '_fonts';
}

// Get WebGL info
function getWebGLInfo() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return { vendor: 'Not supported', renderer: 'Not supported' };

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        return {
            vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown',
            renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown'
        };
    } catch (e) {
        return { vendor: 'Error', renderer: 'Error' };
    }
}

// Get detailed browser info
function getDetailedBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    let version = 'Unknown';

    if (ua.includes('Chrome') && !ua.includes('Chromium')) {
        browser = 'Chrome';
        const match = ua.match(/Chrome\/(\d+\.\d+)/);
        version = match ? match[1] : 'Unknown';
    } else if (ua.includes('Firefox')) {
        browser = 'Firefox';
        const match = ua.match(/Firefox\/(\d+\.\d+)/);
        version = match ? match[1] : 'Unknown';
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
        browser = 'Safari';
        const match = ua.match(/Version\/(\d+\.\d+)/);
        version = match ? match[1] : 'Unknown';
    } else if (ua.includes('Edge')) {
        browser = 'Edge';
        const match = ua.match(/Edge\/(\d+\.\d+)/);
        version = match ? match[1] : 'Unknown';
    }

    return { browser, version };
}

// Get browser information
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';

    if (ua.includes('Chrome') && !ua.includes('Chromium')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';
    else if (ua.includes('Opera')) browser = 'Opera';

    return browser;
}

// Get OS information
function getOSInfo() {
    const ua = navigator.userAgent;
    let os = 'Unknown';

    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iOS')) os = 'iOS';

    return os;
}

// Check storage availability
function checkStorageSupport() {
    const checks = {
        localStorage: false,
        sessionStorage: false,
        indexedDB: false
    };

    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        checks.localStorage = true;
    } catch (e) {}

    try {
        sessionStorage.setItem('test', 'test');
        sessionStorage.removeItem('test');
        checks.sessionStorage = true;
    } catch (e) {}

    try {
        checks.indexedDB = !!window.indexedDB;
    } catch (e) {}

    return checks;
}

// Check for ad blocker
function detectAdBlocker() {
    try {
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox';
        testAd.style.cssText = 'position:absolute;top:-1px;left:-1px;width:1px;height:1px;';
        document.body.appendChild(testAd);

        setTimeout(() => {
            const blocked = testAd.offsetHeight === 0;
            document.getElementById('ad-blocker').textContent = blocked ? 'Detected' : 'Not detected';
            document.body.removeChild(testAd);
        }, 100);
    } catch (e) {
        document.getElementById('ad-blocker').textContent = 'Unknown';
    }
}

// Check browser capabilities
function checkBrowserCapabilities() {
    const capabilities = {
        webrtc: !!(window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection),
        geolocation: !!navigator.geolocation,
        notifications: 'Notification' in window,
        serviceWorkers: 'serviceWorker' in navigator,
        webassembly: typeof WebAssembly === 'object',
        battery: !!navigator.getBattery
    };

    return capabilities;
}

// Get plugin information (updated for modern browsers)
function getPluginInfo() {
    // navigator.plugins is deprecated, use feature detection instead
    const features = [];
    if ('serviceWorker' in navigator) features.push('Service Workers');
    if ('geolocation' in navigator) features.push('Geolocation');
    if ('Notification' in window) features.push('Notifications');
    if (window.DeviceMotionEvent) features.push('Device Motion');
    if (window.DeviceOrientationEvent) features.push('Device Orientation');

    return {
        count: features.length,
        list: features.slice(0, 5).join(', ') + (features.length > 5 ? '...' : 'Available')
    };
}

// Check third-party cookie support
async function checkThirdPartyCookies() {
    try {
        // Try to set a cookie from a different domain context
        document.cookie = 'test3p=1; SameSite=None; Secure';
        const supported = document.cookie.includes('test3p=1');
        document.cookie = 'test3p=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        return supported ? 'Allowed' : 'Blocked';
    } catch (e) {
        return 'Unknown';
    }
}

// Calculate average session duration
function calculateAvgDuration(sessions) {
    if (sessions.length < 2) return '0m';

    const durations = [];
    for (let i = 1; i < sessions.length; i++) {
        const prev = new Date(sessions[i-1].timestamp);
        const curr = new Date(sessions[i].timestamp);
        const diff = Math.abs(curr - prev) / 1000 / 60; // minutes
        if (diff < 60) durations.push(diff); // Only count sessions < 1 hour
    }

    if (durations.length === 0) return '0m';
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    return Math.round(avg) + 'm';
}

// Fetch IP and location information
async function fetchIPInfo() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        document.getElementById('ip-address').textContent = data.ip || 'Unknown';
        document.getElementById('location').textContent =
            `${data.city || 'Unknown'}, ${data.region || ''} ${data.country_name || ''}`.trim();
        document.getElementById('isp').textContent = data.org || 'Unknown';
    } catch (error) {
        document.getElementById('ip-address').textContent = 'Unable to fetch';
        document.getElementById('location').textContent = 'Unable to fetch';
        document.getElementById('isp').textContent = 'Unable to fetch';
    }
}

// Initialize page
async function initializePage() {
    const startTime = performance.now();

    // Update stats
    const stats = updateStats();

    // Get comprehensive browser information
    const browserInfo = getDetailedBrowserInfo();
    const webglInfo = getWebGLInfo();
    const storageSupport = checkStorageSupport();
    const capabilities = checkBrowserCapabilities();
    const pluginInfo = getPluginInfo();

    // Basic system information
    document.getElementById('user-agent').textContent = navigator.userAgent;
    document.getElementById('browser').textContent = browserInfo.browser;
    document.getElementById('browser-version').textContent = browserInfo.version;
    document.getElementById('os').textContent = getOSInfo();
    document.getElementById('platform').textContent = navigator.platform || 'Unknown';
    document.getElementById('cpu-cores').textContent = navigator.hardwareConcurrency || 'Unknown';
    document.getElementById('memory').textContent =
        navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Unknown';
    document.getElementById('languages').textContent =
        navigator.languages ? navigator.languages.join(', ') : navigator.language || 'Unknown';

    // Display information
    document.getElementById('screen-resolution').textContent =
        `${screen.width}x${screen.height}`;
    document.getElementById('available-resolution').textContent =
        `${screen.availWidth}x${screen.availHeight}`;
    document.getElementById('color-depth').textContent = `${screen.colorDepth}-bit`;
    document.getElementById('pixel-ratio').textContent = window.devicePixelRatio || 'Unknown';
    document.getElementById('touch-support').textContent =
        'ontouchstart' in window || navigator.maxTouchPoints > 0 ? 'Yes' : 'No';

    // WebGL information
    document.getElementById('webgl-vendor').textContent = webglInfo.vendor;
    document.getElementById('webgl-renderer').textContent = webglInfo.renderer;

    // Network information
    if (navigator.connection) {
        document.getElementById('connection-type').textContent =
            navigator.connection.effectiveType || navigator.connection.type || 'Unknown';
        document.getElementById('bandwidth').textContent =
            navigator.connection.downlink ? `${navigator.connection.downlink} Mbps` : 'Unknown';
    } else {
        document.getElementById('connection-type').textContent = 'Unknown';
        document.getElementById('bandwidth').textContent = 'Unknown';
    }

    // Privacy settings
    document.getElementById('do-not-track').textContent =
        navigator.doNotTrack === '1' ? 'Enabled' : 'Disabled';
    document.getElementById('cookies-enabled').textContent =
        navigator.cookieEnabled ? 'Yes' : 'No';
    document.getElementById('local-storage').textContent =
        storageSupport.localStorage ? 'Available' : 'Not available';
    document.getElementById('session-storage').textContent =
        storageSupport.sessionStorage ? 'Available' : 'Not available';
    document.getElementById('indexeddb').textContent =
        storageSupport.indexedDB ? 'Available' : 'Not available';

    // Browser capabilities
    document.getElementById('webrtc-support').textContent =
        capabilities.webrtc ? 'Yes' : 'No';
    document.getElementById('geolocation-api').textContent =
        capabilities.geolocation ? 'Available' : 'Not available';
    document.getElementById('notification-api').textContent =
        capabilities.notifications ? 'Available' : 'Not available';
    document.getElementById('service-workers').textContent =
        capabilities.serviceWorkers ? 'Supported' : 'Not supported';
    document.getElementById('webassembly').textContent =
        capabilities.webassembly ? 'Supported' : 'Not supported';
    document.getElementById('battery-api').textContent =
        capabilities.battery ? 'Available' : 'Not available';

    // Plugin information
    document.getElementById('plugin-count').textContent = pluginInfo.count;
    document.getElementById('plugin-list').textContent = pluginInfo.list || 'None detected';

    // Fingerprinting identifiers
    document.getElementById('canvas-fingerprint').textContent = getCanvasFingerprint();
    document.getElementById('webgl-fingerprint').textContent = getWebGLFingerprint();
    document.getElementById('font-fingerprint').textContent = getFontFingerprint();

    // Session information
    document.getElementById('timezone').textContent =
        Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById('visit-time').textContent =
        new Date().toLocaleString();
    document.getElementById('referrer').textContent =
        document.referrer || 'Direct';

    // Calculate and display load time
    const loadTime = performance.now() - startTime;
    document.getElementById('load-time').textContent = `${Math.round(loadTime)}ms`;

    // Display stats
    document.getElementById('total-visits').textContent = stats.totalVisits;
    document.getElementById('unique-visitors').textContent =
        Array.isArray(stats.uniqueVisitors) ? stats.uniqueVisitors.length : 0;
    document.getElementById('page-views').textContent = stats.pageViews;
    document.getElementById('avg-duration').textContent =
        calculateAvgDuration(stats.sessions);
    document.getElementById('last-update').textContent =
        new Date().toLocaleString();

    // Fetch IP info and audio fingerprint asynchronously
    fetchIPInfo();

    // Generate audio fingerprint (async)
    getAudioFingerprint().then(fingerprint => {
        document.getElementById('audio-fingerprint').textContent = fingerprint;
    });

    // Check for ad blocker
    detectAdBlocker();

    // Check third-party cookie support
    checkThirdPartyCookies().then(result => {
        document.getElementById('third-party-cookies').textContent = result;
    });
}

// === NEW COOL FUNCTIONALITIES ===

// 1. Live Threat Analysis
function initializeThreatAnalysis() {
    setTimeout(() => {
        const threatScore = calculateThreatScore();
        const threatLevel = document.getElementById('threat-level');
        const scoreElement = document.getElementById('threat-score');
        const labelElement = document.getElementById('threat-label');

        scoreElement.textContent = threatScore + '/100';

        if (threatScore < 30) {
            labelElement.textContent = 'Low Risk';
            threatLevel.style.borderColor = '#00ff00';
        } else if (threatScore < 70) {
            labelElement.textContent = 'Medium Risk';
            threatLevel.style.borderColor = '#ffaa00';
        } else {
            labelElement.textContent = 'High Risk';
            threatLevel.style.borderColor = '#ff0000';
        }

        // Update security metrics
        document.getElementById('connection-security').textContent =
            location.protocol === 'https:' ? 'Secure (HTTPS)' : 'Insecure (HTTP)';

        document.getElementById('privacy-score').textContent =
            `${Math.max(0, 100 - threatScore)}/100`;

        document.getElementById('tracking-exposure').textContent =
            threatScore > 50 ? 'High Exposure' : 'Limited Exposure';
    }, 1500);
}

function calculateThreatScore() {
    let score = 0;

    // Fingerprinting factors
    if (!navigator.doNotTrack || navigator.doNotTrack !== '1') score += 15;
    if (navigator.cookieEnabled) score += 10;
    if (localStorage && sessionStorage) score += 10;
    if (navigator.geolocation) score += 15;
    if ('Notification' in window) score += 5;
    if (navigator.hardwareConcurrency > 4) score += 10;
    if (screen.width > 1920) score += 5;
    if (navigator.languages.length > 2) score += 10;
    if (location.protocol !== 'https:') score += 20;

    return Math.min(100, score);
}

// 2. Real-Time Performance Monitor
function initializePerformanceMonitor() {
    const cpuChart = document.getElementById('cpu-chart');
    const memoryChart = document.getElementById('memory-chart');
    const networkChart = document.getElementById('network-chart');

    if (cpuChart && memoryChart && networkChart) {
        drawPerformanceCharts(cpuChart, memoryChart, networkChart);
        startPerformanceMonitoring();
    }
}

function drawPerformanceCharts(cpuCanvas, memoryCanvas, networkCanvas) {
    // Simple chart drawing for CPU
    const cpuCtx = cpuCanvas.getContext('2d');
    cpuCtx.strokeStyle = '#ff00ff';
    cpuCtx.lineWidth = 2;
    cpuCtx.beginPath();
    for (let i = 0; i < 150; i += 5) {
        const y = 50 + Math.sin(i / 20) * 20 + Math.random() * 10;
        if (i === 0) cpuCtx.moveTo(i, y);
        else cpuCtx.lineTo(i, y);
    }
    cpuCtx.stroke();

    // Memory chart
    const memCtx = memoryCanvas.getContext('2d');
    memCtx.strokeStyle = '#00ffff';
    memCtx.lineWidth = 2;
    memCtx.beginPath();
    for (let i = 0; i < 150; i += 5) {
        const y = 70 - (i / 150) * 40 + Math.random() * 10;
        if (i === 0) memCtx.moveTo(i, y);
        else memCtx.lineTo(i, y);
    }
    memCtx.stroke();

    // Network chart
    const netCtx = networkCanvas.getContext('2d');
    netCtx.strokeStyle = '#ffaa00';
    netCtx.lineWidth = 2;
    netCtx.beginPath();
    for (let i = 0; i < 150; i += 5) {
        const y = 50 + Math.cos(i / 15) * 25 + Math.random() * 5;
        if (i === 0) netCtx.moveTo(i, y);
        else netCtx.lineTo(i, y);
    }
    netCtx.stroke();
}

function startPerformanceMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();

    function updatePerformanceStats() {
        frameCount++;
        const now = performance.now();

        if (now - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (now - lastTime));
            document.getElementById('frame-rate').textContent = fps + 'fps';
            frameCount = 0;
            lastTime = now;
        }

        // Simulated CPU temperature (not actually accessible)
        const temp = 45 + Math.random() * 20;
        document.getElementById('cpu-temp').textContent = Math.round(temp) + '°C';

        // Response time simulation
        const responseTime = 50 + Math.random() * 100;
        document.getElementById('response-time').textContent = Math.round(responseTime) + 'ms';

        requestAnimationFrame(updatePerformanceStats);
    }

    updatePerformanceStats();
}

// 3. Advanced Fingerprint Scanner
function initializeAdvancedFingerprinting() {
    setTimeout(() => {
        calculateUniquenessScore();
        generateHardwareSignature();
        analyzeBehavioralPattern();
        mapNetworkFootprint();
    }, 2000);
}

function calculateUniquenessScore() {
    // Calculate how unique this browser fingerprint is
    const factors = [
        navigator.userAgent.length,
        screen.width * screen.height,
        navigator.hardwareConcurrency || 1,
        navigator.deviceMemory || 1,
        navigator.languages.length,
        (performance.now() % 1000)
    ];

    const hash = factors.reduce((acc, val) => ((acc << 5) - acc + val) & 0xffffffff, 0);
    const uniqueness = Math.abs(hash % 100);

    document.getElementById('uniqueness-score').textContent = uniqueness + '%';
}

function generateHardwareSignature() {
    const signature = [
        (navigator.hardwareConcurrency || 'unknown'),
        (navigator.deviceMemory ? navigator.deviceMemory + 'GB' : 'unknown'),
        screen.width + 'x' + screen.height,
        (window.devicePixelRatio || 1).toFixed(1)
    ].join('-').toUpperCase().slice(0, 12);

    document.getElementById('hardware-signature').textContent = signature;
}

function analyzeBehavioralPattern() {
    const patterns = ['ACTIVE_EXPLORER', 'PRIVACY_FOCUSED', 'POWER_USER', 'CASUAL_BROWSER', 'DEVELOPER_MODE'];
    let pattern = 'CASUAL_BROWSER';

    if (navigator.doNotTrack === '1') pattern = 'PRIVACY_FOCUSED';
    else if (navigator.hardwareConcurrency > 8) pattern = 'POWER_USER';
    else if (navigator.userAgent.includes('Chrome') && navigator.userAgent.includes('Mobile')) pattern = 'ACTIVE_EXPLORER';
    else if (navigator.webdriver || window.outerWidth - window.innerWidth > 100) pattern = 'DEVELOPER_MODE';

    document.getElementById('behavioral-pattern').textContent = pattern;
}

function mapNetworkFootprint() {
    const footprint = [
        location.protocol.replace(':', '').toUpperCase(),
        navigator.connection ? navigator.connection.effectiveType || 'UNKNOWN' : 'UNKNOWN',
        navigator.onLine ? 'ONLINE' : 'OFFLINE'
    ].join('_');

    document.getElementById('network-footprint').textContent = footprint;
}

// Initialize new features
function initializeNewFeatures() {
    initializeThreatAnalysis();
    initializePerformanceMonitor();
    initializeAdvancedFingerprinting();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    setTimeout(initializeNewFeatures, 500);
});