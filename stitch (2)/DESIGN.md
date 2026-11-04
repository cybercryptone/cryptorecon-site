```markdown
# Design System Specification: The Elevated Intelligence Framework

## 1. Overview & Creative North Star
**Creative North Star: "The Architectural Lens"**

This design system rejects the frantic energy of retail crypto in favor of the calculated composure of high-end financial consulting. It is built on the metaphor of a "Sanctuary of Data"—a space that feels physically architectural, where intelligence is displayed with gallery-like intent.

To move beyond "template" UI, we utilize **The Architectural Lens**. This means favoring intentional asymmetry, massive generous margins, and a "Layered White" philosophy. We break the rigid grid by allowing elements to overlap slightly or by using extreme type-scale contrasts (e.g., a `display-lg` headline paired with a tiny, uppercase `label-md` eyebrow). This creates an editorial feel that signals "bespoke service" rather than "automated platform."

---

## 2. Colors & Surface Philosophy
The palette is a sophisticated study in high-key blues and atmospheric neutrals.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Boundaries must be established through:
1.  **Background Shifts:** Transitioning from `surface` to `surface-container-low`.
2.  **Tonal Transitions:** Using the `3.5` (1.2rem) to `8` (2.75rem) spacing tokens to create distinct "islands" of content.
3.  **Soft Insets:** Using `surface-container-highest` for small, inset data modules.

### Surface Hierarchy & Nesting
Think of the UI as a series of stacked, premium materials.
*   **Base Layer:** `surface` (#f7f9fb) – The canvas.
*   **Structural Sections:** `surface-container-low` (#f0f4f7) – Large background areas.
*   **Interactive Cards:** `surface-container-lowest` (#ffffff) – Used to "lift" content off the page.
*   **Nesting Rule:** Place a `surface-container-lowest` card inside a `surface-container` section to create natural depth.

### The "Glass & Gradient" Rule
Main CTAs and Hero backgrounds must utilize a signature gradient: `primary` (#495f84) to `primary-container` (#d6e3ff) at a 135-degree angle. This prevents the "flat" look and adds a sense of light-refraction common in high-value physical artifacts.

---

## 3. Typography: The Editorial Voice
We use a dual-font strategy to balance human-centric consulting with technical precision.

*   **The Authority (Manrope):** Used for all `display` and `headline` roles. Set with tight letter-spacing (-0.02em) to feel "locked-in" and intentional. High contrast in size between headlines and sub-headlines is encouraged to create a "Signature Editorial" look.
*   **The Instrument (Inter):** Used for `body`, `title`, and `label` roles. This font provides a neutral, high-legibility container for complex AML data and consulting reports.

**Key Scales:**
*   **Display LG (3.5rem):** For hero statements. Use rarely, with high leading.
*   **Title SM (1rem):** Use `on_surface_variant` (#566166) for secondary metadata to maintain a clean visual hierarchy.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often too "dirty" for a premium light theme. This system uses light as its primary structural tool.

*   **The Layering Principle:** Depth is achieved by stacking. A `surface-container-lowest` element on top of `surface-container-high` provides all the "lift" needed without a single drop shadow.
*   **Ambient Shadows:** For "floating" elements (Modals, Overlays), use a shadow with a blur of `32px`, spread of `-4px`, and color `on_surface` (#2a3439) at **4% opacity**. It should feel like a soft glow, not a dark stain.
*   **Glassmorphism:** For top navigation bars or floating action panels, use `surface_container_lowest` at 70% opacity with a `24px` backdrop blur. This allows the blue-white gradients of the background to bleed through, softening the interface.
*   **The "Ghost Border":** If a container sits on an identical background color, use a 1px stroke of `outline_variant` (#a9b4b9) at **15% opacity**.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` background with `on_primary` text. Border radius: `full`.
*   **Secondary:** `primary_container` background with `on_primary_container` text. No border.
*   **Tertiary:** Transparent background, `primary` text. Use `spacing-2` for horizontal padding.

### Cards & Lists
*   **The Card:** Must use `roundedness-lg` (2rem) or `xl` (3rem). 
*   **The Divider Rule:** Forbid 1px horizontal lines. Separate list items using `surface_container_low` background blocks or `spacing-4` vertical gaps.
*   **Nesting:** Reports and AML findings should be housed in "Nested Wells" using `surface-container-high`.

### Input Fields
*   **Style:** `surface-container-lowest` background with a `ghost border`.
*   **Focus State:** Shift background to `white` and add a 2px `primary` soft-glow shadow (not a solid stroke).

### Intelligence Chips
*   Used for Risk Levels (High, Medium, Low). Use `error_container` for high risk, but keep the `on_error_container` text high-contrast for a "legal" rather than "alarming" feel.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use extreme white space. If you think there’s enough space, add 20% more.
*   **Do** use asymmetrical layouts. A 2/3 vs 1/3 split for dashboard content feels more premium than a 50/50 split.
*   **Do** use `primary_fixed_dim` for subtle background accents behind important data points.

### Don't:
*   **Don't** use pure black (#000). Use `on_surface` (#2a3439) for all "black" text to maintain the soft, blue-white atmosphere.
*   **Don't** use sharp corners. Everything—from buttons to input fields to images—must use the `roundedness` scale.
*   **Don't** use standard "Crypto" aesthetics. No glows, no neon greens, no dark-mode-only interfaces. This is a consulting firm, not an exchange.
*   **Don't** use 1px dividers. If you need to separate content, use a tonal shift or a large vertical gap.

---

## 7. Signature Spacing Philosophy
Spacing is not just a gap; it is a luxury.
*   **The "Breathing Hero":** Hero sections should have a minimum of `spacing-20` (7rem) padding-top/bottom.
*   **Content Grouping:** Use `spacing-3` for related items; use `spacing-10` to separate distinct conceptual blocks. This "high-contrast" spacing forces the user to focus on one thought at a time.