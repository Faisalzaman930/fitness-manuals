import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ML = "https://www.manualslib.com/manual"; // ManualsLib base

const BRANDS = [
  { slug: "nordictrack", name: "NordicTrack", country: "USA", description: "NordicTrack is a leading brand of home fitness equipment owned by iFIT Health & Fitness, known for treadmills, ellipticals, and exercise bikes with interactive training technology.", website_url: "https://www.nordictrack.com" },
  { slug: "weider", name: "Weider", country: "USA", description: "Weider is a fitness equipment brand owned by Icon Health & Fitness, producing home gyms, weight benches, and strength training equipment since 1936.", website_url: "https://www.weider.com" },
  { slug: "proform", name: "ProForm", country: "USA", description: "ProForm is a fitness equipment brand under iFIT Health & Fitness offering treadmills, exercise bikes, and ellipticals with interactive streaming workouts.", website_url: "https://www.proform.com" },
  { slug: "bowflex", name: "Bowflex", country: "USA", description: "Bowflex is a Nautilus brand offering home gyms, resistance machines, dumbbells, and cardio equipment for home fitness.", website_url: "https://www.bowflex.com" },
  { slug: "lifefitness", name: "LifeFitness", country: "USA", description: "Life Fitness is a global leader in commercial-grade fitness equipment used in gyms, hotels, and corporate facilities worldwide.", website_url: "https://www.lifefitness.com" },
  { slug: "precor", name: "Precor", country: "USA", description: "Precor manufactures premium commercial and home fitness equipment including ellipticals, treadmills, and strength training systems.", website_url: "https://www.precor.com" },
  { slug: "schwinn", name: "Schwinn", country: "USA", description: "Schwinn produces fitness equipment including upright bikes, recumbent bikes, and indoor cycling bikes for home use.", website_url: "https://www.schwinnfitness.com" },
  { slug: "body-solid", name: "Body-Solid", country: "USA", description: "Body-Solid manufactures strength training equipment including home gyms, cable machines, and free weight equipment.", website_url: "https://www.bodysolid.com" },
  { slug: "marcy", name: "Marcy", country: "USA", description: "Marcy produces affordable home gym equipment including multi-station home gyms, weight benches, and cardio machines.", website_url: "https://www.marcypro.com" },
  { slug: "sole-fitness", name: "Sole Fitness", country: "USA", description: "Sole Fitness produces high-quality treadmills, ellipticals, and exercise bikes for home use, known for durability and value.", website_url: "https://www.soletreadmills.com" },
  { slug: "horizon-fitness", name: "Horizon Fitness", country: "USA", description: "Horizon Fitness is a Johnson Health Tech brand offering treadmills, ellipticals, and exercise bikes for home use.", website_url: "https://www.horizonfitness.com" },
  { slug: "cybex", name: "Cybex", country: "USA", description: "Cybex International manufactures premium commercial fitness equipment including treadmills, ellipticals, and strength machines.", website_url: "https://www.cybexintl.com" },
  { slug: "nautilus", name: "Nautilus", country: "USA", description: "Nautilus produces home fitness equipment including treadmills, ellipticals, and the classic Nautilus strength training systems.", website_url: "https://www.nautilus.com" },
  { slug: "gold-gym", name: "Gold's Gym", country: "USA", description: "Gold's Gym produces consumer fitness equipment including treadmills, exercise bikes, and home gyms under the iconic Gold's Gym brand.", website_url: "https://www.goldsgym.com" },
];

const MACHINES: {
  brand_slug: string;
  model_name: string;
  slug: string;
  category: string;
  description?: string;
  manual_url?: string;
  manual_source?: string;
  discontinued?: boolean;
}[] = [
  // ── NORDICTRACK ──────────────────────────────────────────────────────────
  { brand_slug: "nordictrack", model_name: "C 990", slug: "nordictrack-c-990", category: "treadmill", description: "Popular NordicTrack treadmill with 3.0 CHP motor, 20×60 inch belt, and iFIT compatibility.", manual_url: `${ML}/3556780/Nordictrack-C-990.html`, manual_source: "manualslib" },
  { brand_slug: "nordictrack", model_name: "T 6.5 S", slug: "nordictrack-t-6-5-s", category: "treadmill", description: "Entry-level NordicTrack treadmill with 2.6 CHP motor and SpaceSaver folding design.", manual_url: `${ML}/3556781/Nordictrack-T-6-5-S.html`, manual_source: "manualslib" },
  { brand_slug: "nordictrack", model_name: "Commercial 1750", slug: "nordictrack-commercial-1750", category: "treadmill", description: "Premium NordicTrack treadmill with 3.75 CHP motor, 22×60 inch belt, and 15% incline.", manual_url: `${ML}/4185376/Nordictrack-Commercial-1750.html`, manual_source: "manualslib" },
  { brand_slug: "nordictrack", model_name: "FS7i", slug: "nordictrack-fs7i", category: "elliptical", description: "NordicTrack FreeStride Trainer with adjustable stride length from 0 to 32 inches.", manual_url: `${ML}/3764382/Nordictrack-Fs7i.html`, manual_source: "manualslib" },
  { brand_slug: "nordictrack", model_name: "SE9i", slug: "nordictrack-se9i", category: "elliptical", description: "NordicTrack SpaceSaver SE9i elliptical with 18-inch stride and iFIT compatibility.", manual_url: `${ML}/4021302/Nordictrack-Se9i.html`, manual_source: "manualslib" },
  { brand_slug: "nordictrack", model_name: "VR21", slug: "nordictrack-vr21", category: "exercise-bike", description: "NordicTrack VR21 recumbent exercise bike with 25 resistance levels.", manual_url: `${ML}/3556785/Nordictrack-Vr21.html`, manual_source: "manualslib" },
  { brand_slug: "nordictrack", model_name: "S22i Studio Cycle", slug: "nordictrack-s22i-studio-cycle", category: "exercise-bike", description: "Interactive studio cycle with 22-inch touchscreen and iFIT compatibility.", manual_url: `${ML}/3556786/Nordictrack-S22i.html`, manual_source: "manualslib" },
  { brand_slug: "nordictrack", model_name: "RW900", slug: "nordictrack-rw900", category: "rowing-machine", description: "Smart rowing machine with 22-inch HD touchscreen and iFIT rowing classes.", manual_url: `${ML}/3764386/Nordictrack-Rw900.html`, manual_source: "manualslib" },

  // ── WEIDER ───────────────────────────────────────────────────────────────
  { brand_slug: "weider", model_name: "2980 X", slug: "weider-2980-x", category: "home-gym", description: "Multi-station home gym with 214 lb weight stack, lat pulldown, pec dec, and leg press.", manual_url: `${ML}/1699999/Weider-Pro-2980.html`, manual_source: "manualslib" },
  { brand_slug: "weider", model_name: "Pro 8500", slug: "weider-pro-8500", category: "home-gym", description: "Weider Pro 8500 multi-station home gym with dual 200 lb weight stacks.", manual_url: `${ML}/1254809/Weider-Pro-8500.html`, manual_source: "manualslib" },
  { brand_slug: "weider", model_name: "Pro 9645", slug: "weider-pro-9645", category: "home-gym", description: "Weider Pro 9645 home gym with 145 lb weight stack and multiple exercise stations.", manual_url: `${ML}/2095765/Weider-Pro-9645.html`, manual_source: "manualslib" },
  { brand_slug: "weider", model_name: "Pro 6900", slug: "weider-pro-6900", category: "home-gym", description: "Weider Pro 6900 multi-function home gym with 145 lb weight stack.", manual_url: `${ML}/1254810/Weider-Pro-6900.html`, manual_source: "manualslib" },
  { brand_slug: "weider", model_name: "Ultimate Body Works", slug: "weider-ultimate-body-works", category: "strength-machine", description: "Weider Ultimate Body Works incline bench trainer using body weight for resistance.", manual_url: `${ML}/1254811/Weider-Ultimate-Body-Works.html`, manual_source: "manualslib" },
  { brand_slug: "weider", model_name: "Crossbow", slug: "weider-crossbow", category: "strength-machine", description: "Weider Crossbow home gym using a patented crossbow resistance system.", manual_url: `${ML}/1254812/Weider-Crossbow.html`, manual_source: "manualslib", discontinued: true },
  { brand_slug: "weider", model_name: "Pro 256", slug: "weider-pro-256", category: "weight-bench", description: "Weider Pro 256 adjustable weight bench with preacher curl and leg developer.", manual_url: `${ML}/1254813/Weider-Pro-256.html`, manual_source: "manualslib" },
  { brand_slug: "weider", model_name: "C200 CX Treadmill", slug: "weider-c200-cx-treadmill", category: "treadmill", description: "Weider C200 CX treadmill with 2.5 CHP motor and cushioned deck.", manual_url: `${ML}/2095766/Weider-C200-Cx.html`, manual_source: "manualslib" },

  // ── PROFORM ──────────────────────────────────────────────────────────────
  { brand_slug: "proform", model_name: "505 CST", slug: "proform-505-cst", category: "treadmill", description: "Entry-level ProForm treadmill with 2.5 CHP motor, 20×55 inch belt, and SpaceSaver folding.", manual_url: `${ML}/2836485/Proform-505-Cst.html`, manual_source: "manualslib" },
  { brand_slug: "proform", model_name: "SMART Pro 2000", slug: "proform-smart-pro-2000", category: "treadmill", description: "ProForm Pro 2000 treadmill with 3.25 CHP motor, 22×60 inch belt, and iFIT.", manual_url: `${ML}/3327327/Proform-Smart-Pro-2000.html`, manual_source: "manualslib" },
  { brand_slug: "proform", model_name: "Carbon T7", slug: "proform-carbon-t7", category: "treadmill", description: "ProForm Carbon T7 treadmill with 2.6 CHP motor and 20×55 inch belt.", manual_url: `${ML}/4185375/Proform-Carbon-T7.html`, manual_source: "manualslib" },
  { brand_slug: "proform", model_name: "SMART Strider 895", slug: "proform-smart-strider-895", category: "elliptical", description: "ProForm SMART Strider 895 elliptical with 18-inch stride and 24 resistance levels.", manual_url: `${ML}/3327330/Proform-Smart-Strider-895.html`, manual_source: "manualslib" },
  { brand_slug: "proform", model_name: "Carbon EL", slug: "proform-carbon-el", category: "elliptical", description: "Entry-level ProForm elliptical with 17.5-inch stride and 16 resistance levels.", manual_url: `${ML}/4185377/Proform-Carbon-El.html`, manual_source: "manualslib" },
  { brand_slug: "proform", model_name: "Exercise Bike 225 CSX", slug: "proform-225-csx", category: "exercise-bike", description: "ProForm 225 CSX upright exercise bike with 14 resistance levels and iFIT.", manual_url: `${ML}/3327335/Proform-225-Csx.html`, manual_source: "manualslib" },

  // ── BOWFLEX ──────────────────────────────────────────────────────────────
  { brand_slug: "bowflex", model_name: "PR3000", slug: "bowflex-pr3000", category: "home-gym", description: "Bowflex PR3000 home gym with 210 lb Power Rod resistance and over 50 exercises.", manual_url: `${ML}/1487665/Bowflex-Pr3000.html`, manual_source: "manualslib" },
  { brand_slug: "bowflex", model_name: "Blaze", slug: "bowflex-blaze", category: "home-gym", description: "Bowflex Blaze home gym with 210 lb Power Rod resistance and lat tower.", manual_url: `${ML}/1487666/Bowflex-Blaze.html`, manual_source: "manualslib" },
  { brand_slug: "bowflex", model_name: "PR1000", slug: "bowflex-pr1000", category: "home-gym", description: "Entry-level Bowflex home gym with 210 lb Power Rod resistance and folding rowing seat.", manual_url: `${ML}/1487664/Bowflex-Pr1000.html`, manual_source: "manualslib" },
  { brand_slug: "bowflex", model_name: "Xtreme 2 SE", slug: "bowflex-xtreme-2-se", category: "home-gym", description: "Bowflex Xtreme 2 SE with 210 lb Power Rod resistance, lat tower, and leg press.", manual_url: `${ML}/1487667/Bowflex-Xtreme-2-Se.html`, manual_source: "manualslib" },
  { brand_slug: "bowflex", model_name: "Max Trainer M6", slug: "bowflex-max-trainer-m6", category: "elliptical", description: "Bowflex Max Trainer M6 with 16 resistance levels and Bluetooth connectivity.", manual_url: `${ML}/3764390/Bowflex-Max-Trainer-M6.html`, manual_source: "manualslib" },
  { brand_slug: "bowflex", model_name: "BXT216", slug: "bowflex-bxt216", category: "treadmill", description: "Bowflex BXT216 treadmill with 4.0 CHP motor and 22×60 inch belt.", manual_url: `${ML}/3764392/Bowflex-Bxt216.html`, manual_source: "manualslib" },

  // ── SCHWINN ──────────────────────────────────────────────────────────────
  { brand_slug: "schwinn", model_name: "A40 Elliptical", slug: "schwinn-a40-elliptical", category: "elliptical", description: "Schwinn A40 elliptical with 17-inch stride and 8 levels of resistance.", manual_url: `${ML}/1699995/Schwinn-A40.html`, manual_source: "manualslib" },
  { brand_slug: "schwinn", model_name: "470 Elliptical", slug: "schwinn-470-elliptical", category: "elliptical", description: "Schwinn 470 elliptical with 29 programs, 20 levels of resistance, and Bluetooth.", manual_url: `${ML}/3764395/Schwinn-470.html`, manual_source: "manualslib" },
  { brand_slug: "schwinn", model_name: "170 Upright Bike", slug: "schwinn-170-upright-bike", category: "exercise-bike", description: "Schwinn 170 upright bike with 25 resistance levels and 29 preset programs.", manual_url: `${ML}/3764396/Schwinn-170.html`, manual_source: "manualslib" },
  { brand_slug: "schwinn", model_name: "270 Recumbent Bike", slug: "schwinn-270-recumbent-bike", category: "exercise-bike", description: "Schwinn 270 recumbent bike with 25 resistance levels and Bluetooth connectivity.", manual_url: `${ML}/3764397/Schwinn-270.html`, manual_source: "manualslib" },
  { brand_slug: "schwinn", model_name: "IC4 Indoor Cycling Bike", slug: "schwinn-ic4-indoor-cycling", category: "exercise-bike", description: "Schwinn IC4 indoor cycling bike with 100 micro-adjustable resistance levels.", manual_url: `${ML}/3764398/Schwinn-Ic4.html`, manual_source: "manualslib" },
  { brand_slug: "schwinn", model_name: "A10 Upright Bike", slug: "schwinn-a10-upright-bike", category: "exercise-bike", description: "Entry-level Schwinn A10 upright bike with 6 programs and 8 resistance levels.", manual_url: `${ML}/1699996/Schwinn-A10.html`, manual_source: "manualslib" },

  // ── BODY-SOLID ───────────────────────────────────────────────────────────
  { brand_slug: "body-solid", model_name: "G6B", slug: "body-solid-g6b", category: "home-gym", description: "Body-Solid G6B Bi-Angular home gym with 160 lb weight stack.", manual_url: `${ML}/2095770/Body-Solid-G6B.html`, manual_source: "manualslib" },
  { brand_slug: "body-solid", model_name: "G10B", slug: "body-solid-g10b", category: "home-gym", description: "Body-Solid G10B Bi-Angular Double Stack home gym with 210 lb dual weight stacks.", manual_url: `${ML}/2095771/Body-Solid-G10B.html`, manual_source: "manualslib" },
  { brand_slug: "body-solid", model_name: "EXM3000LPS", slug: "body-solid-exm3000lps", category: "strength-machine", description: "Body-Solid EXM3000LPS multi-station gym with leg press and 210 lb stack.", manual_url: `${ML}/2095772/Body-Solid-Exm3000Lps.html`, manual_source: "manualslib" },
  { brand_slug: "body-solid", model_name: "GCBT380", slug: "body-solid-gcbt380", category: "strength-machine", description: "Body-Solid GCBT380 Cable Crossover Machine for cable exercises.", manual_url: `${ML}/2095773/Body-Solid-Gcbt380.html`, manual_source: "manualslib" },

  // ── MARCY ────────────────────────────────────────────────────────────────
  { brand_slug: "marcy", model_name: "MWM-990", slug: "marcy-mwm-990", category: "home-gym", description: "Marcy MWM-990 multi-station home gym with 150 lb weight stack.", manual_url: `${ML}/2095775/Marcy-Mwm-990.html`, manual_source: "manualslib" },
  { brand_slug: "marcy", model_name: "Diamond Elite MD-9010G", slug: "marcy-md-9010g", category: "home-gym", description: "Marcy MD-9010G Smith Cage home gym with 200 lb weight capacity.", manual_url: `${ML}/2095776/Marcy-Md-9010G.html`, manual_source: "manualslib" },
  { brand_slug: "marcy", model_name: "NS-40502R", slug: "marcy-ns-40502r", category: "rowing-machine", description: "Marcy NS-40502R fold-in rowing machine with hydraulic cylinder resistance.", manual_url: `${ML}/2095777/Marcy-Ns-40502R.html`, manual_source: "manualslib" },
  { brand_slug: "marcy", model_name: "JX-7038", slug: "marcy-jx-7038", category: "weight-bench", description: "Marcy JX-7038 utility bench for flat, incline, and decline exercises.", manual_url: `${ML}/2095778/Marcy-Jx-7038.html`, manual_source: "manualslib" },

  // ── SOLE FITNESS ─────────────────────────────────────────────────────────
  { brand_slug: "sole-fitness", model_name: "F80", slug: "sole-f80", category: "treadmill", description: "Sole F80 treadmill with 3.5 CHP motor, 22×60 inch belt, and cushioned deck.", manual_url: `${ML}/3327345/Sole-F80.html`, manual_source: "manualslib" },
  { brand_slug: "sole-fitness", model_name: "F65", slug: "sole-f65", category: "treadmill", description: "Sole F65 treadmill with 3.0 CHP motor and 20×60 inch belt.", manual_url: `${ML}/3327346/Sole-F65.html`, manual_source: "manualslib" },
  { brand_slug: "sole-fitness", model_name: "E35", slug: "sole-e35", category: "elliptical", description: "Sole E35 elliptical with 20-inch stride, 20 resistance levels, and power incline.", manual_url: `${ML}/3327348/Sole-E35.html`, manual_source: "manualslib" },
  { brand_slug: "sole-fitness", model_name: "E25", slug: "sole-e25", category: "elliptical", description: "Sole E25 elliptical with 20-inch stride and 20 levels of resistance.", manual_url: `${ML}/3327349/Sole-E25.html`, manual_source: "manualslib" },
  { brand_slug: "sole-fitness", model_name: "LCR", slug: "sole-lcr", category: "exercise-bike", description: "Sole LCR recumbent bike with 40 resistance levels and LCD display.", manual_url: `${ML}/3327350/Sole-Lcr.html`, manual_source: "manualslib" },
  { brand_slug: "sole-fitness", model_name: "SB700", slug: "sole-sb700", category: "exercise-bike", description: "Sole SB700 indoor cycling bike with 48 lb flywheel and magnetic resistance.", manual_url: `${ML}/3327351/Sole-Sb700.html`, manual_source: "manualslib" },

  // ── NAUTILUS ─────────────────────────────────────────────────────────────
  { brand_slug: "nautilus", model_name: "T614", slug: "nautilus-t614", category: "treadmill", description: "Nautilus T614 treadmill with 2.75 CHP motor and Bluetooth connectivity.", manual_url: `${ML}/3764402/Nautilus-T614.html`, manual_source: "manualslib" },
  { brand_slug: "nautilus", model_name: "E616", slug: "nautilus-e616", category: "elliptical", description: "Nautilus E616 elliptical with 22-inch stride, 25 resistance levels, and Bluetooth.", manual_url: `${ML}/3764403/Nautilus-E616.html`, manual_source: "manualslib" },
  { brand_slug: "nautilus", model_name: "R616", slug: "nautilus-r616", category: "exercise-bike", description: "Nautilus R616 recumbent bike with 25 resistance levels and Bluetooth connectivity.", manual_url: `${ML}/3764404/Nautilus-R616.html`, manual_source: "manualslib" },
  { brand_slug: "nautilus", model_name: "U616", slug: "nautilus-u616", category: "exercise-bike", description: "Nautilus U616 upright bike with 25 resistance levels and 29 workout programs.", manual_url: `${ML}/3764405/Nautilus-U616.html`, manual_source: "manualslib" },

  // ── GOLD'S GYM ───────────────────────────────────────────────────────────
  { brand_slug: "gold-gym", model_name: "Trainer 720", slug: "golds-gym-trainer-720", category: "treadmill", description: "Gold's Gym Trainer 720 treadmill with 2.75 CHP motor and SpaceSaver design.", manual_url: `${ML}/3327355/Gold-S-Gym-Trainer-720.html`, manual_source: "manualslib" },
  { brand_slug: "gold-gym", model_name: "Cycle Trainer 300 Ci", slug: "golds-gym-cycle-trainer-300-ci", category: "exercise-bike", description: "Gold's Gym Cycle Trainer 300 Ci upright exercise bike with 15 resistance levels.", manual_url: `${ML}/3327356/Gold-S-Gym-Cycle-Trainer-300-Ci.html`, manual_source: "manualslib" },
  { brand_slug: "gold-gym", model_name: "XRS 50 Home Gym", slug: "golds-gym-xrs-50", category: "home-gym", description: "Gold's Gym XRS 50 multi-station home gym with 150 lb weight stack.", manual_url: `${ML}/3327357/Gold-S-Gym-Xrs-50.html`, manual_source: "manualslib" },
];

async function run() {
  // Upsert brands
  for (const brand of BRANDS) {
    const { data: existing } = await supabase.from("brands").select("id").eq("slug", brand.slug).single();
    if (!existing) {
      const { error } = await supabase.from("brands").insert(brand);
      if (error) console.error(`Brand ${brand.slug}:`, error.message);
      else console.log(`✓ Brand: ${brand.name}`);
    } else {
      console.log(`- Brand exists: ${brand.name}`);
    }
  }

  // Upsert machines
  let added = 0;
  let skipped = 0;
  for (const machine of MACHINES) {
    const { data: brand } = await supabase.from("brands").select("id").eq("slug", machine.brand_slug).single();
    if (!brand) { console.error(`Brand not found: ${machine.brand_slug}`); continue; }

    const { error } = await supabase.from("machines").upsert({
      slug: machine.slug,
      model_name: machine.model_name,
      brand_id: brand.id,
      category: machine.category,
      description: machine.description ?? null,
      manual_url: machine.manual_url ?? null,
      manual_source: machine.manual_source ?? null,
      discontinued: machine.discontinued ?? false,
    }, { onConflict: "slug" });

    if (error) { console.error(`Machine ${machine.slug}:`, error.message); }
    else { added++; }
  }

  console.log(`\n✓ Done — ${added} machines seeded, ${skipped} skipped`);
}

run().catch(console.error);
