// Structured PCB-style circuit background with flowing electricity
(function() {
    'use strict';

    // Configuration
    const config = {
        gridSize: 80,               // Grid cell size for structured layout
        nodeTypes: {
            junction: 0.4,          // Probability of junction nodes
            chip: 0.15,             // Probability of chip/IC nodes
            resistor: 0.25,         // Probability of resistor nodes
            capacitor: 0.2          // Probability of capacitor nodes
        },
        particleCount: 25,          // Number of flowing particles
        particleSpeed: 0.8,         // Speed of electricity flow
        pulseSpeed: 0.015,          // Speed of component pulsing
        bgOpacity: 0.5,             // Overall opacity
        traceWidth: 2,              // Circuit trace width
        colors: {
            trace: '#ff00ff',       // Magenta traces
            junction: '#ff00ff',    // Magenta junctions
            chip: '#ffffff',        // White chips/ICs
            component: '#00ffff',   // Cyan components
            particle: '#00ffff',    // Cyan particles
            particleGlow: '#ffffff' // White particle glow
        }
    };

    class GridNode {
        constructor(gridX, gridY, type) {
            this.gridX = gridX;
            this.gridY = gridY;
            this.type = type; // 'junction', 'chip', 'resistor', 'capacitor'
            this.connections = []; // Array of {node, path}
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.active = false;
        }

        get x() {
            return this.gridX * config.gridSize;
        }

        get y() {
            return this.gridY * config.gridSize;
        }

        update() {
            this.pulsePhase += config.pulseSpeed;
        }

        draw(ctx) {
            const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;

            switch(this.type) {
                case 'junction':
                    this.drawJunction(ctx, pulse);
                    break;
                case 'chip':
                    this.drawChip(ctx, pulse);
                    break;
                case 'resistor':
                    this.drawResistor(ctx, pulse);
                    break;
                case 'capacitor':
                    this.drawCapacitor(ctx, pulse);
                    break;
            }
        }

        drawJunction(ctx, pulse) {
            const size = 4 + pulse * 2;

            // Glow
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 12);
            gradient.addColorStop(0, config.colors.junction + 'aa');
            gradient.addColorStop(0.5, config.colors.junction + '40');
            gradient.addColorStop(1, config.colors.junction + '00');
            ctx.fillStyle = gradient;
            ctx.fillRect(this.x - 12, this.y - 12, 24, 24);

            // Core
            ctx.fillStyle = config.colors.junction;
            ctx.fillRect(this.x - size/2, this.y - size/2, size, size);
        }

        drawChip(ctx, pulse) {
            const size = 20;
            const opacity = Math.floor((0.6 + pulse * 0.4) * 255).toString(16).padStart(2, '0');

            // Chip body
            ctx.strokeStyle = config.colors.chip + opacity;
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x - size/2, this.y - size/2, size, size);

            // Pins (left and right)
            ctx.strokeStyle = config.colors.chip + opacity;
            ctx.lineWidth = 1;
            for(let i = 0; i < 3; i++) {
                const pinY = this.y - 6 + i * 6;
                // Left pins
                ctx.beginPath();
                ctx.moveTo(this.x - size/2, pinY);
                ctx.lineTo(this.x - size/2 - 4, pinY);
                ctx.stroke();
                // Right pins
                ctx.beginPath();
                ctx.moveTo(this.x + size/2, pinY);
                ctx.lineTo(this.x + size/2 + 4, pinY);
                ctx.stroke();
            }

            // Center dot
            ctx.fillStyle = config.colors.chip + opacity;
            ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
        }

        drawResistor(ctx, pulse) {
            const width = 16;
            const height = 6;
            const opacity = Math.floor((0.6 + pulse * 0.4) * 255).toString(16).padStart(2, '0');

            ctx.strokeStyle = config.colors.component + opacity;
            ctx.lineWidth = 2;

            // Resistor body (zigzag pattern)
            ctx.beginPath();
            ctx.moveTo(this.x - width/2, this.y);
            ctx.lineTo(this.x - width/2 + 3, this.y - height/2);
            ctx.lineTo(this.x - width/2 + 6, this.y + height/2);
            ctx.lineTo(this.x - width/2 + 9, this.y - height/2);
            ctx.lineTo(this.x - width/2 + 12, this.y + height/2);
            ctx.lineTo(this.x + width/2, this.y);
            ctx.stroke();
        }

        drawCapacitor(ctx, pulse) {
            const width = 12;
            const height = 8;
            const opacity = Math.floor((0.6 + pulse * 0.4) * 255).toString(16).padStart(2, '0');

            ctx.strokeStyle = config.colors.component + opacity;
            ctx.lineWidth = 2;

            // Two parallel lines
            ctx.beginPath();
            ctx.moveTo(this.x - 2, this.y - height/2);
            ctx.lineTo(this.x - 2, this.y + height/2);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.x + 2, this.y - height/2);
            ctx.lineTo(this.x + 2, this.y + height/2);
            ctx.stroke();
        }
    }

    class Particle {
        constructor(nodes) {
            this.nodes = nodes;
            this.selectNewPath();
            this.progress = Math.random();
            this.pathIndex = 0;
        }

        selectNewPath() {
            if (this.nodes.length === 0) return;

            // Find nodes with connections
            const connectedNodes = this.nodes.filter(n => n.connections.length > 0);
            if (connectedNodes.length === 0) return;

            const startNode = connectedNodes[Math.floor(Math.random() * connectedNodes.length)];
            const connection = startNode.connections[Math.floor(Math.random() * startNode.connections.length)];

            this.currentNode = startNode;
            this.targetNode = connection.node;
            this.path = connection.path; // Array of {x, y} waypoints
            this.progress = 0;
            this.pathIndex = 0;
        }

        update() {
            if (!this.path || this.path.length < 2) {
                this.selectNewPath();
                return;
            }

            this.progress += config.particleSpeed / 100;

            if (this.progress >= 1) {
                this.pathIndex++;
                if (this.pathIndex >= this.path.length - 1) {
                    this.selectNewPath();
                } else {
                    this.progress = 0;
                }
            }
        }

        draw(ctx) {
            if (!this.path || this.pathIndex >= this.path.length - 1) return;

            const start = this.path[this.pathIndex];
            const end = this.path[this.pathIndex + 1];

            const x = start.x + (end.x - start.x) * this.progress;
            const y = start.y + (end.y - start.y) * this.progress;

            // Particle trail
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
            gradient.addColorStop(0, config.colors.particleGlow + 'ff');
            gradient.addColorStop(0.3, config.colors.particle + 'cc');
            gradient.addColorStop(0.7, config.colors.particle + '40');
            gradient.addColorStop(1, config.colors.particle + '00');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fill();

            // Particle core
            ctx.fillStyle = config.colors.particle;
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    class CircuitBackground {
        constructor() {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'circuit-background';
            this.ctx = this.canvas.getContext('2d');
            this.nodes = [];
            this.particles = [];
            this.animationId = null;
            this.gridCols = 0;
            this.gridRows = 0;

            this.init();
        }

        init() {
            document.body.insertBefore(this.canvas, document.body.firstChild);
            this.resize();
            this.createCircuitLayout();
            this.createParticles();

            window.addEventListener('resize', () => {
                this.resize();
                this.createCircuitLayout();
            });

            this.animate();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.gridCols = Math.ceil(this.canvas.width / config.gridSize) + 1;
            this.gridRows = Math.ceil(this.canvas.height / config.gridSize) + 1;
        }

        createCircuitLayout() {
            this.nodes = [];
            const nodeGrid = {};

            // Create nodes on grid
            for (let row = 0; row < this.gridRows; row++) {
                for (let col = 0; col < this.gridCols; col++) {
                    // Random placement with probability
                    if (Math.random() < 0.3) {
                        const type = this.selectNodeType();
                        const node = new GridNode(col, row, type);
                        this.nodes.push(node);
                        nodeGrid[`${col},${row}`] = node;
                    }
                }
            }

            // Create structured connections (horizontal and vertical only)
            this.nodes.forEach(node => {
                node.connections = [];

                // Try connecting to nearby nodes (grid-aligned)
                const directions = [
                    {dx: 1, dy: 0},   // right
                    {dx: -1, dy: 0},  // left
                    {dx: 0, dy: 1},   // down
                    {dx: 0, dy: -1}   // up
                ];

                directions.forEach(dir => {
                    // Try different distances
                    for (let dist = 1; dist <= 4; dist++) {
                        const targetCol = node.gridX + dir.dx * dist;
                        const targetRow = node.gridY + dir.dy * dist;
                        const targetNode = nodeGrid[`${targetCol},${targetRow}`];

                        if (targetNode && Math.random() < 0.4) {
                            const path = this.createPath(node, targetNode);
                            node.connections.push({node: targetNode, path: path});
                            break; // Only one connection per direction
                        }
                    }
                });
            });
        }

        createPath(fromNode, toNode) {
            // Create orthogonal path (only horizontal and vertical segments)
            const path = [];
            path.push({x: fromNode.x, y: fromNode.y});

            // Decide whether to go horizontal-first or vertical-first
            if (Math.random() < 0.5) {
                // Horizontal first, then vertical
                path.push({x: toNode.x, y: fromNode.y});
                path.push({x: toNode.x, y: toNode.y});
            } else {
                // Vertical first, then horizontal
                path.push({x: fromNode.x, y: toNode.y});
                path.push({x: toNode.x, y: toNode.y});
            }

            return path;
        }

        selectNodeType() {
            const rand = Math.random();
            let cumulative = 0;

            for (let type in config.nodeTypes) {
                cumulative += config.nodeTypes[type];
                if (rand < cumulative) {
                    return type;
                }
            }

            return 'junction';
        }

        createParticles() {
            this.particles = [];
            for (let i = 0; i < config.particleCount; i++) {
                this.particles.push(new Particle(this.nodes));
            }
        }

        drawTraces() {
            this.ctx.strokeStyle = config.colors.trace + '40';
            this.ctx.lineWidth = config.traceWidth;
            this.ctx.lineCap = 'square';

            this.nodes.forEach(node => {
                node.connections.forEach(conn => {
                    if (!conn.path || conn.path.length < 2) return;

                    this.ctx.beginPath();
                    this.ctx.moveTo(conn.path[0].x, conn.path[0].y);

                    for (let i = 1; i < conn.path.length; i++) {
                        this.ctx.lineTo(conn.path[i].x, conn.path[i].y);
                    }

                    this.ctx.stroke();
                });
            });
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.globalAlpha = config.bgOpacity;

            // Draw circuit traces
            this.drawTraces();

            // Update and draw nodes
            this.nodes.forEach(node => {
                node.update();
                node.draw(this.ctx);
            });

            // Update and draw particles
            this.particles.forEach(particle => {
                particle.update();
                particle.draw(this.ctx);
            });

            this.ctx.globalAlpha = 1;
            this.animationId = requestAnimationFrame(() => this.animate());
        }

        destroy() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            if (this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.circuitBackground = new CircuitBackground();
        });
    } else {
        window.circuitBackground = new CircuitBackground();
    }
})();
