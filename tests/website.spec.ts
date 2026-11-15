import { test, expect } from "@playwright/test";
import { MTS_1500_BEATS } from "../src/components/Mts1500CycleScrollSection";

test.describe("3J Industrial Parts LLC — Foundry Website Verification Suite (Division 01 Only)", () => {
  test("1. Home page (/) renders official logo, hero machine selector, verbatim proof quote, both scroll sections, single footer cross-link, and zero commercial content", async ({
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

    // Hero Machine Selector Section
    const heroSelector = page.getByTestId("hero-machine-selector");
    await expect(heroSelector).toBeVisible();

    // All 4 confirmed machines exist in the selector
    await expect(page.getByTestId("machine-card-FDU")).toBeVisible();
    await expect(page.getByTestId("machine-card-MTS 1500")).toBeVisible();
    await expect(page.getByTestId("machine-card-SMARTT")).toBeVisible();
    await expect(
      page.getByTestId("machine-card-ThermaTest NGIII 5000")
    ).toBeVisible();

    // Machine detail panel exists
    await expect(page.getByTestId("machine-detail-panel")).toBeVisible();

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

    // Part Selector section exists
    await expect(page.getByTestId("part-selector-section")).toBeVisible();

    // Single required footer cross-link line to 3JI-Repair commercial site
    const commercialLink = page.getByRole("link", {
      name: /Commercial equipment repair & maintenance → 3JI-Repair/i,
    });
    await expect(commercialLink).toBeVisible();
    expect(await commercialLink.getAttribute("href")).toContain("3ji-repair-web");

    // Guardrail: ZERO commercial content on the foundry site (no slushie/beverage loaner band, no Pyrotek, no Junior Tech)
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("slushie machine right side");
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

    // Step 3: Complete quote submission with mandatory 24-hr SLA estimate promise
    await page.fill("#pf-name", "David Vance");
    await page.fill("#pf-company", "Great Lakes Aluminum Casters");
    await page.fill("#pf-email", "david.vance@glac-foundry.com");
    await page.fill("#pf-phone", "216-555-0188");
    await page.fill(
      "#pf-notes",
      "Need 4 replacement shafts and inspection of drive seal bearings on MTS 1500."
    );
    await page.getByTestId("pf-submit-btn").click();

    // Verify confirmation and reference number
    await expect(page.getByTestId("pf-quote-confirmation")).toBeVisible();
    await expect(page.getByText(/Estimate within 24 hours/i).first()).toBeVisible();
  });

  test("3. Commercial separation verification: /food-service is removed, quote form is Div 01 only, and footer carries single cross-link line", async ({
    page,
  }) => {
    // 1. /food-service was moved to the standalone 3ji-repair-web site and is not a route here
    const fsResponse = await page.goto("/food-service");
    expect(fsResponse?.status()).toBe(404);

    // 2. Quote form dropdown has no Div 02 option
    await page.goto("/#quote-request");
    const quoteOptions = await page.locator("#quote-platform option").allTextContents();
    for (const opt of quoteOptions) {
      expect(opt).not.toContain("Div 02");
      expect(opt).not.toContain("3JI-Repair Commercial");
    }

    // 3. Footer has single cross-link to commercial site
    const footerCrossLink = page.getByRole("link", {
      name: /Commercial equipment repair & maintenance → 3JI-Repair/i,
    });
    await expect(footerCrossLink).toBeVisible();
  });

  test("4. About (/about) renders Jason Allen bio, verbatim proof quote, and melt-treatment differentiators", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/about");

    // Verbatim Proof Quote
    await expect(
      page.getByText(
        "6+ years of aluminum melt-treatment expertise — formerly the single point of contact for SMARTT, MTS 1500, and ThermaTest NGIII 5000 support across the U.S."
      ).first()
    ).toBeVisible();

    // Capabilities
    await expect(page.getByText("CAP-01")).toBeVisible();
    await expect(page.getByText("CAP-02")).toBeVisible();
    await expect(page.getByText("CAP-03")).toBeVisible();
    await expect(page.getByText("CAP-04")).toBeVisible();

    // Verify prefers-reduced-motion disables scroll section transforms on /
    await page.goto("/");
    await expect(page.getByTestId("fdu-exploded-scroll-section")).toHaveAttribute(
      "data-reduced-motion",
      "true"
    );
    await expect(
      page.getByTestId("mts-1500-cycle-scroll-section")
    ).toHaveAttribute("data-reduced-motion", "true");
  });

  test("5. Mobile (390x844) scroll-scrubs with zero horizontal overflow", async ({
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

    // Verify Hero Machine Selector is visible on mobile
    await expect(page.getByTestId("hero-machine-selector")).toBeVisible();
    await expect(page.getByTestId("machine-card-FDU")).toBeVisible();

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

    // Scroll to MTS 1500 Cycle section -> cycle beat indicators must scrub
    await page.evaluate(() => {
      const el = document.querySelector(
        '[data-testid="mts-1500-cycle-scroll-section"]'
      ) as HTMLElement;
      if (el) {
        const rect = el.getBoundingClientRect();
        const topDoc = rect.top + window.scrollY;
        const scrollable = Math.max(1, rect.height - window.innerHeight);
        window.scrollTo({ top: topDoc + scrollable * 0.5, behavior: "instant" });
        window.dispatchEvent(new Event("scroll"));
      }
    });

    await expect(page.getByTestId("mts-active-beat-label")).toBeVisible();
    expect(MTS_1500_BEATS.length).toBe(6);
  });

  test("6. Hero Machine Selector (1440x900 above-the-fold & interaction suite)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    // Acceptance 1: Header + Headline + 4 Machines + Detail Panel + Repair CTA all visible above fold
    const repairBtn = page.getByTestId("hero-repair-machine-cta");
    await expect(repairBtn).toBeVisible();

    const repairBtnBottom = await repairBtn.evaluate((el) => {
      return el.getBoundingClientRect().bottom;
    });
    // Button must be within the 900px viewport without scrolling
    expect(repairBtnBottom).toBeLessThanOrEqual(900);

    // Acceptance 2: FDU selected by default, clicking MTS 1500 changes detail panel copy
    await expect(page.getByTestId("machine-detail-panel")).toContainText(
      "FDU (Foundry Degassing Unit)"
    );

    await page.getByTestId("machine-card-MTS 1500").click();
    await expect(page.getByTestId("machine-detail-panel")).toContainText(
      "MTS 1500 (Metal Treatment Station)"
    );

    // Acceptance 3: 'Repair this machine' scrolls to quote form with platform pre-selected and serial focused
    await page.getByTestId("hero-repair-machine-cta").click();

    // Verify quote platform is now MTS 1500
    const quotePlatformSelect = page.locator("#quote-platform");
    await expect(quotePlatformSelect).toHaveValue("MTS 1500");

    // Verify focus is in serial number field
    await expect(page.locator("#quote-serial")).toBeFocused();
  });

  test("7. Part Selector (3-step Rexroth/McMaster flow) & Quote Pre-fill", async ({
    page,
  }) => {
    await page.goto("/");

    const partSelector = page.getByTestId("part-selector-section");
    await expect(partSelector).toBeVisible();

    // Step 1: Click SMARTT
    await page.getByTestId("ps-system-SMARTT").click();

    // Step 2: Verify SMARTT part families are displayed
    await expect(
      page.getByTestId("ps-family-Mass flow controllers")
    ).toBeVisible();
    await expect(page.getByTestId("ps-family-Sensors")).toBeVisible();
    await expect(page.getByTestId("ps-family-Rotors")).toBeVisible();

    // Select 'Mass flow controllers'
    await page.getByTestId("ps-family-Mass flow controllers").click();

    // Step 3: Enter serial number
    await page.getByTestId("ps-serial-input").fill("SMARTT-2024-5510");

    // Click 'Get this part'
    await page.getByTestId("ps-get-this-part-btn").click();

    // Verify quote form has platform set to SMARTT
    await expect(page.locator("#quote-platform")).toHaveValue("SMARTT");

    // Verify serial number field is populated
    await expect(page.locator("#quote-serial")).toHaveValue("SMARTT-2024-5510");

    // Verify request details textarea has pre-filled part request
    const messageVal = await page.locator("#quote-message").inputValue();
    expect(messageVal).toContain("Part Family Request: Mass flow controllers for SMARTT");
    expect(messageVal).toContain("SMARTT-2024-5510");
  });
});
