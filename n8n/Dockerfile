# Production Dockerfile for n8n orchestration engine on Render Free Tier
FROM n8nio/n8n:latest

USER root

# Configure Environment Defaults & Memory/OOM Safety Flags for Render Free Tier (512MB RAM)
ENV PORT=5678
ENV N8N_PORT=5678
ENV EXECUTIONS_PROCESS=main
ENV N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true
ENV N8N_PAYLOAD_SIZE_MAX=16
ENV N8N_DISABLE_PRODUCTION_MAIN_PROCESS_WARNING=true

# Expose production port 5678
EXPOSE 5678

USER node
