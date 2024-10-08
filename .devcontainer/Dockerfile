FROM node:21.6.2-bookworm-slim

ARG USERNAME=node
ARG NPM_GLOBAL=/usr/local/share/npm-global
ARG NODE_MODULES="eslint typescript @fontsource-variable/inter-tight @fontsource-variable/roboto-mono"
ARG PACKAGES="sudo git"

# Add NPM global to PATH.
ENV PATH=${NPM_GLOBAL}/bin:${PATH}

# Configure global npm install location, use group to adapt to UID/GID changes
RUN if ! cat /etc/group | grep -e "^npm:" > /dev/null 2>&1; then groupadd -r npm; fi \
    && usermod -a -G npm ${USERNAME} \
    && umask 0002 \
    && mkdir -p ${NPM_GLOBAL} \
    && touch /usr/local/etc/npmrc \
    && chown ${USERNAME}:npm ${NPM_GLOBAL} /usr/local/etc/npmrc \
    && chmod g+s ${NPM_GLOBAL} \
    && npm config -g set prefix ${NPM_GLOBAL} \
    && su ${USERNAME} -c "npm config -g set prefix ${NPM_GLOBAL}"

# Install node modules
RUN su node -c "umask 0002 && npm install -g ${NODE_MODULES}" \
    && npm cache clean --force > /dev/null 2>&1

# Install packages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive && \
    apt-get -y install --no-install-recommends ${PACKAGES}
