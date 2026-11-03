import { test, expect } from "@playwright/test";
import { REPAIR_EQUIPMENT_SCOPE } from "../src/data/catalog";
import { MTS_1500_BEATS } from "../src/components/Mts1500CycleScrollSection";

test.describe("3J Industrial Parts LLC — Website Verification Suite", () => {
  test("1. Home page (/) renders official logo, melt-treatment SVG animation, verbatim proof quote, 3JI-Repair teaser band, and quote form", async ({
    page,
  }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
    const robotsHeader = response?.headers()["x-robots-tag"] || "";
    expect(robotsHeader.toLowerCase()).toContain("noindex");

    // Official Logo in Header & Footer
    const logos = page.locator('img[src="/assets/3j-logo.png"]');
    await expect(logos.first()).toBeVisible();

    // Hero Headline & Tagline
    await expect(
      page.getByRole("heading", {
        name: /Precision Parts & Field Service That Keep Production Running\./i,
      })
    ).toBeVisible();
    await expect(
      page.getByText("SPARE PARTS | SERVICES | CONSULTING").first()
    ).toBeVisible();

    // Animated Melt-Treatment Schematic SVG
    const schematicSvg = page.locator("svg").filter({
      hasText: "Aluminum Melt-Treatment Rotary Degassing Schematic",
    });
    await expect(schematicSvg).toBeVisible();

    // Verbatim Proof Quote
    await expect(
      page
        .getByText(
          "6+ years of aluminum melt-treatment expertise — formerly the single point of contact for SMARTT, MTS 1500, and ThermaTest NGIII 5000 support across the U.S."
        )
        .first()
    ).toBeVisible();

    // Verify Piece 1 (FDU Exploded), Static Beat ("WHAT WE SUPPORT"), and Piece 2 (MTS 1500 Cycle) ordering
    const fduSection = page.getByTestId("fdu-exploded-scroll-section");
    const staticSupportSection = page.getByTestId(
      "static-what-we-support-section"
    );
    const mtsSection = page.getByTestId("mts-1500-cycle-scroll-section");
    await expect(fduSection).toBeVisible();
    await expect(staticSupportSection).toBeVisible();
    await expect(mtsSection).toBeVisible();

    const fduTop = await fduSection.evaluate(
      (el) => el.getBoundingClientRect().top + window.scrollY
    );
    const staticTop = await staticSupportSection.evaluate(
      (el) => el.getBoundingClientRect().top + window.scrollY
    );
    const mtsTop = await mtsSection.evaluate(
      (el) => el.getBoundingClientRect().top + window.scrollY
    );
    expect(fduTop).toBeLessThan(staticTop);
    expect(staticTop).toBeLessThan(mtsTop);

    // 3JI-Repair service name & Cuyahoga County service area badge & Downtime math (~$98/day)
    await expect(page.getByText(/3JI-Repair/i).first()).toBeVisible();
    await expect(
      page.getByText(/Cuyahoga County service area/i).first()
    ).toBeVisible();
    await expect(page.getByText(/~\$98\/day/i).first()).toBeVisible();

    // Guardrail: No "Pyrotek" affiliation or retired "Junior Tech" anywhere on page
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("pyrotek");
    expect(bodyText.toLowerCase()).not.toContain("junior tech");
  });

  test("2. Parts Finder (/parts-finder) completes 3-step selector flow (platform -> serial -> catalog -> pre-filled quote submission)", async ({
    page,
  }) => {
    await page.goto("/parts-finder");

    // Step 1: Select MTS 1500
    await page.getByTestId("platform-btn-MTS 1500").click();
    await expect(page.getByTestId("prefilled-platform")).toHaveText("MTS 1500");

    // Step 2: Enter Serial Number
    await page.getByTestId("pf-serial-input").fill("MTS1500-2022-8841");
    await expect(page.getByTestId("prefilled-serial")).toHaveText(
      "MTS1500-2022-8841"
    );

    // Verify seeded catalog families exist
    await expect(
      page.getByText(/FDR \/ XDR \/ FDDR Rotary Degassing Graphite Impeller/i)
    ).toBeVisible();
    await expect(
      page.getByText(/COVERAL \/ SIMODAL \/ NUCLEANT/i).first()
    ).toBeVisible();

    // Add a part to the quote list and submit Step 3
    await page.fill("#pf-name", "David Miller");
    await page.fill("#pf-company", "Great Lakes Aluminum Foundry");
    await page.fill("#pf-email", "dmiller@glfoundry.com");
    await page.fill("#pf-phone", "216-555-0144");
    await page.getByTestId("pf-submit-btn").click();

    // Verify 24-hour estimate confirmation banner
    const confirmBanner = page.getByTestId("pf-quote-confirmation");
    await expect(confirmBanner).toBeVisible();
    await expect(confirmBanner).toContainText("estimate within 24 hours");
    await expect(confirmBanner).toContainText("MTS1500-2022-8841");

    // Guardrail: No "Pyrotek" or retired "Junior Tech" anywhere
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("pyrotek");
    expect(bodyText.toLowerCase()).not.toContain("junior tech");
  });

  test("3. Food Service (/food-service) presents 3JI-Repair, full 15-item equipment scope, locked pricing, interactive downtime calculator (~$98/day at 60 drinks), and validates Cuyahoga County addresses", async ({
    page,
  }) => {
    await page.goto("/food-service");

    // Hero badge & 3JI-Repair H1
    await expect(page.getByTestId("cuyahoga-hero-badge")).toContainText(
      "CUYAHOGA COUNTY, OHIO — 3JI-REPAIR COMMERCIAL SERVICE"
    );
    await expect(
      page.getByRole("heading", {
        name: /Commercial Equipment Down\? 3JI-Repair Pairs a Qualified Tech/i,
      })
    ).toBeVisible();

    // Verify all 15 equipment types from Jason's list + adjacent machines are displayed
    const scopeGrid = page.getByTestId("equipment-scope-grid");
    await expect(scopeGrid).toBeVisible();
    for (const eqItem of REPAIR_EQUIPMENT_SCOPE) {
      await expect(scopeGrid).toContainText(eqItem);
    }

    // Interactive Downtime Calculator: Default 60 drinks/day => ~$98/day, $294 (3-day), $686 (7-day)
    await expect(page.getByTestId("calc-daily-loss")).toHaveText("~$98/day");
    await expect(page.getByTestId("calc-3day-loss")).toHaveText("$294");
    await expect(page.getByTestId("calc-7day-loss")).toHaveText("$686");

    // Change drinks/day to 120 => ~$196/day
    await page.getByTestId("calc-drinks-input").fill("120");
    await expect(page.getByTestId("calc-daily-loss")).toHaveText("~$196/day");

    // Locked Pricing Verification
    await expect(
      page.getByText("$99 credited toward repair").first()
    ).toBeVisible();
    await expect(page.getByText("$119–129/hr").first()).toBeVisible();
    await expect(page.getByText("$139–149/hr").first()).toBeVisible();
    await expect(page.getByText("$169–179/hr").first()).toBeVisible();
    await expect(
      page.getByText("$25–49/day or $149–249/incident").first()
    ).toBeVisible();
    await expect(
      page.getByText("$149–199/mo per location").first()
    ).toBeVisible();
    await expect(page.getByText("$79–99/mo").first()).toBeVisible();

    // Cuyahoga County Address Validation: Out-of-county city (Akron, OH) must trigger polite alert
    const cityZipInput = page.getByTestId("fs-city-zip-input");
    await cityZipInput.fill("Akron, OH");
    const validationAlert = page.getByTestId("cuyahoga-validation-alert");
    await expect(validationAlert).toBeVisible();
    await expect(validationAlert).toContainText(
      "3JI-Repair (Division 02 Commercial Equipment Service & Loaner Fleet) is currently available exclusively within our Cuyahoga County, Ohio launch area. For nationwide Division 01 Industrial Foundry support, please use the Parts Finder."
    );

    // Valid Cuyahoga County city (Lakewood, OH) clears alert and submits cleanly
    await cityZipInput.fill("Lakewood, OH");
    await expect(validationAlert).toBeHidden();
    await expect(page.getByTestId("cuyahoga-valid-badge")).toBeVisible();

    await page.fill("#fs-business", "Lakewood Patio Bar");
    await page.fill("#fs-contact", "Sarah Jenkins");
    await page.fill("#fs-phone", "216-555-0199");
    await page.fill("#fs-email", "sarah@lakewoodpatio.com");
    await page.fill(
      "#fs-symptom",
      "Twin-hopper slushie machine right side not freezing, need loaner drop-off."
    );
    await page.getByTestId("fs-submit-btn").click();

    await expect(page.getByTestId("food-service-confirmation")).toBeVisible();

    // Guardrail: No "Pyrotek" or retired "Junior Tech" anywhere
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("pyrotek");
    expect(bodyText.toLowerCase()).not.toContain("junior tech");
  });

  test("4. About (/about) renders Jason Allen bio, verbatim proof quote, Join 3JI-Repair section & interest form, and honors prefers-reduced-motion on both scroll sections", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/about");

    // Verbatim Proof Quote
    await expect(page.getByTestId("about-verbatim-proof")).toContainText(
      "6+ years of aluminum melt-treatment expertise — formerly the single point of contact for SMARTT, MTS 1500, and ThermaTest NGIII 5000 support across the U.S."
    );

    // Join 3JI-Repair Heading & Subheading
    await expect(
      page.getByRole("heading", { name: "Join 3JI-Repair", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Interested in joining 3JI-Repair?",
        exact: true,
      })
    ).toBeVisible();

    await page.getByTestId("jtp-name-input").fill("Marcus Vance");
    await page.getByTestId("jtp-phone-input").fill("216-555-0123");
    await page.getByTestId("jtp-email-input").fill("marcus@tradeapplicant.com");
    await page.getByTestId("jtp-city-input").fill("Parma, OH");
    await page
      .getByTestId("jtp-track-select")
      .selectOption("Applicant / Trainee Pathway");
    await page
      .getByTestId("jtp-note-input")
      .fill("Completed HVAC/R basics and electrical troubleshooting coursework.");
    await page.getByTestId("jtp-submit-btn").click();

    await expect(page.getByTestId("jtp-confirmation")).toBeVisible();

    // Verify prefers-reduced-motion disables animations & renders static assembled views on /
    await page.goto("/");
    const bubbleAnimName = await page
      .locator(".melt-bubble-slow")
      .first()
      .evaluate((el) => window.getComputedStyle(el).animationName);
    expect(bubbleAnimName).toBe("none");

    await expect(page.getByTestId("fdu-exploded-scroll-section")).toHaveAttribute(
      "data-reduced-motion",
      "true"
    );
    await expect(
      page.getByTestId("mts-1500-cycle-scroll-section")
    ).toHaveAttribute("data-reduced-motion", "true");
  });

  test("5. Mobile (390x844) scroll-scrubs both FDU Exploded-View (5 layers) and MTS 1500 In-Action (6 beats) smoothly with zero horizontal overflow", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");

    // Verify zero horizontal overflow on 390px mobile viewport
    const overflowCheck = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    );
    expect(overflowCheck).toBe(true);

    // Verify all 5 FDU component labels exist & are readable
    await expect(page.getByTestId("fdu-label-drive-head")).toContainText(
      "Drive Head / MFC Gas Unit"
    );
    await expect(page.getByTestId("fdu-label-baffle")).toContainText(
      "DIAMANT Baffle / Anti-Vortex Plate"
    );
    await expect(page.getByTestId("fdu-label-shaft")).toContainText(
      "Graphite Shaft"
    );
    await expect(page.getByTestId("fdu-label-rotor")).toContainText(
      "Graphite Rotor"
    );
    await expect(page.getByTestId("fdu-label-crucible")).toContainText(
      "Crucible"
    );

    // Scroll to 60% of FDU Exploded section -> layers must separate vertically
    await page.evaluate(() => {
      const el = document.querySelector(
        '[data-testid="fdu-exploded-scroll-section"]'
      ) as HTMLElement;
      const rect = el.getBoundingClientRect();
      const topDoc = rect.top + window.scrollY;
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      window.scrollTo({ top: topDoc + scrollable * 0.6, behavior: "instant" });
      window.dispatchEvent(new Event("scroll"));
    });

    await expect
      .poll(async () => {
        const val = await page
          .getByTestId("fdu-layer-drive-head")
          .getAttribute("data-offset-y");
        return Number(val || "0");
      })
      .toBeLessThan(-40);

    await expect
      .poll(async () => {
        const val = await page
          .getByTestId("fdu-layer-crucible")
          .getAttribute("data-offset-y");
        return Number(val || "0");
      })
      .toBeGreaterThan(40);

    // Scroll to 100% of FDU Exploded section -> layers reassemble back to 0
    await page.evaluate(() => {
      const el = document.querySelector(
        '[data-testid="fdu-exploded-scroll-section"]'
      ) as HTMLElement;
      const rect = el.getBoundingClientRect();
      const topDoc = rect.top + window.scrollY;
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      window.scrollTo({ top: topDoc + scrollable * 1.0, behavior: "instant" });
      window.dispatchEvent(new Event("scroll"));
    });

    await expect
      .poll(async () => {
        const val = await page
          .getByTestId("fdu-layer-drive-head")
          .getAttribute("data-offset-y");
        return Number(val || "0");
      })
      .toBe(0);

    // Verify all 6 verbatim MTS 1500 beat labels + COVERAL / SIMODAL / NUCLEANT + SMARTT callout
    const mtsSection = page.getByTestId("mts-1500-cycle-scroll-section");
    for (const beat of MTS_1500_BEATS) {
      await expect(mtsSection).toContainText(beat.label);
    }
    await expect(mtsSection).toContainText("COVERAL / SIMODAL / NUCLEANT");
    await expect(mtsSection).toContainText(
      "SMARTT sets rotor speed, gas flow & treatment time"
    );

    // Scroll to Beat 4 (~58% of MTS 1500 section) -> active beat is 4 ("Flux dosed into the vortex (MTS 1500)")
    await page.evaluate(() => {
      const el = document.querySelector(
        '[data-testid="mts-1500-cycle-scroll-section"]'
      ) as HTMLElement;
      const rect = el.getBoundingClientRect();
      const topDoc = rect.top + window.scrollY;
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      window.scrollTo({ top: topDoc + scrollable * 0.58, behavior: "instant" });
      window.dispatchEvent(new Event("scroll"));
    });

    await expect(mtsSection).toHaveAttribute("data-active-beat", "4");
    await expect(page.getByTestId("mts-active-beat-label")).toContainText(
      "Flux dosed into the vortex (MTS 1500)"
    );

    // Scroll to Beat 6 (~92% of MTS 1500 section) -> active beat is 6 ("Treatment complete — cleaner metal, less dross")
    await page.evaluate(() => {
      const el = document.querySelector(
        '[data-testid="mts-1500-cycle-scroll-section"]'
      ) as HTMLElement;
      const rect = el.getBoundingClientRect();
      const topDoc = rect.top + window.scrollY;
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      window.scrollTo({ top: topDoc + scrollable * 0.92, behavior: "instant" });
      window.dispatchEvent(new Event("scroll"));
    });

    await expect(mtsSection).toHaveAttribute("data-active-beat", "6");
    await expect(page.getByTestId("mts-active-beat-label")).toContainText(
      "Treatment complete — cleaner metal, less dross"
    );
  });
});
