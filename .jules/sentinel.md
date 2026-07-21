## 2024-03-24 - Fix Mermaid Loose Security Level
**Vulnerability:** Mermaid securityLevel set to loose
**Learning:** The loose security level in Mermaid config exposes the application to XSS through diagram inputs.
**Prevention:** Always use strict securityLevel for Mermaid.
