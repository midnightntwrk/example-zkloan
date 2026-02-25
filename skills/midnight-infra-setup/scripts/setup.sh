#!/bin/bash

# Midnight Infrastructure Setup Script
# Usage: ./setup.sh [action]
# Actions: start, stop, status, logs, reset

set -e

ACTION="${1:-status}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Default ports
NODE_PORT=9944
INDEXER_PORT=8088
PROOF_SERVER_PORT=6300

# Service endpoints
NODE_URL="ws://127.0.0.1:$NODE_PORT"
INDEXER_URL="http://127.0.0.1:$INDEXER_PORT"
PROOF_SERVER_URL="http://127.0.0.1:$PROOF_SERVER_PORT"

echo -e "${BLUE}Midnight Infrastructure Manager${NC}"
echo "================================"
echo ""

# Check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Check service health
check_health() {
    local url=$1
    local timeout=${2:-5}

    if curl -s --max-time $timeout "$url/health" >/dev/null 2>&1; then
        return 0
    elif curl -s --max-time $timeout "$url" >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Print status for a service
print_status() {
    local name=$1
    local port=$2
    local url=$3

    if check_port $port; then
        if check_health $url 2>/dev/null || [[ "$name" == "Node" ]]; then
            echo -e "  $name: ${GREEN}✓ Running${NC} ($url)"
        else
            echo -e "  $name: ${YELLOW}● Port open, checking...${NC} ($url)"
        fi
    else
        echo -e "  $name: ${RED}✗ Not running${NC}"
    fi
}

# Status action
status_action() {
    echo "Service Status:"
    echo ""
    print_status "Node" $NODE_PORT $NODE_URL
    print_status "Indexer" $INDEXER_PORT $INDEXER_URL
    print_status "Proof Server" $PROOF_SERVER_PORT $PROOF_SERVER_URL
    echo ""

    # Count running services
    local running=0
    check_port $NODE_PORT && ((running++)) || true
    check_port $INDEXER_PORT && ((running++)) || true
    check_port $PROOF_SERVER_PORT && ((running++)) || true

    if [ $running -eq 3 ]; then
        echo -e "${GREEN}All services are running.${NC}"
    elif [ $running -eq 0 ]; then
        echo -e "${RED}No services are running.${NC}"
        echo ""
        echo "To start infrastructure:"
        echo "  npm run setup-standalone"
        echo "  # or"
        echo "  docker-compose up -d"
    else
        echo -e "${YELLOW}$running of 3 services running.${NC}"
    fi

    # Output JSON
    echo ""
    cat <<EOF
{
  "node": {
    "url": "$NODE_URL",
    "port": $NODE_PORT,
    "running": $(check_port $NODE_PORT && echo "true" || echo "false")
  },
  "indexer": {
    "url": "$INDEXER_URL",
    "port": $INDEXER_PORT,
    "running": $(check_port $INDEXER_PORT && echo "true" || echo "false")
  },
  "proofServer": {
    "url": "$PROOF_SERVER_URL",
    "port": $PROOF_SERVER_PORT,
    "running": $(check_port $PROOF_SERVER_PORT && echo "true" || echo "false")
  }
}
EOF
}

# Start action
start_action() {
    echo "Starting Midnight infrastructure..."
    echo ""

    # Check if Docker is running
    if ! docker info >/dev/null 2>&1; then
        echo -e "${RED}Error: Docker is not running${NC}"
        echo "Please start Docker Desktop or the Docker daemon"
        exit 1
    fi

    # Look for docker-compose or starter template
    if [ -f "docker-compose.yml" ]; then
        echo "Found docker-compose.yml, starting services..."
        docker-compose up -d
    elif [ -f "package.json" ] && grep -q "setup-standalone" package.json 2>/dev/null; then
        echo "Found starter template, running setup-standalone..."
        npm run setup-standalone &
        sleep 5
    else
        echo -e "${YELLOW}No docker-compose.yml found.${NC}"
        echo ""
        echo "Options:"
        echo "1. Clone midnight-infra-dev-tools:"
        echo "   git clone https://github.com/midnightntwrk/midnight-infra-dev-tools.git"
        echo ""
        echo "2. Use the starter template:"
        echo "   git clone https://github.com/MeshJS/midnight-starter-template.git"
        echo "   cd midnight-starter-template"
        echo "   npm install"
        echo "   npm run setup-standalone"
        exit 1
    fi

    echo ""
    echo "Waiting for services to start..."
    sleep 10

    status_action
}

# Stop action
stop_action() {
    echo "Stopping Midnight infrastructure..."
    echo ""

    if [ -f "docker-compose.yml" ]; then
        docker-compose down
    else
        # Kill processes by port
        for port in $NODE_PORT $INDEXER_PORT $PROOF_SERVER_PORT; do
            local pid=$(lsof -Pi :$port -sTCP:LISTEN -t 2>/dev/null)
            if [ -n "$pid" ]; then
                echo "Stopping process on port $port (PID: $pid)"
                kill -9 $pid 2>/dev/null || true
            fi
        done
    fi

    echo ""
    echo -e "${GREEN}Infrastructure stopped.${NC}"
}

# Logs action
logs_action() {
    echo "Fetching logs..."
    echo ""

    if [ -f "docker-compose.yml" ]; then
        docker-compose logs --tail=50
    else
        echo "Logs are only available when using docker-compose."
        echo ""
        echo "For manual logs, check:"
        echo "  - Node: midnight-node/logs/"
        echo "  - Indexer: midnight-indexer/logs/"
        echo "  - Proof Server: midnight-ledger/logs/"
    fi
}

# Reset action
reset_action() {
    echo -e "${YELLOW}Resetting Midnight infrastructure...${NC}"
    echo "This will stop all services and clear data."
    echo ""

    stop_action

    if [ -f "docker-compose.yml" ]; then
        docker-compose down -v
    fi

    echo ""
    echo -e "${GREEN}Infrastructure reset complete.${NC}"
    echo "Run 'start' to begin fresh."
}

# Main
case "$ACTION" in
    start)
        start_action
        ;;
    stop)
        stop_action
        ;;
    status)
        status_action
        ;;
    logs)
        logs_action
        ;;
    reset)
        reset_action
        ;;
    *)
        echo "Usage: $0 [action]"
        echo ""
        echo "Actions:"
        echo "  start   - Start all infrastructure services"
        echo "  stop    - Stop all infrastructure services"
        echo "  status  - Check service status (default)"
        echo "  logs    - View service logs"
        echo "  reset   - Reset and clear all data"
        exit 1
        ;;
esac
