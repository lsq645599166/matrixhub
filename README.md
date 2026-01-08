# MatrixHub

**MatrixHub** is an open source, self hosted, HuggingFace compatible model hub built for large scale enterprise inference.
It provides a fast, reliable, and controllable way to distribute and manage large models across private, on-prem, and air-gapped environments, with first-class support for vLLM and sglang.


## Motivation

Modern inference stacks rely on very large models, but public model hubs and generic artifact systems do not meet enterprise requirements around speed, privacy, and operational control.
**MatrixHub** is built to solve this gap.

## Core Features

- **🚀 HF API Transparent Proxy**: Deep compatibility with the Hugging Face API. Simply set the `HF_ENDPOINT` environment variable to redirect requests to your private hub without changing your code.
- **⚡ Intranet Acceleration (Proxy Cache)**: Features a "pull-once, serve-all" mechanism. The first request caches the model locally, allowing subsequent nodes to download at intranet speeds, bypassing public bandwidth bottlenecks.
- **🛡️ Enterprise Governance (RBAC)**: Support for multi-tenant projects, fine-grained Role-Based Access Control, LDAP/SSO integration, and comprehensive audit logging for compliance.
- **🌍 Cross-Region Replication**: Asynchronously sync TB-level models across global data centers with support for resumable uploads and chunked transfers to ensure data consistency.
- **📦 Flexible Storage Backends**: Compatible with local file systems, NFS, and object storage such as MinIO or AWS S3.
