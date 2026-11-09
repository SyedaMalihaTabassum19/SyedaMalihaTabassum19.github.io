---
title: ProCV Resume Builder
short: ProCV
tagline: A menu-driven CV builder written entirely in x86 Assembly, with encrypted contact details.
summary: Built a text-based CV creation and management system in x86 Assembly. Users log in, enter personal details, education, work experience and up to eight rated skills, then generate a CV in a Classic or Modern layout; sensitive fields are encrypted with the user's password, and stored CVs can be searched by name or e-mail.
course: CSE341
scene: terminal
categories: [systems]
technologies: [x86 Assembly, DOS interrupts, Input validation, Field encryption]
links:
  - label: Project report (PDF)
    url: reports/procv.pdf
    kind: report
media:
  - type: image
    src: ../../assets/projects/procv/menu.png
    alt: The ProCV welcome screen in a DOS emulator window — the ProCV logo in ASCII art and a menu to sign up, log in, reset a password or exit.
    caption: Welcome menu
order: 10
---

## Features

- Profile login with ID and password; the password also decrypts the protected fields.
- Personal details with basic validation of age and contact number; multiple education and work
  entries; up to eight skills rated Beginner, Intermediate or Expert.
- CV generation in a Classic or Modern text layout.
- Basic encryption of e-mail addresses and phone numbers, and search by name or e-mail.

## Under the hood

Dedicated procedures for authentication, each CV section, generation and search; DOS interrupts
for console input and output; fixed-size buffers, indexed records, loops, comparisons and
conditional jumps for storage and validation.
