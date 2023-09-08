# Application modernization on Power

The intention of this repository is to summarize selected chapters on how to run and deploy multi-container microsevice application into two enviroments:

- locally on the dev machine, and
- into Red Hat OpenShift Container Platform (OCP).

In addition to the main objective, this repository details steps how to prepare the application images in a way that they are deployable into different architecture families, mainly x86 and Power.

## Content

Detailed content of the repository follows. The microservice application is stored in the `apps` folder. Detailed instructions are split into separate step-by-step guides (see in `instructions` folder).

```bash
├── apps
│   ├── backend
│   ├── database
│   ├── frontend
│   └── greeting
├── doc
│   └── pics
└── instructions
    ├── 00_run-locally.md
    ├── 01_podman.md
    ├── 02_ocp.md
    └── 03_multi-architecture.md
```

## Microservice application

The microservice application consists of the following building blocks:

- frontend - React single-page application,
- backend - Python / Flask application,
- greeting - Java / SpringBoot application, and
- database - PostgresSQL database.

The dependencies and the main flows throught the microservices are captured in the following sequence diagram:

[![](https://mermaid.ink/svg/pako:eNqNkk1PwzAMhv-KlSv7uBdpEoIKIRBF625rD2nidWFr2uXjgKb9d5y264ZWELlE8vPGfu34yEQtkUXM4sGjFvikeGl4lWmgw72rta8KNPfQRfq4cLUBbw1wSxeaLtxw45RQDdcOvApsY2rtUMtbXnARBHTtRnnZ5i4NolO6vOWyCLyprSONPewz3WnI1HSxuPMqgqRBDXNY4oYU2x6rQKlqBOvneJXDnDdqHlqwfW_EgkQWpPiUhcghjd_ixxXMZrNeIospSaZtlvbpOr-8DSRUP3aIsuRwGtyNlj93aX84KM1fotJcPAxo3MeAOy8wWGkllsqMDO9Byqufvfb9kaT_m9vLexovf5tb8npr9Ry7tsYmrEJTcSVpSY-BZ8xtscKMkW8mudllLNMn0oVtTb-0YJEzHifMN5K780KzaMP3Fk_fSEPrUw)](https://mermaid.ink/svg/pako:eNqNkk1PwzAMhv-KlSv7uBdpEoIKIRBF625rD2nidWFr2uXjgKb9d5y264ZWELlE8vPGfu34yEQtkUXM4sGjFvikeGl4lWmgw72rta8KNPfQRfq4cLUBbw1wSxeaLtxw45RQDdcOvApsY2rtUMtbXnARBHTtRnnZ5i4NolO6vOWyCLyprSONPewz3WnI1HSxuPMqgqRBDXNY4oYU2x6rQKlqBOvneJXDnDdqHlqwfW_EgkQWpPiUhcghjd_ixxXMZrNeIospSaZtlvbpOr-8DSRUP3aIsuRwGtyNlj93aX84KM1fotJcPAxo3MeAOy8wWGkllsqMDO9Byqufvfb9kaT_m9vLexovf5tb8npr9Ry7tsYmrEJTcSVpSY-BZ8xtscKMkW8mudllLNMn0oVtTb-0YJEzHifMN5K780KzaMP3Fk_fSEPrUw)
