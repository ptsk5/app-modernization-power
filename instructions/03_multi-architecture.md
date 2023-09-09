# Multi-architecture build

## Greeting app

### Build and push platform-specific images

```bash
cd ./apps/greeting

# Run on arm64 (or try to add --platform=linux/arm64 if started on Intel-based MacBook)
podman build -t quay.io/jpetnik/multi-arch/greeting_arm64:latest .
podman push quay.io/jpetnik/multi-arch/greeting_arm64:latest

# Run on amd64 (or try to add --platform=linux/amd64 if started on M1/M2 MacBook)
podman build -t quay.io/jpetnik/multi-arch/greeting_amd64:latest .
podman push quay.io/jpetnik/multi-arch/greeting_amd64:latest

# Run on ppc64le
podman build -t quay.io/jpetnik/multi-arch/greeting_ppc64le:latest .
podman push quay.io/jpetnik/multi-arch/greeting_ppc64le:latest
```

### Create and push a manifest

```bash
export MANIFEST=greeting-manifest

podman manifest create $MANIFEST
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/greeting_arm64:latest
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/greeting_amd64:latest
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/greeting_ppc64le:latest
podman manifest push $MANIFEST docker://quay.io/jpetnik/multi-arch/greeting:latest
podman manifest rm $MANIFEST
```

## Backend app

### Build and push platform-specific images

```bash
cd ./apps/backend

# Run on arm64 (or try to add --platform=linux/arm64 if started on Intel-based MacBook)
podman build -t quay.io/jpetnik/multi-arch/backend_arm64:latest .
podman push quay.io/jpetnik/multi-arch/backend_arm64:latest

# Run on amd64 (or try to add --platform=linux/amd64 if started on M1/M2 MacBook)
podman build -t quay.io/jpetnik/multi-arch/backend_amd64:latest .
podman push quay.io/jpetnik/multi-arch/backend_amd64:latest

# Run on ppc64le
podman build -t quay.io/jpetnik/multi-arch/backend_ppc64le:latest .
podman push quay.io/jpetnik/multi-arch/backend_ppc64le:latest
```

### Create and push a manifest

```bash
export MANIFEST=backend-manifest

podman manifest create $MANIFEST
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/backend_arm64:latest
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/backend_amd64:latest
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/backend_ppc64le:latest
podman manifest push $MANIFEST docker://quay.io/jpetnik/multi-arch/backend:latest
podman manifest rm $MANIFEST
```

## Frontend app

### Build and push platform-specific images

```bash
cd ./apps/frontend

# Run on arm64 (or try to add --platform=linux/arm64 if started on Intel-based MacBook)
podman build -t quay.io/jpetnik/multi-arch/frontend_arm64:latest .
podman push quay.io/jpetnik/multi-arch/frontend_arm64:latest

# Run on amd64 (or try to add --platform=linux/amd64 if started on M1/M2 MacBook)
podman build -t quay.io/jpetnik/multi-arch/frontend_amd64:latest .
podman push quay.io/jpetnik/multi-arch/frontend_amd64:latest

# Run on ppc64le
podman build -t quay.io/jpetnik/multi-arch/frontend_ppc64le:latest .
podman push quay.io/jpetnik/multi-arch/frontend_ppc64le:latest
```

### Create and push a manifest

```bash
export MANIFEST=frontend-manifest

podman manifest create $MANIFEST
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/frontend_arm64:latest
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/frontend_amd64:latest
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/frontend_ppc64le:latest
podman manifest push $MANIFEST docker://quay.io/jpetnik/multi-arch/frontend:latest
podman manifest rm $MANIFEST
```
