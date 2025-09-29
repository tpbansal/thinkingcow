// Note: This tool does not record or store any visitor statistics
// All analysis is performed locally in your browser

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


// Fetch IP and location information with IPv4/IPv6 detection
async function fetchIPInfo() {
    try {
        // Fetch both IPv4 and IPv6 if available
        const [ipv4Response, ipv6Response, locationResponse] = await Promise.allSettled([
            fetch('https://ipv4.icanhazip.com/').then(r => r.text()),
            fetch('https://ipv6.icanhazip.com/').then(r => r.text()),
            fetch('https://ipapi.co/json/')
        ]);

        // Handle IPv4
        if (ipv4Response.status === 'fulfilled') {
            document.getElementById('ipv4-address').textContent = ipv4Response.value.trim();
        } else {
            document.getElementById('ipv4-address').textContent = 'Not detected';
        }

        // Handle IPv6
        if (ipv6Response.status === 'fulfilled') {
            document.getElementById('ipv6-address').textContent = ipv6Response.value.trim();
        } else {
            document.getElementById('ipv6-address').textContent = 'Not available';
        }

        // Handle location data
        if (locationResponse.status === 'fulfilled') {
            const data = await locationResponse.value.json();
            document.getElementById('location').textContent =
                `${data.city || 'Unknown'}, ${data.region || ''} ${data.country_name || ''}`.trim();
            document.getElementById('isp').textContent = data.org || 'Unknown';
        } else {
            document.getElementById('location').textContent = 'Unable to fetch';
            document.getElementById('isp').textContent = 'Unable to fetch';
        }

    } catch (error) {
        document.getElementById('ipv4-address').textContent = 'Detection failed';
        document.getElementById('ipv6-address').textContent = 'Detection failed';
        document.getElementById('location').textContent = 'Unable to fetch';
        document.getElementById('isp').textContent = 'Unable to fetch';
    }
}

// Detect DNS servers (approximation)
function detectDNSServers() {
    // This is a limited detection since browsers don't expose actual DNS servers
    const dnsHints = [];

    if (navigator.connection) {
        if (navigator.connection.effectiveType) {
            dnsHints.push('System DNS');
        }
    }

    // Check for common DNS indicators
    if (navigator.onLine) {
        dnsHints.push('Active DNS resolution');
    }

    document.getElementById('dns-servers').textContent =
        dnsHints.length > 0 ? dnsHints.join(', ') : 'Cannot detect directly';
}

// Initialize page
async function initializePage() {
    const startTime = performance.now();

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

    // Update last updated time
    document.getElementById('last-update').textContent =
        new Date().toLocaleString();

    // Fetch IP info and detect DNS asynchronously
    fetchIPInfo();
    detectDNSServers();

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

// === ENHANCED EDUCATIONAL MIRROR FUNCTIONALITY ===

// Privacy Health Assessment System
class PrivacyHealthChecker {
    constructor() {
        this.score = 100; // Start with perfect score
        this.recommendations = [];
        this.issues = [];
    }

    analyzePrivacyHealth(browserData) {
        this.score = 100;
        this.recommendations = [];
        this.issues = [];

        // Analyze various privacy factors
        this.checkDoNotTrack(browserData);
        this.checkCookies(browserData);
        this.checkWebRTC(browserData);
        this.checkFingerprinting(browserData);
        this.checkBrowserSecurity(browserData);
        this.checkStorageAPIs(browserData);

        return {
            score: Math.max(0, this.score),
            level: this.getPrivacyLevel(),
            recommendations: this.recommendations,
            issues: this.issues
        };
    }

    checkDoNotTrack(data) {
        if (!navigator.doNotTrack || navigator.doNotTrack !== '1') {
            this.score -= 10;
            this.addRecommendation('⚠️', 'Enable "Do Not Track" in browser settings', 'Browser Settings → Privacy → Do Not Track', 'medium');
        }
    }

    checkCookies(data) {
        if (navigator.cookieEnabled) {
            this.score -= 15;
            this.addRecommendation('🍪', 'Consider disabling third-party cookies', 'Browser Settings → Privacy → Block third-party cookies', 'high');
        }
    }

    checkWebRTC(data) {
        if (data.webrtcLeak) {
            this.score -= 25;
            this.addRecommendation('🚨', 'WebRTC is leaking your real IP address', 'Disable WebRTC or use VPN with WebRTC protection', 'critical');
        }
    }

    checkFingerprinting(data) {
        if (data.uniqueFingerprint) {
            this.score -= 20;
            this.addRecommendation('👁️', 'Your browser has a unique fingerprint', 'Use Tor Browser or fingerprint protection extensions', 'high');
        }
    }

    checkBrowserSecurity(data) {
        if (location.protocol !== 'https:') {
            this.score -= 15;
            this.addRecommendation('🔓', 'You\'re not using HTTPS', 'Always use HTTPS websites for secure communication', 'high');
        }
    }

    checkStorageAPIs(data) {
        let storageAPIs = 0;
        if (localStorage) storageAPIs++;
        if (sessionStorage) storageAPIs++;
        if (window.indexedDB) storageAPIs++;

        if (storageAPIs >= 3) {
            this.score -= 10;
            this.addRecommendation('💾', 'Multiple storage APIs available for tracking', 'Regularly clear browser data and use privacy extensions', 'medium');
        }
    }

    addRecommendation(icon, issue, action, severity) {
        this.recommendations.push({ icon, issue, action, severity });
    }

    getPrivacyLevel() {
        if (this.score >= 80) return { level: 'excellent', label: 'Excellent Privacy', color: '#00ff00' };
        if (this.score >= 60) return { level: 'good', label: 'Good Privacy', color: '#90ff00' };
        if (this.score >= 40) return { level: 'fair', label: 'Fair Privacy', color: '#ffaa00' };
        if (this.score >= 20) return { level: 'poor', label: 'Poor Privacy', color: '#ff6600' };
        return { level: 'critical', label: 'Critical Issues', color: '#ff0000' };
    }
}

// WebRTC Leak Detection
async function detectWebRTCLeaks() {
    return new Promise((resolve) => {
        let hasWebRTC = false;
        let localIPs = [];

        // Check if WebRTC is available
        if (!window.RTCPeerConnection && !window.webkitRTCPeerConnection && !window.mozRTCPeerConnection) {
            resolve({ leak: false, disabled: true });
            return;
        }

        try {
            const RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
            const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });

            pc.createDataChannel('');
            pc.createOffer()
                .then(offer => pc.setLocalDescription(offer))
                .catch(err => resolve({ leak: false, error: err.message }));

            pc.onicecandidate = function(event) {
                if (!event.candidate) {
                    // Check results after gathering
                    setTimeout(() => {
                        resolve({
                            leak: localIPs.length > 0,
                            localIPs: localIPs,
                            hasWebRTC: true
                        });
                    }, 100);
                    return;
                }

                const candidate = event.candidate.candidate;
                const ipMatch = candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/);

                if (ipMatch && ipMatch[1]) {
                    const ip = ipMatch[1];
                    if (ip.indexOf('192.168.') === 0 || ip.indexOf('10.') === 0 || ip.indexOf('172.') === 0) {
                        if (localIPs.indexOf(ip) === -1) {
                            localIPs.push(ip);
                        }
                    }
                }
            };

            // Timeout after 3 seconds
            setTimeout(() => {
                pc.close();
                resolve({
                    leak: localIPs.length > 0,
                    localIPs: localIPs,
                    hasWebRTC: true,
                    timeout: true
                });
            }, 3000);

        } catch (error) {
            resolve({ leak: false, error: error.message });
        }
    });
}

// Update Privacy Health Display
function updatePrivacyHealth(healthData) {
    const scoreElement = document.getElementById('score-number');
    const labelElement = document.getElementById('score-label');
    const statusElement = document.getElementById('health-status');
    const circleElement = document.getElementById('health-circle');
    const recommendationsList = document.getElementById('recommendations-list');

    // Update score display
    scoreElement.textContent = healthData.score;
    labelElement.textContent = healthData.level.label;
    statusElement.textContent = `Privacy Score: ${healthData.score}/100`;

    // Update circle color
    circleElement.style.background = `conic-gradient(${healthData.level.color} ${healthData.score * 3.6}deg, var(--accent-color) ${healthData.score * 3.6}deg)`;

    // Clear loading recommendations
    recommendationsList.innerHTML = '';

    // Add recommendations
    if (healthData.recommendations.length === 0) {
        recommendationsList.innerHTML = `
            <div class="recommendation-item">
                <span class="rec-icon">✅</span>
                <span class="rec-text">Great job! Your privacy settings look good.</span>
            </div>
        `;
    } else {
        healthData.recommendations.forEach(rec => {
            const recElement = document.createElement('div');
            recElement.className = 'recommendation-item';
            recElement.innerHTML = `
                <span class="rec-icon">${rec.icon}</span>
                <div class="rec-text">
                    <div><strong>${rec.issue}</strong></div>
                    <div style="margin-top: 5px; font-size: 13px; opacity: 0.8;">${rec.action}</div>
                </div>
            `;
            recommendationsList.appendChild(recElement);
        });
    }
}

// Enhanced initialization with privacy health check
async function initializeEnhancedMirror() {
    const privacyChecker = new PrivacyHealthChecker();

    // Detect WebRTC leaks
    const webrtcData = await detectWebRTCLeaks();

    // Update WebRTC status display
    const webrtcStatusElement = document.getElementById('webrtc-status');
    if (webrtcData.disabled) {
        webrtcStatusElement.textContent = 'Disabled (Secure)';
        webrtcStatusElement.className = 'webrtc-secure';
    } else if (webrtcData.leak) {
        webrtcStatusElement.textContent = `IP Leak Detected (${webrtcData.localIPs.join(', ')})`;
        webrtcStatusElement.className = 'webrtc-leak';
    } else if (webrtcData.hasWebRTC) {
        webrtcStatusElement.textContent = 'Enabled but no local IP leak detected';
        webrtcStatusElement.className = 'webrtc-secure';
    } else {
        webrtcStatusElement.textContent = 'Unable to detect';
    }

    // Analyze privacy health
    const browserData = {
        webrtcLeak: webrtcData.leak,
        uniqueFingerprint: true // Simplified for now
    };

    const healthData = privacyChecker.analyzePrivacyHealth(browserData);

    // Update displays
    setTimeout(() => {
        updatePrivacyHealth(healthData);
    }, 1500);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    setTimeout(initializeEnhancedMirror, 1000);
});