# Multi-architecture build (by image repositories)

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

# Multi-architecture build (by tags within the image repository)

If you prefer to organize the multi-architecture images within the only single image repository, you can either replicate the steps above but with tag alignments or you can easily switch from that "by image repositories" organization to "by tags within the image repository" by following the steps bellow:

## Greeting app

```bash
# pull all images
podman pull quay.io/jpetnik/multi-arch/greeting_amd64:latest
podman pull quay.io/jpetnik/multi-arch/greeting_arm64:latest
podman pull quay.io/jpetnik/multi-arch/greeting_ppc64le:latest

# re-tag images
podman tag quay.io/jpetnik/multi-arch/greeting_amd64:latest quay.io/jpetnik/multi-arch/greeting:v1-amd64
podman tag quay.io/jpetnik/multi-arch/greeting_arm64:latest quay.io/jpetnik/multi-arch/greeting:v1-arm64
podman tag quay.io/jpetnik/multi-arch/greeting_ppc64le:latest quay.io/jpetnik/multi-arch/greeting:v1-ppc64le

# push re-tagged images into the single image repository
podman push quay.io/jpetnik/multi-arch/greeting:v1-amd64
podman push quay.io/jpetnik/multi-arch/greeting:v1-arm64
podman push quay.io/jpetnik/multi-arch/greeting:v1-ppc64le

# create the manifest and push it into the image repository
export MANIFEST=greeting-manifest

podman manifest create $MANIFEST
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/greeting:v1-amd64
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/greeting:v1-arm64
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/greeting:v1-ppc64le
podman manifest push $MANIFEST docker://quay.io/jpetnik/multi-arch/greeting:v1
podman manifest rm $MANIFEST
```

## Backend app

```bash
# pull all images
podman pull quay.io/jpetnik/multi-arch/backend_amd64:latest
podman pull quay.io/jpetnik/multi-arch/backend_arm64:latest
podman pull quay.io/jpetnik/multi-arch/backend_ppc64le:latest

# re-tag images
podman tag quay.io/jpetnik/multi-arch/backend_amd64:latest quay.io/jpetnik/multi-arch/backend:v1-amd64
podman tag quay.io/jpetnik/multi-arch/backend_arm64:latest quay.io/jpetnik/multi-arch/backend:v1-arm64
podman tag quay.io/jpetnik/multi-arch/backend_ppc64le:latest quay.io/jpetnik/multi-arch/backend:v1-ppc64le

# push re-tagged images into the single image repository
podman push quay.io/jpetnik/multi-arch/backend:v1-amd64
podman push quay.io/jpetnik/multi-arch/backend:v1-arm64
podman push quay.io/jpetnik/multi-arch/backend:v1-ppc64le

# create the manifest and push it into the image repository
export MANIFEST=backend-manifest

podman manifest create $MANIFEST
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/backend:v1-amd64
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/backend:v1-arm64
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/backend:v1-ppc64le
podman manifest push $MANIFEST docker://quay.io/jpetnik/multi-arch/backend:v1
podman manifest rm $MANIFEST
```

## Frontend app

```bash
# pull all images
podman pull quay.io/jpetnik/multi-arch/frontend_amd64:latest
podman pull quay.io/jpetnik/multi-arch/frontend_arm64:latest
podman pull quay.io/jpetnik/multi-arch/frontend_ppc64le:latest

# re-tag images
podman tag quay.io/jpetnik/multi-arch/frontend_amd64:latest quay.io/jpetnik/multi-arch/frontend:v1-amd64
podman tag quay.io/jpetnik/multi-arch/frontend_arm64:latest quay.io/jpetnik/multi-arch/frontend:v1-arm64
podman tag quay.io/jpetnik/multi-arch/frontend_ppc64le:latest quay.io/jpetnik/multi-arch/frontend:v1-ppc64le

# push re-tagged images into the single image repository
podman push quay.io/jpetnik/multi-arch/frontend:v1-amd64
podman push quay.io/jpetnik/multi-arch/frontend:v1-arm64
podman push quay.io/jpetnik/multi-arch/frontend:v1-ppc64le

# create the manifest and push it into the image repository
export MANIFEST=frontend-manifest

podman manifest create $MANIFEST
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/frontend:v1-amd64
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/frontend:v1-arm64
podman manifest add $MANIFEST quay.io/jpetnik/multi-arch/frontend:v1-ppc64le
podman manifest push $MANIFEST docker://quay.io/jpetnik/multi-arch/frontend:v1
podman manifest rm $MANIFEST
```
