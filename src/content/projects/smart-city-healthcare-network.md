---
title: Smart City Healthcare Network Design
short: Healthcare network
tagline: A simulated network linking six healthcare units — VLSM addressing, central services and backup routes.
summary: Designed a Cisco Packet Tracer network connecting six healthcare units (main hospital, diagnostic centre, emergency response unit, research institute, pharmacy hub and remote clinic) for 810 planned devices, with VLSM subnetting, DHCP, central DNS, web and e-mail servers, RIPv2 and static routes including a floating backup route.
course: CSE421
scene: network
categories: [systems, health-tech]
technologies: [Cisco Packet Tracer, VLSM subnetting, RIPv2, Static and floating static routes, DHCP, DNS, HTTP, SMTP/POP3]
links:
  - label: Project report (PDF)
    url: reports/smart-city-healthcare-network.pdf
    kind: report
media:
  - type: image
    src: ../../assets/projects/smart-city-healthcare-network/topology.png
    alt: Packet Tracer topology — routers linked in a triangle and through a shared switch, each with its own LAN switch, PCs and servers.
    caption: Network topology in Packet Tracer
credits:
  - Reshad Ul Karim and Mehreen Mallick Fiona — team members
order: 9
---

## Design

- **Topology:** the main hospital, research institute and emergency response unit form a
  triangular backbone; the hospital also reaches the diagnostic centre, pharmacy and remote
  clinic through a shared switch, and a direct clinic-to-emergency-unit link provides a backup
  path.
- **Addressing:** VLSM gives each unit the smallest subnet that fits it — for example /23 for the
  hospital's 300 devices, /26 for the clinic's 60 — plus /30 point-to-point links.
- **Services:** DHCP from routers and dedicated servers; a central DNS server resolving the
  hospital web portal and two e-mail domains (SMTP/POP3).
- **Routing:** RIPv2 with four static cases — next-hop, exit-interface, recursive and a floating
  static route (administrative distance 130) that takes over only if the RIP route to the
  hospital disappears.

The report lists the planned verification (pings, routing tables, DNS/web/e-mail and link-failure
tests) as expected checks.
